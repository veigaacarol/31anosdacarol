/* ================================================================
   Comunicação com o banco (Supabase). Não precisa mexer aqui.
   Sem a conexão configurada, usa o "modo demonstração" (dados só
   no navegador), útil para testar o visual.
   ================================================================ */
(function () {
  "use strict";

  var C = window.CONEXAO || {};
  var url = String(C.supabaseUrl || "").trim().replace(/\/+$/, "");
  var chave = String(C.supabaseChave || "").trim();
  var demo = !url || !chave;

  var MENSAGENS = {
    LIMITE: "Muitas tentativas em pouco tempo. Espere alguns minutos e tente de novo.",
    NOME: "Escreva seu nome (de 2 a 80 caracteres).",
    PESSOAS: "Escolha de 1 a 4 pessoas.",
    RECADO: "O recado pode ter no máximo 500 caracteres.",
    ACOMPANHANTES: "Escreva o nome de quem vai com você (até 300 caracteres).",
    INVALIDO: "Algo não saiu como esperado. Recarregue a página e tente de novo.",
    REDE: "Não consegui falar com o servidor. Confira sua internet e tente de novo."
  };

  function erro(codigo) {
    var e = new Error(MENSAGENS[codigo] || MENSAGENS.INVALIDO);
    e.codigo = codigo;
    return e;
  }

  function limpar(texto) {
    return String(texto == null ? "" : texto).replace(/\s+/g, " ").trim();
  }

  function validarConfirmacao(d) {
    var nome = limpar(d.nome);
    var recado = String(d.recado || "").trim();
    if (nome.length < 2 || nome.length > 80) throw erro("NOME");
    if (d.vai && !(d.pessoas >= 1 && d.pessoas <= 4)) throw erro("PESSOAS");
    if (recado.length > 500) throw erro("RECADO");
    var pessoas = d.vai ? Number(d.pessoas) : 0;
    var acompanhantes = pessoas > 1 ? limpar(d.acompanhantes) : "";
    if (pessoas > 1 && (acompanhantes.length < 2 || acompanhantes.length > 300)) throw erro("ACOMPANHANTES");
    return { nome: nome, recado: recado, pessoas: pessoas, acompanhantes: acompanhantes, vai: !!d.vai };
  }

  async function rpc(funcao, corpo) {
    var headers = { "Content-Type": "application/json", apikey: chave };
    if (chave.indexOf("eyJ") === 0) headers.Authorization = "Bearer " + chave; // chave antiga (anon)
    var resposta;
    try {
      resposta = await fetch(url + "/rest/v1/rpc/" + funcao, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(corpo || {})
      });
    } catch (e) {
      throw erro("REDE");
    }
    var dados = null;
    try { dados = await resposta.json(); } catch (e) { /* sem corpo */ }
    if (!resposta.ok) {
      var codigo = dados && dados.message;
      throw erro(MENSAGENS[codigo] ? codigo : "INVALIDO");
    }
    return dados;
  }

  /* ---------- Modo demonstração (localStorage) ---------- */
  var K_RSVP = "carol31-demo-confirmacoes";
  var K_PRES = "carol31-demo-presentes";
  function ler(k, padrao) {
    try { var v = JSON.parse(localStorage.getItem(k)); return v == null ? padrao : v; } catch (e) { return padrao; }
  }
  function gravar(k, v) { localStorage.setItem(k, JSON.stringify(v)); }
  function pausa() { return new Promise(function (r) { setTimeout(r, 350); }); }

  window.API = {
    demo: demo,

    confirmar: async function (d) {
      var v = validarConfirmacao(d);
      if (demo) {
        await pausa();
        if (d.armadilha) return { ok: true };
        var lista = ler(K_RSVP, []);
        lista.unshift({ nome: v.nome, pessoas: v.pessoas, acompanhantes: v.acompanhantes || null, recado: v.recado || null, vai: v.vai, criado_em: new Date().toISOString() });
        gravar(K_RSVP, lista);
        return { ok: true };
      }
      return rpc("confirmar_presenca", {
        p_nome: v.nome, p_pessoas: v.pessoas, p_acompanhantes: v.acompanhantes, p_recado: v.recado, p_vai: v.vai, p_armadilha: d.armadilha || ""
      });
    },

    /* Lista de ids de presentes já escolhidos */
    statusPresentes: async function () {
      if (demo) return Object.keys(ler(K_PRES, {}));
      var r = await rpc("presentes_status");
      return Array.isArray(r) ? r : [];
    },

    escolher: async function (id, codigo) {
      if (demo) {
        await pausa();
        var p = ler(K_PRES, {});
        if (p[id]) return false;
        p[id] = { codigo: codigo, escolhido_em: new Date().toISOString() };
        gravar(K_PRES, p);
        return true;
      }
      var r = await rpc("escolher_presente", { p_id: id, p_codigo: codigo });
      return !!(r && r.ok);
    },

    desfazer: async function (id, codigo) {
      if (demo) {
        await pausa();
        var p = ler(K_PRES, {});
        if (!p[id] || p[id].codigo !== codigo) return false;
        delete p[id];
        gravar(K_PRES, p);
        return true;
      }
      var r = await rpc("desfazer_presente", { p_id: id, p_codigo: codigo });
      return !!(r && r.ok);
    },

    /* Admin: no modo demonstração a senha é "demo" */
    adminDados: async function (senha) {
      if (demo) {
        await pausa();
        if (senha !== "demo") return { ok: false };
        var p = ler(K_PRES, {});
        return {
          ok: true,
          confirmacoes: ler(K_RSVP, []),
          presentes: Object.keys(p).map(function (id) { return { presente_id: id, escolhido_em: p[id].escolhido_em }; })
        };
      }
      return rpc("admin_dados", { p_senha: senha });
    },

    adminLiberar: async function (senha, id) {
      if (demo) {
        if (senha !== "demo") return { ok: false };
        var p = ler(K_PRES, {});
        delete p[id];
        gravar(K_PRES, p);
        return { ok: true };
      }
      return rpc("admin_liberar_presente", { p_senha: senha, p_id: id });
    }
  };
})();
