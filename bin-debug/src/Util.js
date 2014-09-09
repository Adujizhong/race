/**
* Created by dujizhong on 2014/9/2.
*/
var Util = (function () {
    function Util() {
    }
    Util.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    Util.stage_width = 0;
    Util.stage_height = 0;
    return Util;
})();
Util.prototype.__class__ = "Util";
//# sourceMappingURL=Util.js.map
