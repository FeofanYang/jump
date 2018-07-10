(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/game_scenes.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '606deGRG+RMLZ1IH218WKhR', 'game_scenes', __filename);
// script/game_scenes.js

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

    properties: {
        player: {
            default: null,
            type: cc.Node
        },
        block_prefab: {
            default: [],
            type: cc.Prefab
        },
        block_root: {
            default: null,
            type: cc.Node
        },
        left_org: cc.p(0, 0),

        camera_root: {
            default: null,
            type: cc.Node
        },

        checkout: {
            default: null,
            type: cc.Node
        },

        readyPage: {
            default: null,
            type: cc.Node
        },

        y_radio: 0.5560472,

        scoreLable: {
            default: null,
            type: cc.Label
        },

        endScoreLable: {
            default: null,
            type: cc.Label
        },

        start_Audio: {
            default: null,
            url: cc.AudioClip
        },

        fall_Audio: {
            default: null,
            url: cc.AudioClip
        }
    },

    startBtn: function startBtn() {
        this.readyPage.active = false;
        // 初始化一个
        this.creat_block();
        cc.audioEngine.play(this.start_Audio, false);
    },
    start: function start() {
        // 实例化一个 block_prefab；将其添加到 block_root；并添加位置节点
        this.cur_block = cc.instantiate(this.block_prefab[Math.floor(Math.random() * 3)]);
        this.block_root.addChild(this.cur_block);
        this.cur_block.setPosition(this.block_root.convertToNodeSpaceAR(this.left_org));

        // 获取 cur_block 的中心点
        var world_pos = this.cur_block.getChildByName('mid').convertToWorldSpaceAR(cc.p(0, 0));
        // 将 player 放置在 cur_block 的中心点
        this.player.setPosition(this.camera_root.convertToNodeSpaceAR(world_pos));
        this.next_block = this.cur_block;
        // 获取player节点的player脚本
        this.playerComp = this.player.getComponent('player');
        this.block_zorder = -1;
        this.block_tag = 0;
    },
    creat_block: function creat_block() {
        this.cur_block = this.next_block;
        // 实例化一个 block_prefab，将其添加到 block_root，并设置层级
        this.next_block = cc.instantiate(this.block_prefab[Math.floor(Math.random() * 3)]);
        this.block_root.addChild(this.next_block, this.block_zorder, this.block_tag);
        this.block_zorder--;
        this.block_tag++;
        // 超过XX个就清除
        // let blockLen = this.block_root._children.length;
        // if(blockLen > 5){
        //     for (let i = 0; i < 3; i++) {
        //         this.block_root.removeChildByTag(i);
        //     }
        //     this.block_tag = 0;
        // }
        // next_block 增加的距离，范围200-400
        var x_distance = 200 + Math.random() * 200;
        this.y_distance = x_distance * this.y_radio;
        // 获取 cur_block 的位置，相加得到 next_block 的位置
        var next_block_pos = this.cur_block.getPosition();
        next_block_pos.x += x_distance * this.playerComp.direction;
        next_block_pos.y += this.y_distance;
        this.next_block.setPosition(next_block_pos);
        // 播放掉落动画
        this.next_block.getComponent('block').play_blockDorp().playAdditive('block_drop');
        this.playerComp.set_next_block(this.next_block.getComponent('block'));
    },
    move_map: function move_map(offset_x) {
        // 滚动地图
        var m1 = cc.moveBy(0.5, offset_x, -this.y_distance);
        var end_func = cc.callFunc(function () {
            this.creat_block();
        }.bind(this));
        var seq = cc.sequence(m1, end_func);
        this.camera_root.runAction(seq);
    },
    showScore: function showScore(score) {
        this.scoreLable.string = score;
    },


    checkout_game: function checkout_game() {
        cc.audioEngine.play(this.fall_Audio, false);
        this.scheduleOnce(function () {
            this.endScoreLable.string = this.player.getComponent('player').score;
            this.scoreLable.string = ' ';
            this.checkout.active = true;
        }, 0.2);
    },

    game_again: function game_again() {
        cc.director.loadScene("game_scenes");
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
        //# sourceMappingURL=game_scenes.js.map
        