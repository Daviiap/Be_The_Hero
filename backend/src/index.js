/**
 * Criando uma cont express a partir de uma requisição a dependencia express
 */
const express = require('express');

const cors = require('cors');

const { errors } = require('celebrate');

/**
 * Criando uma const routes para fazer uma ponte com o arquivo de rotas do meu backend
 */
const routes = require('./routes');

/**
 * Instanciando o express
 */
const app = express();

app.use(cors());

/**
 * Configura o app para usar objetos json nas requisições
 */
app.use(express.json());

/**
 * Configura o app a usar as rotas do routes
 */
app.use(routes);

app.use(errors());

app.listen(3333);