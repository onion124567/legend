
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/beans/PokemonBean.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '2f9cescm4lES7akIb8mElQb', 'PokemonBean');
// scripts/beans/PokemonBean.js

"use strict";

exports.__esModule = true;
exports["default"] = void 0;

/**
 * 数据层的宝宝
 */
var PokemonBean = /*#__PURE__*/function () {
  function PokemonBean(roleType) {
    this.id = "181";
    this.level = -1;
    this.pic = ""; //贴图

    this.roleHp = 20;
    this.desc = "描述";
    this.round = -1; //技能类型

    this.actionType = 0; //1给主角恢复 2充当某种类型牌  3加护甲 4抽牌  5造成伤害  6加buff 7再进行一回合 8吞噬 9冰冻

    this.passiveSkill = 0; //被动技能id  附加伤害  双倍伤害 嘲讽 吸血  回复  重生等
  }

  var _proto = PokemonBean.prototype;

  _proto.setRoleHp = function setRoleHp(hp) {
    this.roleHp = hp;
  };

  _proto.getRoleHp = function getRoleHp() {
    return this.roleHp;
  };

  return PokemonBean;
}();

exports["default"] = PokemonBean;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL2JlYW5zL1Bva2Vtb25CZWFuLmpzIl0sIm5hbWVzIjpbIlBva2Vtb25CZWFuIiwicm9sZVR5cGUiLCJpZCIsImxldmVsIiwicGljIiwicm9sZUhwIiwiZGVzYyIsInJvdW5kIiwiYWN0aW9uVHlwZSIsInBhc3NpdmVTa2lsbCIsInNldFJvbGVIcCIsImhwIiwiZ2V0Um9sZUhwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7SUFHcUJBO0FBQ2pCLHVCQUFZQyxRQUFaLEVBQXNCO0FBQ2xCLFNBQUtDLEVBQUwsR0FBVSxLQUFWO0FBQ0EsU0FBS0MsS0FBTCxHQUFhLENBQUMsQ0FBZDtBQUNBLFNBQUtDLEdBQUwsR0FBVyxFQUFYLENBSGtCLENBR0o7O0FBQ2QsU0FBS0MsTUFBTCxHQUFjLEVBQWQ7QUFDQSxTQUFLQyxJQUFMLEdBQVksSUFBWjtBQUNBLFNBQUtDLEtBQUwsR0FBVyxDQUFDLENBQVosQ0FOa0IsQ0FPbEI7O0FBQ0EsU0FBS0MsVUFBTCxHQUFnQixDQUFoQixDQVJrQixDQVFBOztBQUNsQixTQUFLQyxZQUFMLEdBQWtCLENBQWxCLENBVGtCLENBU0U7QUFFdkI7Ozs7U0FHREMsWUFBQSxtQkFBVUMsRUFBVixFQUFhO0FBQ1QsU0FBS04sTUFBTCxHQUFZTSxFQUFaO0FBQ0g7O1NBQ0RDLFlBQUEscUJBQVc7QUFDUCxXQUFPLEtBQUtQLE1BQVo7QUFDSCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiDmlbDmja7lsYLnmoTlrp3lrp1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9rZW1vbkJlYW4ge1xuICAgIGNvbnN0cnVjdG9yKHJvbGVUeXBlKSB7XG4gICAgICAgIHRoaXMuaWQgPSBcIjE4MVwiO1xuICAgICAgICB0aGlzLmxldmVsID0gLTE7XG4gICAgICAgIHRoaXMucGljID0gXCJcIjsvL+i0tOWbvlxuICAgICAgICB0aGlzLnJvbGVIcCA9IDIwO1xuICAgICAgICB0aGlzLmRlc2MgPSBcIuaPj+i/sFwiO1xuICAgICAgICB0aGlzLnJvdW5kPS0xO1xuICAgICAgICAvL+aKgOiDveexu+Wei1xuICAgICAgICB0aGlzLmFjdGlvblR5cGU9MDsvLzHnu5nkuLvop5LmgaLlpI0gMuWFheW9k+afkOenjeexu+Wei+eJjCAgM+WKoOaKpOeUsiA05oq954mMICA16YCg5oiQ5Lyk5a6zICA25YqgYnVmZiA35YaN6L+b6KGM5LiA5Zue5ZCIIDjlkJ7lmawgOeWGsOWGu1xuICAgICAgICB0aGlzLnBhc3NpdmVTa2lsbD0wOy8v6KKr5Yqo5oqA6IO9aWQgIOmZhOWKoOS8pOWusyAg5Y+M5YCN5Lyk5a6zIOWYsuiuvSDlkLjooYAgIOWbnuWkjSAg6YeN55Sf562JXG5cbiAgICB9XG5cblxuICAgIHNldFJvbGVIcChocCl7XG4gICAgICAgIHRoaXMucm9sZUhwPWhwO1xuICAgIH1cbiAgICBnZXRSb2xlSHAoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMucm9sZUhwO1xuICAgIH1cbn0iXX0=