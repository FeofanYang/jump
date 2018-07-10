(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/player.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '08e34DSRv5B67EAon0Dq8cC', 'player', __filename);
// script/player.js

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

var game_scene = require('game_scenes');
cc.Class({
    extends: cc.Component,

    properties: {
        initSpeed: 150,
        max_power: 600,
        y_radio: 0.5560472,

        game_manager: {
            type: game_scene,
            default: null
        },

        touchArea: {
            default: null,
            type: cc.Node
        },

        scorePlusLabel: {
            default: null,
            type: cc.Label
        },

        scaleAudio: {
            default: null,
            url: cc.AudioClip
        },
        // 得分音效资源
        scoreA_Audio: {
            default: null,
            url: cc.AudioClip
        },
        score1_Audio: {
            default: null,
            url: cc.AudioClip
        },
        score2_Audio: {
            default: null,
            url: cc.AudioClip
        },
        score3_Audio: {
            default: null,
            url: cc.AudioClip
        },
        score4_Audio: {
            default: null,
            url: cc.AudioClip
        },
        score5_Audio: {
            default: null,
            url: cc.AudioClip
        },
        score6_Audio: {
            default: null,
            url: cc.AudioClip
        },
        score7_Audio: {
            default: null,
            url: cc.AudioClip
        },
        score8_Audio: {
            default: null,
            url: cc.AudioClip
        }
    },

    onLoad: function onLoad() {
        this.next_block = null;
        this.direction = 1;
    },
    set_next_block: function set_next_block(block) {
        this.next_block = block;
    },
    start: function start() {
        this.score = 0;
        // 获取 rotate 与 anim 节点
        this.rotate_node = this.node.getChildByName('rotate');
        this.anim_node = this.rotate_node.getChildByName('anim');
        // 初始化蓄力状态；初始速度；X移动距离；开始方向
        this.isPowering = false;
        this.speed = 0;
        this.x_distance = 0;
        this.isCombo = 0;
        this.scoreAudioArr = [this.score1_Audio, this.score2_Audio, this.score3_Audio, this.score4_Audio, this.score5_Audio, this.score6_Audio, this.score7_Audio, this.score8_Audio];

        // 监听事件
        this.touchArea.on(cc.Node.EventType.TOUCH_START, function (e) {
            this.isPowering = true;
            this.speed = this.initSpeed;
            this.x_distance = 0;
            // 先停止所有动画；压缩Y
            this.anim_node.stopAllActions();
            this.anim_node.runAction(cc.scaleTo(2, 1.2, 0.5));
            // 播放音效
            this.playScale = cc.audioEngine.play(this.scaleAudio, true);
        }.bind(this), this);

        this.touchArea.on(cc.Node.EventType.TOUCH_END, function (e) {
            this.isPowering = false;
            // 先停止所有动画；恢复初始状态
            this.anim_node.stopAllActions();
            this.anim_node.runAction(cc.scaleTo(0.5, 1, 1));

            cc.audioEngine.stop(this.playScale);
            this.player_jump();
        }.bind(this), this);

        this.touchArea.on(cc.Node.EventType.TOUCH_CANCEL, function (e) {
            this.isPowering = false;
            // 先停止所有动画；恢复初始状态
            this.anim_node.stopAllActions();
            this.anim_node.runAction(cc.scaleTo(0.5, 1, 1));

            cc.audioEngine.stop(this.playScale);
            this.player_jump();
        }.bind(this), this);
    },
    player_jump: function player_jump() {
        // 获取XY移动距离；本身位置；加上移动的距离
        var x_distance = this.x_distance * this.direction;
        var y_distance = this.x_distance * this.y_radio;

        var traget_pos = this.node.getPosition();
        traget_pos.x += x_distance;
        traget_pos.y += y_distance;
        // 获取player父节点（世界）位置
        var w_pos = this.node.parent.convertToWorldSpaceAR(traget_pos);

        this.rotate_node.runAction(cc.rotateBy(0.35, 360 * this.direction));
        var is_gameOver = false;
        if (this.next_block.test_pos(w_pos, this.direction)) {
            // 转化 traget_pos 为参考点的位置
            traget_pos = this.node.parent.convertToNodeSpaceAR(w_pos);
        } else {
            is_gameOver = true;
        }
        // 执行跳跃动画（时间，位置，高度，次数）
        var jump = cc.jumpTo(0.35, traget_pos, 200, 1);

        // 判断新 block 生成方向
        this.direction = Math.random() < 0.5 ? -1 : 1;

        // 执行完跳跃后滚动地图
        var end_func = cc.callFunc(function () {
            if (is_gameOver) {
                this.game_manager.checkout_game();
            } else {
                var anim = this.node.getChildByName('score_plus').getComponent(cc.Animation);
                anim.playAdditive('scoreAM');
                // 播放音效 添加分数等等
                if (this.next_block.playScoreFn()) {
                    this.isCombo++;
                    if (this.isCombo > 8) {
                        this.isCombo = 8;
                    }
                    this.next_block.play_blockLight().playAdditive('mid_lightAM');
                    this.node.parent.getChildByName('score_plus');
                    cc.audioEngine.play(this.scoreAudioArr[this.isCombo - 1], false);
                    this.score += 2 * this.isCombo;
                    this.scorePlusLabel.string = '+' + 2 * this.isCombo;
                } else {
                    this.isCombo = 0;
                    cc.audioEngine.play(this.scoreA_Audio, false);
                    this.score++;
                    this.scorePlusLabel.string = '+1';
                }
                this.game_manager.showScore(this.score.toString());
                // 通过 game_manager 调用 game_scenes 的函数
                if (this.direction == -1) {
                    this.game_manager.move_map(580 - w_pos.x);
                } else {
                    this.game_manager.move_map(180 - w_pos.x);
                }
            }
        }.bind(this));
        var seq = cc.sequence(jump, end_func);
        this.node.runAction(seq);
    },
    update: function update(dt) {
        if (this.isPowering) {
            this.speed += this.max_power * dt;
            this.x_distance += this.speed * dt;
        }
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
        //# sourceMappingURL=player.js.map
        