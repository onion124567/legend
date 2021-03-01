/**
 * 数据层的角色
 */
export default class RoleBean {
    constructor(roleType) {
        this.id = "181";
        this.level = -1;
        this.cardlist = [];//总牌库
        this.currentcards = [];//当前手牌
        this.roleType = roleType;//0 电脑 1玩家
        this.rolePic = "";//贴图
        this.roleHp = 20;
        this.statuslist = [];//状态数组
        this.desc = "描述";

    }


    setRoleHp(hp){
        this.roleHp=hp;
    }
    getRoleHp(){
        return this.roleHp;
    }
}