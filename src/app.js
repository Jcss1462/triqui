///definir turno
let count = 2;
let controlador = 0;

///matriz de ganador
var matrix = [];
var arriba = ["ai", "ac", "ad"];
var centro = ["ci", "cc", "cd"];
var abajo = ["abi", "abc", "abd"];
matrix = [arriba, centro, abajo];
console.log(matrix);


let color = ["#ecf0f1", "#1abc9c", "#2ecc71", "#3498db", "#9b59b6", "#f1c40f"];
var selectedColor = 0;
let touch = {
    starts: { x: null, y: null },
    ends: { x: null, y: null },
    swipeDistance: null
}

let clientW = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;

let clientH = window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight;

function listen() {

    let app = document.getElementsByClassName("dropable");
    for (var idx = 0; idx < app.length; idx++) {
        app[idx].addEventListener("drop", drop, false);
        app[idx].addEventListener("dragover", allowDrop, false);
    }


    let x = document.getElementById("0");
    x.addEventListener("dragstart", drag, false);
    x.draggable = true;

    let etiqueta = document.getElementById("turno");
    etiqueta.innerHTML = "Turno del jugador X";


}



function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);

}

function drop(ev) {


    ///////////////////
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));


    //que ya no se pueda posicionar nada en el
    ev.target.removeEventListener("drop", drop);
    ev.target.removeEventListener("dragover", allowDrop);

    //quitar el draggable
    let tmp = document.getElementById(data);
    tmp.draggable = false;
    tmp.removeEventListener("dragstart", drag);


    //poner un dragable al jugador siguiente
    let actual = document.getElementById(controlador + 1);
    actual.addEventListener("dragstart", drag, false);
    actual.draggable = true;

    turn(count)

    //anotar puntaje
    console.log("colocado en: " + ev.target.id);
    ganador(ev.target.id, controlador);

    count++;
    controlador++;
}

function turn(contador) {
    let espacio;
    let nuevax;
    let nuevao;
    let etiqueta = document.getElementById("turno");
    //console.log(etiqueta);

    if (contador % 2 == 0) {
        //crear un nuevo elemento
        espacio = document.getElementById("x");
        nuevax = document.createElement('div');
        nuevax.setAttribute("id", contador);
        nuevax.setAttribute("class", "x");
        nuevax.innerHTML = "X";
        espacio.appendChild(nuevax);
        etiqueta.innerHTML = "Turno del jugador O";
    } else {

        //crear un nuevo elemento
        espacio = document.getElementById("o");
        nuevao = document.createElement('div');
        nuevao.setAttribute("id", contador);
        nuevao.setAttribute("class", "o");
        nuevao.innerHTML = "O";
        espacio.appendChild(nuevao);
        etiqueta.innerHTML = "Turno del jugador X";

    }


}

function ganador(posicion, turno) {

    var confirmar = new Boolean(false);

    //dar puntaje en la matriz
    if (turno % 2 == 0) {
        recorrido(1, posicion);
    } else {
        recorrido(2, posicion);
    }

    if (

        ((matrix[0][0] == matrix[0][1]) && (matrix[0][0] == matrix[0][2])) ||
        ((matrix[1][0] == matrix[1][1]) && (matrix[1][0] == matrix[1][2])) ||
        ((matrix[2][0] == matrix[2][1]) && (matrix[2][0] == matrix[2][2])) ||

        ((matrix[0][0] == matrix[1][0]) && (matrix[0][0] == matrix[2][0])) ||
        ((matrix[0][1] == matrix[1][1]) && (matrix[0][1] == matrix[2][1])) ||
        ((matrix[0][2] == matrix[1][2]) && (matrix[0][2] == matrix[2][2])) ||

        ((matrix[0][0] == matrix[1][1]) && (matrix[0][0] == matrix[2][2])) ||
        ((matrix[2][0] == matrix[1][1]) && (matrix[2][0] == matrix[0][2]))

    ) {
        confirmar=true;
        //dar puntaje en la matriz
        if (turno % 2 == 0) {
            let ganador = document.getElementById("winner");
            ganador.style.display = "inline-block";

            //letrero
            letrero = document.createElement('div');
            letrero.setAttribute("id", "texto");
            letrero.setAttribute("class", "texto");
            letrero.innerHTML = "Gana jugador X"
            ganador.appendChild(letrero);

            //boton de reinicio
            restart = document.createElement('div');
            restart.setAttribute("id", "restart");
            restart.setAttribute("class", "restart");
            restart.addEventListener("click", restart, true);
            ganador.appendChild(restart);





        } else {
            let ganador = document.getElementById("winner");
            ganador.style.display = "inline-block";

            //letrero
            letrero = document.createElement('div');
            letrero.setAttribute("id", "texto");
            letrero.setAttribute("class", "texto");
            letrero.innerHTML = "Gana jugador O"
            ganador.appendChild(letrero);

            //boton de reinicio
            restart = document.createElement('div');
            restart.setAttribute("id", "restart");
            restart.setAttribute("class", "restart");
            restart.addEventListener("click", restart, true);
            ganador.appendChild(restart);
        }

    }

    //////////////////////////////////////////
    if (

        (matrix[0][0] != "ai") && (matrix[0][1] != "ac") && (matrix[0][2] != "ad")
        &&(matrix[1][0] != "ci") && (matrix[1][1] != "cc") && (matrix[1][2] != "cd")
        &&(matrix[2][0] != "abi") && (matrix[2][1] != "abc") && (matrix[2][2] != "abd")
        && (confirmar==false)

    ){

        console.log("empate");
        let ganador = document.getElementById("winner");
        ganador.style.display = "inline-block";

        //letrero
        letrero = document.createElement('div');
        letrero.setAttribute("id", "texto");
        letrero.setAttribute("class", "texto");
        letrero.innerHTML = "Empate"
        ganador.appendChild(letrero);

        //boton de reinicio
        restart = document.createElement('div');
        restart.setAttribute("id", "restart");
        restart.setAttribute("class", "restart");
        restart.addEventListener("click", restart, true);
        ganador.appendChild(restart);


    }






}



function recorrido(valor, posicion) {

    for (var filas = 0; filas < matrix.length; filas++) {
        for (var columnas = 0; columnas < matrix[filas].length; columnas++) {
            if (posicion == matrix[filas][columnas]) {
                matrix[filas][columnas] = valor;
            }
            //console.log(matrix[filas][columnas]);
        }
    }
}

function restart() {
    location.reload();
}