import { canvas } from '../index.js';
import Entidade from './Entidade.js';

export default class Rato extends Entidade {
	pontos = Number((100 + Math.random() * 100).toFixed(0));
	vivo = true;
	podeResetar = true;
	mata() {
		this.vivo = false;
		this.posX = -this.largura;
	}
	reseta() {
		if (!this.podeResetar) return;
		this.posX = canvas.width;
		this.posY = -this.altura / 2 + Math.random() * (canvas.height - this.altura / 2 - 1 - -this.altura / 2);
	}
	atualiza() {
		if (!this.vivo) return;
		this.posX -= this.velocidade;
	}
}
