import http from 'k6/http';
import { check, sleep } from 'k6';


const users = [
  { email: 'testuser_1_1750976474177@gmail.com', password: '123456789', username: 'testuser_1_1750976474177' },
  { email: 'testuser_9_1750976474177@gmail.com', password: '123456789', username: 'testuser_9_1750976474177' },
  { email: 'testuser_4_1750976474177@gmail.com', password: '123456789', username: 'testuser_4_1750976474177' },
  { email: 'testuser_8_1750976474177@gmail.com', password: '123456789', username: 'testuser_8_1750976474177' },
  { email: 'testuser_3_1750976474177@gmail.com', password: '123456789', username: 'testuser_3_1750976474177' },
  { email: 'testuser_2_1750976474177@gmail.com', password: '123456789', username: 'testuser_2_1750976474177' },
  { email: 'testuser_7_1750976474177@gmail.com', password: '123456789', username: 'testuser_7_1750976474177' },
  { email: 'testuser_5_1750976474177@gmail.com', password: '123456789', username: 'testuser_5_1750976474177' },
  { email: 'testuser_6_1750976474177@gmail.com', password: '123456789', username: 'testuser_6_1750976474177' },
  { email: 'testuser_10_1750976474177@gmail.com', password: '123456789', username: 'testuser_10_1750976474177' },     
 

];

function getUser(vuId) {
  return users[(vuId - 1) % users.length];
}

export const options = {
  vus: 10,
  duration: '30s',
  ext: {
    'html-reporter': {
      export: 'relatorio.html',
    }
  }
};
export default function () {
  const user = getUser(__VU);

  //1.Login
  const loginPayload = {
    user: { email: user.email, password: user.password },
  };

  const loginRes = http.post('http://127.0.0.1:8000/api/users/login', JSON.stringify(loginPayload), {
    headers: { 'Content-Type': 'application/json' },
  });

  check(loginRes, { 'login bem-sucedido': (r) => r.status === 200 && r.json('user.token') !== '' });
  const token = loginRes.json('user.token');

  //2.criar artigo
  const articleSlug = `test-article-${__VU}-${Date.now()}`;
  const articlePayload = {
    article: {
      title: `Article ${__VU}`,
      description: 'Test description',
      body: 'Test body',
      author: 'performance'
    }
  };
  const createArticleRes = http.post('http://127.0.0.1:8000/api/articles', JSON.stringify(articlePayload), {
    headers: { 'Content-Type': 'application/json', Authorization: `Token ${token}` },
  });
  check(createArticleRes, { 'artigo criado': (r) => r.status === 201 });
  const createdArticleSlug = createArticleRes.json('article.slug');
  //3.editar artigo
  sleep(1);
  const updatePayload = {
    article: {
      title: `Article ${__VU} Updated`,
      description: 'Updated description',
      body: 'Updated body',
      author: 'performace'
    }
  };
  const editRes = http.put(`http://127.0.0.1:8000/api/articles/${createdArticleSlug}`, JSON.stringify(updatePayload), {
    headers: { 'Content-Type': 'application/json', Authorization: `Token ${token}` },
  });
  check(editRes, { 'artigo editado': (r) => r.status === 200 });

  //4.criar comentário
  const commentPayload = { 
    comment: {
       body: 'Nice article!'
       } 
    };
  const commentRes = http.post(`http://127.0.0.1:8000/api/articles/${createdArticleSlug}/comments`,
    JSON.stringify(commentPayload),
    { headers: { 'Content-Type': 'application/json', Authorization: `Token ${token}` } }
  );
  check(commentRes, { 'comentário criado': (r) => r.status === 201 });
  const commentId = commentRes.json('comment.id');

  //5.deletar comentário
  const delCommentRes = http.del(`http://127.0.0.1:8000/api/articles/${createdArticleSlug}/comments/${commentId}`,
    null,
    { headers: { Authorization: `Token ${token}` } }
  );
  check(delCommentRes, { 'comentário deletado': (r) => r.status === 204 });

  //6.seguir outro usuário
  const toFollow = 'novo_user1';
  if (user.username !== toFollow) {
    http.del(`http://127.0.0.1:8000/api/profiles/${toFollow}/follow`, null, {
    headers: { Authorization: `Token ${token}` },
    });
    const followRes = http.post(`http://127.0.0.1:8000/api/profiles/${toFollow}/follow`, null,
      { headers: { Authorization: `Token ${token}` } });
  check(followRes, { 'usuário seguido': (r) => r.status === 201 });
  }

  sleep(2);

  //7.deixar de seguir
  const unfollowRes = http.del(`http://127.0.0.1:8000/api/profiles/${toFollow}/follow`, null,
    { headers: { Authorization: `Token ${token}` } });
  check(unfollowRes, { 'usuário deixou de seguir': (r) => r.status === 200 });


  sleep(1);
}
