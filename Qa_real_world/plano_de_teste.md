# Plano de teste - Real World

# 1. Introdução:
    - **Drescrição do Sistema**: Aplicação Blog, permite  aos usuários Ler, publicar e comentar em artigos favoritar publicações e seguir outros perfis.
    - **Objetivos do teste**: Validar funcionalidades, garantir que o usuário consiga as utilizar de forma consistente e sem erros críticos.

# 2. Escopo do teste:
    -Funcionalidades incuídas:
        - cadastro
        - login
        - configurar perfil (foto,bio, e-mail)
        - visualização de artigos (geral ou por filtro)
        - criação e edição de artigos
        - seguir/deixar de seguir perfis
        - comentar e excluir comentários
        - Listar comentários por artigo
        - Favoritar/desfavoritar artigos

# 3. Metodologia:
    - Teste exploratório: Descoberta de comportamentos esperados e inesperados
    - Teste funcional: Verificar se cada funcionalidade atende aos requisitos
    - Teste de API: Validação dos endpoints e status HTTP
    - Teste de regressão: Reexecução de testes após mudanças no código
    - Teste de validação de dados: Conferência de respostas JSON e integridade das informações
    - Teste de valor limite: Explorar limites de caracteres permitidos
    - Teste de autenticação: Login e geração de Token

    - Critérios de sucesso: Todas as funcionalidades devem retornar os status HTTP corretos e manter a integridade dos dados conforme esperado

    - Ambientes de teste: 
        Sistema operacional Windows 10 pro 64 bits
        Python: 3.5.2
        Ambiente Virtual: venv (ativado via terminal)
        Backend: Django 1.10.5 + SQLite3
        Execução da API: Localhost (127.0.0.1:8000)
    - Ferramentas:
         Markdown
         Postman
         Vs code
         Git bash

# 4.  Riscos
-Mudanças frequentes na API:
    -Alterações de endpoints podem invalidar os testes existentes

-Mitigação: 
    -Manter comunicação contínua com o time de desenvolvimento e manter documentação atualizada

-Dependência de autenticação via token:
    -Testes que exigem autenticação falharão se o token expirar ou não for gerado corretamente
-Mitigação:
    -Criar etapa de login com renovação de tokens com teste automatizado

-Sobreposição e estado compartilhado:
    -Testes automatizados podem interferir uns nos outros (ex: um desfavorita artigo enquanto outro favorita)

-Mitigação:
    -Garantir isolamento de dados com setup/teardown antes e depois de cada teste

Falta de cobertura de testes manuais ou automatizados em casos limites


# 5. Limitações

-Testes automatizados não cobrem interface gráfica (UI):
    -O foco dos testes é a API (camada backend)

-Sem testes de desempenho:
    -Este plano não inclui testes de carga na API (ex: 1000 logins simultâneos)


-Cobertura parcial de testes negativos:
    -Alguns cenários negativos foram priorizados (ex: login sem senha), mas nem todos os fluxos inválidos foram testados ainda (ex: bio com emojis ou imagens inválidas)

-Cobertura parcial de mensagens de Erro:
  -Alguns cenários negativos não possuem mensagens para  determinados erros (ex:Password inválido com menos de 8 caracteres ou mais de 128 caracteres), por não existir as mensagens o teste será validado a partir do código de status. 

-Gerenciamento de dados estáticos
    -Tags e usuários criados nos testes não são apagados automaticamente, o que pode poluir a base e influenciar testes subsequentes.