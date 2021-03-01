
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/Pokemon.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '99a402sc1VPQrwu+sHSIjU1', 'Pokemon');
// scripts/Pokemon.js

"use strict";

//战斗中的宝宝
cc.Class({
  "extends": cc.Component,
  properties: {
    id: "181",
    level: -1,
    round: -1,
    //剩余回合数
    sprite: {
      //基础贴图
      "default": null,
      type: cc.SpriteFrame
    },
    hp: 20 //血量

  },
  attack: function attack() {//触发自身的状态栏，输出伤害值，自身附加状态，敌方附加状态
  },
  underattack: function underattack() {//被攻击，触发自身状态栏，更改自身生命值，状态值
  },
  roundBegin: function roundBegin() {}
});

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL1Bva2Vtb24uanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJpZCIsImxldmVsIiwicm91bmQiLCJzcHJpdGUiLCJ0eXBlIiwiU3ByaXRlRnJhbWUiLCJocCIsImF0dGFjayIsInVuZGVyYXR0YWNrIiwicm91bmRCZWdpbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQTtBQUNBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUVMLGFBQVNELEVBQUUsQ0FBQ0UsU0FGUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsRUFBRSxFQUFDLEtBREs7QUFFUkMsSUFBQUEsS0FBSyxFQUFDLENBQUMsQ0FGQztBQUdSQyxJQUFBQSxLQUFLLEVBQUMsQ0FBQyxDQUhDO0FBR0M7QUFDVEMsSUFBQUEsTUFBTSxFQUFFO0FBQUM7QUFDTCxpQkFBUyxJQURMO0FBRUpDLE1BQUFBLElBQUksRUFBRVIsRUFBRSxDQUFDUztBQUZMLEtBSkE7QUFRUkMsSUFBQUEsRUFBRSxFQUFDLEVBUkssQ0FRRjs7QUFSRSxHQUhQO0FBZUxDLEVBQUFBLE1BZkssb0JBZUcsQ0FBQztBQUVSLEdBakJJO0FBa0JMQyxFQUFBQSxXQWxCSyx5QkFrQlEsQ0FBQztBQUViLEdBcEJJO0FBc0JMQyxFQUFBQSxVQXRCSyx3QkFzQk8sQ0FFWDtBQXhCSSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcbi8v5oiY5paX5Lit55qE5a6d5a6dXG5jYy5DbGFzcyh7XG5cbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBpZDpcIjE4MVwiLFxuICAgICAgICBsZXZlbDotMSxcbiAgICAgICAgcm91bmQ6LTEsLy/liankvZnlm57lkIjmlbBcbiAgICAgICAgc3ByaXRlOiB7Ly/ln7rnoYDotLTlm75cbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGVGcmFtZSxcbiAgICAgICAgfSxcbiAgICAgICAgaHA6MjAsLy/ooYDph49cblxuICAgIH0sXG5cbiAgICBhdHRhY2soKXsvL+inpuWPkeiHqui6q+eahOeKtuaAgeagj++8jOi+k+WHuuS8pOWus+WAvO+8jOiHqui6q+mZhOWKoOeKtuaAge+8jOaVjOaWuemZhOWKoOeKtuaAgVxuXG4gICAgfSxcbiAgICB1bmRlcmF0dGFjaygpey8v6KKr5pS75Ye777yM6Kem5Y+R6Ieq6Lqr54q25oCB5qCP77yM5pu05pS56Ieq6Lqr55Sf5ZG95YC877yM54q25oCB5YC8XG5cbiAgICB9LFxuXG4gICAgcm91bmRCZWdpbigpe1xuXG4gICAgfVxuXG5cblxufSk7Il19