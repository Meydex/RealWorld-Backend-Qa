# Casos de Teste - Profiles

**CT-004 - Visualizar perfil de Usuário**

Endpoint:
    -GET /api/profiles/<username>/

Permissões: 
    -Allow any

Pré-condições:
    -Ambiente virtual ativado (venv)
    -API rodando localmente no endpoint http://127.0.0.1:8000
    -Postman configurado 
    -Usuário com <username> deve existir
    

Passos:

    -Enviar requisição GET com um nome de usuário válido
    -Verificar status da resposta e conteúdo retornado

Resultado Esperado:

    -Código de status 200 ok
    -Retorno contendo dados do perfil: username, bio, image, following


Prioridade: Alto

Resultados do teste:
 -Status: Sucesso 
 -Descrição: O sistema se comportou como esperado
 -Observações: Todos os passos foram executados com êxito

evidências:

**CT-005 - Seguir Usuário**

Endpoint:
    -POST /api/profiles/<username>/follow/

Permissões: 
    -IsAuthenticated

Pré-condições:
    -Ambiente virtual ativado (venv)
    -API rodando localmente no endpoint http://127.0.0.1:8000
    -Postman configurado
    -Autenticação via token JWT válida
    -O usuário-alvo <username> deve existir e ser diferente do usuário autenticado

Dados de Entrada Válidos:
    -E-mail: Test@test.com
    -Password: pass@word1
    -username: testuser

Passos:

    -Enviar requisição POST com token de autenticação
    -Verificar se o usuário é seguido com sucesso
    -Verificar status code da resposta

Resultado Esperado:

    -Código de status 201 Created
    -JSON com o campo "following": true

Cenários Alternativos:
    -Seguir a si mesmo:
        -Código 400 Bad Request
        -Mensagem: 'You can not follow yourself.'

    -Usuário não encontrado:
        -Código 404 Not Found
        -Mensagem: 'A profile with this username was not found.'


Prioridade: Alto

Resultados do teste:
 -Status: Sucesso 
 -Descrição: O sistema se comportou como esperado
 -Observações: Todos os passos foram executados com êxito

evidências:


**CT-006 - Deixar de Seguir Usuário**

Endpoint:
    -DELETE /api/profiles/<username>/follow/

Permissões: 
    -IsAuthenticated

Pré-condição:
    -Ambiente virtual ativado (venv)
    -API rodando localmente no endpoint http://127.0.0.1:8000
    -Postman configurado 
    -Usuário logado com token JWT
    -Usuário autenticado já está seguindo <username>


Passos:
    -Enviar requisição DELETE com token válido
    -Verificar se "Followee" foi removido

Resultado Esperado:
    -Código 200 OK
    -JSON com o campo "following": false

Cenário Alternativo (usuário não existe):
    -Código 404 Not Found
    -Mensagem: 'A profile with this username was not found.'


Prioridade: Alto

Resultados do teste:
 -Status: Sucesso 
 -Descrição: O sistema se comportou como esperado
 -Observações: Todos os passos foram executados com êxito

evidências: