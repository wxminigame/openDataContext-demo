import Sprite from './sprite';
import GraphicAction from './graphicAction';

export default class Stage extends Sprite {
    constructor(canvas) {
        super();
        this.canvas = canvas;
        this.width = canvas.width;
        this.height = canvas.height;
        this.ctx = canvas.getContext('2d');
        this.loop();
    }
    update() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.childUpdate(this.ctx);
        return this;
    }
    loop() {
        this.update();
        this.aniId = requestAnimationFrame(this.loop.bind(this))
    }
    stop() {
        cancelAnimationFrame(this.aniId);
    }
}