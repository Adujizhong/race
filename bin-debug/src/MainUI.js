var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
* Created by dujizhong on 2014/9/9.
*/
var MainUI = (function (_super) {
    __extends(MainUI, _super);
    function MainUI(startBackFunc, parent) {
        _super.call(this);
        this.mStartBackFunc = startBackFunc;
        this.mParent = parent;
        this.init();
    }
    MainUI.prototype.init = function () {
        this.mBg = Util.createBitmapByName("homeBg");
        this.mBg.width = Util.stage_width;
        this.mBg.height = Util.stage_height;
        this.addChild(this.mBg);

        this.mStartBt = new egret.Sprite();
        var startBmp = new egret.Bitmap();
        startBmp.texture = RES.getRes("btn.startBtn");
        this.mStartBt.addChild(startBmp);
        this.mStartBt.scaleX = this.mStartBt.scaleY = (Util.stage_width / 2 - 15) / this.mStartBt.width;
        this.mStartBt.x = Util.stage_width / 2 - this.mStartBt.width * this.mStartBt.scaleX - 5;
        this.mStartBt.y = Util.stage_height - this.mStartBt.height - 20;
        this.addChild(this.mStartBt);
        this.mStartBt.touchEnabled = true;
        this.mStartBt.addEventListener(egret.TouchEvent.TOUCH_END, this.mParent.onStart, this.mParent);
    };
    return MainUI;
})(egret.Sprite);
MainUI.prototype.__class__ = "MainUI";
//# sourceMappingURL=MainUI.js.map
