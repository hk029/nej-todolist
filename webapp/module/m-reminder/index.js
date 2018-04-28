NEJ.define([
   'base/klass',
   'base/element',
   'util/template/tpl',
   'util/template/jst',
   'util/dispatcher/module',
    'mypro/module'
],function(_k,_e,_t0,_j,_t1,_m,_p,_o,_f,_r){
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

//    _pro = _p._$$ModuleLayoutSystem._$extend(_t0._$$ModuleAbstract);
   /**
    * 构建模块
    * @return {Void}
    */
   _pro.__doBuild = function(){
       this.__body = _e._$html2node(
           _t0._$getTextTemplate('module-id-reminder')
       );
       // 0 - tab box
       // 1 - module box
    //    var _list = _e._$getByClassName(this.__body,'j-flag');
    //    this.__export = {
    //        tab:_list[0],
    //        parent:_list[1]
    //    };
   };
   /**
     * 显示模块，主要处理以下业务逻辑
     * - 添加事件
     * - 分配组件
     * - 处理输入信息
     * @param  {Object} 输入参数
     * @return {Void}
     */
    _pro.__onShow = function(_options){
        this.__super(_options);
        // TODO
    };
    /**
     * 刷新模块，主要处理以下业务逻辑
     * - 分配组件，分配之前需验证
     * - 处理输入信息
     * - 同步状态
     * - 载入数据
     * @return {Void}
     */
    _pro.__onRefresh = function(_options){
        this.__super(_options);
        // TODO
    };
    /**
     * 隐藏模块，主要处理以下业务逻辑
     * - 回收事件
     * - 回收组件
     * - 尽量保证恢复到构建时的状态
     * @return {Void}
     */
    _pro.__onHide = function(){
        this.__super();
        // TODO
    };
   // notify dispatcher
   _t1._$regist('layout-reminder',_p._$$ModuleLayoutSystem);
});
