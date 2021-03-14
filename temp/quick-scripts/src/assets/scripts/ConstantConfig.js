"use strict";
cc._RF.push(module, '96c6fcoYdNCH5JDfnTwbPcM', 'ConstantConfig');
// scripts/ConstantConfig.js

"use strict";

exports.__esModule = true;
exports["default"] = exports.GameSubKind = exports.GameMainKind = exports.AttackFileType = exports.CardType = void 0;
//卡牌类型
var CardType = {
  ATTACK: 0,
  //攻击牌
  ACTION: 1,
  //技能牌
  SOURCE: 2,
  //资源牌
  CALL: 3,
  //召唤牌
  EQUI: 4 //装备牌

}; //攻击牌种类

exports.CardType = CardType;
var AttackFileType = {
  //招式类型  剑功力 法阵仙 术咒鬼
  SWORD: 1,
  //剑
  SKILL: 2,
  //功
  POWER: 3,
  //力
  METHOD: 4,
  //法
  FRON: 5,
  //阵
  FAIRY: 6,
  //仙
  MAGIC: 7,
  //术
  MANTRA: 8,
  //咒
  GHOST: 9 //鬼

}; //主属性 人 阴 阳

exports.AttackFileType = AttackFileType;
var GameMainKind = {
  HUMAN: 1,
  YIN: 2,
  YANG: 3
}; //次属性 木 火 水 雷 风

exports.GameMainKind = GameMainKind;
var GameSubKind = {
  WOOD: 1,
  FIRE: 2,
  WATER: 3,
  THUNDER: 4,
  WIND: 5
}; //要素清单

exports.GameSubKind = GameSubKind;

var ConstantConfig = function ConstantConfig() {};

exports["default"] = ConstantConfig;

cc._RF.pop();