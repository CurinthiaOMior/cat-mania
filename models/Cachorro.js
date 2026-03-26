//corre da esquerda para a direita
//tira vida do gato

import { canvas } from "../index.js";
import Entidade from "./Entidade.js";

//nasce em ordem aleatoria
export default class Cachorro extends Entidade {
    vivo = true
    podeResetar = true

    mata() {
        this.vivo = false
        this.posX = -this.largura
    }

    // Cachorro.js
    reseta() {
        if (!this.podeResetar) return
        this.posX = -this.largura
        this.posY = (-this.altura / 2) + Math.random() * ((canvas.height - this.altura / 2 - 1) - (-this.altura / 2));
    }

    atualiza() {
        if (!this.vivo) return
        this.posX += this.velocidade
    }
}