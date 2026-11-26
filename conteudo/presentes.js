/* ================================================================
   LISTA DE PRESENTES (pode editar à vontade)

   CATEGORIAS: as abas que aparecem acima da lista, na ordem em que estão aqui.

   Cada presente fica entre chaves { } e tem:
   - id:        nome curto, ÚNICO, só letras minúsculas, números e hífen.
                Depois que alguém escolher o presente, NÃO troque o id dele.
   - categoria: "livros", "fitness" ou "make" (igual ao id da categoria).
   - nome:      como aparece no card.
   - autor:     só para livros. Vazio = não aparece.
   - tamanho:   ex.: "G", "10 g", "120 ml". Vazio = não aparece.
   - cor:       ex.: "Preto". Vazio = não aparece.
   - loja:      nome da loja (usado pelos leitores de tela no botão Comprar).
   - link:      endereço da página do produto.
   - foto:      a imagem fica na pasta "imagens/presentes".

   Para adicionar um presente, copie um bloco inteiro { ... }, cole abaixo
   do último da mesma categoria, separe com vírgula e troque os textos.
   ================================================================ */

window.CATEGORIAS_PRESENTES = [
  { id: "livros", nome: "Livros" },
  { id: "fitness", nome: "Fitness" },
  { id: "make", nome: "Make" }
];

window.PRESENTES = [
  /* ---------- Livros ---------- */
  {
    id: "aurora", categoria: "livros",
    nome: "Aurora: O despertar da mulher exausta",
    autor: "Marcela Ceribelli", tamanho: "", cor: "",
    loja: "Amazon", link: "https://www.amazon.com.br/dp/6555114215",
    foto: "imagens/presentes/aurora.jpg"
  },
  {
    id: "pense-de-novo", categoria: "livros",
    nome: "Pense de novo: O poder de saber o que você não sabe",
    autor: "Adam Grant", tamanho: "", cor: "",
    loja: "Amazon", link: "https://www.amazon.com.br/dp/655564186X",
    foto: "imagens/presentes/pense-de-novo.jpg"
  },
  {
    id: "10-estrategias-de-marketing", categoria: "livros",
    nome: "10 Estratégias de Marketing: Como transformar atenção em faturamento",
    autor: "Letícia Vaz", tamanho: "", cor: "",
    loja: "Amazon", link: "https://www.amazon.com.br/dp/658628242X",
    foto: "imagens/presentes/10-estrategias-de-marketing.jpg"
  },
  {
    id: "o-caminho-do-artista", categoria: "livros",
    nome: "O caminho do artista: Desperte o seu potencial criativo e rompa seus bloqueios",
    autor: "Julia Cameron", tamanho: "", cor: "",
    loja: "Amazon", link: "https://www.amazon.com.br/dp/8543105544",
    foto: "imagens/presentes/o-caminho-do-artista.jpg"
  },
  {
    id: "a-selecao", categoria: "livros",
    nome: "A Seleção (volume 1)",
    autor: "Kiera Cass", tamanho: "", cor: "",
    loja: "Amazon", link: "https://www.amazon.com.br/dp/8565765016",
    foto: "imagens/presentes/a-selecao.jpg"
  },
  {
    id: "a-elite", categoria: "livros",
    nome: "A Elite (volume 2)",
    autor: "Kiera Cass", tamanho: "", cor: "",
    loja: "Amazon", link: "https://www.amazon.com.br/dp/8565765121",
    foto: "imagens/presentes/a-elite.jpg"
  },
  {
    id: "a-escolha", categoria: "livros",
    nome: "A Escolha (volume 3)",
    autor: "Kiera Cass", tamanho: "", cor: "",
    loja: "Amazon", link: "https://www.amazon.com.br/dp/8565765377",
    foto: "imagens/presentes/a-escolha.jpg"
  },

  /* ---------- Fitness ---------- */
  {
    id: "macaquinho-new-fluity-botanical", categoria: "fitness",
    nome: "Macaquinho New Fluity Botanical",
    autor: "", tamanho: "G", cor: "Botanical (verde)",
    loja: "Avvi", link: "https://www.avvi.com.br/produto/1050/AMQ284.Botanical-macaquinho-new-fluity-botanical",
    foto: "imagens/presentes/macaquinho-new-fluity-botanical.jpg"
  },
  {
    id: "blusa-frente-unica-puresense-preto", categoria: "fitness",
    nome: "Blusa Frente Única em Poliamida Puresense",
    autor: "", tamanho: "G", cor: "Preto",
    loja: "Hardyn", link: "https://www.hardyn.com.br/produto/2732/HDN2521-blusa-frente-unica-em-poliamida-puresense-preto",
    foto: "imagens/presentes/blusa-frente-unica-puresense-preto.jpg"
  },
  {
    id: "macaquinho-smile-coffee", categoria: "fitness",
    nome: "Macaquinho Smile Coffee",
    autor: "", tamanho: "G", cor: "Coffee (marrom)",
    loja: "Avvi", link: "https://www.avvi.com.br/produto/397/AMQ115.COFFEE-macaquinho-smile-coffee---marrom/black-friday-2026/",
    foto: "imagens/presentes/macaquinho-smile-coffee.jpg"
  },
  {
    id: "legging-lunar-flow-coffee", categoria: "fitness",
    nome: "Legging Lunar Flow Coffee",
    autor: "", tamanho: "G", cor: "Coffee (marrom)",
    loja: "Avvi", link: "https://www.avvi.com.br/produto/1164/ALG260.Coffee-legging-lunar-flow-coffee",
    foto: "imagens/presentes/legging-lunar-flow-coffee.jpg"
  },
  {
    id: "top-basico-coffee-decote-u", categoria: "fitness",
    nome: "Top Básico Coffee Decote U",
    autor: "", tamanho: "G", cor: "Coffee (marrom)",
    loja: "Avvi", link: "https://www.avvi.com.br/produto/221/ATP23.Coffee-top-basico-coffee-decote-u---marrom/black-friday-2026/",
    foto: "imagens/presentes/top-basico-coffee-decote-u.jpg"
  },
  {
    id: "macacao-flare-motion-botanical", categoria: "fitness",
    nome: "Macacão Flare Motion Botanical",
    autor: "", tamanho: "G", cor: "Botanical (verde)",
    loja: "Avvi", link: "https://www.avvi.com.br/produto/1339/AMC291.Botanical-macacao-flare-motion-botanical/black-friday-2026/",
    foto: "imagens/presentes/macacao-flare-motion-botanical.jpg"
  },
  {
    id: "macaquinho-utility-preto", categoria: "fitness",
    nome: "Macaquinho Utility Preto",
    autor: "", tamanho: "G", cor: "Preto",
    loja: "Avvi", link: "https://www.avvi.com.br/produto/1249/AMQ286.Preto-macaquinho-utility-preto/black-friday-2026/",
    foto: "imagens/presentes/macaquinho-utility-preto.jpg"
  },
  {
    id: "macacao-flame-botanical", categoria: "fitness",
    nome: "Macacão Flame Botanical",
    autor: "", tamanho: "G", cor: "Botanical (verde)",
    loja: "Avvi", link: "https://www.avvi.com.br/produto/1261/AMC287.Botanical-macacao-flame-botanical",
    foto: "imagens/presentes/macacao-flame-botanical.jpg"
  },
  {
    id: "macaquinho-lunar-flow-coffee", categoria: "fitness",
    nome: "Macaquinho Lunar Flow Coffee",
    autor: "", tamanho: "G", cor: "Coffee (marrom)",
    loja: "Avvi", link: "https://www.avvi.com.br/produto/1167/AMQ260.Coffee-macaquinho-lunar-flow-coffee/black-friday-2026/",
    foto: "imagens/presentes/macaquinho-lunar-flow-coffee.jpg"
  },
  {
    id: "macaquinho-light-stella-preto", categoria: "fitness",
    nome: "Macaquinho Light Stella Preto",
    autor: "", tamanho: "G", cor: "Preto",
    loja: "Avvi", link: "https://www.avvi.com.br/produto/1047/AMQ269.Preto-macaquinho-light-stella-preto/black-friday-2026/",
    foto: "imagens/presentes/macaquinho-light-stella-preto.jpg"
  },
  {
    id: "macaquinho-smile-preto", categoria: "fitness",
    nome: "Macaquinho Smile Preto",
    autor: "", tamanho: "G", cor: "Preto",
    loja: "Avvi", link: "https://www.avvi.com.br/produto/325/AMQ115.PRETO-macaquinho-smile-preto/black-friday-2026/",
    foto: "imagens/presentes/macaquinho-smile-preto.jpg"
  },
  {
    id: "macacao-viva-coffee", categoria: "fitness",
    nome: "Macacão Viva Coffee",
    autor: "", tamanho: "G", cor: "Coffee (marrom)",
    loja: "Avvi", link: "https://www.avvi.com.br/produto/802/AMC108.Coffee-macacao-viva-coffee/black-friday-2026/",
    foto: "imagens/presentes/macacao-viva-coffee.jpg"
  },

  /* ---------- Make ---------- */
  {
    id: "lip-oil-guava-mocha", categoria: "make",
    nome: "Lip Oil Hidratante Multirreparador Guava",
    autor: "", tamanho: "", cor: "Mocha",
    loja: "Guava", link: "https://guavaskin.com/products/lip-oil-multireparador-pantenol-5?variant=50248719171895",
    foto: "imagens/presentes/lip-oil-guava-mocha.jpg"
  },
  {
    id: "lip-balm-mascavo-truffle", categoria: "make",
    nome: "Mascavo Melted Butter Lip Balm",
    autor: "", tamanho: "10 g", cor: "Truffle",
    loja: "Mascavo", link: "https://www.mascavo.com/mascavo-melted-butter-balm-lip-balm-truffle-10g/p",
    foto: "imagens/presentes/lip-balm-mascavo-truffle.jpg"
  },
  {
    id: "fixador-ate-embaixo-dagua", categoria: "make",
    nome: "Fixador Até Embaixo d'Água · Maria Margarida",
    autor: "", tamanho: "120 ml", cor: "",
    loja: "Maria Margarida", link: "https://www.mariamargarida.com.br/fixador-ate-embaixo-da-agua?variation=26836806&utm_source=flipnet&utm_campaign=veigaacarol",
    foto: "imagens/presentes/fixador-ate-embaixo-dagua.jpg"
  },
  {
    id: "corretivo-camuflagem-vizzela-salmao", categoria: "make",
    nome: "Corretivo Camuflagem Vizzela",
    autor: "", tamanho: "", cor: "Salmão",
    loja: "C&A", link: "https://minhacea.cea.com.br/?lcea=NTY5NDVfOTFjZDhk",
    foto: "imagens/presentes/corretivo-camuflagem-vizzela-salmao.jpg"
  },
  {
    id: "kit-ox-science-mari-maria", categoria: "make",
    nome: "Kit Ox Science Mari Maria: óleo especial e gloss",
    autor: "", tamanho: "Óleo 15 ml + gloss 4 ml", cor: "Chocolate (gloss)",
    loja: "C&A", link: "https://minhacea.cea.com.br/?lcea=NTY5NDVfNmJiODky",
    foto: "imagens/presentes/kit-ox-science-mari-maria.jpg"
  }
];
