NEJ.define([
    'base/klass',
    'base/element',
    'util/template/tpl',
    'util/template/jst',
    'util/dispatcher/module',
    'mypro/module/module',
    'util/chain/NodeList',
    'mypro/stroage'
], function (_k, _e, _t0, _j, _t1, _m, $, _s, _p, _o, _f, _r) {
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
            _t0._$getTextTemplate('module-id-history')
        );
        // 添加模板
        console.log('his build')
        _j._$add('his-template');
        // 看localStroage里有没有数据
        this.__curEdit = -1;
        this.__hisdata = _s._get('hislist');
    };

    /**
     * 显示模块，主要处理以下业务逻辑
     * - 添加事件
     * - 分配组件
     * - 处理输入信息
     * @param  {Object} 输入参数
     * @return {Void}
     */

    // _pro.renderList = function(_options){
    //     if(_options.tasklist){
    //         //   // 返回整合数据后的html代码
    //           var _html = _j._$get('task-template',_options);
    //           $(this.__list)._$html(_html);
    //     }
    // }
    // _pro.
    _pro.__onShow = function (_options) {
        this.__super(_options);
        var that = this;
        this.__hislist = $('#his-content');
        // 如果有数据则调用更新
        if (this.__hisdata) {
            this.__events.onrefresh(this.__hisdata);
        } else {
            this.__hisdata = {
                hislist: [{
                    date: '2018-04-25',
                    tasks: [{
                            taskname: '收拾行李',
                            done: 1
                        },
                        {
                            taskname: '看电影',
                            done: 1
                        },
                        {
                            taskname: '制定旅行计划',
                            done: 1
                        }
                    ]
                },{
                date: '2018-04-24',
                    tasks: [{
                            taskname: '买菜',
                            done: 0
                        },
                        {
                            taskname: '背单词',
                            done: 1
                        }
                    ]
                }]
            };
            _s._set('hislist',this.__hisdata);
            this.__events.onrefresh(this.__hisdata);
        }
        // 处理点击事件
    };
    /**
     * 刷新模块，主要处理以下业务逻辑
     * - 分配组件，分配之前需验证
     * - 处理输入信息
     * - 同步状态
     * - 载入数据
     * @return {Void}
     */

    _pro.__onRefresh = function (_options) {
        this.__super(_options);
        if (_options.hislist) {
            //   // 返回整合数据后的html代码
            //   console.log(_options)
            var _html = _j._$get('his-template', _options);
            $(this.__hislist)._$html(_html);
            //   console.log(this.__list);
            //   console.log(_html);
        }

        // TODO
    };
    /**
     * 隐藏模块，主要处理以下业务逻辑
     * - 回收事件
     * - 回收组件
     * - 尽量保证恢复到构建时的状态
     * @return {Void}
     */
    _pro.__onHide = function () {
        this.__super();
        // TODO
    };
    // _pro.__onMessage = function (_event) {
       
    // };
    // notify dispatcher
    _t1._$regist('layout-hislist', _p._$$ModuleLayoutSystem);
});