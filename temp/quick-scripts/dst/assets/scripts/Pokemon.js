
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

var _PokemonBean = _interopRequireDefault(require("./beans/PokemonBean"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//战斗中的宝宝
cc.Class({
  "extends": cc.Component,
  properties: {
    id: "181",
    pokenBean: new _PokemonBean["default"](),
    level: -1,
    round: -1,
    //剩余回合数
    sprite: {
      //基础贴图
      "default": null,
      type: cc.Sprite
    },
    hp: 20,
    //血量
    hpLabel: {
      "default": null,
      type: cc.Label
    },
    //技能可用
    actionEable: 1
  },
  attack: function attack() {
    //触发自身的状态栏，输出伤害值，自身附加状态，敌方附加状态
    this.actionEable = 1;
  },
  underattack: function underattack(value) {
    //被攻击，触发自身状态栏，更改自身生命值，状态值
    this.hp = this.hp - value;
  },
  //每回合可点一次，宝宝技能。在宝宝攻击后恢复
  action: function action() {
    if (this.actionEable === 1) {
      this.actionEable = 0;
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL1Bva2Vtb24uanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJpZCIsInBva2VuQmVhbiIsIlBva2Vtb25CZWFuIiwibGV2ZWwiLCJyb3VuZCIsInNwcml0ZSIsInR5cGUiLCJTcHJpdGUiLCJocCIsImhwTGFiZWwiLCJMYWJlbCIsImFjdGlvbkVhYmxlIiwiYXR0YWNrIiwidW5kZXJhdHRhY2siLCJ2YWx1ZSIsImFjdGlvbiIsInJvdW5kQmVnaW4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUE7Ozs7QUFEQTtBQUdBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUVMLGFBQVNELEVBQUUsQ0FBQ0UsU0FGUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsRUFBRSxFQUFDLEtBREs7QUFFUkMsSUFBQUEsU0FBUyxFQUFDLElBQUlDLHVCQUFKLEVBRkY7QUFHUkMsSUFBQUEsS0FBSyxFQUFDLENBQUMsQ0FIQztBQUlSQyxJQUFBQSxLQUFLLEVBQUMsQ0FBQyxDQUpDO0FBSUM7QUFDVEMsSUFBQUEsTUFBTSxFQUFFO0FBQUM7QUFDTCxpQkFBUyxJQURMO0FBRUpDLE1BQUFBLElBQUksRUFBRVYsRUFBRSxDQUFDVztBQUZMLEtBTEE7QUFTUkMsSUFBQUEsRUFBRSxFQUFDLEVBVEs7QUFTRjtBQUNOQyxJQUFBQSxPQUFPLEVBQUM7QUFDSixpQkFBUSxJQURKO0FBRUpILE1BQUFBLElBQUksRUFBQ1YsRUFBRSxDQUFDYztBQUZKLEtBVkE7QUFlUjtBQUNBQyxJQUFBQSxXQUFXLEVBQUM7QUFoQkosR0FIUDtBQXVCTEMsRUFBQUEsTUF2Qkssb0JBdUJHO0FBQUM7QUFDTCxTQUFLRCxXQUFMLEdBQWlCLENBQWpCO0FBRUgsR0ExQkk7QUE0QkxFLEVBQUFBLFdBNUJLLHVCQTRCT0MsS0E1QlAsRUE0QmE7QUFBQztBQUNmLFNBQUtOLEVBQUwsR0FBUSxLQUFLQSxFQUFMLEdBQVFNLEtBQWhCO0FBRUgsR0EvQkk7QUFpQ0w7QUFDQUMsRUFBQUEsTUFsQ0ssb0JBa0NHO0FBQ0osUUFBRyxLQUFLSixXQUFMLEtBQW1CLENBQXRCLEVBQXdCO0FBRXBCLFdBQUtBLFdBQUwsR0FBaUIsQ0FBakI7QUFDSDtBQUVKLEdBeENJO0FBMkNMSyxFQUFBQSxVQTNDSyx3QkEyQ08sQ0FFWDtBQTdDSSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcbi8v5oiY5paX5Lit55qE5a6d5a6dXG5pbXBvcnQgUG9rZW1vbkJlYW4gZnJvbSBcIi4vYmVhbnMvUG9rZW1vbkJlYW5cIjtcblxuY2MuQ2xhc3Moe1xuXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgaWQ6XCIxODFcIixcbiAgICAgICAgcG9rZW5CZWFuOm5ldyBQb2tlbW9uQmVhbigpLFxuICAgICAgICBsZXZlbDotMSxcbiAgICAgICAgcm91bmQ6LTEsLy/liankvZnlm57lkIjmlbBcbiAgICAgICAgc3ByaXRlOiB7Ly/ln7rnoYDotLTlm75cbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGUsXG4gICAgICAgIH0sXG4gICAgICAgIGhwOjIwLC8v6KGA6YePXG4gICAgICAgIGhwTGFiZWw6e1xuICAgICAgICAgICAgZGVmYXVsdDpudWxsLFxuICAgICAgICAgICAgdHlwZTpjYy5MYWJlbCxcbiAgICAgICAgfSxcblxuICAgICAgICAvL+aKgOiDveWPr+eUqFxuICAgICAgICBhY3Rpb25FYWJsZToxLFxuXG4gICAgfSxcblxuICAgIGF0dGFjaygpey8v6Kem5Y+R6Ieq6Lqr55qE54q25oCB5qCP77yM6L6T5Ye65Lyk5a6z5YC877yM6Ieq6Lqr6ZmE5Yqg54q25oCB77yM5pWM5pa56ZmE5Yqg54q25oCBXG4gICAgICAgIHRoaXMuYWN0aW9uRWFibGU9MTtcblxuICAgIH0sXG5cbiAgICB1bmRlcmF0dGFjayh2YWx1ZSl7Ly/ooqvmlLvlh7vvvIzop6blj5Hoh6rouqvnirbmgIHmoI/vvIzmm7TmlLnoh6rouqvnlJ/lkb3lgLzvvIznirbmgIHlgLxcbiAgICAgICAgdGhpcy5ocD10aGlzLmhwLXZhbHVlO1xuXG4gICAgfSxcblxuICAgIC8v5q+P5Zue5ZCI5Y+v54K55LiA5qyh77yM5a6d5a6d5oqA6IO944CC5Zyo5a6d5a6d5pS75Ye75ZCO5oGi5aSNXG4gICAgYWN0aW9uKCl7XG4gICAgICAgIGlmKHRoaXMuYWN0aW9uRWFibGU9PT0xKXtcblxuICAgICAgICAgICAgdGhpcy5hY3Rpb25FYWJsZT0wO1xuICAgICAgICB9XG5cbiAgICB9LFxuXG5cbiAgICByb3VuZEJlZ2luKCl7XG5cbiAgICB9XG5cblxuXG59KTsiXX0=