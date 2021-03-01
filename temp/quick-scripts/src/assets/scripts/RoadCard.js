"use strict";
cc._RF.push(module, 'b0d4b/RYn5GLrl62TzzdTTI', 'RoadCard');
// scripts/RoadCard.js

"use strict";

exports.__esModule = true;
exports.RoadType = void 0;

/**
 * 道路卡片
 */
var RoadType = {
  ENEMY: 1,
  //野怪
  RECOVER: 2 //恢复

};
exports.RoadType = RoadType;
cc.Class({
  "extends": cc.Component,
  properties: {
    type: RoadType.ENEMY,
    roadBean: null,
    //图标
    sprite: {
      "default": null,
      type: cc.SpriteFrame
    },
    costLabel: {
      "default": null,
      type: cc.Label
    },
    titleLabel: {
      "default": null,
      type: cc.Label
    },
    selectBtn: {
      "default": null,
      type: cc.Button
    },
    descLabel: {
      "default": null,
      type: cc.Label
    },
    levelLable: {
      "default": null,
      type: cc.Label
    }
  },
  start: function start() {// var node = new cc.Node('Sprite');
    // var sp = node.addComponent(cc.Sprite);
    // sp.spriteFrame = cardPic;
    // node.parent = this.node;
  },
  bindCardFunction: function bindCardFunction(fun) {
    this.checkFunction = fun;
  },
  getCardBean: function getCardBean() {
    return this.cardBean;
  },
  bindRoadBean: function bindRoadBean(type, roadBean) {
    this.roadBean = roadBean;
    this.type = type;
  },
  bindCardBean: function bindCardBean(cardBean) {
    this.cardBean = cardBean;
    this.titleLabel.string = this.cardBean.title;
    this.levelLable.string = this.cardBean.level;
    this.descLabel.string = this.cardBean.desc;
    this.titleLabel.string = this.cardBean.title;
  },
  // update: function (dt) {
  // },
  onLoad: function onLoad() {
    // this.node.on(cc.Node.EventType.TOUCH_START, this.onMouseDown, this);
    this.selectBtn.node.on("click", this.onSelect, this); // this.node.on("click", this.onMouseDown, this);
    //
    // this.node.on(cc.Node.EventType.TOUCH_MOVE,this.onTouchMove,this);
    // this.node.on(cc.Node.EventType.MOUSE_MOVE,this.onTouchMove,this);
    //
    // this.node.on(cc.Node.EventType.TOUCH_CANCEL,this.onTouchCancel,this);
    // this.node.on(cc.Node.EventType.MOUSE_LEAVE,this.onTouchCancel,this);
    // let self = this;

    this.node.y = 0; // this.location=[this.node.x,this.node.y];
    // this.normalHeight=this.node.height;
    // cc.resources.load("pokers", cc.SpriteAtlas, function (err, atlas) {
    //
    //     let frame = atlas.getSpriteFrame("181");
    //     console.log('onion==='+self.getComponent(cc.Sprite));
    //     self.getComponent(cc.Sprite).spriteFrame =frame
    //     this.spriteFrame= frame;
    // });
  },
  onSelect: function onSelect(event) {
    console.log("onion" + 'Press a key');
    event.stopPropagation();

    if (this.isCheck) {
      this.isCheck = false;
      this.node.y = this.node.y - 50;
      this.checkFunction && this.checkFunction(this, false);
    } else {
      this.isCheck = true;
      this.node.y = this.node.y + 50;
      this.checkFunction && this.checkFunction(this, true);
    }
  },
  onCancel: function onCancel() {
    if (this.isCheck) {
      this.isCheck = false;
      this.node.y = this.node.y - 50;
    }
  },
  onDestroy: function onDestroy() {
    // cc.systemEvent.off("mousedown", this.onMouseDown);
    // this.node.off("click", this.onMouseDown, this);
    // this.node.off(cc.Node.EventType.TOUCH_START, this.onMouseDown, this);
    if (cc.sys.isMobile) {
      this.node.off("click", this.onMouseDown, this);
    } else {
      this.node.off(cc.Node.EventType.MOUSE_DOWN, this.onMouseDown, this);
    }
  }
});

cc._RF.pop();