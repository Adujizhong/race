/**
 * Created by dujizhong on 2014/9/2.
 */

class Road extends egret.Sprite
{
    public static RUN:number = 1;
    public static STOP:number = 0;

    private mLineInterval:number = 0;
    private mLines:Array<egret.Bitmap>;
    private mSpeed:number = 0;
    private mState:number = 1;

    public constructor()
    {
        super();
        this.init();
    }

    private init():void
    {
        this.mLines = new Array<egret.Bitmap>();
        this.initLine();
    }

    private initLine():void
    {
        var curY:number = 0;
        while(curY < Util.stage_height)
        {
            var line:egret.Bitmap = Util.createBitmapByName("road");
            this.addChild(line);
            line.width = Util.stage_width;
            line.height = Util.stage_height;
            line.x = Util.stage_width/2 - line.width/2;
            line.y = curY;
            this.mLines.push(line);
            curY += line.height + this.mLineInterval;
        }
    }

    public run():void
    {
        this.mState = Road.RUN;
        this.addEventListener(egret.Event.ENTER_FRAME, this.runHandle, this);
    }

    public stop():void
    {
        this.mState = Road.STOP;
        this.removeEventListener(egret.Event.ENTER_FRAME, this.runHandle, this);
    }

    public set speed(value:number)
    {
        this.mSpeed = value;
    }

    public get speed():number
    {
        return this.mSpeed;
    }

    private runHandle(e:egret.Event):void
    {
        var createY:number = 0;
        var i:number = 0;
        for(; i < this.mLines.length; ++i)
        {
            var line:egret.Bitmap = this.mLines[i];
            line.y += this.mSpeed;
            if(line.y >= Util.stage_height)
            {
                line.parent.removeChild(line);
                this.mLines.splice(i, 1);
                --i;
            }else if(i == 0)
            {
                if(line.y >= this.mLineInterval)
                {
                    createY = line.y - this.mLineInterval - line.height;
                }
            }
        }
        if(createY != 0)
        {
            var newline:egret.Bitmap = Util.createBitmapByName("road");
            this.addChild(newline);
            newline.width = Util.stage_width;
            newline.height = Util.stage_height;
            newline.x = Util.stage_width/2 - newline.width/2;
            newline.y = createY;
            this.mLines.unshift(newline);
        }
    }
}
