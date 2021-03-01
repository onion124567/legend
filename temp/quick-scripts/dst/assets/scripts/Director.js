
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
  //引导模式 考虑是否加提示标
  //编辑模式，家具带碰撞体积，可删除摆放
  //游戏所进行的时间
  //本天剩余操作数
  //剩余金币
  //夜晚 试做新菜或 重新钻研旧菜，每个厨师每夜可执行一个，可有另一厨师协助.
  // 菜做好后会放到厨师的装备栏里，每个厨师可装备3个菜
  //准备阶段,调整厨师，经营计划，服务员数量，培训等
  //经营阶段店内,每天有6个抉择，可在店内帮工/监工
  //可采购、试吃、挖掘食材、闲逛、海边等等 也能碰到广告、厨师争霸及卫生检查等消息
  //关店阶段，经营结束后，出若干随机事件，跳槽，卫生检查，客人找茬等信息，多为告知类
  function Director() {
    this.status = null;
  }

  var _proto = Director.prototype;

  _proto.run = function run() {
    if (this.editMode) {}

    switch (this.status) {
      case Director.STATUS_NIGHT:
        Director.operateCount = 6;
        break;

      case Director.STATUS_READY:
        break;

      case Director.STATUS_BUSSINESS:
        Director.operateCount--;

        if (Director.operateCount === 0) {
          this.status = Director.STATUS_CLOSE;
        }

        break;

      case Director.STATUS_OUTER:
        Director.operateCount--;

        if (Director.operateCount === 0) {
          this.status = Director.STATUS_CLOSE;
          cc.director.loadScene('game');
        }

      case Director.STATUS_CLOSE:
        break;
    }
  } //每个关键节点调用
  ;

  _proto.saveData = function saveData() {
    var userData = {
      operateCount: Director.operateCount,
      day: 1,
      coin: 100,
      cookerList: [],
      popular: 100 //人气值

    };
    var sceneData = {
      floor: 1,
      sceneList: [{
        name: "大吊灯",
        pic: "xxx.png",
        type: 1,
        locationX: 2,
        floor: 1,
        area: 1,
        //占地面积 同type互斥
        influence: 4 //影响范围

      }]
    };
    cc.sys.localStorage.setItem('userData', JSON.stringify(userData));
  } //游戏启动调用
  ;

  _proto.loadData = function loadData() {
    var userData = cc.sys.localStorage.getItem('userData');
  };

  return Director;
}();

exports["default"] = Director;
Director.GUIDE_MODE = 1;
Director.editMode = 0;
Director.day = 0;
Director.operateCount = 6;
Director.coin = 0;
Director.STATUS_NIGHT = 1;
Director.STATUS_READY = 2;
Director.STATUS_BUSSINESS = 3;
Director.STATUS_OUTER = 4;
Director.STATUS_CLOSE = 5;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL0RpcmVjdG9yLmpzIl0sIm5hbWVzIjpbIkRpcmVjdG9yIiwic3RhdHVzIiwicnVuIiwiZWRpdE1vZGUiLCJTVEFUVVNfTklHSFQiLCJvcGVyYXRlQ291bnQiLCJTVEFUVVNfUkVBRFkiLCJTVEFUVVNfQlVTU0lORVNTIiwiU1RBVFVTX0NMT1NFIiwiU1RBVFVTX09VVEVSIiwiY2MiLCJkaXJlY3RvciIsImxvYWRTY2VuZSIsInNhdmVEYXRhIiwidXNlckRhdGEiLCJkYXkiLCJjb2luIiwiY29va2VyTGlzdCIsInBvcHVsYXIiLCJzY2VuZURhdGEiLCJmbG9vciIsInNjZW5lTGlzdCIsIm5hbWUiLCJwaWMiLCJ0eXBlIiwibG9jYXRpb25YIiwiYXJlYSIsImluZmx1ZW5jZSIsInN5cyIsImxvY2FsU3RvcmFnZSIsInNldEl0ZW0iLCJKU09OIiwic3RyaW5naWZ5IiwibG9hZERhdGEiLCJnZXRJdGVtIiwiR1VJREVfTU9ERSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7SUFRcUJBO0FBQ0k7QUFDRjtBQUNuQjtBQUVBO0FBRUE7QUFHQTtBQUNBO0FBRUE7QUFFQTtBQUVBO0FBRUE7QUFFQSxzQkFBYTtBQUNULFNBQUtDLE1BQUwsR0FBWSxJQUFaO0FBQ0g7Ozs7U0FFREMsTUFBQSxlQUFLO0FBQ0QsUUFBRyxLQUFLQyxRQUFSLEVBQWlCLENBRWhCOztBQUNELFlBQVEsS0FBS0YsTUFBYjtBQUNJLFdBQUtELFFBQVEsQ0FBQ0ksWUFBZDtBQUNJSixRQUFBQSxRQUFRLENBQUNLLFlBQVQsR0FBc0IsQ0FBdEI7QUFDQTs7QUFDSixXQUFLTCxRQUFRLENBQUNNLFlBQWQ7QUFDSTs7QUFDSixXQUFLTixRQUFRLENBQUNPLGdCQUFkO0FBQ0lQLFFBQUFBLFFBQVEsQ0FBQ0ssWUFBVDs7QUFDQSxZQUFHTCxRQUFRLENBQUNLLFlBQVQsS0FBd0IsQ0FBM0IsRUFBNkI7QUFDekIsZUFBS0osTUFBTCxHQUFZRCxRQUFRLENBQUNRLFlBQXJCO0FBQ0g7O0FBQ0Q7O0FBQ0osV0FBS1IsUUFBUSxDQUFDUyxZQUFkO0FBQ0lULFFBQUFBLFFBQVEsQ0FBQ0ssWUFBVDs7QUFDQSxZQUFHTCxRQUFRLENBQUNLLFlBQVQsS0FBd0IsQ0FBM0IsRUFBNkI7QUFDekIsZUFBS0osTUFBTCxHQUFZRCxRQUFRLENBQUNRLFlBQXJCO0FBQ0FFLFVBQUFBLEVBQUUsQ0FBQ0MsUUFBSCxDQUFZQyxTQUFaLENBQXNCLE1BQXRCO0FBQ0g7O0FBQ0wsV0FBS1osUUFBUSxDQUFDUSxZQUFkO0FBQ0k7QUFuQlI7QUFxQkgsSUFFRDs7O1NBQ0FLLFdBQUEsb0JBQVU7QUFDTixRQUFJQyxRQUFRLEdBQUc7QUFDWFQsTUFBQUEsWUFBWSxFQUFFTCxRQUFRLENBQUNLLFlBRFo7QUFFWFUsTUFBQUEsR0FBRyxFQUFFLENBRk07QUFHWEMsTUFBQUEsSUFBSSxFQUFFLEdBSEs7QUFJWEMsTUFBQUEsVUFBVSxFQUFDLEVBSkE7QUFLWEMsTUFBQUEsT0FBTyxFQUFDLEdBTEcsQ0FLQzs7QUFMRCxLQUFmO0FBT0EsUUFBSUMsU0FBUyxHQUFDO0FBQ1ZDLE1BQUFBLEtBQUssRUFBQyxDQURJO0FBRVZDLE1BQUFBLFNBQVMsRUFBQyxDQUNOO0FBQ0lDLFFBQUFBLElBQUksRUFBQyxLQURUO0FBRUlDLFFBQUFBLEdBQUcsRUFBQyxTQUZSO0FBR0lDLFFBQUFBLElBQUksRUFBQyxDQUhUO0FBSUlDLFFBQUFBLFNBQVMsRUFBQyxDQUpkO0FBS0lMLFFBQUFBLEtBQUssRUFBQyxDQUxWO0FBTUlNLFFBQUFBLElBQUksRUFBQyxDQU5UO0FBTVc7QUFDUEMsUUFBQUEsU0FBUyxFQUFDLENBUGQsQ0FPZ0I7O0FBUGhCLE9BRE07QUFGQSxLQUFkO0FBaUJBakIsSUFBQUEsRUFBRSxDQUFDa0IsR0FBSCxDQUFPQyxZQUFQLENBQW9CQyxPQUFwQixDQUE0QixVQUE1QixFQUF3Q0MsSUFBSSxDQUFDQyxTQUFMLENBQWVsQixRQUFmLENBQXhDO0FBQ0gsSUFDRDs7O1NBQ0FtQixXQUFBLG9CQUFVO0FBQ1AsUUFBSW5CLFFBQVEsR0FBRUosRUFBRSxDQUFDa0IsR0FBSCxDQUFPQyxZQUFQLENBQW9CSyxPQUFwQixDQUE0QixVQUE1QixDQUFkO0FBQ0Y7Ozs7OztBQW5GZ0JsQyxTQUNUbUMsYUFBVztBQURGbkMsU0FFVEcsV0FBUztBQUZBSCxTQUlWZSxNQUFJO0FBSk1mLFNBTVZLLGVBQWE7QUFOSEwsU0FRVmdCLE9BQUs7QUFSS2hCLFNBWVZJLGVBQWE7QUFaSEosU0FjVk0sZUFBYTtBQWRITixTQWdCVk8sbUJBQWlCO0FBaEJQUCxTQWtCVlMsZUFBYTtBQWxCSFQsU0FvQlZRLGVBQWEiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxuLyoqXG4gKiDlr7zmvJTnsbsg5o6n5Yi25pW05L2T5rWB56iLXG4gKiDmuLjmiI/otYTmupBcbiAqIOS6uuawlCAg5LiO6aOf54mp5ZGz6YGT57q/5oCn55u45YWzIOS4juiIkumAguW6puWPiuacjeWKoeawtOW5s+S5mOezu+aVsOWFs+ezu1xuICog5a6i5rWB6YePIOWunumZheadpeW6l+S6uuaVsO+8jOWSjOS6uuawlOaIkOato+avlCDlj5fppJDmoYzmlbDph4/pmZDliLZcbiAqIOmHkeW4gSAgIOmbh+S9o+WOqOW4iO+8jOi0reS5sOmjn+adkOetiVxuICog6KGM5Yqo5YC8IOavj+WkqeiHquWKqOihpeWFqDbmrKHvvIzpmo/mnLrkuovku7bpgInmi6nvvIzkuqfnlJ/lhbbku5botYTmupBcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGlyZWN0b3J7XG4gICAgc3RhdGljICBHVUlERV9NT0RFPTE7Ly/lvJXlr7zmqKHlvI8g6ICD6JmR5piv5ZCm5Yqg5o+Q56S65qCHXG4gICAgc3RhdGljICBlZGl0TW9kZT0wOy8v57yW6L6R5qih5byP77yM5a625YW35bim56Kw5pKe5L2T56ev77yM5Y+v5Yig6Zmk5pGG5pS+XG4gICAgLy/muLjmiI/miYDov5vooYznmoTml7bpl7RcbiAgICBzdGF0aWMgZGF5PTA7XG4gICAgLy/mnKzlpKnliankvZnmk43kvZzmlbBcbiAgICBzdGF0aWMgb3BlcmF0ZUNvdW50PTY7XG4gICAgLy/liankvZnph5HluIFcbiAgICBzdGF0aWMgY29pbj0wO1xuXG4gICAgLy/lpJzmmZog6K+V5YGa5paw6I+c5oiWIOmHjeaWsOmSu+eglOaXp+iPnO+8jOavj+S4quWOqOW4iOavj+WknOWPr+aJp+ihjOS4gOS4qu+8jOWPr+acieWPpuS4gOWOqOW4iOWNj+WKqS5cbiAgICAvLyDoj5zlgZrlpb3lkI7kvJrmlL7liLDljqjluIjnmoToo4XlpIfmoI/ph4zvvIzmr4/kuKrljqjluIjlj6/oo4XlpIcz5Liq6I+cXG4gICAgc3RhdGljIFNUQVRVU19OSUdIVD0xO1xuICAgIC8v5YeG5aSH6Zi25q61LOiwg+aVtOWOqOW4iO+8jOe7j+iQpeiuoeWIku+8jOacjeWKoeWRmOaVsOmHj++8jOWfueiureetiVxuICAgIHN0YXRpYyBTVEFUVVNfUkVBRFk9MjtcbiAgICAvL+e7j+iQpemYtuauteW6l+WGhSzmr4/lpKnmnIk25Liq5oqJ5oup77yM5Y+v5Zyo5bqX5YaF5biu5belL+ebkeW3pVxuICAgIHN0YXRpYyBTVEFUVVNfQlVTU0lORVNTPTM7XG4gICAgLy/lj6/ph4fotK3jgIHor5XlkIPjgIHmjJbmjpjpo5/mnZDjgIHpl7LpgJvjgIHmtbfovrnnrYnnrYkg5Lmf6IO956Kw5Yiw5bm/5ZGK44CB5Y6o5biI5LqJ6Zy45Y+K5Y2r55Sf5qOA5p+l562J5raI5oGvXG4gICAgc3RhdGljIFNUQVRVU19PVVRFUj00O1xuICAgIC8v5YWz5bqX6Zi25q6177yM57uP6JCl57uT5p2f5ZCO77yM5Ye66Iul5bmy6ZqP5py65LqL5Lu277yM6Lez5qe977yM5Y2r55Sf5qOA5p+l77yM5a6i5Lq65om+6Iys562J5L+h5oGv77yM5aSa5Li65ZGK55+l57G7XG4gICAgc3RhdGljIFNUQVRVU19DTE9TRT01O1xuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHRoaXMuc3RhdHVzPW51bGw7XG4gICAgfVxuXG4gICAgcnVuKCl7XG4gICAgICAgIGlmKHRoaXMuZWRpdE1vZGUpe1xuXG4gICAgICAgIH1cbiAgICAgICAgc3dpdGNoICh0aGlzLnN0YXR1cyl7XG4gICAgICAgICAgICBjYXNlIERpcmVjdG9yLlNUQVRVU19OSUdIVDpcbiAgICAgICAgICAgICAgICBEaXJlY3Rvci5vcGVyYXRlQ291bnQ9NjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgRGlyZWN0b3IuU1RBVFVTX1JFQURZOlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBEaXJlY3Rvci5TVEFUVVNfQlVTU0lORVNTOlxuICAgICAgICAgICAgICAgIERpcmVjdG9yLm9wZXJhdGVDb3VudC0tO1xuICAgICAgICAgICAgICAgIGlmKERpcmVjdG9yLm9wZXJhdGVDb3VudD09PTApe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXR1cz1EaXJlY3Rvci5TVEFUVVNfQ0xPU0U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBEaXJlY3Rvci5TVEFUVVNfT1VURVI6XG4gICAgICAgICAgICAgICAgRGlyZWN0b3Iub3BlcmF0ZUNvdW50LS07XG4gICAgICAgICAgICAgICAgaWYoRGlyZWN0b3Iub3BlcmF0ZUNvdW50PT09MCl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdHVzPURpcmVjdG9yLlNUQVRVU19DTE9TRTtcbiAgICAgICAgICAgICAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKCdnYW1lJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSBEaXJlY3Rvci5TVEFUVVNfQ0xPU0U6XG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8v5q+P5Liq5YWz6ZSu6IqC54K56LCD55SoXG4gICAgc2F2ZURhdGEoKXtcbiAgICAgICAgbGV0IHVzZXJEYXRhID0ge1xuICAgICAgICAgICAgb3BlcmF0ZUNvdW50OiBEaXJlY3Rvci5vcGVyYXRlQ291bnQsXG4gICAgICAgICAgICBkYXk6IDEsXG4gICAgICAgICAgICBjb2luOiAxMDAsXG4gICAgICAgICAgICBjb29rZXJMaXN0OltdLFxuICAgICAgICAgICAgcG9wdWxhcjoxMDAsLy/kurrmsJTlgLxcbiAgICAgICAgfTtcbiAgICAgICAgbGV0IHNjZW5lRGF0YT17XG4gICAgICAgICAgICBmbG9vcjoxLFxuICAgICAgICAgICAgc2NlbmVMaXN0OltcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6XCLlpKflkIrnga9cIixcbiAgICAgICAgICAgICAgICAgICAgcGljOlwieHh4LnBuZ1wiLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOjEsXG4gICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uWDoyLFxuICAgICAgICAgICAgICAgICAgICBmbG9vcjoxLFxuICAgICAgICAgICAgICAgICAgICBhcmVhOjEsLy/ljaDlnLDpnaLnp68g5ZCMdHlwZeS6kuaWpVxuICAgICAgICAgICAgICAgICAgICBpbmZsdWVuY2U6NCwvL+W9seWTjeiMg+WbtFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cblxuICAgICAgICB9O1xuXG5cbiAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKCd1c2VyRGF0YScsIEpTT04uc3RyaW5naWZ5KHVzZXJEYXRhKSk7XG4gICAgfVxuICAgIC8v5ri45oiP5ZCv5Yqo6LCD55SoXG4gICAgbG9hZERhdGEoKXtcbiAgICAgICBsZXQgdXNlckRhdGE9IGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndXNlckRhdGEnKTtcbiAgICB9XG5cbn0iXX0=