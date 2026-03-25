import { contexto } from "../index.js"

export default class Entidade{
    constructor(posX,posY,altura,largura,velocidade,sprite){
        this.posX = posX
        this.posY = posY
        this.altura = altura
        this.largura = largura
        this.velocidade = velocidade
        this.sprite = new Image()
        this.sprite.src = sprite
    }
    
    renderiza(){
        contexto.drawImage(this.sprite, this.posX, this.posY, this.altura, this.largura)
        console.log(this)
    }

    colisao(entidade){
        if((this.x < entidade.x + entidade.w)&&
        (this.x + this.w > entidade.x)&&
        (this.y < entidade.y + entidade.h)&&
        (this.y + this.h > entidade.y)){
          return true
      }else{
          return false
      }
    }
}

