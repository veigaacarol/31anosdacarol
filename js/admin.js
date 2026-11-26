/* Página /admin: confirmações, presentes escolhidos e exportação CSV. */
(function () {
  "use strict";

  var API = window.API, I = window.ICONES, P = window.PRESENTES || [];
  var CHAVE_SESSAO = "carol31-admin";
  var senha = sessionStorage.getItem(CHAVE_SESSAO) || "";
  var dados = null;

  var nomes = {};
  P.forEach(function (p) { nomes[p.id] = p.nome; });

  function $(s) { return document.querySelector(s); }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function ic(n) { return '<svg class="icone" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' + I[n] + "</svg>"; }
  function dataBR(iso) {
    try {
      return new Date(iso).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo", dateStyle: "short", timeStyle: "short" });
    } catch (e) { return iso; }
  }

  $("#atualizar").innerHTML = ic("atualizar") + "Atualizar";
  $("#csv-confirmacoes").innerHTML = ic("download") + "Exportar CSV";
  $("#csv-presentes").innerHTML = ic("download") + "Exportar CSV";

  if (API.demo) {
    $("#aviso-demo").innerHTML = '<p class="aviso-demo" style="margin:1rem 0 0;border-radius:18px">' +
      "<strong>Modo demonstração:</strong> o banco ainda não está ligado. A senha de teste é <strong>demo</strong> e os dados vêm só deste navegador.</p>";
  }

  function mostrarLogin(msg) {
    $("#painel").hidden = true;
    $("#sair").hidden = true;
    $("#login").hidden = false;
    $("#msg-login").textContent = msg || "";
  }

  async function carregar(origem) {
    var msg = origem === "login" ? $("#msg-login") : $("#msg-painel");
    msg.textContent = "Carregando…";
    try {
      var r = await API.adminDados(senha);
      if (!r || !r.ok) {
        sessionStorage.removeItem(CHAVE_SESSAO);
        var texto = r && r.erro === "TROCAR"
          ? "Por segurança, troque a senha padrão no Supabase antes de usar (README.md, passo 2)."
          : "Senha incorreta.";
        mostrarLogin(texto);
        $("#senha").focus();
        return;
      }
      dados = r;
      sessionStorage.setItem(CHAVE_SESSAO, senha);
      $("#login").hidden = true;
      $("#painel").hidden = false;
      $("#sair").hidden = false;
      desenhar();
      msg.textContent = origem === "atualizar" ? "Dados atualizados." : "";
      if (origem === "login") $("#titulo-painel").focus();
    } catch (e) {
      msg.textContent = e.message;
    }
  }

  function desenhar() {
    var c = dados.confirmacoes || [];
    var pres = dados.presentes || [];
    var sim = c.filter(function (x) { return x.vai; });
    var pessoas = sim.reduce(function (t, x) { return t + Number(x.pessoas || 0); }, 0);

    function bloco(rotulo, valor) {
      return '<div class="card"><p class="card__rotulo">' + rotulo + '</p><p class="card__valor">' + valor + "</p></div>";
    }
    $("#resumo").innerHTML =
      bloco("Total de pessoas", pessoas) +
      bloco("Confirmaram", sim.length) +
      bloco("Não vão", c.length - sim.length) +
      bloco("Presentes escolhidos", pres.length + " de " + P.length);

    $("#tabela-confirmacoes").innerHTML = c.length
      ? "<table><thead><tr><th>Nome</th><th>Resposta</th><th>Pessoas</th><th>Recado</th><th>Quando</th></tr></thead><tbody>" +
        c.map(function (x) {
          return "<tr><td>" + esc(x.nome) + "</td>" +
            "<td>" + (x.vai ? '<span class="etiqueta etiqueta--sim">Vai</span>' : '<span class="etiqueta etiqueta--nao">Não vai</span>') + "</td>" +
            "<td>" + (x.vai ? esc(x.pessoas) : "–") + "</td>" +
            "<td>" + esc(x.recado || "") + "</td>" +
            "<td>" + esc(dataBR(x.criado_em)) + "</td></tr>";
        }).join("") +
        "</tbody></table>"
      : '<p class="vazio">Ninguém respondeu ainda.</p>';

    $("#tabela-presentes").innerHTML = pres.length
      ? "<table><thead><tr><th>Presente</th><th>Escolhido em</th><th><span class=\"sr-only\">Ação</span></th></tr></thead><tbody>" +
        pres.map(function (x) {
          var nome = nomes[x.presente_id] || x.presente_id;
          return "<tr><td>" + esc(nome) + "</td><td>" + esc(dataBR(x.escolhido_em)) + "</td>" +
            '<td><button class="botao botao--contorno botao--pequeno" type="button" data-liberar="' + esc(x.presente_id) + '">' +
            "Liberar<span class=\"sr-only\"> " + esc(nome) + "</span></button></td></tr>";
        }).join("") +
        "</tbody></table>"
      : '<p class="vazio">Nenhum presente escolhido ainda.</p>';
  }

  /* CSV que abre certinho no Excel em português (separador ;) */
  function celula(v) {
    var s = String(v == null ? "" : v);
    if (/^[=+\-@\t\r]/.test(s)) s = "'" + s; // evita fórmulas maliciosas no Excel
    return '"' + s.replace(/"/g, '""') + '"';
  }
  function baixarCsv(nomeArquivo, linhas) {
    var csv = "﻿" + linhas.map(function (l) { return l.map(celula).join(";"); }).join("\r\n");
    var blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = nomeArquivo;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 2000);
  }

  $("#csv-confirmacoes").addEventListener("click", function () {
    var linhas = [["Nome", "Vai?", "Pessoas", "Recado", "Respondido em"]];
    (dados.confirmacoes || []).forEach(function (x) {
      linhas.push([x.nome, x.vai ? "Sim" : "Não", x.vai ? x.pessoas : 0, x.recado || "", dataBR(x.criado_em)]);
    });
    baixarCsv("confirmacoes-carol31.csv", linhas);
  });

  $("#csv-presentes").addEventListener("click", function () {
    var linhas = [["Presente", "Detalhes", "Loja", "Escolhido em"]];
    (dados.presentes || []).forEach(function (x) {
      var p = P.find(function (y) { return y.id === x.presente_id; }) || {};
      linhas.push([p.nome || x.presente_id, p.detalhes || "", p.loja || "", dataBR(x.escolhido_em)]);
    });
    baixarCsv("presentes-carol31.csv", linhas);
  });

  $("#tabela-presentes").addEventListener("click", async function (e) {
    var b = e.target.closest("[data-liberar]");
    if (!b) return;
    var id = b.getAttribute("data-liberar");
    if (!confirm("Liberar \"" + (nomes[id] || id) + "\"? Ele volta a aparecer como disponível no site.")) return;
    b.disabled = true;
    try {
      var r = await API.adminLiberar(senha, id);
      if (!r || !r.ok) { mostrarLogin("Sua sessão expirou. Entre de novo."); return; }
      await carregar("atualizar");
      $("#msg-painel").textContent = "Presente liberado.";
    } catch (err) {
      b.disabled = false;
      $("#msg-painel").textContent = err.message;
    }
  });

  $("#form-login").addEventListener("submit", function (e) {
    e.preventDefault();
    senha = $("#senha").value;
    carregar("login");
  });
  $("#atualizar").addEventListener("click", function () { carregar("atualizar"); });
  $("#sair").addEventListener("click", function () {
    senha = "";
    dados = null;
    sessionStorage.removeItem(CHAVE_SESSAO);
    $("#senha").value = "";
    mostrarLogin("Você saiu.");
  });

  $("#titulo-painel").setAttribute("tabindex", "-1");
  if (senha) carregar("login");
})();
