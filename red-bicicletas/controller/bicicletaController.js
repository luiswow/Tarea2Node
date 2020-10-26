
var bicicleta = require('../model/bicicleta');
const Bicicleta = require('../model/bicicleta');

exports.bicicleta_list = function(req,res){
    res.render('bicicleta/index',{bicis:bicicleta.allBicis});
}

exports.bicicleta_create_get = function(req,res){
    res.render('bicicleta/create');
}

exports.bicicleta_create_post = function(req,res){
    var bici = new Bicicleta(req.body.id,req.body.color,req.body.modelo,
        [req.body.latitud,req.body.longitud]);
    bicicleta.add(bici);
    res.redirect('/bicicleta');
}

exports.bicicleta_remove_post = function(req,res){
    Bicicleta.removeById(req.body.id);
    res.redirect('/bicicleta');
}

exports.bicicleta_update_get = function(req,res){
    var bici = Bicicleta.findById(req.params.id);
    res.render('bicicleta/update',{bici});
}

exports.bicicleta_update_post = function(req,res){
    var bici = Bicicleta.findById(req.body.id);
    bici.id = req.body.id;
    bici.color = req.body.color;
    bici.modelo = req.body.modelo;
    bici.ubicacion = [req.body.latitud,req.body.longitud];
    res.redirect('/bicicleta');
}