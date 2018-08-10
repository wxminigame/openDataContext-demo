import Sprite from './sprite';
import GraphicAction from './graphicAction';

export default class Graphic extends Sprite {
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
        var _len = this.actions.length;
        for (var i = 0; i < _len; i++) {
            this.actions[i].update(ctx);
        }
    }
    clear() {
        this.actions = [];
    }

    fill(color) {
        this.actions.push(new GraphicAction.fill(color));
    }
    strokeStyle(width, caps, joints, miterLimit, ignoreScale) {
        this.actions.push(new GraphicAction.strokeStyle(width, caps, joints, miterLimit, ignoreScale));
    }
    stroke(style) {
        this.actions.push(new GraphicAction.stroke(style));
    }
    moveTo(x, y) {
        this.actions.push(new GraphicAction.moveTo(x, y));
    }
    lineTo(x, y) {
        this.actions.push(new GraphicAction.lineTo(x, y));
    }
    arcTo(x1, y1, x2, y2, radius) {
        this.actions.push(new GraphicAction.arcTo(x1, y1, x2, y2, radius));
    }
    arc(x, y, radius, startAngle, endAngle, anticlockwise) {
        this.actions.push(new GraphicAction.arc(x, y, radius, startAngle, endAngle, anticlockwise));
    }
    quadraticCurveTo(cpx, cpy, x, y) {
        this.actions.push(new GraphicAction.quadraticCurveTo(cpx, cpy, x, y));
    }
    bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y) {

        this.actions.push(new GraphicAction.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y));
    }
    drawRect(x, y, w, h, fillColor = null, lineColor = null, lineWidth = 1) {
        this.beginPath();
        this.actions.push(new GraphicAction.rect(x, y, w, h));
        this.closePath();
        if(fillColor){
            this.fill('rgba(0,0,0,0.6)');
        }
    }
    closePath() {
        this.actions.push(new GraphicAction.closePath());
    }
    beginPath() {
        this.actions.push(new GraphicAction.beginPath());
    }
    circle(x, y, radius, fillColor = null, lineColor = null, lineWidth = 1) {
        this.beginPath();
        this.actions.push(new GraphicAction.circle(x, y, radius));
        this.closePath();
        if (fillColor) {
            console.error(fillColor)
            this.fill(fillColor);
        }
        if (lineColor) {
            this.stroke(lineColor);
        }
    }
    ellipse(x, y, w, h, fillColor = null, lineColor = null, lineWidth = 1) {
        this.beginPath();
        this.actions.push(new GraphicAction.ellipse(x, y, w, h));
        this.closePath();
        if (fillColor) {
            this.fill(fillColor);
        }
        if (lineColor) {
            this.stroke(lineColor);
        }
    }
}