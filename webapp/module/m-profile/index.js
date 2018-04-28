NEJ.define([
   'base/klass',
   'base/element',
   'util/template/tpl',
   'util/template/jst',
   'util/dispatcher/module',
   'mypro/module'
],function(_k,_e,_t0,_j,_t1,_m,_p,_o,_f,_r){
   var _pro;
   _p._$$ModuleLayoutSystem = _k._$klass();
   _pro = _p._$$ModuleLayoutSystem._$extend(_m._$$Module);
   _pro.__doBuild = function(){
       this.__body = _e._$html2node(
           _t0._$getTextTemplate('module-id-profile')  // 这个地方载入的模板Id
       );
   };
   // 这里是模块全局注册的id，到时候模块使用的需要用，全局
   _t1._$regist('layout-profile',_p._$$ModuleLayoutSystem);
});
