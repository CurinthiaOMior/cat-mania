export const canvas = document.getElementById('canvas')
export const contexto = canvas.getContext('2d')
import Cachorro from "./models/Cachorro.js"
import Petisco from "./models/Petisco.js"
import Gato from "./models/Gato.js"
import Rato from "./models/Rato.js"

let background = new Image()

const ALTURA_GATO = 100
const LARGURA_GATO = 50
const POS_X_GATO = canvas.width / 2 - LARGURA_GATO
const POS_Y_GATO = canvas.height / 3 - ALTURA_GATO / 2
const VELOCIDADE_GATO = 3

const ALTURA_GATO2 = 100
const LARGURA_GATO2 = 50
const POS_X_GATO2 = canvas.width / 2 - LARGURA_GATO
const POS_Y_GATO2 = canvas.height / 3 * 2
const VELOCIDADE_GATO2 = 3

const gatos = [
    new Gato(POS_X_GATO, POS_Y_GATO, LARGURA_GATO, ALTURA_GATO, VELOCIDADE_GATO, './img/gato/gato1.png'), 
    new Gato(POS_X_GATO2, POS_Y_GATO2, LARGURA_GATO2, ALTURA_GATO2, VELOCIDADE_GATO2, './img/gato/gato1.png')
]

// tamanho e proporção das entidades
const LARGURA_MIN_CACHORRO = 75; const LARGURA_MAX_CACHORRO = 125; const PROPORCAO_CACHORRO = 1.25;
const LARGURA_MIN_RATO = 30; const LARGURA_MAX_RATO = 45; const PROPORCAO_RATO = 1.25;
const LARGURA_MIN_PETISCO = 30; const LARGURA_MAX_PETISCO = 45; const PROPORCAO_PETISCO = 1.25;

// arr's globais 
let cachorros = []
let ratos = []
let petiscos = []

let cachorros1 = []
let cachorros2 = []
let cachorros3 = []
let ratos1 = []
let ratos2 = []
let ratos3 = []
let petiscos1 = []
let petiscos2 = []
let petiscos3 = []
let faseAtual = 0 // inicia com 0 para forçar a troca na primeira execução



// FASE 1
for (let i = 0; i < 10; i++) {
    let largC = Math.random() * (LARGURA_MAX_CACHORRO - LARGURA_MIN_CACHORRO) + LARGURA_MIN_CACHORRO;
    let velC = Math.random() * (5 - 3) + 3; // Velocidade entre 3 e 5
    cachorros1.push(new Cachorro(-LARGURA_MAX_CACHORRO - (Math.random() * canvas.width * i), (-largC * PROPORCAO_CACHORRO / 2) + Math.random() * canvas.height, largC, largC * PROPORCAO_CACHORRO, velC, './img/cachorro/cachorro1.png'));

    let largR = Math.random() * (LARGURA_MAX_RATO - LARGURA_MIN_RATO) + LARGURA_MIN_RATO;
    let velR = Math.random() * (6 - 4) + 4;
    ratos1.push(new Rato(canvas.width + (Math.random() * canvas.width * i), (-largR * PROPORCAO_RATO / 2) + Math.random() * canvas.height, largR, largR * PROPORCAO_RATO, velR, './img/rato/rato1.png'));

    let largP = Math.random() * (LARGURA_MAX_PETISCO - LARGURA_MIN_PETISCO) + LARGURA_MIN_PETISCO;
    let velP = Math.random() * (6 - 4) + 4;
    petiscos1.push(new Petisco(canvas.width + (Math.random() * canvas.width * i), (-largP * PROPORCAO_PETISCO / 2) + Math.random() * canvas.height, largP, largP * PROPORCAO_PETISCO, velP, './img/cachorro/cachorro4.png'));
}

// FASE 2
for (let i = 0; i < 15; i++) {
    let largC = Math.random() * (LARGURA_MAX_CACHORRO - LARGURA_MIN_CACHORRO) + LARGURA_MIN_CACHORRO;
    let velC = Math.random() * (7 - 5) + 5; // Velocidade entre 5 e 7
    cachorros2.push(new Cachorro(-LARGURA_MAX_CACHORRO - (Math.random() * canvas.width * i), (-largC * PROPORCAO_CACHORRO / 2) + Math.random() * canvas.height, largC, largC * PROPORCAO_CACHORRO, velC, './img/cachorro/cachorro1.png'));

    if (i < 12) {
        let largR = Math.random() * (LARGURA_MAX_RATO - LARGURA_MIN_RATO) + LARGURA_MIN_RATO;
        let velR = Math.random() * (7 - 5) + 5;
        ratos2.push(new Rato(canvas.width + (Math.random() * canvas.width * i), (-largR * PROPORCAO_RATO / 2) + Math.random() * canvas.height, largR, largR * PROPORCAO_RATO, velR, './img/rato/rato1.png'));
    }
    if (i < 5) {
        let largP = Math.random() * (LARGURA_MAX_PETISCO - LARGURA_MIN_PETISCO) + LARGURA_MIN_PETISCO;
        let velP = Math.random() * (6 - 4) + 4;
        petiscos2.push(new Petisco(canvas.width + (Math.random() * canvas.width * i), (-largP * PROPORCAO_PETISCO / 2) + Math.random() * canvas.height, largP, largP * PROPORCAO_PETISCO, velP, './img/cachorro/cachorro4.png'));
    }
}

// FASE 3
for (let i = 0; i < 20; i++) {
    let largC = Math.random() * (LARGURA_MAX_CACHORRO - LARGURA_MIN_CACHORRO) + LARGURA_MIN_CACHORRO;
    let velC = Math.random() * (10 - 7) + 7; // Velocidade entre 7 e 10
    cachorros3.push(new Cachorro(-LARGURA_MAX_CACHORRO - (Math.random() * canvas.width * i), (-largC * PROPORCAO_CACHORRO / 2) + Math.random() * canvas.height, largC, largC * PROPORCAO_CACHORRO, velC, './img/cachorro/cachorro1.png'));

    if (i < 15) {
        let largR = Math.random() * (LARGURA_MAX_RATO - LARGURA_MIN_RATO) + LARGURA_MIN_RATO;
        let velR = Math.random() * (8 - 6) + 6;
        ratos3.push(new Rato(canvas.width + (Math.random() * canvas.width * i), (-largR * PROPORCAO_RATO / 2) + Math.random() * canvas.height, largR, largR * PROPORCAO_RATO, velR, './img/rato/rato1.png'));
    }
    if (i < 2) {
        let largP = Math.random() * (LARGURA_MAX_PETISCO - LARGURA_MIN_PETISCO) + LARGURA_MIN_PETISCO;
        let velP = Math.random() * (6 - 4) + 4;
        petiscos3.push(new Petisco(canvas.width + (Math.random() * canvas.width * i), (-largP * PROPORCAO_PETISCO / 2) + Math.random() * canvas.height, largP, largP * PROPORCAO_PETISCO, velP, './img/cachorro/cachorro4.png'));
    }
}
// ---------------------------------------------


document.addEventListener('keydown', (e) => {
    if (e.key === 's') gatos[0].direcao = 1
    if (e.key === 'w') gatos[0].direcao = -1
    if (e.key === 'ArrowUp') gatos[1].direcao = -1
    if (e.key === 'ArrowDown') gatos[1].direcao = 1
});

document.addEventListener('keyup', (e) => {
    if (e.key === 's' || e.key === 'w') gatos[0].direcao = 0
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') gatos[1].direcao = 0
});

function estadoJogo(){
    if(gatos.vida > 0){
        if(
            document.addEventListener('keyup', (e) => {
            (e.key === 'p') 
            })
        ){
            //configurar tela de pause
        }if(gatos.pontos > 1750){
            //configurar tela de final de jogo
        }
    }else{
        //tela de fim de jogo
    }
}

function trocarFase() {
    let pontos = Math.max(gatos[0].pontos, gatos[1].pontos)
    
   
    if (pontos < 500 && faseAtual !== 1) {
        faseAtual = 1
        background.src = "./img/background/fase1.JPG"
        cachorros = cachorros1
        ratos = ratos1
        petiscos = petiscos1
    } else if (pontos >= 500 && pontos < 1000 && faseAtual !== 2) {
        faseAtual = 2
        background.src = "./img/background/fase2.JPG"
        cachorros = cachorros2
        ratos = ratos2
        petiscos = petiscos2
    } else if (pontos >= 1000 && faseAtual !== 3) {
        faseAtual = 3
        background.src = "./img/background/fase3.png" 
        cachorros = cachorros3
        ratos = ratos3
        petiscos = petiscos3    
    }
}

function resetarEntidades() {
    cachorros.forEach(cachorro => {
        if (cachorro.posX >= canvas.width + cachorro.largura) cachorro.reseta()
    })
    ratos.forEach(rato => {
        if (rato.posX <= rato.largura) rato.reseta()
    })
    petiscos.forEach(petisco => {
        if (petisco.posX <= petisco.largura) petisco.reseta()
    })
}

function checarColisao() {
    gatos.forEach(gato => {
        cachorros.forEach(cachorro => {
            if (gato.colideCom(cachorro)) {
                cachorro.mata()
                gato.vida = Math.max(0, gato.vida - 1)
            }
        })
        ratos.forEach(rato => {
            if (gato.colideCom(rato)) {
                rato.mata()
                gato.pontos += rato.pontos
            }
        })
        petiscos.forEach(petisco => {
            if (gato.colideCom(petisco)) {
                petisco.mata()
                gato.vida++
            }
        })
    })
}

function tratarColisaoGatos() {
    if (gatos[0].colideCom(gatos[1])) {
        let gatoCima = gatos[0].posY < gatos[1].posY ? gatos[0] : gatos[1];
        let gatoBaixo = gatos[0].posY < gatos[1].posY ? gatos[1] : gatos[0];

        if (gatoCima.direcao === 1) gatoCima.direcao = 0;
        if (gatoBaixo.direcao === -1) gatoBaixo.direcao = 0;
    }
}

function checarMorte() {
    gatos.forEach(gato => {
        if (gato.vida <= 0) gato.mata()
    })
}

function atualiza() {
    tratarColisaoGatos()
    gatos.forEach(gato => gato.atualiza())
    cachorros.forEach(cachorro => cachorro.atualiza())
    ratos.forEach(rato => rato.atualiza())
    petiscos.forEach(petisco => petisco.atualiza())
    
    checarMorte()
    checarColisao()
    resetarEntidades()
    trocarFase()
}

function renderiza() {
    contexto.clearRect(0, 0, canvas.width, canvas.height)
    
    // Verifica se a imagem carregou antes de renderizar
    if (background.complete) {
        contexto.drawImage(background, 0, 0, 1280, 720)
    }
    
    gatos.forEach(gato => gato.renderiza())
    cachorros.forEach(cachorro => cachorro.renderiza())
    ratos.forEach(rato => rato.renderiza())
    petiscos.forEach(petisco => petisco.renderiza())
}

function main() {
    atualiza()
    renderiza()
    requestAnimationFrame(main)
}

main()