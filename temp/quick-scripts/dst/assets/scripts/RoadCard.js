
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL1JvYWRDYXJkLmpzIl0sIm5hbWVzIjpbIlJvYWRUeXBlIiwiRU5FTVkiLCJSRUNPVkVSIiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJ0eXBlIiwicm9hZEJlYW4iLCJzcHJpdGUiLCJTcHJpdGVGcmFtZSIsImNvc3RMYWJlbCIsIkxhYmVsIiwidGl0bGVMYWJlbCIsInNlbGVjdEJ0biIsIkJ1dHRvbiIsImRlc2NMYWJlbCIsImxldmVsTGFibGUiLCJzdGFydCIsImJpbmRDYXJkRnVuY3Rpb24iLCJmdW4iLCJjaGVja0Z1bmN0aW9uIiwiZ2V0Q2FyZEJlYW4iLCJjYXJkQmVhbiIsImJpbmRSb2FkQmVhbiIsImJpbmRDYXJkQmVhbiIsInN0cmluZyIsInRpdGxlIiwibGV2ZWwiLCJkZXNjIiwib25Mb2FkIiwibm9kZSIsIm9uIiwib25TZWxlY3QiLCJ5IiwiZXZlbnQiLCJjb25zb2xlIiwibG9nIiwic3RvcFByb3BhZ2F0aW9uIiwiaXNDaGVjayIsIm9uQ2FuY2VsIiwib25EZXN0cm95Iiwic3lzIiwiaXNNb2JpbGUiLCJvZmYiLCJvbk1vdXNlRG93biIsIk5vZGUiLCJFdmVudFR5cGUiLCJNT1VTRV9ET1dOIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7QUFHTyxJQUFJQSxRQUFRLEdBQUc7QUFDbEJDLEVBQUFBLEtBQUssRUFBRSxDQURXO0FBQ1Q7QUFDVEMsRUFBQUEsT0FBTyxFQUFFLENBRlMsQ0FFUDs7QUFGTyxDQUFmOztBQUlQQyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsSUFBSSxFQUFFUCxRQUFRLENBQUNDLEtBRFA7QUFFUk8sSUFBQUEsUUFBUSxFQUFDLElBRkQ7QUFHUjtBQUNBQyxJQUFBQSxNQUFNLEVBQUU7QUFDSixpQkFBUyxJQURMO0FBRUpGLE1BQUFB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Q0FBbUIsSUFBbkIsRUFBeUIsSUFBekIsQ0FBdEI7QUFDSDtBQUNKLEdBMUdJO0FBNEdMbUIsRUFBQUEsUUFBUSxFQUFFLG9CQUFZO0FBQ2xCLFFBQUksS0FBS0QsT0FBVCxFQUFrQjtBQUNkLFdBQUtBLE9BQUwsR0FBZSxLQUFmO0FBQ0EsV0FBS1IsSUFBTCxDQUFVRyxDQUFWLEdBQWMsS0FBS0gsSUFBTCxDQUFVRyxDQUFWLEdBQWMsRUFBNUI7QUFDSDtBQUVKLEdBbEhJO0FBbUhMTyxFQUFBQSxTQW5ISyx1QkFtSE87QUFDUjtBQUNBO0FBQ0E7QUFDQSxRQUFJdEMsRUFBRSxDQUFDdUMsR0FBSCxDQUFPQyxRQUFYLEVBQXFCO0FBQ2pCLFdBQUtaLElBQUwsQ0FBVWEsR0FBVixDQUFjLE9BQWQsRUFBdUIsS0FBS0MsV0FBNUIsRUFBeUMsSUFBekM7QUFDSCxLQUZELE1BRU87QUFDSCxXQUFLZCxJQUFMLENBQVVhLEdBQVYsQ0FBY3pDLEVBQUUsQ0FBQzJDLElBQUgsQ0FBUUMsU0FBUixDQUFrQkMsVUFBaEMsRUFBNEMsS0FBS0gsV0FBakQsRUFBOEQsSUFBOUQ7QUFDSDtBQUVKO0FBN0hJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICog6YGT6Lev5Y2h54mHXG4gKi9cbmV4cG9ydCB2YXIgUm9hZFR5cGUgPSB7XG4gICAgRU5FTVk6IDEsLy/ph47mgKpcbiAgICBSRUNPVkVSOiAyLC8v5oGi5aSNXG59XG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICB0eXBlOiBSb2FkVHlwZS5FTkVNWSxcbiAgICAgICAgcm9hZEJlYW46bnVsbCxcbiAgICAgICAgLy/lm77moIdcbiAgICAgICAgc3ByaXRlOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlRnJhbWUsXG4gICAgICAgIH0sXG4gICAgICAgIGNvc3RMYWJlbDoge1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxuICAgICAgICB9LFxuICAgICAgICB0aXRsZUxhYmVsOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXG4gICAgICAgIH0sXG4gICAgICAgIHNlbGVjdEJ0bjoge1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkJ1dHRvbixcbiAgICAgICAgfSxcbiAgICAgICAgZGVzY0xhYmVsOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXG4gICAgICAgIH0sXG4gICAgICAgIGxldmVsTGFibGU6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcbiAgICAgICAgfSxcblxuXG4gICAgfSxcbiAgICBzdGFydDogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIC8vIHZhciBub2RlID0gbmV3IGNjLk5vZGUoJ1Nwcml0ZScpO1xuICAgICAgICAvLyB2YXIgc3AgPSBub2RlLmFkZENvbXBvbmVudChjYy5TcHJpdGUpO1xuXG4gICAgICAgIC8vIHNwLnNwcml0ZUZyYW1lID0gY2FyZFBpYztcbiAgICAgICAgLy8gbm9kZS5wYXJlbnQgPSB0aGlzLm5vZGU7XG5cblxuICAgIH0sXG5cbiAgICBiaW5kQ2FyZEZ1bmN0aW9uKGZ1bikge1xuICAgICAgICB0aGlzLmNoZWNrRnVuY3Rpb24gPSBmdW47XG4gICAgfSxcblxuICAgIGdldENhcmRCZWFuKCl7XG4gICAgICByZXR1cm4gdGhpcy5jYXJkQmVhbjtcbiAgICB9LFxuXG4gICAgYmluZFJvYWRCZWFuKHR5cGUscm9hZEJlYW4pe1xuICAgICAgICB0aGlzLnJvYWRCZWFuPXJvYWRCZWFuO1xuICAgICAgICB0aGlzLnR5cGU9dHlwZTtcbiAgICB9LFxuICAgIGJpbmRDYXJkQmVhbihjYXJkQmVhbikge1xuICAgICAgICB0aGlzLmNhcmRCZWFuID0gY2FyZEJlYW47XG4gICAgICAgIHRoaXMudGl0bGVMYWJlbC5zdHJpbmcgPSB0aGlzLmNhcmRCZWFuLnRpdGxlO1xuXG4gICAgICAgIHRoaXMubGV2ZWxMYWJsZS5zdHJpbmcgPSB0aGlzLmNhcmRCZWFuLmxldmVsO1xuICAgICAgICB0aGlzLmRlc2NMYWJlbC5zdHJpbmcgPSB0aGlzLmNhcmRCZWFuLmRlc2M7XG4gICAgICAgIHRoaXMudGl0bGVMYWJlbC5zdHJpbmcgPSB0aGlzLmNhcmRCZWFuLnRpdGxlO1xuICAgIH0sXG5cbiAgICAvLyB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xuICAgIC8vIH0sXG5cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCB0aGlzLm9uTW91c2VEb3duLCB0aGlzKTtcbiAgICAgICAgdGhpcy5zZWxlY3RCdG4ubm9kZS5vbihcImNsaWNrXCIsIHRoaXMub25TZWxlY3QsIHRoaXMpO1xuXG4gICAgICAgIC8vIHRoaXMubm9kZS5vbihcImNsaWNrXCIsIHRoaXMub25Nb3VzZURvd24sIHRoaXMpO1xuICAgICAgICAvL1xuICAgICAgICAvLyB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfTU9WRSx0aGlzLm9uVG91Y2hNb3ZlLHRoaXMpO1xuICAgICAgICAvLyB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuTU9VU0VfTU9WRSx0aGlzLm9uVG91Y2hNb3ZlLHRoaXMpO1xuICAgICAgICAvL1xuICAgICAgICAvLyB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfQ0FOQ0VMLHRoaXMub25Ub3VjaENhbmNlbCx0aGlzKTtcbiAgICAgICAgLy8gdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLk1PVVNFX0xFQVZFLHRoaXMub25Ub3VjaENhbmNlbCx0aGlzKTtcbiAgICAgICAgLy8gbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICB0aGlzLm5vZGUueSA9IDA7XG4gICAgICAgIC8vIHRoaXMubG9jYXRpb249W3RoaXMubm9kZS54LHRoaXMubm9kZS55XTtcbiAgICAgICAgLy8gdGhpcy5ub3JtYWxIZWlnaHQ9dGhpcy5ub2RlLmhlaWdodDtcblxuXG4gICAgICAgIC8vIGNjLnJlc291cmNlcy5sb2FkKFwicG9rZXJzXCIsIGNjLlNwcml0ZUF0bGFzLCBmdW5jdGlvbiAoZXJyLCBhdGxhcykge1xuICAgICAgICAvL1xuICAgICAgICAvLyAgICAgbGV0IGZyYW1lID0gYXRsYXMuZ2V0U3ByaXRlRnJhbWUoXCIxODFcIik7XG4gICAgICAgIC8vICAgICBjb25zb2xlLmxvZygnb25pb249PT0nK3NlbGYuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkpO1xuICAgICAgICAvLyAgICAgc2VsZi5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9ZnJhbWVcbiAgICAgICAgLy8gICAgIHRoaXMuc3ByaXRlRnJhbWU9IGZyYW1lO1xuICAgICAgICAvLyB9KTtcbiAgICB9LFxuICAgIG9uU2VsZWN0OiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJvbmlvblwiICsgJ1ByZXNzIGEga2V5Jyk7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBpZiAodGhpcy5pc0NoZWNrKSB7XG4gICAgICAgICAgICB0aGlzLmlzQ2hlY2sgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMubm9kZS55ID0gdGhpcy5ub2RlLnkgLSA1MDtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tGdW5jdGlvbiAmJiB0aGlzLmNoZWNrRnVuY3Rpb24odGhpcywgZmFsc2UpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5pc0NoZWNrID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMubm9kZS55ID0gdGhpcy5ub2RlLnkgKyA1MDtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tGdW5jdGlvbiAmJiB0aGlzLmNoZWNrRnVuY3Rpb24odGhpcywgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgb25DYW5jZWw6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNDaGVjaykge1xuICAgICAgICAgICAgdGhpcy5pc0NoZWNrID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLm5vZGUueSA9IHRoaXMubm9kZS55IC0gNTA7XG4gICAgICAgIH1cblxuICAgIH0sXG4gICAgb25EZXN0cm95KCkge1xuICAgICAgICAvLyBjYy5zeXN0ZW1FdmVudC5vZmYoXCJtb3VzZWRvd25cIiwgdGhpcy5vbk1vdXNlRG93bik7XG4gICAgICAgIC8vIHRoaXMubm9kZS5vZmYoXCJjbGlja1wiLCB0aGlzLm9uTW91c2VEb3duLCB0aGlzKTtcbiAgICAgICAgLy8gdGhpcy5ub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCwgdGhpcy5vbk1vdXNlRG93biwgdGhpcyk7XG4gICAgICAgIGlmIChjYy5zeXMuaXNNb2JpbGUpIHtcbiAgICAgICAgICAgIHRoaXMubm9kZS5vZmYoXCJjbGlja1wiLCB0aGlzLm9uTW91c2VEb3duLCB0aGlzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubm9kZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuTU9VU0VfRE9XTiwgdGhpcy5vbk1vdXNlRG93biwgdGhpcyk7XG4gICAgICAgIH1cblxuICAgIH0sXG5cblxufSk7XG4iXX0=