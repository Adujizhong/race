/**
 * Created by dujizhong on 2014/9/2.
 */

class Util
{
    public static stage_width:number = 0;
    public static stage_height:number = 0;
    public static createBitmapByName(name:string):egret.Bitmap
    {
        var result:egret.Bitmap = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
}
