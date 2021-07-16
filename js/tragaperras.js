window.onload = inici;

function inici() {
    //boton tirar
    document.querySelector("#lanzar").onclick = tiradaInicial;
    //boton 1 tirada
    document.querySelector("#b0").onclick = avance;
    //boton 2 tirada
    document.querySelector("#b1").onclick = avance;
    //boton 3 tirada
    document.querySelector("#b2").onclick = avance;
    //generar credito inicial
    creditoInicial();
}

//array donde guardar las monedas disponibles
var monedas = [];
//array para guardar los nombres de las imagenes
var imagenes = [];

function tiradaInicial() {

    if (monedas.length > 0) {
        alert("tirada");
    }
}

function avance() {
    alert("avance");
}

function creditoInicial() {
    let monedasRandom = Math.floor(Math.random() * 10);
    var length = monedasRandom;
    if (monedasRandom > 0) {
        for (let i = 0; i < length; i++) {
            monedas.push("coin");
        }
        console.log(monedas);
    }
    else {
        monedasRandom = 1;
    }
    document.querySelector("#dinero").innerHTML = monedas.length;
    //document.querySelector("#dinero").src = ("img/" + personas[0] + ".png");
}