export const canvas = document.getElementById('canvas')
export const contexto = canvas.getContext('2d')
import Cachorro from "./models/Cachorro.js"
import Petisco from "./models/Petisco.js"
import Gato from "./models/Gato.js"
import Rato from "./models/Rato.js"

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

const gatos = [new Gato(POS_X_GATO, POS_Y_GATO, LARGURA_GATO, ALTURA_GATO, VELOCIDADE_GATO, './img/gato/gato1.png'), new Gato(POS_X_GATO2, POS_Y_GATO2, LARGURA_GATO2, ALTURA_GATO2, VELOCIDADE_GATO2, './img/gato/gato1.png')]

const LARGURA_MIN_CACHORRO = 75
const LARGURA_MAX_CACHORRO = 125
const VELOCIDADE_MIN_CACHORRO = 5
const VELOCIDADE_MAX_CACHORRO = 6
const PROPORCAO_CACHORRO = 1.25

const QUANTIDADE_CACHORROS = 10

const cachorros = []
for (let i = 0; i < QUANTIDADE_CACHORROS; i++) {
    const LARGURA_CACHORRO = Math.random() * (LARGURA_MAX_CACHORRO - LARGURA_MIN_CACHORRO) + LARGURA_MIN_CACHORRO;
    const ALTURA_CACHORRO = LARGURA_CACHORRO * PROPORCAO_CACHORRO;
    const POS_X_CACHORRO = -LARGURA_MAX_CACHORRO - (Math.random() * canvas.width * i)
    const POS_Y_CACHORRO = (-ALTURA_CACHORRO / 2) + Math.random() * ((canvas.height - ALTURA_CACHORRO / 2 - 1) - (-ALTURA_CACHORRO / 2));
    const VELOCIDADE_CACHORRO = Math.random() * (VELOCIDADE_MAX_CACHORRO - VELOCIDADE_MIN_CACHORRO) + VELOCIDADE_MIN_CACHORRO;
    cachorros.push(new Cachorro(POS_X_CACHORRO, POS_Y_CACHORRO, LARGURA_CACHORRO, ALTURA_CACHORRO, VELOCIDADE_CACHORRO, './img/cachorro/cachorro1.png'))
}


const LARGURA_MIN_RATO = 30
const LARGURA_MAX_RATO = 45
const VELOCIDADE_MIN_RATO = 5
const VELOCIDADE_MAX_RATO = 6
const PROPORCAO_RATO = 1.25

const QUANTIDADE_RATOS = 10

const ratos = []
for (let i = 0; i < QUANTIDADE_RATOS; i++) {
    const LARGURA_RATO = Math.random() * (LARGURA_MAX_RATO - LARGURA_MIN_RATO) + LARGURA_MIN_RATO;
    const ALTURA_RATO = LARGURA_RATO * PROPORCAO_RATO;
    const POS_X_RATO = canvas.width +  (Math.random() * canvas.width * i)
    const POS_Y_RATO = (-ALTURA_RATO / 2) + Math.random() * ((canvas.height - ALTURA_RATO / 2 - 1) - (-ALTURA_RATO / 2));
    const VELOCIDADE_RATO = Math.random() * (VELOCIDADE_MAX_RATO - VELOCIDADE_MIN_RATO) + VELOCIDADE_MIN_RATO;
    ratos.push(new Rato(POS_X_RATO, POS_Y_RATO, LARGURA_RATO, ALTURA_RATO, VELOCIDADE_RATO, './img/rato/rato1.png'))
}

//
const LARGURA_MIN_PETISCO = 30
const LARGURA_MAX_PETISCO = 45
const VELOCIDADE_MIN_PETISCO = 5
const VELOCIDADE_MAX_PETISCO = 6
const PROPORCAO_PETISCO = 1.25

const QUANTIDADE_PETISCOS = 10

const petiscos = []
for (let i = 0; i < QUANTIDADE_PETISCOS; i++) {
    const LARGURA_PETISCO = Math.random() * (LARGURA_MAX_PETISCO - LARGURA_MIN_PETISCO) + LARGURA_MIN_PETISCO;
    const ALTURA_PETISCO = LARGURA_PETISCO * PROPORCAO_PETISCO;
    const POS_X_PETISCO = canvas.width +  (Math.random() * canvas.width * i)
    const POS_Y_PETISCO = (-ALTURA_PETISCO / 2) + Math.random() * ((canvas.height - ALTURA_PETISCO / 2 - 1) - (-ALTURA_PETISCO / 2));
    const VELOCIDADE_PETISCO = Math.random() * (VELOCIDADE_MAX_PETISCO - VELOCIDADE_MIN_PETISCO) + VELOCIDADE_MIN_PETISCO;
    petiscos.push(new Petisco(POS_X_PETISCO, POS_Y_PETISCO, LARGURA_PETISCO, ALTURA_PETISCO, VELOCIDADE_PETISCO, './img/gato/gato copy 2.png'))
}
//

document.addEventListener('keydown', (e) => {
    if (e.key === 's') {
        gatos[0].direcao = 1
    }
    if (e.key === 'w') {
        gatos[0].direcao = -1
    }
    if (e.key === 'ArrowUp') {
        gatos[1].direcao = -1
    }
    if (e.key === 'ArrowDown') {
        gatos[1].direcao = 1
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key === 's' || e.key === 'w') {
        gatos[0].direcao = 0
    }
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        gatos[1].direcao = 0
    }
});

function resetarEntidades() {
    cachorros.forEach(cachorro => {
        if (cachorro.posX >= canvas.width + cachorro.largura) {
            cachorro.reseta()
        }
    })
    ratos.forEach(rato =>{
        if (rato.posX <= rato.largura){
            rato.reseta()
        }
    })
    petiscos.forEach(petisco =>{
        if (petisco.posX <= petisco.largura){
            petisco.reseta()
        }
    })
    

}

function checarColisao() {
    gatos.forEach(gato => {
        cachorros.forEach(cachorro => {
            if (gato.colideCom(cachorro)) {
                cachorro.mata()
                gato.vida = Math.max(0, gato.vida - 1) // Math.max retorna o menor numero dos 2
            }
        })
        ratos.forEach(rato => {
            if (gato.colideCom(rato)) {
                rato.mata()
                gato.pontos += rato.pontos //aumenta os pontos do gato
            }
        })
        petiscos.forEach(petisco => {
            if (gato.colideCom(petisco)) {
                petisco.mata()
                gato.vida++ // da vida pro gato
            }
        })
    })
}

function tratarColisaoGatos() {
    if (gatos[0].colideCom(gatos[1])) {
        
        let gatoCima;
        let gatoBaixo;

        // Descobre qual gato está mais acima na tela
        if (gatos[0].posY < gatos[1].posY) {
            gatoCima = gatos[0];
            gatoBaixo = gatos[1];
        } else {
            gatoCima = gatos[1];
            gatoBaixo = gatos[0];
        }

        // Se o gato de cima tentar descer ele é forçado a parar
        if (gatoCima.direcao === 1) {
            gatoCima.direcao = 0;
        }

        // Se o gato de baixo tentar subir ele é forçado a parar
        if (gatoBaixo.direcao === -1) {
            gatoBaixo.direcao = 0;
        }
    }
}

function checarMorte() {
    gatos.forEach(gato => {
        if (gato.vida <= 0) {
            gato.mata()
        }
    })
}

function atualiza() {
    tratarColisaoGatos()
    gatos.forEach(gato => {
        gato.atualiza()
    })
    cachorros.forEach(cachorro => {
        cachorro.atualiza()
    })
    ratos.forEach(rato =>{
        rato.atualiza()
    })
    petiscos.forEach(petisco =>{
        petisco.atualiza()
    })
    checarMorte()
    checarColisao()
    resetarEntidades()
}

function renderiza() {
    contexto.clearRect(0, 0, canvas.width, canvas.height)
    gatos.forEach(gato => {
        gato.renderiza()
    })
    cachorros.forEach(cachorro => {
        cachorro.renderiza()
    })
    ratos.forEach(rato => {
        rato.renderiza()
    })
    petiscos.forEach(petisco => {
        petisco.renderiza()
    })

}

function main() {
    atualiza()
    renderiza()
    requestAnimationFrame(main)
}
main()