# API v2 — evidências e limitações

A collection em [`postman/HERMES-Frankfurter-v2.postman_collection.json`](../postman/HERMES-Frankfurter-v2.postman_collection.json) reproduz as três chamadas usadas pelo app: `/currencies`, `/rate/{base}/{quote}` e `/rates`.

Os testes automatizados usam fixtures locais para serem determinísticos. A fonte pública pode combinar provedores e publicar apenas em dias úteis; a aplicação identifica a fonte como `Frankfurter/fontes oficiais` e não afirma ECB ou cotação negociável sem uma consulta explicitamente restrita.
