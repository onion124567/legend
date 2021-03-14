
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/RoadCard.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b0d4b/RYn5GLrl62TzzdTTI', 'RoadCard');
// scripts/RoadCard.js

"use strict";

exports.__esModule = true;
exports.createRoadBean = createRoadBean;
exports.RoadType = void 0;

var _Director = _interopRequireDefault(require("./Director"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * 道路卡片
 */
var RoadType = {
  ENEMY: 1,
  //野怪
  RECOVER: 2,
  //恢复
  SHOP: 3
};
exports.RoadType = RoadType;

function createRoadBean(roadtype, hpRecover, cardList) {
  return {
    roadtype: roadtype,
    hpRecover: hpRecover,
    cardList: cardList
  };
}

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
  getRoadBean: function getRoadBean() {
    return this.roadBean;
  },
  bindRoadBean: function bindRoadBean(type, roadBean) {
    this.roadBean = roadBean;
    this.type = type;
    this.titleLabel.string = this.cardBean.title;
    this.levelLable.string = this.cardBean.level;
    this.descLabel.string = this.cardBean.desc;
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

    if (this.type == RoadType.RECOVER) {
      //发出增长hp的事件
      _Director["default"].hostHero.hp += 10;
    } else {
      //从卡面取得敌人信息
      _Director["default"].currentEnemy = this.roadBean;
      cc.director.loadScene('game');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL1JvYWRDYXJkLmpzIl0sIm5hbWVzIjpbIlJvYWRUeXBlIiwiRU5FTVkiLCJSRUNPVkVSIiwiU0hPUCIsImNyZWF0ZVJvYWRCZWFuIiwicm9hZHR5cGUiLCJocFJlY292ZXIiLCJjYXJkTGlzdCIsImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwidHlwZSIsInJvYWRCZWFuIiwic3ByaXRlIiwiU3ByaXRlRnJhbWUiLCJjb3N0TGFiZWwiLCJMYWJlbCIsInRpdGxlTGFiZWwiLCJzZWxlY3RCdG4iLCJCdXR0b24iLCJkZXNjTGFiZWwiLCJsZXZlbExhYmxlIiwic3RhcnQiLCJiaW5kQ2FyZEZ1bmN0aW9uIiwiZnVuIiwiY2hlY2tGdW5jdGlvbiIsImdldFJvYWRCZWFuIiwiYmluZFJvYWRCZWFuIiwic3RyaW5nIiwiY2FyZEJlYW4iLCJ0aXRsZSIsImxldmVsIiwiZGVzYyIsIm9uTG9hZCIsIm5vZGUiLCJvbiIsIm9uU2VsZWN0IiwieSIsImV2ZW50IiwiY29uc29sZSIsImxvZyIsIkRpcmVjdG9yIiwiaG9zdEhlcm8iLCJocCIsImN1cnJlbnRFbmVteSIsImRpcmVjdG9yIiwibG9hZFNjZW5lIiwib25DYW5jZWwiLCJpc0NoZWNrIiwib25EZXN0cm95Iiwic3lzIiwiaXNNb2JpbGUiLCJvZmYiLCJvbk1vdXNlRG93biIsIk5vZGUiLCJFdmVudFR5cGUiLCJNT1VTRV9ET1dOIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQTs7OztBQUhBOzs7QUFLTyxJQUFJQSxRQUFRLEdBQUc7QUFDbEJDLEVBQUFBLEtBQUssRUFBRSxDQURXO0FBQ1Q7QUFDVEMsRUFBQUEsT0FBTyxFQUFFLENBRlM7QUFFUDtBQUNYQyxFQUFBQSxJQUFJLEVBQUM7QUFIYSxDQUFmOzs7QUFNQSxTQUFTQyxjQUFULENBQXdCQyxRQUF4QixFQUFpQ0MsU0FBakMsRUFBMkNDLFFBQTNDLEVBQXFEO0FBQ3hELFNBQU87QUFD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LE1BQXRCO0FBQ0g7QUFDSCxHQXBHSTtBQXNHTEMsRUFBQUEsUUFBUSxFQUFFLG9CQUFZO0FBQ2xCLFFBQUksS0FBS0MsT0FBVCxFQUFrQjtBQUNkLFdBQUtBLE9BQUwsR0FBZSxLQUFmO0FBQ0EsV0FBS2QsSUFBTCxDQUFVRyxDQUFWLEdBQWMsS0FBS0gsSUFBTCxDQUFVRyxDQUFWLEdBQWMsRUFBNUI7QUFDSDtBQUVKLEdBNUdJO0FBNkdMWSxFQUFBQSxTQTdHSyx1QkE2R087QUFDUjtBQUNBO0FBQ0E7QUFDQSxRQUFJMUMsRUFBRSxDQUFDMkMsR0FBSCxDQUFPQyxRQUFYLEVBQXFCO0FBQ2pCLFdBQUtqQixJQUFMLENBQVVrQixHQUFWLENBQWMsT0FBZCxFQUF1QixLQUFLQyxXQUE1QixFQUF5QyxJQUF6QztBQUNILEtBRkQsTUFFTztBQUNILFdBQUtuQixJQUFMLENBQVVrQixHQUFWLENBQWM3QyxFQUFFLENBQUMrQyxJQUFILENBQVFDLFNBQVIsQ0FBa0JDLFVBQWhDLEVBQTRDLEtBQUtILFdBQWpELEVBQThELElBQTlEO0FBQ0g7QUFFSjtBQXZISSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIOmBk+i3r+WNoeeJh1xuICovXG5pbXBvcnQgRGlyZWN0b3IgZnJvbSBcIi4vRGlyZWN0b3JcIjtcblxuZXhwb3J0IHZhciBSb2FkVHlwZSA9IHtcbiAgICBFTkVNWTogMSwvL+mHjuaAqlxuICAgIFJFQ09WRVI6IDIsLy/mgaLlpI1cbiAgICBTSE9QOjMsXG5cbn1cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVSb2FkQmVhbihyb2FkdHlwZSxocFJlY292ZXIsY2FyZExpc3QpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICByb2FkdHlwZTpyb2FkdHlwZSxcbiAgICAgICAgaHBSZWNvdmVyOmhwUmVjb3ZlcixcbiAgICAgICAgY2FyZExpc3Q6Y2FyZExpc3RcbiAgICB9XG59XG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICB0eXBlOiBSb2FkVHlwZS5FTkVNWSxcbiAgICAgICAgcm9hZEJlYW46bnVsbCxcbiAgICAgICAgLy/lm77moIdcbiAgICAgICAgc3ByaXRlOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlRnJhbWUsXG4gICAgICAgIH0sXG4gICAgICAgIGNvc3RMYWJlbDoge1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxuICAgICAgICB9LFxuICAgICAgICB0aXRsZUxhYmVsOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXG4gICAgICAgIH0sXG4gICAgICAgIHNlbGVjdEJ0bjoge1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkJ1dHRvbixcbiAgICAgICAgfSxcbiAgICAgICAgZGVzY0xhYmVsOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXG4gICAgICAgIH0sXG4gICAgICAgIGxldmVsTGFibGU6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcbiAgICAgICAgfSxcblxuXG4gICAgfSxcbiAgICBzdGFydDogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIC8vIHZhciBub2RlID0gbmV3IGNjLk5vZGUoJ1Nwcml0ZScpO1xuICAgICAgICAvLyB2YXIgc3AgPSBub2RlLmFkZENvbXBvbmVudChjYy5TcHJpdGUpO1xuXG4gICAgICAgIC8vIHNwLnNwcml0ZUZyYW1lID0gY2FyZFBpYztcbiAgICAgICAgLy8gbm9kZS5wYXJlbnQgPSB0aGlzLm5vZGU7XG5cblxuICAgIH0sXG5cbiAgICBiaW5kQ2FyZEZ1bmN0aW9uKGZ1bikge1xuICAgICAgICB0aGlzLmNoZWNrRnVuY3Rpb24gPSBmdW47XG4gICAgfSxcblxuICAgIGdldFJvYWRCZWFuKCl7XG4gICAgICByZXR1cm4gdGhpcy5yb2FkQmVhbjtcbiAgICB9LFxuXG4gICAgYmluZFJvYWRCZWFuKHR5cGUscm9hZEJlYW4pe1xuICAgICAgICB0aGlzLnJvYWRCZWFuPXJvYWRCZWFuO1xuICAgICAgICB0aGlzLnR5cGU9dHlwZTtcblxuICAgICAgICB0aGlzLnRpdGxlTGFiZWwuc3RyaW5nID0gdGhpcy5jYXJkQmVhbi50aXRsZTtcbiAgICAgICAgdGhpcy5sZXZlbExhYmxlLnN0cmluZyA9IHRoaXMuY2FyZEJlYW4ubGV2ZWw7XG4gICAgICAgIHRoaXMuZGVzY0xhYmVsLnN0cmluZyA9IHRoaXMuY2FyZEJlYW4uZGVzYztcblxuICAgIH0sXG4gICAgLy8gdXBkYXRlOiBmdW5jdGlvbiAoZHQpIHtcbiAgICAvLyB9LFxuXG4gICAgb25Mb2FkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCwgdGhpcy5vbk1vdXNlRG93biwgdGhpcyk7XG4gICAgICAgIHRoaXMuc2VsZWN0QnRuLm5vZGUub24oXCJjbGlja1wiLCB0aGlzLm9uU2VsZWN0LCB0aGlzKTtcblxuICAgICAgICAvLyB0aGlzLm5vZGUub24oXCJjbGlja1wiLCB0aGlzLm9uTW91c2VEb3duLCB0aGlzKTtcbiAgICAgICAgLy9cbiAgICAgICAgLy8gdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX01PVkUsdGhpcy5vblRvdWNoTW92ZSx0aGlzKTtcbiAgICAgICAgLy8gdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLk1PVVNFX01PVkUsdGhpcy5vblRvdWNoTW92ZSx0aGlzKTtcbiAgICAgICAgLy9cbiAgICAgICAgLy8gdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0NBTkNFTCx0aGlzLm9uVG91Y2hDYW5jZWwsdGhpcyk7XG4gICAgICAgIC8vIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5NT1VTRV9MRUFWRSx0aGlzLm9uVG91Y2hDYW5jZWwsdGhpcyk7XG4gICAgICAgIC8vIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy5ub2RlLnkgPSAwO1xuICAgICAgICAvLyB0aGlzLmxvY2F0aW9uPVt0aGlzLm5vZGUueCx0aGlzLm5vZGUueV07XG4gICAgICAgIC8vIHRoaXMubm9ybWFsSGVpZ2h0PXRoaXMubm9kZS5oZWlnaHQ7XG5cblxuICAgICAgICAvLyBjYy5yZXNvdXJjZXMubG9hZChcInBva2Vyc1wiLCBjYy5TcHJpdGVBdGxhcywgZnVuY3Rpb24gKGVyciwgYXRsYXMpIHtcbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgIGxldCBmcmFtZSA9IGF0bGFzLmdldFNwcml0ZUZyYW1lKFwiMTgxXCIpO1xuICAgICAgICAvLyAgICAgY29uc29sZS5sb2coJ29uaW9uPT09JytzZWxmLmdldENvbXBvbmVudChjYy5TcHJpdGUpKTtcbiAgICAgICAgLy8gICAgIHNlbGYuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPWZyYW1lXG4gICAgICAgIC8vICAgICB0aGlzLnNwcml0ZUZyYW1lPSBmcmFtZTtcbiAgICAgICAgLy8gfSk7XG4gICAgfSxcbiAgICBvblNlbGVjdDogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwib25pb25cIiArICdQcmVzcyBhIGtleScpO1xuICAgICAgIGlmKHRoaXMudHlwZT09Um9hZFR5cGUuUkVDT1ZFUil7XG4gICAgICAgICAgIC8v5Y+R5Ye65aKe6ZW/aHDnmoTkuovku7ZcbiAgICAgICAgICAgRGlyZWN0b3IuaG9zdEhlcm8uaHArPTEwO1xuICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgLy/ku47ljaHpnaLlj5blvpfmlYzkurrkv6Hmga9cbiAgICAgICAgICAgRGlyZWN0b3IuY3VycmVudEVuZW15PXRoaXMucm9hZEJlYW47XG4gICAgICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZSgnZ2FtZScpO1xuICAgICAgIH1cbiAgICB9LFxuXG4gICAgb25DYW5jZWw6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNDaGVjaykge1xuICAgICAgICAgICAgdGhpcy5pc0NoZWNrID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLm5vZGUueSA9IHRoaXMubm9kZS55IC0gNTA7XG4gICAgICAgIH1cblxuICAgIH0sXG4gICAgb25EZXN0cm95KCkge1xuICAgICAgICAvLyBjYy5zeXN0ZW1FdmVudC5vZmYoXCJtb3VzZWRvd25cIiwgdGhpcy5vbk1vdXNlRG93bik7XG4gICAgICAgIC8vIHRoaXMubm9kZS5vZmYoXCJjbGlja1wiLCB0aGlzLm9uTW91c2VEb3duLCB0aGlzKTtcbiAgICAgICAgLy8gdGhpcy5ub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCwgdGhpcy5vbk1vdXNlRG93biwgdGhpcyk7XG4gICAgICAgIGlmIChjYy5zeXMuaXNNb2JpbGUpIHtcbiAgICAgICAgICAgIHRoaXMubm9kZS5vZmYoXCJjbGlja1wiLCB0aGlzLm9uTW91c2VEb3duLCB0aGlzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubm9kZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuTU9VU0VfRE9XTiwgdGhpcy5vbk1vdXNlRG93biwgdGhpcyk7XG4gICAgICAgIH1cblxuICAgIH0sXG5cblxufSk7XG4iXX0=