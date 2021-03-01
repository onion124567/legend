import {StatusType} from "../Game";


export default class StatusBean {
    constructor() {
        this.id = -1;
        this.level = -1;
        this.sprite = {//基础贴图
            default: null,
            type: cc.SpriteFrame,
        };
        this.round = -1;//费用
        this.type = StatusType.ROUNDBEGIN;
    }

    /**
     * 结算状态
     */
    operateStatus(roundtype){
        if(roundtype===this.type){
            return true;
        }else {
            return false;
        }
    }

}