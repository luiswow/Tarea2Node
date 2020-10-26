//nos traemos el modulo de routes de express
var express = require('express');
//modulo routeador de express
var router = express.Router();
//importamos el controlador
var biciCntroller = require('../controller/bicicletaController');

//definimos el metodo http 
router.get('/',biciCntroller.bicicleta_list);
router.get('/create',biciCntroller.bicicleta_create_get);
router.post('/create',biciCntroller.bicicleta_create_post);
router.post('/:id/remove',biciCntroller.bicicleta_remove_post);
router.get('/:id/update',biciCntroller.bicicleta_update_get);
router.post('/update',biciCntroller.bicicleta_update_post);

module.exports = router;