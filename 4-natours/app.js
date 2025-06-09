const express = require('express');

const app = express();

// -------------- Routing -------------------
app.get('/', (req, res) => {});

// -------------- Server -------------------
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
