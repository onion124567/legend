"use strict";
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