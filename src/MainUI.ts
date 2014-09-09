/**
 * Created by dujizhong on 2014/9/9.
 */
class MainUI extends egret.Sprite
{
    private mBg:egret.Bitmap;
    private mStartBt:egret.Sprite;
    private mStartBackFunc:Function;
    private mParent:any;

    public constructor(startBackFunc:Function, parent:any)
    {
        super();
        this.mStartBackFunc = startBackFunc;
        this.mParent = parent;
        this.init();
    }

    private init():void
    {
        this.mBg = Util.createBitmapByName("homeBg");
        this.mBg.width = Util.stage_width;
        this.mBg.height = Util.stage_height;
        this.addChild(this.mBg);

        this.mStartBt = new egret.Sprite();
        var startBmp:egret.Bitmap = new egret.Bitmap();
        startBmp.texture = RES.getRes("btn.startBtn");
        this.mStartBt.addChild(startBmp);
        this.mStartBt.scaleX = this.mStartBt.scaleY = (Util.stage_width/2 - 15) / this.mStartBt.width;
        this.mStartBt.x = Util.stage_width / 2 - this.mStartBt.width*this.mStartBt.scaleX - 5;
        this.mStartBt.y = Util.stage_height - this.mStartBt.height - 20;
        this.addChild(this.mStartBt);
        this.mStartBt.touchEnabled = true;
        this.mStartBt.addEventListener(egret.TouchEvent.TOUCH_END, this.mParent.onStart, this.mParent);
    }
}
