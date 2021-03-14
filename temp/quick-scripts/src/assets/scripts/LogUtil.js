"use strict";
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