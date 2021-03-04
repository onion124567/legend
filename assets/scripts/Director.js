/**
 * 导演类 控制整体流程
 * 游戏资源
 * 人气  与食物味道线性相关 与舒适度及服务水平乘系数关系
 * 客流量 实际来店人数，和人气成正比 受餐桌数量限制
 * 金币   雇佣厨师，购买食材等
 * 行动值 每天自动补全6次，随机事件选择，产生其他资源
 */
export default class Director {
    static hostHero = null;
    static currentEnemy=null;

    constructor() {
        this.status = null;
        Director.hostHero = {
            lv: 1,
            hp: 20,
            fullhp: 20,
            experience: 60,
        };
    }


    //每个关键节点调用
    saveData() {
        cc.sys.localStorage.setItem('userData', JSON.stringify(Director.hostHero));
    }

    //游戏启动调用
    loadData() {
        let userData = cc.sys.localStorage.getItem('userData');
        Director.hostHero = JSON.parse(userData);
    }

}