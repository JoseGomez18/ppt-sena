// captura de elementos del DOM para las opciones piedra,papel,tijera
const botonPiedra = document.querySelector(".piedra");
const botonPapel = document.querySelector(".papel");
const botonTijera = document.querySelector(".tijera");

const botonReiniciar = document.getElementById("reiniciar")

// captura de los elementos del DOM para el tablero de opciones
// usuario-pc
const manoUsuario = document.querySelector(".mano-usuario");
const manoCompu = document.querySelector(".mano-computadora");

// captura de los puntajes
const puntajeUsuario = document.querySelector(".puntaje-usuario");
const puntajeCompu = document.querySelector(".puntaje-computadora");

const labelResultado = document.querySelector(".resultado");

const tablero = document.querySelector(".tablero")

let eleccionCompu = "";

let contUsuario = 0;
let contCompu = 0;

//alertas
const swalInicio = () =>{
    Swal.fire(
        '¿Jugamos?',
        'Gana el primero que alcance los 3 puntos',
        'question'
    )
}

const swalGanador = ()=>{
    Swal.fire(
        'GANASTE!!',
        '',
        'success'
      )
}

const swalPerdedor = ()=>{
    Swal.fire(
        'PERDISTE!!',
        '',
        'success'
      )
}

swalInicio();

//eventos click
botonReiniciar.addEventListener('click',()=>window.location.reload())

botonPiedra.addEventListener('click',()=>{
    jugar("piedra")
})

botonPapel.addEventListener('click',()=>{
    jugar("papel")
})

botonTijera.addEventListener('click',()=>{
    jugar("tijera")
})

//funciones
const jugar = (user)=>{
    animacion();
    labelResultado.textContent = "..."
    
    setTimeout(()=>{
        manoUsuario.src = `./assets/${user}_user.png`;
        azarPc();
        combate(user,eleccionCompu);
        ganador();
    },1000)
}

const combate = (user,pc)=>{
    if(user == "tijera" && pc == "papel" || user == "piedra" && pc == "tijera" || user == "papel" && pc == "piedra"){
        labelResultado.textContent = "ganaste";
        contUsuario++;
    }else if(user === pc){
        labelResultado.textContent = "empate";
    }else{
        labelResultado.textContent = "perdiste";
        contCompu++;
    }
    //asignacion del puntaje a los elementos p 
    puntajeUsuario.innerHTML = contUsuario;
    puntajeCompu.innerHTML = contCompu;
}

const azarPc = ()=>{
    let aleatorioPc = Math.floor(Math.random()*3)
    if(aleatorioPc == 1){
        eleccionCompu = "piedra";
        manoCompu.src ="./assets/piedra_computadora.png";
    }else if(aleatorioPc == 2){
        eleccionCompu = "papel";
        manoCompu.src = "./assets/papel_computadora.png";
    }else{
        eleccionCompu = "tijera";
        manoCompu.src = "./assets/tijera_computadora.png";
    }
}

const ganador = ()=>{
        if(contUsuario === 3){
            swalGanador();
            desactivarBotones();
        }else if(contCompu ===3){
            swalPerdedor();
            desactivarBotones();
        }
}

const desactivarBotones = ()=>{
    //deshabilita los botones para no poder seguir jugando
    botonPiedra.disabled = true;
    botonPapel.disabled = true;
    botonTijera.disabled = true;
    //pone visible el boton reiniciar, por defecto invisible
    botonReiniciar.style.display = "block";
}

const animacion = ()=>{
  tablero.classList.add("jugando");
  setTimeout(() => {
    tablero.classList.remove("jugando");
  }, 1000); 
}