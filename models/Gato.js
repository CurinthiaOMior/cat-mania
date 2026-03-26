// é um gato
// se move no eixo Y
// colide com cachorroes
// perde vida
// pontua
import { canvas } from "../index.js";
import Entidade from "./Entidade.js";
export default class Gato extends Entidade{
    vidaMaxima = 7
    vida = this.vidaMaxima
    pontos = 0
    direcao = 0

    mata(){
        this.vida = 0
        this.posX = canvas.width + this.largura   
    }
    
    atualiza(){
        this.posY += this.direcao * this.velocidade
        if(this.posY < -this.altura / 2){
            this.posY = canvas.height - this.altura / 2
        }
        if(this.posY > canvas.height - this.altura / 2){
            this.posY = -this.altura / 2
        }
    }
}