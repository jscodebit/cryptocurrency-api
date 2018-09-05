const express = require('express');
const app = express();
const request = require('request');
const url = 'https://api.coinmarketcap.com/v1/ticker/';
console.log(__dirname);
app.use(express.static(__dirname + '/public'));

app.get('/load', function(req, res){
    request(url, function(error, response, body){
        let holder = [];
        let data = JSON.parse(body);
        for(var i =0; i< data.length; i++){
            holder.push(capitalize(data[i].id));
        }
        res.json(holder);
    })
});
function capitalize(str) {
    return str.charAt(0).toUpperCase().concat(str.slice(1).toLowerCase());
}
app.get('/price/:cur', function(req, res){
    console.log(req.params);
    let curVal = (req.params.cur) ? req.params.cur : 'uSD';
    request(url +'?convert='+ curVal, function(error, resp, body){
        res.json(body)
    })
    //res.send('Hello 3');
});

app.get('/cyrpto/:cur', function(req, res){
    console.log(req.params);
    let curVal = (req.params.cur) ? req.params.cur : 'Bitcoin';
    request(url + curVal + '/', function(error, resp, body){
        res.json(body)
    });
   //res.send('Hello 3');
});
app.listen(3000);