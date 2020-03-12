const express = require('express');
const bodyParser = require('body-parser');

const fireBase = require('./db')
const app = express();
const porta = 8080;

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    res.render('index.ejs');   
});

app.post('/salva', (req, res) => {
    fireBase(req.body);
    res.redirect('/');

})

app.listen(porta, function () {
    console.log(`Rodando em: ${porta}`)
});