cant read file /Users/voidsky/project/nej项目/prj/easytodo/webapp/src/javascript/module/module.js for utf-8, cause:
{"errno":-2,"code":"ENOENT","syscall":"open","path":"/Users/voidsky/project/nej项目/prj/easytodo/webapp/src/javascript/module/module.js"}
I$('9438b9469ca40e4b569159f4e000c989',function (_k,_e,_t0,_t1,_m,_p,_o,_f,_r){
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
       return _e._$get('module-box1');
   };
   /**
    * 构建模块
    * @return {Void}
    */
   _pro.__doBuild = function(){
       this.__body = _e._$html2node(
           _t0._$getTextTemplate('module-id-l1')
       );
       // 0 - tab box
       // 1 - module box
    //    var _list = _e._$getByClassName(this.__body,'j-flag');
    //    this.__export = {
    //        tab:_list[0],
    //        parent:_list[1]
    //    };
   };
   // notify dispatcher
   _t1._$regist('layout-top',_p._$$ModuleLayoutSystem);
},'4dbf86894686ec171232e44fe22d09e6','2cbe3a448bba7b1d33c589b416740b7d','929c213084c0de3b2c5cd922ffae12b1','cdd6192ab404d5fe837a212d285853b0','93b8a5cff3bc65dfb8a5663b3c598f3b');