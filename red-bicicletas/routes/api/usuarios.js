var express = require('express');
var router = express.Router();
var usuarioController= require('../../api/usuarioControllerAPI')

/* GET users listing. */
router.get('/', usuarioController.usuario_list);
router.post('/create', usuarioController.usuario_create);
router.post('/reservar', usuarioController.usuario_reservar);

module.exports = router;
