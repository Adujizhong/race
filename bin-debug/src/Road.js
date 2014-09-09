/**
* Created by dujizhong on 2014/9/2.
*/
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Road = (function (_super) {
    __extends(Road, _super);
    function Road() {
        _super.call(this);
        this.mLineInterval = 0;
        this.mSpeed = 0;
        this.mState = 1;
        this.init();
    }
    Road.prototype.init = function () {
        this.mLines = new Array();
        this.initLine();
    };

    Road.prototype.initLine = function () {
        var curY = 0;
        while (curY < Util.stage_height) {
            var line = Util.createBitmapByName("road");
            this.addChild(line);
            line.width = Util.stage_width;
            line.height = Util.stage_height;
            line.x = Util.stage_width / 2 - line.width / 2;
            line.y = curY;
            this.mLines.push(line);
            curY += line.height + this.mLineInterval;
        }
    };

    Road.prototype.run = function () {
        this.mState = Road.RUN;
        this.addEventListener(egret.Event.ENTER_FRAME, this.runHandle, this);
    };

    Road.prototype.stop = function () {
        this.mState = Road.STOP;
        this.removeEventListener(egret.Event.ENTER_FRAME, this.runHandle, this);
    };


    Object.defineProperty(Road.prototype, "speed", {
        get: function () {
            return this.mSpeed;
        },
        set: function (value) {
            this.mSpeed = value;
        },
        enumerable: true,
        configurable: true
    });

    Road.prototype.runHandle = function (e) {
        var createY = 0;
        var i = 0;
        for (; i < this.mLines.length; ++i) {
            var line = this.mLines[i];
            line.y += this.mSpeed;
            if (line.y >= Util.stage_height) {
                line.parent.removeChild(line);
                this.mLines.splice(i, 1);
                --i;
            } else if (i == 0) {
                if (line.y >= this.mLineInterval) {
                    createY = line.y - this.mLineInterval - line.height;
                }
            }
        }
        if (createY != 0) {
            var newline = Util.createBitmapByName("road");
            this.addChild(newline);
            newline.width = Util.stage_width;
            newline.height = Util.stage_height;
            newline.x = Util.stage_width / 2 - newline.width / 2;
            newline.y = createY;
            this.mLines.unshift(newline);
        }
    };
    Road.RUN = 1;
    Road.STOP = 0;
    return Road;
})(egret.Sprite);
Road.prototype.__class__ = "Road";
//# sourceMappingURL=Road.js.map
