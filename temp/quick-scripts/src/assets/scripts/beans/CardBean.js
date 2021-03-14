"use strict";
cc._RF.push(module, '682f2CQeCtCzpKkgrhQceS/', 'CardBean');
// scripts/beans/CardBean.js

"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _ConstantConfig = require("../ConstantConfig");

var CardBean = /*#__PURE__*/function () {
  function CardBean() {
    this.id = "181";
    this.level = -1;
    this.picurl = ""; //贴图

    this.type = _ConstantConfig.CardType.ATTACK; //类型

    this.desc = ""; //说明

    this.title = "攻击"; //卡牌名称

    this.damage = 0; //对目标的基础伤害值

    this.createsource = 0; //创建的资源值

    this.consumesource = 0; //消耗的资源值

    this.drawCard = 0; //抽牌数

    this.recoverHp = 0; //恢复生命

    this.pokemonRecover = 0; //恢复宝宝生命值

    this.appendDamage = 0; //追加伤害值

    this.pokemondamage = 0; //对宝宝造成的伤害值

    this.callid = 0;
    this.effectlist = ""; //卡牌效果列表
  } //导入加载卡牌时用


  var _proto = CardBean.prototype;

  _proto.bindData = function bindData(jsonBean) {} //传入当前状态 返回使用后的效果
  ;

  _proto.sendEffect = function sendEffect(hp, maxhp, source, cardcount) {
    var scene = {
      hp: hp,
      maxhp: maxhp,
      source: source,
      cardcount: cardcount
    };
    this.effectlist.split(",");
    return this.damage;
  }
  /**
   *
   1	造成固定伤害
   2	造成水晶量的伤害
   3	对宝宝造成固定量伤害
   4	抽固定量的牌
   5	抽水晶量的牌
   6	回复固定量hp
   7	恢复水晶量hp
   8	产生固定量的水晶
   9	召唤固定宝宝id
   11	累计盾系点数
   12	累计剑系点数
   13	累计斧系点数
      伤害变成群体伤害
   */
  ;

  _proto.effect1 = function effect1(result, scene) {
    result.damage = result.damage + this.damage;
  };

  _proto.effect2 = function effect2(result, scene) {
    result.damage = result.damage + scene.source;
  };

  _proto.effect3 = function effect3(result, scene) {
    result.pokemondamage = result.pokemondamage + this.pokemondamage;
  };

  _proto.effect4 = function effect4(result, scene) {
    result.draw = result.draw + this.drawCard;
  };

  _proto.effect5 = function effect5(result, scene) {
    result.draw = result.draw + scene.source;
  };

  _proto.effect6 = function effect6(result, scene) {
    result.recover = result.recover + this.recoverHp;
  };

  _proto.effect7 = function effect7(result, scene) {
    result.recover += scene.source;
  };

  _proto.effect8 = function effect8(result, scene) {
    result.createsource += this.createsource;
  };

  _proto.effect9 = function effect9(result, scene) {
    result.callid = this.callid;
  };

  return CardBean;
}();

exports["default"] = CardBean;
module.exports = exports["default"];

cc._RF.pop();