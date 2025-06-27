const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

const db = new sqlite3.Database('../../../productionready-django-api/db.sqlite3');

const query = `
  SELECT email, username, '123456789' AS password
  FROM authentication_user
  WHERE username LIKE 'testuser_%'
  ORDER BY RANDOM()
  LIMIT 10
`;

db.all(query, (err, rows) => {
  if (err) {
    console.error("Erro na consulta:", err);
    process.exit(1);
  }

  const users = rows.map(u => ({
    email: u.email,
    username: u.username,
    password: u.password,
  }));

  // Monta o conteúdo do arquivo users.js
  const fileContent = `const users = ${JSON.stringify(users, null, 2)};
  
export default users;
`;

  fs.writeFileSync('users.js', fileContent);
  console.log('✅ users.js criado com 10 usuários aleatórios!');

  db.close();
});
