
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * 地图
 */
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
  onLoad: function onLoad() {// 这里的 this 指向 component
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL1JvYWRNYXBQYWdlLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwibG9ncyIsInR5cGUiLCJMYWJlbCIsIm1lbnVWaWV3IiwiQnV0dG9uIiwiY29pblZhbHVlVmlldyIsInJvYWRDYXJkUHJlZmFiIiwiUHJlZmFiIiwicm9hZENhcmRBcnJheXMiLCJMYXlvdXQiLCJoZXJvIiwiTm9kZSIsIm9uTG9hZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7OztBQUdBOzs7QUFHQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLElBQUksRUFBQztBQUNELGlCQUFRLElBRFA7QUFFREMsTUFBQUEsSUFBSSxFQUFDTCxFQUFFLENBQUNNO0FBRlAsS0FERztBQU1SQyxJQUFBQSxRQUFRLEVBQUU7QUFDTixpQkFBUyxJQURIO0FBRU5GLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDUTtBQUZILEtBTkY7QUFVUkMsSUFBQUEsYUFBYSxFQUFFO0FBQ1gsaUJBQVMsSUFERTtBQUVYSixNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ007QUFGRSxLQVZQO0FBY1JJLElBQUFBLGNBQWMsRUFBRTtBQUNaLGlCQUFTLElBREc7QUFFWkwsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNXO0FBRkcsS0FkUjtBQWtCUkMsSUFBQUEsY0FBYyxFQUFFO0FBQ1osaUJBQVMsSUFERztBQUVaUCxNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ2E7QUFGRyxLQWxCUjtBQXVCUkMsSUFBQUEsSUFBSSxFQUFFO0FBQ0YsaUJBQVMsSUFEUDtBQUVGVCxNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ2U7QUFGUDtBQXZCRSxHQUhQO0FBa0NMQyxFQUFBQSxNQUFNLEVBQUUsa0JBQVksQ0FFaEI7QUFDSDtBQXJDSSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ2FyZEJlYW4gZnJvbSBcIi4vYmVhbnMvQ2FyZEJlYW5cIjtcbmltcG9ydCBSb2xlQmVhbiBmcm9tIFwiLi9iZWFucy9Sb2xlQmVhblwiO1xuXG5cbi8qKlxuICog5Zyw5Zu+XG4gKi9cbmNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGxvZ3M6e1xuICAgICAgICAgICAgZGVmYXVsdDpudWxsLFxuICAgICAgICAgICAgdHlwZTpjYy5MYWJlbCxcbiAgICAgICAgfSxcblxuICAgICAgICBtZW51Vmlldzoge1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkJ1dHRvbixcbiAgICAgICAgfSxcbiAgICAgICAgY29pblZhbHVlVmlldzoge1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxuICAgICAgICB9LFxuICAgICAgICByb2FkQ2FyZFByZWZhYjoge1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLlByZWZhYlxuICAgICAgICB9LFxuICAgICAgICByb2FkQ2FyZEFycmF5czoge1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkxheW91dCxcbiAgICAgICAgfSxcblxuICAgICAgICBoZXJvOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxuICAgICAgICB9LFxuXG5cbiAgICB9LFxuXG4gICAgb25Mb2FkOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgLy8g6L+Z6YeM55qEIHRoaXMg5oyH5ZCRIGNvbXBvbmVudFxuICAgIH0sXG4gICAgXG5cbn0pO1xuIl19