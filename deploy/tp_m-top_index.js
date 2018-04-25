cant read file /Users/voidsky/project/nej项目/prj/easytodo/webapp/src/javascript/module/module.js for utf-8, cause:
{"errno":-2,"code":"ENOENT","syscall":"open","path":"/Users/voidsky/project/nej项目/prj/easytodo/webapp/src/javascript/module/module.js"}
I$('b4c10c72d2fbc30cb8280e8fc49e5427',function (_k,_e,_t0,_t1,_m,_p,_o,_f,_r){
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
   _pro.__doBuild = function(){
       this.__body = _e._$html2node(
           _t0._$getTextTemplate('module-id-1')
       );
       console.log('tbuild')
       
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
},'7d45f691904093dd3d0d2a39eb337c1c','43a92a1cb30f0322e2bca627e0f6b635','73f169cf794774f1be9fb45582c96a38','16c6ee60c6b3ca72fb25ef265bef87a8','93b8a5cff3bc65dfb8a5663b3c598f3b');