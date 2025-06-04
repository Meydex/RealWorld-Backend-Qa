# Casos de Teste - Authentication

**CT-001 - Registro de Usuário**

Endpoint:
    -POST /api/users/ (Cadastro)

Permissões: 
    -Allow any

Pré-condições:
    - Ambiente virtual ativado (venv)
    - API rodando localmente no endpoint http://127.0.0.1:8000
    - Postman configurado 
    

Dados de Entrada:
    -E-mail: Test@test.com
    -Password: pass@word1
    -username: testuser

Passos:

    -Enviar requisição POST com os dados de entrada
    -Verificar status code da resposta
    -Validar se a resposta contém email, username e token

Resultado Esperado:

    -Código de status 201 Created
    -Retorno JSON com os dados do usuário e token

Cenários Negativos:
    -Password com menos de 8 caracteres:
    -Entrada inválida:
        -Password: 1234567
    -Código de status 400 bad request

    -Password com mais de 128 caracteres:
    -Entrada inválida:
        -Password: "a" * 129
    -Código de status 400 bad request

Prioridade: Alto

Resultados do teste:
 -Status: Sucesso 
 -Descrição: O sistema se comportou como esperado. 
 -Observações: Todos os passos foram executados com êxito

evidências:

**CT-002 - Login do Usuário**

Endpoint:
    -POST /api/users/login/

Permissões: 
    AllowAny

Pré-condições:
    - Ambiente virtual ativado (venv)
    - API rodando localmente no endpoint http://127.0.0.1:8000
    - Postman configurado

Dados de Entrada Válidos:
    -E-mail: Test@test.com
    -Password: pass@word1
    -username: testuser

Passos:

    -Enviar requisição POST com os dados de entrada
    -Verificar status code da resposta
    -Verificar se o token JWT é retornado

Resultado Esperado:

    -Código de status 200 OK
    -Corpo da resposta com email, username, token

Cenários Negativos:
    -E-mail ausente: retorna erro 'An email address is required to log in.'
    -Senha ausente: retorna erro 'A password is required to log in.'
    -Usuário não encontrado ou inativo: erro relevante


Prioridade: Alto

Resultados do teste:
 -Status: Sucesso 
 -Descrição: O sistema se comportou como esperado
 -Observações: Todos os passos foram executados com êxito

evidências:


**CT-003 - Atualizar Perfil do Usuário**

Endpoint:
    -PATCH /api/user/ 

Permissões: 
    -IsAuthenticated

Pré-condição:
    - Ambiente virtual ativado (venv)
    - API rodando localmente no endpoint http://127.0.0.1:8000
    - Postman configurado 
    - Usuário logado com token JWT

Dados de Entrada:
    -Username : novo_user
    -bio: bio atualizada
    -image: https://pngimg.com/uploads/smiley/smiley_PNG196.png

Passos:
    -Enviar requisição com token
    -Atualizar campos do usuário
    -Validar se os campos foram atualizados

Prioridade: Alto

Resultados do teste:
 -Status: Sucesso 
 -Descrição: O sistema se comportou como esperado
 -Observações: Todos os passos foram executados com êxito

evidências: