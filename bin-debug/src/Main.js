/**
* Copyright (c) 2014,Egret-Labs.org
* All rights reserved.
* Redistribution and use in source and binary forms, with or without
* modification, are permitted provided that the following conditions are met:
*
*     * Redistributions of source code must retain the above copyright
*       notice, this list of conditions and the following disclaimer.
*     * Redistributions in binary form must reproduce the above copyright
*       notice, this list of conditions and the following disclaimer in the
*       documentation and/or other materials provided with the distribution.
*     * Neither the name of the Egret-Labs.org nor the
*       names of its contributors may be used to endorse or promote products
*       derived from this software without specific prior written permission.
*
* THIS SOFTWARE IS PROVIDED BY EGRET-LABS.ORG AND CONTRIBUTORS "AS IS" AND ANY
* EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
* WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
* DISCLAIMED. IN NO EVENT SHALL EGRET-LABS.ORG AND CONTRIBUTORS BE LIABLE FOR ANY
* DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
* (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
* LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
* ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
* (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
* SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.call(this);
        this.mRoadBound = 0.0934;
        this.mCarDirect = 0;
        this.mTrack = 3;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    Main.prototype.onAddToStage = function (event) {
        Util.stage_width = this.stage.stageWidth;
        Util.stage_height = this.stage.stageHeight;

        //设置加载进度界面
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);

        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/resource.json", "resource/");
    };

    /**
    * 配置文件加载完成,开始预加载preload资源组。
    */
    Main.prototype.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.loadGroup("preload");
    };

    /**
    * preload资源组加载完成
    */
    Main.prototype.onResourceLoadComplete = function (event) {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            this.createGameScene();
        }
    };

    /**
    * preload资源组加载进度
    */
    Main.prototype.onResourceProgress = function (event) {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    };

    /**
    * 创建游戏场景
    */
    Main.prototype.createGameScene = function () {
        var sky = Util.createBitmapByName("road");
        this.addChild(sky);
        var stageW = this.stage.stageWidth;
        var stageH = this.stage.stageHeight;
        sky.width = stageW;
        sky.height = stageH;

        this.mRoad = new Road();
        this.mRoad.x = this.mRoad.y = 0;
        this.addChild(this.mRoad);
        this.mRoad.speed = 8;
        this.mRoad.run();
        this.mRoad.touchEnabled = false;

        this.mCar = Util.createBitmapByName("car");
        this.mCar.anchorX = this.mCar.anchorY = 0.5;
        this.addChild(this.mCar);
        this.mCar.x = stageW / 2;
        this.mCar.y = stageH * 2 / 3;
        this.mCar.scaleX = 0.2;
        this.mCar.scaleY = 0.2;

        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
    };

    Main.prototype.onTouchBegin = function (e) {
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        this.move(e.stageX);
    };

    Main.prototype.onTouchEnd = function (e) {
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        this.stopMove();
    };

    Main.prototype.move = function (stageX) {
        if (stageX < Util.stage_width / 2) {
            this.changeTrack(this.mTrack - 1);
        } else {
            this.changeTrack(this.mTrack + 1);
        }
    };

    Main.prototype.changeTrack = function (track) {
        if (track < 1 || track > 5) {
            return;
        }
        this.mTrack = track;
        egret.Tween.removeTweens(this.mCar);
        egret.Tween.get(this.mCar, { loop: false }).to({ x: this.getTrackX(track) }, 300);
    };

    Main.prototype.stopMove = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
    };

    Main.prototype.getTrackX = function (track) {
        var bound = Util.stage_width * this.mRoadBound;
        var value = bound + (Util.stage_width - bound * 2) / 10 * (track * 2 - 1);
        return value;
    };
    return Main;
})(egret.DisplayObjectContainer);
Main.prototype.__class__ = "Main";
//# sourceMappingURL=Main.js.map
