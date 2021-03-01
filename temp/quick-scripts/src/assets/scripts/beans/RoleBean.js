"use strict";
cc._RF.push(module, '382ceJTZe5Li67JBz4qFCYs', 'RoleBean');
// scripts/beans/RoleBean.js

"use strict";

exports.__esModule = true;
exports["default"] = void 0;

/**
 * 数据层的角色
 */
var RoleBean = /*#__PURE__*/function () {
  function RoleBean(roleType) {
    this.id = "181";
    this.level = -1;
    this.cardlist = []; //总牌库

    this.currentcards = []; //当前手牌

    this.roleType = roleType; //0 电脑 1玩家

    this.rolePic = ""; //贴图

    this.roleHp = 20;
    this.statuslist = []; //状态数组

    this.desc = "描述";
  }

  var _proto = RoleBean.prototype;

  _proto.setRoleHp = function setRoleHp(hp) {
    this.roleHp = hp;
  };

  _proto.getRoleHp = function getRoleHp() {
    return this.roleHp;
  };

  return RoleBean;
}();

exports["default"] = RoleBean;
module.exports = exports["default"];

cc._RF.pop();