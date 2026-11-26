/* ================================================================
   Monta a página a partir de conteudo/site.js e conteudo/presentes.js.
   Não precisa mexer aqui: edite os textos nos arquivos da pasta "conteudo".
   ================================================================ */
(function () {
  "use strict";

  var S = window.SITE;
  var P = window.PRESENTES || [];
  var CATS = (window.CATEGORIAS_PRESENTES || []).filter(function (c) {
    return P.some(function (p) { return p.categoria === c.id; });
  });
  var I = window.ICONES;
  var API = window.API;

  /* ---------- Ajudantes ---------- */
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function ic(nome, classe) {
    return '<svg class="' + (classe || "icone") + '" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
      (I[nome] || I.presente) + "</svg>";
  }
  // Texto seguro com destaques simples: ***negrito e itálico***, **negrito**, *itálico*
  function destaque(s) {
    return esc(s)
      .replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>")
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>");
  }
  function $(sel, raiz) { return (raiz || document).querySelector(sel); }
  function $$(sel, raiz) { return Array.prototype.slice.call((raiz || document).querySelectorAll(sel)); }
  function brilho(cx, cy, s) {
    var a = s * 0.28, b = s;
    return '<path d="M' + cx + " " + (cy - b) + " L" + (cx + a) + " " + (cy - a) + " L" + (cx + b) + " " + cy +
      " L" + (cx + a) + " " + (cy + a) + " L" + cx + " " + (cy + b) + " L" + (cx - a) + " " + (cy + a) +
      " L" + (cx - b) + " " + cy + " L" + (cx - a) + " " + (cy - a) + 'Z"/>';
  }

  var linkWhats = "https://wa.me/" + String(S.whatsapp.numero).replace(/\D/g, "");
  var linkMapa = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(S.enderecoParaMapa);
  var NOVA_ABA = '<span class="sr-only"> (abre em nova aba)</span>';

  /* ---------- 1. Barra superior ---------- */
  var MENU = [
    ["#universo", "Meu universo"],
    ["#evento", "O evento"],
    ["#como-chegar", "Como chegar"],
    ["#presenca", "Presença"],
    ["#presentes", "Presentes"],
    ["#duvidas", "Dúvidas"]
  ];

  function topo() {
    return '<div class="container topo__barra">' +
      '<a class="marca" href="#inicio"><span>' + esc(S.idade) + "</span>" + esc(S.marca || "anos da " + S.aniversariante) + "</a>" +
      '<button class="menu-botao" type="button" aria-expanded="false" aria-controls="menu">' +
        ic("menu") + "<span>Menu</span></button>" +
      '<nav class="menu" id="menu" aria-label="Seções do convite"><ul>' +
        MENU.map(function (m) { return '<li><a href="' + m[0] + '">' + esc(m[1]) + "</a></li>"; }).join("") +
      "</ul></nav></div>";
  }

  /* ---------- 2. Hero ---------- */
  function hero() {
    var h = S.hero;
    var arco = h.foto
      ? '<div class="arco-grupo">' +
          '<div class="arco arco--foto"><img src="' + esc(h.foto) + '" alt="Foto da ' + esc(S.aniversariante) + '" width="880" height="1100" fetchpriority="high"></div>' +
          '<p class="selo-idade"><span class="selo-idade__num">' + esc(S.idade) + '</span><span class="selo-idade__anos">anos</span>' +
            '<span class="selo-idade__brilho selo-idade__brilho--a" aria-hidden="true">' + ic("brilho") + "</span>" +
            '<span class="selo-idade__brilho selo-idade__brilho--b" aria-hidden="true">' + ic("brilho") + "</span>" +
            '<span class="selo-idade__brilho selo-idade__brilho--c" aria-hidden="true">' + ic("brilho") + "</span>" +
          "</p>" +
        "</div>"
      : '<div class="arco" role="img" aria-label="' + esc(S.idade) + ' anos">' +
        '<span class="arco__numero" aria-hidden="true">' + esc(S.idade) + "</span>" +
        '<span class="arco__anos" aria-hidden="true">anos</span></div>';

    return '<section class="hero escuro" id="inicio" aria-labelledby="titulo-hero">' +
      '<div class="container hero__grade">' +
        "<div>" +
          '<p class="sobretitulo">' + esc(h.sobretitulo) + "</p>" +
          '<h1 id="titulo-hero">' + esc(h.tituloLinha1) + ' <span class="destaque">' + esc(h.tituloLinha2) + "</span></h1>" +
          '<ul class="hero__info">' +
            "<li>" + ic("calendario") + "<span>" + esc(S.diaSemana) + ", " + esc(S.dataPorExtenso) + "</span></li>" +
            "<li>" + ic("relogio") + "<span>" + esc(S.horario) + "</span></li>" +
            "<li>" + ic("pin") + "<span>" + esc(S.nomeLocal) + " · " + esc(S.endereco) + "</span></li>" +
          "</ul>" +
          '<div class="botoes">' +
            '<a class="botao botao--caramelo" href="#presenca">Confirmar presença</a>' +
            '<a class="botao botao--contorno-claro" href="#presentes">Ver lista de presentes</a>' +
          "</div>" +
        "</div>" +
        '<div class="hero__arte">' + arco +
          '<span class="brilho brilho--1" aria-hidden="true">' + ic("brilho") + "</span>" +
          '<span class="brilho brilho--2" aria-hidden="true">' + ic("brilho") + "</span>" +
          '<span class="brilho brilho--3" aria-hidden="true">' + ic("brilho") + "</span>" +
        "</div>" +
      "</div></section>";
  }

  /* ---------- 3. Contagem regressiva ---------- */
  function contagem() {
    var blocos = [["dias", "dias"], ["horas", "horas"], ["min", "min"], ["seg", "seg"]];
    return '<section class="contagem" aria-labelledby="titulo-contagem"><div class="container">' +
      '<h2 id="titulo-contagem">' + esc(S.contagem.titulo) + "</h2>" +
      '<div class="contagem__blocos" role="timer" aria-live="off">' +
        blocos.map(function (b) {
          return '<div class="bloco"><span class="bloco__num" data-unidade="' + b[0] + '">00</span>' +
            '<span class="bloco__rot">' + b[1] + "</span></div>";
        }).join("") +
      "</div></div></section>";
  }

  /* ---------- 4. O evento ---------- */
  function evento() {
    var E = S.evento;
    function card(icone, rotulo, valor, extra) {
      return '<article class="card"><span class="icone-redondo">' + ic(icone) + "</span>" +
        '<p class="card__rotulo">' + rotulo + "</p>" +
        '<p class="card__valor">' + esc(valor) + "</p><p>" + esc(extra) + "</p></article>";
    }
    return '<section class="secao" id="evento" aria-labelledby="titulo-evento"><div class="container">' +
      '<p class="sobretitulo">' + esc(E.sobretitulo) + "</p>" +
      '<h2 class="titulo-secao" id="titulo-evento">' + esc(E.titulo) + "</h2>" +
      '<div class="grade-3">' +
        card("calendario", "Data", S.dataCurta, S.diaSemana) +
        card("relogio", "Horário", S.horario, E.obsHorario) +
        card("pin", "Local", S.nomeLocal, S.endereco) +
      "</div>" +
      '<p class="linha-whats">' + ic("conversa") + "<span>" + esc(E.duvidas) + "</span>" +
        '<a class="link" href="' + linkWhats + '" target="_blank" rel="noopener noreferrer">' +
        esc(S.whatsapp.texto) + NOVA_ABA + "</a></p>" +
      "</div></section>";
  }

  /* ---------- 5. Universo ---------- */
  function universo() {
    var U = S.universo, R = S.redes;
    var redes = [
      ["instagram", "Instagram", "https://www.instagram.com/" + R.instagram],
      ["tiktok", "TikTok", "https://www.tiktok.com/@" + R.tiktok],
      ["youtube", "YouTube", "https://www.youtube.com/@" + R.youtube]
    ];
    var arte =
      '<svg viewBox="0 0 240 300" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' +
        '<rect x="55" y="22" width="130" height="250" rx="30"/>' +
        '<path d="M102 40h36"/>' +
        '<circle cx="120" cy="138" r="34"/>' +
        '<path d="M110 121l27 17-27 17z"/>' +
        '<path d="M88 214h64M88 234h40"/>' +
        '<path d="M185 112c34-8 46-40 30-72" stroke-dasharray="3 12"/>' +
        brilho(212, 30, 14) + brilho(30, 92, 10) + brilho(34, 236, 13) + brilho(212, 196, 8) +
      "</svg>";

    return '<section class="secao" id="universo" aria-labelledby="titulo-universo"><div class="container">' +
      '<div class="universo"><div>' +
        '<p class="sobretitulo">' + esc(U.sobretitulo) + "</p>" +
        '<h2 class="titulo-secao" id="titulo-universo">' + esc(U.titulo) + "</h2>" +
        '<p class="texto-grande">' + esc(U.texto) + "</p>" +
        '<p class="universo__chamada">' + esc(U.chamada) + "</p>" +
        '<div class="botoes">' +
          redes.map(function (r) {
            return '<a class="botao botao--caramelo" href="' + esc(r[2]) + '" target="_blank" rel="noopener noreferrer">' +
              ic(r[0]) + r[1] + NOVA_ABA + "</a>";
          }).join("") +
        "</div>" +
      '</div><div class="universo__arte">' + arte + "</div></div>" +
      "</div></section>";
  }

  /* ---------- 6. Gincanas ---------- */
  function gincanas() {
    var G = S.gincanas;
    return '<section class="secao faixa-areia" id="gincanas" aria-labelledby="titulo-gincanas"><div class="container">' +
      '<h2 class="titulo-secao" id="titulo-gincanas">' + esc(G.titulo) + "</h2>" +
      '<p class="intro">' + esc(G.intro) + "</p>" +
      '<div class="grade-3">' +
        G.cards.map(function (c) {
          return '<article class="card"><span class="icone-redondo">' + ic(c.icone) + "</span>" +
            "<h3>" + esc(c.titulo) + "</h3><p>" + esc(c.texto) + "</p></article>";
        }).join("") +
      "</div></div></section>";
  }

  /* ---------- 7. Traje ---------- */
  function traje() {
    var T = S.traje;
    return '<section class="secao" id="traje" aria-labelledby="titulo-traje"><div class="container">' +
      '<h2 class="titulo-secao" id="titulo-traje">' + esc(T.titulo) + "</h2>" +
      '<div class="grade-2">' +
        '<article class="card"><span class="icone-redondo">' + ic("camisa") + "</span>" +
          "<h3>" + esc(T.confortavelTitulo) + "</h3><p>" + esc(T.confortavelTexto) + "</p></article>" +
        '<article class="card"><span class="icone-redondo">' + ic("proibido") + "</span>" +
          "<h3>" + esc(T.proibidasTitulo) + '</h3><p id="texto-cores">' + esc(T.proibidasTexto) + "</p>" +
          '<ul class="cores" aria-labelledby="texto-cores">' +
            T.cores.map(function (c) {
              return '<li><span class="bolinha" style="--cor:' + esc(c.cor) + '" aria-hidden="true"></span>' +
                '<span class="cores__nome">' + esc(c.nome) + "</span></li>";
            }).join("") +
          "</ul></article>" +
      "</div></div></section>";
  }

  /* ---------- 8. Como chegar ---------- */
  function comoChegar() {
    var mapa =
      '<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">' +
        '<rect class="m-fundo" width="400" height="300"/>' +
        '<rect class="m-quadra" x="18" y="18" width="96" height="70" rx="12"/>' +
        '<rect class="m-quadra" x="134" y="18" width="120" height="70" rx="12"/>' +
        '<rect class="m-quadra" x="274" y="18" width="108" height="70" rx="12"/>' +
        '<rect class="m-quadra" x="18" y="108" width="96" height="84" rx="12"/>' +
        '<rect class="m-quadra" x="274" y="108" width="108" height="84" rx="12"/>' +
        '<rect class="m-quadra" x="18" y="212" width="146" height="70" rx="12"/>' +
        '<rect class="m-quadra" x="184" y="212" width="198" height="70" rx="12"/>' +
        '<path class="m-avenida" d="M-10 255 C 120 250, 150 150, 250 140 S 380 60, 420 40"/>' +
        '<path class="m-trilho" d="M-10 98 H 410 M -10 104 H 410"/>' +
        Array.apply(null, Array(21)).map(function (_, i) {
          var x = i * 20;
          return '<path class="m-dormente" d="M' + x + " 94 V108\"/>";
        }).join("") +
        '<circle class="m-arvore" cx="60" cy="150" r="13"/><circle class="m-arvore" cx="84" cy="164" r="9"/>' +
        '<circle class="m-arvore" cx="330" cy="240" r="12"/><circle class="m-arvore" cx="352" cy="252" r="8"/>' +
        '<path class="m-rota" d="M70 250 C 110 240, 140 190, 196 170"/>' +
        '<circle class="m-inicio" cx="70" cy="250" r="8"/>' +
        '<g transform="translate(206 96)"><path class="m-pin" d="M0 70 C -6 58, -30 36, -30 18 A 30 30 0 0 1 30 18 C 30 36, 6 58, 0 70 Z"/>' +
        '<circle class="m-pin-centro" cx="0" cy="18" r="11"/></g>' +
      "</svg>";

    var ref = S.pontoReferencia
      ? '<p><strong>Ponto de referência:</strong> ' + esc(S.pontoReferencia) + "</p>"
      : "";

    return '<section class="secao" id="como-chegar" aria-labelledby="titulo-chegar"><div class="container">' +
      '<h2 class="titulo-secao" id="titulo-chegar">' + esc(S.comoChegar.titulo) + "</h2>" +
      '<div class="chegar">' +
        '<article class="card"><span class="icone-redondo">' + ic("mapa") + "</span>" +
          "<h3>" + esc(S.nomeLocal) + "</h3>" +
          '<p class="chegar__endereco">' + esc(S.endereco) + "</p>" + ref +
          '<a class="botao botao--chocolate" href="' + esc(linkMapa) + '" target="_blank" rel="noopener noreferrer">' +
            ic("pin") + esc(S.comoChegar.botao) + NOVA_ABA + "</a>" +
        "</article>" +
        '<div class="mapa-arte">' + mapa + "</div>" +
      "</div></div></section>";
  }

  /* ---------- 9. Presença ---------- */
  function presenca() {
    var pilulas = [1, 2, 3, 4].map(function (n) {
      return '<label class="pilula"><input type="radio" name="pessoas" value="' + n + '"' + (n === 1 ? " checked" : "") + ">" +
        "<span>" + n + '<span class="sr-only"> ' + (n === 1 ? "pessoa" : "pessoas") + "</span></span></label>";
    }).join("");

    return '<section class="secao escuro presenca" id="presenca" aria-labelledby="titulo-presenca"><div class="container">' +
      '<p class="sobretitulo centro">' + esc(S.presenca.sobretitulo) + "</p>" +
      '<h2 class="titulo-secao centro" id="titulo-presenca">' + esc(S.presenca.titulo) + "</h2>" +
      '<p class="lembrete">' + ic("sino") + "<span>Lembrete: Confirme até " + esc(S.dataLimite) + "</span></p>" +
      '<div class="form-card">' +
        '<form id="form-presenca" novalidate>' +
          '<div class="campo">' +
            '<label for="nome">Seu nome <span aria-hidden="true">*</span><span class="sr-only">(obrigatório)</span></label>' +
            '<input type="text" id="nome" name="nome" autocomplete="name" maxlength="80" required aria-describedby="erro-nome">' +
            '<p class="erro" id="erro-nome" hidden></p>' +
          "</div>" +
          '<fieldset class="campo"><legend>Quantas pessoas vão? <span class="dica">(contando com você)</span></legend>' +
            '<div class="pilulas">' + pilulas + "</div></fieldset>" +
          '<div class="campo" id="campo-acompanhantes" hidden>' +
            '<label for="acompanhantes">Nome dos acompanhantes <span aria-hidden="true">*</span><span class="sr-only">(obrigatório)</span> ' +
              '<span class="dica">(separe por vírgula)</span></label>' +
            '<input type="text" id="acompanhantes" name="acompanhantes" maxlength="300" autocomplete="off" aria-describedby="erro-acompanhantes">' +
            '<p class="erro" id="erro-acompanhantes" hidden></p>' +
          "</div>" +
          '<div class="campo">' +
            '<label for="recado">Recado para a ' + esc(S.aniversariante) + ' <span class="dica">(opcional)</span></label>' +
            '<textarea id="recado" name="recado" rows="3" maxlength="500"></textarea>' +
          "</div>" +
          '<div class="armadilha" aria-hidden="true"><label for="website">Não preencha este campo</label>' +
            '<input type="text" id="website" name="website" tabindex="-1" autocomplete="off"></div>' +
          '<div class="form-botoes">' +
            '<button class="botao botao--chocolate" type="submit" value="sim">' + ic("check") + "Confirmo presença</button>" +
            '<button class="botao botao--contorno" type="submit" value="nao">Não poderei ir</button>' +
          "</div>" +
          '<p class="form-status" id="status-presenca" role="status" aria-live="polite"></p>' +
        "</form>" +
        '<div class="sucesso" id="sucesso-presenca" tabindex="-1" hidden>' +
          '<span class="sucesso__icone">' + ic("coracao") + "</span>" +
          '<h3 id="sucesso-titulo"></h3><p id="sucesso-texto"></p>' +
          '<button class="botao botao--contorno" type="button" id="outra-resposta">Enviar outra resposta</button>' +
        "</div>" +
      "</div></div></section>";
  }

  /* ---------- 10. Presentes ---------- */
  function presentes() {
    return '<section class="secao" id="presentes" aria-labelledby="titulo-presentes"><div class="container">' +
      '<div class="presentes__topo"><div>' +
        '<h2 class="titulo-secao" id="titulo-presentes">' + esc(S.presentes.titulo) + "</h2>" +
        '<p class="intro">' + esc(S.presentes.intro) + "</p></div>" +
        '<p class="contador" id="contador-presentes">' + ic("presente") + "<span></span></p>" +
      "</div>" +
      (CATS.length > 1
        ? '<ul class="categorias" aria-label="Categorias de presentes">' +
            CATS.map(function (c) {
              return '<li><button class="categoria" type="button" data-categoria="' + esc(c.id) + '" aria-pressed="false" aria-controls="lista-presentes">' +
                esc(c.nome) + ' <span class="categoria__qtd"></span></button></li>';
            }).join("") + "</ul>"
        : "") +
      '<ul class="lista-presentes" id="lista-presentes"></ul>' +
      '<p class="status-presentes" id="status-presentes" role="status" aria-live="polite"></p>' +
      "</div></section>";
  }

  /* ---------- 11. Perguntas frequentes ---------- */
  function faq() {
    return '<section class="secao faixa-areia" id="duvidas" aria-labelledby="titulo-faq"><div class="estreito">' +
      '<h2 class="titulo-secao" id="titulo-faq">' + esc(S.faq.titulo) + "</h2>" +
      '<div class="faq">' +
        S.faq.perguntas.map(function (q, i) {
          return '<div class="faq__item"><h3>' +
            '<button type="button" id="faq-botao-' + i + '" aria-expanded="false" aria-controls="faq-resposta-' + i + '">' +
              "<span>" + esc(q.pergunta) + "</span>" + ic("seta") + "</button></h3>" +
            '<div class="faq__resposta" id="faq-resposta-' + i + '" role="region" aria-labelledby="faq-botao-' + i + '" hidden>' +
              "<p>" + destaque(q.resposta) + "</p></div></div>";
        }).join("") +
      "</div></div></section>";
  }

  /* ---------- 12. Rodapé ---------- */
  function rodape() {
    return '<div class="container">' +
      '<p class="rodape__frase">Nos vemos em ' + esc(S.dataRodape) + "!</p>" +
      '<p class="rodape__whats">Dúvidas? Fale com ' + esc(S.aniversariante) + " no " +
        '<a class="link" href="' + linkWhats + '" target="_blank" rel="noopener noreferrer">WhatsApp ' +
        esc(S.whatsapp.texto) + NOVA_ABA + "</a></p>" +
      '<p class="rodape__pequeno">' + esc(S.idade) + " " + esc(S.marca || "anos da " + S.aniversariante) + " · " + esc(S.dataPorExtenso) + "</p>" +
      "</div>";
  }

  /* ================================================================
     Comportamento
     ================================================================ */

  function iniciarMenu() {
    var botao = $(".menu-botao"), menu = $("#menu");
    function fechar() {
      menu.classList.remove("aberto");
      botao.setAttribute("aria-expanded", "false");
      botao.innerHTML = ic("menu") + "<span>Menu</span>";
    }
    botao.addEventListener("click", function () {
      var abrir = !menu.classList.contains("aberto");
      if (!abrir) return fechar();
      menu.classList.add("aberto");
      botao.setAttribute("aria-expanded", "true");
      botao.innerHTML = ic("fechar") + "<span>Fechar</span>";
    });
    menu.addEventListener("click", function (e) { if (e.target.closest("a")) fechar(); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menu.classList.contains("aberto")) { fechar(); botao.focus(); }
    });
  }

  function iniciarContagem() {
    var alvo = new Date(S.dataFesta).getTime();
    var titulo = $("#titulo-contagem"), blocos = $(".contagem__blocos");
    var el = {};
    $$("[data-unidade]").forEach(function (n) { el[n.getAttribute("data-unidade")] = n; });
    if (isNaN(alvo)) { blocos.hidden = true; return; }
    var timer;
    function dois(n) { return n < 10 ? "0" + n : String(n); }
    function tique() {
      var falta = alvo - Date.now();
      if (falta <= 0) {
        titulo.textContent = S.contagem.fim;
        blocos.hidden = true;
        clearInterval(timer);
        return;
      }
      var s = Math.floor(falta / 1000);
      var d = Math.floor(s / 86400), h = Math.floor((s % 86400) / 3600), m = Math.floor((s % 3600) / 60), sg = s % 60;
      el.dias.textContent = dois(d);
      el.horas.textContent = dois(h);
      el.min.textContent = dois(m);
      el.seg.textContent = dois(sg);
      blocos.setAttribute("aria-label", "Faltam " + d + " dias, " + h + " horas, " + m + " minutos e " + sg + " segundos");
    }
    tique();
    timer = setInterval(tique, 1000);
  }

  function iniciarFaq() {
    var botoes = $$(".faq__item button");
    function alternar(b, abrir) {
      b.setAttribute("aria-expanded", String(abrir));
      document.getElementById(b.getAttribute("aria-controls")).hidden = !abrir;
    }
    botoes.forEach(function (b) {
      b.addEventListener("click", function () {
        var abrir = b.getAttribute("aria-expanded") !== "true";
        // Só uma resposta aberta por vez: abrir uma fecha a anterior
        if (abrir) botoes.forEach(function (outro) { if (outro !== b) alternar(outro, false); });
        alternar(b, abrir);
      });
    });
  }

  function iniciarPresenca() {
    var form = $("#form-presenca"), status = $("#status-presenca"), sucesso = $("#sucesso-presenca");
    var campoNome = form.elements.nome, erroNome = $("#erro-nome");
    var ultimoBotao = "sim";
    $$('button[type="submit"]', form).forEach(function (b) {
      b.addEventListener("click", function () { ultimoBotao = b.value; });
    });

    // "Nome dos acompanhantes" só aparece quando vai mais de 1 pessoa
    var blocoAcomp = $("#campo-acompanhantes"), campoAcomp = form.elements.acompanhantes, erroAcomp = $("#erro-acompanhantes");
    function qtdPessoas() {
      var marcado = form.querySelector('input[name="pessoas"]:checked');
      return marcado ? Number(marcado.value) : 1;
    }
    function limparErroAcomp() { campoAcomp.removeAttribute("aria-invalid"); erroAcomp.hidden = true; }
    function mostrarAcomp() {
      var n = qtdPessoas();
      blocoAcomp.hidden = n < 2;
      campoAcomp.placeholder = n === 2 ? "Ex.: Ana Souza" : "Ex.: Ana Souza, João Lima";
      if (n < 2) limparErroAcomp();
    }
    $$('input[name="pessoas"]', form).forEach(function (r) { r.addEventListener("change", mostrarAcomp); });
    mostrarAcomp();

    form.addEventListener("submit", async function (ev) {
      ev.preventDefault();
      var vai = (ev.submitter ? ev.submitter.value : ultimoBotao) === "sim";
      var nome = campoNome.value.replace(/\s+/g, " ").trim();

      if (nome.length < 2) {
        campoNome.setAttribute("aria-invalid", "true");
        erroNome.textContent = "Escreva seu nome para a " + S.aniversariante + " saber quem é você.";
        erroNome.hidden = false;
        campoNome.focus();
        return;
      }
      campoNome.removeAttribute("aria-invalid");
      erroNome.hidden = true;

      var pessoas = qtdPessoas();
      var acompanhantes = pessoas > 1 ? campoAcomp.value.replace(/\s+/g, " ").trim() : "";
      if (vai && pessoas > 1 && acompanhantes.length < 2) {
        campoAcomp.setAttribute("aria-invalid", "true");
        erroAcomp.textContent = "Escreva o nome de quem vai com você.";
        erroAcomp.hidden = false;
        campoAcomp.focus();
        return;
      }
      limparErroAcomp();

      var botoes = $$("button", form);
      botoes.forEach(function (b) { b.disabled = true; });
      status.textContent = "Enviando…";

      try {
        await API.confirmar({
          nome: nome, pessoas: pessoas, acompanhantes: acompanhantes, recado: form.elements.recado.value, vai: vai,
          armadilha: form.elements.website.value
        });
        var primeiroNome = nome.split(" ")[0];
        $("#sucesso-titulo").textContent = vai ? "Presença confirmada!" : "Resposta enviada";
        $("#sucesso-texto").textContent = vai
          ? "Obrigada, " + primeiroNome + "! Te espero no dia " + S.dataCurta + " às " + S.horario + "." +
            (pessoas > 1 ? " Anotei " + pessoas + " pessoas." : "")
          : "Que pena, " + primeiroNome + "! Obrigada por avisar. Vou sentir sua falta.";
        status.textContent = "";
        form.hidden = true;
        sucesso.hidden = false;
        sucesso.focus();
      } catch (err) {
        status.textContent = err.message;
      } finally {
        botoes.forEach(function (b) { b.disabled = false; });
      }
    });

    $("#outra-resposta").addEventListener("click", function () {
      form.reset();
      mostrarAcomp();
      sucesso.hidden = true;
      form.hidden = false;
      campoNome.focus();
    });
  }

  /* ---------- Presentes ---------- */
  var CHAVE_MEUS = "carol31-meus-presentes";
  var escolhidos = new Set();

  function meus() {
    try { return JSON.parse(localStorage.getItem(CHAVE_MEUS)) || {}; } catch (e) { return {}; }
  }
  function salvarMeus(m) { localStorage.setItem(CHAVE_MEUS, JSON.stringify(m)); }
  function novoCodigo() {
    var a = new Uint8Array(16);
    crypto.getRandomValues(a);
    return Array.prototype.map.call(a, function (b) { return ("0" + b.toString(16)).slice(-2); }).join("");
  }

  function cardPresente(p, m) {
    var escolhido = escolhidos.has(p.id);
    var meu = escolhido && !!m[p.id];
    var imagem = p.foto
      ? '<img src="' + esc(p.foto) + '" alt="" loading="lazy">'
      : ic(p.icone || "presente");
    var info = [];
    if (p.tamanho) info.push("<li><span>Tamanho:</span> " + esc(p.tamanho) + "</li>");
    if (p.cor) info.push("<li><span>Cor:</span> " + esc(p.cor) + "</li>");
    var detalhes =
      (p.autor ? '<p class="presente__autor">por ' + esc(p.autor) + "</p>" : "") +
      (info.length ? '<ul class="presente__info">' + info.join("") + "</ul>" : "") +
      (p.detalhes ? '<p class="presente__detalhes">' + esc(p.detalhes) + "</p>" : "");
    var comprar = '<a class="botao botao--contorno botao--pequeno" href="' + esc(p.link) + '" target="_blank" rel="noopener noreferrer">' +
      "Comprar" + ic("externo") + '<span class="sr-only"> ' + esc(p.nome) + " na loja " + esc(p.loja) + " (abre em nova aba)</span></a>";
    var botoes;
    if (!escolhido) {
      botoes = '<div class="presente__botoes">' + comprar +
        '<button class="botao botao--caramelo botao--pequeno" type="button" data-acao="escolher">Vou dar este' +
        '<span class="sr-only">: ' + esc(p.nome) + "</span></button></div>";
    } else if (meu) {
      botoes = '<div class="presente__botoes">' + comprar +
        '<button class="botao botao--contorno botao--pequeno" type="button" data-acao="desfazer">' + ic("desfazer") +
        "Desfazer" + '<span class="sr-only"> a escolha de ' + esc(p.nome) + "</span></button></div>";
    } else {
      botoes = '<p class="presente__aviso">Alguém já vai dar este presente.</p>';
    }
    return '<li class="presente' + (escolhido ? " escolhido" : "") + '" data-id="' + esc(p.id) + '">' +
      '<div class="presente__imagem">' +
        (escolhido ? '<span class="selo">' + ic("check") + "Já escolhido</span>" : "") + imagem +
      "</div>" +
      '<div class="presente__corpo">' +
        "<h3>" + esc(p.nome) + "</h3>" + detalhes +
        botoes +
      "</div></li>";
  }

  var categoriaAtual = CATS.length ? CATS[0].id : null;

  function desenharPresentes(focarId, focarAcao) {
    var m = meus();
    var visiveis = categoriaAtual ? P.filter(function (p) { return p.categoria === categoriaAtual; }) : P;
    $("#lista-presentes").innerHTML = visiveis.map(function (p) { return cardPresente(p, m); }).join("");
    var livres = P.filter(function (p) { return !escolhidos.has(p.id); }).length;
    $("#contador-presentes span").innerHTML = "<strong>" + livres + "</strong> de " + P.length + " disponíveis";
    $$(".categoria").forEach(function (b) {
      var id = b.getAttribute("data-categoria");
      var daCat = P.filter(function (p) { return p.categoria === id; });
      var livresCat = daCat.filter(function (p) { return !escolhidos.has(p.id); }).length;
      b.setAttribute("aria-pressed", String(id === categoriaAtual));
      b.querySelector(".categoria__qtd").textContent = "(" + livresCat + ")";
      b.setAttribute("aria-label", b.firstChild.textContent.trim() + ", " + livresCat + " disponíveis");
    });
    if (focarId) {
      var card = document.querySelector('.presente[data-id="' + focarId + '"]');
      var alvo = card && (card.querySelector('[data-acao="' + focarAcao + '"]') || card.querySelector("button, a"));
      if (alvo) alvo.focus();
    }
  }

  async function atualizarPresentes() {
    try {
      var lista = await API.statusPresentes();
      escolhidos = new Set(lista);
      // Se a Carol liberou um item pelo admin, esquece o código guardado
      var m = meus(), mudou = false;
      Object.keys(m).forEach(function (id) { if (!escolhidos.has(id)) { delete m[id]; mudou = true; } });
      if (mudou) salvarMeus(m);
    } catch (e) {
      $("#status-presentes").textContent = "Não consegui carregar quais presentes já foram escolhidos. Recarregue a página.";
    }
    var ativo = document.activeElement;
    var dentro = ativo && ativo.closest && ativo.closest(".presente");
    if (dentro) return; // não redesenha enquanto alguém está usando um card pelo teclado
    desenharPresentes();
  }

  function iniciarPresentes() {
    var status = $("#status-presentes");
    desenharPresentes();
    atualizarPresentes();
    setInterval(atualizarPresentes, 30000);
    document.addEventListener("visibilitychange", function () { if (!document.hidden) atualizarPresentes(); });

    $$(".categoria").forEach(function (b) {
      b.addEventListener("click", function () {
        categoriaAtual = b.getAttribute("data-categoria");
        status.textContent = "";
        desenharPresentes();
      });
    });

    $("#lista-presentes").addEventListener("click", async function (e) {
      var botao = e.target.closest("button[data-acao]");
      if (!botao) return;
      var card = botao.closest(".presente");
      var id = card.getAttribute("data-id");
      var presente = P.find(function (p) { return p.id === id; });
      var acao = botao.getAttribute("data-acao");
      botao.disabled = true;
      status.textContent = "Um instante…";

      try {
        if (acao === "escolher") {
          var codigo = novoCodigo();
          var ok = await API.escolher(id, codigo);
          if (ok) {
            var m = meus(); m[id] = codigo; salvarMeus(m);
            escolhidos.add(id);
            desenharPresentes(id, "desfazer");
            status.textContent = "Obrigada! \"" + presente.nome + "\" ficou reservado para você.";
          } else {
            escolhidos.add(id);
            desenharPresentes();
            status.textContent = "Ops! Alguém escolheu \"" + presente.nome + "\" agora há pouco. Que tal outro item?";
          }
        } else {
          var m2 = meus();
          var ok2 = await API.desfazer(id, m2[id]);
          delete m2[id]; salvarMeus(m2);
          if (ok2) {
            escolhidos.delete(id);
            desenharPresentes(id, "escolher");
            status.textContent = "Pronto, \"" + presente.nome + "\" voltou para a lista.";
          } else {
            await atualizarPresentes();
            desenharPresentes();
            status.textContent = "Não foi possível desfazer. Se precisar, fale com a " + S.aniversariante + " pelo WhatsApp.";
          }
        }
      } catch (err) {
        botao.disabled = false;
        status.textContent = err.message;
      }
    });
  }

  /* ---------- Montagem ---------- */
  function montar() {
    if (API.demo) {
      $("#aviso-demo").innerHTML = '<p class="aviso-demo" style="margin:0"><strong>Modo demonstração:</strong> ' +
        "as respostas ficam salvas só neste navegador. Para receber de verdade, siga o passo 3 do guia (README.md).</p>";
    }
    $("#topo").innerHTML = topo();
    $("#conteudo").innerHTML =
      hero() + contagem() + universo() + evento() + gincanas() + traje() + comoChegar() + presenca() + presentes() + faq();
    $("#rodape").innerHTML = rodape();

    iniciarMenu();
    iniciarContagem();
    iniciarFaq();
    iniciarPresenca();
    iniciarPresentes();

    // Links como ".../#presenca" pulam para a seção depois que a página é montada
    if (location.hash.length > 1) {
      var alvo = document.getElementById(decodeURIComponent(location.hash.slice(1)));
      if (alvo) {
        var pular = function () { alvo.scrollIntoView({ block: "start", behavior: "instant" }); };
        if (document.readyState === "complete") setTimeout(pular, 50);
        else window.addEventListener("load", function () { setTimeout(pular, 50); });
      }
    }
  }

  montar();
})();
