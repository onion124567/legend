
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/beans/StatusBean.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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

    this.type = _Game.StatusType.ROUNDBEGIN; //状态类型 1回合开始结算 2出牌是结算 3弃牌时结算 4回合结束时结算 5敌方回合结算
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL2JlYW5zL1N0YXR1c0JlYW4uanMiXSwibmFtZXMiOlsiU3RhdHVzQmVhbiIsImlkIiwibGV2ZWwiLCJzcHJpdGUiLCJ0eXBlIiwiY2MiLCJTcHJpdGVGcmFtZSIsInJvdW5kIiwiU3RhdHVzVHlwZSIsIlJPVU5EQkVHSU4iLCJvcGVyYXRlU3RhdHVzIiwicm91bmR0eXBlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztJQUdxQkE7QUFDakIsd0JBQWM7QUFDVixTQUFLQyxFQUFMLEdBQVUsQ0FBQyxDQUFYO0FBQ0EsU0FBS0MsS0FBTCxHQUFhLENBQUMsQ0FBZDtBQUNBLFNBQUtDLE1BQUwsR0FBYztBQUFDO0FBQ1gsaUJBQVMsSUFEQztBQUVWQyxNQUFBQSxJQUFJLEVBQUVDLEVBQUUsQ0FBQ0M7QUFGQyxLQUFkO0FBSUEsU0FBS0MsS0FBTCxHQUFhLENBQUMsQ0FBZCxDQVBVLENBT007O0FBQ2hCLFNBQUtILElBQUwsR0FBWUksaUJBQVdDLFVBQXZCLENBUlUsQ0FRd0I7QUFDckM7QUFFRDs7Ozs7OztTQUdBQyxnQkFBQSx1QkFBY0MsU0FBZCxFQUF3QjtBQUNwQixRQUFHQSxTQUFTLEtBQUcsS0FBS1AsSUFBcEIsRUFBeUI7QUFDckIsYUFBTyxJQUFQO0FBQ0gsS0FGRCxNQUVNO0FBQ0YsYUFBTyxLQUFQO0FBQ0g7QUFDSiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtTdGF0dXNUeXBlfSBmcm9tIFwiLi4vR2FtZVwiO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0YXR1c0JlYW4ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmlkID0gLTE7XG4gICAgICAgIHRoaXMubGV2ZWwgPSAtMTtcbiAgICAgICAgdGhpcy5zcHJpdGUgPSB7Ly/ln7rnoYDotLTlm75cbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGVGcmFtZSxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5yb3VuZCA9IC0xOy8v6LS555SoXG4gICAgICAgIHRoaXMudHlwZSA9IFN0YXR1c1R5cGUuUk9VTkRCRUdJTjsvL+eKtuaAgeexu+WeiyAx5Zue5ZCI5byA5aeL57uT566XIDLlh7rniYzmmK/nu5PnrpcgM+W8g+eJjOaXtue7k+eulyA05Zue5ZCI57uT5p2f5pe257uT566XIDXmlYzmlrnlm57lkIjnu5PnrpdcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDnu5PnrpfnirbmgIFcbiAgICAgKi9cbiAgICBvcGVyYXRlU3RhdHVzKHJvdW5kdHlwZSl7XG4gICAgICAgIGlmKHJvdW5kdHlwZT09PXRoaXMudHlwZSl7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG59Il19