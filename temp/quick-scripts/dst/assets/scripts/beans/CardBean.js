
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/beans/CardBean.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL2JlYW5zL0NhcmRCZWFuLmpzIl0sIm5hbWVzIjpbIkNhcmRCZWFuIiwiaWQiLCJsZXZlbCIsInNwcml0ZSIsInR5cGUiLCJjYyIsIlNwcml0ZUZyYW1lIiwiY29zdCIsImRlc2MiLCJ0aXRsZSIsImRhbWFnZSIsInNlbmRFZmZlY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBQ3FCQTtBQUNqQixzQkFBYztBQUNWLFNBQUtDLEVBQUwsR0FBVSxLQUFWO0FBQ0EsU0FBS0MsS0FBTCxHQUFhLENBQUMsQ0FBZDtBQUNBLFNBQUtDLE1BQUwsR0FBYztBQUFDO0FBQ1gsaUJBQVMsSUFEQztBQUVWQyxNQUFBQSxJQUFJLEVBQUVDLEVBQUUsQ0FBQ0M7QUFGQyxLQUFkO0FBSUEsU0FBS0MsSUFBTCxHQUFZLEVBQVosQ0FQVSxDQU9LOztBQUNmLFNBQUtILElBQUwsR0FBWSxDQUFaLENBUlUsQ0FRSTs7QUFDZCxTQUFLSSxJQUFMLEdBQVksRUFBWixDQVRVLENBU0s7O0FBQ2YsU0FBS0MsS0FBTCxHQUFXLEVBQVgsQ0FWVSxDQVVJOztBQUNkLFNBQUtDLE1BQUwsR0FBWSxDQUFaLENBWFUsQ0FXSTtBQUNqQjs7OztTQUVEQyxhQUFBLHNCQUFZO0FBQ1IsV0FBTyxLQUFLRCxNQUFaO0FBQ0giLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FyZEJlYW4ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmlkID0gXCIxODFcIjtcbiAgICAgICAgdGhpcy5sZXZlbCA9IC0xO1xuICAgICAgICB0aGlzLnNwcml0ZSA9IHsvL+WfuuehgOi0tOWbvlxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZUZyYW1lLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmNvc3QgPSAyMDsvL+i0ueeUqFxuICAgICAgICB0aGlzLnR5cGUgPSAxOy8v57G75Z6LXG4gICAgICAgIHRoaXMuZGVzYyA9IFwiXCI7Ly/or7TmmI5cbiAgICAgICAgdGhpcy50aXRsZT1cIlwiOy8v5Y2h54mM5ZCN56ewXG4gICAgICAgIHRoaXMuZGFtYWdlPTM7Ly/kvKTlrrPlgLxcbiAgICB9XG5cbiAgICBzZW5kRWZmZWN0KCl7XG4gICAgICAgIHJldHVybiB0aGlzLmRhbWFnZTtcbiAgICB9XG59Il19