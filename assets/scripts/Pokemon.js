
//战斗中的宝宝
cc.Class({

    extends: cc.Component,
    properties: {
        id:"181",
        level:-1,
        round:-1,//剩余回合数
        sprite: {//基础贴图
            default: null,
            type: cc.Sprite,
        },
        hp:20,//血量
        hpLabel:{
            default:null,
            type:cc.Label,
        },
        //技能类型
        actionType:0,//1给主角恢复 2充当某种类型牌  3加护甲 4抽牌  5造成伤害  6加buff 7再进行一回合
        //技能可用
        actionEable:1,

    },

    attack(){//触发自身的状态栏，输出伤害值，自身附加状态，敌方附加状态
        this.actionEable=1;

    },

    underattack(){//被攻击，触发自身状态栏，更改自身生命值，状态值

    },

    //每回合可点一次，宝宝技能。在宝宝攻击后恢复
    action(){
        if(this.actionEable===1){

            this.actionEable=0;
        }

    },


    roundBegin(){

    }



});