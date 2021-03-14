
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/RoadMapPage.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '0393fqztddDsqp17JBjmnbg', 'RoadMapPage');
// scripts/RoadMapPage.js

"use strict";

var _CardBean = _interopRequireDefault(require("./beans/CardBean"));

var _RoleBean = _interopRequireDefault(require("./beans/RoleBean"));

var _b0d4bfd1627e462eB97aD93cf37534c = require("../../library/imports/b0/b0d4bfd1-627e-462e-b97a-d93cf37534c8");

var _RoadCard = require("./RoadCard");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * 地图
 */
var self = null;
cc.Class({
  "extends": cc.Component,
  properties: {
    logs: {
      "default": null,
      type: cc.Label
    },
    menuView: {
      "default": null,
      type: cc.Button
    },
    coinValueView: {
      "default": null,
      type: cc.Label
    },
    roadCardPrefab: {
      "default": null,
      type: cc.Prefab
    },
    roadCardArrays: {
      "default": null,
      type: cc.Layout
    },
    hero: {
      "default": null,
      type: cc.Node
    }
  },
  onLoad: function onLoad() {
    self = this; // 这里的 this 指向 component

    for (var i = 0; i < 3; i++) {
      this.createRoadCard();
    }
  },

  /**
   * 加卡片
   */
  createRoadCard: function createRoadCard() {
    var number = Math.random();
    var newCard = cc.instantiate(self.roadCardPrefab);
    var roadcard = newCard.node.getComponent("RoadCard");

    if (number % 2 === 0) {
      //加野怪
      var enemyBean = new _RoleBean["default"](0);
      enemyBean.hp = 20;
      roadcard.bindRoadBean(_b0d4bfd1627e462eB97aD93cf37534c.RoadType.ENEMY, enemyBean);
    } else {
      var roadMapBean = (0, _RoadCard.createRoadBean)(_b0d4bfd1627e462eB97aD93cf37534c.RoadType.RECOVER, 10, null);
      roadcard.bindRoadBean(_b0d4bfd1627e462eB97aD93cf37534c.RoadType.ENEMY, roadMapBean);
    }

    this.roadCardArrays.push(newCard);
  }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL1JvYWRNYXBQYWdlLmpzIl0sIm5hbWVzIjpbInNlbGYiLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsImxvZ3MiLCJ0eXBlIiwiTGFiZWwiLCJtZW51VmlldyIsIkJ1dHRvbiIsImNvaW5WYWx1ZVZpZXciLCJyb2FkQ2FyZFByZWZhYiIsIlByZWZhYiIsInJvYWRDYXJkQXJyYXlzIiwiTGF5b3V0IiwiaGVybyIsIk5vZGUiLCJvbkxvYWQiLCJpIiwiY3JlYXRlUm9hZENhcmQiLCJudW1iZXIiLCJNYXRoIiwicmFuZG9tIiwibmV3Q2FyZCIsImluc3RhbnRpYXRlIiwicm9hZGNhcmQiLCJub2RlIiwiZ2V0Q29tcG9uZW50IiwiZW5lbXlCZWFuIiwiUm9sZUJlYW4iLCJocCIsImJpbmRSb2FkQmVhbiIsIlJvYWRUeXBlIiwiRU5FTVkiLCJyb2FkTWFwQmVhbiIsIlJFQ09WRVIiLCJwdXNoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBR0E7OztBQUdBLElBQUlBLElBQUksR0FBQyxJQUFUO0FBQ0FDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxJQUFJLEVBQUM7QUFDRCxpQkFBUSxJQURQO0FBRURDLE1BQUFBLElBQUksRUFBQ0wsRUFBRSxDQUFDTTtBQUZQLEtBREc7QUFNUkMsSUFBQUEsUUFBUSxFQUFFO0FBQ04saUJBQVMsSUFESDtBQUVORixNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ1E7QUFGSCxLQU5GO0FBVVJDLElBQUFBLGFBQWEsRUFBRTtBQUNYLGlCQUFTLElBREU7QUFFWEosTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNNO0FBRkUsS0FWUDtBQWNSSSxJQUFBQSxjQUFjLEVBQUU7QUFDWixpQkFBUyxJQURHO0FBRVpMLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDVztBQUZHLEtBZFI7QUFrQlJDLElBQUFBLGNBQWMsRUFBRTtBQUNaLGlCQUFTLElBREc7QUFFWlAsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNhO0FBRkcsS0FsQlI7QUF1QlJDLElBQUFBLElBQUksRUFBRTtBQUNGLGlCQUFTLElBRFA7QUFFRlQsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNlO0FBRlA7QUF2QkUsR0FIUDtBQWtDTEMsRUFBQUEsTUFBTSxFQUFFLGtCQUFZO0FBQ2hCakIsSUFBQUEsSUFBSSxHQUFDLElBQUwsQ0FEZ0IsQ0FHaEI7O0FBQ0EsU0FBSSxJQUFJa0IsQ0FBQyxHQUFDLENBQVYsRUFBWUEsQ0FBQyxHQUFDLENBQWQsRUFBZ0JBLENBQUMsRUFBakIsRUFBb0I7QUFDaEIsV0FBS0MsY0FBTDtBQUNIO0FBRUosR0ExQ0k7O0FBMkNMOzs7QUFHQUEsRUFBQUEsY0FBYyxFQUFDLDBCQUFZO0FBQ3ZCLFFBQUlDLE1BQU0sR0FBQ0MsSUFBSSxDQUFDQyxNQUFMLEVBQVg7QUFDQSxRQUFJQyxPQUFPLEdBQUd0QixFQUFFLENBQUN1QixXQUFILENBQWV4QixJQUFJLENBQUNXLGNBQXBCLENBQWQ7QUFDQSxRQUFJYyxRQUFRLEdBQUNGLE9BQU8sQ0FBQ0csSUFBUixDQUFhQyxZQUFiLENBQTBCLFVBQTFCLENBQWI7O0FBQ0EsUUFBR1AsTUFBTSxHQUFDLENBQVAsS0FBVyxDQUFkLEVBQWdCO0FBQ1o7QUFDQSxVQUFJUSxTQUFTLEdBQUMsSUFBSUMsb0JBQUosQ0FBYSxDQUFiLENBQWQ7QUFDQUQsTUFBQUEsU0FBUyxDQUFDRSxFQUFWLEdBQWEsRUFBYjtBQUNBTCxNQUFBQSxRQUFRLENBQUNNLFlBQVQsQ0FBc0JDLDBDQUFTQyxLQUEvQixFQUFxQ0wsU0FBckM7QUFDSCxLQUxELE1BS007QUFDRixVQUFJTSxXQUFXLEdBQUUsOEJBQWVGLDBDQUFTRyxPQUF4QixFQUFnQyxFQUFoQyxFQUFtQyxJQUFuQyxDQUFqQjtBQUNBVixNQUFBQSxRQUFRLENBQUNNLFlBQVQsQ0FBc0JDLDBDQUFTQyxLQUEvQixFQUFxQ0MsV0FBckM7QUFDSDs7QUFDRCxTQUFLckIsY0FBTCxDQUFvQnVCLElBQXBCLENBQXlCYixPQUF6QjtBQUVIO0FBN0RJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDYXJkQmVhbiBmcm9tIFwiLi9iZWFucy9DYXJkQmVhblwiO1xuaW1wb3J0IFJvbGVCZWFuIGZyb20gXCIuL2JlYW5zL1JvbGVCZWFuXCI7XG5pbXBvcnQge1JvYWRUeXBlfSBmcm9tIFwiLi4vLi4vbGlicmFyeS9pbXBvcnRzL2IwL2IwZDRiZmQxLTYyN2UtNDYyZS1iOTdhLWQ5M2NmMzc1MzRjOFwiO1xuaW1wb3J0IHtjcmVhdGVSb2FkQmVhbn0gZnJvbSBcIi4vUm9hZENhcmRcIjtcblxuXG4vKipcbiAqIOWcsOWbvlxuICovXG5sZXQgc2VsZj1udWxsO1xuY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgbG9nczp7XG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsXG4gICAgICAgICAgICB0eXBlOmNjLkxhYmVsLFxuICAgICAgICB9LFxuXG4gICAgICAgIG1lbnVWaWV3OiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuQnV0dG9uLFxuICAgICAgICB9LFxuICAgICAgICBjb2luVmFsdWVWaWV3OiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXG4gICAgICAgIH0sXG4gICAgICAgIHJvYWRDYXJkUHJlZmFiOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuUHJlZmFiXG4gICAgICAgIH0sXG4gICAgICAgIHJvYWRDYXJkQXJyYXlzOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTGF5b3V0LFxuICAgICAgICB9LFxuXG4gICAgICAgIGhlcm86IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXG4gICAgICAgIH0sXG5cblxuICAgIH0sXG5cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2VsZj10aGlzO1xuXG4gICAgICAgIC8vIOi/memHjOeahCB0aGlzIOaMh+WQkSBjb21wb25lbnRcbiAgICAgICAgZm9yKGxldCBpPTA7aTwzO2krKyl7XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVJvYWRDYXJkKCk7XG4gICAgICAgIH1cblxuICAgIH0sXG4gICAgLyoqXG4gICAgICog5Yqg5Y2h54mHXG4gICAgICovXG4gICAgY3JlYXRlUm9hZENhcmQ6ZnVuY3Rpb24gKCkge1xuICAgICAgICBsZXQgbnVtYmVyPU1hdGgucmFuZG9tKCk7XG4gICAgICAgIGxldCBuZXdDYXJkID0gY2MuaW5zdGFudGlhdGUoc2VsZi5yb2FkQ2FyZFByZWZhYik7XG4gICAgICAgIGxldCByb2FkY2FyZD1uZXdDYXJkLm5vZGUuZ2V0Q29tcG9uZW50KFwiUm9hZENhcmRcIik7XG4gICAgICAgIGlmKG51bWJlciUyPT09MCl7XG4gICAgICAgICAgICAvL+WKoOmHjuaAqlxuICAgICAgICAgICAgbGV0IGVuZW15QmVhbj1uZXcgUm9sZUJlYW4oMCk7XG4gICAgICAgICAgICBlbmVteUJlYW4uaHA9MjA7XG4gICAgICAgICAgICByb2FkY2FyZC5iaW5kUm9hZEJlYW4oUm9hZFR5cGUuRU5FTVksZW5lbXlCZWFuKTtcbiAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgbGV0IHJvYWRNYXBCZWFuPSBjcmVhdGVSb2FkQmVhbihSb2FkVHlwZS5SRUNPVkVSLDEwLG51bGwpO1xuICAgICAgICAgICAgcm9hZGNhcmQuYmluZFJvYWRCZWFuKFJvYWRUeXBlLkVORU1ZLHJvYWRNYXBCZWFuKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJvYWRDYXJkQXJyYXlzLnB1c2gobmV3Q2FyZCk7XG5cbiAgICB9XG5cblxufSk7XG4iXX0=