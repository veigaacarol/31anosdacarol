/* ================================================================
   TEXTOS DO SITE (pode editar à vontade)

   Como editar sem quebrar nada:
   - Troque só o que está entre aspas "assim".
   - Não apague as aspas, as vírgulas no fim das linhas nem as chaves { }.
   - Depois de salvar, recarregue a página para ver a mudança.
   ================================================================ */

window.SITE = {
  aniversariante: "Carol",
  idade: 31,
  marca: "anos da Carol", // aparece depois do número na barra superior: "31 anos da Carol"

  /* Data e hora da festa, usadas na CONTAGEM REGRESSIVA.
     Formato: ANO-MÊS-DIA T HORA:MINUTO:00 e o fuso -03:00 (Rio de Janeiro). */
  dataFesta: "2026-12-19T17:30:00-03:00",

  /* Como a data aparece escrita no site */
  diaSemana: "Sábado",
  dataPorExtenso: "19 de dezembro de 2026",
  dataCurta: "19/12/2026",
  dataRodape: "19/12",
  horario: "17h30",

  /* Local */
  nomeLocal: "Rua Álamo, nº 17",
  endereco: "Marechal Hermes, Rio de Janeiro – RJ",
  enderecoParaMapa: "Rua Álamo, 17 - Marechal Hermes, Rio de Janeiro - RJ",
  pontoReferencia: "", // ex.: "Perto da estação de trem de Marechal Hermes". Vazio = não aparece no site.

  /* Prazo para confirmar presença */
  dataLimite: "05/12/2026",

  /* WhatsApp: "numero" só com dígitos (55 + DDD + número). "texto" é como aparece na tela. */
  whatsapp: { numero: "5521982538611", texto: "(21) 98253-8611" },

  /* Redes sociais: só o nome de usuário, sem o @ */
  redes: {
    instagram: "veigaacarol",
    tiktok: "veigaacarol",
    youtube: "veigaacarol"
  },

  hero: {
    sobretitulo: "Você está convidado para",
    tituloLinha1: "O aniversário da",
    tituloLinha2: "Carol",
    foto: "imagens/carol.jpg" // Para colocar uma foto no arco: salve a imagem na pasta "imagens" e escreva aqui, ex.: "imagens/carol.jpg"
  },

  contagem: {
    titulo: "Falta pouco para a festa!",
    fim: "A festa começou!"
  },

  evento: {
    sobretitulo: "Anote na agenda",
    titulo: "O evento",
    obsHorario: "Chegue no horário para não perder a abertura",
    duvidas: "Ficou com alguma dúvida? Me chama no WhatsApp:"
  },

  universo: {
    sobretitulo: "A imersão",
    titulo: "Entre no meu universo",
    texto: "Por um dia, você sai de trás da tela e entra no meu universo! Já imaginou acompanhar os bastidores de um conteúdo? Ou quem sabe fazer parte dele? Será uma noite de conteúdos, jogos, brincadeiras e muitas risadas. Afinal, se não render uma boa história ou uma gargalhada, não sou eu, não é mesmo? Animadíssima pra comemorarmos juntos!",
    chamada: "Enquanto a festa não chega, me acompanhe por aqui:"
  },

  gincanas: {
    titulo: "Gincanas e brincadeiras",
    intro: "Os detalhes ficam de surpresa. Só posso adiantar isto:",
    cards: [
      { icone: "controle", titulo: "Jogos", texto: "Desafios rápidos para todo mundo entrar na brincadeira." },
      { icone: "trofeu", titulo: "Gincanas", texto: "Equipes, provas e prêmios. As regras? Só no dia." },
      { icone: "microfone", titulo: "Clima de auditório", texto: "Plateia animada, apresentadora no palco e muita torcida." }
    ]
  },

  traje: {
    titulo: "Traje",
    confortavelTitulo: "Roupa confortável",
    confortavelTexto: "Vai ter jogo e movimento, então venha pronto para brincar e se divertir sem preocupação.",
    proibidasTitulo: "Cores proibidas",
    proibidasTexto: "Nesse dia, deixe estas cores em casa:",
    cores: [
      { nome: "Marrom", cor: "#5C3D2E" },
      { nome: "Bege", cor: "#D8C3A5" },
      { nome: "Off-white", cor: "#F3EEE3" },
      { nome: "Branco", cor: "#FFFFFF" }
    ]
  },

  comoChegar: {
    titulo: "Como chegar",
    botao: "Abrir no Google Maps"
  },

  presenca: {
    sobretitulo: "Sua resposta",
    titulo: "Confirme sua presença"
  },

  presentes: {
    titulo: "Lista de presentes",
    intro: "Sua presença é o melhor presente. Se quiser me mimar, funciona assim: toque em \"Comprar\" para ver o item na loja e, depois, em \"Vou dar este\" para reservar e ninguém repetir."
  },

  /* Nas respostas: ***texto*** = negrito e itálico, **texto** = negrito, *texto* = itálico */
  faq: {
    titulo: "Perguntas frequentes",
    perguntas: [
      { pergunta: "O que devo saber antes desse evento?", resposta: "Você precisa estar preparado para boas risadas e com o seu melhor espírito de competição. Afinal, nossa aniversariante é extremamente competitiva e não vai deixar ninguém passar despercebido. Será uma noite com muitos jogos e diversão e, claro, algumas surpresas e mimos da nossa blogueira preferida." },
      { pergunta: "Posso levar acompanhante?", resposta: "Pode, desde que o direito a acompanhante tenha sido informado no convite enviado." },
      { pergunta: "Como funcionam os jogos e as gincanas?", resposta: "Não vamos contar muitos detalhes para não estragar as surpresas, mas venham preparados e com roupas confortáveis. Porém… ***ALERTA DE SPOILER:*** aproveite para acompanhar e maratonar os conteúdos da nossa blogueira, pois algumas pistas serão dadas. Quanto mais informações você tiver, melhor vai se sair." },
      { pergunta: "Preciso levar comida e bebida?", resposta: "Não, gente! A festa vai seguir o clima tradicional das festas dos anos 2000: tudo vai ser fornecido pela aniversariante." },
      { pergunta: "Até quando preciso confirmar?", resposta: "Até 05/12/2026. Assim conseguimos organizar tudo com carinho para receber você." },
      { pergunta: "Tem estacionamento?", resposta: "Como o endereço é uma rua residencial, não tem nenhum problema em estacionar ao longo da rua, além de ser seguro." },
      { pergunta: "Preciso dar presente?", resposta: "Não é obrigatório. Sua presença já é o presente! Mas, se quiser mimar nossa aniversariante, a lista está aqui no site." }
    ]
  }
};
