
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/LogUtil.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '0a467lU1IdIZ51AsHS0q6W2', 'LogUtil');
// scripts/LogUtil.js

"use strict";

exports.__esModule = true;
exports["default"] = void 0;

//卡牌类型
//要素清单
var LogUtil = /*#__PURE__*/function () {
  function LogUtil() {}

  LogUtil.log = function log(tag, value) {
    print(tag + ":" + value);
  };

  LogUtil.error = function error(e) {
    print("onion" + e);
  };

  return LogUtil;
}();

exports["default"] = LogUtil;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL0xvZ1V0aWwuanMiXSwibmFtZXMiOlsiTG9nVXRpbCIsImxvZyIsInRhZyIsInZhbHVlIiwicHJpbnQiLCJlcnJvciIsImUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFFQTtJQUNxQkE7OztVQUVWQyxNQUFQLGFBQVdDLEdBQVgsRUFBZUMsS0FBZixFQUFxQjtBQUNqQkMsSUFBQUEsS0FBSyxDQUFJRixHQUFKLFNBQVdDLEtBQVgsQ0FBTDtBQUNIOztVQUNNRSxRQUFQLGVBQWFDLENBQWIsRUFBZTtBQUNYRixJQUFBQSxLQUFLLENBQUMsVUFBUUUsQ0FBVCxDQUFMO0FBQ0giLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8v5Y2h54mM57G75Z6LXG5cbi8v6KaB57Sg5riF5Y2VXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb2dVdGlsIHtcblxuICAgIHN0YXRpYyBsb2codGFnLHZhbHVlKXtcbiAgICAgICAgcHJpbnQoYCR7dGFnfToke3ZhbHVlfWApO1xuICAgIH1cbiAgICBzdGF0aWMgZXJyb3IoZSl7XG4gICAgICAgIHByaW50KFwib25pb25cIitlKTtcbiAgICB9XG5cbn0iXX0=