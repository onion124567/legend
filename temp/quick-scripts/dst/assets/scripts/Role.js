
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/Role.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f3b569HznVA0IJoh1Shylrp', 'Role');
// scripts/Role.js

"use strict";

var _RoleBean = _interopRequireDefault(require("./beans/RoleBean"));

var _Game = require("./Game");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * 战斗中的角色 敌我双方
 * 显示逻辑层的脚本
 */
cc.Class({
  "extends": cc.Component,
  properties: {
    roleBean: new _RoleBean["default"](),
    level: -1,
    cardlist: [],
    //总手牌
    // currentcardArrays:[],//当前手牌
    sprite: {
      //基础贴图
      "default": null,
      type: cc.Sprite
    },
    hpLabel: {
      "default": null,
      type: cc.Label
    },
    //血量
    descLabel: {
      "default": null,
      type: cc.Label
    },
    statuslist: [] //状态数组

  },
  attack: function attack(value) {
    //触发自身的状态栏，输出伤害值，自身附加状态，敌方附加状态
    return value;
  },
  underattack: function underattack(value) {
    //被攻击，触发自身状态栏，更改自身生命值，状态值
    var hp = this.roleBean.getRoleHp();
    hp = parseInt(hp);
    hp = hp - value;

    if (hp < 0) {
      hp = 0;
    }

    this.roleBean.setRoleHp(hp);
    this.hpLabel.string = this.roleBean.getRoleHp();
    return hp > 0;
  },
  //找到需要触发的状态节点，并触发
  roundBegin: function roundBegin() {
    for (var i = 0; i < this.statuslist.length; i++) {
      this.statuslist[i].operateStatus(_Game.StatusType.ROUNDBEGIN);
    }
  },
  roundOver: function roundOver() {},
  //战斗开始 类似祝福状态 直接触发并消耗
  encounter: function encounter() {},
  bindRoleBean: function bindRoleBean(role) {
    this.roleBean = role;
    this.hpLabel.string = role.getRoleHp() + "";
  },
  //返回效果
  onDrawCard: function onDrawCard(cardBean) {}
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL1JvbGUuanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJyb2xlQmVhbiIsIlJvbGVCZWFuIiwibGV2ZWwiLCJjYXJkbGlzdCIsInNwcml0ZSIsInR5cGUiLCJTcHJpdGUiLCJocExhYmVsIiwiTGFiZWwiLCJkZXNjTGFiZWwiLCJzdGF0dXNsaXN0IiwiYXR0YWNrIiwidmFsdWUiLCJ1bmRlcmF0dGFjayIsImhwIiwiZ2V0Um9sZUhwIiwicGFyc2VJbnQiLCJzZXRSb2xlSHAiLCJzdHJpbmciLCJyb3VuZEJlZ2luIiwiaSIsImxlbmd0aCIsIm9wZXJhdGVTdGF0dXMiLCJTdGF0dXNUeXBlIiwiUk9VTkRCRUdJTiIsInJvdW5kT3ZlciIsImVuY291bnRlciIsImJpbmRSb2xlQmVhbiIsInJvbGUiLCJvbkRyYXdDYXJkIiwiY2FyZEJlYW4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7QUFFQTs7OztBQUtBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUVMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsUUFBUSxFQUFDLElBQUlDLG9CQUFKLEVBREQ7QUFFUkMsSUFBQUEsS0FBSyxFQUFDLENBQUMsQ0FGQztBQUdSQyxJQUFBQSxRQUFRLEVBQUMsRUFIRDtBQUdJO0FBQ1o7QUFDQUMsSUFBQUEsTUFBTSxFQUFFO0FBQUM7QUFDTCxpQkFBUyxJQURMO0FBRUpDLE1BQUFBLElBQUksRUFBRVQsRUFBRSxDQUFDVTtBQUZMLEtBTEE7QUFTUkMsSUFBQUEsT0FBTyxFQUFDO0FBQ0osaUJBQVEsSUFESjtBQUVKRixNQUFBQSxJQUFJLEVBQUNULEVBQUUsQ0FBQ1k7QUFGSixLQVRBO0FBWU47QUFDRkMsSUFBQUEsU0FBUyxFQUFDO0FBQ04saUJBQVEsSUFERjtBQUVOSixNQUFBQSxJQUFJLEVBQUNULEVBQUUsQ0FBQ1k7QUFGRixLQWJGO0FBaUJQRSxJQUFBQSxVQUFVLEVBQUMsRUFqQkosQ0FpQk87O0FBakJQLEdBRlA7QUFzQkxDLEVBQUFBLE1BdEJLLGtCQXNCRUMsS0F0QkYsRUFzQlE7QUFBQztBQUVWLFdBQU9BLEtBQVA7QUFDSCxHQXpCSTtBQTBCTEMsRUFBQUEsV0ExQkssdUJBMEJPRCxLQTFCUCxFQTBCYTtBQUFDO0FBQ2YsUUFBSUUsRUFBRSxHQUFDLEtBQUtkLFFBQUwsQ0FBY2UsU0FBZCxFQUFQO0FBQ0FELElBQUFBLEVBQUUsR0FBQ0UsUUFBUSxDQUFDRixFQUFELENBQVg7QUFDQUEsSUFBQUEsRUFBRSxHQUFDQSxFQUFFLEdBQUNGLEtBQU47O0FBQ0EsUUFBR0UsRUFBRSxHQUFDLENBQU4sRUFBUTtBQUNKQSxNQUFBQSxFQUFFLEdBQUMsQ0FBSDtBQUNIOztBQUNELFNBQUtkLFFBQUwsQ0FBY2lCLFNBQWQsQ0FBd0JILEVBQXhCO0FBQ0EsU0FBS1AsT0FBTCxDQUFhVyxNQUFiLEdBQW9CLEtBQUtsQixRQUFMLENBQWNlLFNBQWQsRUFBcEI7QUFDQSxXQUFPRCxFQUFFLEdBQUMsQ0FBVjtBQUNILEdBcENJO0FBcUNMO0FBQ0FLLEVBQUFBLFVBdENLLHdCQXNDTztBQUNSLFNBQUksSUFBSUMsQ0FBQyxHQUFDLENBQVYsRUFBWUEsQ0FBQyxHQUFDLEtBQUtWLFVBQUwsQ0FBZ0JXLE1BQTlCLEVBQXFDRCxDQUFDLEVBQXRDLEVBQXlDO0FBQ3JDLFdBQUtWLFVBQUwsQ0FBZ0JVLENBQWhCLEVBQW1CRSxhQUFuQixDQUFpQ0MsaUJBQVdDLFVBQTVDO0FBQ0g7QUFDSixHQTFDSTtBQTJDTEMsRUFBQUEsU0EzQ0ssdUJBMkNNLENBRVYsQ0E3Q0k7QUE4Q0w7QUFDQUMsRUFBQUEsU0EvQ0ssdUJBK0NNLENBQ1YsQ0FoREk7QUFpRExDLEVBQUFBLFlBakRLLHdCQWlEUUMsSUFqRFIsRUFpRGE7QUFDZCxTQUFLNUIsUUFBTCxHQUFjNEIsSUFBZDtBQUNBLFNBQUtyQixPQUFMLENBQWFXLE1BQWIsR0FBb0JVLElBQUksQ0FBQ2IsU0FBTCxLQUFpQixFQUFyQztBQUNILEdBcERJO0FBc0RMO0FBQ0FjLEVBQUFBLFVBdkRLLHNCQXVETUMsUUF2RE4sRUF1RGUsQ0FDbkI7QUF4REksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJvbGVCZWFuIGZyb20gXCIuL2JlYW5zL1JvbGVCZWFuXCI7XG5pbXBvcnQge1N0YXR1c1R5cGV9IGZyb20gXCIuL0dhbWVcIjtcblxuLyoqXG4gKiDmiJjmlpfkuK3nmoTop5LoibIg5pWM5oiR5Y+M5pa5XG4gKiDmmL7npLrpgLvovpHlsYLnmoTohJrmnKxcbiAqL1xuXG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgcm9sZUJlYW46bmV3IFJvbGVCZWFuKCksXG4gICAgICAgIGxldmVsOi0xLFxuICAgICAgICBjYXJkbGlzdDpbXSwvL+aAu+aJi+eJjFxuICAgICAgICAvLyBjdXJyZW50Y2FyZEFycmF5czpbXSwvL+W9k+WJjeaJi+eJjFxuICAgICAgICBzcHJpdGU6IHsvL+WfuuehgOi0tOWbvlxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZSxcbiAgICAgICAgfSxcbiAgICAgICAgaHBMYWJlbDp7XG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsXG4gICAgICAgICAgICB0eXBlOmNjLkxhYmVsLFxuICAgICAgICB9LC8v6KGA6YePXG4gICAgICAgIGRlc2NMYWJlbDp7XG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsXG4gICAgICAgICAgICB0eXBlOmNjLkxhYmVsLFxuICAgICAgICB9LFxuICAgICAgICAgc3RhdHVzbGlzdDpbXSwvL+eKtuaAgeaVsOe7hFxuICAgIH0sXG5cbiAgICBhdHRhY2sodmFsdWUpey8v6Kem5Y+R6Ieq6Lqr55qE54q25oCB5qCP77yM6L6T5Ye65Lyk5a6z5YC877yM6Ieq6Lqr6ZmE5Yqg54q25oCB77yM5pWM5pa56ZmE5Yqg54q25oCBXG5cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH0sXG4gICAgdW5kZXJhdHRhY2sodmFsdWUpey8v6KKr5pS75Ye777yM6Kem5Y+R6Ieq6Lqr54q25oCB5qCP77yM5pu05pS56Ieq6Lqr55Sf5ZG95YC877yM54q25oCB5YC8XG4gICAgICAgIGxldCBocD10aGlzLnJvbGVCZWFuLmdldFJvbGVIcCgpO1xuICAgICAgICBocD1wYXJzZUludChocCk7XG4gICAgICAgIGhwPWhwLXZhbHVlO1xuICAgICAgICBpZihocDwwKXtcbiAgICAgICAgICAgIGhwPTA7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yb2xlQmVhbi5zZXRSb2xlSHAoaHApO1xuICAgICAgICB0aGlzLmhwTGFiZWwuc3RyaW5nPXRoaXMucm9sZUJlYW4uZ2V0Um9sZUhwKCk7XG4gICAgICAgIHJldHVybiBocD4wO1xuICAgIH0sXG4gICAgLy/mib7liLDpnIDopoHop6blj5HnmoTnirbmgIHoioLngrnvvIzlubbop6blj5FcbiAgICByb3VuZEJlZ2luKCl7XG4gICAgICAgIGZvcihsZXQgaT0wO2k8dGhpcy5zdGF0dXNsaXN0Lmxlbmd0aDtpKyspe1xuICAgICAgICAgICAgdGhpcy5zdGF0dXNsaXN0W2ldLm9wZXJhdGVTdGF0dXMoU3RhdHVzVHlwZS5ST1VOREJFR0lOKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgcm91bmRPdmVyKCl7XG5cbiAgICB9LFxuICAgIC8v5oiY5paX5byA5aeLIOexu+S8vOelneemj+eKtuaAgSDnm7TmjqXop6blj5HlubbmtojogJdcbiAgICBlbmNvdW50ZXIoKXtcbiAgICB9LFxuICAgIGJpbmRSb2xlQmVhbihyb2xlKXtcbiAgICAgICAgdGhpcy5yb2xlQmVhbj1yb2xlO1xuICAgICAgICB0aGlzLmhwTGFiZWwuc3RyaW5nPXJvbGUuZ2V0Um9sZUhwKCkrXCJcIjtcbiAgICB9LFxuXG4gICAgLy/ov5Tlm57mlYjmnpxcbiAgICBvbkRyYXdDYXJkKGNhcmRCZWFuKXtcbiAgICB9LFxuXG5cblxuXG5cblxuXG59KTsiXX0=