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

module.exports = function salvaDb(dados) {
    fireBase.database().ref('Mandic').push(dados);
}

/*
if (firebase.initializeApp(firebaseConfig)) {

    firebase.database().ref(`Tutoriais`).on(`value`, function (snapshot) {
        var data = [];
        var readings = snapshot.val();
        if (readings) {
            var currentValue;
            for (var key in readings) {
                currentValue = readings[key];
                data.push(currentValue);
            }
            criarLinks(data);
        }
    });

    function lerBanco(title) {       
        limparDiv();
        criarDivs(getData(title));
        document.querySelector("#title").value = title;
    }

    function apagaTuto(title) {       
            var aRemover = firebase.database().ref(`Tutoriais/${title}/`);
            aRemover.remove(function (error) {
                alert(`${title} removido do banco de dados.`);
                window.location.reload();
            });
        
    }
}
*/