var Usuario = require('../model/usuario');

exports.usuario_list = function(req, res) {
    Usuario.find({}, function(err, usuarios) {
        res.status(200).json({
            usuarios: usuarios
        });
    });
}

exports.usuario_create = function(req, res) {
    var usuario = new Usuario(req.body.nombre);
    usuario.save(function(err) {
        // res.status(200).json(usuario);
        if (err){res.status(500)}
        else{
            res.status(200).json({
                usuario: usuario
            });
        }
    });
}

exports.usuario_reservar = function(req, res) {
    Usuario.find(req.body.id, function(err, usuario) {
        console.log(usuario);
        usuario.reservar(req.body.bici_id, req.body.desde, req.body.hasta, function(err) {
            console.log('reservas');
            res.status(200).send();
        });
    });
}
