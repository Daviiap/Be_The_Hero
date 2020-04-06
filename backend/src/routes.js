const express = require('express');

const { celebrate, Segments, Joi } = require('celebrate');

const ongController = require('./controllers/OngController');

const incidentController = require('./controllers/IncidentController');

const profileController = require('./controllers/ProfileController');

const sessionController = require('./controllers/SessionController.js');

const routes = express.Router();

/**
 * MÉTODOS HTTP:
 * 
 * GET: Buscar informações do back-end
 * POST: Criar informação no back-end
 * PUT: Editar informação no back-end
 * DELETE: Exclui informação no back-end
 */

/**
 * Tipos de parametros:
 * 
 * Query params: parametros enviados dentro da url apos "?", que servem para filtros, paginação
 * Route params: parametros utilizados para identificar recursos
 * Request Body:  Corpo da requisição utilizado para criar ou alterar recursos
 * 
 */

routes.post('/sessions', sessionController.create);

routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required(),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2)
    })
}), ongController.create);

routes.get('/ongs', ongController.index);

routes.delete('/ongs/:id', ongController.delete);


routes.post('/incidents', celebrate({
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        value: Joi.number().required()
    }),

    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown()
}), incidentController.create);

routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number()
    })
}), incidentController.index);

routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}), incidentController.delete);


routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown()
}), profileController.index);

module.exports = routes;