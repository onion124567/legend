
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/beans/RoleBean.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL2JlYW5zL1JvbGVCZWFuLmpzIl0sIm5hbWVzIjpbIlJvbGVCZWFuIiwicm9sZVR5cGUiLCJpZCIsImxldmVsIiwiY2FyZGxpc3QiLCJjdXJyZW50Y2FyZHMiLCJyb2xlUGljIiwicm9sZUhwIiwic3RhdHVzbGlzdCIsImRlc2MiLCJzZXRSb2xlSHAiLCJocCIsImdldFJvbGVIcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7O0lBR3FCQTtBQUNqQixvQkFBWUMsUUFBWixFQUFzQjtBQUNsQixTQUFLQyxFQUFMLEdBQVUsS0FBVjtBQUNBLFNBQUtDLEtBQUwsR0FBYSxDQUFDLENBQWQ7QUFDQSxTQUFLQyxRQUFMLEdBQWdCLEVBQWhCLENBSGtCLENBR0M7O0FBQ25CLFNBQUtDLFlBQUwsR0FBb0IsRUFBcEIsQ0FKa0IsQ0FJSzs7QUFDdkIsU0FBS0osUUFBTCxHQUFnQkEsUUFBaEIsQ0FMa0IsQ0FLTzs7QUFDekIsU0FBS0ssT0FBTCxHQUFlLEVBQWYsQ0FOa0IsQ0FNQTs7QUFDbEIsU0FBS0MsTUFBTCxHQUFjLEVBQWQ7QUFDQSxTQUFLQyxVQUFMLEdBQWtCLEVBQWxCLENBUmtCLENBUUc7O0FBQ3JCLFNBQUtDLElBQUwsR0FBWSxJQUFaO0FBRUg7Ozs7U0FHREMsWUFBQSxtQkFBVUMsRUFBVixFQUFhO0FBQ1QsU0FBS0osTUFBTCxHQUFZSSxFQUFaO0FBQ0g7O1NBQ0RDLFlBQUEscUJBQVc7QUFDUCxXQUFPLEtBQUtMLE1BQVo7QUFDSCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiDmlbDmja7lsYLnmoTop5LoibJcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm9sZUJlYW4ge1xuICAgIGNvbnN0cnVjdG9yKHJvbGVUeXBlKSB7XG4gICAgICAgIHRoaXMuaWQgPSBcIjE4MVwiO1xuICAgICAgICB0aGlzLmxldmVsID0gLTE7XG4gICAgICAgIHRoaXMuY2FyZGxpc3QgPSBbXTsvL+aAu+eJjOW6k1xuICAgICAgICB0aGlzLmN1cnJlbnRjYXJkcyA9IFtdOy8v5b2T5YmN5omL54mMXG4gICAgICAgIHRoaXMucm9sZVR5cGUgPSByb2xlVHlwZTsvLzAg55S16ISRIDHnjqnlrrZcbiAgICAgICAgdGhpcy5yb2xlUGljID0gXCJcIjsvL+i0tOWbvlxuICAgICAgICB0aGlzLnJvbGVIcCA9IDIwO1xuICAgICAgICB0aGlzLnN0YXR1c2xpc3QgPSBbXTsvL+eKtuaAgeaVsOe7hFxuICAgICAgICB0aGlzLmRlc2MgPSBcIuaPj+i/sFwiO1xuXG4gICAgfVxuXG5cbiAgICBzZXRSb2xlSHAoaHApe1xuICAgICAgICB0aGlzLnJvbGVIcD1ocDtcbiAgICB9XG4gICAgZ2V0Um9sZUhwKCl7XG4gICAgICAgIHJldHVybiB0aGlzLnJvbGVIcDtcbiAgICB9XG59Il19