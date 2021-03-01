"use strict";
cc._RF.push(module, '682f2CQeCtCzpKkgrhQceS/', 'CardBean');
// scripts/beans/CardBean.js

"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var CardBean = /*#__PURE__*/function () {
  function CardBean() {
    this.id = "181";
    this.level = -1;
    this.sprite = {
      //基础贴图
      "default": null,
      type: cc.SpriteFrame
    };
    this.cost = 20; //费用

    this.type = 1; //类型

    this.desc = ""; //说明

    this.title = ""; //卡牌名称

    this.damage = 3; //伤害值
  }

  var _proto = CardBean.prototype;

  _proto.sendEffect = function sendEffect() {
    return this.damage;
  };

  return CardBean;
}();

exports["default"] = CardBean;
module.exports = exports["default"];

cc._RF.pop();