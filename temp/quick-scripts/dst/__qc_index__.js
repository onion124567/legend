
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/__qc_index__.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}
require('./assets/migration/use_v2.0.x_cc.Toggle_event');
require('./assets/scripts/AIHelper');
require('./assets/scripts/Card');
require('./assets/scripts/ConstantConfig');
require('./assets/scripts/Director');
require('./assets/scripts/Game');
require('./assets/scripts/Gamebeifen');
require('./assets/scripts/LogUtil');
require('./assets/scripts/MainBtn');
require('./assets/scripts/MainHotel');
require('./assets/scripts/Other');
require('./assets/scripts/Pokemon');
require('./assets/scripts/PokerUtil');
require('./assets/scripts/RoadCard');
require('./assets/scripts/RoadMapPage');
require('./assets/scripts/Role');
require('./assets/scripts/beans/CardBean');
require('./assets/scripts/beans/PokemonBean');
require('./assets/scripts/beans/RoleBean');
require('./assets/scripts/beans/StatusBean');

                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();