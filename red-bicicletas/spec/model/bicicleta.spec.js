var Bicicleta = require('../../model/bicicleta');
var mongoose = require('mongoose');
const TAMAÑO_INICIAL_BICI = 0;

describe('Bicicleta test',()=>{

    beforeEach((done)=>{
        var db = "mongodb://localhost/test-bicicletas";
        mongoose.connect(db,{
            useUnifiedTopology: true, 
            useFindAndModify: false,
            useCreateIndex: true,
            useNewUrlParser: true
        });
        mongoose.Promise = global.Promise;
        var dbConnection = mongoose.connection;
        dbConnection.on('error',console.error.bind(console,'MongoDB Connection Error'));
        dbConnection.once('open',()=>{
            console.log('Se ha establecido la conexion a la db');
            done();
        });
    });



    afterEach((done)=>{
        Bicicleta.deleteMany({},function(err,sucess){
            if(err) console.log(err);
            done();
            mongoose.disconnect();
        });
    });
    
    describe('Bicicleta.allBicis',()=>{
        it('Comienza vacia',(done)=>{
            Bicicleta.allBicis(function(err,bicis){
                expect(bicis.length).toBe(TAMAÑO_INICIAL_BICI);
                done(); 
                console.log('Bicicleta.allBicis passed')
            });
        });
    });

    describe('Bicicleta.add', () => {
        it('Agrega una Bicicleta', (done) => {
            var a1 = Bicicleta({code: 1, color: 'Black', modelo: 'gw', ubicacion: [42.26, 22.15]});
            Bicicleta.add(a1, function(err, newBici) {
                if (err) console.log(err);
                Bicicleta.allBicis(function(err, bicis) {
                    expect(bicis.length).toEqual(TAMAÑO_INICIAL_BICI + 1);
                    expect(bicis[0].code).toEqual(a1.code)
                    done();
                    console.log('Bicicleta.add passed');
                });
            });
        });
    });

     describe('Bicicleta.findByCode', () => {
        it('Debe devolver la Bicicleta con codigo 1', (done) => {
            Bicicleta.allBicis(function(err, bicis) {
                expect(bicis.length).toBe(TAMAÑO_INICIAL_BICI);

                var a1 = Bicicleta({code: 1, color: 'Black', modelo: 'gw', ubicacion: [1,2]});
                Bicicleta.add(a1, function(err, newBici) {
                    if (err) console.log(err);

                    var a2 = Bicicleta({code: 2, color: 'White', modelo: 'shimano', ubicacion: [3,4]});
                    Bicicleta.add(a2, function(err, newBici) {
                        if (err) console.log(err);
                        Bicicleta.findByCode(1, function (error, targetBici) {
                            expect(targetBici.code).toBe(a1.code);
                            expect(targetBici.color).toBe(a1.color);
                            expect(targetBici.modelo).toBe(a1.modelo);
                            done();
                            console.log('Bicicleta.findByCode passed');
                        })
                    });
                });
            });
        });
    });

    describe('Bicicleta.removeByCode', () => {
        it('Debe devolver la Bicicleta con codigo 1', (done) => {
            Bicicleta.allBicis(function(err, bicis) {
                expect(bicis.length).toBe(TAMAÑO_INICIAL_BICI);

                var a1 = Bicicleta({code: 1, color: 'Black', modelo: 'gw', ubicacion: [1,2]});
                Bicicleta.add(a1, function(err, newBici) {
                    if (err) console.log(err);

                    var a2 = Bicicleta({code: 2, color: 'White', modelo: 'shimano', ubicacion: [3,4]});
                    Bicicleta.add(a2, function(err, newBici) {
                        if (err) console.log(err);

                        Bicicleta.removeByCode(1, function (err) {
                            if (err) console.log(err);

                            Bicicleta.allBicis(function(err, bicis) {
                                expect(bicis.length).toBe(TAMAÑO_INICIAL_BICI + 1);
                                
                                Bicicleta.findByCode(2, function (err, targetBici) {
                                    if (err) console.log(err);
                                    expect(targetBici.code).toBe(a2.code);
                                    expect(targetBici.color).toBe(a2.color);
                                    expect(targetBici.modelo).toBe(a2.modelo);
                                    done();
                                    console.log('Bicicleta.findByCode passed');
                                });
                            });
                        });
                    });
                });
            });
        });
    }); 
});

