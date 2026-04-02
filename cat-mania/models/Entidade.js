import { contexto } from "../index.js"

export default class Entidade {
    constructor(posX, posY, altura, largura, velocidade, sprite) {
        this.posX = posX
        this.posY = posY
        this.largura = largura
        this.altura = altura
        this.velocidade = velocidade
        this.sprite = new Image()
        this.sprite.src = sprite
    }

    renderiza() {
        contexto.drawImage(this.sprite, this.posX, this.posY, this.largura, this.altura);

        // pra tirar a hitbox tira da qui pra baixo
        const centroX = this.posX + this.largura / 2;
        const centroY = this.posY + this.altura / 2;
        const raioX = (this.largura / 2) * 0.9;
        const raioY = (this.altura / 2) * 0.9;

        contexto.beginPath();
        contexto.ellipse(centroX, centroY, raioX, raioY, 0, 0, Math.PI * 2);
        contexto.strokeStyle = "red";
        contexto.stroke();
    }

    colideCom(entidade) {
        const centroX = this.posX + this.largura / 2;
        const centroY = this.posY + this.altura / 2;
        const centroXOutro = entidade.posX + entidade.largura / 2;
        const centroYOutro = entidade.posY + entidade.altura / 2;
        
        const dx = centroX - centroXOutro;
        const dy = centroY - centroYOutro;
        const rx = (this.largura + entidade.largura) / 2 * 0.9;
        const ry = (this.altura + entidade.altura) / 2 * 0.9;
        
        // verifica se a soma dos raios é menor que a distancia entre as entidades (paint)
        //delta = d ; r = raio
        return (dx / rx) ** 2 + (dy / ry) ** 2 <= 1;
    }
}