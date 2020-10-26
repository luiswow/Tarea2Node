var express = require('express');
var route = express.Router();
var apiController = require('../../api/bicicleta');

route.get('/',apiController.bicicletas_list);

route.post('/create',apiController.bicicletas_create);

route.put('/update',apiController.bicicletas_update);

route.delete('/delete',apiController.bicicletas_remove);

module.exports = route;