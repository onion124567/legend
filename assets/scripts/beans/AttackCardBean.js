import CardBean from "./CardBean";
import {AttackFileType, GameSubKind} from "../ConstantConfig";
import LogUtil from "../LogUtil";
let VALUE_LENGTH=7;//七位 木火水雷风追灵
let VALUE_FIELD =["wood","fire","water","thunder","wind","append","aura"];
// a场景内灵气 r当前回合数 d主角攻击力 o主角年纪
export default class AttackCardBean extends CardBean{

    constructor() {
        super();
        //攻击类型
        this.attackType=AttackFileType.SWORD;
        //基础伤害为角色攻击值 追加伤害
        this.attackValue={
            wood:0,
            fire:0,
            water:0,
            thunder:0,
            wind:0,
            append:0,
            aura:0 //产生灵气
        }
        this.av="0000000";

    }
    //导入加载卡牌时用 {"ct":0,"aft","1","t":"疾风剑",d:"如风一般迅速",av:"0003000"}
    bindData(jsonBean){
        jsonBean={"ct":0,"aft","1","t":"疾风剑",desc:"如风一般迅速",av:"0003rd0"};
        if(jsonBean.av.length!==VALUE_LENGTH){
            LogUtil.error(`jsonBean av长度不对,${jsonBean.av}检查录入!!`);
            return;
        }
        this.attackType=jsonBean.aft;
        this.type=jsonBean.ct;
        this.title=jsonBean.t;
        this.desc=jsonBean.d;
        this.av=jsonBean.av;
    }
    getAttackType(){
        return this.attackType;
    }

    getAttackValue=(arua,round,damage,old)=>{
        for(let i=0;i<VALUE_LENGTH;i++){
            let char=this.av.charAt(i);
            let value=0;
            if(char==="0"){

            }else if(char==="a"){
                value=arua;
            }else if(char==="r"){
                value=round;
            }else if(char==="d"){
                value=damage;
            }else if(char==="o"){
                value=old;
            }else {
                value=parseInt(char);
            }
            if(!isNaN(value)){
                LogUtil.error(`jsonBean av数据不对,${this.av}检查录入!!`);
                return
            }
            this.attackValue[VALUE_FIELD[i]]=value;
        }
      return this.attackValue;
    }


}