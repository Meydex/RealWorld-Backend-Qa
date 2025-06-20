# Teste de Performance - RealWorld API

**TP-001 - Teste de Fluxo**

Endpoints:
  - POST /api/users/login (Login de múltiplos usuários)
  - GET /api/articles (Listagem de artigos públicos)
  - GET /api/articles/{slug} (Visualização de artigo)
  - GET /api/articles/{slug}/comments (Listagem de comentários)

Pré-condições:
- Backend local (localhost)
- Banco de dados: SQLite3 local
- Rede: Ambiente de desenvolvimento
- Token JWT gerado previamente

Ferramenta: K6

Cenário de Carga:
  - 10 usuários simultâneos 
  - Duração: 30 segundos

Passos:
  - Simular múltiplos usuários fazendo login com credenciais reais
  - Simular acesso simultâneo ao feed de artigos
  - Simular navegação entre artigo - detalhes - comentários

Resultado esperado:
  - Tempo médio de resposta abaixo de 200ms
  - Erros: 0
  - Limite seguro estimado: ~50 usuários simultâneos

Cenários Negativos:
  - Não aplicável neste teste (simulação de carga apenas com entradas válidas)

Prioridade: Alta

> O teste indicou que a API suporta pequenas cargas com estabilidade. A otimização de queries e cache pode melhorar o tempo de resposta em produção.


**TP-002 - Teste de Carga com Escrita Simultânea**

Endpoints:
  - POST /api/users/login
  - POST /api/articles (Criação de artigos)
  - PUT /api/articles/{slug} (Edição de artigos)
  - POST /api/articles/{slug}/comments (Criar comentário)
  - DELETE /api/articles/{slug}/comments/{id} (Remover comentário)
  - POST /api/profiles/{username}/follow (Seguir usuário)
  - DELETE /api/profiles/{username}/follow (Deixar de seguir)


Pré-condições:
  - Backend local (localhost)
  - Banco de dados SQLite3
  - JWTs previamente gerados para múltiplos usuários
  - Base de usuários, artigos e slugs de teste previamente configurados

Ferramenta: K6

Cenário de Carga:
  - 10 usuários simultâneos 
  - Duração: 30 segundos 
  - Ações balanceadas entre usuários diferentes para evitar conflito de IDs e slugs

Passos:
  - Login simultâneo com 10 usuários

    Cada usuário:
    - Cria um artigo com dados únicos
    - Edita o próprio artigo após 1s
    - Cria um comentário nesse artigo
    - Remove o comentário
    - Segue outro usuário aleatório
    - Deixa de seguir após 2s

Resultado Esperado:
  - Tempo médio de resposta por ação inferior a 250ms
  - Baixo índice de erros (<1%)
  - Consistência dos dados no banco de dados

  Prioridade: Alta

  > O teste indicou que a API suporta pequenas cargas com estabilidade. A otimização de queries e cache pode melhorar o tempo de resposta em produção.

