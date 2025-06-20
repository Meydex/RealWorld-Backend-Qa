# Casos de Teste - Articles

**CT-007 - Criar Artigo**

Endpoint:
    -POST /api/articles/

Permissões: 
    -IsAuthenticated

Pré-condições:
    -Ambiente virtual ativado (venv)
    -API rodando localmente no endpoint http://127.0.0.1:8000
    -Postman configurado 
    -Usuário autenticado com token válido

Dados de Entrada:
    -Title: Test
    -Description: A test description
    -Body: Test body
    -Autor: <username> 
    
Passos:

    -Enviar POST com dados válidos e token
    -Verificar se artigo é criado corretamente

Resultado Esperado:

    -Código de status 201 Created
    -Retorno JSON com os campos:
        -slug 
        -title 
        -description
        -body 
        -tagList 
        -createdAt 
        -updatedAt 
        -favorited 
        -favoritesCount 
        -author

Prioridade: Alto

Teste: Automatizado

Resultados do teste:
 -Status: Sucesso 
 -Descrição: O sistema se comportou como esperado
 -Observações: Todos os passos foram executados com êxito

evidências:

**CT-008 - Visualizar Artigos**

Endpoint:
    -GET /api/articles/feed/

Permissões: 
    -Allowany

Pré-condições:
    -Ambiente virtual ativado (venv)
    -API rodando localmente no endpoint http://127.0.0.1:8000
    -Postman configurado

Passos:

    -Enviar GET sem autenticação
    -Verificar artigos retornados
    -Verificar status code da resposta

Resultado Esperado:

    -Código de status 200 OK
    -Lista de artigos com campos principais visíveis


Prioridade: Alto

Teste: Automatizado

Resultados do teste:
 -Status: Sucesso 
 -Descrição: O sistema se comportou como esperado
 -Observações: Todos os passos foram executados com êxito

evidências:

**CT-009 - Visualizar Artigo do Feed**

Endpoint:
    -GET /api/articles/feed/

Permissões: 
    -IsAuthenticated

Pré-condição:
    -Ambiente virtual ativado (venv)
    -API rodando localmente no endpoint http://127.0.0.1:8000
    -Postman configurado 

Passos:
    -Enviar GET com um slug válido
    -Verificar os dados retornados

Resultado Esperado:
    -Código 200 OK
    -Retorno com os dados completos do artigo


Prioridade: Alto

Teste: Automatizado

Resultados do teste:
 -Status: Sucesso 
 -Descrição: O sistema se comportou como esperado
 -Observações: Todos os passos foram executados com êxito

evidências:

**CT-010 - Visualizar Artigo por Slug**

Endpoint:
    -GET /api/articles/<slug>

Permissões: 
    -AllowAny

Pré-condição:
    -Ambiente virtual ativado (venv)
    -API rodando localmente no endpoint http://127.0.0.1:8000
    -Postman configurado 

Passos:
    -Enviar GET com um slug válido
    -Verificar os dados retornados

Resultado Esperado:
    -Código 200 OK
    -Retorno com os dados completos do artigo

Cenário Alternativo:
    -Slug inexistente:
        -Código 404 Not Found
        -Mensagem: 'An article with this slug does not exist.'


Prioridade: Alto

Teste: Automatizado

Resultados do teste:
 -Status: Sucesso 
 -Descrição: O sistema se comportou como esperado
 -Observações: Todos os passos foram executados com êxito

evidências:


**CT-011 - Atualizar Artigo**

Endpoint:
    -PUT /api/articles/<slug>

Permissões: 
    -IsAuthenticated

Pré-condição:
    -Ambiente virtual ativado (venv)
    -API rodando localmente no endpoint http://127.0.0.1:8000
    -Postman configurado 

Dados de Entrada:
    -Title: New test
    -Description: A  new test description
    -Body: New test body
    -Autor: <username> 

Passos:
    -Enviar PUT com novo conteúdo
    -Verificar se dados foram atualizados

Resultado Esperado:
    -Código 200 OK
    -Artigo com dados atualizados

Cenário Alternativo:
    -Slug inexistente:
        -Código 404 Not Found
        


Prioridade: Alto

Teste: Automatizado

Resultados do teste:
 -Status: Sucesso 
 -Descrição: O sistema se comportou como esperado
 -Observações: Todos os passos foram executados com êxito

evidências:


**CT-012 - Favoritar Artigo**

Endpoint:
    -POST /api/articles/<slug>/favorite/

Permissões: 
    -IsAuthenticated

Pré-condição:
    -Ambiente virtual ativado (venv)
    -API rodando localmente no endpoint http://127.0.0.1:8000
    -Postman configurado
    -Artigo com slug existente 


Passos:
    -Enviar POST autenticado para o slug de um artigo
    -Verificar incremento de favoritesCount

Resultado Esperado:
    -Código 200 OK
    -Campo "favorited": true

Cenário Alternativo:
    -Slug inexistente:
        -Código 404 Not Found
        -Mensagem: 'An article with this slug was not found.'

Prioridade: Alto

Teste: Manual
Resultados do teste:
 -Status: Sucesso 
 -Descrição: O sistema se comportou como esperado. 
 -Observações: Todos os passos foram executados com êxito.

evidências:


**CT-013 - Desfavoritar Artigo**

Endpoint:
    -DELETE /api/articles/<slug>/favorite/

Permissões: 
    -IsAuthenticated

Pré-condição:
    -Ambiente virtual ativado (venv)
    -API rodando localmente no endpoint http://127.0.0.1:8000
    -Postman configurado
    -Artigo com slug existente 


Passos:
    -Enviar DELETE autenticado no slug favoritado
    -Verificar decremento de favoritesCount

Resultado Esperado:
    -Código 200 OK
    -Campo "favorited": false

Cenário Alternativo:
    -Slug inexistente:
        -Código 404 Not Found
        -Mensagem: 'An article with this slug was not found.'

Prioridade: Alto

Teste: Manual
Resultados do teste:
 -Status: Sucesso 
 -Descrição: O sistema se comportou como esperado
 -Observações: Todos os passos foram executados com êxito

evidências:


**CT-014 - Adicionar Comentário a Artigo**

Endpoint:
    -POST /api/articles/<slug>/comments/

Permissões: 
    -IsAuthenticated

Pré-condição:
    -Ambiente virtual ativado (venv)
    -API rodando localmente no endpoint http://127.0.0.1:8000
    -Postman configurado 
    -Artigo com slug existente

Dados de entrada:
    -Body: Comments Test

Passos:
    -Enviar comentário no corpo da requisição
    -Verificar se foi criado corretamente

Resultado Esperado:
    -Código 201 Created
    -Comentário com campos: id, author, body, createdAt, updatedAt

Cenário Alternativo:
    -Slug inválido:
        -Código 404 Not Found

Prioridade: Alto

Teste: Automatizado

Resultados do teste:
 -Status: Sucesso 
 -Descrição: O sistema se comportou como esperado 
 -Observações: Todos os passos foram executados com êxito

evidências:


**CT-015 - Listar Comentários de um Artigo**

Endpoint:
    -GET /api/articles/<slug>/comments/

Permissões: 
    -AllowAny

Pré-condição:
    -Ambiente virtual ativado (venv)
    -API rodando localmente no endpoint http://127.0.0.1:8000
    -Postman configurado 
    -Artigo com slug existente

Passos:
    -Requisição GET para o slug do artigo
    -Verificar retorno da lista de comentários

Resultado Esperado:
    -Código 200 OK
    -Comentário com campos: id, author, body, createdAt, updatedAt

Cenário Alternativo:
    -Slug inválido:
        -Código 404 Not Found

Prioridade: Alto

Teste: Automatizado

Resultados do teste:
 -Status: Sucesso 
 -Descrição: O sistema se comportou como esperado
 -Observações: Todos os passos foram executados com êxito

evidências:


**CT-016 - Remover Comentário**

Endpoint:
    -DELETE /api/articles/<slug>/comments/<comment_pk>/

Permissões: 
    -IsAuthenticated

Pré-condição:
    -Ambiente virtual ativado (venv)
    -API rodando localmente no endpoint http://127.0.0.1:8000
    -Postman configurado 
    -Artigo com slug existente

Passos:
    -Enviar DELETE para o comentário especificado
    -Verificar se comentário foi removido

Resultado Esperado:
    -Código 204 No Content
    -Comentário com campos: id, author, body, createdAt, updatedAt

Cenário Alternativo:
    -Slug inválido:
        -Código 404 Not Found
        -Mensagem: 'A comment with this ID does not exist.'


Prioridade: Alto

Teste: Automatizado

Resultados do teste:
 -Status: Sucesso 
 -Descrição: O sistema se comportou como esperado
 -Observações: Todos os passos foram executados com êxito

evidências:


**CT-017 - Listar Tags Disponíveis**

Endpoint:
    -GET /api/tags/

Permissões: 
    -AllowAny

Pré-condição:
    -Ambiente virtual ativado (venv)
    -API rodando localmente no endpoint http://127.0.0.1:8000
    -Postman configurado 
    -Artigos já cadastrados com diferentes tagList

Passos:
    -Enviar requisição GET para o endpoint /api/tags/
    -Verificar se a resposta retorna uma lista com todas as tags cadastradas

Resultado Esperado:
    -Código 200 OK
    --Resposta no formato: "tags": ["tag1", "tag2", "tag3", ...]

Cenário Alternativo:
    -Caso não haja tags cadastradas: retorno com lista vazia
    -Código 200 OK
    -Resposta no formato: "tags": []


Prioridade: Alto

Teste: Manual
Resultados do teste:
 -Status: Sucesso 
 -Descrição: O sistema se comportou como esperado
 -Observações: Todos os passos foram executados com êxito

evidências:
