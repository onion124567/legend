import CardBean from "./beans/CardBean";
import RoleBean from "./beans/RoleBean";
import {RoadType} from "../../library/imports/b0/b0d4bfd1-627e-462e-b97a-d93cf37534c8";
import {createRoadBean} from "./RoadCard";


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
        let roadcard=newCard.node.getComponent("RoadCard");
        if(number%2===0){
            //加野怪
            let enemyBean=new RoleBean(0);
            enemyBean.hp=20;
            roadcard.bindRoadBean(RoadType.ENEMY,enemyBean);
        }else {
            let roadMapBean= createRoadBean(RoadType.RECOVER,10,null);
            roadcard.bindRoadBean(RoadType.ENEMY,roadMapBean);
        }
        this.roadCardArrays.push(newCard);

    }


});
