var express = require('express');
var path = require('path');
var logger = require('morgan');
var app = express();

// Configuração do mecanismo de visualização
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Rota para a página inicial
app.get('/', function(req, res, next) {
  res.render("index");
});

// Importar e usar o roteador para todas as rotas
app.use('/', require('./rotas'));

module.exports = app;
