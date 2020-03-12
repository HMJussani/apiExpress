const express = require('express');
const bodyParser = require('body-parser');

const fireBase = require('./db')
const app = express();
const porta = 8080;
const db = "Mandic";
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    res.render('index.ejs');
});
app.get('/show', function (req, res) {
    res.send(fireBase.readDbAll(db));
    res.redirect('/');
});
app.get('/getUser', function (req, res) {
    res.send(fireBase.readDb(db,req.body));
    res.redirect('/');
});

app.post('/salva', (req, res) => {
    fireBase.writeDb(db, req.body);
    res.redirect('/');

})

app.listen(porta, function () {
    console.log(`Rodando em: ${porta}`)
});