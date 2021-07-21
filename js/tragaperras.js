window.onload = inici;

var monedas = [];
var imagenes = ["cerezas.png", "fresa.png", "limon.png", "naranja.png", "platanos.png", "sandia.png"];
var ventanas = [];
var mp3;
var avanceDisponible = false;

function inici() {
    document.querySelector("#lanzar").onclick = tiradaPrincipal;
    for (let i = 0; i < 3; i++) {
        document.querySelectorAll(".boton")[i].onclick = avance;
    }
    mp3 = document.getElementById("audio");
    creditoInicial();
}

function creditoInicial() {
    let monedasRandom = Math.floor(Math.random() * 15);
    var length = monedasRandom;
    if (monedasRandom > 0) {
        for (let i = 0; i < length; i++) {
            monedas.push("moneda.png");
        }
    } else {
        monedasRandom = 1;
        monedas.push("moneda.png");
    }
    document.querySelector("#dinero").innerHTML = monedasRandom + `<span class="euros">€</span>`;
    for (let coin of monedas) {
        document.querySelector("#monedas").innerHTML += `<img src="img/${coin}">`;
    }
}

function tiradaPrincipal() {
    if (monedas.length > 0) {
        let totalDivs = document.querySelectorAll(".ventana").length;
        for (let i = 0; i < totalDivs; i++) {
            ventanas[i] = imagenes[Math.floor(Math.random() * imagenes.length)];
            document.querySelectorAll(".ventana")[i].innerHTML = `<img src="img/${ventanas[i]}">`;
        }
        sonidos("lanzar.mp3");
    } else {
        velo("Te has quedado sin credito", "final.mp3");
    }
    monedas.pop();
    comprobarPremio();
    actualizarMonedas();
    avanceDisponible = true;
}

function comprobarPremio() {
    if (ventanas[0] == ventanas[1] && ventanas[1] == ventanas[2]) {
        var premio;
        if (ventanas[1] == "cerezas.png") {
            premio = 1;
        } else if (ventanas[1] == "fresa.png") {
            premio = 2;
        } else if (ventanas[1] == "limon.png") {
            premio = 3;
        } else if (ventanas[1] == "naranja.png") {
            premio = 4;
        } else if (ventanas[1] == "platanos.png") {
            premio = 5;
        } else if (ventanas[1] == "sandia.png") {
            premio = 6;
        }
        for (let i = 0; i < premio; i++) {
            monedas.push("moneda.png");
        }
        velo("Has ganado", "ganar.mp3", premio);
        avanceDisponible = false;
    }
}


function actualizarMonedas() {
    document.querySelector("#dinero").innerHTML = monedas.length + `<span class="euros">€</span>`;
    document.querySelector("#monedas").innerHTML = "";
    for (let coin of monedas) {
        document.querySelector("#monedas").innerHTML += `<img src="img/${coin}">`;
    }
    if (monedas.length == 0) {
        velo("Te has quedado sin credito", "final.mp3", 0);
        avanceDisponible = false;
    }
}

function avance() {
    if (avanceDisponible && monedas.length > 0) {
        let imagenNueva = imagenes[Math.floor(Math.random() * imagenes.length)];
        let posicion;
        if (this.id == "b0") {
            posicion = 0;
        } else if (this.id == "b1") {
            posicion = 1;
        } else if (this.id == "b2") {
            posicion = 2;
        }
        while (ventanas[posicion] == imagenNueva) {
            imagenNueva = imagenes[Math.floor(Math.random() * imagenes.length)];
        }
        sonidos("otra.wav");
        monedas.pop();
        document.querySelectorAll(".ventana")[posicion].innerHTML = `<img src="img/${imagenNueva}">`;
        ventanas[posicion] = imagenNueva;
        comprobarPremio();
        actualizarMonedas();
    }
}

function velo(mensaje, archivoMp3, premio) {
    document.querySelector("#velo").style.display = "flex";
    document.querySelector("#velo").innerHTML = `<div id="cuadro_mensaje">
    <img id="cruz" src="img/cruz.svg" width="28px">
    <div id="mensaje">${mensaje} ${premio}€</div>
    <div id="premio"></div>
  </div>`;
    for (let i = 0; i < premio; i++) {
        document.querySelector("#premio").innerHTML += `<img src="img/moneda.png" width="28px">`;
    }
    document.getElementById("cruz").onclick = cerrarVelo;
    sonidos(archivoMp3);
}

function sonidos(nombreAudio) {
    let ruta = "audios/" + nombreAudio;
    console.log(ruta);
    mp3.src = ruta;
    var playPromise = mp3.play();
    if (playPromise !== undefined) {
        playPromise.then(_ => {
            mp3.play();
        })
            .catch(error => { });
    }
}

function cerrarVelo() {
    document.querySelector("#velo").style.display = "none";
}