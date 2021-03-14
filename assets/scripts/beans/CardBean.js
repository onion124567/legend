import {CardType} from "../ConstantConfig";

export default class CardBean {
    constructor() {
        this.id = "181";
        this.level = -1;
        this.picurl ="";//贴图
        this.type = CardType.ATTACK;//类型
        this.desc = "";//说明
        this.title="攻击";//卡牌名称

        this.damage=0;//对目标的基础伤害值
        this.createsource=0;//创建的资源值
        this.consumesource=0;//消耗的资源值
        this.drawCard=0;//抽牌数
        this.recoverHp=0;//恢复生命
        this.pokemonRecover=0;//恢复宝宝生命值
        this.appendDamage=0;//追加伤害值
        this.pokemondamage=0;//对宝宝造成的伤害值
        this.callid=0;

        this.effectlist="";//卡牌效果列表
    }
    //导入加载卡牌时用
    bindData(jsonBean){
    }

    //传入当前状态 返回使用后的效果
    sendEffect(hp,maxhp,source,cardcount){
        let scene={
            hp,maxhp,source,cardcount
        }
        this.effectlist.split(",");
        return this.damage;

    }

    /**
     *
     1	造成固定伤害
     2	造成水晶量的伤害
     3	对宝宝造成固定量伤害
     4	抽固定量的牌
     5	抽水晶量的牌
     6	回复固定量hp
     7	恢复水晶量hp
     8	产生固定量的水晶
     9	召唤固定宝宝id
     11	累计盾系点数
     12	累计剑系点数
     13	累计斧系点数
        伤害变成群体伤害
     */
    effect1(result,scene){
        result.damage=result.damage+this.damage;
    }
    effect2(result,scene){
        result.damage=result.damage+scene.source;
    }
    effect3(result,scene){
        result.pokemondamage=result.pokemondamage+this.pokemondamage;
    }
    effect4(result,scene){
        result.draw=result.draw+this.drawCard;
    }
    effect5(result,scene){
        result.draw=result.draw+scene.source;
    }
    effect6(result,scene){
        result.recover=result.recover+this.recoverHp;
    }
    effect7(result,scene){
        result.recover+=scene.source;
    }
    effect8(result,scene){
        result.createsource+=this.createsource;
    }
    effect9(result,scene){
        result.callid=this.callid;
    }


}