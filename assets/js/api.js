const express = require('express');
const bodyParser = require('body-parser');
const fireBase = require('./db')
const app = express();
const porta = 8080;
const db = "Mandic";

app.use(express.json());
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    res.render('index.ejs');
});

app.get('/show', function (req, res) {
    res.send(fireBase.readDbAll(db));
});

app.post('/getUser', function (req, res) {
    if (fireBase.dbExiste(db, req.body.name) === false) {
        res.send(`${req.body.name} não encontrado no banco de dados.`);
        return;
    }
    res.send(fireBase.readDb(db, req.body.name));
});

app.post('/updateUser', function (req, res) {
    if (fireBase.dbExiste(db, req.body.name) === false) {
        res.send(`${req.body.name} não encontrado no banco de dados.`);
        return;
    }
    res.send(fireBase.updateDb(db, req.body.name, req.body.email, req.body.tel, req.body.skill));
});

app.post('/deleteUser', function (req, res) {
    if (fireBase.dbExiste(db, req.body.name) === false) {
        res.send(`${req.body.name} não encontrado no banco de dados.`);
        return;
    }
    res.send(fireBase.deleteDb(db, req.body.name));
});

app.post('/salva', (req, res) => {
    fireBase.writeDb(db, req.body.name, req.body.email, req.body.tel, req.body.skill);
    res.redirect('/');
})

app.listen(porta, function () {
    console.log(`Rodando em: ${porta}`)
});