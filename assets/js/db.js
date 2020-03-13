const fireBase = require('firebase');
const firebaseConfig = require('./firebaseConfig');

fireBase.initializeApp(firebaseConfig);
fireBase.database().ref().on('value', function (snapshot) { });

const dbExiste = (db, title) => {
    var existe = false;
    fireBase.database().ref(db).child(title).on('value', function (snapshot) {
        existe = snapshot.exists();
    });
    return existe;
}
exports.dbExiste = dbExiste;

const writeDb = (db, name, email, tel, skill) => {
    fireBase.database().ref(`${db}/${name}`).set({
        name,
        email,
        tel,
        skill,
    });
}
exports.writeDb = writeDb;

const updateDb = (db, name, email, tel, skill) => {
    fireBase.database().ref(`${db}/${name}`).update({
        email,
        tel,
        skill,
    });
}
exports.updateDb = updateDb;

const readDb = (db, name) => {
    if (dbExiste(db, name) === false) {
        return;
    }
    var data = [];
    fireBase.database().ref(db).child(name).on('value', function (snapshot) {
        var readings = snapshot.val();
        if (readings) {
            var currentValue;
            for (var key in readings) {
                currentValue = readings[key]
                data.push(currentValue);
            }
        }
    });
    return JSON.stringify(data);
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
    return JSON.stringify(data);
}
exports.readDbAll = readDbAll;

const deleteDb = (db, title) => {
    var aRemover = fireBase.database().ref(`${db}/${title}/`);
    aRemover.remove(function (error) {
        return error;
    });
}
exports.deleteDb = deleteDb;  