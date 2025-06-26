import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10, 
  duration: '30s',
  ext: {
    'html-reporter': {
      export: 'relatorio.html',
    }
  }
};


function generateUserData (vu) {
    const timestamp = Date.now();
    return {
        user: {
            username: `testuser_${vu}_${timestamp}`,
            email: `testuser_${vu}_${timestamp}@gmail.com`,
            password: '123456789',
       }
    };
}

export default function () {
  const userData = generateUserData(__VU); 

  console.log(JSON.stringify(userData));
//1.cria usuário
  const createRes = http.post('http://127.0.0.1:8000/api/users/', JSON.stringify(userData), {
    headers: { 'Content-Type': 'application/json' },
  });

  check(createRes, {
    'usuário criado com sucesso': (res) => res.status === 201,
  });
//2.login do usuário
  const loginPayload = {
    user: {
      email: userData.user.email,
      password: userData.user.password,
    }
  };

  const loginRes = http.post('http://127.0.0.1:8000/api/users/login', JSON.stringify(loginPayload), {
    headers: { 'Content-Type': 'application/json' },
  });

  check(loginRes, {
    'login bem-sucedido': (res) => res.status === 200 && res.json('user.token') !== '',
  });

  const token = loginRes.json('user.token');

  //3.lista artigos
  const articlesRes = http.get('http://127.0.0.1:8000/api/articles', {
    headers: { Authorization: `Token ${token}` },
  });

  check(articlesRes, {'artigos carregados': (res) => res.status === 200,});

  //4.artigo por slug
  const slug = 'teste-zt0yod';
  const articleRes = http.get(`http://127.0.0.1:8000/api/articles/${slug}`, {
    headers: { Authorization: `Token ${token}` },
  });
  check(articleRes, {
    'artigo carregado': (r) => r.status === 200,
    'artigo slug correto': (r) => r.json('article.slug') === slug,
  });

  //5.comentários do artigo
  const commentsRes = http.get(`http://127.0.0.1:8000/api/articles/${slug}/comments`, {
    headers: { Authorization: `Token ${token}` },
  });
  check(commentsRes, {
    'comentários carregados': (r) => r.status === 200,
    'resposta tem comments array': (r) => Array.isArray(r.json('comments')),
  });

  sleep(1);
}