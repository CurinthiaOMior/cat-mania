export const canvas = document.getElementById('canvas')
export const contexto = canvas.getContext('2d')
import Cachorro from "./models/Cachorro.js"
import Gato from "./models/Gato.js"

const ALTURA_GATO = 100
const LARGURA_GATO = 50
const POS_X_GATO = canvas.width / 2 - LARGURA_GATO
const POS_Y_GATO = canvas.height / 3 - ALTURA_GATO / 2
const VELOCIDADE_GATO = 5

const ALTURA_GATO2 = 100
const LARGURA_GATO2 = 50
const POS_X_GATO2 = canvas.width / 2 - LARGURA_GATO
const POS_Y_GATO2 = canvas.height / 3 * 2
const VELOCIDADE_GATO2 = 5

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

function resetarCachorros() {
    cachorros.forEach(cachorro => {
        if (cachorro.posX >= canvas.width + cachorro.largura) {
            cachorro.reseta()
        }
    })
}

function checarColisao() {
    gatos.forEach(gato => {
        cachorros.forEach(cachorro => {
            if (gato.colideCom(cachorro)) {
                cachorro.mata()
                gato.vida = Math.max(0, gato.vida - 1) // Math.max retorna o menor numero dos 2
                console.log(gato.vida)
            }
        })
    })
}

function checarMorte() {
    gatos.forEach(gato => {
        if (gato.vida <= 0) {
            gato.mata()
        }
    })
}

function atualiza() {
    gatos.forEach(gato => {
        gato.atualiza()
    })
    cachorros.forEach(cachorro => {
        cachorro.atualiza()
    })
    checarMorte()
    checarColisao()
    resetarCachorros()
}

function renderiza() {
    contexto.clearRect(0, 0, canvas.width, canvas.height)
    gatos.forEach(gato => {
        gato.renderiza()
    })
    cachorros.forEach(cachorro => {
        cachorro.renderiza()
    })
}

function main() {
    atualiza()
    renderiza()
    requestAnimationFrame(main)
}
main()