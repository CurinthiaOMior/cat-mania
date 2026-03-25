export const canvas = document.getElementById('canvas')
export const contexto = canvas.getContext('2d')
import Gato from "./models/Gato.js"

const POS_X_GATO = canvas.width / 2
const POS_Y_GATO = canvas.height / 3
const ALTURA_GATO = 100
const LARGURA_GATO = 50
const VELOCIDADE_GATO = 1

const POS_X_GATO2 = (canvas.width / 2)
const POS_Y_GATO2 = ((canvas.height / 3) * 2)
const ALTURA_GATO2 = 100
const LARGURA_GATO2 = 50
const VELOCIDADE_GATO2 = 3

let gato1 = new Gato(POS_X_GATO, POS_Y_GATO,  ALTURA_GATO, LARGURA_GATO, VELOCIDADE_GATO, './img/gato/gato1.png')
let gato2 = new Gato(POS_X_GATO2, POS_Y_GATO2,  ALTURA_GATO2, LARGURA_GATO2, VELOCIDADE_GATO2, './img/gato/gato1.png')

document.addEventListener('keydown', (e) =>{
if(e.key === 's'){
    gato1.direcao = 1  
}
else if(e.key === 'w'){
    gato1.direcao = -1
}
if(e.key === 'ArrowUp'){
    gato2.direcao = -1
}
else if(e.key === 'ArrowDown'){
    gato2.direcao = 1
}
});

document.addEventListener('keyup', (e) =>{
    gato1.direcao = 0
});

function atualiza(){
    gato1.atualiza()
    gato2.atualiza()
}

function renderiza(){
    contexto.clearRect(0,0,canvas.width, canvas.height)
    gato1.renderiza()
    gato2.renderiza()
}


function main(){
    atualiza()
    renderiza()
    requestAnimationFrame(main)
}
main()