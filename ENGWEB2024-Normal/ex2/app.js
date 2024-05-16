const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 16001;

// Conectar ao MongoDB
mongoose.connect('mongodb://localhost:27017/contratos', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Configurar o Pug
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rotas
const indexRouter = require('./routes/index');

app.use('/', indexRouter);

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Serviço rodando na porta ${port}`);
});
