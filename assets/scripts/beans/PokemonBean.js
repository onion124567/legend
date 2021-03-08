/**
 * 数据层的宝宝
 */
export default class PokemonBean {
    constructor(roleType) {
        this.id = "181";
        this.level = -1;
        this.pic = "";//贴图
        this.roleHp = 20;
        this.desc = "描述";
        this.round=-1;
        //技能类型
        this.actionType=0;//1给主角恢复 2充当某种类型牌  3加护甲 4抽牌  5造成伤害  6加buff 7再进行一回合 8吞噬 9冰冻
        this.passiveSkill=0;//被动技能id  附加伤害  双倍伤害 嘲讽 吸血  回复  重生等

    }


    setRoleHp(hp){
        this.roleHp=hp;
    }
    getRoleHp(){
        return this.roleHp;
    }
}