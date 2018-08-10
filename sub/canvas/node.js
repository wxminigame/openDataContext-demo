export default class Node {
    constructor() {
        this.initialize();
    }
    initialize() {
        this.x = 0;
        this.y = 0;
        this.rotation = 0;
        this.scaleX = 1;
        this.scaleY = 1;
        this.width = 0;
        this.height = 0;
        this.children = [];
    }
    pos(x, y) {
        switch (arguments.length) {
            case 1:
                this.x = x;
                this.y = x;
                return this;
            case 2:
                this.x = x;
                this.y = y;
                return this;
        }
        return this;
    }
    move(x, y) {
        switch (arguments.length) {
            case 1:
                this.x += x;
                this.y += x;
                return this;
            case 2:
                this.x += x;
                this.y += y;
                return this;
        }
        return this;
    }
    rotate(x) {
        switch (arguments.length) {
            case 1:
                this.rotation += x;
                return this;
        }
        return this;
    }
    scale(x, y) {
        switch (arguments.length) {
            case 1:
                this.scaleX = x;
                this.scaleY = x;
                return this;
            case 2:
                this.scaleX = x;
                this.scaleY = y;
                return this;
        }
        return this;
    }

    size(x, y) {
        switch (arguments.length) {
            case 1:
                this.width = x;
                this.height = x;
                return this;
            case 2:
                this.width = x;
                this.height = y;
                return this;
        }
        return this;
    }


    destroy() {
        for (var i = this.children.length - 1; i >= 0; i--) {
            this.children[i].destroy();
        }
        this.children = [];
    }
    addChild(view) {
        if (view.parent)
            view.parent.removeChild(view);

        var _len = this.children.length;
        view.parent = this;
        view.index = _len;
        this.children[_len] = view;

        return this;
    }
    getChildByName(name){
        var _len = this.children.length;
        for (var i = _len - 1; i >= 0; i--) {
            if(this.children[i].name == name){
                return this.children[i];
            }
        }
    }
    addChildAt(view, index) {
        if (view.parent)
            view.parent.removeChild(view);

        var _len = this.children.length;
        var _index = Math.max(0, Math.min(_len - 1, index));
        this.children.splice(_index, 0, view);
        view.parent = this;

        for (var i = _len - 1; i >= 0; i--) {
            this.children[i].index = i;
        }

        return this;
    }
    removeChild(view) {
        if (view.parent !== this) return;

        this.children.splice(view.index, 1);
        view.parent = null;
        view.index = null;

        var _len = this.children.length;
        for (var i = _len - 1; i >= 0; i--) {
            this.children[i].index = i;
        }

        return this;
    }
}