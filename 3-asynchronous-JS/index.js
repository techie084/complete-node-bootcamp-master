const fs = require('fs');
const superagent = require('superagent');

const readFilePro = (file) => {
  return new Promise((res, rej) => {
    fs.readFile(file, (err, data) => {
      if (err) rej('i could not find that file 🥲');
      res(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((res, rej) => {
    fs.writeFile(file, data, (err) => {
      if (err) rej('Could not write file 🥲');
      res('success');
    });
  });
};

const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);

    const res1Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const res2Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const res3Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const all = Promise.all([res1Pro, res2Pro, res3Pro]);
    const imgs = all.map((el) => el.body.message);
    console.log(imgs);

    await writeFilePro('dog-img.txt', imgs.join('\n'));
    console.log('Random Dog image saved to file!');
  } catch (err) {
    console.log(err.message);
    throw err;
  }
  return '2: ready 🐶';
};

(async () => {
  try {
    console.log('1: Will get dog Pics!');
    const x = await getDogPic();
    console.log(x);
    console.log('3: Done getting dog pics!');
  } catch (error) {
    console.log('error');
  }
})();

// console.log('1: Will get Dog pics!');
// getDogPic().then((x) => {
//   console.log(x);
//   console.log('2: Done getting Dog pics!');
// }).catch(err => {
//   console.log(err);
// });

/*
readFilePro(`${__dirname}/dog .txt`)
  .then((data) => {
    console.log(`Breed: ${data}`);
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then((res) => {
    console.log(res.body.message);
    return writeFilePro('dog-img.txt', res.body.message);
  })
  .then(() => {
    console.log('Radom dog image saved to file!');
  })
  .catch((err) => {
    console.log(err);
  });
  */
