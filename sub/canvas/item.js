import Sprite           from './sprite';
import GraphicAction    from './graphicAction';
import Bitmap           from './bitmap';
import Text             from './text';
import Graphic          from './graphic';

export default class Item extends Sprite{
    constructor(width, height) {
        super();
        this._bgColor = '';
        this.size(width, height);
        
        this.initHeadImgSprite();
        this.initScoreSprite();
        this.initNickSprite();
        this.initRankIndeSprite();
    }
    set bgColor(value){
        this._bgColor = value;
    }
    get bgColor(){
        return this._bgColor
    }
    addItemColorSprite(){
        let bg = new Graphic();
        bg.drawRect(0, 0, this.width, this.height, 'rgba(0,0,0,0.4)');
        bg.name = 'bg';
        this.addChildAt(bg, 0);
    }
    initHeadImgSprite() {
        this.img = new Bitmap();
        this.img.width = 40;
        this.img.height = 40;
        this.img.x = 60;
        this.img.y = (this.height - this.img.height) / 2;
        this.addChild(this.img);
    }
    initScoreSprite() {
        this.scoreText = new Text();
        // this.scoreText.overflow = Laya.Text.HIDDEN;
        this.scoreText.color = "#5fb8f7";
        this.scoreText.fontSize = 14;
        this.scoreText.x = 280;
        this.scoreText.y = this.height / 2;
        this.scoreText.width = 90;
        this.scoreText.valign = 'middle';
        this.scoreText.align = 'right';
        this.addChild(this.scoreText);
    }
    initNickSprite() {
        this.nickText = new Text();
        // this.nickText.overflow = Laya.Text.HIDDEN;
        this.nickText.color = "#5fb8f7";
        this.nickText.fontSize = 14;
        this.nickText.x = 120;
        this.nickText.valign = 'middle';
        this.nickText.y = this.height / 2;
        this.addChild(this.nickText);
    }
    initRankIndeSprite() {
        this.indexText = new Text();
        // this.indexText.overflow = Laya.Text.HIDDEN;
        this.indexText.fontSize = 28;
        this.indexText.x = 30;
        this.indexText.align = 'center';
        this.indexText.valign = 'middle';
        this.indexText.y = this.height / 2;
        this.addChild(this.indexText);
    }
    setHeadImgSrc(src) {
        this.img.src = src;
    }
    setNick(nick) {
        this.nick.text = nick;
    }
    set dataSource(value){
        this.setData(value);
    }
    setData(data) {
        this.scoreText.text = (data.score || 0) + '';
        this.nickText.text = data.nick + '';
        this.indexText.text = data.rank + '';
        this.img.skin = data.src;
        this.indexText.color = data.rank < 4 ? 'red' : "#fff";
    }
    setScore(score) {
        this.score.text = score;
    }
}