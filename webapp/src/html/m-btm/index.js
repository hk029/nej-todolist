NEJ.define([
    'base/klass',
    'base/element',
    'util/template/tpl',
    'util/dispatcher/module',
    'mypro/module/module',
    'util/chain/NodeList'
], function (_k, _e, _t0, _t1, _m, $, _p, _o, _f, _r) {
    // variable declaration
    var _pro;
    /**
     * 项目模块基类对象
     * @class   {_$$ModuleLayoutSystem}
     * @extends {_$$Module}
     * @param   {Object}  可选配置参数，已处理参数列表如下所示
     */
    _p._$$ModuleLayoutSystem = _k._$klass();
    _pro = _p._$$ModuleLayoutSystem._$extend(_m._$$Module);
    /**
     * 构建模块
     * @return {Void}
     */
    _pro.__doBuild = function () {
        this.__body = _e._$html2node(
            _t0._$getTextTemplate('module-id-3')
        );
    };

    _pro.__onShow = function (_options) {
        this.__super(_options);
        // 处理事件
        var btns = $('#btm-btns');
        console.log(btns)
        // $(btns)._$click(function (_e) {
        //     console.log(_e);
        // })
        var items = $('.item');
        var that = this;
        btns._$on('click', function (e) {
            if (!$(e.target)._$hasClassName('add-btn')) {
                for (var i = 0; i < items.length; i++) {
                    $(items[i])._$delClassName('hl');
                }
                $(e.target)._$parent()._$parent()._$addClassName('hl');
            } else {
                that.__doSendMessage(
                    '/m/today/',{type:'add'}
                );

            }
        })
    }

    // notify dispatcher
    _t1._$regist('layout-btm', _p._$$ModuleLayoutSystem);
});