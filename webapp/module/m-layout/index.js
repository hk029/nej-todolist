/*
 * ------------------------------------------
 * 项目模块基类实现文件
 * @version  1.0
 * @author   voidsky(hk2291976@hotmail.com)
 * ------------------------------------------
 */
NEJ.define([
  'base/klass',
  'base/element',
  'util/template/tpl',
  'util/dispatcher/module',
  'mypro/module',
  'util/chain/NodeList'
],function(_k,_e,_t0,_t1,_m,$,_p,_o,_f,_r){
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
   * 解析模块所在容器节点
   * @param  {Object} 配置信息
   * @return {Node}   模块所在容器节点
   */
  _pro.__doParseParent = function(_options){
      return _e._$get('md-box');
  };
  /**
   * 构建模块
   * @return {Void}
   */
  _pro.__doBuild = function(){
      this.__body = _e._$html2node(
          _t0._$getTextTemplate('module-id-0')
      );
      // 0 - tab box
      // 1 - module box
      var _list = _e._$getByClassName(this.__body,'row');
      this.__export = {
          top:_list[0],
          parent:_list[1],
          btm:_list[2]
      //     parent:_list[1]
      };
  };
  _pro.__onShow = function (_options) {
    this.__super(_options); 
      console.log($('.m-ctr'))
      $('.m-ctr')._$style('height',document.body.clientHeight - 154 + 'px');
  }
  // notify dispatcher
  _t1._$regist('layout-system',_p._$$ModuleLayoutSystem);
});
