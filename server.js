const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send(`
    <h1>🚀 Jenkins CI/CD Pipeline</h1>
    <p>Deployed automatically via Jenkins on AWS!</p>
  `);
});

app.listen(PORT, () => {
  console.log('App running on port ' + PORT);
});
