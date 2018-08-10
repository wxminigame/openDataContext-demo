const STROKE_CAPS_MAP = ["butt", "round", "square"];
const STROKE_JOINTS_MAP = ["miter", "round", "bevel"];
const TEXT_ALIGN_MAP = ["center", "end", "left", "right", "start"];
const TEXT_BASELINE_MAP = ["alphabetic", "top", "hanging", "middle", "ideographic", "bottom"];

const Graphics = {};

module.exports = Graphics;

(Graphics.fill = function(style) {
    this.style = style;
}).prototype.update = function(ctx) {
    ctx.fillStyle = this.style;
    ctx.fill();
};

(Graphics.clipRect = function(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}).prototype.update = function(ctx) {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.clip();
};

(Graphics.strokeStyle = function(width, caps, joints, miterLimit, ignoreScale) {
    this.width = width;
    this.caps = caps;
    this.joints = joints;
    this.miterLimit = miterLimit;
    this.ignoreScale = ignoreScale;
}).prototype.update = function(ctx) {
    ctx.lineWidth = (this.width == null ? "1" : this.width);
    ctx.lineCap = (this.caps == null ? "butt" : (isNaN(this.caps) ? this.caps : STROKE_CAPS_MAP[this.caps]));
    ctx.lineJoin = (this.joints == null ? "miter" : (isNaN(this.joints) ? this.joints : STROKE_JOINTS_MAP[this.joints]));
    ctx.miterLimit = (this.miterLimit == null ? "10" : this.miterLimit);
    ctx.ignoreScale = (this.ignoreScale == null ? false : this.ignoreScale);
};

(Graphics.stroke = function(style) {
    this.style = style;
}).prototype.update = function(ctx) {
    ctx.strokeStyle = this.style;
    ctx.stroke();
};

(Graphics.moveTo = function(x, y) {
    this.x = x;
    this.y = y;
}).prototype.update = function(ctx) {
    ctx.moveTo(this.x, this.y);
};

(Graphics.lineTo = function(x, y) {
    this.x = x;
    this.y = y;
}).prototype.update = function(ctx) {
    ctx.lineTo(this.x, this.y);
};

(Graphics.arcTo = function(x1, y1, x2, y2, radius) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.radius = radius;
}).prototype.update = function(ctx) {
    ctx.arcTo(this.x1, this.y1, this.x2, this.y2, this.radius);
};

(Graphics.arc = function(x, y, radius, startAngle, endAngle, anticlockwise) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.startAngle = startAngle;
    this.endAngle = endAngle;
    this.anticlockwise = !!anticlockwise;
}).prototype.update = function(ctx) {
    ctx.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle, this.anticlockwise);
};

(Graphics.quadraticCurveTo = function(cpx, cpy, x, y) {
    this.cpx = cpx;
    this.cpy = cpy;
    this.x = x;
    this.y = y;
}).prototype.update = function(ctx) {
    ctx.quadraticCurveTo(this.cpx, this.cpy, this.x, this.y);
};

(Graphics.bezierCurveTo = function(cp1x, cp1y, cp2x, cp2y, x, y) {
    this.cp1x = cp1x;
    this.cp1y = cp1y;
    this.cp2x = cp2x;
    this.cp2y = cp2y;
    this.x = x;
    this.y = y;
}).prototype.update = function(ctx) {
    ctx.bezierCurveTo(this.cp1x, this.cp1y, this.cp2x, this.cp2y, this.x, this.y);
};

(Graphics.rect = function(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
}).prototype.update = function(ctx) {
    ctx.rect(this.x, this.y, this.w, this.h);
};

(Graphics.closePath = function() {}).prototype.update = function(ctx) {
    ctx.closePath();
};

(Graphics.beginPath = function() {}).prototype.update = function(ctx) {
    ctx.beginPath();
};

(Graphics.circle = function(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
}).prototype.update = function(ctx) {
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
};

(Graphics.ellipse = function(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
}).prototype.update = function(ctx) {
    var x = this.x,
        y = this.y;
    var w = this.w,
        h = this.h;

    var k = 0.5522848;
    var ox = (w / 2) * k;
    var oy = (h / 2) * k;
    var xe = x + w;
    var ye = y + h;
    var xm = x + w / 2;
    var ym = y + h / 2;

    ctx.moveTo(x, ym);
    ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
    ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
    ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
    ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
};

//--text
(Graphics.fontStyle = function(font, textAlign, textBaseline) {
    this.font = font;
    this.textAlign = textAlign;
    this.textBaseline = textBaseline;
}).prototype.update = function(ctx) {
    ctx.font = (this.font == null ? "14px serif" : this.font);
    ctx.textAlign = (this.textAlign == null ? "start" : (isNaN(this.textAlign) ? this.textAlign : TEXT_ALIGN_MAP[this.textAlign]));
    ctx.textBaseline = (this.textBaseline == null ? "alphabetic" : (isNaN(this.textBaseline) ? this.textBaseline : TEXT_BASELINE_MAP[this.textBaseline]));
};

(Graphics.fillText = function(text, x, y, maxWidth) {
    this.text = text;
    this.x = x;
    this.y = y;
    this.maxWidth = maxWidth;
}).prototype.update = function(ctx) {
    if (this.maxWidth) {
        ctx.fillText(this.text, this.x, this.y, this.maxWidth);
    } else {
        ctx.fillText(this.text, this.x, this.y);
    }

};

(Graphics.strokeText = function(text, x, y, maxWidth) {
    this.text = text;
    this.x = x;
    this.y = y;
    this.maxWidth = maxWidth;
}).prototype.update = function(ctx) {
    // android ,如果maxWidth值没有，那么就不用传，不然报错expected number
    if (this.maxWidth) {
        ctx.strokeText(this.text, this.x, this.y, this.maxWidth);
    } else {
        ctx.strokeText(this.text, this.x, this.y)
    }

};