"use strict";
cc._RF.push(module, 'f3b569HznVA0IJoh1Shylrp', 'Role');
// scripts/Role.js

"use strict";

var _RoleBean = _interopRequireDefault(require("./beans/RoleBean"));

var _Game = require("./Game");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * 战斗中的角色 敌我双方
 * 显示逻辑层的脚本
 */
cc.Class({
  "extends": cc.Component,
  properties: {
    roleBean: new _RoleBean["default"](0),
    level: -1,
    cardlist: [],
    //总手牌
    // currentcardArrays:[],//当前手牌
    sprite: {
      //基础贴图
      "default": null,
      type: cc.Sprite
    },
    hpLabel: {
      "default": null,
      type: cc.Label
    },
    //血量
    descLabel: {
      "default": null,
      type: cc.Label
    },
    hpAnimateLabel: {
      "default": null,
      type: cc.Label
    },
    targetStamp: {
      "default": null,
      tyoe: cc.Sprite
    },
    statuslist: [] //状态数组

  },
  attack: function attack(value) {
    //触发自身的状态栏，输出伤害值，自身附加状态，敌方附加状态
    return value;
  },
  underattack: function underattack(value) {
    //被攻击，触发自身状态栏，更改自身生命值，状态值
    var hp = this.roleBean.getRoleHp();
    hp = parseInt(hp);
    hp = hp - value;

    if (hp < 0) {
      hp = 0;
    } // this.hpAnimate();


    this.roleBean.setRoleHp(hp);
    this.hpLabel.string = this.roleBean.getRoleHp();
    return hp > 0;
  },
  isAlive: function isAlive() {
    return hp > 0;
  },
  hpAnimate: function hpAnimate() {
    var animate = cc.sequence(cc.moveBy(2, -50, 50), 2);
    this.hpAnimateLabel.runAction(animate);
  },
  //找到需要触发的状态节点，并触发
  roundBegin: function roundBegin() {
    for (var i = 0; i < this.statuslist.length; i++) {
      this.statuslist[i].operateStatus(_Game.StatusType.ROUNDBEGIN);
    }
  },
  roundOver: function roundOver() {},
  //战斗开始 类似祝福状态 直接触发并消耗
  encounter: function encounter() {},
  bindRoleBean: function bindRoleBean(role) {
    this.roleBean = role;
    this.hpLabel.string = role.getRoleHp() + "";
  },
  //被标记
  targetSign: function targetSign() {},
  //取消标记
  targetCancel: function targetCancel() {},
  //返回效果
  onDrawCard: function onDrawCard(cardBean) {}
});

cc._RF.pop();