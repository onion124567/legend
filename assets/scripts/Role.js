import RoleBean from "./beans/RoleBean";
import {StatusType} from "./Game";

/**
 * 战斗中的角色 敌我双方
 * 显示逻辑层的脚本
 */

cc.Class({
    extends: cc.Component,
    properties: {
        roleBean:new RoleBean(),
        level:-1,
        cardlist:[],//总手牌
        // currentcardArrays:[],//当前手牌
        sprite: {//基础贴图
            default: null,
            type: cc.Sprite,
        },
        hpLabel:{
            default:null,
            type:cc.Label,
        },//血量
        descLabel:{
            default:null,
            type:cc.Label,
        },
        hpAnimateLabel:{
          default:null,
          type:cc.Label
        },
         statuslist:[],//状态数组
    },

    attack(value){//触发自身的状态栏，输出伤害值，自身附加状态，敌方附加状态

        return value;
    },
    underattack(value){//被攻击，触发自身状态栏，更改自身生命值，状态值
        let hp=this.roleBean.getRoleHp();
        hp=parseInt(hp);
        hp=hp-value;
        if(hp<0){
            hp=0;
        }
        // this.hpAnimate();
        this.roleBean.setRoleHp(hp);
        this.hpLabel.string=this.roleBean.getRoleHp();
        return hp>0;
    },
    hpAnimate(){
        let animate=cc.sequence(cc.moveBy(2,  -50, 50),2);
        this.hpAnimateLabel.runAction(animate);
    },
    //找到需要触发的状态节点，并触发
    roundBegin(){
        for(let i=0;i<this.statuslist.length;i++){
            this.statuslist[i].operateStatus(StatusType.ROUNDBEGIN);
        }
    },
    roundOver(){

    },
    //战斗开始 类似祝福状态 直接触发并消耗
    encounter(){
    },
    bindRoleBean(role){
        this.roleBean=role;
        this.hpLabel.string=role.getRoleHp()+"";
    },

    //返回效果
    onDrawCard(cardBean){
    },







});