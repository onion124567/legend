
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