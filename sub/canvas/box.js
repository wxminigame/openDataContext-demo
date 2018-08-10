import Sprite from './sprite';
import Graphic from './graphic';
export default class Box extends Sprite{
    constructor(width, height){
        super();
        this.width = width;
        this.height = height;
    }
    renderBg() {
        let bg = new Graphic();
        bg.drawRect(0, 0, this.width, this.height, 'rgba(0,0,0,0.4)');
        this.addChildAt(bg, 0);
    }
    resetHeight(){
        this.clearAction();
        this.renderBg();
        this.clipRect(0, 0, this.width, this.height);
    }
}