/* ================================================================
   CONEXÃO COM O BANCO DE DADOS (Supabase)

   Enquanto estes dois campos estiverem vazios, o site funciona em
   "modo demonstração": as respostas ficam salvas só no navegador de
   quem está testando e NÃO chegam até você.

   Para ligar o banco de verdade, siga o passo 3 do guia (README.md):
   - supabaseUrl:   o "Project URL", ex.: "https://abcdefgh.supabase.co"
   - supabaseChave: a chave pública ("Publishable key" ou "anon public")

   Essas duas informações podem ficar públicas. As regras de segurança
   estão dentro do banco. NUNCA cole aqui a chave "secret" ou "service_role".
   ================================================================ */

window.CONEXAO = {
  supabaseUrl: "https://mgncidzpwaffjfqqxdwa.supabase.co",
  supabaseChave: "sb_publishable_wH_gj-rZApBWiFB9yId2Xg_LDtYPeGa"
};
