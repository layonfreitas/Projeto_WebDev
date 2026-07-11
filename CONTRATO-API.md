# Contrato da API — Catálogo de Músicas

**Trio: Layon, Thiago, Marcelo** **Tema:** Catálogo de músicas, artistas e pedidos

| Método | Endpoint    | Entrada                                            | Resposta                       | Status          |
|--------|-------------|-----------------------------------------------------|---------------------------------|-----------------|
| GET    | `/`         | —                                                   | página HTML (frontend)          | 200             |
| GET    | `/musicas`  | `genero` (query URL, opcional)                      | lista de músicas em JSON        | 200             |
| GET    | `/artistas` | `artista` (query URL, opcional)                     | lista de artistas em JSON       | 200             |
| POST   | `/pedidos`  | `nome`, `musicaId` (body JSON)                      | confirmação do pedido           | 200 / 400 / 404 |
| POST   | `/login`    | `usuario`, `senha` (body JSON)                      | mensagem de sucesso / erro      | 200 / 401       |

## Decisões de projeto (justificar no contrato!)

- **`genero` e `artista` vão na query URL** porque são filtros públicos de busca — podem aparecer na barra do navegador (o "envelope").
- **`usuario` e `senha` vão no body JSON** porque são dados privados (a "carta").
- **`nome`, `musicaId` e `nomeArtista` vão no body JSON** em `/pedidos` porque representam uma ação de criação de pedido, não uma simples busca.
- **`/pedidos` responde 400** quando falta `nome`, `musicaId` ou `nomeArtista`, **404** quando a música (`musicaId`) não é encontrada no catálogo, e **200** quando o pedido é processado com sucesso (o código não usa status 201 nesse caso).
- **`/login` responde 200** quando `usuario` e `senha` conferem, **401** quando as credenciais estão erradas.
- Dados guardados em **vetores na memória** (`musicas` e `artistas`) — se o servidor reiniciar, os dados voltam ao estado inicial (não há banco de dados).

## Casos de teste no Postman

| # | Requisição | Esperado |
|---|-----------|----------|
| 1 | `GET /musicas` | 200 — lista completa (10 músicas) |
| 2 | `GET /musicas?genero=Rock` | 200 — só as 3 músicas de Rock (ids 1, 3, 10) |
| 3 | `GET /musicas?genero=Arrocha` | 200 — lista vazia `[]` |
| 4 | `GET /artistas` | 200 — lista completa (12 artistas) |
| 5 | `GET /artistas?artista=Nirvana` | 200 — só o artista Nirvana |
| 6 | `POST /login` com `layon` / `14072008` | 200 — "Login bem-sucedido!" |
| 7 | `POST /login` com senha errada | 401 — "Credenciais inválidas." |
| 8 | `POST /pedidos` `{ nome: "Ana", musicaId: 3, nomeArtista: "Nirvana" }` | 200 — pedido confirmado citando "Smells Like Teen Spirit" |
| 9 | `POST /pedidos` sem o campo `nomeArtista` | 400 — "Todos os campos são obrigatórios." |
| 10 | `POST /pedidos` `{ musicaId: 99, nome: "Ana", nomeArtista: "X" }` | 404 — "Música não encontrada." |
