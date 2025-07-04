const newman = require('newman');
const path = require('path');

const environmentPath = path.join(__dirname, 'url_mock.postman_environment.json');

const collections = [
  'D:/projetos QA/RealWorld Backend Test/Qa_real_world/Postman/articles.postman_collection.json',
  'D:/projetos QA/RealWorld Backend Test/Qa_real_world/Postman/authentication.postman_collection.json',
  'D:/projetos QA/RealWorld Backend Test/Qa_real_world/Postman/profiles.postman_collection.json'
];

collections.forEach((collectionPath) => {
  newman.run({
    collection: require(collectionPath),
    environment: require(environmentPath),
    reporters: ['cli', 'htmlextra'],
    reporter: {
      htmlextra: {
        export: `./report/${collectionPath.split('/').pop().replace('.json', '')}.html`
      }
    }
  }, function (err) {
    if (err) { throw err; }
    console.log(`Testes da coleção ${collectionPath} finalizados`);
  });
});
