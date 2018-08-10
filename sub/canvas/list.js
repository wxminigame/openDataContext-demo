import Sprite           from './sprite';
import GraphicAction    from './graphicAction';
import Bitmap           from './bitmap';
import Item             from './item';
import Box              from './box';


const MAX_OFFSET = 50;
export default class ListView extends Sprite {
    constructor(width, height, top) {
        super();
        this.width  = width || 300;
        this.height = height || 500;
        this.top    = top || 100;
        this.render();
    }
    render() {
        let box = new Box(this.width, this.height);
        box.pos((GameGlobal.width - this.width) / 2, this.top);
        this.addChild(box);

        this.list = new List(this.width, this.height);
        box.addChild(this.list);
    }
    set array(value) {
        this.list.array = value;
    }
}
class List extends Sprite {
    constructor(w, h) {
        super();
        this.repeatY = 8;
        this.repeatX = 1;
        this.dataSource = [];
        this.width = w;
        this.height = h;
        this.itemHeight = 60;
        this._startIndex = 0;
        this.cells = [];
        this.scrollY = 0;
        this.bindEvent();
    }
    setContentSize() {
        console.log(this.parent)
        if (this.parent) {
            console.log(this.parent.height)
            this.parent.height = this.itemHeight * this.repeatY;
            console.log(this.parent.height);
            this.parent.resetHeight();
        }
    }
    set bgColor(value) {
        this._bgColor = value;
    }
    get bgColor() {
        return this._bgColor
    }
    set array(value) {
        console.error(value)
        this.dataSource = value;
        this.renderItems();
        this.setContentSize();
    }
    renderItems(cell, index) {
        this.dataSource.forEach((it, index) => {
            if (index > this.repeatY) {
                return;
            }
            let item = new Item(this.width, this.itemHeight);
            item.pos(0, this.itemHeight * index);
            item.dataSource = it;
            if (index % 2) {
                item.addItemColorSprite();
            }
            this.addChild(item);
            this.cells.push(item);
        });
        this.height = this.repeatY * this.itemHeight;
        this.totalHeight = this.dataSource.length * this.itemHeight;
    }
    updateItem(scrollValue) {
        var index = Math.floor(-scrollValue / this.itemHeight);
        var num = 0,
            toIndex;
        if (index > this._startIndex) {
            num = index - this._startIndex;
            var down = true;
            this._startIndex = index;
            toIndex = this._startIndex + this.repeatY;
        } else if (index < this._startIndex) {
            num = this._startIndex - index;
            down = false;
            this._startIndex = index;
            toIndex = this._startIndex;
        }
        if (!num) return;

        var cellIndex = 0;
        for (var i = 0; i < num; i++) {
            if (down) {
                var cell = this.cells.shift();
                this.cells.push(cell);
                cellIndex = this.cells.length;
            } else {
                cell = this.cells.pop();
                this.cells.unshift(cell);
            }
            var pos = (toIndex - i) * this.itemHeight;
            cell.y = pos;
        }
        this.cells.forEach((it, i) => {
            this.updateItemData(this.dataSource[i + index], i);
        });
    }
    updateItemData(cell, cellIndex) {
        this.cells[cellIndex].dataSource = cell;
    }
    canDragable(x, y) {
        // 列表之外不能拖动
        if (this.parent) {
            if (x < this.parent.x || x > this.parent.x + this.width ||
                y < this.parent.y || y > this.parent.y + this.height) {
                return false
            }
        }
        return true
    }
    bindEvent() {
        let startX, startY, depY;
        let that = this,
            startTop = 0,
            endTop  = 0,
            startTime = 0,
            endTime = 0;

        let frameid = null;

        wx.onTouchStart(function(e) {
            cancelAnimationFrame(frameid);
            if (!e.changedTouches.length) {
                return
            }
            let point = e.changedTouches[0];
            startX = point.clientX;
            startY = point.clientY;
            if (!that.canDragable(startX, startY)) {
                return;
            }
            startTop = point.clientY;
            startTime = new Date().getTime();
        });

        wx.onTouchMove(function(e) {
            cancelAnimationFrame(frameid);
            if (e.changedTouches.length) {
                let point = e.changedTouches[0];
                if (!that.canDragable(point.clientX, point.clientY)) {
                    return;
                }
                depY = point.clientY - startY;
                if (depY < 0 && -that.y > that.totalHeight - that.height + MAX_OFFSET) {
                    return;
                }
                if (depY > 0 && that.y - MAX_OFFSET > 0) {
                    return;
                }
                if (that.y < 0 && that.y > that.height - that.totalHeight) {
                    that.scrollY += depY;
                    that.updateItem(that.y);
                }
                startY = point.clientY;
                that.y += depY;
            }
        });

        var f = 0;
        let start = 0,
            begin = 0,
            distance = 0,
            during = 40,
            speed;

        wx.onTouchEnd(function(e) {
            cancelAnimationFrame(frameid);
            if (!e.changedTouches.length) {
                return
            }
            endTime = new Date().getTime();
            endTop = e.changedTouches[0].clientY;

            /*if (!that.canDragable(e.changedTouches[0].clientX, endTop)) {
                console.error('超出区域');
                tween();
                return;
            }*/

            depY = endTop - startY;
            startY = endTop;

            start = 0;
            begin = that.y;

            if (depY <= 0 && -that.y > that.totalHeight - that.height) {
                // bottom
                distance = that.height - that.totalHeight - that.y;
            } else if (depY >= 0 && that.y > 0) {
                // top
                distance = -that.y;
            } else {
                // 惯性运动
                speed = (endTop - startTop) / (endTime - startTime);
                distance = speed * 200;
                if (endTop - startTop > 0 && begin + distance > 0) {
                    distance = -begin;
                } else if (endTop - startTop < 0 && (begin + distance) < (that.height - that.totalHeight)) {
                    distance = that.height - that.totalHeight - that.y;
                }
            }

            if (that.y < 0 && that.y > that.height - that.totalHeight) {
                that.scrollY += depY;
                that.updateItem(that.y);
            }
            tween();
            startTop = endTop;
        });

        wx.onTouchCancel(function(e) {
            console.error('onTouchCancel')
        });

        function tween() {
            var left = that.cubicEaseOut(start, begin, distance, during);
            that.y = left;
            start++;
            if (that.y < 0 && that.y > that.height - that.totalHeight) {
                that.scrollY += depY;
                that.updateItem(that.y);
            }
            if (start <= during) {
                frameid = requestAnimationFrame(tween);
            } else {
                cancelAnimationFrame(frameid);
            }
        }
    }
    cubicEaseOut(t, b, c, d) {
        return c * ((t = t / d - 1) * t * t + 1) + b;
    }
}