import Sprite from './sprite';
import GraphicAction from './graphicAction';
import Graphic from './graphic';

const _canvas = wx.createCanvas();
const commonCtx = _canvas.getContext('2d');

export default class Text extends Sprite {
    constructor() {
        super();
        this.actions = [];
        this._text = '';
        this._color = '#000';
        this._fontSize = 14;
        this._fontFamily = 'Microsoft YaHei';
        this._fontStyle = 'normal'; // normal italic
        this._fontWeight = 'normal'; // normal bold
        this._align = 'left';
        this._valign = 'top';
        this._bgColor = '';
        this._containerWidth = 0;
        this._containerHeight = 0;
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
    clear() {
        this.actions = [];
    }
    fontStyle() {
        let font = this.getFontTxt();
        this.actions.push(new GraphicAction.fontStyle(font, this._align, this._valign));
    }
    getFontTxt() {
        // italic small-caps bold 12px arial
        return [this._fontStyle, this._fontWeight, this._fontSize + 'px', this._fontFamily].join(' ')
    }
    fill(color) {
        this.actions.push(new GraphicAction.fill(color || this._color));
    }
    beginPath() {
        this.actions.push(new GraphicAction.beginPath());
    }
    fillText() {
        this.actions.push(new GraphicAction.fillText(this._text, 0, 0));
    }
    strokeText(text, x, y, maxWidth) {
        this.actions.push(new GraphicAction.strokeText(text, x, y, maxWidth));
    }
    redrawTextAction() {
        this.clear();
        if (this._bgColor) {
            this.beginPath();
            this.actions.push(new GraphicAction.rect(0, 0, this._containerWidth, this._containerHeight));
            this.fill(this._bgColor);
        }
        this.beginPath();
        this.fill();
        this.fontStyle();
        this.fillText();
    }
    get text() {
        return this._text;
    }
    set text(value) {
        this._text = value;
        this.width = commonCtx.measureText(value).width;
        this.redrawTextAction();
    }
    get color() {
        return this._color;
    }
    set color(value) {
        this._color = value;
        this.redrawTextAction();
    }
    get fontSize() {
        return this._fontSize;
    }
    set fontSize(value) {
        this._fontSize = value;
        this.redrawTextAction();
    }
    set italic(value) {
        this._fontStyle = value ? 'italic' : 'normal';
        this.redrawTextAction();
    }
    get italic() {
        return this._fontStyle === 'italic';
    }
    set bold(value) {
        this._fontWeight = value ? 'bold' : 'normal';
        this.redrawTextAction();
    }
    get bold() {
        return this._fontWeight === 'bold';
    }
    set fontFamily(value) {
        this._fontFamily = value;
        this.redrawTextAction();
    }
    get fontFamily() {
        return this._fontFamily
    }
    set align(value) {
        this._align = value;
        this.redrawTextAction();
    }
    get align() {
        return this._align
    }
    set valign(value) {
        this._valign = value;
        this.redrawTextAction();
    }
    get valign() {
        return this._valign
    }
    set bgColor(value) {
        this._bgColor = value;
        this.redrawTextAction();
    }
    get bgColor() {
        return this._bgColor
    }
    set width(value) {
        this._containerWidth = value;
        this.redrawTextAction();
    }
    get width() {
        return this._containerWidth
    }
    set height(value) {
        this._containerHeight = value;
        this.redrawTextAction();
    }
    get height() {
        return this._containerHeight
    }
}