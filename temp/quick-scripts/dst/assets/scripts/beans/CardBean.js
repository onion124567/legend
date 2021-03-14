
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/beans/CardBean.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '682f2CQeCtCzpKkgrhQceS/', 'CardBean');
// scripts/beans/CardBean.js

"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _ConstantConfig = require("../ConstantConfig");

var CardBean = /*#__PURE__*/function () {
  function CardBean() {
    this.id = "181";
    this.level = -1;
    this.picurl = ""; //贴图

    this.type = _ConstantConfig.CardType.ATTACK; //类型

    this.desc = ""; //说明

    this.title = "攻击"; //卡牌名称

    this.damage = 0; //对目标的基础伤害值

    this.createsource = 0; //创建的资源值

    this.consumesource = 0; //消耗的资源值

    this.drawCard = 0; //抽牌数

    this.recoverHp = 0; //恢复生命

    this.pokemonRecover = 0; //恢复宝宝生命值

    this.appendDamage = 0; //追加伤害值

    this.pokemondamage = 0; //对宝宝造成的伤害值

    this.callid = 0;
    this.effectlist = ""; //卡牌效果列表
  } //导入加载卡牌时用


  var _proto = CardBean.prototype;

  _proto.bindData = function bindData(jsonBean) {} //传入当前状态 返回使用后的效果
  ;

  _proto.sendEffect = function sendEffect(hp, maxhp, source, cardcount) {
    var scene = {
      hp: hp,
      maxhp: maxhp,
      source: source,
      cardcount: cardcount
    };
    this.effectlist.split(",");
    return this.damage;
  }
  /**
   *
   1	造成固定伤害
   2	造成水晶量的伤害
   3	对宝宝造成固定量伤害
   4	抽固定量的牌
   5	抽水晶量的牌
   6	回复固定量hp
   7	恢复水晶量hp
   8	产生固定量的水晶
   9	召唤固定宝宝id
   11	累计盾系点数
   12	累计剑系点数
   13	累计斧系点数
      伤害变成群体伤害
   */
  ;

  _proto.effect1 = function effect1(result, scene) {
    result.damage = result.damage + this.damage;
  };

  _proto.effect2 = function effect2(result, scene) {
    result.damage = result.damage + scene.source;
  };

  _proto.effect3 = function effect3(result, scene) {
    result.pokemondamage = result.pokemondamage + this.pokemondamage;
  };

  _proto.effect4 = function effect4(result, scene) {
    result.draw = result.draw + this.drawCard;
  };

  _proto.effect5 = function effect5(result, scene) {
    result.draw = result.draw + scene.source;
  };

  _proto.effect6 = function effect6(result, scene) {
    result.recover = result.recover + this.recoverHp;
  };

  _proto.effect7 = function effect7(result, scene) {
    result.recover += scene.source;
  };

  _proto.effect8 = function effect8(result, scene) {
    result.createsource += this.createsource;
  };

  _proto.effect9 = function effect9(result, scene) {
    result.callid = this.callid;
  };

  return CardBean;
}();

exports["default"] = CardBean;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL2JlYW5zL0NhcmRCZWFuLmpzIl0sIm5hbWVzIjpbIkNhcmRCZWFuIiwiaWQiLCJsZXZlbCIsInBpY3VybCIsInR5cGUiLCJDYXJkVHlwZSIsIkFUVEFDSyIsImRlc2MiLCJ0aXRsZSIsImRhbWFnZSIsImNyZWF0ZXNvdXJjZSIsImNvbnN1bWVzb3VyY2UiLCJkcmF3Q2FyZCIsInJlY292ZXJIcCIsInBva2Vtb25SZWNvdmVyIiwiYXBwZW5kRGFtYWdlIiwicG9rZW1vbmRhbWFnZSIsImNhbGxpZCIsImVmZmVjdGxpc3QiLCJiaW5kRGF0YSIsImpzb25CZWFuIiwic2VuZEVmZmVjdCIsImhwIiwibWF4aHAiLCJzb3VyY2UiLCJjYXJkY291bnQiLCJzY2VuZSIsInNwbGl0IiwiZWZmZWN0MSIsInJlc3VsdCIsImVmZmVjdDIiLCJlZmZlY3QzIiwiZWZmZWN0NCIsImRyYXciLCJlZmZlY3Q1IiwiZWZmZWN0NiIsInJlY292ZXIiLCJlZmZlY3Q3IiwiZWZmZWN0OCIsImVmZmVjdDkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0lBRXFCQTtBQUNqQixzQkFBYztBQUNWLFNBQUtDLEVBQUwsR0FBVSxLQUFWO0FBQ0EsU0FBS0MsS0FBTCxHQUFhLENBQUMsQ0FBZDtBQUNBLFNBQUtDLE1BQUwsR0FBYSxFQUFiLENBSFUsQ0FHTTs7QUFDaEIsU0FBS0MsSUFBTCxHQUFZQyx5QkFBU0MsTUFBckIsQ0FKVSxDQUlrQjs7QUFDNUIsU0FBS0MsSUFBTCxHQUFZLEVBQVosQ0FMVSxDQUtLOztBQUNmLFNBQUtDLEtBQUwsR0FBVyxJQUFYLENBTlUsQ0FNTTs7QUFFaEIsU0FBS0MsTUFBTCxHQUFZLENBQVosQ0FSVSxDQVFJOztBQUNkLFNBQUtDLFlBQUwsR0FBa0IsQ0FBbEIsQ0FUVSxDQVNVOztBQUNwQixTQUFLQyxhQUFMLEdBQW1CLENBQW5CLENBVlUsQ0FVVzs7QUFDckIsU0FBS0MsUUFBTCxHQUFjLENBQWQsQ0FYVSxDQVdNOztBQUNoQixTQUFLQyxTQUFMLEdBQWUsQ0FBZixDQVpVLENBWU87O0FBQ2pCLFNBQUtDLGNBQUwsR0FBb0IsQ0FBcEIsQ0FiVSxDQWFZOztBQUN0QixTQUFLQyxZQUFMLEdBQWtCLENBQWxCLENBZFUsQ0FjVTs7QUFDcEIsU0FBS0MsYUFBTCxHQUFtQixDQUFuQixDQWZVLENBZVc7O0FBQ3JCLFNBQUtDLE1BQUwsR0FBWSxDQUFaO0FBRUEsU0FBS0MsVUFBTCxHQUFnQixFQUFoQixDQWxCVSxDQWtCUztBQUN0QixJQUNEOzs7OztTQUNBQyxXQUFBLGtCQUFTQyxRQUFULEVBQWtCLENBQ2pCLEVBRUQ7OztTQUNBQyxhQUFBLG9CQUFXQyxFQUFYLEVBQWNDLEtBQWQsRUFBb0JDLE1BQXBCLEVBQTJCQyxTQUEzQixFQUFxQztBQUNqQyxRQUFJQyxLQUFLLEdBQUM7QUFDTkosTUFBQUEsRUFBRSxFQUFGQSxFQURNO0FBQ0hDLE1BQUFBLEtBQUssRUFBTEEsS0FERztBQUNHQyxNQUFBQSxNQUFNLEVBQU5BLE1BREg7QUFDVUMsTUFBQUEsU0FBUyxFQUFUQTtBQURWLEtBQVY7QUFHQSxTQUFLUCxVQUFMLENBQWdCUyxLQUFoQixDQUFzQixHQUF0QjtBQUNBLFdBQU8sS0FBS2xCLE1BQVo7QUFFSDtBQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7U0FnQkFtQixVQUFBLGlCQUFRQyxNQUFSLEVBQWVILEtBQWYsRUFBcUI7QUFDakJHLElBQUFBLE1BQU0sQ0FBQ3BCLE1BQVAsR0FBY29CLE1BQU0sQ0FBQ3BCLE1BQVAsR0FBYyxLQUFLQSxNQUFqQztBQUNIOztTQUNEcUIsVUFBQSxpQkFBUUQsTUFBUixFQUFlSCxLQUFmLEVBQXFCO0FBQ2pCRyxJQUFBQSxNQUFNLENBQUNwQixNQUFQLEdBQWNvQixNQUFNLENBQUNwQixNQUFQLEdBQWNpQixLQUFLLENBQUNGLE1BQWxDO0FBQ0g7O1NBQ0RPLFVBQUEsaUJBQVFGLE1BQVIsRUFBZUgsS0FBZixFQUFxQjtBQUNqQkcsSUFBQUEsTUFBTSxDQUFDYixhQUFQLEdBQXFCYSxNQUFNLENBQUNiLGFBQVAsR0FBcUIsS0FBS0EsYUFBL0M7QUFDSDs7U0FDRGdCLFVBQUEsaUJBQVFILE1BQVIsRUFBZUgsS0FBZixFQUFxQjtBQUNqQkcsSUFBQUEsTUFBTSxDQUFDSSxJQUFQLEdBQVlKLE1BQU0sQ0FBQ0ksSUFBUCxHQUFZLEtBQUtyQixRQUE3QjtBQUNIOztTQUNEc0IsVUFBQSxpQkFBUUwsTUFBUixFQUFlSCxLQUFmLEVBQXFCO0FBQ2pCRyxJQUFBQSxNQUFNLENBQUNJLElBQVAsR0FBWUosTUFBTSxDQUFDSSxJQUFQLEdBQVlQLEtBQUssQ0FBQ0YsTUFBOUI7QUFDSDs7U0FDRFcsVUFBQSxpQkFBUU4sTUFBUixFQUFlSCxLQUFmLEVBQXFCO0FBQ2pCRyxJQUFBQSxNQUFNLENBQUNPLE9BQVAsR0FBZVAsTUFBTSxDQUFDTyxPQUFQLEdBQWUsS0FBS3ZCLFNBQW5DO0FBQ0g7O1NBQ0R3QixVQUFBLGlCQUFRUixNQUFSLEVBQWVILEtBQWYsRUFBcUI7QUFDakJHLElBQUFBLE1BQU0sQ0FBQ08sT0FBUCxJQUFnQlYsS0FBSyxDQUFDRixNQUF0QjtBQUNIOztTQUNEYyxVQUFBLGlCQUFRVCxNQUFSLEVBQWVILEtBQWYsRUFBcUI7QUFDakJHLElBQUFBLE1BQU0sQ0FBQ25CLFlBQVAsSUFBcUIsS0FBS0EsWUFBMUI7QUFDSDs7U0FDRDZCLFVBQUEsaUJBQVFWLE1BQVIsRUFBZUgsS0FBZixFQUFxQjtBQUNqQkcsSUFBQUEsTUFBTSxDQUFDWixNQUFQLEdBQWMsS0FBS0EsTUFBbkI7QUFDSCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDYXJkVHlwZX0gZnJvbSBcIi4uL0NvbnN0YW50Q29uZmlnXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhcmRCZWFuIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5pZCA9IFwiMTgxXCI7XG4gICAgICAgIHRoaXMubGV2ZWwgPSAtMTtcbiAgICAgICAgdGhpcy5waWN1cmwgPVwiXCI7Ly/otLTlm75cbiAgICAgICAgdGhpcy50eXBlID0gQ2FyZFR5cGUuQVRUQUNLOy8v57G75Z6LXG4gICAgICAgIHRoaXMuZGVzYyA9IFwiXCI7Ly/or7TmmI5cbiAgICAgICAgdGhpcy50aXRsZT1cIuaUu+WHu1wiOy8v5Y2h54mM5ZCN56ewXG5cbiAgICAgICAgdGhpcy5kYW1hZ2U9MDsvL+Wvueebruagh+eahOWfuuehgOS8pOWus+WAvFxuICAgICAgICB0aGlzLmNyZWF0ZXNvdXJjZT0wOy8v5Yib5bu655qE6LWE5rqQ5YC8XG4gICAgICAgIHRoaXMuY29uc3VtZXNvdXJjZT0wOy8v5raI6ICX55qE6LWE5rqQ5YC8XG4gICAgICAgIHRoaXMuZHJhd0NhcmQ9MDsvL+aKveeJjOaVsFxuICAgICAgICB0aGlzLnJlY292ZXJIcD0wOy8v5oGi5aSN55Sf5ZG9XG4gICAgICAgIHRoaXMucG9rZW1vblJlY292ZXI9MDsvL+aBouWkjeWuneWuneeUn+WRveWAvFxuICAgICAgICB0aGlzLmFwcGVuZERhbWFnZT0wOy8v6L+95Yqg5Lyk5a6z5YC8XG4gICAgICAgIHRoaXMucG9rZW1vbmRhbWFnZT0wOy8v5a+55a6d5a6d6YCg5oiQ55qE5Lyk5a6z5YC8XG4gICAgICAgIHRoaXMuY2FsbGlkPTA7XG5cbiAgICAgICAgdGhpcy5lZmZlY3RsaXN0PVwiXCI7Ly/ljaHniYzmlYjmnpzliJfooahcbiAgICB9XG4gICAgLy/lr7zlhaXliqDovb3ljaHniYzml7bnlKhcbiAgICBiaW5kRGF0YShqc29uQmVhbil7XG4gICAgfVxuXG4gICAgLy/kvKDlhaXlvZPliY3nirbmgIEg6L+U5Zue5L2/55So5ZCO55qE5pWI5p6cXG4gICAgc2VuZEVmZmVjdChocCxtYXhocCxzb3VyY2UsY2FyZGNvdW50KXtcbiAgICAgICAgbGV0IHNjZW5lPXtcbiAgICAgICAgICAgIGhwLG1heGhwLHNvdXJjZSxjYXJkY291bnRcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmVmZmVjdGxpc3Quc3BsaXQoXCIsXCIpO1xuICAgICAgICByZXR1cm4gdGhpcy5kYW1hZ2U7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAxXHTpgKDmiJDlm7rlrprkvKTlrrNcbiAgICAgMlx06YCg5oiQ5rC05pm26YeP55qE5Lyk5a6zXG4gICAgIDNcdOWvueWuneWunemAoOaIkOWbuuWumumHj+S8pOWus1xuICAgICA0XHTmir3lm7rlrprph4/nmoTniYxcbiAgICAgNVx05oq95rC05pm26YeP55qE54mMXG4gICAgIDZcdOWbnuWkjeWbuuWumumHj2hwXG4gICAgIDdcdOaBouWkjeawtOaZtumHj2hwXG4gICAgIDhcdOS6p+eUn+WbuuWumumHj+eahOawtOaZtlxuICAgICA5XHTlj6zllKTlm7rlrprlrp3lrp1pZFxuICAgICAxMVx057Sv6K6h55u+57O754K55pWwXG4gICAgIDEyXHTntK/orqHliZHns7vngrnmlbBcbiAgICAgMTNcdOe0r+iuoeaWp+ezu+eCueaVsFxuICAgICAgICDkvKTlrrPlj5jmiJDnvqTkvZPkvKTlrrNcbiAgICAgKi9cbiAgICBlZmZlY3QxKHJlc3VsdCxzY2VuZSl7XG4gICAgICAgIHJlc3VsdC5kYW1hZ2U9cmVzdWx0LmRhbWFnZSt0aGlzLmRhbWFnZTtcbiAgICB9XG4gICAgZWZmZWN0MihyZXN1bHQsc2NlbmUpe1xuICAgICAgICByZXN1bHQuZGFtYWdlPXJlc3VsdC5kYW1hZ2Urc2NlbmUuc291cmNlO1xuICAgIH1cbiAgICBlZmZlY3QzKHJlc3VsdCxzY2VuZSl7XG4gICAgICAgIHJlc3VsdC5wb2tlbW9uZGFtYWdlPXJlc3VsdC5wb2tlbW9uZGFtYWdlK3RoaXMucG9rZW1vbmRhbWFnZTtcbiAgICB9XG4gICAgZWZmZWN0NChyZXN1bHQsc2NlbmUpe1xuICAgICAgICByZXN1bHQuZHJhdz1yZXN1bHQuZHJhdyt0aGlzLmRyYXdDYXJkO1xuICAgIH1cbiAgICBlZmZlY3Q1KHJlc3VsdCxzY2VuZSl7XG4gICAgICAgIHJlc3VsdC5kcmF3PXJlc3VsdC5kcmF3K3NjZW5lLnNvdXJjZTtcbiAgICB9XG4gICAgZWZmZWN0NihyZXN1bHQsc2NlbmUpe1xuICAgICAgICByZXN1bHQucmVjb3Zlcj1yZXN1bHQucmVjb3Zlcit0aGlzLnJlY292ZXJIcDtcbiAgICB9XG4gICAgZWZmZWN0NyhyZXN1bHQsc2NlbmUpe1xuICAgICAgICByZXN1bHQucmVjb3Zlcis9c2NlbmUuc291cmNlO1xuICAgIH1cbiAgICBlZmZlY3Q4KHJlc3VsdCxzY2VuZSl7XG4gICAgICAgIHJlc3VsdC5jcmVhdGVzb3VyY2UrPXRoaXMuY3JlYXRlc291cmNlO1xuICAgIH1cbiAgICBlZmZlY3Q5KHJlc3VsdCxzY2VuZSl7XG4gICAgICAgIHJlc3VsdC5jYWxsaWQ9dGhpcy5jYWxsaWQ7XG4gICAgfVxuXG5cbn0iXX0=