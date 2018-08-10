import Node from './node';
import GraphicAction from './graphicAction';

export default class Sprite extends Node {
    constructor() {
        super();
        this.actions = [];
    }
    update(ctx) {
        if (!ctx) return;
        ctx.save();
        this.transform(ctx);
        this.updateGraphic(ctx);
        this.childUpdate(ctx);
        ctx.restore();
    }
    updateGraphic(ctx) {
        let _len = this.actions.length;
        for (let i = 0; i < _len; i++) {
            this.actions[i].update(ctx);
        }
    }
    clearAction(){
        this.actions = [];
    }
    clipRect(x, y, clipWidth, height) {
        this.actions.push(new GraphicAction.clipRect(x, y, clipWidth, height));
    }
    transform(ctx) {
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation * Math.PI / 180);
        ctx.scale(this.scaleX, this.scaleY);
    }
    childUpdate(ctx) {
        var _len = this.children.length;
        for (var i = 0; i < _len; i++) {
            var _child = this.children[i];
            _child.update(ctx);
        }
    }
}