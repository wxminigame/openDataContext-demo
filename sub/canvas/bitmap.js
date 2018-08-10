import Sprite from './sprite';

const ImageCache = {};

export default class Bitmap extends Sprite {
    constructor() {
        super()
        this.originX = 0;
        this.originY = 0;
        this.image = null;
    }
    update(ctx) {
        if (!ctx) return;
        if (!this.image) return;
        ctx.save();
        this.transform(ctx);
        ctx.drawImage(this.image, -this.width * this.originX, -this.height * this.originY, this.width, this.height);
        this.childUpdate(ctx);
        ctx.restore();
    }
    get skin() {
        return this.src
    }
    set skin(value) {
        this.src = value;
        if (ImageCache[value]) {
            this.image = ImageCache[value];
        } else {
            this.image = wx.createImage();
            this.image.src = value;
            let that = this;
            this.image.onload = function() {
                ImageCache[that.skin] = that.image;
            }
        }
    }
    origin(x, y) {
        switch (arguments.length) {
            case 1:
                this.originX = Math.max(0, Math.min(1, x));
                this.originY = Math.max(0, Math.min(1, x));
                return this;
            case 2:
                this.originX = Math.max(0, Math.min(1, x));
                this.originY = Math.max(0, Math.min(1, y));
                return this;
        }
        return this;
    }
}