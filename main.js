const botonPiedra = document.querySelector("#piedra");
const botonPapel = document.querySelector("#papel");
const botonTijera = document.querySelector("#tijera");
const movimientoMaquina = document.querySelector("#movimiento-maquina");
const movimientoJugador = document.querySelector("#movimiento-jugador");
const puntajeJugador = document.querySelector("#puntaje-jugador");
const puntajeMaquina = document.querySelector("#puntaje-maquina");
const resultadoRonda = document.querySelector("#resultado-ronda");
const cantidadRondas = document.querySelector("#cantidad-rondas");

let cantidadDeRondas = 0;

let pJugador = 0;
let pMaquina = 0;

let mJugador;
let mMaquina;

let ultimosMovimientos = [];

let piedra = 0;
let papel = 0;
let tijera = 0;

const ejecutarMovimientoMaquina = (jPiedra, jPapel, jTijera) => {
    jPiedra = 0;
    jPapel = 0;
    jTijera = 0;

    let predecirJugador;
    
    if (ultimosMovimientos.length === 0) {
        let movimientoRandom = Math.floor(Math.random() * 3 + 1);
        ultimosMovimientos.push(movimientoRandom);
        }
        for (let i = 0; i < ultimosMovimientos.length; i++) {
            if (ultimosMovimientos.length > 50) {
                ultimosMovimientos.shift();
            }
            if (ultimosMovimientos[i] === 1){
                jPiedra++;
            }
            else if (ultimosMovimientos[i] === 2) {
                jPapel++
            }
            else if (ultimosMovimientos[i] === 3) {
                jTijera++
            }
        }
        
        const redNeuronal = new brain.recurrent.LSTMTimeStep();
        redNeuronal.train([ultimosMovimientos], {iterations: 100});
        predecirJugador = Math.round(redNeuronal.run(ultimosMovimientos));
        mMaquina = 1 <= predecirJugador && predecirJugador <= 3 ? (predecirJugador % 3) + 1 : 1
        console.log(`RONDA: ${cantidadDeRondas + 1} AI Predice que el jugador va a usar: ${predecirJugador} entonces AI usa: ${mMaquina} (1 = Piedra, 2 = Papel, 3 = Tijera, Cualquier otro valor sera un movimiento al azar.)`)

        if (mMaquina === 1) {
            movimientoMaquina.innerText = "Piedra";
        } else if (mMaquina === 2) {
            movimientoMaquina.innerText = "Papel";
        }
        else if (mMaquina === 3) {
            movimientoMaquina.innerText = "Tijera";
        }
        else {
            movimientoRandom = Math.floor(Math.random() * 3 + 1);
            mMaquina = movimientoRandom;
            if (mMaquina === 1) {
                movimientoMaquina.innerText = "Piedra";
            } else if (mMaquina === 2) {
                movimientoMaquina.innerText = "Papel";
            }
            else if (mMaquina === 3) {
                movimientoMaquina.innerText = "Tijera";
            }
        }

    }

const verificarGanador = (movJugador, movMaquina) => {
    if (movJugador === movMaquina) {
        resultadoRonda.innerText = "Empate";
    }
    else if ((movJugador === 1 && movMaquina === 3) || (movJugador === 2 && movMaquina === 1) || (movJugador === 3 && movMaquina == 2)) {
        resultadoRonda.innerText = "Gano Jugador";
        pJugador++;
        return pJugador;
    }
    else {
        resultadoRonda.innerText = "Gano Maquina";
        pMaquina++;
        return pMaquina;
    }
}

botonPiedra.addEventListener('click', (e) => {
    e.preventDefault();
    mJugador = 1;
    ejecutarMovimientoMaquina(piedra, papel, tijera);
    verificarGanador(mJugador, mMaquina,);
    ultimosMovimientos.push(1);
    movimientoJugador.innerText = "Piedra";
    puntajeJugador.innerText = pJugador;
    puntajeMaquina.innerText = pMaquina;
    cantidadDeRondas++
    cantidadRondas.innerText = cantidadDeRondas;
});

botonPapel.addEventListener('click', (e) => {
    e.preventDefault();
    mJugador = 2;
    ejecutarMovimientoMaquina(piedra, papel, tijera);
    verificarGanador(mJugador, mMaquina);
    ultimosMovimientos.push(2);
    movimientoJugador.innerText = "Papel";
    puntajeJugador.innerText = pJugador;
    puntajeMaquina.innerText = pMaquina;
    cantidadDeRondas++
    cantidadRondas.innerText = cantidadDeRondas;
});

botonTijera.addEventListener('click', (e) => {
    e.preventDefault();
    mJugador = 3;
    ejecutarMovimientoMaquina(piedra, papel, tijera);
    verificarGanador(mJugador, mMaquina);
    ultimosMovimientos.push(3);
    movimientoJugador.innerText = "Tijera";
    puntajeJugador.innerText = pJugador;
    puntajeMaquina.innerText = pMaquina;
    cantidadDeRondas++
    cantidadRondas.innerText = cantidadDeRondas;
});

