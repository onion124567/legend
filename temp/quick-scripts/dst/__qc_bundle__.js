
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/__qc_index__.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}
require('./assets/migration/use_v2.0.x_cc.Toggle_event');
require('./assets/scripts/AIHelper');
require('./assets/scripts/Card');
require('./assets/scripts/Director');
require('./assets/scripts/Game');
require('./assets/scripts/Gamebeifen');
require('./assets/scripts/MainBtn');
require('./assets/scripts/MainHotel');
require('./assets/scripts/Other');
require('./assets/scripts/Pokemon');
require('./assets/scripts/PokerUtil');
require('./assets/scripts/RoadCard');
require('./assets/scripts/RoadMapPage');
require('./assets/scripts/Role');
require('./assets/scripts/beans/CardBean');
require('./assets/scripts/beans/RoleBean');
require('./assets/scripts/beans/StatusBean');

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
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/Gamebeifen.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '0612deHWLpCuJSSpnvVg6h9', 'Gamebeifen');
// scripts/Gamebeifen.js

"use strict";

var PokerUtil = require("PokerUtil");

var AIHelper = require("AIHelper");

var self;
cc.Class({
  "extends": cc.Component,
  properties: {
    // 这个属性引用了星星预制资源
    starPrefab: {
      "default": null,
      type: cc.Prefab
    },
    cardPrefab: {
      "default": null,
      type: cc.Prefab
    },
    // 星星产生后消失时间的随机范围
    maxStarDuration: 0,
    minStarDuration: 0,
    currentCardPosition: 0,
    startCardPostion: 0,
    cardWidth: 80,
    logicHelper: null,
    cardArray: [cc.String],
    //初始牌数组 逆时针 主角是第一个数组
    pokerPlayer: [],
    //当前轮次出牌节点,
    roundPoker: [],
    sendArray: [],
    //主角当前牌节点
    playerControlNodeArray: [],
    //洗牌
    refreshButton: {
      "default": null,
      type: cc.Button
    },
    //出牌
    sendButton: {
      "default": null,
      type: cc.Button
    },
    //出牌
    backButton: {
      "default": null,
      type: cc.Button
    },
    //当前胜方
    currentWinner: 1,
    //本轮主
    gameHost: "1",
    //玩家拥有牌
    layoutContainer: {
      "default": null,
      type: cc.Layout
    },
    //玩家出的牌 
    layoutBottom: {
      "default": null,
      type: cc.Layout
    },
    //对家出牌 第三位
    layoutTop: {
      "default": null,
      type: cc.Layout
    },
    //下家出牌 左手第二位
    layoutLeft: {
      "default": null,
      type: cc.Layout
    },
    //上家出牌，右手第四位
    layoutRight: {
      "default": null,
      type: cc.Layout
    },
    //战报
    logLabel: {
      "default": null,
      type: cc.Label
    },
    playLog: "游戏开始",
    // 地面节点，用于确定星星生成的高度
    ground: {
      "default": null,
      type: cc.Node
    },
    // player 节点，用于获取主角弹跳的高度，和控制主角行动开关
    player: {
      "default": null,
      type: cc.Node
    },
    // score label 的引用
    scoreDisplay: {
      "default": null,
      type: cc.Label
    },
    // 得分音效资源
    scoreAudio: {
      "default": null,
      type: cc.AudioClip
    }
  },
  onLoad: function onLoad() {
    self = this; // 获取地平面的 y 轴坐标

    this.groundY = this.ground.y + this.ground.height / 2; // 初始化计时器

    this.timer = 0;
    this.starDuration = 0;
    this.logicHelper = new AIHelper(); //创建图片资源

    for (var i = 0; i < 13; i++) {
      var pre = 3 + i;

      for (var j = 1; j < 5; j++) {
        var str = "";

        if (pre < 10) {
          str = "0";
        }

        str = str + pre + j;
        this.cardArray.push(str);
        this.cardArray.push(str);
      }
    }

    this.cardArray.push("161");
    this.cardArray.push("161");
    this.cardArray.push("171");
    this.cardArray.push("171");
    this.refreshButton.node.on('click', this.refreshCallback, this);
    this.sendButton.node.on('click', this.sendCallback, this);
    this.backButton.node.on('click', this.backClick, this);
    this.publishPokers(); // this.spawnNewStar();
    // 初始化计分

    this.score = 0; // this.onRoundCallBack=this.onRoundCallBack.bind(this);

    this.onRoundCallBack = this.onRoundCallBack.bind(this);
    this.logicHelper.roundProgram(this.onUserPlayCallBack, this.onRoundCallBack, this.roundOverCallBack, 0, this.gameHost, []);
  },

  /**
   * 电脑出牌，直接渲染
   * @param gameHost
   * @param roundHost
   * @param sendArray
   * @param currentPlayer
   */
  onRoundCallBack: function onRoundCallBack(gameHost, roundHost, sendArray, currentPlayer) {
    self.roundHost = roundHost;
    self.sendArray = sendArray;
    console.log("onion", "轮次回调" + sendArray);
    var sendCard = self.logicHelper.sendAIFollowCard(self.gameHost, roundHost, sendArray, self.pokerPlayer[currentPlayer]);
    console.log("onion", "轮次出牌" + sendCard); // sendArray.push(sendCard);

    self.saveRoundPoker(sendCard, currentPlayer + 1, 0);
    return sendCard;
  },

  /**
   * 玩家出牌 出牌按钮可以点击
   * @param gameHost
   * @param roundHost
   * @param sendArray
   * @param currentPlayer
   */
  onUserPlayCallBack: function onUserPlayCallBack(gameHost, roundHost, sendArray, currentPlayer) {
    console.log("onion", "回调到user" + sendArray);
  },
  roundOverCallBack: function roundOverCallBack(winnerPosition, sumSocer) {
    setTimeout(function () {
      PokerUtil.destoryArray(self.roundPoker);
      self.score = sumSocer + self.score;
      self.roundHost = null;
      self.appendLog(winnerPosition + "大,捞分" + sumSocer); // self.logicHelper.roundProgram(self.onUserPlayCallBack,self.onRoundCallBack,
      //     self.roundOverCallBack,winnerPosition,self.gameHost,[]);
    }, 1000);
  },
  refreshCallback: function refreshCallback(button) {
    this.publishPokers();
  },
  backClick: function backClick(button) {
    console.log("onion", "backClick");
    cc.director.loadScene("other");
  },
  sendCallback: function sendCallback(button) {
    // let sendArray = [];
    var willSendCard = null;

    for (var i = 0; i < this.playerControlNodeArray.length; i++) {
      //判断是否可出
      var node = this.playerControlNodeArray[i].getComponent('Card');

      if (node.isCheck) {
        if (willSendCard && !Array.isArray(willSendCard)) {
          willSendCard = [];
          willSendCard.push(node.picNum);
        } else {
          willSendCard = node.picNum;
        }
      } // this.playerControlNodeArray[i].destroy();

    }

    var message = this.logicHelper.checkUserCanSend(this.gameHost, this.roundHost, this.pokerPlayer[0], willSendCard);

    if (!message) {
      console.log("onion", "不能出" + message);
      return;
    } //出牌 移除并添加


    for (var _i = 0; _i < this.playerControlNodeArray.length;) {
      //判断是否可出
      var _node = this.playerControlNodeArray[_i].getComponent('Card');

      if (_node.isCheck) {
        // willSendArray.push(node.picNum);
        this.saveRoundPoker(_node.picNum, 1, _i * this.cardWidth);

        this.playerControlNodeArray[_i].destroy();

        this.playerControlNodeArray.splice(_i, 1);
      } else {
        _i++;
      } // this.playerControlNodeArray[i].destroy();

    }

    if (!this.sendArray) {
      this.sendArray = [];
    }

    this.sendArray.push(willSendCard);
    this.logicHelper.roundProgram(this.onUserPlayCallBack, this.onRoundCallBack, this.roundOverCallBack, 0, this.gameHost, this.sendArray);
  },
  //保存出牌  1 2 3 4 顺时针位
  saveRoundPoker: function saveRoundPoker(picNum, index, offset) {
    var newStar = cc.instantiate(this.cardPrefab); // newStar.setPicNum("i"+i);

    newStar.getComponent('Card').picNum = picNum;
    newStar.scaleX = 0.5;
    newStar.scaleY = 0.5;
    this.roundPoker.push(newStar);
    console.log("onion", "保存出牌" + picNum + "index" + index); // this.node.addChild(newStar);
    // let height = this.ground.height / 2 * -1;

    switch (index) {
      case 1:
        this.layoutBottom.node.addChild(newStar);
        this.logicHelper.removePokerFromArray(this.gameHost, picNum, this.pokerPlayer[0]);
        break;

      case 2:
        this.layoutLeft.node.addChild(newStar);
        this.logicHelper.removePokerFromArray(this.gameHost, picNum, this.pokerPlayer[1]);
        break;

      case 3:
        this.layoutTop.node.addChild(newStar);
        this.logicHelper.removePokerFromArray(this.gameHost, picNum, this.pokerPlayer[2]);
        break;

      case 4:
        this.layoutRight.node.addChild(newStar);
        this.logicHelper.removePokerFromArray(this.gameHost, picNum, this.pokerPlayer[3]);
        break;
    } // newStar.setPosition(cc.v2(-150 + this.startCardPostion + offset, height));

  },
  spawnNewStar: function spawnNewStar() {
    // 使用给定的模板在场景中生成一个新节点
    var newStar = cc.instantiate(this.starPrefab); // 将新增的节点添加到 Canvas 节点下面

    this.node.addChild(newStar); // 为星星设置一个随机位置

    newStar.setPosition(this.getNewStarPosition()); // 在星星组件上暂存 Game 对象的引用

    newStar.getComponent('Star').game = this; // 重置计时器，根据消失时间范围随机取一个值

    this.starDuration = this.minStarDuration + Math.random() * (this.maxStarDuration - this.minStarDuration);
    this.timer = 0;
  },

  /**
   * 移除旧的节点
   * 添加新节点
   */
  spawnBottomCard: function spawnBottomCard() {
    if (this.playerControlNodeArray.length > 0) {
      var destoryNode = this.playerControlNodeArray;
      PokerUtil.destoryArray(destoryNode);
      this.playerControlNodeArray = [];
    }

    this.createBottomCard();
  },

  /**
   * type1Array:type1Array,
          type2Array:type2Array,
          type3Array:type3Array,
          type4Array:type4Array,
          hostArray:hostArray,
          total:total
   */
  createBottomCard: function createBottomCard() {
    var startPosition = 0;
    var userObj = this.pokerPlayer[0];

    for (var i = 0; i < userObj.total.length; i++) {
      // 使用给定的模板在场景中生成一个新节点
      var newStar = cc.instantiate(this.cardPrefab); // newStar.setPicNum("i"+i);

      newStar.getComponent('Card').picNum = userObj.total[i];
      this.playerControlNodeArray.push(newStar); // this.node.addChild(newStar);

      this.layoutContainer.node.addChild(newStar);
      var height = this.ground.height / 2 * -1;
      startPosition = i * this.cardWidth;

      if (i > 13) {
        height = height - 150;
        startPosition = (i - 13) * this.cardWidth;
      } // newStar.setPosition(cc.v2(-200 + this.startCardPostion + startPosition, height));

    }
  },
  getNewStarPosition: function getNewStarPosition() {
    var randX = 0; // 根据地平面位置和主角跳跃高度，随机得到一个星星的 y 坐标

    var randY = this.groundY + Math.random() * this.player.getComponent('Player').jumpHeight + 50; // 根据屏幕宽度，随机得到一个星星 x 坐标

    var maxX = this.node.width / 2;
    randX = (Math.random() - 0.5) * 2 * maxX; // 返回星星坐标

    return cc.v2(randX, randY);
  },
  getCardBottomPosition: function getCardBottomPosition() {
    var randX = this.currentCardPosition;
    var randY = 0;
    this.currentCardPosition = this.currentCardPosition + this.cardWidth;
    return cc.v2(randX, randY);
  },
  update: function update(dt) {// 每帧更新计时器，超过限度还没有生成新的星星
    // 就会调用游戏失败逻辑
    // if (this.timer > this.starDuration) {
    //     this.gameOver();
    //     this.enabled = false;   // disable gameOver logic to avoid load scene repeatedly
    //     return;
    // }
    // this.timer += dt;
  },
  gainScore: function gainScore() {
    this.score += 1; // 更新 scoreDisplay Label 的文字

    this.scoreDisplay.string = 'Score: ' + this.score; // 播放得分音效

    cc.audioEngine.playEffect(this.scoreAudio, false);
  },
  gameOver: function gameOver() {
    this.player.stopAllActions(); //停止 player 节点的跳跃动作

    cc.director.loadScene('game');
  },

  /**
  * 把牌发给四家
  */
  publishPokers: function publishPokers() {
    this.pokerPlayer = [];
    this.gameHost = null;
    var pokerArray = this.cardArray.slice(0);
    var host = parseInt(Math.random() * 4); //随机主牌花色

    for (var i = 0; i < 4; i++) {
      var playerPokerArray = [];

      for (var j = 0; j < 27; j++) {
        var pokerNum = Math.random() * pokerArray.length;
        pokerNum = parseInt(pokerNum); //插入手牌中

        var value = pokerArray.splice(pokerNum, 1);
        playerPokerArray.push(value);

        if (this.gameHost == null) {
          //随机到主后，第一张主牌亮出
          if (host == PokerUtil.quaryPokerTypeValue(value)) {
            this.gameHost = value;
            this.appendLog("本轮游戏,主牌" + PokerUtil.quaryPokerValue(value) + "在" + this.expandPlayer(i));
          }
        }
      }

      var playerObj = PokerUtil.sortPokers(host, playerPokerArray);
      console.log("onion====", JSON.stringify(playerObj));
      this.pokerPlayer.push(playerObj);
    }

    this.spawnBottomCard();
  },
  expandPlayer: function expandPlayer(location) {
    switch (location) {
      case 0:
        return "自己";

      case 1:
        return "下家";

      case 2:
        return "对家";

      case 3:
        return "上家";
    }
  },
  appendLog: function appendLog(string) {
    this.playLog = this.playLog + "\n" + string;
    this.logLabel.string = this.playLog;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL0dhbWViZWlmZW4uanMiXSwibmFtZXMiOlsiUG9rZXJVdGlsIiwicmVxdWlyZSIsIkFJSGVscGVyIiwic2VsZiIsImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwic3RhclByZWZhYiIsInR5cGUiLCJQcmVmYWIiLCJjYXJkUHJlZmFiIiwibWF4U3RhckR1cmF0aW9uIiwibWluU3RhckR1cmF0aW9uIiwiY3VycmVudENhcmRQb3NpdGlvbiIsInN0YXJ0Q2FyZFBvc3Rpb24iLCJjYXJkV2lkdGgiLCJsb2dpY0hlbHBlciIsImNhcmRBcnJheSIsIlN0cmluZyIsInBva2VyUGxheWVyIiwicm91bmRQb2tlciIsInNlbmRBcnJheSIsInBsYXllckNvbnRyb2xOb2RlQXJyYXkiLCJyZWZyZXNoQnV0dG9uIiwiQnV0dG9uIiwic2VuZEJ1dHRvbiIsImJhY2tCdXR0b24iLCJjdXJyZW50V2lubmVyIiwiZ2FtZUhvc3QiLCJsYXlvdXRDb250YWluZXIiLCJMYXlvdXQiLCJsYXlvdXRCb3R0b20iLCJsYXlvdXRUb3AiLCJsYXlvdXRMZWZ0IiwibGF5b3V0UmlnaHQiLCJsb2dMYWJlbCIsIkxhYmVsIiwicGxheUxvZyIsImdyb3VuZCIsIk5vZGUiLCJwbGF5ZXIiLCJzY29yZURpc3BsYXkiLCJzY29yZUF1ZGlvIiwiQXVkaW9DbGlwIiwib25Mb2FkIiwiZ3JvdW5kWSIsInkiLCJoZWlnaHQiLCJ0aW1lciIsInN0YXJEdXJhdGlvbiIsImkiLCJwcmUiLCJqIiwic3RyIiwicHVzaCIsIm5vZGUiLCJvbiIsInJlZnJlc2hDYWxsYmFjayIsInNlbmRDYWxsYmFjayIsImJhY2tDbGljayIsInB1Ymxpc2hQb2tlcnMiLCJzY29yZSIsIm9uUm91bmRDYWxsQmFjayIsImJpbmQiLCJyb3VuZFByb2dyYW0iLCJvblVzZXJQbGF5Q2FsbEJhY2siLCJyb3VuZE92ZXJDYWxsQmFjayIsInJvdW5kSG9zdCIsImN1cnJlbnRQbGF5ZXIiLCJjb25zb2xlIiwibG9nIiwic2VuZENhcmQiLCJzZW5kQUlGb2xsb3dDYXJkIiwic2F2ZVJvdW5kUG9rZXIiLCJ3aW5uZXJQb3NpdGlvbiIsInN1bVNvY2VyIiwic2V0VGltZW91dCIsImRlc3RvcnlBcnJheSIsImFwcGVuZExvZyIsImJ1dHRvbiIsImRpcmVjdG9yIiwibG9hZFNjZW5lIiwid2lsbFNlbmRDYXJkIiwibGVuZ3RoIiwiZ2V0Q29tcG9uZW50IiwiaXNDaGVjayIsIkFycmF5IiwiaXNBcnJheSIsInBpY051bSIsIm1lc3NhZ2UiLCJjaGVja1VzZXJDYW5TZW5kIiwiZGVzdHJveSIsInNwbGljZSIsImluZGV4Iiwib2Zmc2V0IiwibmV3U3RhciIsImluc3RhbnRpYXRlIiwic2NhbGVYIiwic2NhbGVZIiwiYWRkQ2hpbGQiLCJyZW1vdmVQb2tlckZyb21BcnJheSIsInNwYXduTmV3U3RhciIsInNldFBvc2l0aW9uIiwiZ2V0TmV3U3RhclBvc2l0aW9uIiwiZ2FtZSIsIk1hdGgiLCJyYW5kb20iLCJzcGF3bkJvdHRvbUNhcmQiLCJkZXN0b3J5Tm9kZSIsImNyZWF0ZUJvdHRvbUNhcmQiLCJzdGFydFBvc2l0aW9uIiwidXNlck9iaiIsInRvdGFsIiwicmFuZFgiLCJyYW5kWSIsImp1bXBIZWlnaHQiLCJtYXhYIiwid2lkdGgiLCJ2MiIsImdldENhcmRCb3R0b21Qb3NpdGlvbiIsInVwZGF0ZSIsImR0IiwiZ2FpblNjb3JlIiwic3RyaW5nIiwiYXVkaW9FbmdpbmUiLCJwbGF5RWZmZWN0IiwiZ2FtZU92ZXIiLCJzdG9wQWxsQWN0aW9ucyIsInBva2VyQXJyYXkiLCJzbGljZSIsImhvc3QiLCJwYXJzZUludCIsInBsYXllclBva2VyQXJyYXkiLCJwb2tlck51bSIsInZhbHVlIiwicXVhcnlQb2tlclR5cGVWYWx1ZSIsInF1YXJ5UG9rZXJWYWx1ZSIsImV4cGFuZFBsYXllciIsInBsYXllck9iaiIsInNvcnRQb2tlcnMiLCJKU09OIiwic3RyaW5naWZ5IiwibG9jYXRpb24iXSwibWFwcGluZ3MiOiI7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QTlCLENBQVosRUFBa0Q7QUFDOUMsaUJBQUsxRyxRQUFMLEdBQWdCMEcsS0FBaEI7QUFDQSxpQkFBS3hELFNBQUwsQ0FBZSxZQUFZL0UsU0FBUyxDQUFDeUksZUFBVixDQUEwQkYsS0FBMUIsQ0FBWixHQUErQyxHQUEvQyxHQUFxRCxLQUFLRyxZQUFMLENBQWtCdkYsQ0FBbEIsQ0FBcEU7QUFDSDtBQUNKO0FBQ0o7O0FBQ0QsVUFBSXdGLFNBQVMsR0FBRzNJLFNBQVMsQ0FBQzRJLFVBQVYsQ0FBcUJULElBQXJCLEVBQTJCRSxnQkFBM0IsQ0FBaEI7QUFDQS9ELE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLFdBQVosRUFBeUJzRSxJQUFJLENBQUNDLFNBQUwsQ0FBZUgsU0FBZixDQUF6QjtBQUNBLFdBQUt2SCxXQUFMLENBQWlCbUMsSUFBakIsQ0FBc0JvRixTQUF0QjtBQUNIOztBQUNELFNBQUsvQixlQUFMO0FBRUgsR0FwWUk7QUFxWUw4QixFQUFBQSxZQUFZLEVBQUUsc0JBQVVLLFFBQVYsRUFBb0I7QUFDOUIsWUFBUUEsUUFBUjtBQUNJLFdBQUssQ0FBTDtBQUFRLGVBQU8sSUFBUDs7QUFDUixXQUFLLENBQUw7QUFBUSxlQUFPLElBQVA7O0FBQ1IsV0FBSyxDQUFMO0FBQVEsZUFBTyxJQUFQOztBQUNSLFdBQUssQ0FBTDtBQUFRLGVBQU8sSUFBUDtBQUpaO0FBT0gsR0E3WUk7QUE4WUxoRSxFQUFBQSxTQUFTLEVBQUUsbUJBQVU2QyxNQUFWLEVBQWtCO0FBQ3pCLFNBQUt0RixPQUFMLEdBQWUsS0FBS0EsT0FBTCxHQUFlLElBQWYsR0FBc0JzRixNQUFyQztBQUNBLFNBQUt4RixRQUFMLENBQWN3RixNQUFkLEdBQXVCLEtBQUt0RixPQUE1QjtBQUNIO0FBalpJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxubGV0IFBva2VyVXRpbCA9IHJlcXVpcmUoXCJQb2tlclV0aWxcIik7XG5sZXQgQUlIZWxwZXIgPSByZXF1aXJlKFwiQUlIZWxwZXJcIik7XG5sZXQgc2VsZjtcbmNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIC8vIOi/meS4quWxnuaAp+W8leeUqOS6huaYn+aYn+mihOWItui1hOa6kFxuICAgICAgICBzdGFyUHJlZmFiOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuUHJlZmFiXG4gICAgICAgIH0sXG4gICAgICAgIGNhcmRQcmVmYWI6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5QcmVmYWJcbiAgICAgICAgfSxcbiAgICAgICAgLy8g5pif5pif5Lqn55Sf5ZCO5raI5aSx5pe26Ze055qE6ZqP5py66IyD5Zu0XG4gICAgICAgIG1heFN0YXJEdXJhdGlvbjogMCxcbiAgICAgICAgbWluU3RhckR1cmF0aW9uOiAwLFxuICAgICAgICBjdXJyZW50Q2FyZFBvc2l0aW9uOiAwLFxuICAgICAgICBzdGFydENhcmRQb3N0aW9uOiAwLFxuICAgICAgICBjYXJkV2lkdGg6IDgwLFxuICAgICAgICBsb2dpY0hlbHBlcjogbnVsbCxcbiAgICAgICAgY2FyZEFycmF5OiBbY2MuU3RyaW5nXSxcbiAgICAgICAgLy/liJ3lp4vniYzmlbDnu4Qg6YCG5pe26ZKIIOS4u+inkuaYr+esrOS4gOS4quaVsOe7hFxuICAgICAgICBwb2tlclBsYXllcjogW10sXG4gICAgICAgIC8v5b2T5YmN6L2u5qyh5Ye654mM6IqC54K5LFxuICAgICAgICByb3VuZFBva2VyOiBbXSxcbiAgICAgICAgc2VuZEFycmF5OltdLFxuICAgICAgICAvL+S4u+inkuW9k+WJjeeJjOiKgueCuVxuICAgICAgICBwbGF5ZXJDb250cm9sTm9kZUFycmF5OiBbXSxcbiAgICAgICAgLy/mtJfniYxcbiAgICAgICAgcmVmcmVzaEJ1dHRvbjoge1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkJ1dHRvblxuICAgICAgICB9LFxuICAgICAgICAvL+WHuueJjFxuICAgICAgICBzZW5kQnV0dG9uOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuQnV0dG9uXG4gICAgICAgIH0sXG4gICAgICAgIC8v5Ye654mMXG4gICAgICAgIGJhY2tCdXR0b246IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5CdXR0b25cbiAgICAgICAgfSxcblxuICAgICAgICAvL+W9k+WJjeiDnOaWuVxuICAgICAgICBjdXJyZW50V2lubmVyOiAxLFxuICAgICAgICAvL+acrOi9ruS4u1xuICAgICAgICBnYW1lSG9zdDogXCIxXCIsXG4gICAgICAgIC8v546p5a625oul5pyJ54mMXG4gICAgICAgIGxheW91dENvbnRhaW5lcjoge1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkxheW91dFxuICAgICAgICB9LFxuICAgICAgICAvL+eOqeWutuWHuueahOeJjCBcbiAgICAgICAgbGF5b3V0Qm90dG9tOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTGF5b3V0XG4gICAgICAgIH0sXG4gICAgICAgIC8v5a+55a625Ye654mMIOesrOS4ieS9jVxuICAgICAgICBsYXlvdXRUb3A6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5MYXlvdXRcbiAgICAgICAgfSxcbiAgICAgICAgLy/kuIvlrrblh7rniYwg5bem5omL56ys5LqM5L2NXG4gICAgICAgIGxheW91dExlZnQ6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5MYXlvdXRcbiAgICAgICAgfSxcbiAgICAgICAgLy/kuIrlrrblh7rniYzvvIzlj7PmiYvnrKzlm5vkvY1cbiAgICAgICAgbGF5b3V0UmlnaHQ6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5MYXlvdXRcbiAgICAgICAgfSxcbiAgICAgICAgLy/miJjmiqVcbiAgICAgICAgbG9nTGFiZWw6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbFxuICAgICAgICB9LFxuICAgICAgICBwbGF5TG9nOiBcIua4uOaIj+W8gOWni1wiLFxuICAgICAgICAvLyDlnLDpnaLoioLngrnvvIznlKjkuo7noa7lrprmmJ/mmJ/nlJ/miJDnmoTpq5jluqZcbiAgICAgICAgZ3JvdW5kOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxuICAgICAgICB9LFxuICAgICAgICAvLyBwbGF5ZXIg6IqC54K577yM55So5LqO6I635Y+W5Li76KeS5by56Lez55qE6auY5bqm77yM5ZKM5o6n5Yi25Li76KeS6KGM5Yqo5byA5YWzXG4gICAgICAgIHBsYXllcjoge1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgICAgfSxcbiAgICAgICAgLy8gc2NvcmUgbGFiZWwg55qE5byV55SoXG4gICAgICAgIHNjb3JlRGlzcGxheToge1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsXG4gICAgICAgIH0sXG4gICAgICAgIC8vIOW+l+WIhumfs+aViOi1hOa6kFxuICAgICAgICBzY29yZUF1ZGlvOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuQXVkaW9DbGlwXG4gICAgICAgIH0sXG4gICAgfSxcblxuICAgIG9uTG9hZDogZnVuY3Rpb24gKCkge1xuICAgICAgICBzZWxmPXRoaXM7XG4gICAgICAgIC8vIOiOt+WPluWcsOW5s+mdoueahCB5IOi9tOWdkOagh1xuICAgICAgICB0aGlzLmdyb3VuZFkgPSB0aGlzLmdyb3VuZC55ICsgdGhpcy5ncm91bmQuaGVpZ2h0IC8gMjtcbiAgICAgICAgLy8g5Yid5aeL5YyW6K6h5pe25ZmoXG4gICAgICAgIHRoaXMudGltZXIgPSAwO1xuICAgICAgICB0aGlzLnN0YXJEdXJhdGlvbiA9IDA7XG4gICAgICAgIHRoaXMubG9naWNIZWxwZXIgPSBuZXcgQUlIZWxwZXIoKTtcbiAgICAgICAgLy/liJvlu7rlm77niYfotYTmupBcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMzsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgcHJlID0gMyArIGk7XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMTsgaiA8IDU7IGorKykge1xuICAgICAgICAgICAgICAgIGxldCBzdHIgPSBcIlwiO1xuICAgICAgICAgICAgICAgIGlmIChwcmUgPCAxMCkge1xuICAgICAgICAgICAgICAgICAgICBzdHIgPSBcIjBcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc3RyID0gc3RyICsgcHJlICsgajtcbiAgICAgICAgICAgICAgICB0aGlzLmNhcmRBcnJheS5wdXNoKHN0cik7XG4gICAgICAgICAgICAgICAgdGhpcy5jYXJkQXJyYXkucHVzaChzdHIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2FyZEFycmF5LnB1c2goXCIxNjFcIik7XG4gICAgICAgIHRoaXMuY2FyZEFycmF5LnB1c2goXCIxNjFcIik7XG4gICAgICAgIHRoaXMuY2FyZEFycmF5LnB1c2goXCIxNzFcIik7XG4gICAgICAgIHRoaXMuY2FyZEFycmF5LnB1c2goXCIxNzFcIik7XG5cblxuICAgICAgICB0aGlzLnJlZnJlc2hCdXR0b24ubm9kZS5vbignY2xpY2snLCB0aGlzLnJlZnJlc2hDYWxsYmFjaywgdGhpcyk7XG4gICAgICAgIHRoaXMuc2VuZEJ1dHRvbi5ub2RlLm9uKCdjbGljaycsIHRoaXMuc2VuZENhbGxiYWNrLCB0aGlzKTtcbiAgICAgICAgdGhpcy5iYWNrQnV0dG9uLm5vZGUub24oJ2NsaWNrJyx0aGlzLmJhY2tDbGljaywgdGhpcylcbiAgICAgICAgdGhpcy5wdWJsaXNoUG9rZXJzKCk7XG4gICAgICAgIC8vIHRoaXMuc3Bhd25OZXdTdGFyKCk7XG4gICAgICAgIC8vIOWIneWni+WMluiuoeWIhlxuICAgICAgICB0aGlzLnNjb3JlID0gMDtcbiAgICAgICAgLy8gdGhpcy5vblJvdW5kQ2FsbEJhY2s9dGhpcy5vblJvdW5kQ2FsbEJhY2suYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5vblJvdW5kQ2FsbEJhY2s9dGhpcy5vblJvdW5kQ2FsbEJhY2suYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5sb2dpY0hlbHBlci5yb3VuZFByb2dyYW0odGhpcy5vblVzZXJQbGF5Q2FsbEJhY2ssdGhpcy5vblJvdW5kQ2FsbEJhY2ssdGhpcy5yb3VuZE92ZXJDYWxsQmFjaywwLHRoaXMuZ2FtZUhvc3QsW10pO1xuICAgIH0sXG4gICAgLyoqXG4gICAgICog55S16ISR5Ye654mM77yM55u05o6l5riy5p+TXG4gICAgICogQHBhcmFtIGdhbWVIb3N0XG4gICAgICogQHBhcmFtIHJvdW5kSG9zdFxuICAgICAqIEBwYXJhbSBzZW5kQXJyYXlcbiAgICAgKiBAcGFyYW0gY3VycmVudFBsYXllclxuICAgICAqL1xuICAgICBvblJvdW5kQ2FsbEJhY2s6KGdhbWVIb3N0LCByb3VuZEhvc3QsIHNlbmRBcnJheSwgY3VycmVudFBsYXllcik9PntcbiAgICAgICAgIHNlbGYucm91bmRIb3N0PXJvdW5kSG9zdDtcbiAgICAgICAgIHNlbGYuc2VuZEFycmF5PXNlbmRBcnJheTtcbiAgICAgICAgIGNvbnNvbGUubG9nKFwib25pb25cIixcIui9ruasoeWbnuiwg1wiK3NlbmRBcnJheSk7XG4gICAgICAgbGV0IHNlbmRDYXJkPSBzZWxmLmxvZ2ljSGVscGVyLnNlbmRBSUZvbGxvd0NhcmQoc2VsZi5nYW1lSG9zdCwgcm91bmRIb3N0LCBzZW5kQXJyYXksIHNlbGYucG9rZXJQbGF5ZXJbY3VycmVudFBsYXllcl0pO1xuICAgICAgIGNvbnNvbGUubG9nKFwib25pb25cIixcIui9ruasoeWHuueJjFwiK3NlbmRDYXJkKTtcbiAgICAgICAgLy8gc2VuZEFycmF5LnB1c2goc2VuZENhcmQpO1xuICAgICAgICBzZWxmLnNhdmVSb3VuZFBva2VyKHNlbmRDYXJkLCBjdXJyZW50UGxheWVyKzEsIDApO1xuICAgICAgICByZXR1cm4gc2VuZENhcmQ7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiDnjqnlrrblh7rniYwg5Ye654mM5oyJ6ZKu5Y+v5Lul54K55Ye7XG4gICAgICogQHBhcmFtIGdhbWVIb3N0XG4gICAgICogQHBhcmFtIHJvdW5kSG9zdFxuICAgICAqIEBwYXJhbSBzZW5kQXJyYXlcbiAgICAgKiBAcGFyYW0gY3VycmVudFBsYXllclxuICAgICAqL1xuICAgIG9uVXNlclBsYXlDYWxsQmFjazooZ2FtZUhvc3QsIHJvdW5kSG9zdCwgc2VuZEFycmF5LCBjdXJyZW50UGxheWVyKT0+e1xuICAgICAgICBjb25zb2xlLmxvZyhcIm9uaW9uXCIsXCLlm57osIPliLB1c2VyXCIrc2VuZEFycmF5KTtcbiAgICB9LFxuXG4gICAgcm91bmRPdmVyQ2FsbEJhY2s6KHdpbm5lclBvc2l0aW9uLHN1bVNvY2VyKT0+e1xuICAgICAgICBzZXRUaW1lb3V0KCgpPT57XG4gICAgICAgICAgICBQb2tlclV0aWwuZGVzdG9yeUFycmF5KHNlbGYucm91bmRQb2tlcik7XG4gICAgICAgICAgICBzZWxmLnNjb3JlPXN1bVNvY2VyK3NlbGYuc2NvcmU7XG4gICAgICAgICAgICBzZWxmLnJvdW5kSG9zdD1udWxsO1xuICAgICAgICAgICAgc2VsZi5hcHBlbmRMb2cod2lubmVyUG9zaXRpb24rXCLlpKcs5o2e5YiGXCIrc3VtU29jZXIpO1xuICAgICAgICAgICAgLy8gc2VsZi5sb2dpY0hlbHBlci5yb3VuZFByb2dyYW0oc2VsZi5vblVzZXJQbGF5Q2FsbEJhY2ssc2VsZi5vblJvdW5kQ2FsbEJhY2ssXG4gICAgICAgICAgICAvLyAgICAgc2VsZi5yb3VuZE92ZXJDYWxsQmFjayx3aW5uZXJQb3NpdGlvbixzZWxmLmdhbWVIb3N0LFtdKTtcbiAgICAgICAgfSwxMDAwKTtcbiAgICAgICAgXG4gICAgfSxcblxuXG4gICAgcmVmcmVzaENhbGxiYWNrOiBmdW5jdGlvbiAoYnV0dG9uKSB7XG4gICAgICAgIHRoaXMucHVibGlzaFBva2VycygpO1xuICAgIH0sXG4gICAgYmFja0NsaWNrOmZ1bmN0aW9uKGJ1dHRvbil7XG4gICAgICAgIGNvbnNvbGUubG9nKFwib25pb25cIixcImJhY2tDbGlja1wiKTtcbiAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKFwib3RoZXJcIik7XG4gICAgfSxcbiAgICBzZW5kQ2FsbGJhY2s6IGZ1bmN0aW9uIChidXR0b24pIHtcbiAgICAgICAgLy8gbGV0IHNlbmRBcnJheSA9IFtdO1xuICAgICAgICBsZXQgd2lsbFNlbmRDYXJkPW51bGw7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5wbGF5ZXJDb250cm9sTm9kZUFycmF5Lmxlbmd0aDtpKyspIHtcbiAgICAgICAgICAgIC8v5Yik5pat5piv5ZCm5Y+v5Ye6XG4gICAgICAgICAgICBsZXQgbm9kZSA9IHRoaXMucGxheWVyQ29udHJvbE5vZGVBcnJheVtpXS5nZXRDb21wb25lbnQoJ0NhcmQnKTtcbiAgICAgICAgICAgIGlmIChub2RlLmlzQ2hlY2spIHtcbiAgICAgICAgICAgICAgICBpZih3aWxsU2VuZENhcmQmJiFBcnJheS5pc0FycmF5KHdpbGxTZW5kQ2FyZCkpe1xuICAgICAgICAgICAgICAgICAgICB3aWxsU2VuZENhcmQ9W107XG4gICAgICAgICAgICAgICAgICAgIHdpbGxTZW5kQ2FyZC5wdXNoKG5vZGUucGljTnVtKTtcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgd2lsbFNlbmRDYXJkPW5vZGUucGljTnVtO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIHRoaXMucGxheWVyQ29udHJvbE5vZGVBcnJheVtpXS5kZXN0cm95KCk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IG1lc3NhZ2U9dGhpcy5sb2dpY0hlbHBlci5jaGVja1VzZXJDYW5TZW5kKHRoaXMuZ2FtZUhvc3QsdGhpcy5yb3VuZEhvc3QsdGhpcy5wb2tlclBsYXllclswXSx3aWxsU2VuZENhcmQpO1xuICAgICAgICBpZighbWVzc2FnZSl7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIm9uaW9uXCIsXCLkuI3og73lh7pcIittZXNzYWdlKTtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG5cbiAgICAgICAgLy/lh7rniYwg56e76Zmk5bm25re75YqgXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5wbGF5ZXJDb250cm9sTm9kZUFycmF5Lmxlbmd0aDspIHtcbiAgICAgICAgICAgIC8v5Yik5pat5piv5ZCm5Y+v5Ye6XG4gICAgICAgICAgICBsZXQgbm9kZSA9IHRoaXMucGxheWVyQ29udHJvbE5vZGVBcnJheVtpXS5nZXRDb21wb25lbnQoJ0NhcmQnKTtcbiAgICAgICAgICAgIGlmIChub2RlLmlzQ2hlY2spIHtcbiAgICAgICAgICAgICAgICAvLyB3aWxsU2VuZEFycmF5LnB1c2gobm9kZS5waWNOdW0pO1xuICAgICAgICAgICAgICAgIHRoaXMuc2F2ZVJvdW5kUG9rZXIobm9kZS5waWNOdW0sIDEsIGkgKiB0aGlzLmNhcmRXaWR0aCk7XG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXJDb250cm9sTm9kZUFycmF5W2ldLmRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllckNvbnRyb2xOb2RlQXJyYXkuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpKys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyB0aGlzLnBsYXllckNvbnRyb2xOb2RlQXJyYXlbaV0uZGVzdHJveSgpO1xuICAgICAgICB9XG4gICAgICAgIGlmKCF0aGlzLnNlbmRBcnJheSl7XG4gICAgICAgICAgICB0aGlzLnNlbmRBcnJheT1bXTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNlbmRBcnJheS5wdXNoKHdpbGxTZW5kQ2FyZCk7XG4gICAgICAgIHRoaXMubG9naWNIZWxwZXIucm91bmRQcm9ncmFtKHRoaXMub25Vc2VyUGxheUNhbGxCYWNrLHRoaXMub25Sb3VuZENhbGxCYWNrLFxuICAgICAgICAgICAgdGhpcy5yb3VuZE92ZXJDYWxsQmFjaywwLHRoaXMuZ2FtZUhvc3QsdGhpcy5zZW5kQXJyYXkpO1xuICAgICAgIFxuICAgIH0sXG4gICAgLy/kv53lrZjlh7rniYwgIDEgMiAzIDQg6aG65pe26ZKI5L2NXG4gICAgc2F2ZVJvdW5kUG9rZXI6IGZ1bmN0aW9uIChwaWNOdW0sIGluZGV4LCBvZmZzZXQpIHtcbiAgICAgICAgdmFyIG5ld1N0YXIgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmNhcmRQcmVmYWIpO1xuICAgICAgICAvLyBuZXdTdGFyLnNldFBpY051bShcImlcIitpKTtcbiAgICAgICAgbmV3U3Rhci5nZXRDb21wb25lbnQoJ0NhcmQnKS5waWNOdW0gPSBwaWNOdW07XG4gICAgICAgIG5ld1N0YXIuc2NhbGVYID0gMC41O1xuICAgICAgICBuZXdTdGFyLnNjYWxlWSA9IDAuNTtcbiAgICAgICAgdGhpcy5yb3VuZFBva2VyLnB1c2gobmV3U3Rhcik7XG4gICAgICAgIGNvbnNvbGUubG9nKFwib25pb25cIixcIuS/neWtmOWHuueJjFwiK3BpY051bStcImluZGV4XCIraW5kZXgpO1xuICAgICAgICAvLyB0aGlzLm5vZGUuYWRkQ2hpbGQobmV3U3Rhcik7XG4gICAgICAgIC8vIGxldCBoZWlnaHQgPSB0aGlzLmdyb3VuZC5oZWlnaHQgLyAyICogLTE7XG4gICAgICAgIHN3aXRjaCAoaW5kZXgpIHtcbiAgICAgICAgICAgIGNhc2UgMTogdGhpcy5sYXlvdXRCb3R0b20ubm9kZS5hZGRDaGlsZChuZXdTdGFyKTtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ2ljSGVscGVyLnJlbW92ZVBva2VyRnJvbUFycmF5KHRoaXMuZ2FtZUhvc3QsIHBpY051bSwgdGhpcy5wb2tlclBsYXllclswXSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDI6IHRoaXMubGF5b3V0TGVmdC5ub2RlLmFkZENoaWxkKG5ld1N0YXIpO1xuICAgICAgICAgICAgICAgIHRoaXMubG9naWNIZWxwZXIucmVtb3ZlUG9rZXJGcm9tQXJyYXkodGhpcy5nYW1lSG9zdCwgcGljTnVtLCB0aGlzLnBva2VyUGxheWVyWzFdKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMzogdGhpcy5sYXlvdXRUb3Aubm9kZS5hZGRDaGlsZChuZXdTdGFyKTtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ2ljSGVscGVyLnJlbW92ZVBva2VyRnJvbUFycmF5KHRoaXMuZ2FtZUhvc3QsIHBpY051bSwgdGhpcy5wb2tlclBsYXllclsyXSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDQ6IHRoaXMubGF5b3V0UmlnaHQubm9kZS5hZGRDaGlsZChuZXdTdGFyKTtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ2ljSGVscGVyLnJlbW92ZVBva2VyRnJvbUFycmF5KHRoaXMuZ2FtZUhvc3QsIHBpY051bSwgdGhpcy5wb2tlclBsYXllclszXSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgLy8gbmV3U3Rhci5zZXRQb3NpdGlvbihjYy52MigtMTUwICsgdGhpcy5zdGFydENhcmRQb3N0aW9uICsgb2Zmc2V0LCBoZWlnaHQpKTtcbiAgICB9LFxuICAgIHNwYXduTmV3U3RhcjogZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyDkvb/nlKjnu5nlrprnmoTmqKHmnb/lnKjlnLrmma/kuK3nlJ/miJDkuIDkuKrmlrDoioLngrlcbiAgICAgICAgdmFyIG5ld1N0YXIgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnN0YXJQcmVmYWIpO1xuICAgICAgICAvLyDlsIbmlrDlop7nmoToioLngrnmt7vliqDliLAgQ2FudmFzIOiKgueCueS4i+mdolxuICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobmV3U3Rhcik7XG4gICAgICAgIC8vIOS4uuaYn+aYn+iuvue9ruS4gOS4qumaj+acuuS9jee9rlxuICAgICAgICBuZXdTdGFyLnNldFBvc2l0aW9uKHRoaXMuZ2V0TmV3U3RhclBvc2l0aW9uKCkpO1xuICAgICAgICAvLyDlnKjmmJ/mmJ/nu4Tku7bkuIrmmoLlrZggR2FtZSDlr7nosaHnmoTlvJXnlKhcbiAgICAgICAgbmV3U3Rhci5nZXRDb21wb25lbnQoJ1N0YXInKS5nYW1lID0gdGhpcztcbiAgICAgICAgLy8g6YeN572u6K6h5pe25Zmo77yM5qC55o2u5raI5aSx5pe26Ze06IyD5Zu06ZqP5py65Y+W5LiA5Liq5YC8XG4gICAgICAgIHRoaXMuc3RhckR1cmF0aW9uID0gdGhpcy5taW5TdGFyRHVyYXRpb24gKyBNYXRoLnJhbmRvbSgpICogKHRoaXMubWF4U3RhckR1cmF0aW9uIC0gdGhpcy5taW5TdGFyRHVyYXRpb24pO1xuICAgICAgICB0aGlzLnRpbWVyID0gMDtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIOenu+mZpOaXp+eahOiKgueCuVxuICAgICAqIOa3u+WKoOaWsOiKgueCuVxuICAgICAqL1xuICAgIHNwYXduQm90dG9tQ2FyZDogZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5wbGF5ZXJDb250cm9sTm9kZUFycmF5Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGxldCBkZXN0b3J5Tm9kZSA9IHRoaXMucGxheWVyQ29udHJvbE5vZGVBcnJheTtcbiAgICAgICAgICAgIFBva2VyVXRpbC5kZXN0b3J5QXJyYXkoZGVzdG9yeU5vZGUpO1xuICAgICAgICAgICAgdGhpcy5wbGF5ZXJDb250cm9sTm9kZUFycmF5ID0gW107XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNyZWF0ZUJvdHRvbUNhcmQoKVxuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIHR5cGUxQXJyYXk6dHlwZTFBcnJheSxcbiAgICAgICAgICAgIHR5cGUyQXJyYXk6dHlwZTJBcnJheSxcbiAgICAgICAgICAgIHR5cGUzQXJyYXk6dHlwZTNBcnJheSxcbiAgICAgICAgICAgIHR5cGU0QXJyYXk6dHlwZTRBcnJheSxcbiAgICAgICAgICAgIGhvc3RBcnJheTpob3N0QXJyYXksXG4gICAgICAgICAgICB0b3RhbDp0b3RhbFxuICAgICAqL1xuICAgIGNyZWF0ZUJvdHRvbUNhcmQ6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBsZXQgc3RhcnRQb3NpdGlvbiA9IDA7XG4gICAgICAgIGxldCB1c2VyT2JqID0gdGhpcy5wb2tlclBsYXllclswXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB1c2VyT2JqLnRvdGFsLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAvLyDkvb/nlKjnu5nlrprnmoTmqKHmnb/lnKjlnLrmma/kuK3nlJ/miJDkuIDkuKrmlrDoioLngrlcbiAgICAgICAgICAgIHZhciBuZXdTdGFyID0gY2MuaW5zdGFudGlhdGUodGhpcy5jYXJkUHJlZmFiKTtcbiAgICAgICAgICAgIC8vIG5ld1N0YXIuc2V0UGljTnVtKFwiaVwiK2kpO1xuICAgICAgICAgICAgbmV3U3Rhci5nZXRDb21wb25lbnQoJ0NhcmQnKS5waWNOdW0gPSB1c2VyT2JqLnRvdGFsW2ldO1xuICAgICAgICAgICAgdGhpcy5wbGF5ZXJDb250cm9sTm9kZUFycmF5LnB1c2gobmV3U3Rhcik7XG4gICAgICAgICAgICAvLyB0aGlzLm5vZGUuYWRkQ2hpbGQobmV3U3Rhcik7XG4gICAgICAgICAgICB0aGlzLmxheW91dENvbnRhaW5lci5ub2RlLmFkZENoaWxkKG5ld1N0YXIpO1xuICAgICAgICAgICAgbGV0IGhlaWdodCA9IHRoaXMuZ3JvdW5kLmhlaWdodCAvIDIgKiAtMTtcbiAgICAgICAgICAgIHN0YXJ0UG9zaXRpb24gPSBpICogdGhpcy5jYXJkV2lkdGg7XG4gICAgICAgICAgICBpZiAoaSA+IDEzKSB7XG4gICAgICAgICAgICAgICAgaGVpZ2h0ID0gaGVpZ2h0IC0gMTUwXG4gICAgICAgICAgICAgICAgc3RhcnRQb3NpdGlvbiA9IChpIC0gMTMpICogdGhpcy5jYXJkV2lkdGg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBuZXdTdGFyLnNldFBvc2l0aW9uKGNjLnYyKC0yMDAgKyB0aGlzLnN0YXJ0Q2FyZFBvc3Rpb24gKyBzdGFydFBvc2l0aW9uLCBoZWlnaHQpKTtcbiAgICAgICAgfVxuICAgIH0sXG5cblxuICAgIGdldE5ld1N0YXJQb3NpdGlvbjogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcmFuZFggPSAwO1xuICAgICAgICAvLyDmoLnmja7lnLDlubPpnaLkvY3nva7lkozkuLvop5Lot7Pot4Ppq5jluqbvvIzpmo/mnLrlvpfliLDkuIDkuKrmmJ/mmJ/nmoQgeSDlnZDmoIdcbiAgICAgICAgdmFyIHJhbmRZID0gdGhpcy5ncm91bmRZICsgTWF0aC5yYW5kb20oKSAqIHRoaXMucGxheWVyLmdldENvbXBvbmVudCgnUGxheWVyJykuanVtcEhlaWdodCArIDUwO1xuICAgICAgICAvLyDmoLnmja7lsY/luZXlrr3luqbvvIzpmo/mnLrlvpfliLDkuIDkuKrmmJ/mmJ8geCDlnZDmoIdcbiAgICAgICAgdmFyIG1heFggPSB0aGlzLm5vZGUud2lkdGggLyAyO1xuICAgICAgICByYW5kWCA9IChNYXRoLnJhbmRvbSgpIC0gMC41KSAqIDIgKiBtYXhYO1xuICAgICAgICAvLyDov5Tlm57mmJ/mmJ/lnZDmoIdcbiAgICAgICAgcmV0dXJuIGNjLnYyKHJhbmRYLCByYW5kWSk7XG4gICAgfSxcbiAgICBnZXRDYXJkQm90dG9tUG9zaXRpb246IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHJhbmRYID0gdGhpcy5jdXJyZW50Q2FyZFBvc2l0aW9uO1xuICAgICAgICB2YXIgcmFuZFkgPSAwO1xuICAgICAgICB0aGlzLmN1cnJlbnRDYXJkUG9zaXRpb24gPSB0aGlzLmN1cnJlbnRDYXJkUG9zaXRpb24gKyB0aGlzLmNhcmRXaWR0aDtcbiAgICAgICAgcmV0dXJuIGNjLnYyKHJhbmRYLCByYW5kWSk7XG4gICAgfSxcblxuICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XG4gICAgICAgIC8vIOavj+W4p+abtOaWsOiuoeaXtuWZqO+8jOi2hei/h+mZkOW6pui/mOayoeacieeUn+aIkOaWsOeahOaYn+aYn1xuICAgICAgICAvLyDlsLHkvJrosIPnlKjmuLjmiI/lpLHotKXpgLvovpFcbiAgICAgICAgLy8gaWYgKHRoaXMudGltZXIgPiB0aGlzLnN0YXJEdXJhdGlvbikge1xuICAgICAgICAvLyAgICAgdGhpcy5nYW1lT3ZlcigpO1xuICAgICAgICAvLyAgICAgdGhpcy5lbmFibGVkID0gZmFsc2U7ICAgLy8gZGlzYWJsZSBnYW1lT3ZlciBsb2dpYyB0byBhdm9pZCBsb2FkIHNjZW5lIHJlcGVhdGVkbHlcbiAgICAgICAgLy8gICAgIHJldHVybjtcbiAgICAgICAgLy8gfVxuICAgICAgICAvLyB0aGlzLnRpbWVyICs9IGR0O1xuICAgIH0sXG5cbiAgICBnYWluU2NvcmU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5zY29yZSArPSAxO1xuICAgICAgICAvLyDmm7TmlrAgc2NvcmVEaXNwbGF5IExhYmVsIOeahOaWh+Wtl1xuICAgICAgICB0aGlzLnNjb3JlRGlzcGxheS5zdHJpbmcgPSAnU2NvcmU6ICcgKyB0aGlzLnNjb3JlO1xuICAgICAgICAvLyDmkq3mlL7lvpfliIbpn7PmlYhcbiAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheUVmZmVjdCh0aGlzLnNjb3JlQXVkaW8sIGZhbHNlKTtcbiAgICB9LFxuXG4gICAgZ2FtZU92ZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5wbGF5ZXIuc3RvcEFsbEFjdGlvbnMoKTsgLy/lgZzmraIgcGxheWVyIOiKgueCueeahOi3s+i3g+WKqOS9nFxuICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoJ2dhbWUnKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgKiDmiorniYzlj5Hnu5nlm5vlrrZcbiAgICAqL1xuICAgIHB1Ymxpc2hQb2tlcnM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5wb2tlclBsYXllciA9IFtdO1xuICAgICAgICB0aGlzLmdhbWVIb3N0ID0gbnVsbDtcbiAgICAgICAgbGV0IHBva2VyQXJyYXkgPSB0aGlzLmNhcmRBcnJheS5zbGljZSgwKTtcbiAgICAgICAgbGV0IGhvc3QgPSBwYXJzZUludChNYXRoLnJhbmRvbSgpICogNCk7Ly/pmo/mnLrkuLvniYzoirHoibJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA0OyBpKyspIHtcbiAgICAgICAgICAgIGxldCBwbGF5ZXJQb2tlckFycmF5ID0gW107XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDI3OyBqKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgcG9rZXJOdW0gPSBNYXRoLnJhbmRvbSgpICogcG9rZXJBcnJheS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgcG9rZXJOdW0gPSBwYXJzZUludChwb2tlck51bSk7XG4gICAgICAgICAgICAgICAgLy/mj5LlhaXmiYvniYzkuK1cbiAgICAgICAgICAgICAgICBsZXQgdmFsdWUgPSBwb2tlckFycmF5LnNwbGljZShwb2tlck51bSwgMSk7XG4gICAgICAgICAgICAgICAgcGxheWVyUG9rZXJBcnJheS5wdXNoKHZhbHVlKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5nYW1lSG9zdCA9PSBudWxsKSB7Ly/pmo/mnLrliLDkuLvlkI7vvIznrKzkuIDlvKDkuLvniYzkuq7lh7pcbiAgICAgICAgICAgICAgICAgICAgaWYgKGhvc3QgPT0gUG9rZXJVdGlsLnF1YXJ5UG9rZXJUeXBlVmFsdWUodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVIb3N0ID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFwcGVuZExvZyhcIuacrOi9rua4uOaIjyzkuLvniYxcIiArIFBva2VyVXRpbC5xdWFyeVBva2VyVmFsdWUodmFsdWUpICsgXCLlnKhcIiArIHRoaXMuZXhwYW5kUGxheWVyKGkpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBwbGF5ZXJPYmogPSBQb2tlclV0aWwuc29ydFBva2Vycyhob3N0LCBwbGF5ZXJQb2tlckFycmF5KTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwib25pb249PT09XCIsIEpTT04uc3RyaW5naWZ5KHBsYXllck9iaikpO1xuICAgICAgICAgICAgdGhpcy5wb2tlclBsYXllci5wdXNoKHBsYXllck9iaik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zcGF3bkJvdHRvbUNhcmQoKTtcblxuICAgIH0sXG4gICAgZXhwYW5kUGxheWVyOiBmdW5jdGlvbiAobG9jYXRpb24pIHtcbiAgICAgICAgc3dpdGNoIChsb2NhdGlvbikge1xuICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gXCLoh6rlt7FcIlxuICAgICAgICAgICAgY2FzZSAxOiByZXR1cm4gXCLkuIvlrrZcIlxuICAgICAgICAgICAgY2FzZSAyOiByZXR1cm4gXCLlr7nlrrZcIlxuICAgICAgICAgICAgY2FzZSAzOiByZXR1cm4gXCLkuIrlrrZcIlxuICAgICAgICB9XG5cbiAgICB9LFxuICAgIGFwcGVuZExvZzogZnVuY3Rpb24gKHN0cmluZykge1xuICAgICAgICB0aGlzLnBsYXlMb2cgPSB0aGlzLnBsYXlMb2cgKyBcIlxcblwiICsgc3RyaW5nO1xuICAgICAgICB0aGlzLmxvZ0xhYmVsLnN0cmluZyA9IHRoaXMucGxheUxvZztcbiAgICB9XG5cblxuXG5cblxufSk7XG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/PokerUtil.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '637dcF7OOBKJbr2bHFrfFoQ', 'PokerUtil');
// scripts/PokerUtil.js

"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var pokerWeight = [4, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 3, 5, 16, 17, 18]; //主5为18

var LEFT_WIN = -1;
var RIGHT_WIN = 1;

var PokerUtil = /*#__PURE__*/function () {
  function PokerUtil() {}

  /**
   * 比较牌的大小
   * 最后一位是花色，前面直接比大小
   * 规则 1游戏主>轮次主>副
   *      2 5>王>3>2
   *      3 同为副牌，花色比大小
   *      4
   * @param {*} valueLeft  先牌
   * @param {*} valueRight 后牌
   */

  /**
   * 不判断花色，直接比大小 只接受两位
   * 允许返回0
   *
   */

  /**
   * 判断牌的大小
   * @param {*} poker
   */
  PokerUtil.quaryPokerWeight = function quaryPokerWeight(poker) {
    return pokerWeight.indexOf(poker);
  }
  /**
   * 判断牌是不是活动主 15 3 5对应 2 3 5
   */
  ;

  PokerUtil.quaryIsHost = function quaryIsHost(poker) {
    var value = parseInt(poker);
    return value == 15 || value == 3 || value == 5 || value == 16 || value == 17 || value == 18; //2 3 5 小王 大王 主5
  }
  /**
   * 返回分数值
   * @param poker
   * @returns {*}
   */
  ;

  PokerUtil.quaryIsSocer = function quaryIsSocer(poker) {
    if (poker == 5 || poker == 10) {
      return poker;
    } else if (poker == 13) {
      return 10;
    } else {
      return 0;
    }
  }
  /**
   * 判断副牌谁大
   * @param {*} roundhost
   * @param {*} valueLeft
   * @param {*} valueRight
   */
  ;

  PokerUtil.compareVice = function compareVice(roundhost, typeLeft, typeRight, contentLeft, contentRight) {
    if (typeRight == typeLeft == roundhost) {
      return PokerUtil.compareSinglePokerBigger(contentLeft, contentRight);
    } else if (typeLeft == roundhost) {
      return LEFT_WIN;
    } else if (typeRight == roundhost) {
      return RIGHT_WIN;
    } else {
      //都是副牌 不是本轮主，多半是跟牌，意义不大
      return LEFT_WIN;
    }
  };

  return PokerUtil;
}();

exports["default"] = PokerUtil;

PokerUtil.testLogic = function (testArray) {
  var gamehost = Math.random() * 4;
  var roundhost = Math.random() * 4;
  gamehost = parseInt(gamehost) + 1;
  roundhost = parseInt(roundhost) + 1;
  console.log("onion", "当前游戏主" + gamehost + "本轮主" + roundhost);

  if (testArray.length == 1) {
    var testValue = testArray[0] + "";
    console.log("onion", PokerUtil.quaryPokerWeight(parseInt(testValue.substring(0, 2))));
  } else if (testArray.length >= 2) {
    console.log("onion", PokerUtil.comparePoker(gamehost, roundhost, testArray[0], testArray[1]));
  }
};

PokerUtil.testArrayLogic = function (testArray1, testArray2) {
  var gamehost = Math.random() * 4;
  var roundhost = Math.random() * 4;
  gamehost = parseInt(gamehost) + 1;
  roundhost = parseInt(roundhost) + 1;
};

PokerUtil.comparePoker = function (gamehost, roundhost, valueLeft, valueRight) {
  console.log("onion", "comparePoker++" + PokerUtil.quaryPokerValue(valueLeft) + "/" + PokerUtil.quaryPokerValue(valueRight));

  if (Array.isArray(valueLeft) || Array.isArray(valueRight)) {
    if (valueLeft.length == 1) {
      valueLeft = valueLeft[0];
    }

    if (valueRight.length == 1) {
      valueRight = valueRight[0];
    }
  }

  if (Array.isArray(valueLeft) || Array.isArray(valueRight)) {
    console.error("onion", "暂不支持数组");
    PokerUtil.compareArray(gamehost, roundhost, valueLeft, valueRight);
    return LEFT_WIN;
  }

  if (valueRight == valueLeft) {
    //完全相同，先牌大
    return LEFT_WIN;
  }

  valueRight = valueRight + "";
  valueLeft = valueLeft + ""; //1 判断先牌后牌的花色

  var typeLeft = valueLeft.substring(2);
  var typeRight = valueRight.substring(2); //2判断先牌后牌值

  var contentLeft = valueLeft.substring(0, 2);
  var contentRight = valueRight.substring(0, 2); //3判断牌是否为主 活动主

  var leftIsHost = typeLeft == gamehost || PokerUtil.quaryIsHost(contentLeft);
  var rightIsHost = typeLeft == gamehost || PokerUtil.quaryIsHost(contentRight); //4比较

  if (leftIsHost && rightIsHost) {
    //同为主，主5最大
    if (parseInt(contentLeft) == 5) {
      return LEFT_WIN;
    } else if (parseInt(contentRight) == 5) {
      return RIGHT_WIN;
    } else {
      //直接比大小
      var result = PokerUtil.compareSinglePokerBigger(contentLeft, contentRight);

      if (result != 0) {
        return result;
      } else {
        //大小相同，存在活动主和花色主牌值相同情况
        if (typeLeft == gamehost) {
          return LEFT_WIN;
        } else if (typeRight == gamehost) {
          return RIGHT_WIN;
        } else {
          //同为活动主
          return LEFT_WIN;
        }
      }
    }
  } else if (leftIsHost) {
    //先牌是主，先牌大
    return LEFT_WIN;
  } else if (rightIsHost) {
    //后牌是主，后牌大
    return RIGHT_WIN;
  } else {
    return PokerUtil.compareVice(roundhost, typeLeft, typeRight, contentLeft, contentRight);
  }
};

PokerUtil.compareSinglePokerBigger = function (valueLeft, valueRight) {
  if (valueLeft.length > 2 || valueRight.length > 2) {
    console.error("只接受两位的" + valueLeft + "/" + valueRight);
    return 1;
  }

  var leftNum = parseInt(valueLeft);
  var rightNum = parseInt(valueRight);
  var result = PokerUtil.quaryPokerWeight(rightNum) - PokerUtil.quaryPokerWeight(leftNum);

  if (result > 0) {
    result = RIGHT_WIN;
  } else if (result < 0) {
    result = LEFT_WIN;
  }

  return result;
};

PokerUtil.compareArray = function (gamehost, roundhost, valueLeft, valueRight) {
  //偶数张，排数不一致
  if (valueLeft.length != valueRight.length || valueLeft.length % 2 != 0) {
    console.error("onion", "数组长度不一致");
    return LEFT_WIN;
  } //1 排序


  var arrayLeft = valueLeft.sort();
  var arrayRight = valueRight.sort(); //2 奇数和偶数一样，判断对子合法性

  var resultLeft = PokerUtil.checkArrayValue(arrayLeft);
  var resultRight = PokerUtil.checkArrayValue(arrayRight);

  if (resultLeft[0] == "-1") {
    return RIGHT_WIN;
  }

  if (resultRight[0] == "-1") {
    return LEFT_WIN;
  }

  if (gamehost == resultLeft[0] == resultRight[0]) {
    //都是主对
    if (resultLeft[1] > resultRight[1]) {
      return LEFT_WIN;
    } else {
      return RIGHT_WIN;
    }
  } else if (gamehost == resultLeft[0]) {
    return LEFT_WIN;
  } else if (gamehost == resultRight[0]) {
    return RIGHT_WIN;
  } else if (roundhost == resultLeft[0] == resultRight[0]) {
    //都是副对
    if (resultLeft[1] > resultRight[1]) {
      return LEFT_WIN;
    } else {
      return RIGHT_WIN;
    }
  } else if (roundhost == resultLeft[0]) {
    return LEFT_WIN;
  } else if (gamehost == resultRight[0]) {
    return RIGHT_WIN;
  } else {
    //都不是主 跟牌大小无意义
    return LEFT_WIN;
  } //一对直接比
  //多对先校验合法性，1是否多对 2是否连对 3花色一致 4

};

PokerUtil.checkArrayValue = function (array) {
  var odd = "-1";
  var even = "-1";
  var lastType = "-1";
  var result = 0;

  for (var index = 0; index < array.length; index++) {
    if (index % 2 == 0) {
      even = array[index];
    } else {
      odd = array[index];

      if (even != odd) {
        return ["-1", -1];
      }

      var cardNum = odd;
      var type = "0";

      if (cardNum == "171" || cardNum == "161") {
        //大小王
        type = "5";
      } else {
        var str = cardNum.substring(2);
        type = PokerUtil.quaryType(str);
      }

      if (lastType != type && lastType != "-1") {
        //不是首次且与之前花色不同，不能算对子
        return ["-1", -1];
      }

      lastType = type;
      var compare = cardNum.substring(0, 2);
      result = result + PokerUtil.quaryPokerWeight(parseInt(compare));
    }
  }

  return [lastType, result];
};

PokerUtil.compareRound = function (playPokers) {};

PokerUtil.destoryArray = function (destoryNode) {
  if (destoryNode != null) {
    for (var i = 0; i < destoryNode.length; i++) {
      destoryNode[i].destroy();
    }
  }
};

PokerUtil.sort = function (a, b) {
  a = Math.floor(a / 10);
  b = Math.floor(b / 10);
  var left = PokerUtil.quaryPokerWeight(a);
  var right = PokerUtil.quaryPokerWeight(b);
  return left - right;
};

PokerUtil.sortInsert = function (array, item) {
  if (array.length === 0) {
    array.push(item);
    return array;
  } // let value=item.substring(0,2);


  var value = item / 10;
  var weight = PokerUtil.quaryPokerWeight(value);
  var firstWeight = PokerUtil.quaryPokerWeight(array[0] / 10);
  var lastWeight = PokerUtil.quaryPokerWeight(array[array.length - 1] / 10);

  if (weight <= firstWeight) {
    array = [item].concat(array); // array.unshift(item);
  } else if (weight >= lastWeight) {
    array.push(item);
  }

  return array;
};

PokerUtil.quaryType = function (type) {
  switch (type) {
    case "1":
      return "方块";

    case "2":
      return "梅花";

    case "3":
      return "红桃";

    case "4":
      return "黑桃";
  }
};

PokerUtil.quaryPokerTypeValue = function (pokerValue) {
  pokerValue = pokerValue + "";

  if (pokerValue == "171") {
    return "3";
  }

  if (pokerValue == "161") {
    return "4";
  } // console.log("onion","pokerValue"+pokerValue);


  return pokerValue.substring(2);
};

PokerUtil.quaryPokerValue = function (value) {
  var cardNum = value + "";

  if (cardNum == "171") {
    return "大王";
  } else if (cardNum == "161") {
    return "小王";
  } else if (cardNum == "181") {
    return "卡背";
  } else {
    var compare = cardNum.substring(0, 2);
    var type = cardNum.substring(2);
    var result = PokerUtil.quaryType(type);

    switch (compare) {
      case "03":
        result = result + "3";
        break;

      case "04":
        result = result + "4";
        break;

      case "05":
        result = result + "5";
        break;

      case "06":
        result = result + "6";
        break;

      case "07":
        result = result + "7";
        break;

      case "08":
        result = result + "8";
        break;

      case "09":
        result = result + "9";
        break;

      case "10":
        result = result + "10";
        break;

      case "11":
        result = result + "J";
        break;

      case "12":
        result = result + "Q";
        break;

      case "13":
        result = result + "K";
        break;

      case "14":
        result = result + "A";
        break;

      case "15":
        result = result + "2";
        break;
    }

    return result;
  }
};

PokerUtil.sortPokers = function (gameHost, cardArray) {
  var type1Array = [];
  var type2Array = [];
  var type3Array = [];
  var type4Array = [];
  var hostArray = []; //活动主

  for (var i = 0; i < cardArray.length; i++) {
    var item = cardArray[i];

    if (item == 171 || item == 161) {
      hostArray.push(item);
      continue;
    } // let type=parseInt(item.substring(2));


    var value = Math.floor(item / 10);

    if (PokerUtil.quaryIsHost(value)) {
      hostArray.push(item);
      continue;
    }

    var type = item % 10;

    switch (type) {
      case 1:
        type1Array.push(item);
        break;

      case 2:
        type2Array.push(item);
        break;

      case 3:
        type3Array.push(item);
        break;

      case 4:
        type4Array.push(item);
        break;
    }
  }

  hostArray.sort(PokerUtil.sort);
  type1Array.sort(PokerUtil.sort);
  type2Array.sort(PokerUtil.sort);
  type3Array.sort(PokerUtil.sort);
  type3Array.sort(PokerUtil.sort);

  switch (parseInt(gameHost)) {
    case 1:
      return PokerUtil.createStatic(type1Array, type2Array, type3Array, type4Array, hostArray, type2Array.concat(type3Array).concat(type4Array).concat(type1Array).concat(hostArray));

    case 2:
      return PokerUtil.createStatic(type1Array, type2Array, type3Array, type4Array, hostArray, type3Array.concat(type4Array).concat(type1Array).concat(type2Array).concat(hostArray));

    case 3:
      return PokerUtil.createStatic(type1Array, type2Array, type3Array, type4Array, hostArray, type4Array.concat(type1Array).concat(type2Array).concat(type3Array).concat(hostArray));

    case 4:
      return PokerUtil.createStatic(type1Array, type2Array, type3Array, type4Array, hostArray, type1Array.concat(type2Array).concat(type3Array).concat(type4Array).concat(hostArray));
  }
};

PokerUtil.createStatic = function (type1Array, type2Array, type3Array, type4Array, hostArray, total) {
  return {
    type1Array: type1Array,
    type2Array: type2Array,
    type3Array: type3Array,
    type4Array: type4Array,
    hostArray: hostArray,
    total: total
  };
};

PokerUtil.saveRecoder = function () {
  var userData = {
    name: 'Tracer',
    level: 1,
    gold: 100
  };
  cc.sys.localStorage.setItem('userData', JSON.stringify(userData));
};

PokerUtil.quaryReocder = function () {
  var userData = JSON.parse(cc.sys.localStorage.getItem('userData'));
};

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL1Bva2VyVXRpbC5qcyJdLCJuYW1lcyI6WyJwb2tlcldlaWdodCIsIkxFRlRfV0lOIiwiUklHSFRfV0lOIiwiUG9rZXJVdGlsIiwicXVhcnlQb2tlcldlaWdodCIsInBva2VyIiwiaW5kZXhPZiIsInF1YXJ5SXNIb3N0IiwidmFsdWUiLCJwYXJzZUludCIsInF1YXJ5SXNTb2NlciIsImNvbXBhcmVWaWNlIiwicm91bmRob3N0IiwidHlwZUxlZnQiLCJ0eXBlUmlnaHQiLCJjb250ZW50TGVmdCIsImNvbnRlbnRSaWdodCIsImNvbXBhcmVTaW5nbGVQb2tlckJpZ2dlciIsInRlc3RMb2dpYyIsInRlc3RBcnJheSIsImdhbWVob3N0IiwiTWF0aCIsInJhbmRvbSIsImNvbnNvbGUiLCJsb2ciLCJsZW5ndGgiLCJ0ZXN0VmFsdWUiLCJzdWJzdHJpbmciLCJjb21wYXJlUG9rZXIiLCJ0ZXN0QXJyYXlMb2dpYyIsInRlc3RBcnJheTEiLCJ0ZXN0QXJyYXkyIiwidmFsdWVMZWZ0IiwidmFsdWVSaWdodCIsInF1YXJ5UG9rZXJWYWx1ZSIsIkFycmF5IiwiaXNBcnJheSIsImVycm9yIiwiY29tcGFyZUFycmF5IiwibGVmdElzSG9zdCIsInJpZ2h0SXNIb3N0IiwicmVzdWx0IiwibGVmdE51bSIsInJpZ2h0TnVtIiwiYXJyYXlMZWZ0Iiwic29ydCIsImFycmF5UmlnaHQiLCJyZXN1bHRMZWZ0IiwiY2hlY2tBcnJheVZhbHVlIiwicmVzdWx0UmlnaHQiLCJhcnJheSIsIm9kZCIsImV2ZW4iLCJsYXN0VHlwZSIsImluZGV4IiwiY2FyZE51bSIsInR5cGUiLCJzdHIiLCJxdWFyeVR5cGUiLCJjb21wYXJlIiwiY29tcGFyZVJvdW5kIiwicGxheVBva2VycyIsImRlc3RvcnlBcnJheSIsImRlc3RvcnlOb2RlIiwiaSIsImRlc3Ryb3kiLCJhIiwiYiIsImZsb29yIiwibGVmdCIsInJpZ2h0Iiwic29ydEluc2VydCIsIml0ZW0iLCJwdXNoIiwid2VpZ2h0IiwiZmlyc3RXZWlnaHQiLCJsYXN0V2VpZ2h0IiwicXVhcnlQb2tlclR5cGVWYWx1ZSIsInBva2VyVmFsdWUiLCJzb3J0UG9rZXJzIiwiZ2FtZUhvc3QiLCJjYXJkQXJyYXkiLCJ0eXBlMUFycmF5IiwidHlwZTJBcnJheSIsInR5cGUzQXJyYXkiLCJ0eXBlNEFycmF5IiwiaG9zdEFycmF5IiwiY3JlYXRlU3RhdGljIiwiY29uY2F0IiwidG90YWwiLCJzYXZlUmVjb2RlciIsInVzZXJEYXRhIiwibmFtZSIsImxldmVsIiwiZ29sZCIsImNjIiwic3lzIiwibG9jYWxTdG9yYWdlIiwic2V0SXRlbSIsIkpTT04iLCJzdHJpbmdpZnkiLCJxdWFyeVJlb2NkZXIiLCJwYXJzZSIsImdldEl0ZW0iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxXQUFXLEdBQUcsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixFQUFoQixFQUFvQixFQUFwQixFQUF3QixFQUF4QixFQUE0QixFQUE1QixFQUFnQyxFQUFoQyxFQUFvQyxFQUFwQyxFQUF3QyxDQUF4QyxFQUEyQyxDQUEzQyxFQUE4QyxFQUE5QyxFQUFrRCxFQUFsRCxFQUFzRCxFQUF0RCxDQUFsQixFQUE0RTs7QUFDNUUsSUFBSUMsUUFBUSxHQUFHLENBQUMsQ0FBaEI7QUFDQSxJQUFJQyxTQUFTLEdBQUcsQ0FBaEI7O0lBQ3FCQzs7O0FBd0JqQjs7Ozs7Ozs7Ozs7QUE0RUE7Ozs7OztBQXNCQTs7OztZQUlPQyxtQkFBUCwwQkFBd0JDLEtBQXhCLEVBQStCO0FBQzNCLFdBQU9MLFdBQVcsQ0FBQ00sT0FBWixDQUFvQkQsS0FBcEIsQ0FBUDtBQUNIO0FBRUQ7Ozs7O1lBR09FLGNBQVAscUJBQW1CRixLQUFuQixFQUEwQjtBQUN0QixRQUFJRyxLQUFLLEdBQUdDLFFBQVEsQ0FBQ0osS0FBRCxDQUFwQjtBQUNBLFdBQU9HLEtBQUssSUFBSSxFQUFULElBQWVBLEtBQUssSUFBSSxDQUF4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QUFPLENBQUM1QixTQUFSLENBQWtCLENBQWxCLEVBQXFCLENBQXJCLENBQWQ7QUFDQSxRQUFJNkIsSUFBSSxHQUFHRCxPQUFPLENBQUM1QixTQUFSLENBQWtCLENBQWxCLENBQVg7QUFDQSxRQUFJYyxNQUFNLEdBQUd0QyxTQUFTLENBQUN1RCxTQUFWLENBQW9CRixJQUFwQixDQUFiOztBQUNBLFlBQVFHLE9BQVI7QUFDSSxXQUFLLElBQUw7QUFDSWxCLFFBQUFBLE1BQU0sR0FBR0EsTUFBTSxHQUFHLEdBQWxCO0FBQ0E7O0FBQ0osV0FBSyxJQUFMO0FBQ0lBLFFBQUFBLE1BQU0sR0FBR0EsTUFBTSxHQUFHLEdBQWxCO0FBQ0E7O0FBQ0osV0FBSyxJQUFMO0FBQ0lBLFFBQUFBLE1BQU0sR0FBR0EsTUFBTSxHQUFHLEdBQWxCO0FBQ0E7O0FBQ0osV0FBSyxJQUFMO0FBQ0lBLFFBQUFBLE1BQU0sR0FBR0EsTUFBTSxHQUFHLEdBQWxCO0FBQ0E7O0FBQ0osV0FBSyxJQUFMO0FBQ0lBLFFBQUFBLE1BQU0sR0FBR0EsTUFBTSxHQUFHLEdBQWxCO0FBQ0E7O0FBQ0osV0FBSyxJQUFMO0FBQ0lBLFFBQUFBLE1BQU0sR0FBR0EsTUFBTSxHQUFHLEdBQWxCO0FBQ0E7O0FBQ0osV0FBSyxJQUFMO0FBQ0lBLFFBQUFBLE1BQU0sR0FBR0EsTUFBTSxHQUFHLEdBQWxCO0FBQ0E7O0FBQ0osV0FBSyxJQUFMO0FBQ0lBLFFBQUFBLE1BQU0sR0FBR0EsTUFBTSxHQUFHLElBQWxCO0FBQ0E7O0FBQ0osV0FBSyxJQUFMO0FBQ0lBLFFBQUFBLE1BQU0sR0FBR0EsTUFBTSxHQUFHLEdBQWxCO0FBQ0E7O0FBQ0osV0FBSyxJQUFMO0FBQ0lBLFFBQUFBLE1BQU0sR0FBR0EsTUFBTSxHQUFHLEdBQWxCO0FBQ0E7O0FBQ0osV0FBSyxJQUFMO0FBQ0lBLFFBQUFBLE1BQU0sR0FBR0EsTUFBTSxHQUFHLEdBQWxCO0FBQ0E7O0FBQ0osV0FBSyxJQUFMO0FBQ0lBLFFBQUFBLE1BQU0sR0FBR0EsTUFBTSxHQUFHLEdBQWxCO0FBQ0E7O0FB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LEVBQUU7QUFISyxHQUFmO0FBTUFDLEVBQUFBLEVBQUUsQ0FBQ0MsR0FBSCxDQUFPQyxZQUFQLENBQW9CQyxPQUFwQixDQUE0QixVQUE1QixFQUF3Q0MsSUFBSSxDQUFDQyxTQUFMLENBQWVULFFBQWYsQ0FBeEM7QUFDSDs7QUEzZGlCeEYsVUE0ZFhrRyxlQUFhLFlBQUk7QUFDcEIsTUFBSVYsUUFBUSxHQUFHUSxJQUFJLENBQUNHLEtBQUwsQ0FBV1AsRUFBRSxDQUFDQyxHQUFILENBQU9DLFlBQVAsQ0FBb0JNLE9BQXBCLENBQTRCLFVBQTVCLENBQVgsQ0FBZjtBQUNIIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgcG9rZXJXZWlnaHQgPSBbNCwgNiwgNywgOCwgOSwgMTAsIDExLCAxMiwgMTMsIDE0LCAxNSwgMywgNSwgMTYsIDE3LCAxOF07Ly/kuLs15Li6MThcbmxldCBMRUZUX1dJTiA9IC0xO1xubGV0IFJJR0hUX1dJTiA9IDE7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb2tlclV0aWwge1xuXG4gICAgc3RhdGljIHRlc3RMb2dpYyA9ICh0ZXN0QXJyYXkpID0+IHtcbiAgICAgICAgbGV0IGdhbWVob3N0ID0gTWF0aC5yYW5kb20oKSAqIDQ7XG4gICAgICAgIGxldCByb3VuZGhvc3QgPSBNYXRoLnJhbmRvbSgpICogNDtcbiAgICAgICAgZ2FtZWhvc3QgPSBwYXJzZUludChnYW1laG9zdCkgKyAxO1xuICAgICAgICByb3VuZGhvc3QgPSBwYXJzZUludChyb3VuZGhvc3QpICsgMTtcbiAgICAgICAgY29uc29sZS5sb2coXCJvbmlvblwiLCBcIuW9k+WJjea4uOaIj+S4u1wiICsgZ2FtZWhvc3QgKyBcIuacrOi9ruS4u1wiICsgcm91bmRob3N0KTtcbiAgICAgICAgaWYgKHRlc3RBcnJheS5sZW5ndGggPT0gMSkge1xuICAgICAgICAgICAgbGV0IHRlc3RWYWx1ZSA9IHRlc3RBcnJheVswXSArIFwiXCI7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIm9uaW9uXCIsIFBva2VyVXRpbC5xdWFyeVBva2VyV2VpZ2h0KHBhcnNlSW50KHRlc3RWYWx1ZS5zdWJzdHJpbmcoMCwgMikpKSk7XG4gICAgICAgIH0gZWxzZSBpZiAodGVzdEFycmF5Lmxlbmd0aCA+PSAyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIm9uaW9uXCIsIFBva2VyVXRpbC5jb21wYXJlUG9rZXIoZ2FtZWhvc3QsIHJvdW5kaG9zdCwgdGVzdEFycmF5WzBdLCB0ZXN0QXJyYXlbMV0pKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzdGF0aWMgdGVzdEFycmF5TG9naWMgPSAodGVzdEFycmF5MSwgdGVzdEFycmF5MikgPT4ge1xuICAgICAgICBsZXQgZ2FtZWhvc3QgPSBNYXRoLnJhbmRvbSgpICogNDtcbiAgICAgICAgbGV0IHJvdW5kaG9zdCA9IE1hdGgucmFuZG9tKCkgKiA0O1xuICAgICAgICBnYW1laG9zdCA9IHBhcnNlSW50KGdhbWVob3N0KSArIDE7XG4gICAgICAgIHJvdW5kaG9zdCA9IHBhcnNlSW50KHJvdW5kaG9zdCkgKyAxO1xuICAgICAgXG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmr5TovoPniYznmoTlpKflsI9cbiAgICAgKiDmnIDlkI7kuIDkvY3mmK/oirHoibLvvIzliY3pnaLnm7TmjqXmr5TlpKflsI9cbiAgICAgKiDop4TliJkgMea4uOaIj+S4uz7ova7mrKHkuLs+5YmvXG4gICAgICogICAgICAyIDU+546LPjM+MlxuICAgICAqICAgICAgMyDlkIzkuLrlia/niYzvvIzoirHoibLmr5TlpKflsI9cbiAgICAgKiAgICAgIDRcbiAgICAgKiBAcGFyYW0geyp9IHZhbHVlTGVmdCAg5YWI54mMXG4gICAgICogQHBhcmFtIHsqfSB2YWx1ZVJpZ2h0IOWQjueJjFxuICAgICAqL1xuICAgIHN0YXRpYyBjb21wYXJlUG9rZXIgPSAoZ2FtZWhvc3QsIHJvdW5kaG9zdCwgdmFsdWVMZWZ0LCB2YWx1ZVJpZ2h0KSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwib25pb25cIiwgXCJjb21wYXJlUG9rZXIrK1wiICsgUG9rZXJVdGlsLnF1YXJ5UG9rZXJWYWx1ZSh2YWx1ZUxlZnQpICsgXCIvXCIgKyBQb2tlclV0aWwucXVhcnlQb2tlclZhbHVlKHZhbHVlUmlnaHQpKTtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWVMZWZ0KSB8fCBBcnJheS5pc0FycmF5KHZhbHVlUmlnaHQpKSB7XG4gICAgICAgICAgICBpZih2YWx1ZUxlZnQubGVuZ3RoPT0xKXtcbiAgICAgICAgICAgICAgICB2YWx1ZUxlZnQ9dmFsdWVMZWZ0WzBdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYodmFsdWVSaWdodC5sZW5ndGg9PTEpe1xuICAgICAgICAgICAgICAgIHZhbHVlUmlnaHQ9dmFsdWVSaWdodFswXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlTGVmdCkgfHwgQXJyYXkuaXNBcnJheSh2YWx1ZVJpZ2h0KSkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIm9uaW9uXCIsIFwi5pqC5LiN5pSv5oyB5pWw57uEXCIpO1xuICAgICAgICAgICAgUG9rZXJVdGlsLmNvbXBhcmVBcnJheShnYW1laG9zdCwgcm91bmRob3N0LCB2YWx1ZUxlZnQsIHZhbHVlUmlnaHQpO1xuICAgICAgICAgICAgcmV0dXJuIExFRlRfV0lOO1xuICAgICAgICB9XG4gICAgICAgIGlmICh2YWx1ZVJpZ2h0ID09IHZhbHVlTGVmdCkge1xuICAgICAgICAgICAgLy/lrozlhajnm7jlkIzvvIzlhYjniYzlpKdcbiAgICAgICAgICAgIHJldHVybiBMRUZUX1dJTjtcbiAgICAgICAgfVxuICAgICAgICB2YWx1ZVJpZ2h0ID0gdmFsdWVSaWdodCArIFwiXCI7XG4gICAgICAgIHZhbHVlTGVmdCA9IHZhbHVlTGVmdCArIFwiXCI7XG4gICAgICAgIC8vMSDliKTmlq3lhYjniYzlkI7niYznmoToirHoibJcbiAgICAgICAgbGV0IHR5cGVMZWZ0ID0gdmFsdWVMZWZ0LnN1YnN0cmluZygyKTtcbiAgICAgICAgbGV0IHR5cGVSaWdodCA9IHZhbHVlUmlnaHQuc3Vic3RyaW5nKDIpO1xuICAgICAgICAvLzLliKTmlq3lhYjniYzlkI7niYzlgLxcbiAgICAgICAgbGV0IGNvbnRlbnRMZWZ0ID0gdmFsdWVMZWZ0LnN1YnN0cmluZygwLCAyKTtcbiAgICAgICAgbGV0IGNvbnRlbnRSaWdodCA9IHZhbHVlUmlnaHQuc3Vic3RyaW5nKDAsIDIpO1xuICAgICAgICAvLzPliKTmlq3niYzmmK/lkKbkuLrkuLsg5rS75Yqo5Li7XG4gICAgICAgIGxldCBsZWZ0SXNIb3N0ID0gdHlwZUxlZnQgPT0gZ2FtZWhvc3QgfHwgUG9rZXJVdGlsLnF1YXJ5SXNIb3N0KGNvbnRlbnRMZWZ0KTtcbiAgICAgICAgbGV0IHJpZ2h0SXNIb3N0ID0gdHlwZUxlZnQgPT0gZ2FtZWhvc3QgfHwgUG9rZXJVdGlsLnF1YXJ5SXNIb3N0KGNvbnRlbnRSaWdodCk7XG4gICAgICAgIC8vNOavlOi+g1xuICAgICAgICBpZiAobGVmdElzSG9zdCAmJiByaWdodElzSG9zdCkge1xuICAgICAgICAgICAgLy/lkIzkuLrkuLvvvIzkuLs15pyA5aSnXG4gICAgICAgICAgICBpZiAocGFyc2VJbnQoY29udGVudExlZnQpID09IDUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gTEVGVF9XSU47XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHBhcnNlSW50KGNvbnRlbnRSaWdodCkgPT0gNSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBSSUdIVF9XSU47XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8v55u05o6l5q+U5aSn5bCPXG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IFBva2VyVXRpbC5jb21wYXJlU2luZ2xlUG9rZXJCaWdnZXIoY29udGVudExlZnQsIGNvbnRlbnRSaWdodCk7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdCAhPSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy/lpKflsI/nm7jlkIzvvIzlrZjlnKjmtLvliqjkuLvlkozoirHoibLkuLvniYzlgLznm7jlkIzmg4XlhrVcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVMZWZ0ID09IGdhbWVob3N0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gTEVGVF9XSU47XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZVJpZ2h0ID09IGdhbWVob3N0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gUklHSFRfV0lOO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Ugey8v5ZCM5Li65rS75Yqo5Li7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gTEVGVF9XSU47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChsZWZ0SXNIb3N0KSB7XG4gICAgICAgICAgICAvL+WFiOeJjOaYr+S4u++8jOWFiOeJjOWkp1xuICAgICAgICAgICAgcmV0dXJuIExFRlRfV0lOO1xuICAgICAgICB9IGVsc2UgaWYgKHJpZ2h0SXNIb3N0KSB7XG4gICAgICAgICAgICAvL+WQjueJjOaYr+S4u++8jOWQjueJjOWkp1xuICAgICAgICAgICAgcmV0dXJuIFJJR0hUX1dJTjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBQb2tlclV0aWwuY29tcGFyZVZpY2Uocm91bmRob3N0LCB0eXBlTGVmdCwgdHlwZVJpZ2h0LCBjb250ZW50TGVmdCwgY29udGVudFJpZ2h0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOS4jeWIpOaWreiKseiJsu+8jOebtOaOpeavlOWkp+WwjyDlj6rmjqXlj5fkuKTkvY1cbiAgICAgKiDlhYHorrjov5Tlm54wXG4gICAgICpcbiAgICAgKi9cbiAgICBzdGF0aWMgY29tcGFyZVNpbmdsZVBva2VyQmlnZ2VyID0gKHZhbHVlTGVmdCwgdmFsdWVSaWdodCkgPT4ge1xuICAgICAgICBpZiAodmFsdWVMZWZ0Lmxlbmd0aCA+IDIgfHwgdmFsdWVSaWdodC5sZW5ndGggPiAyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwi5Y+q5o6l5Y+X5Lik5L2N55qEXCIgKyB2YWx1ZUxlZnQgKyBcIi9cIiArIHZhbHVlUmlnaHQpO1xuICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGxlZnROdW0gPSBwYXJzZUludCh2YWx1ZUxlZnQpO1xuICAgICAgICBsZXQgcmlnaHROdW0gPSBwYXJzZUludCh2YWx1ZVJpZ2h0KTtcbiAgICAgICAgbGV0IHJlc3VsdCA9IFBva2VyVXRpbC5xdWFyeVBva2VyV2VpZ2h0KHJpZ2h0TnVtKSAtIFBva2VyVXRpbC5xdWFyeVBva2VyV2VpZ2h0KGxlZnROdW0pO1xuICAgICAgICBpZiAocmVzdWx0ID4gMCkge1xuICAgICAgICAgICAgcmVzdWx0ID0gUklHSFRfV0lOO1xuICAgICAgICB9IGVsc2UgaWYgKHJlc3VsdCA8IDApIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IExFRlRfV0lOO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDliKTmlq3niYznmoTlpKflsI9cbiAgICAgKiBAcGFyYW0geyp9IHBva2VyXG4gICAgICovXG4gICAgc3RhdGljIHF1YXJ5UG9rZXJXZWlnaHQocG9rZXIpIHtcbiAgICAgICAgcmV0dXJuIHBva2VyV2VpZ2h0LmluZGV4T2YocG9rZXIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWIpOaWreeJjOaYr+S4jeaYr+a0u+WKqOS4uyAxNSAzIDXlr7nlupQgMiAzIDVcbiAgICAgKi9cbiAgICBzdGF0aWMgcXVhcnlJc0hvc3QocG9rZXIpIHtcbiAgICAgICAgbGV0IHZhbHVlID0gcGFyc2VJbnQocG9rZXIpO1xuICAgICAgICByZXR1cm4gdmFsdWUgPT0gMTUgfHwgdmFsdWUgPT0gMyB8fCB2YWx1ZSA9PSA1IHx8IHZhbHVlID09IDE2IHx8IHZhbHVlID09IDE3IHx8IHZhbHVlID09IDE4Oy8vMiAzIDUg5bCP546LIOWkp+eOiyDkuLs1XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6L+U5Zue5YiG5pWw5YC8XG4gICAgICogQHBhcmFtIHBva2VyXG4gICAgICogQHJldHVybnMgeyp9XG4gICAgICovXG4gICAgc3RhdGljIHF1YXJ5SXNTb2Nlcihwb2tlcil7XG4gICAgICAgIGlmKHBva2VyPT01fHxwb2tlcj09MTApe1xuICAgICAgICAgICAgcmV0dXJuIHBva2VyO1xuICAgICAgICB9ZWxzZSBpZihwb2tlcj09MTMpe1xuICAgICAgICAgICAgcmV0dXJuIDEwO1xuICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWIpOaWreWJr+eJjOiwgeWkp1xuICAgICAqIEBwYXJhbSB7Kn0gcm91bmRob3N0XG4gICAgICogQHBhcmFtIHsqfSB2YWx1ZUxlZnRcbiAgICAgKiBAcGFyYW0geyp9IHZhbHVlUmlnaHRcbiAgICAgKi9cbiAgICBzdGF0aWMgY29tcGFyZVZpY2Uocm91bmRob3N0LCB0eXBlTGVmdCwgdHlwZVJpZ2h0LCBjb250ZW50TGVmdCwgY29udGVudFJpZ2h0KSB7XG4gICAgICAgIGlmICh0eXBlUmlnaHQgPT0gdHlwZUxlZnQgPT0gcm91bmRob3N0KSB7XG4gICAgICAgICAgICByZXR1cm4gUG9rZXJVdGlsLmNvbXBhcmVTaW5nbGVQb2tlckJpZ2dlcihjb250ZW50TGVmdCwgY29udGVudFJpZ2h0KTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlTGVmdCA9PSByb3VuZGhvc3QpIHtcbiAgICAgICAgICAgIHJldHVybiBMRUZUX1dJTjtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlUmlnaHQgPT0gcm91bmRob3N0KSB7XG4gICAgICAgICAgICByZXR1cm4gUklHSFRfV0lOO1xuICAgICAgICB9IGVsc2Ugey8v6YO95piv5Ymv54mMIOS4jeaYr+acrOi9ruS4u++8jOWkmuWNiuaYr+i3n+eJjO+8jOaEj+S5ieS4jeWkp1xuICAgICAgICAgICAgcmV0dXJuIExFRlRfV0lOO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBzdGF0aWMgY29tcGFyZUFycmF5ID0gKGdhbWVob3N0LCByb3VuZGhvc3QsIHZhbHVlTGVmdCwgdmFsdWVSaWdodCkgPT4ge1xuICAgICAgICAvL+WBtuaVsOW8oO+8jOaOkuaVsOS4jeS4gOiHtFxuICAgICAgICBpZiAodmFsdWVMZWZ0Lmxlbmd0aCAhPSB2YWx1ZVJpZ2h0Lmxlbmd0aCB8fCB2YWx1ZUxlZnQubGVuZ3RoICUgMiAhPSAwKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwib25pb25cIiwgXCLmlbDnu4Tplb/luqbkuI3kuIDoh7RcIik7XG4gICAgICAgICAgICByZXR1cm4gTEVGVF9XSU47XG4gICAgICAgIH1cbiAgICAgICAgLy8xIOaOkuW6j1xuICAgICAgICBsZXQgYXJyYXlMZWZ0ID0gdmFsdWVMZWZ0LnNvcnQoKTtcbiAgICAgICAgbGV0IGFycmF5UmlnaHQgPSB2YWx1ZVJpZ2h0LnNvcnQoKTtcbiAgICAgICAgLy8yIOWlh+aVsOWSjOWBtuaVsOS4gOagt++8jOWIpOaWreWvueWtkOWQiOazleaAp1xuICAgICAgICBsZXQgcmVzdWx0TGVmdCA9IFBva2VyVXRpbC5jaGVja0FycmF5VmFsdWUoYXJyYXlMZWZ0KTtcbiAgICAgICAgbGV0IHJlc3VsdFJpZ2h0ID0gUG9rZXJVdGlsLmNoZWNrQXJyYXlWYWx1ZShhcnJheVJpZ2h0KTtcbiAgICAgICAgaWYgKHJlc3VsdExlZnRbMF0gPT0gXCItMVwiKSB7XG4gICAgICAgICAgICByZXR1cm4gUklHSFRfV0lOO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZXN1bHRSaWdodFswXSA9PSBcIi0xXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBMRUZUX1dJTjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChnYW1laG9zdCA9PSByZXN1bHRMZWZ0WzBdID09IHJlc3VsdFJpZ2h0WzBdKSB7XG4gICAgICAgICAgICAvL+mDveaYr+S4u+WvuVxuICAgICAgICAgICAgaWYgKHJlc3VsdExlZnRbMV0gPiByZXN1bHRSaWdodFsxXSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBMRUZUX1dJTjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFJJR0hUX1dJTjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChnYW1laG9zdCA9PSByZXN1bHRMZWZ0WzBdKSB7XG4gICAgICAgICAgICByZXR1cm4gTEVGVF9XSU47XG4gICAgICAgIH0gZWxzZSBpZiAoZ2FtZWhvc3QgPT0gcmVzdWx0UmlnaHRbMF0pIHtcbiAgICAgICAgICAgIHJldHVybiBSSUdIVF9XSU47XG4gICAgICAgIH0gZWxzZSBpZiAocm91bmRob3N0ID09IHJlc3VsdExlZnRbMF0gPT0gcmVzdWx0UmlnaHRbMF0pIHtcbiAgICAgICAgICAgIC8v6YO95piv5Ymv5a+5XG4gICAgICAgICAgICBpZiAocmVzdWx0TGVmdFsxXSA+IHJlc3VsdFJpZ2h0WzFdKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIExFRlRfV0lOO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gUklHSFRfV0lOO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHJvdW5kaG9zdCA9PSByZXN1bHRMZWZ0WzBdKSB7XG4gICAgICAgICAgICByZXR1cm4gTEVGVF9XSU47XG4gICAgICAgIH0gZWxzZSBpZiAoZ2FtZWhvc3QgPT0gcmVzdWx0UmlnaHRbMF0pIHtcbiAgICAgICAgICAgIHJldHVybiBSSUdIVF9XSU47XG4gICAgICAgIH0gZWxzZSB7Ly/pg73kuI3mmK/kuLsg6Lef54mM5aSn5bCP5peg5oSP5LmJXG4gICAgICAgICAgICByZXR1cm4gTEVGVF9XSU47XG4gICAgICAgIH1cblxuICAgICAgICAvL+S4gOWvueebtOaOpeavlFxuICAgICAgICAvL+WkmuWvueWFiOagoemqjOWQiOazleaAp++8jDHmmK/lkKblpJrlr7kgMuaYr+WQpui/nuWvuSAz6Iqx6Imy5LiA6Ie0IDRcblxuICAgIH1cbiAgICAvKipcbiAgICAgKiDliKTmlq3lr7nlrZDlkIjms5XmgKcg6L+U5ZueW+iKseiJsiDmnYPph41dXG4gICAgICogQHBhcmFtIHsqfSBhcnJheSBcbiAgICAgKi9cbiAgICBzdGF0aWMgY2hlY2tBcnJheVZhbHVlID0gKGFycmF5KSA9PiB7XG4gICAgICAgIGxldCBvZGQgPSBcIi0xXCI7XG4gICAgICAgIGxldCBldmVuID0gXCItMVwiXG4gICAgICAgIGxldCBsYXN0VHlwZSA9IFwiLTFcIjtcbiAgICAgICAgbGV0IHJlc3VsdCA9IDA7XG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBhcnJheS5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgICAgIGlmIChpbmRleCAlIDIgPT0gMCkge1xuICAgICAgICAgICAgICAgIGV2ZW4gPSBhcnJheVtpbmRleF07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG9kZCA9IGFycmF5W2luZGV4XTtcbiAgICAgICAgICAgICAgICBpZiAoZXZlbiAhPSBvZGQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtcIi0xXCIsIC0xXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGV0IGNhcmROdW0gPSBvZGQ7XG4gICAgICAgICAgICAgICAgbGV0IHR5cGUgPSBcIjBcIjtcbiAgICAgICAgICAgICAgICBpZiAoY2FyZE51bSA9PSBcIjE3MVwiIHx8IGNhcmROdW0gPT0gXCIxNjFcIikge1xuICAgICAgICAgICAgICAgICAgICAvL+Wkp+Wwj+eOi1xuICAgICAgICAgICAgICAgICAgICB0eXBlID0gXCI1XCI7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHN0ciA9IGNhcmROdW0uc3Vic3RyaW5nKDIpO1xuICAgICAgICAgICAgICAgICAgICB0eXBlID0gUG9rZXJVdGlsLnF1YXJ5VHlwZShzdHIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobGFzdFR5cGUgIT0gdHlwZSAmJiBsYXN0VHlwZSAhPSBcIi0xXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgLy/kuI3mmK/pppbmrKHkuJTkuI7kuYvliY3oirHoibLkuI3lkIzvvIzkuI3og73nrpflr7nlrZBcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtcIi0xXCIsIC0xXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGFzdFR5cGUgPSB0eXBlO1xuICAgICAgICAgICAgICAgIGxldCBjb21wYXJlID0gY2FyZE51bS5zdWJzdHJpbmcoMCwgMik7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gcmVzdWx0ICsgUG9rZXJVdGlsLnF1YXJ5UG9rZXJXZWlnaHQocGFyc2VJbnQoY29tcGFyZSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbbGFzdFR5cGUsIHJlc3VsdF07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOavlOacrOi9ruWkp+Wwj++8jOi/lOWbnui1ouWutiAxMjM06aG65L2NXG4gICAgICovXG4gICAgc3RhdGljIGNvbXBhcmVSb3VuZCA9IChwbGF5UG9rZXJzKSA9PiB7XG5cbiAgICB9XG5cbiAgICBzdGF0aWMgZGVzdG9yeUFycmF5ID0gKGRlc3RvcnlOb2RlKSA9PiB7XG4gICAgICAgIGlmIChkZXN0b3J5Tm9kZSAhPSBudWxsKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRlc3RvcnlOb2RlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgZGVzdG9yeU5vZGVbaV0uZGVzdHJveSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHN0YXRpYyBzb3J0PShhLGIpPT57XG4gICAgICAgIGE9TWF0aC5mbG9vcihhLzEwKTtcbiAgICAgICAgYj1NYXRoLmZsb29yKGIvMTApO1xuICAgICAgICBsZXQgbGVmdD1Qb2tlclV0aWwucXVhcnlQb2tlcldlaWdodChhKTtcbiAgICAgICAgbGV0IHJpZ2h0PVBva2VyVXRpbC5xdWFyeVBva2VyV2VpZ2h0KGIpO1xuICAgICAgICByZXR1cm4gbGVmdC1yaWdodDtcbiAgICB9XG5cbiAgICBzdGF0aWMgc29ydEluc2VydD0oYXJyYXksaXRlbSk9PntcbiAgICAgICAgaWYoYXJyYXkubGVuZ3RoPT09MCl7XG4gICAgICAgICAgICBhcnJheS5wdXNoKGl0ZW0pO1xuICAgICAgICAgICAgcmV0dXJuIGFycmF5XG4gICAgICAgIH1cbiAgICAgICAgLy8gbGV0IHZhbHVlPWl0ZW0uc3Vic3RyaW5nKDAsMik7XG4gICAgICAgIGxldCB2YWx1ZT1pdGVtLzEwO1xuICAgICAgICBsZXQgd2VpZ2h0PVBva2VyVXRpbC5xdWFyeVBva2VyV2VpZ2h0KHZhbHVlKTtcbiAgICAgICAgbGV0IGZpcnN0V2VpZ2h0PVBva2VyVXRpbC5xdWFyeVBva2VyV2VpZ2h0KGFycmF5WzBdLzEwKTtcbiAgICAgICAgbGV0IGxhc3RXZWlnaHQ9UG9rZXJVdGlsLnF1YXJ5UG9rZXJXZWlnaHQoYXJyYXlbYXJyYXkubGVuZ3RoLTFdLzEwKTtcbiAgICAgICAgaWYod2VpZ2h0PD1maXJzdFdlaWdodCl7XG4gICAgICAgICAgICBhcnJheT1baXRlbSwuLi5hcnJheV07XG4gICAgICAgICAgICAvLyBhcnJheS51bnNoaWZ0KGl0ZW0pO1xuICAgICAgICB9ZWxzZSBpZih3ZWlnaHQ+PWxhc3RXZWlnaHQpe1xuICAgICAgICAgICAgYXJyYXkucHVzaChpdGVtKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYXJyYXk7XG5cbiAgICB9XG5cbiAgICBzdGF0aWMgcXVhcnlUeXBlID0gKHR5cGUpID0+IHtcbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgICBjYXNlIFwiMVwiOlxuICAgICAgICAgICAgICAgIHJldHVybiBcIuaWueWdl1wiO1xuICAgICAgICAgICAgY2FzZSBcIjJcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gXCLmooXoirFcIjtcbiAgICAgICAgICAgIGNhc2UgXCIzXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwi57qi5qGDXCI7XG4gICAgICAgICAgICBjYXNlIFwiNFwiOlxuICAgICAgICAgICAgICAgIHJldHVybiBcIum7keahg1wiO1xuICAgICAgICB9XG4gICAgfVxuICAgIHN0YXRpYyBxdWFyeVBva2VyVHlwZVZhbHVlID0gKHBva2VyVmFsdWUpID0+IHtcbiAgICAgICAgcG9rZXJWYWx1ZT1wb2tlclZhbHVlK1wiXCI7XG4gICAgICAgIGlmIChwb2tlclZhbHVlID09IFwiMTcxXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBcIjNcIjtcbiAgICAgICAgfVxuICAgICAgICBpZiAocG9rZXJWYWx1ZSA9PSBcIjE2MVwiKSB7XG4gICAgICAgICAgICByZXR1cm4gXCI0XCI7XG4gICAgICAgIH1cbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJvbmlvblwiLFwicG9rZXJWYWx1ZVwiK3Bva2VyVmFsdWUpO1xuICAgICAgICByZXR1cm4gcG9rZXJWYWx1ZS5zdWJzdHJpbmcoMik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOmAmui/h+eJjOW6j+afpeiKseiJsuWkp+Wwj1xuICAgICAqIOacgOWQjuS4gOS9jeaYr+iKseiJslxuICAgICAqL1xuICAgIHN0YXRpYyBxdWFyeVBva2VyVmFsdWUgPSAodmFsdWUpID0+IHtcbiAgICAgICAgbGV0IGNhcmROdW0gPSB2YWx1ZSArIFwiXCI7XG4gICAgICAgIGlmIChjYXJkTnVtID09IFwiMTcxXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBcIuWkp+eOi1wiO1xuICAgICAgICB9IGVsc2UgaWYgKGNhcmROdW0gPT0gXCIxNjFcIikge1xuICAgICAgICAgICAgcmV0dXJuIFwi5bCP546LXCJcbiAgICAgICAgfSBlbHNlIGlmIChjYXJkTnVtID09IFwiMTgxXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBcIuWNoeiDjFwiXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgY29tcGFyZSA9IGNhcmROdW0uc3Vic3RyaW5nKDAsIDIpO1xuICAgICAgICAgICAgbGV0IHR5cGUgPSBjYXJkTnVtLnN1YnN0cmluZygyKTtcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSBQb2tlclV0aWwucXVhcnlUeXBlKHR5cGUpO1xuICAgICAgICAgICAgc3dpdGNoIChjb21wYXJlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBcIjAzXCI6XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdCArIFwiM1wiO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiMDRcIjpcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gcmVzdWx0ICsgXCI0XCI7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgY2FzZSBcIjA1XCI6XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdCArIFwiNVwiO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiMDZcIjpcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gcmVzdWx0ICsgXCI2XCI7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCIwN1wiOlxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSByZXN1bHQgKyBcIjdcIjtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcIjA4XCI6XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdCArIFwiOFwiO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiMDlcIjpcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gcmVzdWx0ICsgXCI5XCI7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCIxMFwiOlxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSByZXN1bHQgKyBcIjEwXCI7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCIxMVwiOlxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSByZXN1bHQgKyBcIkpcIjtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcIjEyXCI6XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdCArIFwiUVwiO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiMTNcIjpcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gcmVzdWx0ICsgXCJLXCI7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCIxNFwiOlxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSByZXN1bHQgKyBcIkFcIjtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcIjE1XCI6XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdCArIFwiMlwiO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmiorniYzmjInoirHoibLmjpLlpb1cbiAgICAgKiBAcGFyYW0gZ2FtZUhvc3RcbiAgICAgKiBAcGFyYW0gY2FyZEFycmF5XG4gICAgICogQHJldHVybnNcbiAgICAgKiAge1xuICAgICAgICAgICAgdHlwZTFBcnJheTp0eXBlMUFycmF5LFxuICAgICAgICAgICAgdHlwZTJBcnJheTp0eXBlMkFycmF5LFxuICAgICAgICAgICAgdHlwZTNBcnJheTp0eXBlM0FycmF5LFxuICAgICAgICAgICAgdHlwZTRBcnJheTp0eXBlNEFycmF5LFxuICAgICAgICAgICAgaG9zdEFycmF5Omhvc3RBcnJheSxcbiAgICAgICAgICAgIHRvdGFsOnRvdGFsXG4gICAgICAgIH1cbiAgICAgKi9cbiAgICBzdGF0aWMgc29ydFBva2Vycz0oZ2FtZUhvc3QsY2FyZEFycmF5KT0+e1xuICAgICAgICBsZXQgdHlwZTFBcnJheT1bXTtcbiAgICAgICAgbGV0IHR5cGUyQXJyYXk9W107XG4gICAgICAgIGxldCB0eXBlM0FycmF5PVtdO1xuICAgICAgICBsZXQgdHlwZTRBcnJheT1bXTtcbiAgICAgICAgbGV0IGhvc3RBcnJheT1bXTsvL+a0u+WKqOS4u1xuICAgICAgICBmb3IobGV0IGk9MDtpPGNhcmRBcnJheS5sZW5ndGg7aSsrKXtcbiAgICAgICAgICAgIGxldCBpdGVtPWNhcmRBcnJheVtpXTtcbiAgICAgICAgICAgIGlmKGl0ZW09PTE3MXx8aXRlbT09MTYxKXtcbiAgICAgICAgICAgICAgICBob3N0QXJyYXkucHVzaChpdGVtKTtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gbGV0IHR5cGU9cGFyc2VJbnQoaXRlbS5zdWJzdHJpbmcoMikpO1xuICAgICAgICAgICAgbGV0IHZhbHVlPU1hdGguZmxvb3IoaXRlbS8xMCk7XG4gICAgICAgICAgICBpZihQb2tlclV0aWwucXVhcnlJc0hvc3QodmFsdWUpKXtcbiAgICAgICAgICAgICAgICBob3N0QXJyYXkucHVzaChpdGVtKTtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCB0eXBlPWl0ZW0lMTA7XG4gICAgICAgICAgICBzd2l0Y2ggKHR5cGUpe1xuICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgdHlwZTFBcnJheS5wdXNoKGl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgIHR5cGUyQXJyYXkucHVzaChpdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICB0eXBlM0FycmF5LnB1c2goaXRlbSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICAgICAgdHlwZTRBcnJheS5wdXNoKGl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBob3N0QXJyYXkuc29ydChQb2tlclV0aWwuc29ydCk7XG4gICAgICAgIHR5cGUxQXJyYXkuc29ydChQb2tlclV0aWwuc29ydCk7XG4gICAgICAgIHR5cGUyQXJyYXkuc29ydChQb2tlclV0aWwuc29ydCk7XG4gICAgICAgIHR5cGUzQXJyYXkuc29ydChQb2tlclV0aWwuc29ydCk7XG4gICAgICAgIHR5cGUzQXJyYXkuc29ydChQb2tlclV0aWwuc29ydCk7XG4gICAgICAgIHN3aXRjaCAocGFyc2VJbnQoZ2FtZUhvc3QpKXtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICByZXR1cm4gUG9rZXJVdGlsLmNyZWF0ZVN0YXRpYyh0eXBlMUFycmF5LHR5cGUyQXJyYXksdHlwZTNBcnJheSx0eXBlNEFycmF5LGhvc3RBcnJheSxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTJBcnJheS5jb25jYXQodHlwZTNBcnJheSkuY29uY2F0KHR5cGU0QXJyYXkpLmNvbmNhdCh0eXBlMUFycmF5KS5jb25jYXQoaG9zdEFycmF5KSk7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFBva2VyVXRpbC5jcmVhdGVTdGF0aWModHlwZTFBcnJheSx0eXBlMkFycmF5LHR5cGUzQXJyYXksdHlwZTRBcnJheSxob3N0QXJyYXksXG4gICAgICAgICAgICAgICAgICAgIHR5cGUzQXJyYXkuY29uY2F0KHR5cGU0QXJyYXkpLmNvbmNhdCh0eXBlMUFycmF5KS5jb25jYXQodHlwZTJBcnJheSkuY29uY2F0KGhvc3RBcnJheSkpO1xuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIHJldHVybiBQb2tlclV0aWwuY3JlYXRlU3RhdGljKHR5cGUxQXJyYXksdHlwZTJBcnJheSx0eXBlM0FycmF5LHR5cGU0QXJyYXksaG9zdEFycmF5LFxuICAgICAgICAgICAgICAgICAgICB0eXBlNEFycmF5LmNvbmNhdCh0eXBlMUFycmF5KS5jb25jYXQodHlwZTJBcnJheSkuY29uY2F0KHR5cGUzQXJyYXkpLmNvbmNhdChob3N0QXJyYXkpKTtcbiAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICByZXR1cm4gUG9rZXJVdGlsLmNyZWF0ZVN0YXRpYyh0eXBlMUFycmF5LHR5cGUyQXJyYXksdHlwZTNBcnJheSx0eXBlNEFycmF5LGhvc3RBcnJheSxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTFBcnJheS5jb25jYXQodHlwZTJBcnJheSkuY29uY2F0KHR5cGUzQXJyYXkpLmNvbmNhdCh0eXBlNEFycmF5KS5jb25jYXQoaG9zdEFycmF5KSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgIFxuICAgc3RhdGljIGNyZWF0ZVN0YXRpYz0odHlwZTFBcnJheSx0eXBlMkFycmF5LHR5cGUzQXJyYXksdHlwZTRBcnJheSxob3N0QXJyYXksdG90YWwpPT57XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlMUFycmF5OnR5cGUxQXJyYXksXG4gICAgICAgICAgICB0eXBlMkFycmF5OnR5cGUyQXJyYXksXG4gICAgICAgICAgICB0eXBlM0FycmF5OnR5cGUzQXJyYXksXG4gICAgICAgICAgICB0eXBlNEFycmF5OnR5cGU0QXJyYXksXG4gICAgICAgICAgICBob3N0QXJyYXk6aG9zdEFycmF5LFxuICAgICAgICAgICAgdG90YWw6dG90YWxcbiAgICAgICAgfVxuXG4gICB9XG5cbiAgIHN0YXRpYyBzYXZlUmVjb2Rlcj0oKT0+e1xuICAgICAgIGxldCB1c2VyRGF0YSA9IHtcbiAgICAgICAgICAgbmFtZTogJ1RyYWNlcicsXG4gICAgICAgICAgIGxldmVsOiAxLFxuICAgICAgICAgICBnb2xkOiAxMDBcbiAgICAgICB9O1xuXG4gICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKCd1c2VyRGF0YScsIEpTT04uc3RyaW5naWZ5KHVzZXJEYXRhKSk7XG4gICB9XG4gICBzdGF0aWMgcXVhcnlSZW9jZGVyPSgpPT57XG4gICAgICAgbGV0IHVzZXJEYXRhID0gSlNPTi5wYXJzZShjYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3VzZXJEYXRhJykpO1xuICAgfVxuXG59Il19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/Director.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '92036gCkblIs7Hs6LmBBYIQ', 'Director');
// scripts/Director.js

"use strict";

exports.__esModule = true;
exports["default"] = void 0;

/**
 * 导演类 控制整体流程
 * 游戏资源
 * 人气  与食物味道线性相关 与舒适度及服务水平乘系数关系
 * 客流量 实际来店人数，和人气成正比 受餐桌数量限制
 * 金币   雇佣厨师，购买食材等
 * 行动值 每天自动补全6次，随机事件选择，产生其他资源
 */
var Director = /*#__PURE__*/function () {
  //引导模式 考虑是否加提示标
  //编辑模式，家具带碰撞体积，可删除摆放
  //游戏所进行的时间
  //本天剩余操作数
  //剩余金币
  //夜晚 试做新菜或 重新钻研旧菜，每个厨师每夜可执行一个，可有另一厨师协助.
  // 菜做好后会放到厨师的装备栏里，每个厨师可装备3个菜
  //准备阶段,调整厨师，经营计划，服务员数量，培训等
  //经营阶段店内,每天有6个抉择，可在店内帮工/监工
  //可采购、试吃、挖掘食材、闲逛、海边等等 也能碰到广告、厨师争霸及卫生检查等消息
  //关店阶段，经营结束后，出若干随机事件，跳槽，卫生检查，客人找茬等信息，多为告知类
  function Director() {
    this.status = null;
  }

  var _proto = Director.prototype;

  _proto.run = function run() {
    if (this.editMode) {}

    switch (this.status) {
      case Director.STATUS_NIGHT:
        Director.operateCount = 6;
        break;

      case Director.STATUS_READY:
        break;

      case Director.STATUS_BUSSINESS:
        Director.operateCount--;

        if (Director.operateCount === 0) {
          this.status = Director.STATUS_CLOSE;
        }

        break;

      case Director.STATUS_OUTER:
        Director.operateCount--;

        if (Director.operateCount === 0) {
          this.status = Director.STATUS_CLOSE;
          cc.director.loadScene('game');
        }

      case Director.STATUS_CLOSE:
        break;
    }
  } //每个关键节点调用
  ;

  _proto.saveData = function saveData() {
    var userData = {
      operateCount: Director.operateCount,
      day: 1,
      coin: 100,
      cookerList: [],
      popular: 100 //人气值

    };
    var sceneData = {
      floor: 1,
      sceneList: [{
        name: "大吊灯",
        pic: "xxx.png",
        type: 1,
        locationX: 2,
        floor: 1,
        area: 1,
        //占地面积 同type互斥
        influence: 4 //影响范围

      }]
    };
    cc.sys.localStorage.setItem('userData', JSON.stringify(userData));
  } //游戏启动调用
  ;

  _proto.loadData = function loadData() {
    var userData = cc.sys.localStorage.getItem('userData');
  };

  return Director;
}();

exports["default"] = Director;
Director.GUIDE_MODE = 1;
Director.editMode = 0;
Director.day = 0;
Director.operateCount = 6;
Director.coin = 0;
Director.STATUS_NIGHT = 1;
Director.STATUS_READY = 2;
Director.STATUS_BUSSINESS = 3;
Director.STATUS_OUTER = 4;
Director.STATUS_CLOSE = 5;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL0RpcmVjdG9yLmpzIl0sIm5hbWVzIjpbIkRpcmVjdG9yIiwic3RhdHVzIiwicnVuIiwiZWRpdE1vZGUiLCJTVEFUVVNfTklHSFQiLCJvcGVyYXRlQ291bnQiLCJTVEFUVVNfUkVBRFkiLCJTVEFUVVNfQlVTU0lORVNTIiwiU1RBVFVTX0NMT1NFIiwiU1RBVFVTX09VVEVSIiwiY2MiLCJkaXJlY3RvciIsImxvYWRTY2VuZSIsInNhdmVEYXRhIiwidXNlckRhdGEiLCJkYXkiLCJjb2luIiwiY29va2VyTGlzdCIsInBvcHVsYXIiLCJzY2VuZURhdGEiLCJmbG9vciIsInNjZW5lTGlzdCIsIm5hbWUiLCJwaWMiLCJ0eXBlIiwibG9jYXRpb25YIiwiYXJlYSIsImluZmx1ZW5jZSIsInN5cyIsImxvY2FsU3RvcmFnZSIsInNldEl0ZW0iLCJKU09OIiwic3RyaW5naWZ5IiwibG9hZERhdGEiLCJnZXRJdGVtIiwiR1VJREVfTU9ERSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7SUFRcUJBO0FBQ0k7QUFDRjtBQUNuQjtBQUVBO0FBRUE7QUFHQTtBQUNBO0FBRUE7QUFFQTtBQUVBO0FBRUE7QUFFQSxzQkFBYTtBQUNULFNBQUtDLE1BQUwsR0FBWSxJQUFaO0FBQ0g7Ozs7U0FFREMsTUFBQSxlQUFLO0FBQ0QsUUFBRyxLQUFLQyxRQUFSLEVBQWlCLENBRWhCOztBQUNELFlBQVEsS0FBS0YsTUFBYjtBQUNJLFdBQUtELFFBQVEsQ0FBQ0ksWUFBZDtBQUNJSixRQUFBQSxRQUFRLENBQUNLLFlBQVQsR0FBc0IsQ0FBdEI7QUFDQTs7QUFDSixXQUFLTCxRQUFRLENBQUNNLFlBQWQ7QUFDSTs7QUFDSixXQUFLTixRQUFRLENBQUNPLGdCQUFkO0FBQ0lQLFFBQUFBLFFBQVEsQ0FBQ0ssWUFBVDs7QUFDQSxZQUFHTCxRQUFRLENBQUNLLFlBQVQsS0FBd0IsQ0FBM0IsRUFBNkI7QUFDekIsZUFBS0osTUFBTCxHQUFZRCxRQUFRLENBQUNRLFlBQXJCO0FBQ0g7O0FBQ0Q7O0FBQ0osV0FBS1IsUUFBUSxDQUFDUyxZQUFkO0FBQ0lULFFBQUFBLFFBQVEsQ0FBQ0ssWUFBVDs7QUFDQSxZQUFHTCxRQUFRLENBQUNLLFlBQVQsS0FBd0IsQ0FBM0IsRUFBNkI7QUFDekIsZUFBS0osTUFBTCxHQUFZRCxRQUFRLENBQUNRLFlBQXJCO0FBQ0FFLFVBQUFBLEVBQUUsQ0FBQ0MsUUFBSCxDQUFZQyxTQUFaLENBQXNCLE1BQXRCO0FBQ0g7O0FBQ0wsV0FBS1osUUFBUSxDQUFDUSxZQUFkO0FBQ0k7QUFuQlI7QUFxQkgsSUFFRDs7O1NBQ0FLLFdBQUEsb0JBQVU7QUFDTixRQUFJQyxRQUFRLEdBQUc7QUFDWFQsTUFBQUEsWUFBWSxFQUFFTCxRQUFRLENBQUNLLFlBRFo7QUFFWFUsTUFBQUEsR0FBRyxFQUFFLENBRk07QUFHWEMsTUFBQUEsSUFBSSxFQUFFLEdBSEs7QUFJWEMsTUFBQUEsVUFBVSxFQUFDLEVBSkE7QUFLWEMsTUFBQUEsT0FBTyxFQUFDLEdBTEcsQ0FLQzs7QUFMRCxLQUFmO0FBT0EsUUFBSUMsU0FBUyxHQUFDO0FBQ1ZDLE1BQUFBLEtBQUssRUFBQyxDQURJO0FBRVZDLE1BQUFBLFNBQVMsRUFBQyxDQUNOO0FBQ0lDLFFBQUFBLElBQUksRUFBQyxLQURUO0FBRUlDLFFBQUFBLEdBQUcsRUFBQyxTQUZSO0FBR0lDLFFBQUFBLElBQUksRUFBQyxDQUhUO0FBSUlDLFFBQUFBLFNBQVMsRUFBQyxDQUpkO0FBS0lMLFFBQUFBLEtBQUssRUFBQyxDQUxWO0FBTUlNLFFBQUFBLElBQUksRUFBQyxDQU5UO0FBTVc7QUFDUEMsUUFBQUEsU0FBUyxFQUFDLENBUGQsQ0FPZ0I7O0FBUGhCLE9BRE07QUFGQSxLQUFkO0FBaUJBakIsSUFBQUEsRUFBRSxDQUFDa0IsR0FBSCxDQUFPQyxZQUFQLENBQW9CQyxPQUFwQixDQUE0QixVQUE1QixFQUF3Q0MsSUFBSSxDQUFDQyxTQUFMLENBQWVsQixRQUFmLENBQXhDO0FBQ0gsSUFDRDs7O1NBQ0FtQixXQUFBLG9CQUFVO0FBQ1AsUUFBSW5CLFFBQVEsR0FBRUosRUFBRSxDQUFDa0IsR0FBSCxDQUFPQyxZQUFQLENBQW9CSyxPQUFwQixDQUE0QixVQUE1QixDQUFkO0FBQ0Y7Ozs7OztBQW5GZ0JsQyxTQUNUbUMsYUFBVztBQURGbkMsU0FFVEcsV0FBUztBQUZBSCxTQUlWZSxNQUFJO0FBSk1mLFNBTVZLLGVBQWE7QUFOSEwsU0FRVmdCLE9BQUs7QUFSS2hCLFNBWVZJLGVBQWE7QUFaSEosU0FjVk0sZUFBYTtBQWRITixTQWdCVk8sbUJBQWlCO0FBaEJQUCxTQWtCVlMsZUFBYTtBQWxCSFQsU0FvQlZRLGVBQWEiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxuLyoqXG4gKiDlr7zmvJTnsbsg5o6n5Yi25pW05L2T5rWB56iLXG4gKiDmuLjmiI/otYTmupBcbiAqIOS6uuawlCAg5LiO6aOf54mp5ZGz6YGT57q/5oCn55u45YWzIOS4juiIkumAguW6puWPiuacjeWKoeawtOW5s+S5mOezu+aVsOWFs+ezu1xuICog5a6i5rWB6YePIOWunumZheadpeW6l+S6uuaVsO+8jOWSjOS6uuawlOaIkOato+avlCDlj5fppJDmoYzmlbDph4/pmZDliLZcbiAqIOmHkeW4gSAgIOmbh+S9o+WOqOW4iO+8jOi0reS5sOmjn+adkOetiVxuICog6KGM5Yqo5YC8IOavj+WkqeiHquWKqOihpeWFqDbmrKHvvIzpmo/mnLrkuovku7bpgInmi6nvvIzkuqfnlJ/lhbbku5botYTmupBcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGlyZWN0b3J7XG4gICAgc3RhdGljICBHVUlERV9NT0RFPTE7Ly/lvJXlr7zmqKHlvI8g6ICD6JmR5piv5ZCm5Yqg5o+Q56S65qCHXG4gICAgc3RhdGljICBlZGl0TW9kZT0wOy8v57yW6L6R5qih5byP77yM5a625YW35bim56Kw5pKe5L2T56ev77yM5Y+v5Yig6Zmk5pGG5pS+XG4gICAgLy/muLjmiI/miYDov5vooYznmoTml7bpl7RcbiAgICBzdGF0aWMgZGF5PTA7XG4gICAgLy/mnKzlpKnliankvZnmk43kvZzmlbBcbiAgICBzdGF0aWMgb3BlcmF0ZUNvdW50PTY7XG4gICAgLy/liankvZnph5HluIFcbiAgICBzdGF0aWMgY29pbj0wO1xuXG4gICAgLy/lpJzmmZog6K+V5YGa5paw6I+c5oiWIOmHjeaWsOmSu+eglOaXp+iPnO+8jOavj+S4quWOqOW4iOavj+WknOWPr+aJp+ihjOS4gOS4qu+8jOWPr+acieWPpuS4gOWOqOW4iOWNj+WKqS5cbiAgICAvLyDoj5zlgZrlpb3lkI7kvJrmlL7liLDljqjluIjnmoToo4XlpIfmoI/ph4zvvIzmr4/kuKrljqjluIjlj6/oo4XlpIcz5Liq6I+cXG4gICAgc3RhdGljIFNUQVRVU19OSUdIVD0xO1xuICAgIC8v5YeG5aSH6Zi25q61LOiwg+aVtOWOqOW4iO+8jOe7j+iQpeiuoeWIku+8jOacjeWKoeWRmOaVsOmHj++8jOWfueiureetiVxuICAgIHN0YXRpYyBTVEFUVVNfUkVBRFk9MjtcbiAgICAvL+e7j+iQpemYtuauteW6l+WGhSzmr4/lpKnmnIk25Liq5oqJ5oup77yM5Y+v5Zyo5bqX5YaF5biu5belL+ebkeW3pVxuICAgIHN0YXRpYyBTVEFUVVNfQlVTU0lORVNTPTM7XG4gICAgLy/lj6/ph4fotK3jgIHor5XlkIPjgIHmjJbmjpjpo5/mnZDjgIHpl7LpgJvjgIHmtbfovrnnrYnnrYkg5Lmf6IO956Kw5Yiw5bm/5ZGK44CB5Y6o5biI5LqJ6Zy45Y+K5Y2r55Sf5qOA5p+l562J5raI5oGvXG4gICAgc3RhdGljIFNUQVRVU19PVVRFUj00O1xuICAgIC8v5YWz5bqX6Zi25q6177yM57uP6JCl57uT5p2f5ZCO77yM5Ye66Iul5bmy6ZqP5py65LqL5Lu277yM6Lez5qe977yM5Y2r55Sf5qOA5p+l77yM5a6i5Lq65om+6Iys562J5L+h5oGv77yM5aSa5Li65ZGK55+l57G7XG4gICAgc3RhdGljIFNUQVRVU19DTE9TRT01O1xuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHRoaXMuc3RhdHVzPW51bGw7XG4gICAgfVxuXG4gICAgcnVuKCl7XG4gICAgICAgIGlmKHRoaXMuZWRpdE1vZGUpe1xuXG4gICAgICAgIH1cbiAgICAgICAgc3dpdGNoICh0aGlzLnN0YXR1cyl7XG4gICAgICAgICAgICBjYXNlIERpcmVjdG9yLlNUQVRVU19OSUdIVDpcbiAgICAgICAgICAgICAgICBEaXJlY3Rvci5vcGVyYXRlQ291bnQ9NjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgRGlyZWN0b3IuU1RBVFVTX1JFQURZOlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBEaXJlY3Rvci5TVEFUVVNfQlVTU0lORVNTOlxuICAgICAgICAgICAgICAgIERpcmVjdG9yLm9wZXJhdGVDb3VudC0tO1xuICAgICAgICAgICAgICAgIGlmKERpcmVjdG9yLm9wZXJhdGVDb3VudD09PTApe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXR1cz1EaXJlY3Rvci5TVEFUVVNfQ0xPU0U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBEaXJlY3Rvci5TVEFUVVNfT1VURVI6XG4gICAgICAgICAgICAgICAgRGlyZWN0b3Iub3BlcmF0ZUNvdW50LS07XG4gICAgICAgICAgICAgICAgaWYoRGlyZWN0b3Iub3BlcmF0ZUNvdW50PT09MCl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdHVzPURpcmVjdG9yLlNUQVRVU19DTE9TRTtcbiAgICAgICAgICAgICAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKCdnYW1lJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSBEaXJlY3Rvci5TVEFUVVNfQ0xPU0U6XG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8v5q+P5Liq5YWz6ZSu6IqC54K56LCD55SoXG4gICAgc2F2ZURhdGEoKXtcbiAgICAgICAgbGV0IHVzZXJEYXRhID0ge1xuICAgICAgICAgICAgb3BlcmF0ZUNvdW50OiBEaXJlY3Rvci5vcGVyYXRlQ291bnQsXG4gICAgICAgICAgICBkYXk6IDEsXG4gICAgICAgICAgICBjb2luOiAxMDAsXG4gICAgICAgICAgICBjb29rZXJMaXN0OltdLFxuICAgICAgICAgICAgcG9wdWxhcjoxMDAsLy/kurrmsJTlgLxcbiAgICAgICAgfTtcbiAgICAgICAgbGV0IHNjZW5lRGF0YT17XG4gICAgICAgICAgICBmbG9vcjoxLFxuICAgICAgICAgICAgc2NlbmVMaXN0OltcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6XCLlpKflkIrnga9cIixcbiAgICAgICAgICAgICAgICAgICAgcGljOlwieHh4LnBuZ1wiLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOjEsXG4gICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uWDoyLFxuICAgICAgICAgICAgICAgICAgICBmbG9vcjoxLFxuICAgICAgICAgICAgICAgICAgICBhcmVhOjEsLy/ljaDlnLDpnaLnp68g5ZCMdHlwZeS6kuaWpVxuICAgICAgICAgICAgICAgICAgICBpbmZsdWVuY2U6NCwvL+W9seWTjeiMg+WbtFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cblxuICAgICAgICB9O1xuXG5cbiAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKCd1c2VyRGF0YScsIEpTT04uc3RyaW5naWZ5KHVzZXJEYXRhKSk7XG4gICAgfVxuICAgIC8v5ri45oiP5ZCv5Yqo6LCD55SoXG4gICAgbG9hZERhdGEoKXtcbiAgICAgICBsZXQgdXNlckRhdGE9IGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndXNlckRhdGEnKTtcbiAgICB9XG5cbn0iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/beans/StatusBean.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd57697HpPNPhLRPBAxsQ/Sd', 'StatusBean');
// scripts/beans/StatusBean.js

"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _Game = require("../Game");

var StatusBean = /*#__PURE__*/function () {
  function StatusBean() {
    this.id = -1;
    this.level = -1;
    this.sprite = {
      //基础贴图
      "default": null,
      type: cc.SpriteFrame
    };
    this.round = -1; //费用

    this.type = _Game.StatusType.ROUNDBEGIN; //状态类型 1回合开始结算 2出牌是结算 3弃牌时结算 4回合结束时结算 5敌方回合结算
  }
  /**
   * 结算状态
   */


  var _proto = StatusBean.prototype;

  _proto.operateStatus = function operateStatus(roundtype) {
    if (roundtype === this.type) {
      return true;
    } else {
      return false;
    }
  };

  return StatusBean;
}();

exports["default"] = StatusBean;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL2JlYW5zL1N0YXR1c0JlYW4uanMiXSwibmFtZXMiOlsiU3RhdHVzQmVhbiIsImlkIiwibGV2ZWwiLCJzcHJpdGUiLCJ0eXBlIiwiY2MiLCJTcHJpdGVGcmFtZSIsInJvdW5kIiwiU3RhdHVzVHlwZSIsIlJPVU5EQkVHSU4iLCJvcGVyYXRlU3RhdHVzIiwicm91bmR0eXBlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztJQUdxQkE7QUFDakIsd0JBQWM7QUFDVixTQUFLQyxFQUFMLEdBQVUsQ0FBQyxDQUFYO0FBQ0EsU0FBS0MsS0FBTCxHQUFhLENBQUMsQ0FBZDtBQUNBLFNBQUtDLE1BQUwsR0FBYztBQUFDO0FBQ1gsaUJBQVMsSUFEQztBQUVWQyxNQUFBQSxJQUFJLEVBQUVDLEVBQUUsQ0FBQ0M7QUFGQyxLQUFkO0FBSUEsU0FBS0MsS0FBTCxHQUFhLENBQUMsQ0FBZCxDQVBVLENBT007O0FBQ2hCLFNBQUtILElBQUwsR0FBWUksaUJBQVdDLFVBQXZCLENBUlUsQ0FRd0I7QUFDckM7QUFFRDs7Ozs7OztTQUdBQyxnQkFBQSx1QkFBY0MsU0FBZCxFQUF3QjtBQUNwQixRQUFHQSxTQUFTLEtBQUcsS0FBS1AsSUFBcEIsRUFBeUI7QUFDckIsYUFBTyxJQUFQO0FBQ0gsS0FGRCxNQUVNO0FBQ0YsYUFBTyxLQUFQO0FBQ0g7QUFDSiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtTdGF0dXNUeXBlfSBmcm9tIFwiLi4vR2FtZVwiO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0YXR1c0JlYW4ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmlkID0gLTE7XG4gICAgICAgIHRoaXMubGV2ZWwgPSAtMTtcbiAgICAgICAgdGhpcy5zcHJpdGUgPSB7Ly/ln7rnoYDotLTlm75cbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGVGcmFtZSxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5yb3VuZCA9IC0xOy8v6LS555SoXG4gICAgICAgIHRoaXMudHlwZSA9IFN0YXR1c1R5cGUuUk9VTkRCRUdJTjsvL+eKtuaAgeexu+WeiyAx5Zue5ZCI5byA5aeL57uT566XIDLlh7rniYzmmK/nu5PnrpcgM+W8g+eJjOaXtue7k+eulyA05Zue5ZCI57uT5p2f5pe257uT566XIDXmlYzmlrnlm57lkIjnu5PnrpdcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDnu5PnrpfnirbmgIFcbiAgICAgKi9cbiAgICBvcGVyYXRlU3RhdHVzKHJvdW5kdHlwZSl7XG4gICAgICAgIGlmKHJvdW5kdHlwZT09PXRoaXMudHlwZSl7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG59Il19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/Game.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4e12fLSQu1L+KV6QmxDiavU', 'Game');
// scripts/Game.js

"use strict";

exports.__esModule = true;
exports.StatusType = void 0;

var _CardBean = _interopRequireDefault(require("./beans/CardBean"));

var _RoleBean = _interopRequireDefault(require("./beans/RoleBean"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PokerUtil = require("PokerUtil");

var AIHelper = require("AIHelper");

var self;
var StatusType = {
  ENCOUNTER: 0,
  //遭遇
  ROUNDBEGIN: 1,
  //回合开始
  ROUNDOVER: -1,
  //回合结束
  CLEAR: -2,
  //战斗结束
  DRAW: 2,
  SEND: 3,
  //出牌
  LOSE: 4,
  //弃牌
  ATTACK: 5,
  //攻击时触发
  UNDERATTACK: 6 //被攻击时触发

};
exports.StatusType = StatusType;
var totalCardNum = 5;
/**
 * 战斗界面 demo版本，做一个抽卡，每张卡能打3点血，敌方有20点血的demo
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
    cardPrefab: {
      "default": null,
      type: cc.Prefab
    },
    cardArrays: {
      "default": null,
      type: cc.Layout
    },
    sendBtn: {
      "default": null,
      type: cc.Button
    },
    roundOverBtn: {
      "default": null,
      type: cc.Button
    },
    roundType: StatusType.ROUNDBEGIN,
    hero: {
      "default": null,
      type: cc.Node
    },
    enemy: {
      "default": null,
      type: cc.Node
    },
    enemyCardLabel: {
      "default": null,
      type: cc.Label
    },
    currentCard: null,
    //玩家当前选中的卡片
    enemyCardArrays: [],
    //敌人卡牌
    roundSide: 1,
    //回合轮次
    roundCount: 0
  },
  onLoad: function onLoad() {
    self = this;
    this.playLog = "游戏开始";
    this.roundOverBtn.node.on("click", this.roundOver, this);
    this.sendBtn.node.on("click", this.sendCard, this);
    this.gameEncounter(); // 这里的 this 指向 component
  },
  drawAICard: function drawAICard() {
    var cardBean = new _CardBean["default"]();
    self.enemyRole.onDrawCard(cardBean);
    self.enemyCardArrays.push(cardBean);
  },
  //玩家抽牌
  drawCard: function drawCard() {
    var newCard = cc.instantiate(self.cardPrefab); // newStar.setPicNum("i"+i);

    var card = newCard.getComponent('Card');
    var cardBean = new _CardBean["default"]();
    self.heroRole.onDrawCard(cardBean);
    card.bindCardBean(cardBean);
    card.bindCardFunction(this.onCheck);
    self.cardArrays.node.addChild(newCard);
  },
  onCheck: function onCheck(card, isCheck) {
    if (isCheck) {
      //选中
      if (self.currentCard != null) {
        self.currentCard.onCancel();
      }

      self.currentCard = card;
    } else {
      self.currentCard = null;
    }
  },

  /**
   * 判断牌是否能出
   * 判断知否是指向性牌
   *
   */
  sendCard: function sendCard() {
    if (self.roundSide !== 1) {
      //敌方回合 胜利 不能出牌
      return;
    }

    if (self.currentCard != null) {
      var card = self.currentCard.node.getComponent("Card");
      var cardBean = card.getCardBean();
      self.sendFocusShow(cardBean);
      var value = cardBean.sendEffect(); //造成的伤害值

      self.appendLog("对方受到伤害" + value); //攻击时的伤害值加强

      value = self.heroRole.attack(value); //状态调整或附加

      var live = self.enemyRole.underattack(value);
      self.currentCard.node.destroy();
      self.currentCard = null;

      if (!live) {
        self.roundSide = -1;
        self.appendLog("敌人死亡 游戏胜利");
      }
    }
  },
  sendFocusShow: function sendFocusShow(cardBean) {
    self.appendLog("出牌" + cardBean.title);
  },
  roundOver: function roundOver() {
    if (self.roundSide !== 1) {
      //敌方回合 胜利 不能出牌
      return;
    }

    self.appendLog("回合结束");
    this.roundProgram(0);
  },
  gameEncounter: function gameEncounter() {
    var _this = this;

    var hero = new _RoleBean["default"](1);
    var enemy = new _RoleBean["default"](0);
    this.enemyRole = this.enemy.getComponent('Role');
    this.enemyRole.bindRoleBean(enemy);
    this.heroRole = this.hero.getComponent('Role');
    this.heroRole.bindRoleBean(hero);
    this.scheduleOnce(function () {
      return _this.roundProgram(1);
    }, 1);
  },

  /**
   * 每回合的执行顺序
   */
  roundProgram: function roundProgram(rolettype) {
    var number = 0;
    this.roundSide = rolettype;

    if (rolettype === 1) {
      self.appendLog("你的回合");
      this.roundCount++;
      this.heroRole.roundBegin();
      number = self.cardArrays.node.childrenCount; //抽卡直到手牌抽满

      self.appendLog("你抽牌");

      for (var i = 0; i < totalCardNum - number; i++) {
        this.drawCard();
      } //等待出牌

    } else {
      self.appendLog("对方回合");
      this.enemyRole.roundBegin();
      number = self.enemyCardArrays.length;
      self.appendLog("对方抽牌"); //调用ai抽牌

      for (var _i = 0; _i < totalCardNum - number; _i++) {
        this.drawAICard();
      }

      this.enemyCardLabel.string = self.enemyCardArrays.length + "张";
      this.logicAI();
    }
  },
  //AI出牌逻辑
  logicAI: function logicAI() {
    for (var i = 0; i < self.enemyCardArrays.length;) {
      var cardBean = self.enemyCardArrays[i];
      var canSend = true;

      if (canSend) {
        self.enemyCardArrays.splice(i, 1);
        var value = cardBean.sendEffect();
        value = self.enemyRole.attack(value);
        self.appendLog("你受到伤害" + value);
        self.sendFocusShow(cardBean);
        var live = self.heroRole.underattack(value);

        if (!live) {
          self.appendLog("英雄死亡 游戏结束");
          self.roundSide = -1;
          return;
        }

        this.enemyCardLabel.string = self.enemyCardArrays.length + "张";
        self.scheduleOnce(function () {
          return self.logicAI();
        }, 1);
        return;
      } else {
        i++;
      }
    }

    self.enemyRole.roundOver();
    self.roundProgram(1);
  },
  //     move:function(node,distance){
  //         // 创建一个移动动作
  //         let seq = cc.repeat(
  //             cc.sequence(
  //                 cc.moveBy(2,  -distance, 50),
  //                 cc.moveBy(2,distance, -50)
  //             ), 2);
  //
  //
  // // 执行动作
  //         node.runAction(seq);
  // // 停止一个动作
  // //         node.stopAction(action);
  //     },

  /**
   * 切换至地图
   */
  outerClick: function outerClick() {
    cc.director.loadScene('outermap');
  },
  appendLog: function appendLog(string) {
    self.playLog = self.playLog + "\n" + string;
    self.logs.string = self.playLog;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL0dhbWUuanMiXSwibmFtZXMiOlsiUG9rZXJVdGlsIiwicmVxdWlyZSIsIkFJSGVscGVyIiwic2VsZiIsIlN0YXR1c1R5cGUiLCJFTkNPVU5URVIiLCJST1VOREJFR0lOIiwiUk9VTkRPVkVSIiwiQ0xFQVIiLCJEUkFXIiwiU0VORCIsIkxPU0UiLCJBVFRBQ0siLCJVTkRFUkFUVEFDSyIsInRvdGFsQ2FyZE51bSIsImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwibG9ncyIsInR5cGUiLCJMYWJlbCIsIm1lbnVWaWV3IiwiQnV0dG9uIiwiY29pblZhbHVlVmlldyIsImNhcmRQcmVmYWIiLCJQcmVmYWIiLCJjYXJkQXJyYXlzIiwiTGF5b3V0Iiwic2VuZEJ0biIsInJvdW5kT3ZlckJ0biIsInJvdW5kVHlwZSIsImhlcm8iLCJOb2RlIiwiZW5lbXkiLCJlbmVteUNhcmRMYWJlbCIsImN1cnJlbnRDYXJkIiwiZW5lbXlDYXJkQXJyYXlzIiwicm91bmRTaWRlIiwicm91bmRDb3VudCIsIm9uTG9hZCIsInBsYXlMb2ciLCJub2RlIiwib24iLCJyb3VuZE92ZXIiLCJzZW5kQ2FyZCIsImdhbWVFbmNvdW50ZXIiLCJkcmF3QUlDYXJkIiwiY2FyZEJlYW4iLCJDYXJkQmVhbiIsImVuZW15Um9sZSIsIm9uRHJhd0NhcmQiLCJwdXNoIiwiZHJhd0NhcmQiLCJuZXdDYXJkIiwiaW5zdGFudGlhdGUiLCJjYXJkIiwiZ2V0Q29tcG9uZW50IiwiaGVyb1JvbGUiLCJiaW5kQ2FyZEJlYW4iLCJiaW5kQ2FyZEZ1bmN0aW9uIiwib25DaGVjayIsImFkZENoaWxkIiwiaXNDaGVjayIsIm9uQ2FuY2VsIiwiZ2V0Q2FyZEJlYW4iLCJzZW5kRm9jdXNTaG93IiwidmFsdWUiLCJzZW5kRWZmZWN0IiwiYXBwZW5kTG9nIiwiYXR0YWNrIiwibGl2ZSIsInVuZGVyYXR0YWNrIiwiZGVzdHJveSIsInRpdGxlIiwicm91bmRQcm9ncmFtIiwiUm9sZUJlYW4iLCJiaW5kUm9sZUJlYW4iLCJzY2hlZHVsZU9uY2UiLCJyb2xldHR5cGUiLCJudW1iZXIiLCJyb3VuZEJlZ2luIiwiY2hpbGRyZW5Db3VudCIsImkiLCJsZW5ndGgiLCJzdHJpbmciLCJsb2dpY0FJIiwiY2FuU2VuZCIsInNwbGljZSIsIm91dGVyQ2xpY2siLCJkaXJlY3RvciIsImxvYWRTY2VuZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7OztBQUVBLElBQUlBLFNBQVMsR0FBR0MsT0FBTyxDQUFDLFdBQUQsQ0FBdkI7O0FBQ0EsSUFBSUMsUUFBUSxHQUFHRCxPQUFPLENBQUMsVUFBRCxDQUF0Qjs7QUFDQSxJQUFJRSxJQUFKO0FBQ08sSUFBSUMsVUFBVSxHQUFHO0FBQ3BCQyxFQUFBQSxTQUFTLEVBQUUsQ0FEUztBQUNQO0FBQ2JDLEVBQUFBLFVBQVUsRUFBRSxDQUZRO0FBRU47QUFDZEMsRUFBQUEsU0FBUyxFQUFFLENBQUMsQ0FIUTtBQUdOO0FBQ2RDLEVBQUFBLEtBQUssRUFBRSxDQUFDLENBSlk7QUFJVjtBQUNWQyxFQUFBQSxJQUFJLEVBQUMsQ0FMZTtBQU1wQkMsRUFBQUEsSUFBSSxFQUFFLENBTmM7QUFNWjtBQUNSQyxFQUFBQSxJQUFJLEVBQUUsQ0FQYztBQU9aO0FBQ1JDLEVBQUFBLE1BQU0sRUFBRSxDQVJZO0FBUVY7QUFDVkMsRUFBQUEsV0FBVyxFQUFFLENBVE8sQ0FTTDs7QUFUSyxDQUFqQjs7QUFXUCxJQUFJQyxZQUFZLEdBQUcsQ0FBbkI7QUFDQTs7OztBQUdBQyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsSUFBSSxFQUFDO0FBQ0QsaUJBQVEsSUFEUDtBQUVEQyxNQUFBQSxJQUFJLEVBQUNMLEVBQUUsQ0FBQ007QUFGUCxLQURHO0FBTVJDLElBQUFBLFFBQVEsRUFBRTtBQUNOLGlCQUFTLElBREg7QUFFTkYsTUFBQUEsSUFB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O0FBQUEsU0FBbEIsRUFBd0MsQ0FBeEM7QUFDQTtBQUNILE9BZkQsTUFlTTtBQUNGSCxRQUFBQSxDQUFDO0FBQ0o7QUFFSjs7QUFDRGhGLElBQUFBLElBQUksQ0FBQytDLFNBQUwsQ0FBZU4sU0FBZjtBQUNBekMsSUFBQUEsSUFBSSxDQUFDd0UsWUFBTCxDQUFrQixDQUFsQjtBQUNILEdBMU1JO0FBNE1UO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0k7OztBQUdBYyxFQUFBQSxVQUFVLEVBQUUsc0JBQVk7QUFDcEIxRSxJQUFBQSxFQUFFLENBQUMyRSxRQUFILENBQVlDLFNBQVosQ0FBc0IsVUFBdEI7QUFFSCxHQWhPSTtBQWlPTHRCLEVBQUFBLFNBQVMsRUFBRSxtQkFBVWdCLE1BQVYsRUFBa0I7QUFDekJsRixJQUFBQSxJQUFJLENBQUNzQyxPQUFMLEdBQWV0QyxJQUFJLENBQUNzQyxPQUFMLEdBQWUsSUFBZixHQUFzQjRDLE1BQXJDO0FBQ0FsRixJQUFBQSxJQUFJLENBQUNnQixJQUFMLENBQVVrRSxNQUFWLEdBQW1CbEYsSUFBSSxDQUFDc0MsT0FBeEI7QUFFSDtBQXJPSSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ2FyZEJlYW4gZnJvbSBcIi4vYmVhbnMvQ2FyZEJlYW5cIjtcbmltcG9ydCBSb2xlQmVhbiBmcm9tIFwiLi9iZWFucy9Sb2xlQmVhblwiO1xuXG5sZXQgUG9rZXJVdGlsID0gcmVxdWlyZShcIlBva2VyVXRpbFwiKTtcbmxldCBBSUhlbHBlciA9IHJlcXVpcmUoXCJBSUhlbHBlclwiKTtcbmxldCBzZWxmO1xuZXhwb3J0IHZhciBTdGF0dXNUeXBlID0ge1xuICAgIEVOQ09VTlRFUjogMCwvL+mBremBh1xuICAgIFJPVU5EQkVHSU46IDEsLy/lm57lkIjlvIDlp4tcbiAgICBST1VORE9WRVI6IC0xLC8v5Zue5ZCI57uT5p2fXG4gICAgQ0xFQVI6IC0yLC8v5oiY5paX57uT5p2fXG4gICAgRFJBVzoyLFxuICAgIFNFTkQ6IDMsLy/lh7rniYxcbiAgICBMT1NFOiA0LC8v5byD54mMXG4gICAgQVRUQUNLOiA1LC8v5pS75Ye75pe26Kem5Y+RXG4gICAgVU5ERVJBVFRBQ0s6IDYsLy/ooqvmlLvlh7vml7bop6blj5Fcbn1cbmxldCB0b3RhbENhcmROdW0gPSA1O1xuLyoqXG4gKiDmiJjmlpfnlYzpnaIgZGVtb+eJiOacrO+8jOWBmuS4gOS4quaKveWNoe+8jOavj+W8oOWNoeiDveaJkzPngrnooYDvvIzmlYzmlrnmnIkyMOeCueihgOeahGRlbW9cbiAqL1xuY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgbG9nczp7XG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsXG4gICAgICAgICAgICB0eXBlOmNjLkxhYmVsLFxuICAgICAgICB9LFxuXG4gICAgICAgIG1lbnVWaWV3OiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuQnV0dG9uLFxuICAgICAgICB9LFxuICAgICAgICBjb2luVmFsdWVWaWV3OiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXG4gICAgICAgIH0sXG4gICAgICAgIGNhcmRQcmVmYWI6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5QcmVmYWJcbiAgICAgICAgfSxcbiAgICAgICAgY2FyZEFycmF5czoge1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkxheW91dCxcbiAgICAgICAgfSxcbiAgICAgICAgc2VuZEJ0bjoge1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkJ1dHRvbixcbiAgICAgICAgfSxcbiAgICAgICAgcm91bmRPdmVyQnRuOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuQnV0dG9uLFxuICAgICAgICB9LFxuICAgICAgICByb3VuZFR5cGU6IFN0YXR1c1R5cGUuUk9VTkRCRUdJTixcbiAgICAgICAgaGVybzoge1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgICAgfSxcbiAgICAgICAgZW5lbXk6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXG4gICAgICAgIH0sXG4gICAgICAgIGVuZW15Q2FyZExhYmVsOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXG4gICAgICAgIH0sXG5cbiAgICAgICAgY3VycmVudENhcmQ6IG51bGwsLy/njqnlrrblvZPliY3pgInkuK3nmoTljaHniYdcbiAgICAgICAgZW5lbXlDYXJkQXJyYXlzOltdLC8v5pWM5Lq65Y2h54mMXG4gICAgICAgIHJvdW5kU2lkZToxLC8v5Zue5ZCI6L2u5qyhXG4gICAgICAgIHJvdW5kQ291bnQ6MCxcblxuXG4gICAgfSxcblxuICAgIG9uTG9hZDogZnVuY3Rpb24gKCkge1xuICAgICAgICBzZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy5wbGF5TG9nPVwi5ri45oiP5byA5aeLXCI7XG4gICAgICAgIHRoaXMucm91bmRPdmVyQnRuLm5vZGUub24oXCJjbGlja1wiLCB0aGlzLnJvdW5kT3ZlciwgdGhpcyk7XG4gICAgICAgIHRoaXMuc2VuZEJ0bi5ub2RlLm9uKFwiY2xpY2tcIiwgdGhpcy5zZW5kQ2FyZCwgdGhpcyk7XG4gICAgICAgIHRoaXMuZ2FtZUVuY291bnRlcigpO1xuICAgICAgICAvLyDov5nph4znmoQgdGhpcyDmjIflkJEgY29tcG9uZW50XG4gICAgfSxcbiAgICBkcmF3QUlDYXJkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxldCBjYXJkQmVhbj1uZXcgQ2FyZEJlYW4oKTtcbiAgICAgICAgc2VsZi5lbmVteVJvbGUub25EcmF3Q2FyZChjYXJkQmVhbik7XG4gICAgICAgIHNlbGYuZW5lbXlDYXJkQXJyYXlzLnB1c2goY2FyZEJlYW4pO1xuXG4gICAgfSxcbiAgICAvL+eOqeWutuaKveeJjFxuICAgIGRyYXdDYXJkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxldCBuZXdDYXJkID0gY2MuaW5zdGFudGlhdGUoc2VsZi5jYXJkUHJlZmFiKTtcbiAgICAgICAgLy8gbmV3U3Rhci5zZXRQaWNOdW0oXCJpXCIraSk7XG5cbiAgICAgICAgbGV0IGNhcmQgPSBuZXdDYXJkLmdldENvbXBvbmVudCgnQ2FyZCcpO1xuICAgICAgICBsZXQgY2FyZEJlYW49bmV3IENhcmRCZWFuKCk7XG4gICAgICAgIHNlbGYuaGVyb1JvbGUub25EcmF3Q2FyZChjYXJkQmVhbik7XG4gICAgICAgIGNhcmQuYmluZENhcmRCZWFuKGNhcmRCZWFuKTtcbiAgICAgICAgY2FyZC5iaW5kQ2FyZEZ1bmN0aW9uKHRoaXMub25DaGVjayk7XG4gICAgICAgIHNlbGYuY2FyZEFycmF5cy5ub2RlLmFkZENoaWxkKG5ld0NhcmQpO1xuICAgIH0sXG4gICAgb25DaGVjazogZnVuY3Rpb24gKGNhcmQsIGlzQ2hlY2spIHtcbiAgICAgICAgaWYgKGlzQ2hlY2spIHsvL+mAieS4rVxuICAgICAgICAgICAgaWYgKHNlbGYuY3VycmVudENhcmQgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHNlbGYuY3VycmVudENhcmQub25DYW5jZWwoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlbGYuY3VycmVudENhcmQgPSBjYXJkO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2VsZi5jdXJyZW50Q2FyZCA9IG51bGw7XG4gICAgICAgIH1cblxuICAgIH0sXG4gICAgLyoqXG4gICAgICog5Yik5pat54mM5piv5ZCm6IO95Ye6XG4gICAgICog5Yik5pat55+l5ZCm5piv5oyH5ZCR5oCn54mMXG4gICAgICpcbiAgICAgKi9cbiAgICBzZW5kQ2FyZDogZnVuY3Rpb24gKCkge1xuICAgICAgICBpZihzZWxmLnJvdW5kU2lkZSE9PTEpey8v5pWM5pa55Zue5ZCIIOiDnOWIqSDkuI3og73lh7rniYxcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2VsZi5jdXJyZW50Q2FyZCAhPSBudWxsKSB7XG4gICAgICAgICAgICBsZXQgY2FyZCA9IHNlbGYuY3VycmVudENhcmQubm9kZS5nZXRDb21wb25lbnQoXCJDYXJkXCIpO1xuICAgICAgICAgICAgbGV0IGNhcmRCZWFuPWNhcmQuZ2V0Q2FyZEJlYW4oKTtcbiAgICAgICAgICAgIHNlbGYuc2VuZEZvY3VzU2hvdyhjYXJkQmVhbik7XG4gICAgICAgICAgICBsZXQgdmFsdWUgPSBjYXJkQmVhbi5zZW5kRWZmZWN0KCk7Ly/pgKDmiJDnmoTkvKTlrrPlgLxcbiAgICAgICAgICAgIHNlbGYuYXBwZW5kTG9nKFwi5a+55pa55Y+X5Yiw5Lyk5a6zXCIrdmFsdWUpO1xuICAgICAgICAgICAgLy/mlLvlh7vml7bnmoTkvKTlrrPlgLzliqDlvLpcbiAgICAgICAgICAgIHZhbHVlID0gc2VsZi5oZXJvUm9sZS5hdHRhY2sodmFsdWUpO1xuICAgICAgICAgICAgLy/nirbmgIHosIPmlbTmiJbpmYTliqBcbiAgICAgICAgICAgIGxldCBsaXZlPXNlbGYuZW5lbXlSb2xlLnVuZGVyYXR0YWNrKHZhbHVlKTtcbiAgICAgICAgICAgIHNlbGYuY3VycmVudENhcmQubm9kZS5kZXN0cm95KCk7XG4gICAgICAgICAgICBzZWxmLmN1cnJlbnRDYXJkID0gbnVsbDtcbiAgICAgICAgICAgIGlmKCFsaXZlKXtcbiAgICAgICAgICAgICAgICBzZWxmLnJvdW5kU2lkZT0tMTtcbiAgICAgICAgICAgICAgICBzZWxmLmFwcGVuZExvZyhcIuaVjOS6uuatu+S6oSDmuLjmiI/og5zliKlcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH0sXG5cbiAgICBzZW5kRm9jdXNTaG93OmZ1bmN0aW9uIChjYXJkQmVhbikge1xuICAgICAgICBzZWxmLmFwcGVuZExvZyhcIuWHuueJjFwiK2NhcmRCZWFuLnRpdGxlKTtcbiAgICB9LFxuICAgIHJvdW5kT3ZlcjogZnVuY3Rpb24gKCkge1xuICAgICAgICBpZihzZWxmLnJvdW5kU2lkZSE9PTEpey8v5pWM5pa55Zue5ZCIIOiDnOWIqSDkuI3og73lh7rniYxcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBzZWxmLmFwcGVuZExvZyhcIuWbnuWQiOe7k+adn1wiKTtcbiAgICAgICAgdGhpcy5yb3VuZFByb2dyYW0oMCk7XG4gICAgfSxcbiAgICBnYW1lRW5jb3VudGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxldCBoZXJvID0gbmV3IFJvbGVCZWFuKDEpO1xuICAgICAgICBsZXQgZW5lbXkgPSBuZXcgUm9sZUJlYW4oMCk7XG4gICAgICAgIHRoaXMuZW5lbXlSb2xlID0gdGhpcy5lbmVteS5nZXRDb21wb25lbnQoJ1JvbGUnKTtcbiAgICAgICAgdGhpcy5lbmVteVJvbGUuYmluZFJvbGVCZWFuKGVuZW15KTtcblxuICAgICAgICB0aGlzLmhlcm9Sb2xlID0gdGhpcy5oZXJvLmdldENvbXBvbmVudCgnUm9sZScpO1xuICAgICAgICB0aGlzLmhlcm9Sb2xlLmJpbmRSb2xlQmVhbihoZXJvKTtcblxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB0aGlzLnJvdW5kUHJvZ3JhbSgxKSwgMSk7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiDmr4/lm57lkIjnmoTmiafooYzpobrluo9cbiAgICAgKi9cbiAgICByb3VuZFByb2dyYW06IGZ1bmN0aW9uIChyb2xldHR5cGUpIHtcbiAgICAgICAgbGV0IG51bWJlcj0wO1xuICAgICAgICB0aGlzLnJvdW5kU2lkZT1yb2xldHR5cGU7XG4gICAgICAgIGlmIChyb2xldHR5cGUgPT09IDEpIHtcbiAgICAgICAgICAgIHNlbGYuYXBwZW5kTG9nKFwi5L2g55qE5Zue5ZCIXCIpXG4gICAgICAgICAgICB0aGlzLnJvdW5kQ291bnQrKztcbiAgICAgICAgICAgICB0aGlzLmhlcm9Sb2xlLnJvdW5kQmVnaW4oKTtcbiAgICAgICAgICAgICBudW1iZXI9c2VsZi5jYXJkQXJyYXlzLm5vZGUuY2hpbGRyZW5Db3VudDtcbiAgICAgICAgICAgIC8v5oq95Y2h55u05Yiw5omL54mM5oq95ruhXG4gICAgICAgICAgICBzZWxmLmFwcGVuZExvZyhcIuS9oOaKveeJjFwiKVxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b3RhbENhcmROdW0tbnVtYmVyOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXdDYXJkKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL+etieW+heWHuueJjFxuICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICBzZWxmLmFwcGVuZExvZyhcIuWvueaWueWbnuWQiFwiKVxuICAgICAgICAgICAgdGhpcy5lbmVteVJvbGUucm91bmRCZWdpbigpO1xuICAgICAgICAgICAgbnVtYmVyPXNlbGYuZW5lbXlDYXJkQXJyYXlzLmxlbmd0aDtcbiAgICAgICAgICAgIHNlbGYuYXBwZW5kTG9nKFwi5a+55pa55oq954mMXCIpXG4gICAgICAgICAgICAvL+iwg+eUqGFp5oq954mMXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRvdGFsQ2FyZE51bS1udW1iZXI7IGkrKykge1xuICAgICAgICAgICAgICAgIHRoaXMuZHJhd0FJQ2FyZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5lbmVteUNhcmRMYWJlbC5zdHJpbmc9c2VsZi5lbmVteUNhcmRBcnJheXMubGVuZ3RoK1wi5bygXCI7XG4gICAgICAgICAgICB0aGlzLmxvZ2ljQUkoKTtcblxuICAgICAgICB9XG5cblxuICAgIH0sXG4gICAgLy9BSeWHuueJjOmAu+i+kVxuICAgIGxvZ2ljQUkoKXtcbiAgICAgICAgZm9yKGxldCBpPTA7aTxzZWxmLmVuZW15Q2FyZEFycmF5cy5sZW5ndGg7KXtcbiAgICAgICAgICAgIGxldCBjYXJkQmVhbj1zZWxmLmVuZW15Q2FyZEFycmF5c1tpXTtcbiAgICAgICAgICAgIGxldCBjYW5TZW5kPXRydWU7XG4gICAgICAgICAgICBpZihjYW5TZW5kKXtcbiAgICAgICAgICAgICAgICBzZWxmLmVuZW15Q2FyZEFycmF5cy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgbGV0IHZhbHVlPWNhcmRCZWFuLnNlbmRFZmZlY3QoKTtcbiAgICAgICAgICAgICAgICB2YWx1ZT1zZWxmLmVuZW15Um9sZS5hdHRhY2sodmFsdWUpO1xuICAgICAgICAgICAgICAgIHNlbGYuYXBwZW5kTG9nKFwi5L2g5Y+X5Yiw5Lyk5a6zXCIrdmFsdWUpO1xuICAgICAgICAgICAgICAgIHNlbGYuc2VuZEZvY3VzU2hvdyhjYXJkQmVhbik7XG4gICAgICAgICAgICAgICAgbGV0IGxpdmU9c2VsZi5oZXJvUm9sZS51bmRlcmF0dGFjayh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgaWYoIWxpdmUpe1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmFwcGVuZExvZyhcIuiLsembhOatu+S6oSDmuLjmiI/nu5PmnZ9cIik7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYucm91bmRTaWRlPS0xO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuZW5lbXlDYXJkTGFiZWwuc3RyaW5nPXNlbGYuZW5lbXlDYXJkQXJyYXlzLmxlbmd0aCtcIuW8oFwiO1xuICAgICAgICAgICAgICAgIHNlbGYuc2NoZWR1bGVPbmNlKCgpID0+IHNlbGYubG9naWNBSSgpLCAxKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICAgICAgc2VsZi5lbmVteVJvbGUucm91bmRPdmVyKCk7XG4gICAgICAgIHNlbGYucm91bmRQcm9ncmFtKDEpO1xuICAgIH0sXG5cbi8vICAgICBtb3ZlOmZ1bmN0aW9uKG5vZGUsZGlzdGFuY2Upe1xuLy8gICAgICAgICAvLyDliJvlu7rkuIDkuKrnp7vliqjliqjkvZxcbi8vICAgICAgICAgbGV0IHNlcSA9IGNjLnJlcGVhdChcbi8vICAgICAgICAgICAgIGNjLnNlcXVlbmNlKFxuLy8gICAgICAgICAgICAgICAgIGNjLm1vdmVCeSgyLCAgLWRpc3RhbmNlLCA1MCksXG4vLyAgICAgICAgICAgICAgICAgY2MubW92ZUJ5KDIsZGlzdGFuY2UsIC01MClcbi8vICAgICAgICAgICAgICksIDIpO1xuLy9cbi8vXG4vLyAvLyDmiafooYzliqjkvZxcbi8vICAgICAgICAgbm9kZS5ydW5BY3Rpb24oc2VxKTtcbi8vIC8vIOWBnOatouS4gOS4quWKqOS9nFxuLy8gLy8gICAgICAgICBub2RlLnN0b3BBY3Rpb24oYWN0aW9uKTtcbi8vICAgICB9LFxuICAgIC8qKlxuICAgICAqIOWIh+aNouiHs+WcsOWbvlxuICAgICAqL1xuICAgIG91dGVyQ2xpY2s6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKCdvdXRlcm1hcCcpO1xuXG4gICAgfSxcbiAgICBhcHBlbmRMb2c6IGZ1bmN0aW9uIChzdHJpbmcpIHtcbiAgICAgICAgc2VsZi5wbGF5TG9nID0gc2VsZi5wbGF5TG9nICsgXCJcXG5cIiArIHN0cmluZztcbiAgICAgICAgc2VsZi5sb2dzLnN0cmluZyA9IHNlbGYucGxheUxvZztcblxuICAgIH1cblxufSk7XG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/MainBtn.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '0c630je/l5AuqZ97H6m2qcS', 'MainBtn');
// scripts/MainBtn.js

"use strict";

cc.Class({
  "extends": cc.Button,
  properties: {
    picNum: "181",
    isCheck: false,
    sprite: {
      "default": null,
      type: cc.SpriteFrame
    }
  },
  start: function start() {// var node = new cc.Node('Sprite');
    // var sp = node.addComponent(cc.Sprite);
    // sp.spriteFrame = cardPic;
    // node.parent = this.node;
  },
  // update: function (dt) {
  // },
  onLoad: function onLoad() {// add key down and key up event
    // let picNum=this.game.getPicNum();
    // cc.systemEvent.on();
    // this.node.on("mousedown", this.onMouseDown,this);
    //
    // let self=this;
    // cc.resources.load("pokers", cc.SpriteAtlas, function (err, atlas) {
    //
    //     var frame = atlas.getSpriteFrame(self.picNum);
    //
    //     // console.log('onion==='+self.getComponent(cc.Sprite));
    //     self.getComponent(cc.Sprite).spriteFrame =frame
    //     // this.spriteFrame= frame;
    // });
  },
  onDestroy: function onDestroy() {
    // cc.systemEvent.off("mousedown", this.onMouseDown);
    this.node.off('mousedown', this.onMouseDown, this);
  },
  onMouseDown: function onMouseDown(event) {
    console.log('Press a key');
    event.stopPropagation();

    if (this.isCheck) {
      this.isCheck = false;
      this.node.y = this.node.y - 50;
    } else {
      this.isCheck = true;
      this.node.y = this.node.y + 50;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL01haW5CdG4uanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkJ1dHRvbiIsInByb3BlcnRpZXMiLCJwaWNOdW0iLCJpc0NoZWNrIiwic3ByaXRlIiwidHlwZSIsIlNwcml0ZUZyYW1lIiwic3RhcnQiLCJvbkxvYWQiLCJvbkRlc3Ryb3kiLCJub2RlIiwib2ZmIiwib25Nb3VzZURvd24iLCJldmVudCIsImNvbnNvbGUiLCJsb2ciLCJzdG9wUHJvcGFnYXRpb24iLCJ5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsTUFEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsTUFBTSxFQUFDLEtBREM7QUFFUkMsSUFBQUEsT0FBTyxFQUFDLEtBRkE7QUFHUkMsSUFBQUEsTUFBTSxFQUFFO0FBQ0osaUJBQVMsSUFETDtBQUVKQyxNQUFBQSxJQUFJLEVBQUVQLEVBQUUsQ0FBQ1E7QUFGTDtBQUhBLEdBSFA7QUFXTEMsRUFBQUEsS0FBSyxFQUFFLGlCQUFZLENBRWY7QUFDQTtBQUVBO0FBQ0E7QUFHSCxHQXBCSTtBQXVCTDtBQUNBO0FBRUFDLEVBQUFBLE1BQU0sRUFBRSxrQkFBWSxDQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0gsR0F6Q0k7QUEyQ0xDLEVBQUFBLFNBM0NLLHVCQTJDUTtBQUNUO0FBRUEsU0FBS0MsSUFBTCxDQUFVQyxHQUFWLENBQWMsV0FBZCxFQUEyQixLQUFLQyxXQUFoQyxFQUE2QyxJQUE3QztBQUNILEdBL0NJO0FBaURMQSxFQUFBQSxXQUFXLEVBQUUscUJBQVVDLEtBQVYsRUFBaUI7QUFDMUJDLElBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGFBQVo7QUFDQUYsSUFBQUEsS0FBSyxDQUFDRyxlQUFOOztBQUNBLFFBQUcsS0FBS2IsT0FBUixFQUFnQjtBQUNaLFdBQUtBLE9BQUwsR0FBYSxLQUFiO0FBQ0EsV0FBS08sSUFBTCxDQUFVTyxDQUFWLEdBQVksS0FBS1AsSUFBTCxDQUFVTyxDQUFWLEdBQVksRUFBeEI7QUFDSCxLQUhELE1BR0s7QUFDRCxXQUFLZCxPQUFMLEdBQWEsSUFBYjtBQUNBLFdBQUtPLElBQUwsQ0FBVU8sQ0FBVixHQUFZLEtBQUtQLElBQUwsQ0FBVU8sQ0FBVixHQUFZLEVBQXhCO0FBQ0g7QUFFSjtBQTVESSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQnV0dG9uLFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBwaWNOdW06XCIxODFcIixcbiAgICAgICAgaXNDaGVjazpmYWxzZSxcbiAgICAgICAgc3ByaXRlOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlRnJhbWUsXG4gICAgICAgIH0sXG4gICAgfSxcbiAgICBzdGFydDogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIC8vIHZhciBub2RlID0gbmV3IGNjLk5vZGUoJ1Nwcml0ZScpO1xuICAgICAgICAvLyB2YXIgc3AgPSBub2RlLmFkZENvbXBvbmVudChjYy5TcHJpdGUpO1xuXG4gICAgICAgIC8vIHNwLnNwcml0ZUZyYW1lID0gY2FyZFBpYztcbiAgICAgICAgLy8gbm9kZS5wYXJlbnQgPSB0aGlzLm5vZGU7XG5cblxuICAgIH0sXG5cblxuICAgIC8vIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XG4gICAgLy8gfSxcblxuICAgIG9uTG9hZDogZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyBhZGQga2V5IGRvd24gYW5kIGtleSB1cCBldmVudFxuICAgICAgICAvLyBsZXQgcGljTnVtPXRoaXMuZ2FtZS5nZXRQaWNOdW0oKTtcbiAgICAgICAgLy8gY2Muc3lzdGVtRXZlbnQub24oKTtcbiAgICAgICAgLy8gdGhpcy5ub2RlLm9uKFwibW91c2Vkb3duXCIsIHRoaXMub25Nb3VzZURvd24sdGhpcyk7XG4gICAgICAgIC8vXG4gICAgICAgIC8vIGxldCBzZWxmPXRoaXM7XG4gICAgICAgIC8vIGNjLnJlc291cmNlcy5sb2FkKFwicG9rZXJzXCIsIGNjLlNwcml0ZUF0bGFzLCBmdW5jdGlvbiAoZXJyLCBhdGxhcykge1xuICAgICAgICAvL1xuICAgICAgICAvLyAgICAgdmFyIGZyYW1lID0gYXRsYXMuZ2V0U3ByaXRlRnJhbWUoc2VsZi5waWNOdW0pO1xuICAgICAgICAvL1xuICAgICAgICAvLyAgICAgLy8gY29uc29sZS5sb2coJ29uaW9uPT09JytzZWxmLmdldENvbXBvbmVudChjYy5TcHJpdGUpKTtcbiAgICAgICAgLy8gICAgIHNlbGYuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPWZyYW1lXG4gICAgICAgIC8vICAgICAvLyB0aGlzLnNwcml0ZUZyYW1lPSBmcmFtZTtcbiAgICAgICAgLy8gfSk7XG4gICAgfSxcblxuICAgIG9uRGVzdHJveSAoKSB7XG4gICAgICAgIC8vIGNjLnN5c3RlbUV2ZW50Lm9mZihcIm1vdXNlZG93blwiLCB0aGlzLm9uTW91c2VEb3duKTtcblxuICAgICAgICB0aGlzLm5vZGUub2ZmKCdtb3VzZWRvd24nLCB0aGlzLm9uTW91c2VEb3duLCB0aGlzKTtcbiAgICB9LFxuXG4gICAgb25Nb3VzZURvd246IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBjb25zb2xlLmxvZygnUHJlc3MgYSBrZXknKTtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGlmKHRoaXMuaXNDaGVjayl7XG4gICAgICAgICAgICB0aGlzLmlzQ2hlY2s9ZmFsc2U7XG4gICAgICAgICAgICB0aGlzLm5vZGUueT10aGlzLm5vZGUueS01MDtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB0aGlzLmlzQ2hlY2s9dHJ1ZTtcbiAgICAgICAgICAgIHRoaXMubm9kZS55PXRoaXMubm9kZS55KzUwO1xuICAgICAgICB9XG5cbiAgICB9LFxuXG5cbn0pOyJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/Other.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'cad1b5LmG9NiKt2jGuL7bHy', 'Other');
// scripts/Other.js

"use strict";

// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
cc.Class({
  "extends": cc.Component,
  properties: {
    backButton: {
      "default": null,
      type: cc.Button
    },
    playButton: {
      "default": null,
      type: cc.Button
    },
    // player 节点，用于获取主角弹跳的高度，和控制主角行动开关
    poker: {
      "default": null,
      type: cc.Node
    }
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    this.backButton.node.on('click', this.backClick, this);
    this.playButton.node.on('click', this.playClick, this);
    var str = cc.sys.localStorage.getItem('userData');
    console.log("onion" + "str" + str);
  },
  backClick: function backClick(button) {
    cc.director.loadScene("game");
  },
  playClick: function playClick() {
    var str = cc.sys.localStorage.getItem('userData'); // var action = cc.moveTo(2, 100, 100);
    // 执行动作
    //   this.poker.runAction(action);

    var spawn = cc.spawn(cc.moveBy(2, 100, 100), cc.scaleTo(0.5, 0.8, 1.4));
    this.poker.runAction(spawn);
    this.saveTest();
  },
  //测试本地存储
  saveTest: function saveTest() {
    userData = {
      name: 'Tracer',
      level: 1,
      gold: 100
    };
    cc.sys.localStorage.setItem('userData', JSON.stringify(userData));
  },
  start: function start() {} // update (dt) {},

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL090aGVyLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwiYmFja0J1dHRvbiIsInR5cGUiLCJCdXR0b24iLCJwbGF5QnV0dG9uIiwicG9rZXIiLCJOb2RlIiwib25Mb2FkIiwibm9kZSIsIm9uIiwiYmFja0NsaWNrIiwicGxheUNsaWNrIiwic3RyIiwic3lzIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsImNvbnNvbGUiLCJsb2ciLCJidXR0b24iLCJkaXJlY3RvciIsImxvYWRTY2VuZSIsInNwYXduIiwibW92ZUJ5Iiwic2NhbGVUbyIsInJ1bkFjdGlvbiIsInNhdmVUZXN0IiwidXNlckRhdGEiLCJuYW1lIiwibGV2ZWwiLCJnb2xkIiwic2V0SXRlbSIsIkpTT04iLCJzdHJpbmdpZnkiLCJzdGFydCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLFVBQVUsRUFBRTtBQUNSLGlCQUFTLElBREQ7QUFFUkMsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNNO0FBRkQsS0FESjtBQUtSQyxJQUFBQSxVQUFVLEVBQUU7QUFDUixpQkFBUyxJQUREO0FBRVJGLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDTTtBQUZELEtBTEo7QUFTUjtBQUNBRSxJQUFBQSxLQUFLLEVBQUU7QUFDSCxpQkFBUyxJQUROO0FBRUhILE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDUztBQUZOO0FBVkMsR0FIUDtBQW1CTDtBQUVBQyxFQUFBQSxNQXJCSyxvQkFxQkk7QUFDTCxTQUFLTixVQUFMLENBQWdCTyxJQUFoQixDQUFxQkMsRUFBckIsQ0FBd0IsT0FBeEIsRUFBaUMsS0FBS0MsU0FBdEMsRUFBaUQsSUFBakQ7QUFDQSxTQUFLTixVQUFMLENBQWdCSSxJQUFoQixDQUFxQkMsRUFBckIsQ0FBd0IsT0FBeEIsRUFBaUMsS0FBS0UsU0FBdEMsRUFBaUQsSUFBakQ7QUFDQSxRQUFJQyxHQUFHLEdBQUNmLEVBQUUsQ0FBQ2dCLEdBQUgsQ0FBT0MsWUFBUCxDQUFvQkMsT0FBcEIsQ0FBNEIsVUFBNUIsQ0FBUjtBQUNBQyxJQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxVQUFRLEtBQVIsR0FBY0wsR0FBMUI7QUFFSCxHQTNCSTtBQTRCTEYsRUFBQUEsU0FBUyxFQUFFLG1CQUFVUSxNQUFWLEVBQWtCO0FBQ3pCckIsSUFBQUEsRUFBRSxDQUFDc0IsUUFBSCxDQUFZQyxTQUFaLENBQXNCLE1BQXRCO0FBQ0gsR0E5Qkk7QUErQkxULEVBQUFBLFNBQVMsRUFBRSxxQkFBWTtBQUNuQixRQUFJQyxHQUFHLEdBQUNmLEVBQUUsQ0FBQ2dCLEdBQUgsQ0FBT0MsWUFBUCxDQUFvQkMsT0FBcEIsQ0FBNEIsVUFBNUIsQ0FBUixDQURtQixDQUVuQjtBQUNBO0FBQ0E7O0FBQ0EsUUFBSU0sS0FBSyxHQUFHeEIsRUFBRSxDQUFDd0IsS0FBSCxDQUFTeEIsRUFBRSxDQUFDeUIsTUFBSCxDQUFVLENBQVYsRUFBYSxHQUFiLEVBQWtCLEdBQWxCLENBQVQsRUFBaUN6QixFQUFFLENBQUMwQixPQUFILENBQVcsR0FBWCxFQUFnQixHQUFoQixFQUFxQixHQUFyQixDQUFqQyxDQUFaO0FBQ0EsU0FBS2xCLEtBQUwsQ0FBV21CLFNBQVgsQ0FBcUJILEtBQXJCO0FBQ0EsU0FBS0ksUUFBTDtBQUVILEdBeENJO0FBeUNMO0FBQ0FBLEVBQUFBLFFBQVEsRUFBQyxvQkFBVTtBQUNmQyxJQUFBQSxRQUFRLEdBQUc7QUFDUEMsTUFBQUEsSUFBSSxFQUFFLFFBREM7QUFFUEMsTUFBQUEsS0FBSyxFQUFFLENBRkE7QUFHUEMsTUFBQUEsSUFBSSxFQUFFO0FBSEMsS0FBWDtBQU1BaEMsSUFBQUEsRUFBRSxDQUFDZ0IsR0FBSCxDQUFPQyxZQUFQLENBQW9CZ0IsT0FBcEIsQ0FBNEIsVUFBNUIsRUFBd0NDLElBQUksQ0FBQ0MsU0FBTCxDQUFlTixRQUFmLENBQXhDO0FBQ0gsR0FsREk7QUFtRExPLEVBQUFBLEtBbkRLLG1CQW1ERyxDQUVQLENBckRJLENBdURMOztBQXZESyxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBjYy5DbGFzczpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2NsYXNzLmh0bWxcbi8vIExlYXJuIEF0dHJpYnV0ZTpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxuXG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBiYWNrQnV0dG9uOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuQnV0dG9uXG4gICAgICAgIH0sXG4gICAgICAgIHBsYXlCdXR0b246IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5CdXR0b25cbiAgICAgICAgfSxcbiAgICAgICAgLy8gcGxheWVyIOiKgueCue+8jOeUqOS6juiOt+WPluS4u+inkuW8uei3s+eahOmrmOW6pu+8jOWSjOaOp+WItuS4u+inkuihjOWKqOW8gOWFs1xuICAgICAgICBwb2tlcjoge1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgICAgfSxcbiAgICB9LFxuXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHRoaXMuYmFja0J1dHRvbi5ub2RlLm9uKCdjbGljaycsIHRoaXMuYmFja0NsaWNrLCB0aGlzKVxuICAgICAgICB0aGlzLnBsYXlCdXR0b24ubm9kZS5vbignY2xpY2snLCB0aGlzLnBsYXlDbGljaywgdGhpcylcbiAgICAgICAgbGV0IHN0cj1jYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3VzZXJEYXRhJyk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwib25pb25cIitcInN0clwiK3N0cik7XG4gICAgICAgIFxuICAgIH0sXG4gICAgYmFja0NsaWNrOiBmdW5jdGlvbiAoYnV0dG9uKSB7XG4gICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcImdhbWVcIik7XG4gICAgfSxcbiAgICBwbGF5Q2xpY2s6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbGV0IHN0cj1jYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3VzZXJEYXRhJyk7XG4gICAgICAgIC8vIHZhciBhY3Rpb24gPSBjYy5tb3ZlVG8oMiwgMTAwLCAxMDApO1xuICAgICAgICAvLyDmiafooYzliqjkvZxcbiAgICAgICAgLy8gICB0aGlzLnBva2VyLnJ1bkFjdGlvbihhY3Rpb24pO1xuICAgICAgICB2YXIgc3Bhd24gPSBjYy5zcGF3bihjYy5tb3ZlQnkoMiwgMTAwLCAxMDApLCBjYy5zY2FsZVRvKDAuNSwgMC44LCAxLjQpKTtcbiAgICAgICAgdGhpcy5wb2tlci5ydW5BY3Rpb24oc3Bhd24pO1xuICAgICAgICB0aGlzLnNhdmVUZXN0KCk7XG5cbiAgICB9LFxuICAgIC8v5rWL6K+V5pys5Zyw5a2Y5YKoXG4gICAgc2F2ZVRlc3Q6ZnVuY3Rpb24oKXtcbiAgICAgICAgdXNlckRhdGEgPSB7XG4gICAgICAgICAgICBuYW1lOiAnVHJhY2VyJyxcbiAgICAgICAgICAgIGxldmVsOiAxLFxuICAgICAgICAgICAgZ29sZDogMTAwXG4gICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3VzZXJEYXRhJywgSlNPTi5zdHJpbmdpZnkodXNlckRhdGEpKTtcbiAgICB9LFxuICAgIHN0YXJ0KCkge1xuXG4gICAgfSxcblxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxufSk7XG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/Pokemon.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '99a402sc1VPQrwu+sHSIjU1', 'Pokemon');
// scripts/Pokemon.js

"use strict";

//战斗中的宝宝
cc.Class({
  "extends": cc.Component,
  properties: {
    id: "181",
    level: -1,
    round: -1,
    //剩余回合数
    sprite: {
      //基础贴图
      "default": null,
      type: cc.SpriteFrame
    },
    hp: 20 //血量

  },
  attack: function attack() {//触发自身的状态栏，输出伤害值，自身附加状态，敌方附加状态
  },
  underattack: function underattack() {//被攻击，触发自身状态栏，更改自身生命值，状态值
  },
  roundBegin: function roundBegin() {}
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL1Bva2Vtb24uanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJpZCIsImxldmVsIiwicm91bmQiLCJzcHJpdGUiLCJ0eXBlIiwiU3ByaXRlRnJhbWUiLCJocCIsImF0dGFjayIsInVuZGVyYXR0YWNrIiwicm91bmRCZWdpbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQTtBQUNBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUVMLGFBQVNELEVBQUUsQ0FBQ0UsU0FGUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsRUFBRSxFQUFDLEtBREs7QUFFUkMsSUFBQUEsS0FBSyxFQUFDLENBQUMsQ0FGQztBQUdSQyxJQUFBQSxLQUFLLEVBQUMsQ0FBQyxDQUhDO0FBR0M7QUFDVEMsSUFBQUEsTUFBTSxFQUFFO0FBQUM7QUFDTCxpQkFBUyxJQURMO0FBRUpDLE1BQUFBLElBQUksRUFBRVIsRUFBRSxDQUFDUztBQUZMLEtBSkE7QUFRUkMsSUFBQUEsRUFBRSxFQUFDLEVBUkssQ0FRRjs7QUFSRSxHQUhQO0FBZUxDLEVBQUFBLE1BZkssb0JBZUcsQ0FBQztBQUVSLEdBakJJO0FBa0JMQyxFQUFBQSxXQWxCSyx5QkFrQlEsQ0FBQztBQUViLEdBcEJJO0FBc0JMQyxFQUFBQSxVQXRCSyx3QkFzQk8sQ0FFWDtBQXhCSSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcbi8v5oiY5paX5Lit55qE5a6d5a6dXG5jYy5DbGFzcyh7XG5cbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBpZDpcIjE4MVwiLFxuICAgICAgICBsZXZlbDotMSxcbiAgICAgICAgcm91bmQ6LTEsLy/liankvZnlm57lkIjmlbBcbiAgICAgICAgc3ByaXRlOiB7Ly/ln7rnoYDotLTlm75cbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGVGcmFtZSxcbiAgICAgICAgfSxcbiAgICAgICAgaHA6MjAsLy/ooYDph49cblxuICAgIH0sXG5cbiAgICBhdHRhY2soKXsvL+inpuWPkeiHqui6q+eahOeKtuaAgeagj++8jOi+k+WHuuS8pOWus+WAvO+8jOiHqui6q+mZhOWKoOeKtuaAge+8jOaVjOaWuemZhOWKoOeKtuaAgVxuXG4gICAgfSxcbiAgICB1bmRlcmF0dGFjaygpey8v6KKr5pS75Ye777yM6Kem5Y+R6Ieq6Lqr54q25oCB5qCP77yM5pu05pS56Ieq6Lqr55Sf5ZG95YC877yM54q25oCB5YC8XG5cbiAgICB9LFxuXG4gICAgcm91bmRCZWdpbigpe1xuXG4gICAgfVxuXG5cblxufSk7Il19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/MainHotel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b3130nkOe5KfJWQ6ASQsvDe', 'MainHotel');
// scripts/MainHotel.js

"use strict";

var PokerUtil = require("PokerUtil");

var AIHelper = require("AIHelper");

var self;
cc.Class({
  "extends": cc.Component,
  properties: {},
  onLoad: function onLoad() {
    self = this;
  },
  refreshCallback: function refreshCallback(button) {
    this.publishPokers();
  },
  update: function update(dt) {// 每帧更新计时器，超过限度还没有生成新的星星
    // 就会调用游戏失败逻辑
    // if (this.timer > this.starDuration) {
    //     this.gameOver();
    //     this.enabled = false;   // disable gameOver logic to avoid load scene repeatedly
    //     return;
    // }
    // this.timer += dt;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL01haW5Ib3RlbC5qcyJdLCJuYW1lcyI6WyJQb2tlclV0aWwiLCJyZXF1aXJlIiwiQUlIZWxwZXIiLCJzZWxmIiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJvbkxvYWQiLCJyZWZyZXNoQ2FsbGJhY2siLCJidXR0b24iLCJwdWJsaXNoUG9rZXJzIiwidXBkYXRlIiwiZHQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsSUFBSUEsU0FBUyxHQUFHQyxPQUFPLENBQUMsV0FBRCxDQUF2Qjs7QUFDQSxJQUFJQyxRQUFRLEdBQUdELE9BQU8sQ0FBQyxVQUFELENBQXRCOztBQUNBLElBQUlFLElBQUo7QUFDQUMsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFLEVBSFA7QUFLTEMsRUFBQUEsTUFBTSxFQUFFLGtCQUFZO0FBQ2hCTCxJQUFBQSxJQUFJLEdBQUMsSUFBTDtBQUVILEdBUkk7QUFXTE0sRUFBQUEsZUFBZSxFQUFFLHlCQUFVQyxNQUFWLEVBQWtCO0FBQy9CLFNBQUtDLGFBQUw7QUFDSCxHQWJJO0FBZUxDLEVBQUFBLE1BQU0sRUFBRSxnQkFBVUMsRUFBVixFQUFjLENBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSDtBQXhCSSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcbmxldCBQb2tlclV0aWwgPSByZXF1aXJlKFwiUG9rZXJVdGlsXCIpO1xubGV0IEFJSGVscGVyID0gcmVxdWlyZShcIkFJSGVscGVyXCIpO1xubGV0IHNlbGY7XG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge30sXG5cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2VsZj10aGlzO1xuXG4gICAgfSxcblxuXG4gICAgcmVmcmVzaENhbGxiYWNrOiBmdW5jdGlvbiAoYnV0dG9uKSB7XG4gICAgICAgIHRoaXMucHVibGlzaFBva2VycygpO1xuICAgIH0sXG5cbiAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xuICAgICAgICAvLyDmr4/luKfmm7TmlrDorqHml7blmajvvIzotoXov4fpmZDluqbov5jmsqHmnInnlJ/miJDmlrDnmoTmmJ/mmJ9cbiAgICAgICAgLy8g5bCx5Lya6LCD55So5ri45oiP5aSx6LSl6YC76L6RXG4gICAgICAgIC8vIGlmICh0aGlzLnRpbWVyID4gdGhpcy5zdGFyRHVyYXRpb24pIHtcbiAgICAgICAgLy8gICAgIHRoaXMuZ2FtZU92ZXIoKTtcbiAgICAgICAgLy8gICAgIHRoaXMuZW5hYmxlZCA9IGZhbHNlOyAgIC8vIGRpc2FibGUgZ2FtZU92ZXIgbG9naWMgdG8gYXZvaWQgbG9hZCBzY2VuZSByZXBlYXRlZGx5XG4gICAgICAgIC8vICAgICByZXR1cm47XG4gICAgICAgIC8vIH1cbiAgICAgICAgLy8gdGhpcy50aW1lciArPSBkdDtcbiAgICB9LFxuXG59KTtcbiJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/migration/use_v2.0.x_cc.Toggle_event.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'bbf567+dqBFRZRllau6BkR5', 'use_v2.0.x_cc.Toggle_event');
// migration/use_v2.0.x_cc.Toggle_event.js

"use strict";

/*
 * This script is automatically generated by Cocos Creator and is only compatible with projects prior to v2.1.0.
 * You do not need to manually add this script in any other project.
 * If you don't use cc.Toggle in your project, you can delete this script directly.
 * If your project is hosted in VCS such as git, submit this script together.
 *
 * 此脚本由 Cocos Creator 自动生成，仅用于兼容 v2.1.0 之前版本的工程，
 * 你无需在任何其它项目中手动添加此脚本。
 * 如果你的项目中没用到 Toggle，可直接删除该脚本。
 * 如果你的项目有托管于 git 等版本库，请将此脚本一并上传。
 */
if (cc.Toggle) {
  // Whether the 'toggle' and 'checkEvents' events are fired when 'toggle.check() / toggle.uncheck()' is called in the code
  // 在代码中调用 'toggle.check() / toggle.uncheck()' 时是否触发 'toggle' 与 'checkEvents' 事件
  cc.Toggle._triggerEventInScript_check = true;
}

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9taWdyYXRpb24vdXNlX3YyLjAueF9jYy5Ub2dnbGVfZXZlbnQuanMiXSwibmFtZXMiOlsiY2MiLCJUb2dnbGUiLCJfdHJpZ2dlckV2ZW50SW5TY3JpcHRfY2hlY2siXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7O0FBWUEsSUFBSUEsRUFBRSxDQUFDQyxNQUFQLEVBQWU7QUFDWDtBQUNBO0FBQ0FELEVBQUFBLEVBQUUsQ0FBQ0MsTUFBSCxDQUFVQywyQkFBVixHQUF3QyxJQUF4QztBQUNIIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogVGhpcyBzY3JpcHQgaXMgYXV0b21hdGljYWxseSBnZW5lcmF0ZWQgYnkgQ29jb3MgQ3JlYXRvciBhbmQgaXMgb25seSBjb21wYXRpYmxlIHdpdGggcHJvamVjdHMgcHJpb3IgdG8gdjIuMS4wLlxuICogWW91IGRvIG5vdCBuZWVkIHRvIG1hbnVhbGx5IGFkZCB0aGlzIHNjcmlwdCBpbiBhbnkgb3RoZXIgcHJvamVjdC5cbiAqIElmIHlvdSBkb24ndCB1c2UgY2MuVG9nZ2xlIGluIHlvdXIgcHJvamVjdCwgeW91IGNhbiBkZWxldGUgdGhpcyBzY3JpcHQgZGlyZWN0bHkuXG4gKiBJZiB5b3VyIHByb2plY3QgaXMgaG9zdGVkIGluIFZDUyBzdWNoIGFzIGdpdCwgc3VibWl0IHRoaXMgc2NyaXB0IHRvZ2V0aGVyLlxuICpcbiAqIOatpOiEmuacrOeUsSBDb2NvcyBDcmVhdG9yIOiHquWKqOeUn+aIkO+8jOS7heeUqOS6juWFvOWuuSB2Mi4xLjAg5LmL5YmN54mI5pys55qE5bel56iL77yMXG4gKiDkvaDml6DpnIDlnKjku7vkvZXlhbblroPpobnnm67kuK3miYvliqjmt7vliqDmraTohJrmnKzjgIJcbiAqIOWmguaenOS9oOeahOmhueebruS4reayoeeUqOWIsCBUb2dnbGXvvIzlj6/nm7TmjqXliKDpmaTor6XohJrmnKzjgIJcbiAqIOWmguaenOS9oOeahOmhueebruacieaJmOeuoeS6jiBnaXQg562J54mI5pys5bqT77yM6K+35bCG5q2k6ISa5pys5LiA5bm25LiK5Lyg44CCXG4gKi9cblxuaWYgKGNjLlRvZ2dsZSkge1xuICAgIC8vIFdoZXRoZXIgdGhlICd0b2dnbGUnIGFuZCAnY2hlY2tFdmVudHMnIGV2ZW50cyBhcmUgZmlyZWQgd2hlbiAndG9nZ2xlLmNoZWNrKCkgLyB0b2dnbGUudW5jaGVjaygpJyBpcyBjYWxsZWQgaW4gdGhlIGNvZGVcbiAgICAvLyDlnKjku6PnoIHkuK3osIPnlKggJ3RvZ2dsZS5jaGVjaygpIC8gdG9nZ2xlLnVuY2hlY2soKScg5pe25piv5ZCm6Kem5Y+RICd0b2dnbGUnIOS4jiAnY2hlY2tFdmVudHMnIOS6i+S7tlxuICAgIGNjLlRvZ2dsZS5fdHJpZ2dlckV2ZW50SW5TY3JpcHRfY2hlY2sgPSB0cnVlO1xufVxuIl19
//------QC-SOURCE-SPLIT------

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
//------QC-SOURCE-SPLIT------

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

var CardBean = /*#__PURE__*/function () {
  function CardBean() {
    this.id = "181";
    this.level = -1;
    this.sprite = {
      //基础贴图
      "default": null,
      type: cc.SpriteFrame
    };
    this.cost = 20; //费用

    this.type = 1; //类型

    this.desc = ""; //说明

    this.title = ""; //卡牌名称

    this.damage = 3; //伤害值
  }

  var _proto = CardBean.prototype;

  _proto.sendEffect = function sendEffect() {
    return this.damage;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL2JlYW5zL0NhcmRCZWFuLmpzIl0sIm5hbWVzIjpbIkNhcmRCZWFuIiwiaWQiLCJsZXZlbCIsInNwcml0ZSIsInR5cGUiLCJjYyIsIlNwcml0ZUZyYW1lIiwiY29zdCIsImRlc2MiLCJ0aXRsZSIsImRhbWFnZSIsInNlbmRFZmZlY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBQ3FCQTtBQUNqQixzQkFBYztBQUNWLFNBQUtDLEVBQUwsR0FBVSxLQUFWO0FBQ0EsU0FBS0MsS0FBTCxHQUFhLENBQUMsQ0FBZDtBQUNBLFNBQUtDLE1BQUwsR0FBYztBQUFDO0FBQ1gsaUJBQVMsSUFEQztBQUVWQyxNQUFBQSxJQUFJLEVBQUVDLEVBQUUsQ0FBQ0M7QUFGQyxLQUFkO0FBSUEsU0FBS0MsSUFBTCxHQUFZLEVBQVosQ0FQVSxDQU9LOztBQUNmLFNBQUtILElBQUwsR0FBWSxDQUFaLENBUlUsQ0FRSTs7QUFDZCxTQUFLSSxJQUFMLEdBQVksRUFBWixDQVRVLENBU0s7O0FBQ2YsU0FBS0MsS0FBTCxHQUFXLEVBQVgsQ0FWVSxDQVVJOztBQUNkLFNBQUtDLE1BQUwsR0FBWSxDQUFaLENBWFUsQ0FXSTtBQUNqQjs7OztTQUVEQyxhQUFBLHNCQUFZO0FBQ1IsV0FBTyxLQUFLRCxNQUFaO0FBQ0giLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FyZEJlYW4ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmlkID0gXCIxODFcIjtcbiAgICAgICAgdGhpcy5sZXZlbCA9IC0xO1xuICAgICAgICB0aGlzLnNwcml0ZSA9IHsvL+WfuuehgOi0tOWbvlxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZUZyYW1lLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmNvc3QgPSAyMDsvL+i0ueeUqFxuICAgICAgICB0aGlzLnR5cGUgPSAxOy8v57G75Z6LXG4gICAgICAgIHRoaXMuZGVzYyA9IFwiXCI7Ly/or7TmmI5cbiAgICAgICAgdGhpcy50aXRsZT1cIlwiOy8v5Y2h54mM5ZCN56ewXG4gICAgICAgIHRoaXMuZGFtYWdlPTM7Ly/kvKTlrrPlgLxcbiAgICB9XG5cbiAgICBzZW5kRWZmZWN0KCl7XG4gICAgICAgIHJldHVybiB0aGlzLmRhbWFnZTtcbiAgICB9XG59Il19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/Role.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f3b569HznVA0IJoh1Shylrp', 'Role');
// scripts/Role.js

"use strict";

var _RoleBean = _interopRequireDefault(require("./beans/RoleBean"));

var _Game = require("./Game");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * 战斗中的角色 敌我双方
 * 显示逻辑层的脚本
 */
cc.Class({
  "extends": cc.Component,
  properties: {
    roleBean: new _RoleBean["default"](),
    level: -1,
    cardlist: [],
    //总手牌
    // currentcardArrays:[],//当前手牌
    sprite: {
      //基础贴图
      "default": null,
      type: cc.Sprite
    },
    hpLabel: {
      "default": null,
      type: cc.Label
    },
    //血量
    descLabel: {
      "default": null,
      type: cc.Label
    },
    statuslist: [] //状态数组

  },
  attack: function attack(value) {
    //触发自身的状态栏，输出伤害值，自身附加状态，敌方附加状态
    return value;
  },
  underattack: function underattack(value) {
    //被攻击，触发自身状态栏，更改自身生命值，状态值
    var hp = this.roleBean.getRoleHp();
    hp = parseInt(hp);
    hp = hp - value;

    if (hp < 0) {
      hp = 0;
    }

    this.roleBean.setRoleHp(hp);
    this.hpLabel.string = this.roleBean.getRoleHp();
    return hp > 0;
  },
  //找到需要触发的状态节点，并触发
  roundBegin: function roundBegin() {
    for (var i = 0; i < this.statuslist.length; i++) {
      this.statuslist[i].operateStatus(_Game.StatusType.ROUNDBEGIN);
    }
  },
  roundOver: function roundOver() {},
  //战斗开始 类似祝福状态 直接触发并消耗
  encounter: function encounter() {},
  bindRoleBean: function bindRoleBean(role) {
    this.roleBean = role;
    this.hpLabel.string = role.getRoleHp() + "";
  },
  //返回效果
  onDrawCard: function onDrawCard(cardBean) {}
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL1JvbGUuanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJyb2xlQmVhbiIsIlJvbGVCZWFuIiwibGV2ZWwiLCJjYXJkbGlzdCIsInNwcml0ZSIsInR5cGUiLCJTcHJpdGUiLCJocExhYmVsIiwiTGFiZWwiLCJkZXNjTGFiZWwiLCJzdGF0dXNsaXN0IiwiYXR0YWNrIiwidmFsdWUiLCJ1bmRlcmF0dGFjayIsImhwIiwiZ2V0Um9sZUhwIiwicGFyc2VJbnQiLCJzZXRSb2xlSHAiLCJzdHJpbmciLCJyb3VuZEJlZ2luIiwiaSIsImxlbmd0aCIsIm9wZXJhdGVTdGF0dXMiLCJTdGF0dXNUeXBlIiwiUk9VTkRCRUdJTiIsInJvdW5kT3ZlciIsImVuY291bnRlciIsImJpbmRSb2xlQmVhbiIsInJvbGUiLCJvbkRyYXdDYXJkIiwiY2FyZEJlYW4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7QUFFQTs7OztBQUtBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUVMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsUUFBUSxFQUFDLElBQUlDLG9CQUFKLEVBREQ7QUFFUkMsSUFBQUEsS0FBSyxFQUFDLENBQUMsQ0FGQztBQUdSQyxJQUFBQSxRQUFRLEVBQUMsRUFIRDtBQUdJO0FBQ1o7QUFDQUMsSUFBQUEsTUFBTSxFQUFFO0FBQUM7QUFDTCxpQkFBUyxJQURMO0FBRUpDLE1BQUFBLElBQUksRUFBRVQsRUFBRSxDQUFDVTtBQUZMLEtBTEE7QUFTUkMsSUFBQUEsT0FBTyxFQUFDO0FBQ0osaUJBQVEsSUFESjtBQUVKRixNQUFBQSxJQUFJLEVBQUNULEVBQUUsQ0FBQ1k7QUFGSixLQVRBO0FBWU47QUFDRkMsSUFBQUEsU0FBUyxFQUFDO0FBQ04saUJBQVEsSUFERjtBQUVOSixNQUFBQSxJQUFJLEVBQUNULEVBQUUsQ0FBQ1k7QUFGRixLQWJGO0FBaUJQRSxJQUFBQSxVQUFVLEVBQUMsRUFqQkosQ0FpQk87O0FBakJQLEdBRlA7QUFzQkxDLEVBQUFBLE1BdEJLLGtCQXNCRUMsS0F0QkYsRUFzQlE7QUFBQztBQUVWLFdBQU9BLEtBQVA7QUFDSCxHQXpCSTtBQTBCTEMsRUFBQUEsV0ExQkssdUJBMEJPRCxLQTFCUCxFQTBCYTtBQUFDO0FBQ2YsUUFBSUUsRUFBRSxHQUFDLEtBQUtkLFFBQUwsQ0FBY2UsU0FBZCxFQUFQO0FBQ0FELElBQUFBLEVBQUUsR0FBQ0UsUUFBUSxDQUFDRixFQUFELENBQVg7QUFDQUEsSUFBQUEsRUFBRSxHQUFDQSxFQUFFLEdBQUNGLEtBQU47O0FBQ0EsUUFBR0UsRUFBRSxHQUFDLENBQU4sRUFBUTtBQUNKQSxNQUFBQSxFQUFFLEdBQUMsQ0FBSDtBQUNIOztBQUNELFNBQUtkLFFBQUwsQ0FBY2lCLFNBQWQsQ0FBd0JILEVBQXhCO0FBQ0EsU0FBS1AsT0FBTCxDQUFhVyxNQUFiLEdBQW9CLEtBQUtsQixRQUFMLENBQWNlLFNBQWQsRUFBcEI7QUFDQSxXQUFPRCxFQUFFLEdBQUMsQ0FBVjtBQUNILEdBcENJO0FBcUNMO0FBQ0FLLEVBQUFBLFVBdENLLHdCQXNDTztBQUNSLFNBQUksSUFBSUMsQ0FBQyxHQUFDLENBQVYsRUFBWUEsQ0FBQyxHQUFDLEtBQUtWLFVBQUwsQ0FBZ0JXLE1BQTlCLEVBQXFDRCxDQUFDLEVBQXRDLEVBQXlDO0FBQ3JDLFdBQUtWLFVBQUwsQ0FBZ0JVLENBQWhCLEVBQW1CRSxhQUFuQixDQUFpQ0MsaUJBQVdDLFVBQTVDO0FBQ0g7QUFDSixHQTFDSTtBQTJDTEMsRUFBQUEsU0EzQ0ssdUJBMkNNLENBRVYsQ0E3Q0k7QUE4Q0w7QUFDQUMsRUFBQUEsU0EvQ0ssdUJBK0NNLENBQ1YsQ0FoREk7QUFpRExDLEVBQUFBLFlBakRLLHdCQWlEUUMsSUFqRFIsRUFpRGE7QUFDZCxTQUFLNUIsUUFBTCxHQUFjNEIsSUFBZDtBQUNBLFNBQUtyQixPQUFMLENBQWFXLE1BQWIsR0FBb0JVLElBQUksQ0FBQ2IsU0FBTCxLQUFpQixFQUFyQztBQUNILEdBcERJO0FBc0RMO0FBQ0FjLEVBQUFBLFVBdkRLLHNCQXVETUMsUUF2RE4sRUF1RGUsQ0FDbkI7QUF4REksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJvbGVCZWFuIGZyb20gXCIuL2JlYW5zL1JvbGVCZWFuXCI7XG5pbXBvcnQge1N0YXR1c1R5cGV9IGZyb20gXCIuL0dhbWVcIjtcblxuLyoqXG4gKiDmiJjmlpfkuK3nmoTop5LoibIg5pWM5oiR5Y+M5pa5XG4gKiDmmL7npLrpgLvovpHlsYLnmoTohJrmnKxcbiAqL1xuXG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgcm9sZUJlYW46bmV3IFJvbGVCZWFuKCksXG4gICAgICAgIGxldmVsOi0xLFxuICAgICAgICBjYXJkbGlzdDpbXSwvL+aAu+aJi+eJjFxuICAgICAgICAvLyBjdXJyZW50Y2FyZEFycmF5czpbXSwvL+W9k+WJjeaJi+eJjFxuICAgICAgICBzcHJpdGU6IHsvL+WfuuehgOi0tOWbvlxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZSxcbiAgICAgICAgfSxcbiAgICAgICAgaHBMYWJlbDp7XG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsXG4gICAgICAgICAgICB0eXBlOmNjLkxhYmVsLFxuICAgICAgICB9LC8v6KGA6YePXG4gICAgICAgIGRlc2NMYWJlbDp7XG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsXG4gICAgICAgICAgICB0eXBlOmNjLkxhYmVsLFxuICAgICAgICB9LFxuICAgICAgICAgc3RhdHVzbGlzdDpbXSwvL+eKtuaAgeaVsOe7hFxuICAgIH0sXG5cbiAgICBhdHRhY2sodmFsdWUpey8v6Kem5Y+R6Ieq6Lqr55qE54q25oCB5qCP77yM6L6T5Ye65Lyk5a6z5YC877yM6Ieq6Lqr6ZmE5Yqg54q25oCB77yM5pWM5pa56ZmE5Yqg54q25oCBXG5cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH0sXG4gICAgdW5kZXJhdHRhY2sodmFsdWUpey8v6KKr5pS75Ye777yM6Kem5Y+R6Ieq6Lqr54q25oCB5qCP77yM5pu05pS56Ieq6Lqr55Sf5ZG95YC877yM54q25oCB5YC8XG4gICAgICAgIGxldCBocD10aGlzLnJvbGVCZWFuLmdldFJvbGVIcCgpO1xuICAgICAgICBocD1wYXJzZUludChocCk7XG4gICAgICAgIGhwPWhwLXZhbHVlO1xuICAgICAgICBpZihocDwwKXtcbiAgICAgICAgICAgIGhwPTA7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yb2xlQmVhbi5zZXRSb2xlSHAoaHApO1xuICAgICAgICB0aGlzLmhwTGFiZWwuc3RyaW5nPXRoaXMucm9sZUJlYW4uZ2V0Um9sZUhwKCk7XG4gICAgICAgIHJldHVybiBocD4wO1xuICAgIH0sXG4gICAgLy/mib7liLDpnIDopoHop6blj5HnmoTnirbmgIHoioLngrnvvIzlubbop6blj5FcbiAgICByb3VuZEJlZ2luKCl7XG4gICAgICAgIGZvcihsZXQgaT0wO2k8dGhpcy5zdGF0dXNsaXN0Lmxlbmd0aDtpKyspe1xuICAgICAgICAgICAgdGhpcy5zdGF0dXNsaXN0W2ldLm9wZXJhdGVTdGF0dXMoU3RhdHVzVHlwZS5ST1VOREJFR0lOKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgcm91bmRPdmVyKCl7XG5cbiAgICB9LFxuICAgIC8v5oiY5paX5byA5aeLIOexu+S8vOelneemj+eKtuaAgSDnm7TmjqXop6blj5HlubbmtojogJdcbiAgICBlbmNvdW50ZXIoKXtcbiAgICB9LFxuICAgIGJpbmRSb2xlQmVhbihyb2xlKXtcbiAgICAgICAgdGhpcy5yb2xlQmVhbj1yb2xlO1xuICAgICAgICB0aGlzLmhwTGFiZWwuc3RyaW5nPXJvbGUuZ2V0Um9sZUhwKCkrXCJcIjtcbiAgICB9LFxuXG4gICAgLy/ov5Tlm57mlYjmnpxcbiAgICBvbkRyYXdDYXJkKGNhcmRCZWFuKXtcbiAgICB9LFxuXG5cblxuXG5cblxuXG59KTsiXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/beans/RoleBean.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '382ceJTZe5Li67JBz4qFCYs', 'RoleBean');
// scripts/beans/RoleBean.js

"use strict";

exports.__esModule = true;
exports["default"] = void 0;

/**
 * 数据层的角色
 */
var RoleBean = /*#__PURE__*/function () {
  function RoleBean(roleType) {
    this.id = "181";
    this.level = -1;
    this.cardlist = []; //总牌库

    this.currentcards = []; //当前手牌

    this.roleType = roleType; //0 电脑 1玩家

    this.rolePic = ""; //贴图

    this.roleHp = 20;
    this.statuslist = []; //状态数组

    this.desc = "描述";
  }

  var _proto = RoleBean.prototype;

  _proto.setRoleHp = function setRoleHp(hp) {
    this.roleHp = hp;
  };

  _proto.getRoleHp = function getRoleHp() {
    return this.roleHp;
  };

  return RoleBean;
}();

exports["default"] = RoleBean;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL2JlYW5zL1JvbGVCZWFuLmpzIl0sIm5hbWVzIjpbIlJvbGVCZWFuIiwicm9sZVR5cGUiLCJpZCIsImxldmVsIiwiY2FyZGxpc3QiLCJjdXJyZW50Y2FyZHMiLCJyb2xlUGljIiwicm9sZUhwIiwic3RhdHVzbGlzdCIsImRlc2MiLCJzZXRSb2xlSHAiLCJocCIsImdldFJvbGVIcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7O0lBR3FCQTtBQUNqQixvQkFBWUMsUUFBWixFQUFzQjtBQUNsQixTQUFLQyxFQUFMLEdBQVUsS0FBVjtBQUNBLFNBQUtDLEtBQUwsR0FBYSxDQUFDLENBQWQ7QUFDQSxTQUFLQyxRQUFMLEdBQWdCLEVBQWhCLENBSGtCLENBR0M7O0FBQ25CLFNBQUtDLFlBQUwsR0FBb0IsRUFBcEIsQ0FKa0IsQ0FJSzs7QUFDdkIsU0FBS0osUUFBTCxHQUFnQkEsUUFBaEIsQ0FMa0IsQ0FLTzs7QUFDekIsU0FBS0ssT0FBTCxHQUFlLEVBQWYsQ0FOa0IsQ0FNQTs7QUFDbEIsU0FBS0MsTUFBTCxHQUFjLEVBQWQ7QUFDQSxTQUFLQyxVQUFMLEdBQWtCLEVBQWxCLENBUmtCLENBUUc7O0FBQ3JCLFNBQUtDLElBQUwsR0FBWSxJQUFaO0FBRUg7Ozs7U0FHREMsWUFBQSxtQkFBVUMsRUFBVixFQUFhO0FBQ1QsU0FBS0osTUFBTCxHQUFZSSxFQUFaO0FBQ0g7O1NBQ0RDLFlBQUEscUJBQVc7QUFDUCxXQUFPLEtBQUtMLE1BQVo7QUFDSCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiDmlbDmja7lsYLnmoTop5LoibJcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm9sZUJlYW4ge1xuICAgIGNvbnN0cnVjdG9yKHJvbGVUeXBlKSB7XG4gICAgICAgIHRoaXMuaWQgPSBcIjE4MVwiO1xuICAgICAgICB0aGlzLmxldmVsID0gLTE7XG4gICAgICAgIHRoaXMuY2FyZGxpc3QgPSBbXTsvL+aAu+eJjOW6k1xuICAgICAgICB0aGlzLmN1cnJlbnRjYXJkcyA9IFtdOy8v5b2T5YmN5omL54mMXG4gICAgICAgIHRoaXMucm9sZVR5cGUgPSByb2xlVHlwZTsvLzAg55S16ISRIDHnjqnlrrZcbiAgICAgICAgdGhpcy5yb2xlUGljID0gXCJcIjsvL+i0tOWbvlxuICAgICAgICB0aGlzLnJvbGVIcCA9IDIwO1xuICAgICAgICB0aGlzLnN0YXR1c2xpc3QgPSBbXTsvL+eKtuaAgeaVsOe7hFxuICAgICAgICB0aGlzLmRlc2MgPSBcIuaPj+i/sFwiO1xuXG4gICAgfVxuXG5cbiAgICBzZXRSb2xlSHAoaHApe1xuICAgICAgICB0aGlzLnJvbGVIcD1ocDtcbiAgICB9XG4gICAgZ2V0Um9sZUhwKCl7XG4gICAgICAgIHJldHVybiB0aGlzLnJvbGVIcDtcbiAgICB9XG59Il19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/AIHelper.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '440ccQTol9AqII0wAlYk8sK', 'AIHelper');
// scripts/AIHelper.js

"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _PokerUtil = _interopRequireDefault(require("./PokerUtil"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var pokerWeight = [4, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 3, 5, 16, 17, 18]; //主5为18

var LEFT_WIN = -1;
var RIGHT_WIN = 1;

var AIHelper = /*#__PURE__*/function () {
  function AIHelper() {}

  var _proto = AIHelper.prototype;

  // {
  //     type1Array:type1Array,
  //     type2Array:type2Array,
  //     type3Array:type3Array,
  //     type4Array:type4Array,
  //     hostArray:hostArray,
  //     total:total
  // }

  /**
   * 检测用户出的牌是否合法
   * @param gameHost
   * @param roundHost
   * @param userCard
   * @param cardArray
   */
  _proto.checkUserCanSend = function checkUserCanSend(gameHost, roundHost, userPokerObj, willSendCard) {
    if (Array.isArray(willSendCard)) {
      if (willSendCard.length === 1) {
        willSendCard = willSendCard[0];
      } else {
        //暂时不支持
        console.log("onion", "暂时不支持出对====");
        return false;
      }
    }

    if (!roundHost) {
      //没有本轮主，玩家头一个出牌
      return true;
    }

    if (gameHost == roundHost) {
      var targetArray = this.selectArrayFrom(true, roundHost, userPokerObj); //调主

      if (userPokerObj.hostArray.length > 0 || targetArray.length > 0) {
        //有主牌必须出主牌
        var flag1 = userPokerObj.hostArray.indexOf(willSendCard) !== -1;
        var flag2 = targetArray.indexOf(willSendCard) !== -1;
        return flag2 || flag1;
      } //没主了随便出

    } else {
      //花色相同可以出
      var _targetArray = this.selectArrayFrom(true, roundHost, userPokerObj);

      if (_targetArray.length > 0) {
        return _targetArray.indexOf(willSendCard) !== -1;
      } //无roundHost花色可以出

    } //出副牌时，有副牌必须出副牌


    return true;
  }
  /**
   * 游戏每轮逻辑，
   * 赢家出牌，确定本轮主
   * 下家出牌 调sendAIFollowCard
   * 4家都出完结算，积分计算，结束本轮，返回积分
   * @param onRoundCallBack  回调 该相应玩家出牌
   * @param winLocal 优先出牌方 索引从0开始
   * @param gameHost 当前游戏主
   */
  ;

  _proto.roundProgramlast = function roundProgramlast(onUserPlayCallBack, onRoundCallBack, roundOverCallBack, winLocal, gameHost, sendArray) {
    var roundHost = null;
    console.log("onion", "轮次逻辑" + winLocal + "/" + sendArray);

    if (!sendArray || sendArray.length === 0) {
      sendArray = []; //本轮出的牌
    } else {
      var pokers = sendArray[0];

      if (Array.isArray(pokers) && pokers.length === 1) {
        pokers = pokers[0];
      }

      if (Array.isArray(pokers)) {
        roundHost = this.intGetType(pokers[0]);
        console.log("onion", "暂不支持出对");
        return;
      } else {
        roundHost = this.intGetType(pokers);
      }
    }

    var orgNum = sendArray.length;

    for (var i = orgNum; i <= 4 - orgNum; i++) {
      var currentPlayer = (winLocal + i) % 4;

      if (currentPlayer == 0) {
        onUserPlayCallBack(gameHost, roundHost, sendArray, currentPlayer);
        return;
      }

      var _pokers = onRoundCallBack(gameHost, roundHost, sendArray, currentPlayer);

      if (sendArray.length == 0) {
        if (Array.isArray(_pokers)) {
          roundHost = this.intGetType(_pokers[0]);
          console.log("onion", "暂不支持出对");
          return;
        } else {
          roundHost = this.intGetType(_pokers);
        }
      }

      sendArray.push(_pokers);
      console.log("onion", "轮次迭代" + winLocal + "/" + _pokers + "数组" + sendArray);
    }

    console.log("onion", "跳出循环" + winLocal);
    var bigger = null;
    var sumSocer = 0;
    var winnerPosition = 0; //判断哪方牌大

    for (var _i = 0; _i < sendArray.length; _i++) {
      var item = sendArray[_i];
      var content = this.intGetContent(item);
      sumSocer += _PokerUtil["default"].quaryIsSocer(content);

      if (bigger == null) {
        bigger = item;
        winnerPosition = _i;
        continue;
      }

      var result = _PokerUtil["default"].comparePoker(gameHost, roundHost, item, bigger);

      if (result == LEFT_WIN) {
        bigger = item;
        winnerPosition = _i;
      }
    }

    winnerPosition += winLocal;
    winnerPosition = winnerPosition % 4;

    if (winnerPosition == 0 || winnerPosition == 2) {//加分
    } else {
      sumSocer = 0;
    }

    roundOverCallBack(winnerPosition, sumSocer);
  }
  /**
   * 先手电脑逻辑
   * 普通打法：
   * 有副出最大的副牌 或者副牌对
   * 其次出最小主牌，不调主对
   * 最后一轮出主对 或主
   * 主应该在后面
   * @param gameHost 主
   * @param cardArray  当前手牌
   */
  ;

  _proto.sendAIHostCard = function sendAIHostCard(gamehost, cardArray) {
    var sendCardIndexs = [];

    for (var i = 0; i < cardArray.length; i++) {
      var type = cardArray[i].substring(2);
      var value = cardArray[i].substring(0, 2);

      var isHost = type == gamehost || _PokerUtil["default"].quaryIsHost(value);

      if (!isHost) {
        if (sendCardIndexs.length === 0) {
          sendCardIndexs.push(i);
        } else {
          if (cardArray[sendCardIndexs[0]] == cardArray[i]) {
            sendCardIndexs.push(i);
            break;
          }

          var sendCard = cardArray[sendCardIndexs[0]];
          var sendValue = sendCard.substring(0, 2);

          var result = _PokerUtil["default"].compareSinglePokerBigger(sendValue, value);

          if (result = RIGHT_WIN) {
            sendCard = value;
          }
        }
      } else {
        if (sendCardIndexs.length === 0) {
          //没有副牌了
          sendCardIndexs.push(i);
        } else {
          if (cardArray[sendCardIndexs[0]] == cardArray[i]) {
            sendCardIndexs.push(i);
            break;
          }

          var _sendCard = cardArray[sendCardIndexs[0]];

          var _sendValue = _sendCard.substring(0, 2);

          var _result = _PokerUtil["default"].compareSinglePokerBigger(_sendValue, value);

          if (_result = LEFT_WIN) {
            _sendCard = value;
          }
        }
      }
    }

    return sendCardIndexs;
  }
  /**
   * 后手电脑逻辑
   * 判断当前谁大，队友大出分，队友小出小牌。
   * 无牌出最小副牌
   *
   * @param gameHost  游戏主
   * @param roundHost 本轮主
   * @param userCard  三方所出的牌
   * @param cardArray  自己剩余的牌
   */
  ;

  _proto.sendAIFollowCard = function sendAIFollowCard(gameHost, roundHost, userCard, pokerObj) {
    switch (userCard.length) {
      case 0:
        //自己是首家 理论上不存在，应该调sendAIHostCard
        console.error("onion", "error 后手电脑调用了sendAIFollowCard 应该调用 sendAIHostCard ");
        break;

      case 1:
        //尽量出大牌
        return this.secondLogic(gameHost, roundHost, userCard, pokerObj);

      case 2:
        //
        return this.sendThridPoker(gameHost, roundHost, userCard, pokerObj);

      case 3:
        //
        return this.sendForthPoker(gameHost, roundHost, userCard, pokerObj);
    }
  };

  _proto.secondLogic = function secondLogic(gameHost, roundHost, userCard, pokerObj) {
    if (userCard[0].length > 1) {//出对的逻辑
    } else {
      return this.selectSingleBigerPoker(gameHost, roundHost, userCard, pokerObj);
    }
  }
  /**
   * 第三手电脑
   * 判断谁出的大,尝试盖过一手
   */
  ;

  _proto.sendThridPoker = function sendThridPoker(gameHost, roundHost, userCard, pokerObj) {
    var firstCard = userCard[0];
    var secondCard = userCard[1];

    var result = _PokerUtil["default"].comparePoker(gameHost, roundHost, firstCard, secondCard);

    if (result === RIGHT_WIN) {
      //对家大，尝试出分或小牌
      return this.selectSocerPoker(gameHost, roundHost, firstCard, pokerObj);
    } else {
      //出最大牌，尝试压过firstCard 最大的牌也压不过就出小牌
      //TODO 可以节约，出仅压过对方的大牌
      return this.selectSingleBigerPoker(gameHost, roundHost, firstCard, pokerObj);
    }
  }
  /**
   * 四手电脑
   */
  ;

  _proto.sendForthPoker = function sendForthPoker(gameHost, roundHost, userCard, pokerObj) {
    var firstCard = userCard[0];
    var secondCard = userCard[1];
    var thridCard = userCard[2];

    var result = _PokerUtil["default"].comparePoker(firstCard, secondCard);

    if (result === RIGHT_WIN) {
      result = _PokerUtil["default"].comparePoker(thridCard, secondCard);
    }

    if (result === RIGHT_WIN) {
      //对家大，尝试出分或小牌
      return this.selectSocerPoker(gameHost, roundHost, firstCard, pokerObj);
    } else {
      //出最大牌，尝试压过firstCard 最大的牌也压不过就出小牌
      //TODO 可以节约，出仅压过对方的大牌
      return this.selectSingleBigerPoker(gameHost, roundHost, firstCard, pokerObj);
    }
  }
  /**
   * 顶牌逻辑
   */
  ;

  _proto.selectSingleBigerPoker = function selectSingleBigerPoker(gameHost, roundHost, targetPoker, pokerObj) {
    //出单的逻辑 1识别是否是主牌
    var cardValue = targetPoker;
    var typeValue = this.intGetType(cardValue);
    var contentValue = this.intGetContent(cardValue);

    var isHost = typeValue == gameHost || _PokerUtil["default"].quaryIsHost(contentValue);

    if (isHost) {
      //顶大牌
      var array = this.selectArrayFrom(true, typeValue, pokerObj);

      if (array.length > 0) {
        var value = array[array.length - 1];

        var result = _PokerUtil["default"].comparePoker(value, cardValue); //能顶过 出大牌


        if (result === LEFT_WIN) {
          return value;
        } else {
          //顶不过 出小牌
          return array[0];
        }
      } else {
        return pokerObj.total[pokerObj.total.length - 1];
      }
    } else {
      //上家是否为A 
      var isA = contentValue == 14;
      console.log("onion", targetPoker + "type" + typeValue); //自己是否还有该花色

      var pokerArray = this.selectArrayFrom(false, typeValue, pokerObj);

      if (pokerArray.length == 0) {
        //出最小的牌杀
        return pokerObj.hostArray[0];
      } else if (isA) {
        return pokerArray[0];
      } else {
        return pokerArray[pokerArray.length - 1];
      }
    }
  }
  /**
   * 上分逻辑 小牌逻辑
   */
  ;

  _proto.selectSocerPoker = function selectSocerPoker(gameHost, roundHost, targetPoker, pokerObj) {
    var cardValue = targetPoker;
    var typeValue = this.intGetType(cardValue);
    var contentValue = this.intGetContent(cardValue);

    var isHost = typeValue == gameHost || _PokerUtil["default"].quaryIsHost(contentValue);

    if (isHost) {
      var array = this.selectArrayFrom(true, typeValue, pokerObj);

      if (array.length > 0) {
        return this.selectScoerFromArray(array);
      } //TODO 待优化 出最小的牌 当前是总牌库的第一张牌 


      return pokerObj.total[0];
    } else {
      var _array = this.selectArrayFrom(true, typeValue, pokerObj);

      if (_array.length > 0) {
        //从该花色选牌
        return this.selectScoerFromArray(_array);
      } //全局选牌


      _array = pokerObj.total;
      return this.selectScoerFromArray(_array);
    }
  };

  _proto.selectScoerFromArray = function selectScoerFromArray(array) {
    for (var i = 0; i < array.length; i++) {
      var result = _PokerUtil["default"].quaryIsSocer(this.intGetContent(array[i]));

      if (result) {
        return array[i];
      }
    }

    return array[0];
  }
  /**
   * 选出对应的牌组
   * @param {*} isHost  固定主数组
   * @param {*} type    花色类型
   * @param {*} pokerObj  牌组对象
   */
  ;

  _proto.selectArrayFrom = function selectArrayFrom(isHost, type, pokerObj) {
    if (isHost) {
      return pokerObj.hostArray;
    }

    switch (type) {
      case 1:
        return pokerObj.type1Array;

      case 2:
        return pokerObj.type2Array;

      case 3:
        return pokerObj.type3Array;

      case 4:
        return pokerObj.type4Array;
    }
  };

  _proto.removePokerFromArray = function removePokerFromArray(gameHost, pokerNum, pokerObj) {
    console.log("onion", "pokerNum" + pokerNum);
    var typeValue = this.intGetType(pokerNum);
    var contentValue = this.intGetContent(pokerNum);

    var isHost = typeValue == gameHost || _PokerUtil["default"].quaryIsHost(contentValue);

    console.log("onion", "移除" + typeValue + "/" + contentValue + "/" + isHost);
    var array = this.selectArrayFrom(isHost, typeValue, pokerObj); //分组数组删除

    var index = array.indexOf(pokerNum);
    array.splice(index, 1); //全局数组删除

    array = pokerObj.total;
    index = array.indexOf(pokerNum);
    array.splice(index, 1);
  };

  _proto.intGetType = function intGetType(cardValue) {
    return Math.floor(cardValue % 10);
  };

  _proto.strGetType = function strGetType(cardValue) {
    return cardValue.substring(2);
  };

  _proto.intGetContent = function intGetContent(cardValue) {
    return Math.floor(cardValue / 10);
  };

  _proto.strGetContent = function strGetContent(cardValue) {
    return cardValue.substring(0, 2);
  };

  _proto.isRealNum = function isRealNum(val) {
    // isNaN()函数 把空串 空格 以及NUll 按照0来处理 所以先去除，
    if (val === "" || val == null) {
      return false;
    }

    if (!isNaN(val)) {
      //对于空数组和只有一个数值成员的数组或全是数字组成的字符串，isNaN返回false，例如：'123'、[]、[2]、['123'],isNaN返回false,
      //所以如果不需要val包含这些特殊情况，则这个判断改写为if(!isNaN(val) && typeof val === 'number' )
      return true;
    } else {
      return false;
    }
  };

  return AIHelper;
}();

exports["default"] = AIHelper;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL0FJSGVscGVyLmpzIl0sIm5hbWVzIjpbInBva2VyV2VpZ2h0IiwiTEVGVF9XSU4iLCJSSUdIVF9XSU4iLCJBSUhlbHBlciIsImNoZWNrVXNlckNhblNlbmQiLCJnYW1lSG9zdCIsInJvdW5kSG9zdCIsInVzZXJQb2tlck9iaiIsIndpbGxTZW5kQ2FyZCIsIkFycmF5IiwiaXNBcnJheSIsImxlbmd0aCIsImNvbnNvbGUiLCJsb2ciLCJ0YXJnZXRBcnJheSIsInNlbGVjdEFycmF5RnJvbSIsImhvc3RBcnJheSIsImZsYWcxIiwiaW5kZXhPZiIsImZsYWcyIiwicm91bmRQcm9ncmFtbGFzdCIsIm9uVXNlclBsYXlDYWxsQmFjayIsIm9uUm91bmRDYWxsQmFjayIsInJvdW5kT3ZlckNhbGxCYWNrIiwid2luTG9jYWwiLCJzZW5kQXJyYXkiLCJwb2tlcnMiLCJpbnRHZXRUeXBlIiwib3JnTnVtIiwiaSIsImN1cnJlbnRQbGF5ZXIiLCJwdXNoIiwiYmlnZ2VyIiwic3VtU29jZXIiLCJ3aW5uZXJQb3NpdGlvbiIsIml0ZW0iLCJjb250ZW50IiwiaW50R2V0Q29udGVudCIsIlBva2VyVXRpbCIsInF1YXJ5SXNTb2NlciIsInJlc3VsdCIsImNvbXBhcmVQb2tlciIsInNlbmRBSUhvc3RDYXJkIiwiZ2FtZWhvc3QiLCJjYXJkQXJyYXkiLCJzZW5kQ2FyZEluZGV4cyIsInR5cGUiLCJzdWJzdHJpbmciLCJ2YWx1ZSIsImlzSG9zdCIsInF1YXJ5SXNIb3N0Iiwic2VuZENhcmQiLCJzZW5kVmFsdWUiLCJjb21wYXJlU2luZ2xlUG9rZXJCaWdnZXIiLCJzZW5kQUlGb2xsb3dDYXJkIiwidXNlckNhcmQiLCJwb2tlck9iaiIsImVycm9yIiwic2Vjb25kTG9naWMiLCJzZW5kVGhyaWRQb2tlciIsInNlbmRGb3J0aFBva2VyIiwic2VsZWN0U2luZ2xlQmlnZXJQb2tlciIsImZpcnN0Q2FyZCIsInNlY29uZENhcmQiLCJzZWxlY3RTb2NlclBva2VyIiwidGhyaWRDYXJkIiwidGFyZ2V0UG9rZXIiLCJjYXJkVmFsdWUiLCJ0eXBlVmFsdWUiLCJjb250ZW50VmFsdWUiLCJhcnJheSIsInRvdGFsIiwiaXNBIiwicG9rZXJBcnJheSIsInNlbGVjdFNjb2VyRnJvbUFycmF5IiwidHlwZTFBcnJheSIsInR5cGUyQXJyYXkiLCJ0eXBlM0FycmF5IiwidHlwZTRBcnJheSIsInJlbW92ZVBva2VyRnJvbUFycmF5IiwicG9rZXJOdW0iLCJpbmRleCIsInNwbGljZSIsIk1hdGgiLCJmbG9vciIsInN0ckdldFR5cGUiLCJzdHJHZXRDb250ZW50IiwiaXNSZWFsTnVtIiwidmFsIiwiaXNOYU4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFFQSxJQUFJQSxXQUFXLEdBQUcsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixFQUFoQixFQUFvQixFQUFwQixFQUF3QixFQUF4QixFQUE0QixFQUE1QixFQUFnQyxFQUFoQyxFQUFvQyxFQUFwQyxFQUF3QyxDQUF4QyxFQUEyQyxDQUEzQyxFQUE4QyxFQUE5QyxFQUFrRCxFQUFsRCxFQUFzRCxFQUF0RCxDQUFsQixFQUE0RTs7QUFDNUUsSUFBSUMsUUFBUSxHQUFHLENBQUMsQ0FBaEI7QUFDQSxJQUFJQyxTQUFTLEdBQUcsQ0FBaEI7O0lBQ3FCQzs7Ozs7QUFFakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTs7Ozs7OztTQU9BQyxtQkFBQSwwQkFBaUJDLFFBQWpCLEVBQTJCQyxTQUEzQixFQUFzQ0MsWUFBdEMsRUFBb0RDLFlBQXBELEVBQWtFO0FBQzlELFFBQUlDLEtBQUssQ0FBQ0MsT0FBTixDQUFjRixZQUFkLENBQUosRUFBaUM7QUFDN0IsVUFBSUEsWUFBWSxDQUFDRyxNQUFiLEtBQXdCLENBQTVCLEVBQStCO0FBQzNCSCxRQUFBQSxZQUFZLEdBQUdBLFlBQVksQ0FBQyxDQUFELENBQTNCO0FBQ0gsT0FGRCxN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Q0EsUUFBRyxDQUFDQyxLQUFLLENBQUNELEdBQUQsQ0FBVCxFQUFlO0FBQ2hCO0FBQ0M7QUFDQyxhQUFPLElBQVA7QUFDRCxLQUpBLE1BTUU7QUFDRCxhQUFPLEtBQVA7QUFDRDtBQUNGIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUG9rZXJVdGlsIGZyb20gXCIuL1Bva2VyVXRpbFwiO1xuXG5sZXQgcG9rZXJXZWlnaHQgPSBbNCwgNiwgNywgOCwgOSwgMTAsIDExLCAxMiwgMTMsIDE0LCAxNSwgMywgNSwgMTYsIDE3LCAxOF07Ly/kuLs15Li6MThcbmxldCBMRUZUX1dJTiA9IC0xO1xubGV0IFJJR0hUX1dJTiA9IDE7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBSUhlbHBlciB7XG5cbiAgICAvLyB7XG4gICAgLy8gICAgIHR5cGUxQXJyYXk6dHlwZTFBcnJheSxcbiAgICAvLyAgICAgdHlwZTJBcnJheTp0eXBlMkFycmF5LFxuICAgIC8vICAgICB0eXBlM0FycmF5OnR5cGUzQXJyYXksXG4gICAgLy8gICAgIHR5cGU0QXJyYXk6dHlwZTRBcnJheSxcbiAgICAvLyAgICAgaG9zdEFycmF5Omhvc3RBcnJheSxcbiAgICAvLyAgICAgdG90YWw6dG90YWxcbiAgICAvLyB9XG4gICAgLyoqXG4gICAgICog5qOA5rWL55So5oi35Ye655qE54mM5piv5ZCm5ZCI5rOVXG4gICAgICogQHBhcmFtIGdhbWVIb3N0XG4gICAgICogQHBhcmFtIHJvdW5kSG9zdFxuICAgICAqIEBwYXJhbSB1c2VyQ2FyZFxuICAgICAqIEBwYXJhbSBjYXJkQXJyYXlcbiAgICAgKi9cbiAgICBjaGVja1VzZXJDYW5TZW5kKGdhbWVIb3N0LCByb3VuZEhvc3QsIHVzZXJQb2tlck9iaiwgd2lsbFNlbmRDYXJkKSB7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHdpbGxTZW5kQ2FyZCkpIHtcbiAgICAgICAgICAgIGlmICh3aWxsU2VuZENhcmQubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgd2lsbFNlbmRDYXJkID0gd2lsbFNlbmRDYXJkWzBdO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvL+aaguaXtuS4jeaUr+aMgVxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwib25pb25cIiwgXCLmmoLml7bkuI3mlK/mjIHlh7rlr7k9PT09XCIpO1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgICAgIGlmICghcm91bmRIb3N0KSB7XG4gICAgICAgICAgICAvL+ayoeacieacrOi9ruS4u++8jOeOqeWutuWktOS4gOS4quWHuueJjFxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGdhbWVIb3N0ID09IHJvdW5kSG9zdCkge1xuICAgICAgICAgICAgbGV0IHRhcmdldEFycmF5ID0gdGhpcy5zZWxlY3RBcnJheUZyb20odHJ1ZSwgcm91bmRIb3N0LCB1c2VyUG9rZXJPYmopO1xuICAgICAgICAgICAgLy/osIPkuLtcbiAgICAgICAgICAgIGlmICh1c2VyUG9rZXJPYmouaG9zdEFycmF5Lmxlbmd0aCA+IDAgfHwgdGFyZ2V0QXJyYXkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIC8v5pyJ5Li754mM5b+F6aG75Ye65Li754mMXG4gICAgICAgICAgICAgICAgbGV0IGZsYWcxID0gdXNlclBva2VyT2JqLmhvc3RBcnJheS5pbmRleE9mKHdpbGxTZW5kQ2FyZCkgIT09IC0xO1xuICAgICAgICAgICAgICAgIGxldCBmbGFnMiA9IHRhcmdldEFycmF5LmluZGV4T2Yod2lsbFNlbmRDYXJkKSAhPT0gLTE7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZsYWcyIHx8IGZsYWcxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy/msqHkuLvkuobpmo/kvr/lh7pcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8v6Iqx6Imy55u45ZCM5Y+v5Lul5Ye6XG4gICAgICAgICAgICBsZXQgdGFyZ2V0QXJyYXkgPSB0aGlzLnNlbGVjdEFycmF5RnJvbSh0cnVlLCByb3VuZEhvc3QsIHVzZXJQb2tlck9iaik7XG4gICAgICAgICAgICBpZiAodGFyZ2V0QXJyYXkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0YXJnZXRBcnJheS5pbmRleE9mKHdpbGxTZW5kQ2FyZCkgIT09IC0xO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy/ml6Byb3VuZEhvc3ToirHoibLlj6/ku6Xlh7pcblxuICAgICAgICB9XG4gICAgICAgIC8v5Ye65Ymv54mM5pe277yM5pyJ5Ymv54mM5b+F6aG75Ye65Ymv54mMXG4gICAgICAgIHJldHVybiB0cnVlO1xuXG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmuLjmiI/mr4/ova7pgLvovpHvvIxcbiAgICAgKiDotaLlrrblh7rniYzvvIznoa7lrprmnKzova7kuLtcbiAgICAgKiDkuIvlrrblh7rniYwg6LCDc2VuZEFJRm9sbG93Q2FyZFxuICAgICAqIDTlrrbpg73lh7rlroznu5PnrpfvvIznp6/liIborqHnrpfvvIznu5PmnZ/mnKzova7vvIzov5Tlm57np6/liIZcbiAgICAgKiBAcGFyYW0gb25Sb3VuZENhbGxCYWNrICDlm57osIMg6K+l55u45bqU546p5a625Ye654mMXG4gICAgICogQHBhcmFtIHdpbkxvY2FsIOS8mOWFiOWHuueJjOaWuSDntKLlvJXku44w5byA5aeLXG4gICAgICogQHBhcmFtIGdhbWVIb3N0IOW9k+WJjea4uOaIj+S4u1xuICAgICAqL1xuICAgIHJvdW5kUHJvZ3JhbWxhc3Qob25Vc2VyUGxheUNhbGxCYWNrLCBvblJvdW5kQ2FsbEJhY2ssIHJvdW5kT3ZlckNhbGxCYWNrLCB3aW5Mb2NhbCwgZ2FtZUhvc3QsIHNlbmRBcnJheSkge1xuICAgICAgICBsZXQgcm91bmRIb3N0ID0gbnVsbDtcbiAgICAgICAgY29uc29sZS5sb2coXCJvbmlvblwiLFwi6L2u5qyh6YC76L6RXCIrd2luTG9jYWwrXCIvXCIrc2VuZEFycmF5KTtcbiAgICAgICAgaWYgKCFzZW5kQXJyYXkgfHwgc2VuZEFycmF5Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgc2VuZEFycmF5ID0gW107Ly/mnKzova7lh7rnmoTniYxcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBwb2tlcnMgPSBzZW5kQXJyYXlbMF07XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmKEFycmF5LmlzQXJyYXkocG9rZXJzKSYmcG9rZXJzLmxlbmd0aD09PTEpe1xuICAgICAgICAgICAgICAgIHBva2Vycz1wb2tlcnNbMF07XG4gICAgICAgICAgICB9XG4gICAgICAgICBcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHBva2VycykpIHtcbiAgICAgICAgICAgICAgICByb3VuZEhvc3QgPSB0aGlzLmludEdldFR5cGUocG9rZXJzWzBdKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm9uaW9uXCIsIFwi5pqC5LiN5pSv5oyB5Ye65a+5XCIpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcm91bmRIb3N0ID0gdGhpcy5pbnRHZXRUeXBlKHBva2Vycyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgIFxuICAgICAgICB9XG4gICAgICBcbiAgICAgICAgbGV0IG9yZ051bT1zZW5kQXJyYXkubGVuZ3RoO1xuICAgICAgICBmb3IgKGxldCBpID0gb3JnTnVtOyBpIDw9IDQgLSBvcmdOdW07IGkrKykge1xuICAgICAgICAgICAgbGV0IGN1cnJlbnRQbGF5ZXIgPSAod2luTG9jYWwgKyBpKSAlIDQ7XG4gICAgICAgICAgICBpZiAoY3VycmVudFBsYXllciA9PSAwKSB7XG4gICAgICAgICAgICAgICAgb25Vc2VyUGxheUNhbGxCYWNrKGdhbWVIb3N0LCByb3VuZEhvc3QsIHNlbmRBcnJheSwgY3VycmVudFBsYXllcik7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IHBva2VycyA9IG9uUm91bmRDYWxsQmFjayhnYW1lSG9zdCwgcm91bmRIb3N0LCBzZW5kQXJyYXksIGN1cnJlbnRQbGF5ZXIpO1xuICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChzZW5kQXJyYXkubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShwb2tlcnMpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJvdW5kSG9zdCA9IHRoaXMuaW50R2V0VHlwZShwb2tlcnNbMF0pO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm9uaW9uXCIsIFwi5pqC5LiN5pSv5oyB5Ye65a+5XCIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcm91bmRIb3N0ID0gdGhpcy5pbnRHZXRUeXBlKHBva2Vycyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VuZEFycmF5LnB1c2gocG9rZXJzKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwib25pb25cIixcIui9ruasoei/reS7o1wiK3dpbkxvY2FsK1wiL1wiK3Bva2VycytcIuaVsOe7hFwiK3NlbmRBcnJheSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coXCJvbmlvblwiLFwi6Lez5Ye65b6q546vXCIrd2luTG9jYWwpO1xuICAgICAgICBsZXQgYmlnZ2VyID0gbnVsbDtcbiAgICAgICAgbGV0IHN1bVNvY2VyID0gMDtcbiAgICAgICAgbGV0IHdpbm5lclBvc2l0aW9uID0gMDtcbiAgICAgICAgLy/liKTmlq3lk6rmlrnniYzlpKdcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZW5kQXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBpdGVtID0gc2VuZEFycmF5W2ldO1xuICAgICAgICAgICAgbGV0IGNvbnRlbnQgPSB0aGlzLmludEdldENvbnRlbnQoaXRlbSk7XG4gICAgICAgICAgICBzdW1Tb2NlciArPSBQb2tlclV0aWwucXVhcnlJc1NvY2VyKGNvbnRlbnQpO1xuICAgICAgICAgICAgaWYgKGJpZ2dlciA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgYmlnZ2VyID0gaXRlbTtcbiAgICAgICAgICAgICAgICB3aW5uZXJQb3NpdGlvbiA9IGk7XG4gICAgICAgICAgICAgICAgY29udGludWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCByZXN1bHQgPSBQb2tlclV0aWwuY29tcGFyZVBva2VyKGdhbWVIb3N0LCByb3VuZEhvc3QsIGl0ZW0sIGJpZ2dlcik7XG4gICAgICAgICAgICBpZiAocmVzdWx0ID09IExFRlRfV0lOKSB7XG4gICAgICAgICAgICAgICAgYmlnZ2VyID0gaXRlbTtcbiAgICAgICAgICAgICAgICB3aW5uZXJQb3NpdGlvbiA9IGk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgd2lubmVyUG9zaXRpb24gKz0gd2luTG9jYWw7XG4gICAgICAgIHdpbm5lclBvc2l0aW9uID0gd2lubmVyUG9zaXRpb24gJSA0O1xuICAgICAgICBpZiAod2lubmVyUG9zaXRpb24gPT0gMCB8fCB3aW5uZXJQb3NpdGlvbiA9PSAyKSB7XG4gICAgICAgICAgICAvL+WKoOWIhlxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3VtU29jZXIgPSAwO1xuICAgICAgICB9XG4gICAgICAgIHJvdW5kT3ZlckNhbGxCYWNrKHdpbm5lclBvc2l0aW9uLCBzdW1Tb2Nlcik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5YWI5omL55S16ISR6YC76L6RXG4gICAgICog5pmu6YCa5omT5rOV77yaXG4gICAgICog5pyJ5Ymv5Ye65pyA5aSn55qE5Ymv54mMIOaIluiAheWJr+eJjOWvuVxuICAgICAqIOWFtuasoeWHuuacgOWwj+S4u+eJjO+8jOS4jeiwg+S4u+WvuVxuICAgICAqIOacgOWQjuS4gOi9ruWHuuS4u+WvuSDmiJbkuLtcbiAgICAgKiDkuLvlupTor6XlnKjlkI7pnaJcbiAgICAgKiBAcGFyYW0gZ2FtZUhvc3Qg5Li7XG4gICAgICogQHBhcmFtIGNhcmRBcnJheSAg5b2T5YmN5omL54mMXG4gICAgICovXG4gICAgc2VuZEFJSG9zdENhcmQoZ2FtZWhvc3QsIGNhcmRBcnJheSkge1xuICAgICAgICBsZXQgc2VuZENhcmRJbmRleHMgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjYXJkQXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCB0eXBlID0gY2FyZEFycmF5W2ldLnN1YnN0cmluZygyKTtcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IGNhcmRBcnJheVtpXS5zdWJzdHJpbmcoMCwgMik7XG4gICAgICAgICAgICBsZXQgaXNIb3N0ID0gdHlwZSA9PSBnYW1laG9zdCB8fCBQb2tlclV0aWwucXVhcnlJc0hvc3QodmFsdWUpO1xuICAgICAgICAgICAgaWYgKCFpc0hvc3QpIHtcbiAgICAgICAgICAgICAgICBpZiAoc2VuZENhcmRJbmRleHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbmRDYXJkSW5kZXhzLnB1c2goaSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNhcmRBcnJheVtzZW5kQ2FyZEluZGV4c1swXV0gPT0gY2FyZEFycmF5W2ldKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZW5kQ2FyZEluZGV4cy5wdXNoKGkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgbGV0IHNlbmRDYXJkID0gY2FyZEFycmF5W3NlbmRDYXJkSW5kZXhzWzBdXTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNlbmRWYWx1ZSA9IHNlbmRDYXJkLnN1YnN0cmluZygwLCAyKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IFBva2VyVXRpbC5jb21wYXJlU2luZ2xlUG9rZXJCaWdnZXIoc2VuZFZhbHVlLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQgPSBSSUdIVF9XSU4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbmRDYXJkID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChzZW5kQ2FyZEluZGV4cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgLy/msqHmnInlia/niYzkuoZcbiAgICAgICAgICAgICAgICAgICAgc2VuZENhcmRJbmRleHMucHVzaChpKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2FyZEFycmF5W3NlbmRDYXJkSW5kZXhzWzBdXSA9PSBjYXJkQXJyYXlbaV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbmRDYXJkSW5kZXhzLnB1c2goaSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBsZXQgc2VuZENhcmQgPSBjYXJkQXJyYXlbc2VuZENhcmRJbmRleHNbMF1dO1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2VuZFZhbHVlID0gc2VuZENhcmQuc3Vic3RyaW5nKDAsIDIpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gUG9rZXJVdGlsLmNvbXBhcmVTaW5nbGVQb2tlckJpZ2dlcihzZW5kVmFsdWUsIHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCA9IExFRlRfV0lOKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZW5kQ2FyZCA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzZW5kQ2FyZEluZGV4cztcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWQjuaJi+eUteiEkemAu+i+kVxuICAgICAqIOWIpOaWreW9k+WJjeiwgeWkp++8jOmYn+WPi+Wkp+WHuuWIhu+8jOmYn+WPi+Wwj+WHuuWwj+eJjOOAglxuICAgICAqIOaXoOeJjOWHuuacgOWwj+WJr+eJjFxuICAgICAqXG4gICAgICogQHBhcmFtIGdhbWVIb3N0ICDmuLjmiI/kuLtcbiAgICAgKiBAcGFyYW0gcm91bmRIb3N0IOacrOi9ruS4u1xuICAgICAqIEBwYXJhbSB1c2VyQ2FyZCAg5LiJ5pa55omA5Ye655qE54mMXG4gICAgICogQHBhcmFtIGNhcmRBcnJheSAg6Ieq5bex5Ymp5L2Z55qE54mMXG4gICAgICovXG4gICAgc2VuZEFJRm9sbG93Q2FyZChnYW1lSG9zdCwgcm91bmRIb3N0LCB1c2VyQ2FyZCwgcG9rZXJPYmopIHtcbiAgICAgICAgc3dpdGNoICh1c2VyQ2FyZC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMDovL+iHquW3seaYr+mmluWutiDnkIborrrkuIrkuI3lrZjlnKjvvIzlupTor6XosINzZW5kQUlIb3N0Q2FyZFxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJvbmlvblwiLCBcImVycm9yIOWQjuaJi+eUteiEkeiwg+eUqOS6hnNlbmRBSUZvbGxvd0NhcmQg5bqU6K+l6LCD55SoIHNlbmRBSUhvc3RDYXJkIFwiKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAxOi8v5bC96YeP5Ye65aSn54mMXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2Vjb25kTG9naWMoZ2FtZUhvc3QsIHJvdW5kSG9zdCwgdXNlckNhcmQsIHBva2VyT2JqKTtcbiAgICAgICAgICAgIGNhc2UgMjovL1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNlbmRUaHJpZFBva2VyKGdhbWVIb3N0LCByb3VuZEhvc3QsIHVzZXJDYXJkLCBwb2tlck9iaik7XG4gICAgICAgICAgICAgICAgY2FzZSAzOi8vXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2VuZEZvcnRoUG9rZXIoZ2FtZUhvc3QsIHJvdW5kSG9zdCwgdXNlckNhcmQsIHBva2VyT2JqKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgc2Vjb25kTG9naWMoZ2FtZUhvc3QsIHJvdW5kSG9zdCwgdXNlckNhcmQsIHBva2VyT2JqKSB7XG4gICAgICAgIGlmICh1c2VyQ2FyZFswXS5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAvL+WHuuWvueeahOmAu+i+kVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0U2luZ2xlQmlnZXJQb2tlcihnYW1lSG9zdCwgcm91bmRIb3N0LCB1c2VyQ2FyZCwgcG9rZXJPYmopO1xuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDnrKzkuInmiYvnlLXohJFcbiAgICAgKiDliKTmlq3osIHlh7rnmoTlpKcs5bCd6K+V55uW6L+H5LiA5omLXG4gICAgICovXG4gICAgc2VuZFRocmlkUG9rZXIoZ2FtZUhvc3QsIHJvdW5kSG9zdCwgdXNlckNhcmQsIHBva2VyT2JqKSB7XG4gICAgICAgIGxldCBmaXJzdENhcmQgPSB1c2VyQ2FyZFswXTtcbiAgICAgICAgbGV0IHNlY29uZENhcmQgPSB1c2VyQ2FyZFsxXTtcblxuICAgICAgICBsZXQgcmVzdWx0ID0gUG9rZXJVdGlsLmNvbXBhcmVQb2tlcihnYW1lSG9zdCwgcm91bmRIb3N0LCBmaXJzdENhcmQsIHNlY29uZENhcmQpO1xuICAgICAgICBpZiAocmVzdWx0ID09PSBSSUdIVF9XSU4pIHtcbiAgICAgICAgICAgIC8v5a+55a625aSn77yM5bCd6K+V5Ye65YiG5oiW5bCP54mMXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3RTb2NlclBva2VyKGdhbWVIb3N0LCByb3VuZEhvc3QsIGZpcnN0Q2FyZCwgcG9rZXJPYmopO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy/lh7rmnIDlpKfniYzvvIzlsJ3or5Xljovov4dmaXJzdENhcmQg5pyA5aSn55qE54mM5Lmf5Y6L5LiN6L+H5bCx5Ye65bCP54mMXG4gICAgICAgICAgICAvL1RPRE8g5Y+v5Lul6IqC57qm77yM5Ye65LuF5Y6L6L+H5a+55pa555qE5aSn54mMXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3RTaW5nbGVCaWdlclBva2VyKGdhbWVIb3N0LCByb3VuZEhvc3QsIGZpcnN0Q2FyZCwgcG9rZXJPYmopO1xuICAgICAgICB9XG5cblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWbm+aJi+eUteiEkVxuICAgICAqL1xuICAgIHNlbmRGb3J0aFBva2VyKGdhbWVIb3N0LCByb3VuZEhvc3QsIHVzZXJDYXJkLCBwb2tlck9iaikge1xuICAgICAgICBsZXQgZmlyc3RDYXJkID0gdXNlckNhcmRbMF07XG4gICAgICAgIGxldCBzZWNvbmRDYXJkID0gdXNlckNhcmRbMV07XG4gICAgICAgIGxldCB0aHJpZENhcmQgPSB1c2VyQ2FyZFsyXTtcbiAgICAgICAgbGV0IHJlc3VsdCA9IFBva2VyVXRpbC5jb21wYXJlUG9rZXIoZmlyc3RDYXJkLCBzZWNvbmRDYXJkKTtcbiAgICAgICAgaWYgKHJlc3VsdCA9PT0gUklHSFRfV0lOKSB7XG4gICAgICAgICAgICByZXN1bHQgPSBQb2tlclV0aWwuY29tcGFyZVBva2VyKHRocmlkQ2FyZCwgc2Vjb25kQ2FyZCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlc3VsdCA9PT0gUklHSFRfV0lOKSB7XG4gICAgICAgICAgICAgLy/lr7nlrrblpKfvvIzlsJ3or5Xlh7rliIbmiJblsI/niYxcbiAgICAgICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3RTb2NlclBva2VyKGdhbWVIb3N0LCByb3VuZEhvc3QsIGZpcnN0Q2FyZCwgcG9rZXJPYmopO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy/lh7rmnIDlpKfniYzvvIzlsJ3or5Xljovov4dmaXJzdENhcmQg5pyA5aSn55qE54mM5Lmf5Y6L5LiN6L+H5bCx5Ye65bCP54mMXG4gICAgICAgICAgICAvL1RPRE8g5Y+v5Lul6IqC57qm77yM5Ye65LuF5Y6L6L+H5a+55pa555qE5aSn54mMXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3RTaW5nbGVCaWdlclBva2VyKGdhbWVIb3N0LCByb3VuZEhvc3QsIGZpcnN0Q2FyZCwgcG9rZXJPYmopO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6aG254mM6YC76L6RXG4gICAgICovXG4gICAgc2VsZWN0U2luZ2xlQmlnZXJQb2tlcihnYW1lSG9zdCwgcm91bmRIb3N0LCB0YXJnZXRQb2tlciwgcG9rZXJPYmopIHtcbiAgICAgICAgLy/lh7rljZXnmoTpgLvovpEgMeivhuWIq+aYr+WQpuaYr+S4u+eJjFxuICAgICAgICBsZXQgY2FyZFZhbHVlID0gdGFyZ2V0UG9rZXI7XG4gICAgICAgIGxldCB0eXBlVmFsdWUgPSB0aGlzLmludEdldFR5cGUoY2FyZFZhbHVlKTtcbiAgICAgICAgbGV0IGNvbnRlbnRWYWx1ZSA9IHRoaXMuaW50R2V0Q29udGVudChjYXJkVmFsdWUpO1xuICAgICAgICBsZXQgaXNIb3N0ID0gdHlwZVZhbHVlID09IGdhbWVIb3N0IHx8IFBva2VyVXRpbC5xdWFyeUlzSG9zdChjb250ZW50VmFsdWUpO1xuICAgICAgICBpZiAoaXNIb3N0KSB7XG4gICAgICAgICAgICAvL+mhtuWkp+eJjFxuICAgICAgICAgICAgbGV0IGFycmF5ID0gdGhpcy5zZWxlY3RBcnJheUZyb20odHJ1ZSwgdHlwZVZhbHVlLCBwb2tlck9iaik7XG4gICAgICAgICAgICBpZiAoYXJyYXkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGxldCB2YWx1ZSA9IGFycmF5W2FycmF5Lmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSBQb2tlclV0aWwuY29tcGFyZVBva2VyKHZhbHVlLCBjYXJkVmFsdWUpO1xuICAgICAgICAgICAgICAgIC8v6IO96aG26L+HIOWHuuWkp+eJjFxuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQgPT09IExFRlRfV0lOKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Ugey8v6aG25LiN6L+HIOWHuuWwj+eJjFxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYXJyYXlbMF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcG9rZXJPYmoudG90YWxbcG9rZXJPYmoudG90YWwubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvL+S4iuWutuaYr+WQpuS4ukEgXG4gICAgICAgICAgICBsZXQgaXNBID0gY29udGVudFZhbHVlID09IDE0O1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJvbmlvblwiLCB0YXJnZXRQb2tlciArIFwidHlwZVwiICsgdHlwZVZhbHVlKTtcbiAgICAgICAgICAgIC8v6Ieq5bex5piv5ZCm6L+Y5pyJ6K+l6Iqx6ImyXG4gICAgICAgICAgICBsZXQgcG9rZXJBcnJheSA9IHRoaXMuc2VsZWN0QXJyYXlGcm9tKGZhbHNlLCB0eXBlVmFsdWUsIHBva2VyT2JqKTtcbiAgICAgICAgICAgIGlmIChwb2tlckFycmF5Lmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgLy/lh7rmnIDlsI/nmoTniYzmnYBcbiAgICAgICAgICAgICAgICByZXR1cm4gcG9rZXJPYmouaG9zdEFycmF5WzBdO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChpc0EpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcG9rZXJBcnJheVswXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBva2VyQXJyYXlbcG9rZXJBcnJheS5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOS4iuWIhumAu+i+kSDlsI/niYzpgLvovpFcbiAgICAgKi9cbiAgICBzZWxlY3RTb2NlclBva2VyKGdhbWVIb3N0LCByb3VuZEhvc3QsIHRhcmdldFBva2VyLCBwb2tlck9iaikge1xuICAgICAgICBsZXQgY2FyZFZhbHVlID0gdGFyZ2V0UG9rZXI7XG4gICAgICAgIGxldCB0eXBlVmFsdWUgPSB0aGlzLmludEdldFR5cGUoY2FyZFZhbHVlKTtcbiAgICAgICAgbGV0IGNvbnRlbnRWYWx1ZSA9IHRoaXMuaW50R2V0Q29udGVudChjYXJkVmFsdWUpO1xuICAgICAgICBsZXQgaXNIb3N0ID0gdHlwZVZhbHVlID09IGdhbWVIb3N0IHx8IFBva2VyVXRpbC5xdWFyeUlzSG9zdChjb250ZW50VmFsdWUpO1xuICAgICAgICBpZiAoaXNIb3N0KSB7XG4gICAgICAgICAgICBsZXQgYXJyYXkgPSB0aGlzLnNlbGVjdEFycmF5RnJvbSh0cnVlLCB0eXBlVmFsdWUsIHBva2VyT2JqKTtcbiAgICAgICAgICAgIGlmIChhcnJheS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0U2NvZXJGcm9tQXJyYXkoYXJyYXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy9UT0RPIOW+heS8mOWMliDlh7rmnIDlsI/nmoTniYwg5b2T5YmN5piv5oC754mM5bqT55qE56ys5LiA5byg54mMIFxuICAgICAgICAgICAgcmV0dXJuIHBva2VyT2JqLnRvdGFsWzBdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IGFycmF5ID0gdGhpcy5zZWxlY3RBcnJheUZyb20odHJ1ZSwgdHlwZVZhbHVlLCBwb2tlck9iaik7XG4gICAgICAgICAgICBpZiAoYXJyYXkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIC8v5LuO6K+l6Iqx6Imy6YCJ54mMXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0U2NvZXJGcm9tQXJyYXkoYXJyYXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy/lhajlsYDpgInniYxcbiAgICAgICAgICAgIGFycmF5ID0gcG9rZXJPYmoudG90YWw7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3RTY29lckZyb21BcnJheShhcnJheSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZWxlY3RTY29lckZyb21BcnJheShhcnJheSkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gUG9rZXJVdGlsLnF1YXJ5SXNTb2Nlcih0aGlzLmludEdldENvbnRlbnQoYXJyYXlbaV0pKTtcbiAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYXJyYXlbaV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFycmF5WzBdO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOmAieWHuuWvueW6lOeahOeJjOe7hFxuICAgICAqIEBwYXJhbSB7Kn0gaXNIb3N0ICDlm7rlrprkuLvmlbDnu4RcbiAgICAgKiBAcGFyYW0geyp9IHR5cGUgICAg6Iqx6Imy57G75Z6LXG4gICAgICogQHBhcmFtIHsqfSBwb2tlck9iaiAg54mM57uE5a+56LGhXG4gICAgICovXG4gICAgc2VsZWN0QXJyYXlGcm9tKGlzSG9zdCwgdHlwZSwgcG9rZXJPYmopIHtcbiAgICAgICAgaWYgKGlzSG9zdCkge1xuICAgICAgICAgICAgcmV0dXJuIHBva2VyT2JqLmhvc3RBcnJheTtcbiAgICAgICAgfVxuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICByZXR1cm4gcG9rZXJPYmoudHlwZTFBcnJheTtcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICByZXR1cm4gcG9rZXJPYmoudHlwZTJBcnJheTtcbiAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICByZXR1cm4gcG9rZXJPYmoudHlwZTNBcnJheTtcbiAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICByZXR1cm4gcG9rZXJPYmoudHlwZTRBcnJheTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgcmVtb3ZlUG9rZXJGcm9tQXJyYXkoZ2FtZUhvc3QsIHBva2VyTnVtLCBwb2tlck9iaikge1xuICAgICAgICBjb25zb2xlLmxvZyhcIm9uaW9uXCIsXCJwb2tlck51bVwiK3Bva2VyTnVtKTtcbiAgICAgICAgbGV0IHR5cGVWYWx1ZSA9IHRoaXMuaW50R2V0VHlwZShwb2tlck51bSk7XG4gICAgICAgIGxldCBjb250ZW50VmFsdWUgPSB0aGlzLmludEdldENvbnRlbnQocG9rZXJOdW0pO1xuICAgICAgICBsZXQgaXNIb3N0ID0gdHlwZVZhbHVlID09IGdhbWVIb3N0IHx8IFBva2VyVXRpbC5xdWFyeUlzSG9zdChjb250ZW50VmFsdWUpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIm9uaW9uXCIsXCLnp7vpmaRcIit0eXBlVmFsdWUrXCIvXCIrY29udGVudFZhbHVlK1wiL1wiK2lzSG9zdCk7XG4gICAgICAgIGxldCBhcnJheSA9IHRoaXMuc2VsZWN0QXJyYXlGcm9tKGlzSG9zdCwgdHlwZVZhbHVlLCBwb2tlck9iaik7XG4gICAgICAgIC8v5YiG57uE5pWw57uE5Yig6ZmkXG4gICAgICAgIGxldCBpbmRleCA9IGFycmF5LmluZGV4T2YocG9rZXJOdW0pO1xuICAgICAgICBhcnJheS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAvL+WFqOWxgOaVsOe7hOWIoOmZpFxuICAgICAgICBhcnJheSA9IHBva2VyT2JqLnRvdGFsO1xuICAgICAgICBpbmRleCA9IGFycmF5LmluZGV4T2YocG9rZXJOdW0pO1xuICAgICAgICBhcnJheS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cblxuICAgIGludEdldFR5cGUoY2FyZFZhbHVlKSB7XG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKGNhcmRWYWx1ZSAlIDEwKTtcblxuICAgIH1cblxuICAgIHN0ckdldFR5cGUoY2FyZFZhbHVlKSB7XG4gICAgICAgIHJldHVybiBjYXJkVmFsdWUuc3Vic3RyaW5nKDIpXG4gICAgfVxuXG4gICAgaW50R2V0Q29udGVudChjYXJkVmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoY2FyZFZhbHVlIC8gMTApO1xuICAgIH1cblxuICAgIHN0ckdldENvbnRlbnQoY2FyZFZhbHVlKSB7XG4gICAgICAgIHJldHVybiBjYXJkVmFsdWUuc3Vic3RyaW5nKDAsIDIpO1xuICAgIH1cbiAgICBpc1JlYWxOdW0odmFsKXtcbiAgICAgICAgLy8gaXNOYU4oKeWHveaVsCDmiornqbrkuLIg56m65qC8IOS7peWPik5VbGwg5oyJ54WnMOadpeWkhOeQhiDmiYDku6XlhYjljrvpmaTvvIxcbiAgICAgICAgXG4gICAg44CA44CAaWYodmFsID09PSBcIlwiIHx8IHZhbCA9PW51bGwpe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIOOAgOOAgH1cbiAgICAgICBpZighaXNOYU4odmFsKSl744CA44CA44CA44CAXG4gICAg44CA44CALy/lr7nkuo7nqbrmlbDnu4Tlkozlj6rmnInkuIDkuKrmlbDlgLzmiJDlkZjnmoTmlbDnu4TmiJblhajmmK/mlbDlrZfnu4TmiJDnmoTlrZfnrKbkuLLvvIxpc05hTui/lOWbnmZhbHNl77yM5L6L5aaC77yaJzEyMyfjgIFbXeOAgVsyXeOAgVsnMTIzJ10saXNOYU7ov5Tlm55mYWxzZSxcbiAgICAgICAvL+aJgOS7peWmguaenOS4jemcgOimgXZhbOWMheWQq+i/meS6m+eJueauiuaDheWGte+8jOWImei/meS4quWIpOaWreaUueWGmeS4umlmKCFpc05hTih2YWwpICYmIHR5cGVvZiB2YWwgPT09ICdudW1iZXInIClcbiAgICDjgIDjgIDjgIAgcmV0dXJuIHRydWU7IFxuICAgIOOAgOOAgH1cbiAgICBcbiAgICDjgIBlbHNleyBcbiAgICDjgIDjgIDjgIDjgIByZXR1cm4gZmFsc2U7IFxuICAgIOOAgOOAgH0gXG4gICAgfVxuXG59Il19
//------QC-SOURCE-SPLIT------

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
//------QC-SOURCE-SPLIT------

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
//------QC-SOURCE-SPLIT------
