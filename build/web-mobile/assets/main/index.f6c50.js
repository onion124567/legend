window.__require=function e(t,r,n){function o(s,i){if(!r[s]){if(!t[s]){var c=s.split("/");if(c=c[c.length-1],!t[c]){var l="function"==typeof __require&&__require;if(!i&&l)return l(c,!0);if(a)return a(c,!0);throw new Error("Cannot find module '"+s+"'")}s=c}var u=r[s]={exports:{}};t[s][0].call(u.exports,function(e){return o(t[s][1][e]||e)},u,u.exports,e,t,r,n)}return r[s].exports}for(var a="function"==typeof __require&&__require,s=0;s<n.length;s++)o(n[s]);return o}({AIHelper:[function(e,t,r){"use strict";cc._RF.push(t,"440ccQTol9AqII0wAlYk8sK","AIHelper"),r.__esModule=!0,r.default=void 0;var n=function(e){return e&&e.__esModule?e:{default:e}}(e("./PokerUtil"));var o=function(){function e(){}var t=e.prototype;return t.checkUserCanSend=function(e,t,r,n){if(Array.isArray(n)){if(1!==n.length)return console.log("onion","\u6682\u65f6\u4e0d\u652f\u6301\u51fa\u5bf9===="),!1;n=n[0]}if(!t)return!0;if(e==t){var o=this.selectArrayFrom(!0,t,r);if(r.hostArray.length>0||o.length>0){var a=-1!==r.hostArray.indexOf(n);return-1!==o.indexOf(n)||a}}else{var s=this.selectArrayFrom(!0,t,r);if(s.length>0)return-1!==s.indexOf(n)}return!0},t.roundProgramlast=function(e,t,r,o,a,s){var i=null;if(console.log("onion","\u8f6e\u6b21\u903b\u8f91"+o+"/"+s),s&&0!==s.length){var c=s[0];if(Array.isArray(c)&&1===c.length&&(c=c[0]),Array.isArray(c))return i=this.intGetType(c[0]),void console.log("onion","\u6682\u4e0d\u652f\u6301\u51fa\u5bf9");i=this.intGetType(c)}else s=[];for(var l=s.length,u=l;u<=4-l;u++){var d=(o+u)%4;if(0==d)return void e(a,i,s,d);var h=t(a,i,s,d);if(0==s.length){if(Array.isArray(h))return i=this.intGetType(h[0]),void console.log("onion","\u6682\u4e0d\u652f\u6301\u51fa\u5bf9");i=this.intGetType(h)}s.push(h),console.log("onion","\u8f6e\u6b21\u8fed\u4ee3"+o+"/"+h+"\u6570\u7ec4"+s)}console.log("onion","\u8df3\u51fa\u5faa\u73af"+o);for(var p=null,f=0,y=0,g=0;g<s.length;g++){var k=s[g],C=this.intGetContent(k);if(f+=n.default.quaryIsSocer(C),null!=p)-1==n.default.comparePoker(a,i,k,p)&&(p=k,y=g);else p=k,y=g}y+=o,0==(y%=4)||2==y||(f=0),r(y,f)},t.sendAIHostCard=function(e,t){for(var r=[],o=0;o<t.length;o++){var a=t[o].substring(2),s=t[o].substring(0,2);if(a==e||n.default.quaryIsHost(s))if(0===r.length)r.push(o);else{if(t[r[0]]==t[o]){r.push(o);break}var i=t[r[0]],c=i.substring(0,2);n.default.compareSinglePokerBigger(c,s);-1&&(i=s)}else if(0===r.length)r.push(o);else{if(t[r[0]]==t[o]){r.push(o);break}var l=t[r[0]],u=l.substring(0,2);n.default.compareSinglePokerBigger(u,s);1&&(l=s)}}return r},t.sendAIFollowCard=function(e,t,r,n){switch(r.length){case 0:console.error("onion","error \u540e\u624b\u7535\u8111\u8c03\u7528\u4e86sendAIFollowCard \u5e94\u8be5\u8c03\u7528 sendAIHostCard ");break;case 1:return this.secondLogic(e,t,r,n);case 2:return this.sendThridPoker(e,t,r,n);case 3:return this.sendForthPoker(e,t,r,n)}},t.secondLogic=function(e,t,r,n){if(!(r[0].length>1))return this.selectSingleBigerPoker(e,t,r,n)},t.sendThridPoker=function(e,t,r,o){var a=r[0],s=r[1];return 1===n.default.comparePoker(e,t,a,s)?this.selectSocerPoker(e,t,a,o):this.selectSingleBigerPoker(e,t,a,o)},t.sendForthPoker=function(e,t,r,o){var a=r[0],s=r[1],i=r[2],c=n.default.comparePoker(a,s);return 1===c&&(c=n.default.comparePoker(i,s)),1===c?this.selectSocerPoker(e,t,a,o):this.selectSingleBigerPoker(e,t,a,o)},t.selectSingleBigerPoker=function(e,t,r,o){var a=r,s=this.intGetType(a),i=this.intGetContent(a);if(s==e||n.default.quaryIsHost(i)){var c=this.selectArrayFrom(!0,s,o);if(c.length>0){var l=c[c.length-1];return-1===n.default.comparePoker(l,a)?l:c[0]}return o.total[o.total.length-1]}var u=14==i;console.log("onion",r+"type"+s);var d=this.selectArrayFrom(!1,s,o);return 0==d.length?o.hostArray[0]:u?d[0]:d[d.length-1]},t.selectSocerPoker=function(e,t,r,o){var a=r,s=this.intGetType(a),i=this.intGetContent(a);if(s==e||n.default.quaryIsHost(i)){var c=this.selectArrayFrom(!0,s,o);return c.length>0?this.selectScoerFromArray(c):o.total[0]}var l=this.selectArrayFrom(!0,s,o);return l.length>0?this.selectScoerFromArray(l):(l=o.total,this.selectScoerFromArray(l))},t.selectScoerFromArray=function(e){for(var t=0;t<e.length;t++){if(n.default.quaryIsSocer(this.intGetContent(e[t])))return e[t]}return e[0]},t.selectArrayFrom=function(e,t,r){if(e)return r.hostArray;switch(t){case 1:return r.type1Array;case 2:return r.type2Array;case 3:return r.type3Array;case 4:return r.type4Array}},t.removePokerFromArray=function(e,t,r){console.log("onion","pokerNum"+t);var o=this.intGetType(t),a=this.intGetContent(t),s=o==e||n.default.quaryIsHost(a);console.log("onion","\u79fb\u9664"+o+"/"+a+"/"+s);var i=this.selectArrayFrom(s,o,r),c=i.indexOf(t);i.splice(c,1),c=(i=r.total).indexOf(t),i.splice(c,1)},t.intGetType=function(e){return Math.floor(e%10)},t.strGetType=function(e){return e.substring(2)},t.intGetContent=function(e){return Math.floor(e/10)},t.strGetContent=function(e){return e.substring(0,2)},t.isRealNum=function(e){return""!==e&&null!=e&&!isNaN(e)},e}();r.default=o,t.exports=r.default,cc._RF.pop()},{"./PokerUtil":"PokerUtil"}],CardBean:[function(e,t,r){"use strict";cc._RF.push(t,"682f2CQeCtCzpKkgrhQceS/","CardBean"),r.__esModule=!0,r.default=void 0;var n=function(){function e(){this.id="181",this.level=-1,this.sprite={default:null,type:cc.SpriteFrame},this.cost=20,this.type=1,this.desc="",this.title="",this.damage=3}return e.prototype.sendEffect=function(){return this.damage},e}();r.default=n,t.exports=r.default,cc._RF.pop()},{}],Card:[function(e,t,r){"use strict";cc._RF.push(t,"a33bdDMnNJPOoeK9yA2ZiuG","Card"),r.__esModule=!0,r.CardStatus=void 0;(function(e){e&&e.__esModule})(e("./beans/CardBean"));r.CardStatus={NORMAL:1,CANUSE:2,CURRENT:3,TRY:4},cc.Class({extends:cc.Component,properties:{cardBean:null,status:null,isCheck:!1,sprite:{default:null,type:cc.SpriteFrame},costLabel:{default:null,type:cc.Label},titleLabel:{default:null,type:cc.Label},descLabel:{default:null,type:cc.Label},levelLable:{default:null,type:cc.Label}},start:function(){},bindCardFunction:function(e){this.checkFunction=e},getCardBean:function(){return this.cardBean},bindCardBean:function(e){this.cardBean=e,this.titleLabel.string=this.cardBean.title,this.costLabel.string=this.cardBean.cost,this.levelLable.string=this.cardBean.level,this.descLabel.string=this.cardBean.desc,this.titleLabel.string=this.cardBean.title},onLoad:function(){cc.sys.isMobile?this.node.on("click",this.onMouseDown,this):this.node.on(cc.Node.EventType.MOUSE_DOWN,this.onMouseDown,this),this.node.y=0},onMouseDown:function(e){console.log("onionPress a key"),e.stopPropagation(),this.isCheck?(this.isCheck=!1,this.node.y=this.node.y-50,this.checkFunction&&this.checkFunction(this,!1)):(this.isCheck=!0,this.node.y=this.node.y+50,this.checkFunction&&this.checkFunction(this,!0))},onCancel:function(){this.isCheck&&(this.isCheck=!1,this.node.y=this.node.y-50)},onDestroy:function(){cc.sys.isMobile?this.node.off("click",this.onMouseDown,this):this.node.off(cc.Node.EventType.MOUSE_DOWN,this.onMouseDown,this)}}),cc._RF.pop()},{"./beans/CardBean":"CardBean"}],Director:[function(e,t,r){"use strict";cc._RF.push(t,"92036gCkblIs7Hs6LmBBYIQ","Director"),r.__esModule=!0,r.default=void 0;var n=function(){function e(){this.status=null}var t=e.prototype;return t.run=function(){switch(this.editMode,this.status){case e.STATUS_NIGHT:e.operateCount=6;break;case e.STATUS_READY:break;case e.STATUS_BUSSINESS:e.operateCount--,0===e.operateCount&&(this.status=e.STATUS_CLOSE);break;case e.STATUS_OUTER:e.operateCount--,0===e.operateCount&&(this.status=e.STATUS_CLOSE,cc.director.loadScene("game"));case e.STATUS_CLOSE:}},t.saveData=function(){var t={operateCount:e.operateCount,day:1,coin:100,cookerList:[],popular:100};cc.sys.localStorage.setItem("userData",JSON.stringify(t))},t.loadData=function(){cc.sys.localStorage.getItem("userData")},e}();r.default=n,n.GUIDE_MODE=1,n.editMode=0,n.day=0,n.operateCount=6,n.coin=0,n.STATUS_NIGHT=1,n.STATUS_READY=2,n.STATUS_BUSSINESS=3,n.STATUS_OUTER=4,n.STATUS_CLOSE=5,t.exports=r.default,cc._RF.pop()},{}],Gamebeifen:[function(e,t,r){"use strict";cc._RF.push(t,"0612deHWLpCuJSSpnvVg6h9","Gamebeifen");var n,o=e("PokerUtil"),a=e("AIHelper");cc.Class({extends:cc.Component,properties:{starPrefab:{default:null,type:cc.Prefab},cardPrefab:{default:null,type:cc.Prefab},maxStarDuration:0,minStarDuration:0,currentCardPosition:0,startCardPostion:0,cardWidth:80,logicHelper:null,cardArray:[cc.String],pokerPlayer:[],roundPoker:[],sendArray:[],playerControlNodeArray:[],refreshButton:{default:null,type:cc.Button},sendButton:{default:null,type:cc.Button},backButton:{default:null,type:cc.Button},currentWinner:1,gameHost:"1",layoutContainer:{default:null,type:cc.Layout},layoutBottom:{default:null,type:cc.Layout},layoutTop:{default:null,type:cc.Layout},layoutLeft:{default:null,type:cc.Layout},layoutRight:{default:null,type:cc.Layout},logLabel:{default:null,type:cc.Label},playLog:"\u6e38\u620f\u5f00\u59cb",ground:{default:null,type:cc.Node},player:{default:null,type:cc.Node},scoreDisplay:{default:null,type:cc.Label},scoreAudio:{default:null,type:cc.AudioClip}},onLoad:function(){n=this,this.groundY=this.ground.y+this.ground.height/2,this.timer=0,this.starDuration=0,this.logicHelper=new a;for(var e=0;e<13;e++)for(var t=3+e,r=1;r<5;r++){var o="";t<10&&(o="0"),o=o+t+r,this.cardArray.push(o),this.cardArray.push(o)}this.cardArray.push("161"),this.cardArray.push("161"),this.cardArray.push("171"),this.cardArray.push("171"),this.refreshButton.node.on("click",this.refreshCallback,this),this.sendButton.node.on("click",this.sendCallback,this),this.backButton.node.on("click",this.backClick,this),this.publishPokers(),this.score=0,this.onRoundCallBack=this.onRoundCallBack.bind(this),this.logicHelper.roundProgram(this.onUserPlayCallBack,this.onRoundCallBack,this.roundOverCallBack,0,this.gameHost,[])},onRoundCallBack:function(e,t,r,o){n.roundHost=t,n.sendArray=r,console.log("onion","\u8f6e\u6b21\u56de\u8c03"+r);var a=n.logicHelper.sendAIFollowCard(n.gameHost,t,r,n.pokerPlayer[o]);return console.log("onion","\u8f6e\u6b21\u51fa\u724c"+a),n.saveRoundPoker(a,o+1,0),a},onUserPlayCallBack:function(e,t,r,n){console.log("onion","\u56de\u8c03\u5230user"+r)},roundOverCallBack:function(e,t){setTimeout(function(){o.destoryArray(n.roundPoker),n.score=t+n.score,n.roundHost=null,n.appendLog(e+"\u5927,\u635e\u5206"+t)},1e3)},refreshCallback:function(e){this.publishPokers()},backClick:function(e){console.log("onion","backClick"),cc.director.loadScene("other")},sendCallback:function(e){for(var t=null,r=0;r<this.playerControlNodeArray.length;r++){var n=this.playerControlNodeArray[r].getComponent("Card");n.isCheck&&(t&&!Array.isArray(t)?(t=[]).push(n.picNum):t=n.picNum)}var o=this.logicHelper.checkUserCanSend(this.gameHost,this.roundHost,this.pokerPlayer[0],t);if(o){for(var a=0;a<this.playerControlNodeArray.length;){var s=this.playerControlNodeArray[a].getComponent("Card");s.isCheck?(this.saveRoundPoker(s.picNum,1,a*this.cardWidth),this.playerControlNodeArray[a].destroy(),this.playerControlNodeArray.splice(a,1)):a++}this.sendArray||(this.sendArray=[]),this.sendArray.push(t),this.logicHelper.roundProgram(this.onUserPlayCallBack,this.onRoundCallBack,this.roundOverCallBack,0,this.gameHost,this.sendArray)}else console.log("onion","\u4e0d\u80fd\u51fa"+o)},saveRoundPoker:function(e,t,r){var n=cc.instantiate(this.cardPrefab);switch(n.getComponent("Card").picNum=e,n.scaleX=.5,n.scaleY=.5,this.roundPoker.push(n),console.log("onion","\u4fdd\u5b58\u51fa\u724c"+e+"index"+t),t){case 1:this.layoutBottom.node.addChild(n),this.logicHelper.removePokerFromArray(this.gameHost,e,this.pokerPlayer[0]);break;case 2:this.layoutLeft.node.addChild(n),this.logicHelper.removePokerFromArray(this.gameHost,e,this.pokerPlayer[1]);break;case 3:this.layoutTop.node.addChild(n),this.logicHelper.removePokerFromArray(this.gameHost,e,this.pokerPlayer[2]);break;case 4:this.layoutRight.node.addChild(n),this.logicHelper.removePokerFromArray(this.gameHost,e,this.pokerPlayer[3])}},spawnNewStar:function(){var e=cc.instantiate(this.starPrefab);this.node.addChild(e),e.setPosition(this.getNewStarPosition()),e.getComponent("Star").game=this,this.starDuration=this.minStarDuration+Math.random()*(this.maxStarDuration-this.minStarDuration),this.timer=0},spawnBottomCard:function(){if(this.playerControlNodeArray.length>0){var e=this.playerControlNodeArray;o.destoryArray(e),this.playerControlNodeArray=[]}this.createBottomCard()},createBottomCard:function(){for(var e=this.pokerPlayer[0],t=0;t<e.total.length;t++){var r=cc.instantiate(this.cardPrefab);r.getComponent("Card").picNum=e.total[t],this.playerControlNodeArray.push(r),this.layoutContainer.node.addChild(r);this.ground.height;t*this.cardWidth,t>13&&(150,(t-13)*this.cardWidth)}},getNewStarPosition:function(){var e,t=this.groundY+Math.random()*this.player.getComponent("Player").jumpHeight+50,r=this.node.width/2;return e=2*(Math.random()-.5)*r,cc.v2(e,t)},getCardBottomPosition:function(){var e=this.currentCardPosition;return this.currentCardPosition=this.currentCardPosition+this.cardWidth,cc.v2(e,0)},update:function(e){},gainScore:function(){this.score+=1,this.scoreDisplay.string="Score: "+this.score,cc.audioEngine.playEffect(this.scoreAudio,!1)},gameOver:function(){this.player.stopAllActions(),cc.director.loadScene("game")},publishPokers:function(){this.pokerPlayer=[],this.gameHost=null;for(var e=this.cardArray.slice(0),t=parseInt(4*Math.random()),r=0;r<4;r++){for(var n=[],a=0;a<27;a++){var s=Math.random()*e.length;s=parseInt(s);var i=e.splice(s,1);n.push(i),null==this.gameHost&&t==o.quaryPokerTypeValue(i)&&(this.gameHost=i,this.appendLog("\u672c\u8f6e\u6e38\u620f,\u4e3b\u724c"+o.quaryPokerValue(i)+"\u5728"+this.expandPlayer(r)))}var c=o.sortPokers(t,n);console.log("onion====",JSON.stringify(c)),this.pokerPlayer.push(c)}this.spawnBottomCard()},expandPlayer:function(e){switch(e){case 0:return"\u81ea\u5df1";case 1:return"\u4e0b\u5bb6";case 2:return"\u5bf9\u5bb6";case 3:return"\u4e0a\u5bb6"}},appendLog:function(e){this.playLog=this.playLog+"\n"+e,this.logLabel.string=this.playLog}}),cc._RF.pop()},{AIHelper:"AIHelper",PokerUtil:"PokerUtil"}],Game:[function(e,t,r){"use strict";cc._RF.push(t,"4e12fLSQu1L+KV6QmxDiavU","Game"),r.__esModule=!0,r.StatusType=void 0;var n=a(e("./beans/CardBean")),o=a(e("./beans/RoleBean"));function a(e){return e&&e.__esModule?e:{default:e}}e("PokerUtil"),e("AIHelper");var s,i={ENCOUNTER:0,ROUNDBEGIN:1,ROUNDOVER:-1,CLEAR:-2,DRAW:2,SEND:3,LOSE:4,ATTACK:5,UNDERATTACK:6};r.StatusType=i;cc.Class({extends:cc.Component,properties:{logs:{default:null,type:cc.Label},menuView:{default:null,type:cc.Button},coinValueView:{default:null,type:cc.Label},cardPrefab:{default:null,type:cc.Prefab},cardArrays:{default:null,type:cc.Layout},sendBtn:{default:null,type:cc.Button},roundOverBtn:{default:null,type:cc.Button},roundType:i.ROUNDBEGIN,hero:{default:null,type:cc.Node},enemy:{default:null,type:cc.Node},enemyCardLabel:{default:null,type:cc.Label},currentCard:null,enemyCardArrays:[],roundSide:1,roundCount:0},onLoad:function(){s=this,this.playLog="\u6e38\u620f\u5f00\u59cb",this.roundOverBtn.node.on("click",this.roundOver,this),this.sendBtn.node.on("click",this.sendCard,this),this.gameEncounter()},drawAICard:function(){var e=new n.default;s.enemyRole.onDrawCard(e),s.enemyCardArrays.push(e)},drawCard:function(){var e=cc.instantiate(s.cardPrefab),t=e.getComponent("Card"),r=new n.default;s.heroRole.onDrawCard(r),t.bindCardBean(r),t.bindCardFunction(this.onCheck),s.cardArrays.node.addChild(e)},onCheck:function(e,t){t?(null!=s.currentCard&&s.currentCard.onCancel(),s.currentCard=e):s.currentCard=null},sendCard:function(){if(1===s.roundSide&&null!=s.currentCard){var e=s.currentCard.node.getComponent("Card").getCardBean();s.sendFocusShow(e);var t=e.sendEffect();s.appendLog("\u5bf9\u65b9\u53d7\u5230\u4f24\u5bb3"+t),t=s.heroRole.attack(t);var r=s.enemyRole.underattack(t);s.currentCard.node.destroy(),s.currentCard=null,r||(s.roundSide=-1,s.appendLog("\u654c\u4eba\u6b7b\u4ea1 \u6e38\u620f\u80dc\u5229"))}},sendFocusShow:function(e){s.appendLog("\u51fa\u724c"+e.title)},roundOver:function(){1===s.roundSide&&(s.appendLog("\u56de\u5408\u7ed3\u675f"),this.roundProgram(0))},gameEncounter:function(){var e=this,t=new o.default(1),r=new o.default(0);this.enemyRole=this.enemy.getComponent("Role"),this.enemyRole.bindRoleBean(r),this.heroRole=this.hero.getComponent("Role"),this.heroRole.bindRoleBean(t),this.scheduleOnce(function(){return e.roundProgram(1)},1)},roundProgram:function(e){var t=0;if(this.roundSide=e,1===e){s.appendLog("\u4f60\u7684\u56de\u5408"),this.roundCount++,this.heroRole.roundBegin(),t=s.cardArrays.node.childrenCount,s.appendLog("\u4f60\u62bd\u724c");for(var r=0;r<5-t;r++)this.drawCard()}else{s.appendLog("\u5bf9\u65b9\u56de\u5408"),this.enemyRole.roundBegin(),t=s.enemyCardArrays.length,s.appendLog("\u5bf9\u65b9\u62bd\u724c");for(var n=0;n<5-t;n++)this.drawAICard();this.enemyCardLabel.string=s.enemyCardArrays.length+"\u5f20",this.logicAI()}},logicAI:function(){for(var e=0;e<s.enemyCardArrays.length;){var t=s.enemyCardArrays[e];s.enemyCardArrays.splice(e,1);var r=t.sendEffect();return r=s.enemyRole.attack(r),s.appendLog("\u4f60\u53d7\u5230\u4f24\u5bb3"+r),s.sendFocusShow(t),s.heroRole.underattack(r)?(this.enemyCardLabel.string=s.enemyCardArrays.length+"\u5f20",void s.scheduleOnce(function(){return s.logicAI()},1)):(s.appendLog("\u82f1\u96c4\u6b7b\u4ea1 \u6e38\u620f\u7ed3\u675f"),void(s.roundSide=-1))}s.enemyRole.roundOver(),s.roundProgram(1)},outerClick:function(){cc.director.loadScene("outermap")},appendLog:function(e){s.playLog=s.playLog+"\n"+e,s.logs.string=s.playLog}}),cc._RF.pop()},{"./beans/CardBean":"CardBean","./beans/RoleBean":"RoleBean",AIHelper:"AIHelper",PokerUtil:"PokerUtil"}],MainBtn:[function(e,t,r){"use strict";cc._RF.push(t,"0c630je/l5AuqZ97H6m2qcS","MainBtn"),cc.Class({extends:cc.Button,properties:{picNum:"181",isCheck:!1,sprite:{default:null,type:cc.SpriteFrame}},start:function(){},onLoad:function(){},onDestroy:function(){this.node.off("mousedown",this.onMouseDown,this)},onMouseDown:function(e){console.log("Press a key"),e.stopPropagation(),this.isCheck?(this.isCheck=!1,this.node.y=this.node.y-50):(this.isCheck=!0,this.node.y=this.node.y+50)}}),cc._RF.pop()},{}],MainHotel:[function(e,t,r){"use strict";cc._RF.push(t,"b3130nkOe5KfJWQ6ASQsvDe","MainHotel");e("PokerUtil"),e("AIHelper");cc.Class({extends:cc.Component,properties:{},onLoad:function(){this},refreshCallback:function(e){this.publishPokers()},update:function(e){}}),cc._RF.pop()},{AIHelper:"AIHelper",PokerUtil:"PokerUtil"}],Other:[function(e,t,r){"use strict";cc._RF.push(t,"cad1b5LmG9NiKt2jGuL7bHy","Other"),cc.Class({extends:cc.Component,properties:{backButton:{default:null,type:cc.Button},playButton:{default:null,type:cc.Button},poker:{default:null,type:cc.Node}},onLoad:function(){this.backButton.node.on("click",this.backClick,this),this.playButton.node.on("click",this.playClick,this);var e=cc.sys.localStorage.getItem("userData");console.log("onionstr"+e)},backClick:function(e){cc.director.loadScene("game")},playClick:function(){cc.sys.localStorage.getItem("userData");var e=cc.spawn(cc.moveBy(2,100,100),cc.scaleTo(.5,.8,1.4));this.poker.runAction(e),this.saveTest()},saveTest:function(){userData={name:"Tracer",level:1,gold:100},cc.sys.localStorage.setItem("userData",JSON.stringify(userData))},start:function(){}}),cc._RF.pop()},{}],Pokemon:[function(e,t,r){"use strict";cc._RF.push(t,"99a402sc1VPQrwu+sHSIjU1","Pokemon"),cc.Class({extends:cc.Component,properties:{id:"181",level:-1,round:-1,sprite:{default:null,type:cc.SpriteFrame},hp:20},attack:function(){},underattack:function(){},roundBegin:function(){}}),cc._RF.pop()},{}],PokerUtil:[function(e,t,r){"use strict";cc._RF.push(t,"637dcF7OOBKJbr2bHFrfFoQ","PokerUtil"),r.__esModule=!0,r.default=void 0;var n=[4,6,7,8,9,10,11,12,13,14,15,3,5,16,17,18],o=function(){function e(){}return e.quaryPokerWeight=function(e){return n.indexOf(e)},e.quaryIsHost=function(e){var t=parseInt(e);return 15==t||3==t||5==t||16==t||17==t||18==t},e.quaryIsSocer=function(e){return 5==e||10==e?e:13==e?10:0},e.compareVice=function(t,r,n,o,a){return n==r==t?e.compareSinglePokerBigger(o,a):r==t?-1:n==t?1:-1},e}();r.default=o,o.testLogic=function(e){var t=4*Math.random(),r=4*Math.random();if(t=parseInt(t)+1,r=parseInt(r)+1,console.log("onion","\u5f53\u524d\u6e38\u620f\u4e3b"+t+"\u672c\u8f6e\u4e3b"+r),1==e.length){var n=e[0]+"";console.log("onion",o.quaryPokerWeight(parseInt(n.substring(0,2))))}else e.length>=2&&console.log("onion",o.comparePoker(t,r,e[0],e[1]))},o.testArrayLogic=function(e,t){var r=4*Math.random(),n=4*Math.random();r=parseInt(r)+1,n=parseInt(n)+1},o.comparePoker=function(e,t,r,n){if(console.log("onion","comparePoker++"+o.quaryPokerValue(r)+"/"+o.quaryPokerValue(n)),(Array.isArray(r)||Array.isArray(n))&&(1==r.length&&(r=r[0]),1==n.length&&(n=n[0])),Array.isArray(r)||Array.isArray(n))return console.error("onion","\u6682\u4e0d\u652f\u6301\u6570\u7ec4"),o.compareArray(e,t,r,n),-1;if(n==r)return-1;n+="";var a=(r+="").substring(2),s=n.substring(2),i=r.substring(0,2),c=n.substring(0,2),l=a==e||o.quaryIsHost(i),u=a==e||o.quaryIsHost(c);if(l&&u){if(5==parseInt(i))return-1;if(5==parseInt(c))return 1;var d=o.compareSinglePokerBigger(i,c);return 0!=d?d:a==e?-1:s==e?1:-1}return l?-1:u?1:o.compareVice(t,a,s,i,c)},o.compareSinglePokerBigger=function(e,t){if(e.length>2||t.length>2)return console.error("\u53ea\u63a5\u53d7\u4e24\u4f4d\u7684"+e+"/"+t),1;var r=parseInt(e),n=parseInt(t),a=o.quaryPokerWeight(n)-o.quaryPokerWeight(r);return a>0?a=1:a<0&&(a=-1),a},o.compareArray=function(e,t,r,n){if(r.length!=n.length||r.length%2!=0)return console.error("onion","\u6570\u7ec4\u957f\u5ea6\u4e0d\u4e00\u81f4"),-1;var a=r.sort(),s=n.sort(),i=o.checkArrayValue(a),c=o.checkArrayValue(s);return"-1"==i[0]?1:"-1"==c[0]?-1:e==i[0]==c[0]?i[1]>c[1]?-1:1:e==i[0]?-1:e==c[0]?1:t==i[0]==c[0]?i[1]>c[1]?-1:1:t==i[0]?-1:e==c[0]?1:-1},o.checkArrayValue=function(e){for(var t="-1",r="-1",n="-1",a=0,s=0;s<e.length;s++)if(s%2==0)r=e[s];else{if(r!=(t=e[s]))return["-1",-1];var i=t,c="0";if("171"==i||"161"==i)c="5";else{var l=i.substring(2);c=o.quaryType(l)}if(n!=c&&"-1"!=n)return["-1",-1];n=c;var u=i.substring(0,2);a+=o.quaryPokerWeight(parseInt(u))}return[n,a]},o.compareRound=function(e){},o.destoryArray=function(e){if(null!=e)for(var t=0;t<e.length;t++)e[t].destroy()},o.sort=function(e,t){return e=Math.floor(e/10),t=Math.floor(t/10),o.quaryPokerWeight(e)-o.quaryPokerWeight(t)},o.sortInsert=function(e,t){if(0===e.length)return e.push(t),e;var r=t/10,n=o.quaryPokerWeight(r),a=o.quaryPokerWeight(e[0]/10),s=o.quaryPokerWeight(e[e.length-1]/10);return n<=a?e=[t].concat(e):n>=s&&e.push(t),e},o.quaryType=function(e){switch(e){case"1":return"\u65b9\u5757";case"2":return"\u6885\u82b1";case"3":return"\u7ea2\u6843";case"4":return"\u9ed1\u6843"}},o.quaryPokerTypeValue=function(e){return"171"==(e+="")?"3":"161"==e?"4":e.substring(2)},o.quaryPokerValue=function(e){var t=e+"";if("171"==t)return"\u5927\u738b";if("161"==t)return"\u5c0f\u738b";if("181"==t)return"\u5361\u80cc";var r=t.substring(0,2),n=t.substring(2),a=o.quaryType(n);switch(r){case"03":a+="3";break;case"04":a+="4";break;case"05":a+="5";break;case"06":a+="6";break;case"07":a+="7";break;case"08":a+="8";break;case"09":a+="9";break;case"10":a+="10";break;case"11":a+="J";break;case"12":a+="Q";break;case"13":a+="K";break;case"14":a+="A";break;case"15":a+="2"}return a},o.sortPokers=function(e,t){for(var r=[],n=[],a=[],s=[],i=[],c=0;c<t.length;c++){var l=t[c];if(171!=l&&161!=l){var u=Math.floor(l/10);if(o.quaryIsHost(u))i.push(l);else switch(l%10){case 1:r.push(l);break;case 2:n.push(l);break;case 3:a.push(l);break;case 4:s.push(l)}}else i.push(l)}switch(i.sort(o.sort),r.sort(o.sort),n.sort(o.sort),a.sort(o.sort),a.sort(o.sort),parseInt(e)){case 1:return o.createStatic(r,n,a,s,i,n.concat(a).concat(s).concat(r).concat(i));case 2:return o.createStatic(r,n,a,s,i,a.concat(s).concat(r).concat(n).concat(i));case 3:return o.createStatic(r,n,a,s,i,s.concat(r).concat(n).concat(a).concat(i));case 4:return o.createStatic(r,n,a,s,i,r.concat(n).concat(a).concat(s).concat(i))}},o.createStatic=function(e,t,r,n,o,a){return{type1Array:e,type2Array:t,type3Array:r,type4Array:n,hostArray:o,total:a}},o.saveRecoder=function(){cc.sys.localStorage.setItem("userData",JSON.stringify({name:"Tracer",level:1,gold:100}))},o.quaryReocder=function(){JSON.parse(cc.sys.localStorage.getItem("userData"))},t.exports=r.default,cc._RF.pop()},{}],RoleBean:[function(e,t,r){"use strict";cc._RF.push(t,"382ceJTZe5Li67JBz4qFCYs","RoleBean"),r.__esModule=!0,r.default=void 0;var n=function(){function e(e){this.id="181",this.level=-1,this.cardlist=[],this.currentcards=[],this.roleType=e,this.rolePic="",this.roleHp=20,this.statuslist=[],this.desc="\u63cf\u8ff0"}var t=e.prototype;return t.setRoleHp=function(e){this.roleHp=e},t.getRoleHp=function(){return this.roleHp},e}();r.default=n,t.exports=r.default,cc._RF.pop()},{}],Role:[function(e,t,r){"use strict";cc._RF.push(t,"f3b569HznVA0IJoh1Shylrp","Role");var n=function(e){return e&&e.__esModule?e:{default:e}}(e("./beans/RoleBean")),o=e("./Game");cc.Class({extends:cc.Component,properties:{roleBean:new n.default,level:-1,cardlist:[],sprite:{default:null,type:cc.Sprite},hpLabel:{default:null,type:cc.Label},descLabel:{default:null,type:cc.Label},statuslist:[]},attack:function(e){return e},underattack:function(e){var t=this.roleBean.getRoleHp();return t=parseInt(t),(t-=e)<0&&(t=0),this.roleBean.setRoleHp(t),this.hpLabel.string=this.roleBean.getRoleHp(),t>0},roundBegin:function(){for(var e=0;e<this.statuslist.length;e++)this.statuslist[e].operateStatus(o.StatusType.ROUNDBEGIN)},roundOver:function(){},encounter:function(){},bindRoleBean:function(e){this.roleBean=e,this.hpLabel.string=e.getRoleHp()+""},onDrawCard:function(e){}}),cc._RF.pop()},{"./Game":"Game","./beans/RoleBean":"RoleBean"}],StatusBean:[function(e,t,r){"use strict";cc._RF.push(t,"d57697HpPNPhLRPBAxsQ/Sd","StatusBean"),r.__esModule=!0,r.default=void 0;var n=e("../Game"),o=function(){function e(){this.id=-1,this.level=-1,this.sprite={default:null,type:cc.SpriteFrame},this.round=-1,this.type=n.StatusType.ROUNDBEGIN}return e.prototype.operateStatus=function(e){return e===this.type},e}();r.default=o,t.exports=r.default,cc._RF.pop()},{"../Game":"Game"}],"use_v2.0.x_cc.Toggle_event":[function(e,t,r){"use strict";cc._RF.push(t,"bbf567+dqBFRZRllau6BkR5","use_v2.0.x_cc.Toggle_event"),cc.Toggle&&(cc.Toggle._triggerEventInScript_check=!0),cc._RF.pop()},{}]},{},["use_v2.0.x_cc.Toggle_event","AIHelper","Card","Director","Game","Gamebeifen","MainBtn","MainHotel","Other","Pokemon","PokerUtil","Role","CardBean","RoleBean","StatusBean"]);