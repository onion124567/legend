/**
 * 道路卡片
 */
import Director from "./Director";

export var RoadType = {
    ENEMY: 1,//野怪
    RECOVER: 2,//恢复
    SHOP:3,

}
export function createRoadBean(roadtype,hpRecover,cardList) {
    return {
        roadtype:roadtype,
        hpRecover:hpRecover,
        cardList:cardList
    }
}
cc.Class({
    extends: cc.Component,

    properties: {
        type: RoadType.ENEMY,
        roadBean:null,
        //图标
        sprite: {
            default: null,
            type: cc.SpriteFrame,
        },
        costLabel: {
            default: null,
            type: cc.Label,
        },
        titleLabel: {
            default: null,
            type: cc.Label,
        },
        selectBtn: {
            default: null,
            type: cc.Button,
        },
        descLabel: {
            default: null,
            type: cc.Label,
        },
        levelLable: {
            default: null,
            type: cc.Label,
        },


    },
    start: function () {

        // var node = new cc.Node('Sprite');
        // var sp = node.addComponent(cc.Sprite);

        // sp.spriteFrame = cardPic;
        // node.parent = this.node;


    },

    bindCardFunction(fun) {
        this.checkFunction = fun;
    },

    getRoadBean(){
      return this.roadBean;
    },

    bindRoadBean(type,roadBean){
        this.roadBean=roadBean;
        this.type=type;

        this.titleLabel.string = this.cardBean.title;
        this.levelLable.string = this.cardBean.level;
        this.descLabel.string = this.cardBean.desc;

    },
    // update: function (dt) {
    // },

    onLoad: function () {
        // this.node.on(cc.Node.EventType.TOUCH_START, this.onMouseDown, this);
        this.selectBtn.node.on("click", this.onSelect, this);

        // this.node.on("click", this.onMouseDown, this);
        //
        // this.node.on(cc.Node.EventType.TOUCH_MOVE,this.onTouchMove,this);
        // this.node.on(cc.Node.EventType.MOUSE_MOVE,this.onTouchMove,this);
        //
        // this.node.on(cc.Node.EventType.TOUCH_CANCEL,this.onTouchCancel,this);
        // this.node.on(cc.Node.EventType.MOUSE_LEAVE,this.onTouchCancel,this);
        // let self = this;
        this.node.y = 0;
        // this.location=[this.node.x,this.node.y];
        // this.normalHeight=this.node.height;


        // cc.resources.load("pokers", cc.SpriteAtlas, function (err, atlas) {
        //
        //     let frame = atlas.getSpriteFrame("181");
        //     console.log('onion==='+self.getComponent(cc.Sprite));
        //     self.getComponent(cc.Sprite).spriteFrame =frame
        //     this.spriteFrame= frame;
        // });
    },
    onSelect: function (event) {
        console.log("onion" + 'Press a key');
       if(this.type==RoadType.RECOVER){
           //发出增长hp的事件
           Director.hostHero.hp+=10;
       }else {
           //从卡面取得敌人信息
           Director.currentEnemy=this.roadBean;
           cc.director.loadScene('game');
       }
    },

    onCancel: function () {
        if (this.isCheck) {
            this.isCheck = false;
            this.node.y = this.node.y - 50;
        }

    },
    onDestroy() {
        // cc.systemEvent.off("mousedown", this.onMouseDown);
        // this.node.off("click", this.onMouseDown, this);
        // this.node.off(cc.Node.EventType.TOUCH_START, this.onMouseDown, this);
        if (cc.sys.isMobile) {
            this.node.off("click", this.onMouseDown, this);
        } else {
            this.node.off(cc.Node.EventType.MOUSE_DOWN, this.onMouseDown, this);
        }

    },


});
