
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/ConstantConfig.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '96c6fcoYdNCH5JDfnTwbPcM', 'ConstantConfig');
// scripts/ConstantConfig.js

"use strict";

exports.__esModule = true;
exports["default"] = exports.GameSubKind = exports.GameMainKind = exports.AttackFileType = exports.CardType = void 0;
//卡牌类型
var CardType = {
  ATTACK: 0,
  //攻击牌
  ACTION: 1,
  //技能牌
  SOURCE: 2,
  //资源牌
  CALL: 3,
  //召唤牌
  EQUI: 4 //装备牌

}; //攻击牌种类

exports.CardType = CardType;
var AttackFileType = {
  //招式类型  剑功力 法阵仙 术咒鬼
  SWORD: 1,
  //剑
  SKILL: 2,
  //功
  POWER: 3,
  //力
  METHOD: 4,
  //法
  FRON: 5,
  //阵
  FAIRY: 6,
  //仙
  MAGIC: 7,
  //术
  MANTRA: 8,
  //咒
  GHOST: 9 //鬼

}; //主属性 人 阴 阳

exports.AttackFileType = AttackFileType;
var GameMainKind = {
  HUMAN: 1,
  YIN: 2,
  YANG: 3
}; //次属性 木 火 水 雷 风

exports.GameMainKind = GameMainKind;
var GameSubKind = {
  WOOD: 1,
  FIRE: 2,
  WATER: 3,
  THUNDER: 4,
  WIND: 5
}; //要素清单

exports.GameSubKind = GameSubKind;

var ConstantConfig = function ConstantConfig() {};

exports["default"] = ConstantConfig;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL0NvbnN0YW50Q29uZmlnLmpzIl0sIm5hbWVzIjpbIkNhcmRUeXBlIiwiQVRUQUNLIiwiQUNUSU9OIiwiU09VUkNFIiwiQ0FMTCIsIkVRVUkiLCJBdHRhY2tGaWxlVHlwZSIsIlNXT1JEIiwiU0tJTEwiLCJQT1dFUiIsIk1FVEhPRCIsIkZST04iLCJGQUlSWSIsIk1BR0lDIiwiTUFOVFJBIiwiR0hPU1QiLCJHYW1lTWFpbktpbmQiLCJIVU1BTiIsIllJTiIsIllBTkciLCJHYW1lU3ViS2luZCIsIldPT0QiLCJGSVJFIiwiV0FURVIiLCJUSFVOREVSIiwiV0lORCIsIkNvbnN0YW50Q29uZmlnIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDTyxJQUFJQSxRQUFRLEdBQUc7QUFDbEJDLEVBQUFBLE1BQU0sRUFBRSxDQURVO0FBQ1I7QUFDVkMsRUFBQUEsTUFBTSxFQUFFLENBRlU7QUFFUjtBQUNWQyxFQUFBQSxNQUFNLEVBQUUsQ0FIVTtBQUdSO0FBQ1ZDLEVBQUFBLElBQUksRUFBQyxDQUphO0FBSVg7QUFDUEMsRUFBQUEsSUFBSSxFQUFDLENBTGEsQ0FLWDs7QUFMVyxDQUFmLEVBUVA7OztBQUNPLElBQUlDLGNBQWMsR0FBRztBQUFDO0FBQ3pCQyxFQUFBQSxLQUFLLEVBQUUsQ0FEaUI7QUFDZjtBQUNUQyxFQUFBQSxLQUFLLEVBQUUsQ0FGaUI7QUFFZjtBQUNUQyxFQUFBQSxLQUFLLEVBQUUsQ0FIaUI7QUFHZjtBQUNUQyxFQUFBQSxNQUFNLEVBQUMsQ0FKaUI7QUFJZjtBQUNUQyxFQUFBQSxJQUFJLEVBQUMsQ0FMbUI7QUFLakI7QUFDUEMsRUFBQUEsS0FBSyxFQUFDLENBTmtCO0FBTWhCO0FBQ1JDLEVBQUFBLEtBQUssRUFBQyxDQVBrQjtBQU9oQjtBQUNSQyxFQUFBQSxNQUFNLEVBQUMsQ0FSaUI7QUFRZjtBQUNUQyxFQUFBQSxLQUFLLEVBQUMsQ0FUa0IsQ0FTaEI7O0FBVGdCLENBQXJCLEVBV1A7OztBQUNPLElBQUlDLFlBQVksR0FBQztBQUNwQkMsRUFBQUEsS0FBSyxFQUFDLENBRGM7QUFFcEJDLEVBQUFBLEdBQUcsRUFBQyxDQUZnQjtBQUdwQkMsRUFBQUEsSUFBSSxFQUFDO0FBSGUsQ0FBakIsRUFLUDs7O0FBQ08sSUFBSUMsV0FBVyxHQUFDO0FBQ25CQyxFQUFBQSxJQUFJLEVBQUMsQ0FEYztBQUVuQkMsRUFBQUEsSUFBSSxFQUFDLENBRmM7QUFHbkJDLEVBQUFBLEtBQUssRUFBQyxDQUhhO0FBSW5CQyxFQUFBQSxPQUFPLEVBQUMsQ0FKVztBQUtuQkMsRUFBQUEsSUFBSSxFQUFDO0FBTGMsQ0FBaEIsRUFPUDs7OztJQUNxQkMiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8v5Y2h54mM57G75Z6LXG5leHBvcnQgdmFyIENhcmRUeXBlID0ge1xuICAgIEFUVEFDSzogMCwvL+aUu+WHu+eJjFxuICAgIEFDVElPTjogMSwvL+aKgOiDveeJjFxuICAgIFNPVVJDRTogMiwvL+i1hOa6kOeJjFxuICAgIENBTEw6MywvL+WPrOWUpOeJjFxuICAgIEVRVUk6NCwvL+ijheWkh+eJjFxuXG59XG4vL+aUu+WHu+eJjOenjeexu1xuZXhwb3J0IHZhciBBdHRhY2tGaWxlVHlwZSA9IHsvL+aLm+W8j+exu+WeiyAg5YmR5Yqf5YqbIOazlemYteS7mSDmnK/lkpLprLxcbiAgICBTV09SRDogMSwvL+WJkVxuICAgIFNLSUxMOiAyLC8v5YqfXG4gICAgUE9XRVI6IDMsLy/liptcbiAgICBNRVRIT0Q6NCwvL+azlVxuICAgIEZST046NSwvL+mYtVxuICAgIEZBSVJZOjYsLy/ku5lcbiAgICBNQUdJQzo3LC8v5pyvXG4gICAgTUFOVFJBOjgsLy/lkpJcbiAgICBHSE9TVDo5LC8v6ay8XG59XG4vL+S4u+WxnuaApyDkurog6Zi0IOmYs1xuZXhwb3J0IHZhciBHYW1lTWFpbktpbmQ9e1xuICAgIEhVTUFOOjEsXG4gICAgWUlOOjIsXG4gICAgWUFORzozLFxufVxuLy/mrKHlsZ7mgKcg5pyoIOeBqyDmsLQg6Zu3IOmjjlxuZXhwb3J0IHZhciBHYW1lU3ViS2luZD17XG4gICAgV09PRDoxLFxuICAgIEZJUkU6MixcbiAgICBXQVRFUjozLFxuICAgIFRIVU5ERVI6NCxcbiAgICBXSU5EOjUsXG59XG4vL+imgee0oOa4heWNlVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29uc3RhbnRDb25maWcge1xuXG59Il19