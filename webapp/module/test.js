NEJ.define([
  'base/klass',
  'base/element',
  'util/template/tpl',
  'util/dispatcher/module',
  'path/to/module'
], function (_k, _e, _t0, _t1, _m, _p, _o, _f, _r) {
  var _pro;
  _p._$$ModuleLayoutSystem = _k._$klass();
  _pro = _p._$$ModuleLayoutSystem._$extend(_m._$$Module);

  //最外层的模块需要定义挂载点,其他的子模块不需要这一部分
  _pro.__doParseParent = function (_options) {
    return _e._$get('md-box');
  };

  _pro.__doBuild = function () {
    this.__body = _e._$html2node(
      _t0._$getTextTemplate('module-id-test')  // 这个地方载入的模板Id
    );
    this.__export = {
      tab: _e._$getByClassName(this.__body, 'left'),
      parent: _e._$getByClassName(this.__body, 'content')
    };
  };

  // 这里是模块全局注册的id，到时候模块使用的需要用，全局唯一
  _t1._$regist('layout-test', _p._$$ModuleLayoutSystem);
});