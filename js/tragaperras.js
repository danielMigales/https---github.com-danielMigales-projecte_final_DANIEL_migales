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
    else {
        //en caso de que en la inicial solo tuviese una moneda y se acabase el credito
        velo("Te has quedado sin credito", "final.mp3");
    }
    //resto al array monedas una moneda por la tirada hecha
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
    //si la variable boolena es cierta y hay credito dejara realizar las tiradas 
    if (avanceDisponible && monedas.length > 0) {
        //genero una nueva imagen random
        let imagenNueva = imagenes[Math.floor(Math.random() * imagenes.length)];
        //obtengo el id del boton clicado y le asigno un numero para saber que ventana debe cambiar de imagen
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
            imagenNueva = imagenes[Math.floor(Math.random() * imagenes.length)];
        }
        //una vez asegurado que la imagen no va a ser igual continuo la sequencia
        //reproducir audio de boton volver a tirar
        sonidos("otra.wav");
        //resto al array monedas una moneda y llamo a la funcion de actualizar el div de imagenes de monedas
        monedas.pop();
        //añado las imagenes nuevas al div "ventana" correspondiente segun el boton que se ha pulsado
        document.querySelectorAll(".ventana")[id].innerHTML = `<img src="img/${imagenNueva}">`;
        //en el array sustituyo la imagen que habia por la nueva, asi se en todo momento que imagenes hay en las casillas
        ventanas[id] = imagenNueva;
        //comprueba si hay premio despues de cada tirada y actualiza el monedero
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
    //en caso de salir el cero en el random, el valor siempre sera un 1 y llenara el array de monedas con una imagen
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
        //Como las tres imagenes son iguales compruebo una de ellas y dependiendo de la fruta que salga el premio sera mayor o menor
        //lo que hago es leer el array y comparar los nombres, dando x monedas y añadiendo al array monedero una imagen
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
        //una vez comprobado el premio aparece el velo de ganador al que le paso los parametros
        velo("Has ganado", "ganar.mp3", premio);
        //se bloquean los tres botones de avance hasta que se tira de nuevo
        avanceDisponible = false;
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
        velo("Te has quedado sin credito", "final.mp3", 0);
        //se bloquean los tres botones de avance
        avanceDisponible = false;
    }
}

//funciones para llenar los velos
function velo(mensaje, archivoMp3, premio) {
    //muestro el div de velo
    document.querySelector("#velo").style.display = "flex";
    //inserto el div con los mensajes
    document.querySelector("#velo").innerHTML = `<div id="cuadro_mensaje">
    <img id="cruz" src="img/cruz.svg" width="28px">
    <div id="mensaje">${mensaje} ${premio}€</div>
    <div id="premio" style="text-align: center"></div>
  </div>`;
    //segun el premio se añaden monedas en el div premio
    for (let i = 0; i < premio; i++) {
        document.querySelector("#premio").innerHTML += `<img src="img/moneda.png" width="28px">`;
    }
    //preparo el boton de los velos para cerrarlos
    document.getElementById("cruz").onclick = cerrarVelo;
    //Se reproduce el sonido correspondiente
    sonidos(archivoMp3);
}

//funcion de reproduccir audio
function sonidos(nombreAudio) {
    //con el parametro le paso el nombre del audio y con el creo la ruta para hacer los cambios
    let ruta = "../audios/" + nombreAudio;
    mp3.src = ruta;
    //El audio me estaba dando problemas: 
    //Uncaught (in promise) DOMException: The play() request was interrupted by a new load request.
    //con lo cual he tenido que añadir esta solucion de google: 
    //https://developers.google.com/web/updates/2017/06/play-request-was-interrupted
    var playPromise = mp3.play();
    if (playPromise !== undefined) {
        playPromise.then(_ => {
            mp3.play();
        })
            .catch(error => {
               
            });
    }
}

//funcion del boton del velo
function cerrarVelo() {
    document.querySelector("#velo").style.display = "none";
}