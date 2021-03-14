"use strict";
cc._RF.push(module, '99a402sc1VPQrwu+sHSIjU1', 'Pokemon');
// scripts/Pokemon.js

"use strict";

var _PokemonBean = _interopRequireDefault(require("./beans/PokemonBean"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//战斗中的宝宝
cc.Class({
  "extends": cc.Component,
  properties: {
    id: "181",
    pokenBean: new _PokemonBean["default"](),
    level: -1,
    round: -1,
    //剩余回合数
    sprite: {
      //基础贴图
      "default": null,
      type: cc.Sprite
    },
    hp: 20,
    //血量
    hpLabel: {
      "default": null,
      type: cc.Label
    },
    //技能可用
    actionEable: 1
  },
  attack: function attack() {
    //触发自身的状态栏，输出伤害值，自身附加状态，敌方附加状态
    this.actionEable = 1;
  },
  underattack: function underattack(value) {
    //被攻击，触发自身状态栏，更改自身生命值，状态值
    this.hp = this.hp - value;
  },
  //每回合可点一次，宝宝技能。在宝宝攻击后恢复
  action: function action() {
    if (this.actionEable === 1) {
      this.actionEable = 0;
    }
  },
  roundBegin: function roundBegin() {}
});

cc._RF.pop();