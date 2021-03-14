
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
    roleBean: new _RoleBean["default"](0),
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
    hpAnimateLabel: {
      "default": null,
      type: cc.Label
    },
    targetStamp: {
      "default": null,
      tyoe: cc.Sprite
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
    } // this.hpAnimate();


    this.roleBean.setRoleHp(hp);
    this.hpLabel.string = this.roleBean.getRoleHp();
    return hp > 0;
  },
  isAlive: function isAlive() {
    return hp > 0;
  },
  hpAnimate: function hpAnimate() {
    var animate = cc.sequence(cc.moveBy(2, -50, 50), 2);
    this.hpAnimateLabel.runAction(animate);
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
  //被标记
  targetSign: function targetSign() {},
  //取消标记
  targetCancel: function targetCancel() {},
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL1JvbGUuanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJyb2xlQmVhbiIsIlJvbGVCZWFuIiwibGV2ZWwiLCJjYXJkbGlzdCIsInNwcml0ZSIsInR5cGUiLCJTcHJpdGUiLCJocExhYmVsIiwiTGFiZWwiLCJkZXNjTGFiZWwiLCJocEFuaW1hdGVMYWJlbCIsInRhcmdldFN0YW1wIiwidHlvZSIsInN0YXR1c2xpc3QiLCJhdHRhY2siLCJ2YWx1ZSIsInVuZGVyYXR0YWNrIiwiaHAiLCJnZXRSb2xlSHAiLCJwYXJzZUludCIsInNldFJvbGVIcCIsInN0cmluZyIsImlzQWxpdmUiLCJocEFuaW1hdGUiLCJhbmltYXRlIiwic2VxdWVuY2UiLCJtb3ZlQnkiLCJydW5BY3Rpb24iLCJyb3VuZEJlZ2luIiwiaSIsImxlbmd0aCIsIm9wZXJhdGVTdGF0dXMiLCJTdGF0dXNUeXBlIiwiUk9VTkRCRUdJTiIsInJvdW5kT3ZlciIsImVuY291bnRlciIsImJpbmRSb2xlQmVhbiIsInJvbGUiLCJ0YXJnZXRTaWduIiwidGFyZ2V0Q2FuY2VsIiwib25EcmF3Q2FyZCIsImNhcmRCZWFuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOzs7O0FBRUE7Ozs7QUFLQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFFTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLFFBQVEsRUFBQyxJQUFJQyxvQkFBSixDQUFhLENBQWIsQ0FERDtBQUVSQyxJQUFBQSxLQUFLLEVBQUMsQ0FBQyxDQUZDO0FBR1JDLElBQUFBLFFBQVEsRUFBQyxFQUhEO0FBR0k7QUFDWjtBQUNBQyxJQUFBQSxNQUFNLEVBQUU7QUFBQztBQUNMLGlCQUFTLElBREw7QUFFSkMsTUFBQUEsSUFBSSxFQUFFVCxFQUFFLENBQUNVO0FBRkwsS0FMQTtBQVNSQyxJQUFBQSxPQUFPLEVBQUM7QUFDSixpQkFBUSxJQURKO0FBRUpGLE1BQUFBLElBQUksRUFBQ1QsRUFBRSxDQUFDWTtBQUZKLEtBVEE7QUFZTjtBQUNGQyxJQUFBQSxTQUFTLEVBQUM7QUFDTixpQkFBUSxJQURGO0FBRU5KLE1BQUFBLElBQUksRUFBQ1QsRUFBRSxDQUFDWTtBQUZGLEtBYkY7QUFpQlJFLElBQUFBLGNBQWMsRUFBQztBQUNiLGlCQUFRLElBREs7QUFFYkwsTUFBQUEsSUFBSSxFQUFDVCxFQUFFLENBQUNZO0FBRkssS0FqQlA7QUFxQlJHLElBQUFBLFdBQVcsRUFBQztBQUNSLGlCQUFRLElBREE7QUFFUkMsTUFBQUEsSUFBSSxFQUFDaEIsRUFBRSxDQUFDVTtBQUZBLEtBckJKO0FBeUJQTyxJQUFBQSxVQUFVLEVBQUMsRUF6QkosQ0F5Qk87O0FBekJQLEdBRlA7QUE4QkxDLEVBQUFBLE1BOUJLLGtCQThCRUMsS0E5QkYsRUE4QlE7QUFBQztBQUVWLFdBQU9BLEtBQVA7QUFDSCxHQWpDSTtBQWtDTEMsRUFBQUEsV0FsQ0ssdUJBa0NPRCxLQWxDUCxFQWtDYTtBQUFDO0FBQ2YsUUFBSUUsRUFBRSxHQUFDLEtBQUtqQixRQUFMLENBQWNrQixTQUFkLEVBQVA7QUFDQUQsSUFBQUEsRUFBRSxHQUFDRSxRQUFRLENBQUNGLEVBQUQsQ0FBWDtBQUNBQSxJQUFBQSxFQUFFLEdBQUNBLEVBQUUsR0FBQ0YsS0FBTjs7QUFDQSxRQUFHRSxFQUFFLEdBQUMsQ0FBTixFQUFRO0FBQ0pBLE1BQUFBLEVBQUUsR0FBQyxDQUFIO0FBQ0gsS0FOYSxDQU9kOzs7QUFDQSxTQUFLakIsUUFBTCxDQUFjb0IsU0FBZCxDQUF3QkgsRUFBeEI7QUFDQSxTQUFLVixPQUFMLENBQWFjLE1BQWIsR0FBb0IsS0FBS3JCLFFBQUwsQ0FBY2tCLFNBQWQsRUFBcEI7QUFDQSxXQUFPRCxFQUFFLEdBQUMsQ0FBVjtBQUNILEdBN0NJO0FBOENMSyxFQUFBQSxPQTlDSyxxQkE4Q0k7QUFDTCxXQUFPTCxFQUFFLEdBQUMsQ0FBVjtBQUNILEdBaERJO0FBaURMTSxFQUFBQSxTQWpESyx1QkFpRE07QUFDUCxRQUFJQyxPQUFPLEdBQUM1QixFQUFFLENBQUM2QixRQUFILENBQVk3QixFQUFFLENBQUM4QixNQUFILENBQVUsQ0FBVixFQUFjLENBQUMsRUFBZixFQUFtQixFQUFuQixDQUFaLEVBQW1DLENBQW5DLENBQVo7QUFDQSxTQUFLaEIsY0FBTCxDQUFvQmlCLFNBQXBCLENBQThCSCxPQUE5QjtBQUNILEdBcERJO0FBcURMO0FBQ0FJLEVBQUFBLFVBdERLLHdCQXNETztBQUNSLFNBQUksSUFBSUMsQ0FBQyxHQUFDLENBQVYsRUFBWUEsQ0FBQyxHQUFDLEtBQUtoQixVQUFMLENBQWdCaUIsTUFBOUIsRUFBcUNELENBQUMsRUFBdEMsRUFBeUM7QUFDckMsV0FBS2hCLFVBQUwsQ0FBZ0JnQixDQUFoQixFQUFtQkUsYUFBbkIsQ0FBaUNDLGlCQUFXQyxVQUE1QztBQUNIO0FBQ0osR0ExREk7QUEyRExDLEVBQUFBLFNBM0RLLHVCQTJETSxDQUVWLENBN0RJO0FBOERMO0FBQ0FDLEVBQUFBLFNBL0RLLHVCQStETSxDQUNWLENBaEVJO0FBaUVMQyxFQUFBQSxZQWpFSyx3QkFpRVFDLElBakVSLEVBaUVhO0FBQ2QsU0FBS3JDLFFBQUwsR0FBY3FDLElBQWQ7QUFDQSxTQUFLOUIsT0FBTCxDQUFhYyxNQUFiLEdBQW9CZ0IsSUFBSSxDQUFDbkIsU0FBTCxLQUFpQixFQUFyQztBQUNILEdBcEVJO0FBc0VMO0FBQ0FvQixFQUFBQSxVQXZFSyx3QkF1RU8sQ0FFWCxDQXpFSTtBQTBFTDtBQUNBQyxFQUFBQSxZQTNFSywwQkEyRVMsQ0FFYixDQTdFSTtBQThFTDtBQUNBQyxFQUFBQSxVQS9FSyxzQkErRU1DLFFBL0VOLEVBK0VlLENBQ25CO0FBaEZJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSb2xlQmVhbiBmcm9tIFwiLi9iZWFucy9Sb2xlQmVhblwiO1xuaW1wb3J0IHtTdGF0dXNUeXBlfSBmcm9tIFwiLi9HYW1lXCI7XG5cbi8qKlxuICog5oiY5paX5Lit55qE6KeS6ImyIOaVjOaIkeWPjOaWuVxuICog5pi+56S66YC76L6R5bGC55qE6ISa5pysXG4gKi9cblxuY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHJvbGVCZWFuOm5ldyBSb2xlQmVhbigwKSxcbiAgICAgICAgbGV2ZWw6LTEsXG4gICAgICAgIGNhcmRsaXN0OltdLC8v5oC75omL54mMXG4gICAgICAgIC8vIGN1cnJlbnRjYXJkQXJyYXlzOltdLC8v5b2T5YmN5omL54mMXG4gICAgICAgIHNwcml0ZTogey8v5Z+656GA6LS05Zu+XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlLFxuICAgICAgICB9LFxuICAgICAgICBocExhYmVsOntcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCxcbiAgICAgICAgICAgIHR5cGU6Y2MuTGFiZWwsXG4gICAgICAgIH0sLy/ooYDph49cbiAgICAgICAgZGVzY0xhYmVsOntcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCxcbiAgICAgICAgICAgIHR5cGU6Y2MuTGFiZWwsXG4gICAgICAgIH0sXG4gICAgICAgIGhwQW5pbWF0ZUxhYmVsOntcbiAgICAgICAgICBkZWZhdWx0Om51bGwsXG4gICAgICAgICAgdHlwZTpjYy5MYWJlbFxuICAgICAgICB9LFxuICAgICAgICB0YXJnZXRTdGFtcDp7XG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsXG4gICAgICAgICAgICB0eW9lOmNjLlNwcml0ZVxuICAgICAgICB9LFxuICAgICAgICAgc3RhdHVzbGlzdDpbXSwvL+eKtuaAgeaVsOe7hFxuICAgIH0sXG5cbiAgICBhdHRhY2sodmFsdWUpey8v6Kem5Y+R6Ieq6Lqr55qE54q25oCB5qCP77yM6L6T5Ye65Lyk5a6z5YC877yM6Ieq6Lqr6ZmE5Yqg54q25oCB77yM5pWM5pa56ZmE5Yqg54q25oCBXG5cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH0sXG4gICAgdW5kZXJhdHRhY2sodmFsdWUpey8v6KKr5pS75Ye777yM6Kem5Y+R6Ieq6Lqr54q25oCB5qCP77yM5pu05pS56Ieq6Lqr55Sf5ZG95YC877yM54q25oCB5YC8XG4gICAgICAgIGxldCBocD10aGlzLnJvbGVCZWFuLmdldFJvbGVIcCgpO1xuICAgICAgICBocD1wYXJzZUludChocCk7XG4gICAgICAgIGhwPWhwLXZhbHVlO1xuICAgICAgICBpZihocDwwKXtcbiAgICAgICAgICAgIGhwPTA7XG4gICAgICAgIH1cbiAgICAgICAgLy8gdGhpcy5ocEFuaW1hdGUoKTtcbiAgICAgICAgdGhpcy5yb2xlQmVhbi5zZXRSb2xlSHAoaHApO1xuICAgICAgICB0aGlzLmhwTGFiZWwuc3RyaW5nPXRoaXMucm9sZUJlYW4uZ2V0Um9sZUhwKCk7XG4gICAgICAgIHJldHVybiBocD4wO1xuICAgIH0sXG4gICAgaXNBbGl2ZSgpe1xuICAgICAgICByZXR1cm4gaHA+MDtcbiAgICB9LFxuICAgIGhwQW5pbWF0ZSgpe1xuICAgICAgICBsZXQgYW5pbWF0ZT1jYy5zZXF1ZW5jZShjYy5tb3ZlQnkoMiwgIC01MCwgNTApLDIpO1xuICAgICAgICB0aGlzLmhwQW5pbWF0ZUxhYmVsLnJ1bkFjdGlvbihhbmltYXRlKTtcbiAgICB9LFxuICAgIC8v5om+5Yiw6ZyA6KaB6Kem5Y+R55qE54q25oCB6IqC54K577yM5bm26Kem5Y+RXG4gICAgcm91bmRCZWdpbigpe1xuICAgICAgICBmb3IobGV0IGk9MDtpPHRoaXMuc3RhdHVzbGlzdC5sZW5ndGg7aSsrKXtcbiAgICAgICAgICAgIHRoaXMuc3RhdHVzbGlzdFtpXS5vcGVyYXRlU3RhdHVzKFN0YXR1c1R5cGUuUk9VTkRCRUdJTik7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHJvdW5kT3Zlcigpe1xuXG4gICAgfSxcbiAgICAvL+aImOaWl+W8gOWniyDnsbvkvLznpZ3npo/nirbmgIEg55u05o6l6Kem5Y+R5bm25raI6ICXXG4gICAgZW5jb3VudGVyKCl7XG4gICAgfSxcbiAgICBiaW5kUm9sZUJlYW4ocm9sZSl7XG4gICAgICAgIHRoaXMucm9sZUJlYW49cm9sZTtcbiAgICAgICAgdGhpcy5ocExhYmVsLnN0cmluZz1yb2xlLmdldFJvbGVIcCgpK1wiXCI7XG4gICAgfSxcblxuICAgIC8v6KKr5qCH6K6wXG4gICAgdGFyZ2V0U2lnbigpe1xuXG4gICAgfSxcbiAgICAvL+WPlua2iOagh+iusFxuICAgIHRhcmdldENhbmNlbCgpe1xuXG4gICAgfSxcbiAgICAvL+i/lOWbnuaViOaenFxuICAgIG9uRHJhd0NhcmQoY2FyZEJlYW4pe1xuICAgIH0sXG5cblxuXG5cblxuXG5cbn0pOyJdfQ==