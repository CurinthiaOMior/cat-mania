// é um gato
// se move no eixo Y
// colide com cachorroes
// perde vida
// pontua
import Entidade from "./Entidade.js";
export default class Gato extends Entidade{

    vida = 0
    pontos = 0
    direcao = 0
    
    atualiza(){

        this.posY += this.direcao * this.velocidade

    }

}