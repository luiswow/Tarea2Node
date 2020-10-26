var mongoose = require('mongoose');
var Bicicleta = require('../../model/bicicleta');
var Usuario = require('../../model/usuario');
var Reserva = require('../../model/reserva');

describe('Testing de Usuario', function(){
    beforeAll((done) => { mongoose.connection.close(done) });

    beforeEach((done) => {
        mongoose.disconnect();

        var mongoDB = "mongodb://localhost/testdb";
        mongoose.connect(mongoDB, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        mongoose.connection.on('connected', () => {
            console.log('MongoDB is connected');
            done();
        });
    });

    //las promise's resuelven las cascadas de este tipo
    afterEach((done) => {
        Reserva.deleteMany({}, function(err, success) {
            if (err) {console.log(err);}
            Usuario.deleteMany({}, function(err, success) {
                if (err) {console.log(err);}
                Bicicleta.deleteMany({}, function(err, success) {
                    if (err) {console.log(err);}
                    mongoose.connection.close(done);
                });
            })
        });
    });
    
    
    describe('Cuando se reserva una Bici', () => {
        it('Debe existir la reserva', (done) => {
            var user = new Usuario({ nombre: 'Luciano' });
            user.save();

            var bicicleta = new Bicicleta({ code: 1, color: 'verde', modelo: 'urbana' });
            bicicleta.save();

            var today = new Date();
            var tomorrow = new Date();
            tomorrow.setDate(today.getDate() + 1);

            user.reservar(bicicleta.id, today, tomorrow, function(err, reserva) {
                Reserva.find({}).populate('bicicleta').populate('usuario').exec(function(err, reservas) {
                    console.log(reservas[0]);
                    expect(reservas.length).toBe(1);
                    expect(reservas[0].diasDeReserva()).toBe(2);
                    expect(reservas[0].bicicleta.code).toBe(1);
                    expect(reservas[0].usuario.nombre).toBe(user.nombre);

                    done();
                });
            });
        });
    });


});