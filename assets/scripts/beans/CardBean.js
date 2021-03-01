
export default class CardBean {
    constructor() {
        this.id = "181";
        this.level = -1;
        this.sprite = {//基础贴图
            default: null,
            type: cc.SpriteFrame,
        };
        this.cost = 20;//费用
        this.type = 1;//类型
        this.desc = "";//说明
        this.title="攻击";//卡牌名称
        this.damage=3;//伤害值
    }

    sendEffect(){
        return this.damage;
    }
}