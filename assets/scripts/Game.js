import CardBean from "./beans/CardBean";
import RoleBean from "./beans/RoleBean";
import Director from "./Director";

let PokerUtil = require("PokerUtil");
let AIHelper = require("AIHelper");
let self;
export var StatusType = {
    ENCOUNTER: 0,//遭遇
    ROUNDBEGIN: 1,//回合开始
    ROUNDOVER: -1,//回合结束
    CLEAR: -2,//战斗结束
    DRAW:2,
    SEND: 3,//出牌
    LOSE: 4,//弃牌
    ATTACK: 5,//攻击时触发
    UNDERATTACK: 6,//被攻击时触发
}
export var gameHero=null;
let totalCardNum = 5;
/**
 * 战斗界面 demo版本，做一个抽卡，每张卡能打3点血，敌方有20点血的demo
 */
cc.Class({
    extends: cc.Component,

    properties: {
        logs:{
            default:null,
            type:cc.Label,
        },

        menuView: {
            default: null,
            type: cc.Button,
        },
        coinValueView: {
            default: null,
            type: cc.Label,
        },
        cardPrefab: {
            default: null,
            type: cc.Prefab
        },
        cardArrays: {
            default: null,
            type: cc.Layout,
        },
        sendBtn: {
            default: null,
            type: cc.Button,
        },
        roundOverBtn: {
            default: null,
            type: cc.Button,
        },
        roundType: StatusType.ROUNDBEGIN,
        hero: {
            default: null,
            type: cc.Node
        },
        enemy: {
            default: null,
            type: cc.Node
        },
        enemyCardLabel: {
            default: null,
            type: cc.Label,
        },

        currentCard: null,//玩家当前选中的卡片
        enemyCardArrays:[],//敌人卡牌
        roundSide:1,//回合轮次
        roundCount:0,


    },

    onLoad: function () {
        self = this;
        this.playLog="游戏开始";
        this.roundOverBtn.node.on("click", this.roundOver, this);
        this.sendBtn.node.on("click", this.sendCard, this);
        this.gameEncounter();
        // 这里的 this 指向 component
    },
    drawAICard: function () {
        let cardBean=new CardBean();
        self.enemyRole.onDrawCard(cardBean);
        self.enemyCardArrays.push(cardBean);

    },
    //玩家抽牌
    drawCard: function () {
        let newCard = cc.instantiate(self.cardPrefab);
        // newStar.setPicNum("i"+i);

        let card = newCard.getComponent('Card');
        let cardBean=new CardBean();
        self.heroRole.onDrawCard(cardBean);
        card.bindCardBean(cardBean);
        card.bindCardFunction(this.onCheck);
        self.cardArrays.node.addChild(newCard);
    },
    onCheck: function (card, isCheck) {
        if (isCheck) {//选中
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
    sendCard: function () {
        if(self.roundSide!==1){//敌方回合 胜利 不能出牌
            return;
        }
        if (self.currentCard != null) {
            let card = self.currentCard.node.getComponent("Card");
            let cardBean=card.getCardBean();
            self.sendFocusShow(cardBean);
            let value = cardBean.sendEffect();//造成的伤害值
            self.appendLog("对方受到伤害"+value);
            //攻击时的伤害值加强或减弱
            value = self.heroRole.attack(value);
            //
            this.sideUnderAttack(self.enemyRole,null,null,value);
            //状态调整或附加
            let live=self.enemyRole.isAlive();
            self.currentCard.node.destroy();
            self.currentCard = null;
            if(!live){
                self.roundSide=-1;
                self.appendLog("敌人死亡 游戏胜利");
                self.toMapScene();

            }
        }

    },
    /**先判定目标
     * 根据状态承受伤害
     * 宝宝死亡时销毁节点
     */
    sideUnderAttack:function(role,pokemonleft,pokenmonright,value){

    },

    sendFocusShow:function (cardBean) {
        self.appendLog("出牌"+cardBean.title);
    },
    roundOver: function () {
        if(self.roundSide!==1){//敌方回合 胜利 不能出牌
            return;
        }
        self.appendLog("回合结束");
        this.roundProgram(0);
    },
    gameEncounter: function () {
        let hero = new RoleBean(1);
        let enemy = new RoleBean(0);
        this.enemyRole = this.enemy.getComponent('Role');
        this.enemyRole.bindRoleBean(enemy);

        this.heroRole = this.hero.getComponent('Role');
        this.heroRole.bindRoleBean(hero);

        this.scheduleOnce(() => this.roundProgram(1), 1);
    },
    /**
     * 每回合的执行顺序
     */
    roundProgram: function (rolettype) {
        let number=0;
        this.roundSide=rolettype;
        if (rolettype === 1) {
            self.appendLog("你的回合")
            this.roundCount++;
             this.heroRole.roundBegin();
             number=self.cardArrays.node.childrenCount;
            //抽卡直到手牌抽满
            self.appendLog("你抽牌")
            for (let i = 0; i < totalCardNum-number; i++) {
                this.drawCard();
            }
            //等待出牌
        }else {
            self.appendLog("对方回合")
            this.enemyRole.roundBegin();
            number=self.enemyCardArrays.length;
            self.appendLog("对方抽牌")
            //调用ai抽牌
            for (let i = 0; i < totalCardNum-number; i++) {
                this.drawAICard();
            }
            this.enemyCardLabel.string=self.enemyCardArrays.length+"张";
            this.logicAI();

        }


    },
    //AI出牌逻辑
    logicAI(){
        for(let i=0;i<self.enemyCardArrays.length;){
            let cardBean=self.enemyCardArrays[i];
            let canSend=true;
            if(canSend){
                self.enemyCardArrays.splice(i, 1);
                let value=cardBean.sendEffect();
                value=self.enemyRole.attack(value);
                self.appendLog("你受到伤害"+value);
                self.sendFocusShow(cardBean);
                let live=self.heroRole.underattack(value);
                if(!live){
                    self.appendLog("英雄死亡 游戏结束");
                    self.roundSide=-1;
                    return;
                }
                this.enemyCardLabel.string=self.enemyCardArrays.length+"张";
                self.scheduleOnce(() => self.logicAI(), 1);
                return;
            }else {
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
    toMapScene: function () {
        this.saveHeroData();
        Director.currentEnemy=null;
        cc.director.loadScene('outermap');

    },
    saveHeroData:function () {
        if(self.heroRole.roleHp<=Director.hostHero.fullhp){
            Director.hostHero.hp=self.heroRole.roleHp;
        }else {
            Director.hostHero.hp=Director.hostHero.fullhp;
        }
    },
    appendLog: function (string) {
        self.playLog = self.playLog + "\n" + string;
        self.logs.string = self.playLog;

    }

});
