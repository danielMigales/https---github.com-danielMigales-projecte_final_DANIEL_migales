window.onload = inici;

function inici() {
    //boton tirar
    document.querySelector("#lanzar").onclick = tiradaPrincipal;
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
var imagenes = ["cerezas.png", "fresa.png", "limon.png", "naranja.png", "platanos.png", "sandia.png"];
//array que guarda las imagenes de las ventanas para luego compararlas
var ventanas = [];

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
    }
    //resto al array monedas una moneda
    monedas.pop();
    //llamada a la funcion que comprueba si hay coincidencias en las imagenes para otorgar premio
    comprobarPremio();
    //llamada a la funcion que resta una moneda y actualiza las imagenes de monedas
    actualizarMonedas();
}

//funcion que se llamara al pulsar cualquiera de los botones de "volver a tirar"
function avance() {
    alert("avance");
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
        //añadira una moneda como premio
        monedas.push("moneda.png");
        alert("Premio, has ganado una moneda.");
    }
}

//funcion para actualizar las monedas cada vez que se tira
function actualizarMonedas() {
    //Vuelvo a cargar el div con la cantidad de dinero en numero que hay ahora
    document.querySelector("#dinero").innerHTML = monedas.length + `<span class="euros">€</span>`;
    //Para mostrar la cantidad de monedas que hay ahora vuelvo a cargar el div con las imagenes
    //Primero elimino las que estan ahora
    document.querySelector("#monedas").innerHTML ="";
    for (let coin of monedas) {
        //Inserto de nuevo las monedas
        document.querySelector("#monedas").innerHTML += `<img src="img/${coin}">`;
    }
    //cuando no quedan monedas avisa mediante mensaje
    if (monedas.length == 0) {
        alert("No tienes credito");
    }

}