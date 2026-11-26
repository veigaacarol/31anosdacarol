# Convite · Carol 31

Site-convite do aniversário da Carol: uma página única, feita para celular,
com confirmação de presença e lista de presentes salvas de verdade.

- **Site:** `index.html`
- **Área da Carol (admin):** pasta `admin` (no ar, fica em `.../admin/`)
- **Banco de dados:** Supabase (gratuito)
- **Hospedagem:** GitHub Pages (gratuito)

Não precisa instalar nada no computador.

---

## O que tem em cada pasta

| Arquivo | Para que serve | Posso editar? |
|---|---|---|
| `conteudo/site.js` | Todos os textos: data, horário, endereço, WhatsApp, redes, perguntas frequentes | **Sim** |
| `conteudo/presentes.js` | A lista de presentes | **Sim** |
| `conteudo/conexao.js` | Endereço e chave pública do Supabase | Sim, uma vez (passo 3) |
| `estilo/cores.css` | As 5 cores e as fontes do site | **Sim** |
| `imagens/` | Fotos (sua e dos presentes), se quiser usar | Sim |
| `supabase/banco.sql` | Cria o banco de dados (passo 2) | Só a senha |
| `index.html`, `admin/`, `js/`, `estilo/estilo.css` | Funcionamento do site | Não precisa |

---

## Passo 1 · Ver o site no seu computador

1. Abra a pasta **site aniversário Carol** (em Downloads).
2. Clique duas vezes em **index.html**. O site abre no navegador.

No começo aparece uma faixa **"Modo demonstração"** no topo. Ela indica que o
banco ainda não está ligado: as respostas ficam só no seu navegador. A faixa
some sozinha quando você terminar o passo 3.

**Para editar um texto:** abra `conteudo/site.js` com o Bloco de Notas
(botão direito › Abrir com › Bloco de Notas), troque o texto entre aspas, salve
e recarregue a página (F5).

> Cuidado ao editar: mantenha as aspas `"..."` e as vírgulas no fim das linhas.
> Se a página ficar em branco depois de uma edição, quase sempre faltou uma
> aspa ou uma vírgula na linha que você mexeu.

### Ainda falta preencher

Em `conteudo/site.js`, procure os textos entre colchetes:

- `[COMIDA E BEBIDA: ...]`: resposta da pergunta "Vai ter comida e bebida?"
- `[ESTACIONAMENTO: ...]`: resposta da pergunta "Tem estacionamento?"
- `pontoReferencia`: está vazio, então não aparece no site. Se quiser, escreva
  um ponto de referência entre as aspas.
- `nomeLocal`: hoje mostra "Rua Álamo, nº 17". Se o lugar tiver um nome (casa,
  salão), troque aqui.

Na lista de presentes (`conteudo/presentes.js`), os 6 itens são **exemplos**.
Os links abrem uma busca na loja. Troque pelo link do produto exato que você
quer (abra o produto na loja, copie o endereço da barra do navegador e cole
entre as aspas de `link`).

---

## Passo 2 · Criar o banco de dados no Supabase (uns 10 minutos)

1. Acesse **supabase.com** e clique em **Start your project**. Entre com sua
   conta do GitHub ou com seu e-mail.
2. Clique em **New project** e preencha:
   - **Name:** `carol31`
   - **Database Password:** clique em *Generate a password* (você não vai
     precisar dela no dia a dia, mas guarde num lugar seguro).
   - **Region:** *South America (São Paulo)*
   - Clique em **Create new project** e espere uns 2 minutos.
3. **Escolha a senha do seu /admin:** abra o arquivo `supabase/banco.sql` no
   Bloco de Notas, vá até a última parte e troque `TROQUE-ESTA-SENHA` por uma
   senha sua com pelo menos 10 caracteres. Mantenha as aspas simples `'...'`.
   Salve.
4. No Supabase, no menu da esquerda, clique em **SQL Editor**.
5. Copie **todo** o conteúdo de `banco.sql` (Ctrl+A, Ctrl+C), cole no editor
   (Ctrl+V) e clique em **Run**.
6. Deve aparecer **"Success. No rows returned"**. Pronto, o banco está criado.

> **Esqueceu a senha do admin?** Troque a senha na última parte do `banco.sql`,
> copie **só aquele último bloco** (do `insert` até o `;`), cole no SQL Editor
> e clique em Run.

---

## Passo 3 · Ligar o site ao banco

1. No Supabase, clique em **Project Settings** (ícone de engrenagem) e depois
   em **API Keys** (em alguns painéis o nome é **API** ou **Data API**).
2. Copie duas informações:
   - **Project URL**: algo como `https://abcdefgh.supabase.co`
     (fica em *Data API*, ou no botão **Connect** no topo do projeto).
   - **A chave pública**: a **Publishable key** (começa com `sb_publishable_`)
     ou, nos painéis mais antigos, a chave **anon public** (começa com `eyJ`).
3. Abra `conteudo/conexao.js` no Bloco de Notas e cole cada uma entre as aspas:

   ```js
   window.CONEXAO = {
     supabaseUrl: "https://abcdefgh.supabase.co",
     supabaseChave: "sb_publishable_xxxxxxxxxxxx"
   };
   ```

4. Salve e recarregue o `index.html`. A faixa "Modo demonstração" some.
5. Faça um teste: confirme presença com seu nome e marque um presente. Depois
   abra `admin/index.html`, entre com a sua senha e veja se aparecem. Por fim,
   clique em **Liberar** no presente de teste para ele voltar à lista.

> **Nunca** cole aqui a chave **secret** nem a **service_role**. Só a pública.
> A chave pública pode aparecer no site sem problema: as regras de segurança
> estão dentro do banco.

---

## Passo 4 · Publicar no GitHub Pages

1. Entre em **github.com** e crie uma conta, se ainda não tiver.
2. Clique no **+** (canto superior direito) › **New repository**.
   - **Repository name:** por exemplo `carol31` (vai aparecer no endereço).
   - Marque **Public** (o GitHub Pages gratuito exige repositório público).
   - Clique em **Create repository**.
3. Na página do repositório, clique em **uploading an existing file**
   (ou **Add file › Upload files**).
4. Abra a pasta **site aniversário Carol** no computador, selecione **tudo o
   que está dentro dela** (Ctrl+A) e arraste para a janela do GitHub. Use o
   Chrome ou o Edge, que mantêm as pastas.
5. Clique em **Commit changes**.
6. Vá em **Settings › Pages**. Em **Source**, escolha **Deploy from a branch**;
   em **Branch**, escolha **main** e **/(root)**, e clique em **Save**.
7. Espere 1 ou 2 minutos e recarregue. Vai aparecer o endereço do site:

   - Convite: `https://SEU-USUARIO.github.io/carol31/`
   - Sua área: `https://SEU-USUARIO.github.io/carol31/admin/`

Esse primeiro endereço é o link que você manda para os convidados.

**Para atualizar o site depois:** no repositório, abra o arquivo (por exemplo
`conteudo/site.js`), clique no lápis ✎, edite, clique em **Commit changes** e
espere 1 ou 2 minutos. Ou arraste o arquivo novo em **Add file › Upload files**.

> Como o repositório é público, qualquer pessoa pode ver os arquivos. Isso não
> é um problema: neles não há senha nem dados dos convidados. As respostas
> ficam só no Supabase, protegidas pela sua senha.

---

## Passo 5 · Usar a área da Carol (/admin)

Em `.../admin/`, digite sua senha para:

- ver quem confirmou, quantas pessoas vão no total, o nome dos acompanhantes e os recados;
- ver quais presentes já foram escolhidos;
- **Liberar** um presente, caso alguém tenha marcado por engano;
- **Exportar CSV**, que abre no Excel ou no Google Planilhas.

A página do admin não aparece no menu do site nem no Google.

---

## Ajustes rápidos

- **Trocar a data da festa:** em `site.js`, mude `dataFesta` (usada na
  contagem regressiva) e os textos `diaSemana`, `dataPorExtenso`, `dataCurta` e
  `dataRodape`. Mude também a prévia do link no WhatsApp: no `index.html`, as
  linhas `og:description` e `description`.
- **Colocar sua foto no arco:** salve a foto em `imagens/` (por exemplo
  `imagens/carol.jpg`) e, em `site.js`, escreva `foto: "imagens/carol.jpg"`
  dentro de `hero`.
- **Foto de um presente:** salve em `imagens/` e preencha `foto` no presente.
- **Trocar cores:** edite os códigos em `estilo/cores.css`. Mantenha uma cor
  escura e uma clara com bom contraste, para todo mundo conseguir ler.
- **Adicionar presente:** copie um bloco `{ ... }` inteiro em `presentes.js`,
  cole depois do último (separado por vírgula) e troque os textos. O `id`
  precisa ser único, em minúsculas, sem acento e sem espaço (use hífen).
  Não mude o `id` de um presente que alguém já escolheu.

---

## Como a segurança funciona (resumo)

- **Confirmações:** o banco confere nome (2 a 80 letras), número de pessoas
  (1 a 4), nome dos acompanhantes (obrigatório quando vai mais de 1 pessoa,
  até 300 letras) e recado (até 500 letras). Cada aparelho pode enviar até 6 respostas
  a cada 10 minutos. Um campo invisível pega robôs. A lista só aparece no
  admin, com senha.
- **Presentes:** marcar e desfazer acontecem no banco. Se duas pessoas
  clicarem ao mesmo tempo, só a primeira consegue, e a segunda vê um aviso.
  Quem marca recebe um código secreto guardado no próprio navegador, e só esse
  código desfaz a escolha. Se a pessoa trocar de celular, você pode liberar o
  item pelo admin.
- **Admin:** a senha fica guardada embaralhada no banco, nunca nos arquivos do
  site. São 20 tentativas a cada 15 minutos, contra quem tenta adivinhar.
- **Botão Comprar:** só abre a loja. As lojas não avisam quando a compra
  termina, por isso o convidado precisa clicar em **Vou dar este**.
