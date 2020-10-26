var mongoose = require('mongoose');
var SCHEMA = mongoose.Schema;

var bicicletaShema = new SCHEMA({
    code : Number,
    color : String,
    modelo : String,
    ubicacion : {
        type : [Number] ,index : {type:'2dsphere', sparse : true}
    }
});

bicicletaShema.methods.toString = ()=>{
    return 'code:' + this.code  + ' color:' + this.color;
};

bicicletaShema.statics.allBicis = function(cb){
 return this.find({},cb);   
}

bicicletaShema.statics.createInstance = function(code,color,modelo,ubicacion){
    return new this({
        code : code,
        color : color,
        modelo : modelo,
        ubicacion : ubicacion
    });
}

bicicletaShema.statics.add = function (aBici, cb) {
    this.create(aBici, cb);
}

bicicletaShema.statics.findByCode = function (aCode, cb) {
    return this.findOne({ code: aCode }, cb);
}

bicicletaShema.statics.removeByCode = function (aCode, cb) {
    return this.deleteOne({ code: aCode }, cb); 
}

module.exports = mongoose.model('Bicicleta',bicicletaShema);

