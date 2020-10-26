var mymap = L.map('mapid').setView([5.0677770, -75.5145712], 13);

const provider = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const atrr = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors';

L.tileLayer(provider, {attribution: atrr}).addTo(mymap);

var marker = L.marker([5.0680080, -75.5174917]).addTo(mymap);

var marker_2 = L.marker([5.0581069, -75.4899608]).addTo(mymap);

$.ajax({
    dataType : "json",
    url : "apiBicicletas",
    success : function(res){
        console.log('entro');
        console.log('respuesta',res);
        res.bicicletas.forEach(element => {
            L.marker(element.ubicacion,{title : element.id}).addTo(mymap);
        });
    },
    error : function(err){
        console.log(err);
    }
})