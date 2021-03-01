"use strict";
cc._RF.push(module, '99a402sc1VPQrwu+sHSIjU1', 'Pokemon');
// scripts/Pokemon.js

"use strict";

//战斗中的宝宝
cc.Class({
  "extends": cc.Component,
  properties: {
    id: "181",
    level: -1,
    round: -1,
    //剩余回合数
    sprite: {
      //基础贴图
      "default": null,
      type: cc.SpriteFrame
    },
    hp: 20 //血量

  },
  attack: function attack() {//触发自身的状态栏，输出伤害值，自身附加状态，敌方附加状态
  },
  underattack: function underattack() {//被攻击，触发自身状态栏，更改自身生命值，状态值
  },
  roundBegin: function roundBegin() {}
});

cc._RF.pop();