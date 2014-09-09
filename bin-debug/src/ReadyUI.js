/**
* Created by dujizhong on 2014/9/9.
*/
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ReadyUI = (function (_super) {
    __extends(ReadyUI, _super);
    function ReadyUI(backFunc, parent) {
        _super.call(this);
        this.READY_INTERVAL = 5000;
        this.mBackFunc = backFunc;
        this.mParent = parent;
    }
    ReadyUI.prototype.ready = function () {
        var sprite = new egret.Sprite();
        this.addChild(sprite);
        sprite.graphics.beginFill(0x000000, 1);
        sprite.graphics.drawRect(0, 0, Util.stage_width, Util.stage_height);
        sprite.graphics.endFill();

        var bitmap = Util.createBitmapByName("sprite.readyGo");
        bitmap.x = Util.stage_width / 2 - bitmap.width / 2;
        bitmap.y = Util.stage_height / 2 - bitmap.height / 2;
        sprite.addChild(bitmap);

        var timer = new egret.Timer(2000, 1);
        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.mParent.startGame, this.mParent);
        timer.start();
    };

    ReadyUI.prototype.clear = function () {
        while (this.numChildren)
            this.removeChildAt(0);
    };
    return ReadyUI;
})(egret.Sprite);
ReadyUI.prototype.__class__ = "ReadyUI";
//# sourceMappingURL=ReadyUI.js.map
