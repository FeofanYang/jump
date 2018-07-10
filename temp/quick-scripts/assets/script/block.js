(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/block.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '247b9xAaxRBZ6FEKyEBkfoY', 'block', __filename);
// script/block.js

'use strict';

// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

cc.Class({
    extends: cc.Component,

    start: function start() {
        this.mid = this.node.getChildByName('mid');
        this.top = this.node.getChildByName('top');
        this.btm = this.node.getChildByName('btm');
        this.left = this.node.getChildByName('left');
        this.right = this.node.getChildByName('right');
        this.isMid = null;
    },


    // 世界位置 与 方向dir = -1(left) || dir = 1(right)
    test_pos: function test_pos(w_pos, direction) {
        var mid_pos = this.mid.convertToWorldSpaceAR(cc.p(0, 0));
        // 求目标位置到点的位置
        var dir = cc.pSub(w_pos, mid_pos);
        // 争夺最近距离；争夺最小点
        var min_len = cc.pLength(dir);
        var min_pos = mid_pos;

        if (direction == 1) {
            var top_pos = this.top.convertToWorldSpaceAR(cc.p(0, 0));
            // 求目标位置到点的位置
            dir = cc.pSub(w_pos, top_pos);
            var cur_len = cc.pLength(dir);
            // 争夺过程，下同
            if (min_len > cur_len) {
                min_len = cur_len;
                min_pos = top_pos;
            }
            var btm_pos = this.btm.convertToWorldSpaceAR(cc.p(0, 0));
            dir = cc.pSub(w_pos, btm_pos);
            var cur_len = cc.pLength(dir);
            if (min_len > cur_len) {
                min_len = cur_len;
                min_pos = btm_pos;
            }
        } else {
            var left_pos = this.left.convertToWorldSpaceAR(cc.p(0, 0));
            dir = cc.pSub(w_pos, left_pos);
            var cur_len = cc.pLength(dir);
            if (min_len > cur_len) {
                min_len = cur_len;
                min_pos = left_pos;
            }
            var right_pos = this.right.convertToWorldSpaceAR(cc.p(0, 0));
            dir = cc.pSub(w_pos, right_pos);
            var cur_len = cc.pLength(dir);
            if (min_len > cur_len) {
                min_len = cur_len;
                min_pos = right_pos;
            }
        }
        if (min_pos == mid_pos) {
            this.isMid = true;
        } else {
            this.isMid = false;
        }
        // 目标位置与参考点距离 小于100则为true
        dir = cc.pSub(w_pos, min_pos);
        if (cc.pLength(dir) <= 100) {
            w_pos.x = min_pos.x;
            w_pos.y = min_pos.y;
            return true;
        } else {
            return false;
        }
    },


    playScoreFn: function playScoreFn() {
        return this.isMid;
    },

    play_blockLight: function play_blockLight() {
        return this.node.getChildByName('mid_light').getComponent(cc.Animation);
    },

    play_blockDorp: function play_blockDorp() {
        return this.node.getChildByName('block').getComponent(cc.Animation);
    }
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=block.js.map
        