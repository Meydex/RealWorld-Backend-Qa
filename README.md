## 1 -entrar na pasta do ambiente
cd productionready-django-api
## 2- entrar no ambiente
.\env\Scripts\Activate.ps1 > entrar no  ambiente
## 3- rodar servidor local
python manage.py runserver > rodar servidor
## 4- rodar o teste postman via newman
npx node run-tests.js
## 5 - rodar k6
cd Qa_real_world\k6\script  
  
1. k6 run teste_de_fluxo.js
2. k6 run teste_de_carga.js

## - roda k6 com reporter json

k6 run --out json=resultado_fluxo.json teste_de_fluxo.js
k6 run --out json=resultado_carga.json teste_de_carga.js
## - converter teste para html
npx k6-html-reporter resultado_fluxo.json
npx k6-html-reporter resultado_carga.json

## 6 - limpar usuarios de teste do db com python
python clean_test_users.py