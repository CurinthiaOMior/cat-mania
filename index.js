export const canvas = document.getElementById('canvas')
export const contexto = canvas.getContext('2d')
import Cachorro from "./models/Cachorro.js"
import Petisco from "./models/Petisco.js"
import Gato from "./models/Gato.js"
import Rato from "./models/Rato.js"

// --- sons ---
const sons = {
    colisaoCachorro: new Audio(), // Dano
    coletaRato: new Audio(),      // Pontos
    coletaPetisco: new Audio(),   // Vida
};

sons.colisaoCachorro.src = "./sonsJogo/latidoCahorro.mp3";
sons.coletaRato.src = "./sonsJogo/rato.mp3";
sons.coletaPetisco.src = "./sonsJogo/petisco.mp3";

function tocarSom(som) {
    if (som.src && som.src !== window.location.href) {
        som.currentTime = 0;
        som.play().catch(e => console.log("Aguardando interação para áudio"));
    }
}

// background
let background = new Image()
background.src = "./img/background/fase1.JPG"
let estadoJogo = 'menu'
let frameAtual = 0, frameAnimacao = 0

// Entidades
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
    new Gato(POS_X_GATO2, POS_Y_GATO2, LARGURA_GATO2, ALTURA_GATO2, VELOCIDADE_GATO2, './img/gato2/gato1.png')
]

const LARGURA_MIN_CACHORRO = 75; const LARGURA_MAX_CACHORRO = 125; const PROPORCAO_CACHORRO = 1.25;
const LARGURA_MIN_RATO = 30; const LARGURA_MAX_RATO = 45; const PROPORCAO_RATO = 1.25;
const LARGURA_MIN_PETISCO = 30; const LARGURA_MAX_PETISCO = 45; const PROPORCAO_PETISCO = 1.25;

let cachorros = [], ratos = [], petiscos = []
let cachorros1 = [], cachorros2 = [], cachorros3 = []
let ratos1 = [], ratos2 = [], ratos3 = []
let petiscos1 = [], petiscos2 = [], petiscos3 = []

// VARIÁVEIS DE JOGO
let faseAtual = 0
let pontosConjuntos = 0 

// FASE 1
for (let i = 0; i < 10; i++) {
    let largC = Math.random() * (LARGURA_MAX_CACHORRO - LARGURA_MIN_CACHORRO) + LARGURA_MIN_CACHORRO;
    let velC = Math.random() * (5 - 3) + 3;
    cachorros1.push(new Cachorro(-LARGURA_MAX_CACHORRO - (Math.random() * canvas.width * i), (-largC * PROPORCAO_CACHORRO / 2) + Math.random() * canvas.height, largC, largC * PROPORCAO_CACHORRO, velC, './img/cachorro/cachorro1.png'));

    let largR = Math.random() * (LARGURA_MAX_RATO - LARGURA_MIN_RATO) + LARGURA_MIN_RATO;
    let velR = Math.random() * (6 - 4) + 4;
    ratos1.push(new Rato(canvas.width + (Math.random() * canvas.width * i), (-largR * PROPORCAO_RATO / 2) + Math.random() * canvas.height, largR, largR * PROPORCAO_RATO, velR, './img/rato/rato1.png'));

    let largP = Math.random() * (LARGURA_MAX_PETISCO - LARGURA_MIN_PETISCO) + LARGURA_MIN_PETISCO;
    let velP = Math.random() * (6 - 4) + 4;
    petiscos1.push(new Petisco(canvas.width + (Math.random() * canvas.width * i), (-largP * PROPORCAO_PETISCO / 2) + Math.random() * canvas.height, largP, largP * PROPORCAO_PETISCO, velP, './img/cachorro/cachorro4.png'));
}

// FASE 2
for (let i = 0; i < 12; i++) {
    let largC = Math.random() * (LARGURA_MAX_CACHORRO - LARGURA_MIN_CACHORRO) + LARGURA_MIN_CACHORRO;
    let velC = Math.random() * (7 - 5) + 5;
    cachorros2.push(new Cachorro(-LARGURA_MAX_CACHORRO - (Math.random() * canvas.width * i), (-largC * PROPORCAO_CACHORRO / 2) + Math.random() * canvas.height, largC, largC * PROPORCAO_CACHORRO, velC, './img/cachorro/cachorro1.png'));

    let largR = Math.random() * (LARGURA_MAX_RATO - LARGURA_MIN_RATO) + LARGURA_MIN_RATO;
    let velR = Math.random() * (8 - 6) + 6;
    ratos2.push(new Rato(canvas.width + (Math.random() * canvas.width * i), (-largR * PROPORCAO_RATO / 2) + Math.random() * canvas.height, largR, largR * PROPORCAO_RATO, velR, './img/rato/rato1.png'));

    let largP = Math.random() * (LARGURA_MAX_PETISCO - LARGURA_MIN_PETISCO) + LARGURA_MIN_PETISCO;
    let velP = Math.random() * (8 - 6) + 6;
    petiscos2.push(new Petisco(canvas.width + (Math.random() * canvas.width * i), (-largP * PROPORCAO_PETISCO / 2) + Math.random() * canvas.height, largP, largP * PROPORCAO_PETISCO, velP, './img/cachorro/cachorro4.png'));
}

// FASE 3
for (let i = 0; i < 15; i++) {
    let largC = Math.random() * (LARGURA_MAX_CACHORRO - LARGURA_MIN_CACHORRO) + LARGURA_MIN_CACHORRO;
    let velC = Math.random() * (9 - 7) + 7;
    cachorros3.push(new Cachorro(-LARGURA_MAX_CACHORRO - (Math.random() * canvas.width * i), (-largC * PROPORCAO_CACHORRO / 2) + Math.random() * canvas.height, largC, largC * PROPORCAO_CACHORRO, velC, './img/cachorro/cachorro1.png'));

    let largR = Math.random() * (LARGURA_MAX_RATO - LARGURA_MIN_RATO) + LARGURA_MIN_RATO;
    let velR = Math.random() * (10 - 8) + 8;
    ratos3.push(new Rato(canvas.width + (Math.random() * canvas.width * i), (-largR * PROPORCAO_RATO / 2) + Math.random() * canvas.height, largR, largR * PROPORCAO_RATO, velR, './img/rato/rato1.png'));

    let largP = Math.random() * (LARGURA_MAX_PETISCO - LARGURA_MIN_PETISCO) + LARGURA_MIN_PETISCO;
    let velP = Math.random() * (10 - 8) + 8;
    petiscos3.push(new Petisco(canvas.width + (Math.random() * canvas.width * i), (-largP * PROPORCAO_PETISCO / 2) + Math.random() * canvas.height, largP, largP * PROPORCAO_PETISCO, velP, './img/cachorro/cachorro4.png'));
}

document.addEventListener('keydown', (e) => {
    if (e.key === 's') gatos[0].direcao = 1
    if (e.key === 'w') gatos[0].direcao = -1
    if (e.key === 'ArrowUp') gatos[1].direcao = -1
    if (e.key === 'ArrowDown') gatos[1].direcao = 1

    if (e.key === 'p' && estadoJogo === 'jogando'){
        estadoJogo = 'pause'
    } else if (e.key === 'p' && estadoJogo === 'pause'){
        estadoJogo = 'jogando'
    }

    if (e.key === 'Escape'){
        estadoJogo = 'menu'
    }

    if (e.key === 'Enter') {
        if (estadoJogo === 'menu' || estadoJogo === 'derrota' || estadoJogo === 'vitoria') {
            if(estadoJogo === 'derrota' || estadoJogo === 'vitoria') {
                gatos[0].vida = 3; gatos[1].vida = 3;
                pontosConjuntos = 0; 
                faseAtual = 0;
            }
            estadoJogo = 'jogando'
        }
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key === 's' || e.key === 'w') gatos[0].direcao = 0
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') gatos[1].direcao = 0
});

function checarColisao() {
    gatos.forEach(gato => {
        cachorros.forEach(cachorro => {
            if (gato.colideCom(cachorro)) {
                tocarSom(sons.colisaoCachorro);
                cachorro.mata()
                gato.vida = Math.max(0, gato.vida - 1)
            }
        })
        ratos.forEach(rato => {
            if (gato.colideCom(rato)) {
                tocarSom(sons.coletaRato);
                rato.mata()
                pontosConjuntos += rato.pontos // SOMA NOS PONTOS GLOBAIS
            }
        })
        petiscos.forEach(petisco => {
            if (gato.colideCom(petisco)) {
                tocarSom(sons.coletaPetisco);
                petisco.mata()
                gato.vida = Math.min(7, gato.vida + 1)
            }
        })
    })
}

function atualizarEstadoJogo(){
    if(gatos[1].vida <= 0 && gatos[0].vida <= 0){
        estadoJogo = 'derrota'
    }
   
    // <-- VERIFICA A VITÓRIA BASEADO NOS PONTOS CONJUNTOS
    if(pontosConjuntos >= 3000){
        estadoJogo = 'vitoria'
    }
}

function trocarFase() {
    // <-- TROCA DE FASE BASEADA NOS PONTOS CONJUNTOS
    if (pontosConjuntos < 750 && faseAtual !== 1) {
        faseAtual = 1; background.src = "./img/background/fase1.JPG"
        cachorros = cachorros1; ratos = ratos1; petiscos = petiscos1
    } else if (pontosConjuntos >= 750 && pontosConjuntos < 2000 && faseAtual !== 2) {
        faseAtual = 2; background.src = "./img/background/fase2.JPG"
        cachorros = cachorros2; ratos = ratos2; petiscos = petiscos2
    } else if (pontosConjuntos >= 2000 && faseAtual !== 3) {
        faseAtual = 3; background.src = "./img/background/fase3.png"
        cachorros = cachorros3; ratos = ratos3; petiscos = petiscos3    
    }
}

function resetarEntidades() {
    cachorros.forEach(cachorro => { if (cachorro.posX >= canvas.width + cachorro.largura) cachorro.reseta() })
    ratos.forEach(rato => { if (rato.posX <= -rato.largura) rato.reseta() })
    petiscos.forEach(petisco => { if (petisco.posX <= -petisco.largura) petisco.reseta() })
}

function tratarColisaoGatos() {
    if (gatos[0].colideCom(gatos[1])) {
        let gatoCima = gatos[0].posY < gatos[1].posY ? gatos[0] : gatos[1]
        let gatoBaixo = gatos[0].posY < gatos[1].posY ? gatos[1] : gatos[0]
        if (gatoCima.direcao === 1) gatoCima.direcao = 0;
        if (gatoBaixo.direcao === -1) gatoBaixo.direcao = 0;
    }
}

function checarMorte() { gatos.forEach(gato => { if (gato.vida <= 0) gato.mata() }) }

function desenharOverlayFundo() {
    contexto.fillStyle = 'rgba(0, 0, 0, 0.65)'; contexto.fillRect(0, 0, canvas.width, canvas.height);
}

function desenharTextoPixelArt(texto, tamanho, y, corPrincipal = 'white') {
    contexto.font = `bold ${tamanho}px "Courier New", monospace`; contexto.textAlign = 'center'; contexto.textBaseline = 'middle';
    contexto.fillStyle = 'black'; contexto.fillText(texto, canvas.width / 2 + 3, y + 3);
    contexto.fillStyle = corPrincipal; contexto.fillText(texto, canvas.width / 2, y);
}

function renderizarMenu() {
    if (background.complete) contexto.drawImage(background, 0, 0, canvas.width, canvas.height);
    desenharOverlayFundo();
    desenharTextoPixelArt("CAT SURVIVAL", 60, canvas.height / 2 - 40, '#F6E27F');
    desenharTextoPixelArt("Pressione [ENTER] para Iniciar", 24, canvas.height / 2 + 40, '#FFFFFF');
}

function renderizarPause() {
    if (background.complete) contexto.drawImage(background, 0, 0, canvas.width, canvas.height);
    gatos.forEach(gato => gato.renderiza()); cachorros.forEach(c => c.renderiza()); ratos.forEach(r => r.renderiza()); petiscos.forEach(p => p.renderiza())
    desenharOverlayFundo();
    desenharTextoPixelArt("JOGO PAUSADO", 50, canvas.height / 2 - 20, '#FFFFFF');
}

function renderizarVitoria() {
    if (background.complete) contexto.drawImage(background, 0, 0, canvas.width, canvas.height);
    desenharOverlayFundo();
    desenharTextoPixelArt("VITÓRIA!", 70, canvas.height / 2 - 50, '#55FF55');
}

function renderizarDerrota() {
    if (background.complete) contexto.drawImage(background, 0, 0, canvas.width, canvas.height);
    desenharOverlayFundo();
    desenharTextoPixelArt("GAME OVER", 70, canvas.height / 2 - 30, '#FF5555');
}

function trocaSprite(){
    gatos.forEach((g, index) => {
        let pasta;
        if (index === 0) {
            pasta = "./img/gato";
        } else {
            pasta = "./img/gato2";
        }
        g.sprite.src = `./${pasta}/gato${frameAnimacao}.png`;
    });
   
    cachorros.forEach(c => { c.sprite.src = `./img/cachorro/cachorro${frameAnimacao}.png` })
    petiscos.forEach(p => { p.sprite.src = `./img/petisco/petisco${frameAnimacao}.png` })
    ratos.forEach(r => { r.sprite.src = `./img/rato/rato${frameAnimacao}.png` })
}

function renderizaHud() {
    contexto.font = 'bold 24px "Courier New", monospace'; contexto.textBaseline = 'top';
    let faseDisplay = faseAtual === 0 ? 1 : faseAtual
    contexto.textAlign = 'left'; contexto.fillStyle = 'black'; contexto.fillText(`Fase: ${faseDisplay}`, 22, 22);
    contexto.fillStyle = '#F6E27F'; contexto.fillText(`Fase: ${faseDisplay}`, 20, 20);
   
    // <-- ATUALIZA O HUD PARA MOSTRAR OS PONTOS 
    contexto.textAlign = 'right';
    contexto.fillStyle = 'black'; contexto.fillText(`Pontos: ${pontosConjuntos}`, canvas.width - 18, 22);
    contexto.fillStyle = 'white'; contexto.fillText(`Pontos: ${pontosConjuntos}`, canvas.width - 20, 20);
   
    let maxVida = 7; let larguraBarra = 120; let alturaBarra = 20; let centroX = canvas.width / 2;
    contexto.fillStyle = 'rgba(0, 0, 0, 0.7)';
    contexto.fillRect(centroX - larguraBarra - 10, 20, larguraBarra, alturaBarra);
    contexto.fillRect(centroX + 10, 20, larguraBarra, alturaBarra);
   
    contexto.fillStyle = gatos[0].vida > 1 ? '#55FF55' : '#FF5555';
    contexto.fillRect(centroX - larguraBarra - 10, 20, (gatos[0].vida / maxVida) * larguraBarra, alturaBarra);
    contexto.fillStyle = gatos[1].vida > 1 ? '#55FF55' : '#FF5555';
    contexto.fillRect(centroX + 10, 20, (gatos[1].vida / maxVida) * larguraBarra, alturaBarra);
}

function atualiza() {
    if (estadoJogo === 'jogando') {
        tratarColisaoGatos(); gatos.forEach(gato => gato.atualiza())
        cachorros.forEach(c => c.atualiza()); ratos.forEach(r => r.atualiza()); petiscos.forEach(p => p.atualiza())
        checarMorte(); checarColisao(); resetarEntidades(); trocarFase(); atualizarEstadoJogo()
    }
}

function renderiza() {
    contexto.clearRect(0, 0, canvas.width, canvas.height)
    frameAtual++;
    if(frameAtual < 15) frameAnimacao = 1; else if(frameAtual < 30) frameAnimacao = 2; else if(frameAtual < 45) frameAnimacao = 3; else frameAnimacao = 4;
    if(frameAtual >= 60) frameAtual = 0
   
    switch(estadoJogo){
        case 'jogando':
            if (background.complete) { contexto.drawImage(background, 0, 0, canvas.width, canvas.height); renderizaHud(); }
            gatos.forEach(g => g.renderiza()); cachorros.forEach(c => c.renderiza()); ratos.forEach(r => r.renderiza()); petiscos.forEach(p => p.renderiza())
            trocaSprite(); break;
            case 'pause': renderizarPause(); break;
        case 'vitoria': renderizarVitoria(); break;
        case 'derrota': renderizarDerrota(); break;
        case 'menu': renderizarMenu(); break;
    }
}

function main() { atualiza(); renderiza(); requestAnimationFrame(main); }
main();