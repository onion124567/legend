import CardBean from "./beans/CardBean";

export var CardStatus = {
    NORMAL: 1,//不能用状态
    CANUSE: 2,//能用高亮状态
    CURRENT: 3,//拖动状态 拖动动效，cancel判定y轴超过一定范围即使用
    TRY: 4,//指向性卡牌使用，在cancel时，判定落点是否有角色，是否为可用角色，再回调使用

}
cc.Class({
    extends: cc.Component,

    properties: {
        cardBean: null,
        status: null,
        isCheck: false,
        sprite: {
            default: null,
            type: cc.Sprite,
        },
        costLabel: {
            default: null,
            type: cc.Label,
        },
        titleLabel: {
            default: null,
            type: cc.Label,
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

    getCardBean(){
      return this.cardBean;
    },
    bindCardBean(cardBean) {
        this.cardBean = cardBean;
        this.titleLabel.string = this.cardBean.title;
        this.costLabel.string = this.cardBean.cost;
        this.levelLable.string = this.cardBean.level;
        this.descLabel.string = this.cardBean.desc;
        this.titleLabel.string = this.cardBean.title;
    },

    // update: function (dt) {
    // },

    onLoad: function () {
        // this.node.on(cc.Node.EventType.TOUCH_START, this.onMouseDown, this);
        if (cc.sys.isMobile) {
            this.node.on("click", this.onMouseDown, this);
        } else {
            this.node.on(cc.Node.EventType.MOUSE_DOWN, this.onMouseDown, this);
        }

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
    onMouseDown: function (event) {
        console.log("onion" + 'Press a key');
        event.stopPropagation();
        if (this.isCheck) {
            this.isCheck = false;
            this.node.y = this.node.y - 50;
            this.checkFunction && this.checkFunction(this, false);
        } else {
            this.isCheck = true;
            this.node.y = this.node.y + 50;
            this.checkFunction && this.checkFunction(this, true);
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
