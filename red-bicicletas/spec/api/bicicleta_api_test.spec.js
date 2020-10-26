var Bicicleta = require('../../model/bicicleta');
var request = require('request');
var server = require('../../bin/www');
var mongoose = require('mongoose');
const statusOK = 200;
const base_url = 'http://localhost:3001/apiBicicletas';
const TAMAÑO_INICIAL_BICI = 0;


describe('Bicicleta API', () => {

    beforeEach(function (done) {
        mongoose.connection.close().then(() => {
            mongoose.connect('mongodb://localhost/test', { 
                useUnifiedTopology: true, 
                useFindAndModify: false,
                useCreateIndex: true,
                useNewUrlParser: true
            });
            var db = mongoose.connection;
            db.on('error', console.error.bind(console, 'MongoDB connection error: '));
            db.once('open', function () {
                console.log('We are connected to test database!');
                done();
            });
        });
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
    });

    afterEach(function (done) {
        Bicicleta.deleteMany({},function(err,sucess){
            if(err) console.log(err);
            done();
            mongoose.disconnect();
        });
    });

    describe('GET BICICLETAS /', () => {
        it("Status 200", (done) => {
            request.get(base_url, function (error, response, body) {
                expect(response.statusCode).toBe(statusOK);
                Bicicleta.allBicis(function(err, bicis) {
                    expect(bicis.length).toBe(TAMAÑO_INICIAL_BICI);
                    done();
                    console.log('GET BICICLETAS passed');
                });
            })
        })
    })

    describe('POST BICICLETAS /create', () => {
        it("Status 200", (done) => {
            var headers = { 'content-type': 'application/json' };
            var aBici = '{ "code": 10, "color": "Black", "modelo": "Orbea", "latitud": 42, "longitud": 3 }';
            request.post({
                headers: headers,
                url: base_url + '/create',
                body: aBici
            }, function (error, response, body) {
                expect(response.statusCode).toBe(statusOK);
                var result = JSON.parse(body);
                console.log(result);
                done();
                console.log('POST BICICLETAS /create passed');
            });
        },20000);
    });
});