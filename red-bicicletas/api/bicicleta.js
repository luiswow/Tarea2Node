var Bicicleta = require('../model/bicicleta');

exports.bicicletas_list = function(req,res){
    res.status(200).json({
        bicicletas: Bicicleta.allBicis
    });
}

exports.bicicletas_create = function(req,res){
    var bici = Bicicleta.createInstance(req.body.code,req.body.color,req.body.modelo,
        [req.body.latitud,req.body.longitud]);
    Bicicleta.add(bici);

    res.status(200).json({
        'mensaje' : 'se ha creado  la bicicleta'
    });
}

exports.bicicletas_update = function(req,res){
    var bici = Bicicleta.findById(req.body.id);
    if(bici != null){
        bici.color = req.body.color;
        bici.modelo = req.body.modelo;
        bici.ubicacion = [req.body.latitud,req.body.longitud];
        res.status(200).json({'mensaje':'Se ha actualizado al bicicleta'});
    }else {
        res.status(500).json({'error':'No se ha encontrado una Bicicleta con ese ID'});
    }
}

exports.bicicletas_remove = function(req,res){
    var bici = Bicicleta.findById(req.body.id);
    console.log('remover',bici);
    if(bici != null){
        Bicicleta.removeById(bici.id);
        res.status(200).json({'mensaje':'Se ha eliminado la bicicleta'});
    }else {
        res.status(500).json({'error':'No se ha encontrado una Bicicleta con ese ID'});
    }
}