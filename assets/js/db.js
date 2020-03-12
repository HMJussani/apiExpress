const fireBase = require('firebase');

const firebaseConfig = {
    apiKey: "AIzaSyDSu9mQ77ASPWZg-s0j45mRyiUVjK357J4",
    authDomain: "estudo-d5862.firebaseapp.com",
    databaseURL: "https://estudo-d5862.firebaseio.com",
    projectId: "estudo-d5862",
    storageBucket: "estudo-d5862.appspot.com",
    messagingSenderId: "4938509167",
    appId: "1:4938509167:web:3f9780708426e41f07d69a",
    measurementId: "G-GKSWD7NJ7T"
};

fireBase.initializeApp(firebaseConfig);
fireBase.database().ref().on('value', function (snapshot) {});

function dbExiste(db, title) {
    var existe = false;
    fireBase.database().ref(db).child(title).on('value', function (snapshot) {
        existe = snapshot.exists();
    });
    return existe;
}

const writeDb = (db, dados) => {
    return fireBase.database().ref(db).push(dados);
}

exports.writeDb = writeDb;

const updateDb = (db, dados) => {
    if (dbExiste(db, title) === false) {
        alert(` ${title} não encontrado no banco de dados.`);
        return;
    }
    return fireBase.database().ref(db).set(dados);
}

exports.updateDb = updateDb;

const readDb = (db, title) => {
    if (dbExiste(db, title) === false) {
        alert(` ${title} não encontrado no banco de dados.`);
        return;
    }
    var data = [];
    fireBase.database().ref(db).child(title).on('value', function (snapshot) {
        var readings = snapshot.val();
        if (readings) {
            var currentValue;
            for (var key in readings) {
                currentValue = readings[key]
                data.push(currentValue);
            }
        }
    });
    return data;
}

exports.readDb = readDb;

const readDbAll = (db) => {
    var data = [];
    fireBase.database().ref(db).on('value', function (snapshot) {
        var readings = snapshot.val();
        if (readings) {
            var currentValue;
            for (var key in readings) {
                currentValue = readings[key]
                data.push(currentValue);
            }
        }
    });
    return data;
}

exports.readDbAll = readDbAll;

const deleteDb = (db, title) => {
    if (dbExiste(db, title) === false) {
        alert(` ${title} não encontrado no banco de dados.`);
        return;
    }
    var aRemover = fireBase.database().ref(`${db}/${title}/`);
    aRemover.remove(function (error) {
        alert(`${title} removido do banco de dados.`);
    });
}

exports.deleteDb = deleteDb;  