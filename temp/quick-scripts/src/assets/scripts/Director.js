"use strict";
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