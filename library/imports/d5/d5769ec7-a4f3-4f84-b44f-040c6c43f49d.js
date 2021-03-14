"use strict";
cc._RF.push(module, 'd57697HpPNPhLRPBAxsQ/Sd', 'StatusBean');
// scripts/beans/StatusBean.js

"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _Game = require("../Game");

var StatusBean = /*#__PURE__*/function () {
  function StatusBean() {
    this.id = -1;
    this.level = -1;
    this.sprite = {
      //基础贴图
      "default": null,
      type: cc.SpriteFrame
    };
    this.round = -1; //费用

    this.type = _Game.StatusType.ROUNDBEGIN;
  }
  /**
   * 结算状态
   */


  var _proto = StatusBean.prototype;

  _proto.operateStatus = function operateStatus(roundtype) {
    if (roundtype === this.type) {
      return true;
    } else {
      return false;
    }
  };

  return StatusBean;
}();

exports["default"] = StatusBean;
module.exports = exports["default"];

cc._RF.pop();