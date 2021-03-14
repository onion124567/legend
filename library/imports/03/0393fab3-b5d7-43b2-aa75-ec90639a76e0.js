"use strict";
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