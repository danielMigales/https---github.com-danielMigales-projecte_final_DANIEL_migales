window.onload = inici;

//array donde guardar las monedas disponibles
var monedas = [];
//array para guardar los nombres de las imagenes
var imagenes = ["cerezas.png", "fresa.png", "limon.png", "naranja.png", "platanos.png", "sandia.png"];
//array que guarda las imagenes de las ventanas para luego compararlas
var ventanas = [];
//variable para el audio
var mp3;
//bandera para activar los 3 botones extras
var avanceDisponible = false;

function inici() {
    //boton tirar
    document.querySelector("#lanzar").onclick = tiradaPrincipal;
    //botones volver a tirar
    for (let i = 0; i < 3; i++) {
        document.querySelectorAll(".boton")[i].onclick = avance;
    }
    //inicializacion de variable audio
    mp3 = document.getElementById("audio");
    //generar credito inicial
    creditoInicial();
    //boton de los velos
    document.getElementById("cruz").onclick = cerrarVelo;
}

//funcion que generara la tirada general
function tiradaPrincipal() {
    //este caso siempre se aplicara, ya que he corregido que nunca tenga el valor de 0 en la funcion creditoInicial
    if (monedas.length > 0) {
        //recorro el array de imagenes para obtener una aleatoriamente y añado la imagen en el div "ventana"
        //para que solo haga tres vueltas le coloco como longitud los div con class "ventana"
        let totalDivs = document.querySelectorAll(".ventana").length;
        for (let i = 0; i < totalDivs; i++) {
            //posicion del array random
            ventanas[i] = imagenes[Math.floor(Math.random() * imagenes.length)];
            //añado las imagenes al div "ventana"
            document.querySelectorAll(".ventana")[i].innerHTML = `<img src="img/${ventanas[i]}">`;
        }
        //añado el sonido de lanzar
        sonidos("lanzar.mp3");
    }
    else{
        veloSinCredito();
    }
    //resto al array monedas una moneda
    monedas.pop();
    //llamada a la funcion que comprueba si hay coincidencias en las imagenes para otorgar premio
    comprobarPremio();
    //llamada a la funcion que resta una moneda y actualiza las imagenes de monedas
    actualizarMonedas();
    //la variable se pone en true para que permita realizar tiradas extras
    avanceDisponible = true;
}

//funcion que se llamara al pulsar cualquiera de los botones de "volver a tirar"
function avance() {
    //si la variable boolena es cierta dejara realizar las tiradas y hay credito
    if (avanceDisponible && monedas.length>0) {
        //genero una nueva imagen random
        let imagenNueva = imagenes[Math.floor(Math.random() * imagenes.length)];
        //obtengo el id del boton y le asigno un numero
        let id = this.id;
        if (id == "b0") {
            id = 0;
        } else if (id == "b1") {
            id = 1;
        } else if (id == "b2") {
            id = 2;
        }
        //si la imagen que hay en la ventana es igual que la nueva, genero otra random hasta que sea diferente
        while (ventanas[id] == imagenNueva) {
            console.log(ventanas[id]);
            imagenNueva = imagenes[Math.floor(Math.random() * imagenes.length)];
        }
        //una vez asegurado que la imagen no va a ser igual continuo la sequencia
        //reproducir audio de boton volver a tirar
        sonidos("otra.wav");
        //resto al array monedas una moneda y llamo a la funcion de actualizar el div de imagenes de monedas
        monedas.pop();        
        //añado las imagenes nuevas al div "ventana" correspondiente segun el boton que se ha pulsado
        document.querySelectorAll(".ventana")[id].innerHTML = `<img src="img/${imagenNueva}">`;
        ventanas[id] = imagenNueva;
        comprobarPremio();
        actualizarMonedas();
    }
}

//funcion para añadir al inicio un numero de monedas aleatorio
function creditoInicial() {
    //se aplica la formula random para obtener un maximo total de 15 monedas
    let monedasRandom = Math.floor(Math.random() * 15);
    //el numero obtenido por el random sera el total de monedas y el total del tamaño del array que guardara imagenes de monedas
    var length = monedasRandom;
    //si el numero obtenido aleatorio es mayor que el 0 llenara el array siendo ese mismo su longitud
    if (monedasRandom > 0) {
        for (let i = 0; i < length; i++) {
            monedas.push("moneda.png");
        }
    }
    //en caso de salir el cero, el valor siempre sera un 1 y llenara el array de monedas con una imagen
    else {
        monedasRandom = 1;
        monedas.push("moneda.png");
    }
    //se llenara el div "dinero" con el numero total de monedas y el simbolo del euro (esto ultimo tengo que mejorar el sistema...)
    document.querySelector("#dinero").innerHTML = monedasRandom + `<span class="euros">€</span>`;
    //se llenara el div "monedas" con el contenido del array monedas (que son imagenes de monedas)
    for (let coin of monedas) {
        document.querySelector("#monedas").innerHTML += `<img src="img/${coin}">`;
    }
}

//funcion que comprueba si hay coincidencia en las tres imagenes
function comprobarPremio() {
    //si son las tres imagenes del array ventanas iguales lanzara la alerta
    if (ventanas[0] == ventanas[1] && ventanas[1] == ventanas[2]) {
        //dependiendo de la fruta que salga el premio sera mayor o menor
        var premio;
        if (ventanas[1] == "cerezas.png") {
            premio = 1;
            monedas.push("moneda.png");
        } else if (ventanas[1] == "fresa.png") {
            premio = 2;
            monedas.push("moneda.png", "moneda.png");
        } else if (ventanas[1] == "limon.png") {
            premio = 3;
            monedas.push("moneda.png", "moneda.png", "moneda.png");
        } else if (ventanas[1] == "naranja.png") {
            premio = 4;
            monedas.push("moneda.png", "moneda.png", "moneda.png", "moneda.png");
        } else if (ventanas[1] == "platanos.png") {
            premio = 5;
            monedas.push("moneda.png", "moneda.png", "moneda.png", "moneda.png", "moneda.png");
        } else if (ventanas[1] == "sandia.png") {
            premio = 6;
            monedas.push("moneda.png", "moneda.png", "moneda.png", "moneda.png", "moneda.png", "moneda.png");
        }
        //aparece el velo
        veloGanador(premio);
    }
}

//funcion para actualizar las monedas cada vez que se tira
function actualizarMonedas() {
    //Vuelvo a cargar el div con la cantidad de dinero en numero que hay ahora
    document.querySelector("#dinero").innerHTML = monedas.length + `<span class="euros">€</span>`;
    //Para mostrar la cantidad de monedas que hay ahora vuelvo a cargar el div con las imagenes
    //Primero elimino las que estan ahora
    document.querySelector("#monedas").innerHTML = "";
    for (let coin of monedas) {
        //Inserto de nuevo las monedas
        document.querySelector("#monedas").innerHTML += `<img src="img/${coin}">`;
    }
    //cuando no quedan monedas avisa mediante mensaje
    if (monedas.length == 0) {
        veloSinCredito();
        //se bloquean los tres botones de avance
        avanceDisponible=false;
    }
}

//funciones para llenar los velos
function veloSinCredito() {
    document.querySelector("#velo").style.display = "flex";
    document.querySelector("#velo").innerHTML = `<div id="cuadro_mensaje">
    <img id="cruz" src="img/cruz.svg" width="28px" onclick=cerrarVelo()>
    <div id="mensaje">Te has quedado sin credito</div>
  </div>`;
    //Se reproduce el sonido de perdida
    sonidos("final.mp3");
}

function veloGanador(premio) {
    document.querySelector("#velo").style.display = "flex";
    document.querySelector("#velo").innerHTML = `<div id="cuadro_mensaje">
    <img id="cruz" src="img/cruz.svg" width="28px" onclick=cerrarVelo()>
    <div id="mensaje">"Has ganado ${premio} monedas"</div>
    <div id="premio" style="text-align: center"></div>
  </div>`;
    for (let i = 0; i < premio; i++) {
        document.querySelector("#premio").innerHTML += `<img src="img/moneda.png" width="28px">`;
    }
    //Se reproduce el sonido de premio
    sonidos("ganar.mp3");
}

//funcion de reproduccir audio
function sonidos(nombreAudio) {
    let ruta = "../audios/" + nombreAudio;
    mp3.src = ruta;
    mp3.play();
}

//funcion del boton del velo
function cerrarVelo(){
    document.querySelector("#velo").style.display = "none";
}