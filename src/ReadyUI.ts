/**
 * Created by dujizhong on 2014/9/9.
 */

class ReadyUI extends egret.Sprite
{
    private READY_INTERVAL:number = 5000;
    private mBackFunc:Function;
    private mParent:any;

    public constructor(backFunc:Function, parent:any)
    {
        super();
        this.mBackFunc = backFunc;
        this.mParent = parent;
    }

    public ready():void
    {
        var sprite:egret.Sprite = new egret.Sprite();
        this.addChild(sprite);
        sprite.graphics.beginFill(0x000000, 1);
        sprite.graphics.drawRect(0, 0, Util.stage_width, Util.stage_height);
        sprite.graphics.endFill();

        var bitmap:egret.Bitmap = Util.createBitmapByName("sprite.readyGo");
        bitmap.x = Util.stage_width/2 - bitmap.width/2;
        bitmap.y = Util.stage_height/2 - bitmap.height/2;
        sprite.addChild(bitmap);

        var timer:egret.Timer = new egret.Timer(2000, 1);
        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.mParent.startGame, this.mParent);
        timer.start();
    }

    public clear():void
    {
        while(this.numChildren) this.removeChildAt(0);
    }
}
