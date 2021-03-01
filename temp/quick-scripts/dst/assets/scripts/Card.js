
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/Card.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a33bdDMnNJPOoeK9yA2ZiuG', 'Card');
// scripts/Card.js

"use strict";

exports.__esModule = true;
exports.CardStatus = void 0;

var _CardBean = _interopRequireDefault(require("./beans/CardBean"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var CardStatus = {
  NORMAL: 1,
  //不能用状态
  CANUSE: 2,
  //能用高亮状态
  CURRENT: 3,
  //拖动状态 拖动动效，cancel判定y轴超过一定范围即使用
  TRY: 4 //指向性卡牌使用，在cancel时，判定落点是否有角色，是否为可用角色，再回调使用

};
exports.CardStatus = CardStatus;
cc.Class({
  "extends": cc.Component,
  properties: {
    cardBean: null,
    status: null,
    isCheck: false,
    sprite: {
      "default": null,
      type: cc.Sprite
    },
    costLabel: {
      "default": null,
      type: cc.Label
    },
    titleLabel: {
      "default": null,
      type: cc.Label
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
  bindCardBean: function bindCardBean(cardBean) {
    this.cardBean = cardBean;
    this.titleLabel.string = this.cardBean.title;
    this.costLabel.string = this.cardBean.cost;
    this.levelLable.string = this.cardBean.level;
    this.descLabel.string = this.cardBean.desc;
    this.titleLabel.string = this.cardBean.title;
  },
  // update: function (dt) {
  // },
  onLoad: function onLoad() {
    // this.node.on(cc.Node.EventType.TOUCH_START, this.onMouseDown, this);
    if (cc.sys.isMobile) {
      this.node.on("click", this.onMouseDown, this);
    } else {
      this.node.on(cc.Node.EventType.MOUSE_DOWN, this.onMouseDown, this);
    } // this.node.on("click", this.onMouseDown, this);
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
  onMouseDown: function onMouseDown(event) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL0NhcmQuanMiXSwibmFtZXMiOlsiQ2FyZFN0YXR1cyIsIk5PUk1BTCIsIkNBTlVTRSIsIkNVUlJFTlQiLCJUUlkiLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsImNhcmRCZWFuIiwic3RhdHVzIiwiaXNDaGVjayIsInNwcml0ZSIsInR5cGUiLCJTcHJpdGUiLCJjb3N0TGFiZWwiLCJMYWJlbCIsInRpdGxlTGFiZWwiLCJkZXNjTGFiZWwiLCJsZXZlbExhYmxlIiwic3RhcnQiLCJiaW5kQ2FyZEZ1bmN0aW9uIiwiZnVuIiwiY2hlY2tGdW5jdGlvbiIsImdldENhcmRCZWFuIiwiYmluZENhcmRCZWFuIiwic3RyaW5nIiwidGl0bGUiLCJjb3N0IiwibGV2ZWwiLCJkZXNjIiwib25Mb2FkIiwic3lzIiwiaXNNb2JpbGUiLCJub2RlIiwib24iLCJvbk1vdXNlRG93biIsIk5vZGUiLCJFdmVudFR5cGUiLCJNT1VTRV9ET1dOIiwieSIsImV2ZW50IiwiY29uc29sZSIsImxvZyIsInN0b3BQcm9wYWdhdGlvbiIsIm9uQ2FuY2VsIiwib25EZXN0cm95Iiwib2ZmIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBRU8sSUFBSUEsVUFBVSxHQUFHO0FBQ3BCQyxFQUFBQSxNQUFNLEVBQUUsQ0FEWTtBQUNWO0FBQ1ZDLEVBQUFBLE1BQU0sRUFBRSxDQUZZO0FBRVY7QUFDVkMsRUFBQUEsT0FBTyxFQUFFLENBSFc7QUFHVDtBQUNYQyxFQUFBQSxHQUFHLEVBQUUsQ0FKZSxDQUliOztBQUphLENBQWpCOztBQU9QQyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsUUFBUSxFQUFFLElBREY7QUFFUkMsSUFBQUEsTUFBTSxFQUFFLElBRkE7QUFHUkMsSUFBQUEsT0FBTyxFQUFFLEtBSEQ7QUFJUkMs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QUFLTixJQUFMLENBQVVNLENBQVYsR0FBYyxFQUE1QjtBQUNBLFdBQUtqQixhQUFMLElBQXNCLEtBQUtBLGFBQUwsQ0FBbUIsSUFBbkIsRUFBeUIsSUFBekIsQ0FBdEI7QUFDSDtBQUNKLEdBckdJO0FBdUdMc0IsRUFBQUEsUUFBUSxFQUFFLG9CQUFZO0FBQ2xCLFFBQUksS0FBS2xDLE9BQVQsRUFBa0I7QUFDZCxXQUFLQSxPQUFMLEdBQWUsS0FBZjtBQUNBLFdBQUt1QixJQUFMLENBQVVNLENBQVYsR0FBYyxLQUFLTixJQUFMLENBQVVNLENBQVYsR0FBYyxFQUE1QjtBQUNIO0FBRUosR0E3R0k7QUE4R0xNLEVBQUFBLFNBOUdLLHVCQThHTztBQUNSO0FBQ0E7QUFDQTtBQUNBLFFBQUl6QyxFQUFFLENBQUMyQixHQUFILENBQU9DLFFBQVgsRUFBcUI7QUFDakIsV0FBS0MsSUFBTCxDQUFVYSxHQUFWLENBQWMsT0FBZCxFQUF1QixLQUFLWCxXQUE1QixFQUF5QyxJQUF6QztBQUNILEtBRkQsTUFFTztBQUNILFdBQUtGLElBQUwsQ0FBVWEsR0FBVixDQUFjMUMsRUFBRSxDQUFDZ0MsSUFBSCxDQUFRQyxTQUFSLENBQWtCQyxVQUFoQyxFQUE0QyxLQUFLSCxXQUFqRCxFQUE4RCxJQUE5RDtBQUNIO0FBRUo7QUF4SEksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENhcmRCZWFuIGZyb20gXCIuL2JlYW5zL0NhcmRCZWFuXCI7XG5cbmV4cG9ydCB2YXIgQ2FyZFN0YXR1cyA9IHtcbiAgICBOT1JNQUw6IDEsLy/kuI3og73nlKjnirbmgIFcbiAgICBDQU5VU0U6IDIsLy/og73nlKjpq5jkuq7nirbmgIFcbiAgICBDVVJSRU5UOiAzLC8v5ouW5Yqo54q25oCBIOaLluWKqOWKqOaViO+8jGNhbmNlbOWIpOWumnnovbTotoXov4fkuIDlrprojIPlm7TljbPkvb/nlKhcbiAgICBUUlk6IDQsLy/mjIflkJHmgKfljaHniYzkvb/nlKjvvIzlnKhjYW5jZWzml7bvvIzliKTlrprokL3ngrnmmK/lkKbmnInop5LoibLvvIzmmK/lkKbkuLrlj6/nlKjop5LoibLvvIzlho3lm57osIPkvb/nlKhcblxufVxuY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgY2FyZEJlYW46IG51bGwsXG4gICAgICAgIHN0YXR1czogbnVsbCxcbiAgICAgICAgaXNDaGVjazogZmFsc2UsXG4gICAgICAgIHNwcml0ZToge1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZSxcbiAgICAgICAgfSxcbiAgICAgICAgY29zdExhYmVsOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXG4gICAgICAgIH0sXG4gICAgICAgIHRpdGxlTGFiZWw6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcbiAgICAgICAgfSxcbiAgICAgICAgZGVzY0xhYmVsOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXG4gICAgICAgIH0sXG4gICAgICAgIGxldmVsTGFibGU6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcbiAgICAgICAgfSxcblxuXG4gICAgfSxcbiAgICBzdGFydDogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIC8vIHZhciBub2RlID0gbmV3IGNjLk5vZGUoJ1Nwcml0ZScpO1xuICAgICAgICAvLyB2YXIgc3AgPSBub2RlLmFkZENvbXBvbmVudChjYy5TcHJpdGUpO1xuXG4gICAgICAgIC8vIHNwLnNwcml0ZUZyYW1lID0gY2FyZFBpYztcbiAgICAgICAgLy8gbm9kZS5wYXJlbnQgPSB0aGlzLm5vZGU7XG5cblxuICAgIH0sXG5cbiAgICBiaW5kQ2FyZEZ1bmN0aW9uKGZ1bikge1xuICAgICAgICB0aGlzLmNoZWNrRnVuY3Rpb24gPSBmdW47XG4gICAgfSxcblxuICAgIGdldENhcmRCZWFuKCl7XG4gICAgICByZXR1cm4gdGhpcy5jYXJkQmVhbjtcbiAgICB9LFxuICAgIGJpbmRDYXJkQmVhbihjYXJkQmVhbikge1xuICAgICAgICB0aGlzLmNhcmRCZWFuID0gY2FyZEJlYW47XG4gICAgICAgIHRoaXMudGl0bGVMYWJlbC5zdHJpbmcgPSB0aGlzLmNhcmRCZWFuLnRpdGxlO1xuICAgICAgICB0aGlzLmNvc3RMYWJlbC5zdHJpbmcgPSB0aGlzLmNhcmRCZWFuLmNvc3Q7XG4gICAgICAgIHRoaXMubGV2ZWxMYWJsZS5zdHJpbmcgPSB0aGlzLmNhcmRCZWFuLmxldmVsO1xuICAgICAgICB0aGlzLmRlc2NMYWJlbC5zdHJpbmcgPSB0aGlzLmNhcmRCZWFuLmRlc2M7XG4gICAgICAgIHRoaXMudGl0bGVMYWJlbC5zdHJpbmcgPSB0aGlzLmNhcmRCZWFuLnRpdGxlO1xuICAgIH0sXG5cbiAgICAvLyB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xuICAgIC8vIH0sXG5cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCB0aGlzLm9uTW91c2VEb3duLCB0aGlzKTtcbiAgICAgICAgaWYgKGNjLnN5cy5pc01vYmlsZSkge1xuICAgICAgICAgICAgdGhpcy5ub2RlLm9uKFwiY2xpY2tcIiwgdGhpcy5vbk1vdXNlRG93biwgdGhpcyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuTU9VU0VfRE9XTiwgdGhpcy5vbk1vdXNlRG93biwgdGhpcyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyB0aGlzLm5vZGUub24oXCJjbGlja1wiLCB0aGlzLm9uTW91c2VEb3duLCB0aGlzKTtcbiAgICAgICAgLy9cbiAgICAgICAgLy8gdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX01PVkUsdGhpcy5vblRvdWNoTW92ZSx0aGlzKTtcbiAgICAgICAgLy8gdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLk1PVVNFX01PVkUsdGhpcy5vblRvdWNoTW92ZSx0aGlzKTtcbiAgICAgICAgLy9cbiAgICAgICAgLy8gdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0NBTkNFTCx0aGlzLm9uVG91Y2hDYW5jZWwsdGhpcyk7XG4gICAgICAgIC8vIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5NT1VTRV9MRUFWRSx0aGlzLm9uVG91Y2hDYW5jZWwsdGhpcyk7XG4gICAgICAgIC8vIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy5ub2RlLnkgPSAwO1xuICAgICAgICAvLyB0aGlzLmxvY2F0aW9uPVt0aGlzLm5vZGUueCx0aGlzLm5vZGUueV07XG4gICAgICAgIC8vIHRoaXMubm9ybWFsSGVpZ2h0PXRoaXMubm9kZS5oZWlnaHQ7XG5cblxuICAgICAgICAvLyBjYy5yZXNvdXJjZXMubG9hZChcInBva2Vyc1wiLCBjYy5TcHJpdGVBdGxhcywgZnVuY3Rpb24gKGVyciwgYXRsYXMpIHtcbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgIGxldCBmcmFtZSA9IGF0bGFzLmdldFNwcml0ZUZyYW1lKFwiMTgxXCIpO1xuICAgICAgICAvLyAgICAgY29uc29sZS5sb2coJ29uaW9uPT09JytzZWxmLmdldENvbXBvbmVudChjYy5TcHJpdGUpKTtcbiAgICAgICAgLy8gICAgIHNlbGYuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPWZyYW1lXG4gICAgICAgIC8vICAgICB0aGlzLnNwcml0ZUZyYW1lPSBmcmFtZTtcbiAgICAgICAgLy8gfSk7XG4gICAgfSxcbiAgICBvbk1vdXNlRG93bjogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwib25pb25cIiArICdQcmVzcyBhIGtleScpO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgaWYgKHRoaXMuaXNDaGVjaykge1xuICAgICAgICAgICAgdGhpcy5pc0NoZWNrID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLm5vZGUueSA9IHRoaXMubm9kZS55IC0gNTA7XG4gICAgICAgICAgICB0aGlzLmNoZWNrRnVuY3Rpb24gJiYgdGhpcy5jaGVja0Z1bmN0aW9uKHRoaXMsIGZhbHNlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaXNDaGVjayA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLm5vZGUueSA9IHRoaXMubm9kZS55ICsgNTA7XG4gICAgICAgICAgICB0aGlzLmNoZWNrRnVuY3Rpb24gJiYgdGhpcy5jaGVja0Z1bmN0aW9uKHRoaXMsIHRydWUpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIG9uQ2FuY2VsOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzQ2hlY2spIHtcbiAgICAgICAgICAgIHRoaXMuaXNDaGVjayA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5ub2RlLnkgPSB0aGlzLm5vZGUueSAtIDUwO1xuICAgICAgICB9XG5cbiAgICB9LFxuICAgIG9uRGVzdHJveSgpIHtcbiAgICAgICAgLy8gY2Muc3lzdGVtRXZlbnQub2ZmKFwibW91c2Vkb3duXCIsIHRoaXMub25Nb3VzZURvd24pO1xuICAgICAgICAvLyB0aGlzLm5vZGUub2ZmKFwiY2xpY2tcIiwgdGhpcy5vbk1vdXNlRG93biwgdGhpcyk7XG4gICAgICAgIC8vIHRoaXMubm9kZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsIHRoaXMub25Nb3VzZURvd24sIHRoaXMpO1xuICAgICAgICBpZiAoY2Muc3lzLmlzTW9iaWxlKSB7XG4gICAgICAgICAgICB0aGlzLm5vZGUub2ZmKFwiY2xpY2tcIiwgdGhpcy5vbk1vdXNlRG93biwgdGhpcyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm5vZGUub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLk1PVVNFX0RPV04sIHRoaXMub25Nb3VzZURvd24sIHRoaXMpO1xuICAgICAgICB9XG5cbiAgICB9LFxuXG5cbn0pO1xuIl19