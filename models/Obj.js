export default class Obj{
    constructor(posX,posY,altura,largura,velocidade,sprite){
        this.posX = posX
        this.posY = posY
        this.altura = altura
        this.largura = largura
        this.velocidade = velocidade
        this.sprite = sprite
    }

    render(){
        let img = new Image()
        img.src = this.a
        canva.drawImage(img, this.x, this.y, this.w, this.h)
    }

    collides(object){
        if((this.x < object.x + object.w)&&
        (this.x + this.w > object.x)&&
        (this.y < object.y + object.h)&&
        (this.y + this.h > object.y)){
          return true
      }else{
          return false
      }
    }
}

