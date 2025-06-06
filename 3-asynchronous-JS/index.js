const fs = require('fs');
const superagent = require('superagent');

fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
  console.log(`Bread: ${data}`);

  superagent
    .get(`https://dog.ceo/api/breed/${data}/image/random`)
    .end((err, res) => {
      console.log(res.body.message);
    });
});
