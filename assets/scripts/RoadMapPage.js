import CardBean from "./beans/CardBean";
import RoleBean from "./beans/RoleBean";


/**
 * 地图
 */
let self=null;
cc.Class({
    extends: cc.Component,

    properties: {
        logs:{
            default:null,
            type:cc.Label,
        },

        menuView: {
            default: null,
            type: cc.Button,
        },
        coinValueView: {
            default: null,
            type: cc.Label,
        },
        roadCardPrefab: {
            default: null,
            type: cc.Prefab
        },
        roadCardArrays: {
            default: null,
            type: cc.Layout,
        },

        hero: {
            default: null,
            type: cc.Node
        },


    },

    onLoad: function () {
        self=this;

        // 这里的 this 指向 component
        for(let i=0;i<3;i++){
            this.createRoadCard();
        }

    },
    /**
     * 加卡片
     */
    createRoadCard:function () {
        let number=Math.random();
        let newCard = cc.instantiate(self.roadCardPrefab);
        if(number%2===0){

        }
        this.roadCardArrays.push(newCard);

    }


});
