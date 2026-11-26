/* ================================================================
   LISTA DE PRESENTES (pode editar à vontade)

   Cada presente fica entre chaves { } e tem:
   - id:       nome curto, ÚNICO, só letras minúsculas, números e hífen (ex.: "jogo-de-tacas").
               Depois que alguém escolher o presente, NÃO troque o id dele.
   - nome:     como aparece no card.
   - detalhes: tamanho, cor, voltagem etc.
   - loja:     nome da loja sugerida.
   - link:     endereço da página do produto (copie da barra do navegador).
   - icone:    desenho usado quando não há foto. Opções: tacas, som, camisa,
               panela, luminaria, tenis, presente.
   - foto:     opcional. Coloque a imagem na pasta "imagens" e escreva, por exemplo,
               "imagens/tacas.jpg". Vazio = usa o ícone.

   Para adicionar um presente, copie um bloco inteiro { ... }, cole abaixo
   do último, separe com vírgula e troque os textos.
   ================================================================ */

window.PRESENTES = [
  {
    id: "jogo-de-tacas",
    nome: "Jogo de taças",
    detalhes: "Cristal, 6 unidades, para vinho",
    loja: "Amazon",
    link: "https://www.amazon.com.br/s?k=jogo+de+ta%C3%A7as+de+cristal+6+unidades",
    icone: "tacas",
    foto: ""
  },
  {
    id: "caixa-de-som",
    nome: "Caixa de som Bluetooth",
    detalhes: "Portátil, resistente à água, cor preta",
    loja: "Magalu",
    link: "https://www.magazineluiza.com.br/busca/caixa+de+som+bluetooth/",
    icone: "som",
    foto: ""
  },
  {
    id: "camisa-polo",
    nome: "Camisa polo",
    detalhes: "Tamanho M, cor verde-oliva",
    loja: "Mercado Livre",
    link: "https://lista.mercadolivre.com.br/camisa-polo-feminina",
    icone: "camisa",
    foto: ""
  },
  {
    id: "kit-de-panelas",
    nome: "Kit de panelas",
    detalhes: "Antiaderente, 5 peças, para fogão a gás",
    loja: "Magalu",
    link: "https://www.magazineluiza.com.br/busca/kit+de+panelas+antiaderente/",
    icone: "panela",
    foto: ""
  },
  {
    id: "luminaria-de-mesa",
    nome: "Luminária de mesa",
    detalhes: "Luz quente, bivolt, base articulada",
    loja: "Amazon",
    link: "https://www.amazon.com.br/s?k=lumin%C3%A1ria+de+mesa+articulada",
    icone: "luminaria",
    foto: ""
  },
  {
    id: "tenis-casual",
    nome: "Tênis casual",
    detalhes: "Tamanho 37, cor preta",
    loja: "Mercado Livre",
    link: "https://lista.mercadolivre.com.br/tenis-casual-feminino",
    icone: "tenis",
    foto: ""
  }
];
