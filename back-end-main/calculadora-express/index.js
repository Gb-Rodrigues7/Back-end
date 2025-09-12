const express = require('express');
const calculadoraRouter = require('./routes/calculadora');

const app = express();

app.use(express.json());
app.use('/calculadora', calculadoraRouter);

app.get('/', (req, res) => {
  res.send('API Calculadora rodando');
});

const PORT = process.env.PORT || 3000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}

module.exports = app;
