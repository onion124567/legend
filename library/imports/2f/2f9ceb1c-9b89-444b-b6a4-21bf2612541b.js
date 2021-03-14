"use strict";
cc._RF.push(module, '2f9cescm4lES7akIb8mElQb', 'PokemonBean');
// scripts/beans/PokemonBean.js

"use strict";

exports.__esModule = true;
exports["default"] = void 0;

/**
 * 数据层的宝宝
 */
var PokemonBean = /*#__PURE__*/function () {
  function PokemonBean(roleType) {
    this.id = "181";
    this.level = -1;
    this.pic = ""; //贴图

    this.roleHp = 20;
    this.desc = "描述";
    this.round = -1; //技能类型

    this.actionType = 0; //1给主角恢复 2充当某种类型牌  3加护甲 4抽牌  5造成伤害  6加buff 7再进行一回合 8吞噬 9冰冻

    this.passiveSkill = 0; //被动技能id  附加伤害  双倍伤害 嘲讽 吸血  回复  重生等
  }

  var _proto = PokemonBean.prototype;

  _proto.setRoleHp = function setRoleHp(hp) {
    this.roleHp = hp;
  };

  _proto.getRoleHp = function getRoleHp() {
    return this.roleHp;
  };

  return PokemonBean;
}();

exports["default"] = PokemonBean;
module.exports = exports["default"];

cc._RF.pop();