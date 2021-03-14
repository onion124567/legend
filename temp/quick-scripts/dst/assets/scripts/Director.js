
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/Director.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '92036gCkblIs7Hs6LmBBYIQ', 'Director');
// scripts/Director.js

"use strict";

exports.__esModule = true;
exports["default"] = void 0;

/**
 * 导演类 控制整体流程
 * 游戏资源
 * 人气  与食物味道线性相关 与舒适度及服务水平乘系数关系
 * 客流量 实际来店人数，和人气成正比 受餐桌数量限制
 * 金币   雇佣厨师，购买食材等
 * 行动值 每天自动补全6次，随机事件选择，产生其他资源
 */
var Director = /*#__PURE__*/function () {
  function Director() {
    this.status = null;
    Director.hostHero = {
      lv: 1,
      hp: 20,
      fullhp: 20,
      experience: 60
    };
  } //每个关键节点调用


  var _proto = Director.prototype;

  _proto.saveData = function saveData() {
    cc.sys.localStorage.setItem('userData', JSON.stringify(Director.hostHero));
  } //游戏启动调用
  ;

  _proto.loadData = function loadData() {
    var userData = cc.sys.localStorage.getItem('userData');
    Director.hostHero = JSON.parse(userData);
  };

  return Director;
}();

exports["default"] = Director;
Director.hostHero = null;
Director.currentEnemy = null;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL0RpcmVjdG9yLmpzIl0sIm5hbWVzIjpbIkRpcmVjdG9yIiwic3RhdHVzIiwiaG9zdEhlcm8iLCJsdiIsImhwIiwiZnVsbGhwIiwiZXhwZXJpZW5jZSIsInNhdmVEYXRhIiwiY2MiLCJzeXMiLCJsb2NhbFN0b3JhZ2UiLCJzZXRJdGVtIiwiSlNPTiIsInN0cmluZ2lmeSIsImxvYWREYXRhIiwidXNlckRhdGEiLCJnZXRJdGVtIiwicGFyc2UiLCJjdXJyZW50RW5lbXkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7O0lBUXFCQTtBQUlqQixzQkFBYztBQUNWLFNBQUtDLE1BQUwsR0FBYyxJQUFkO0FBQ0FELElBQUFBLFFBQVEsQ0FBQ0UsUUFBVCxHQUFvQjtBQUNoQkMsTUFBQUEsRUFBRSxFQUFFLENBRFk7QUFFaEJDLE1BQUFBLEVBQUUsRUFBRSxFQUZZO0FBR2hCQyxNQUFBQSxNQUFNLEVBQUUsRUFIUTtBQUloQkMsTUFBQUEsVUFBVSxFQUFFO0FBSkksS0FBcEI7QUFNSCxJQUdEOzs7OztTQUNBQyxXQUFBLG9CQUFXO0FBQ1BDLElBQUFBLEVBQUUsQ0FBQ0MsR0FBSCxDQUFPQyxZQUFQLENBQW9CQyxPQUFwQixDQUE0QixVQUE1QixFQUF3Q0MsSUFBSSxDQUFDQyxTQUFMLENBQWViLFFBQVEsQ0FBQ0UsUUFBeEIsQ0FBeEM7QUFDSCxJQUVEOzs7U0FDQVksV0FBQSxvQkFBVztBQUNQLFFBQUlDLFFBQVEsR0FBR1AsRUFBRSxDQUFDQyxHQUFILENBQU9DLFlBQVAsQ0FBb0JNLE9BQXBCLENBQTRCLFVBQTVCLENBQWY7QUFDQWhCLElBQUFBLFFBQVEsQ0FBQ0UsUUFBVCxHQUFvQlUsSUFBSSxDQUFDSyxLQUFMLENBQVdGLFFBQVgsQ0FBcEI7QUFDSDs7Ozs7O0FBeEJnQmYsU0FDVkUsV0FBVztBQURERixTQUVWa0IsZUFBYSIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiDlr7zmvJTnsbsg5o6n5Yi25pW05L2T5rWB56iLXG4gKiDmuLjmiI/otYTmupBcbiAqIOS6uuawlCAg5LiO6aOf54mp5ZGz6YGT57q/5oCn55u45YWzIOS4juiIkumAguW6puWPiuacjeWKoeawtOW5s+S5mOezu+aVsOWFs+ezu1xuICog5a6i5rWB6YePIOWunumZheadpeW6l+S6uuaVsO+8jOWSjOS6uuawlOaIkOato+avlCDlj5fppJDmoYzmlbDph4/pmZDliLZcbiAqIOmHkeW4gSAgIOmbh+S9o+WOqOW4iO+8jOi0reS5sOmjn+adkOetiVxuICog6KGM5Yqo5YC8IOavj+WkqeiHquWKqOihpeWFqDbmrKHvvIzpmo/mnLrkuovku7bpgInmi6nvvIzkuqfnlJ/lhbbku5botYTmupBcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGlyZWN0b3Ige1xuICAgIHN0YXRpYyBob3N0SGVybyA9IG51bGw7XG4gICAgc3RhdGljIGN1cnJlbnRFbmVteT1udWxsO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuc3RhdHVzID0gbnVsbDtcbiAgICAgICAgRGlyZWN0b3IuaG9zdEhlcm8gPSB7XG4gICAgICAgICAgICBsdjogMSxcbiAgICAgICAgICAgIGhwOiAyMCxcbiAgICAgICAgICAgIGZ1bGxocDogMjAsXG4gICAgICAgICAgICBleHBlcmllbmNlOiA2MCxcbiAgICAgICAgfTtcbiAgICB9XG5cblxuICAgIC8v5q+P5Liq5YWz6ZSu6IqC54K56LCD55SoXG4gICAgc2F2ZURhdGEoKSB7XG4gICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndXNlckRhdGEnLCBKU09OLnN0cmluZ2lmeShEaXJlY3Rvci5ob3N0SGVybykpO1xuICAgIH1cblxuICAgIC8v5ri45oiP5ZCv5Yqo6LCD55SoXG4gICAgbG9hZERhdGEoKSB7XG4gICAgICAgIGxldCB1c2VyRGF0YSA9IGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndXNlckRhdGEnKTtcbiAgICAgICAgRGlyZWN0b3IuaG9zdEhlcm8gPSBKU09OLnBhcnNlKHVzZXJEYXRhKTtcbiAgICB9XG5cbn0iXX0=