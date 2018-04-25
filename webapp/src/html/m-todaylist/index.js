NEJ.define([
   'base/klass',
   'base/element',
   'util/template/tpl',
   'util/template/jst',
   'util/dispatcher/module',
    'mypro/module/module',
    'util/chain/NodeList',
    'mypro/stroage'
],function(_k,_e,_t0,_j,_t1,_m,$,_s,_p,_o,_f,_r){
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
           _t0._$getTextTemplate('module-id-today')
       );
       // 添加模板
       _j._$add('task-template');
       // 看localStroage里有没有数据
       this.__curEdit = -1;
       this.__data = _s._get('tasklist');
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
    _pro.__onShow = function(_options){
        this.__super(_options);
        var that = this;
        this.__list = $('#task-content');
        // 如果有数据则调用更新
        if(this.__data){
            this.__events.onrefresh(this.__data);
        }
        else {
            _s._set('tasklist',{tasklist:[
                    {taskname:'单击标题编辑',checked:0},
                    {taskname:'清空标题，删除事项',checked:0},
                    {taskname:'点击 + ，新增任务',checked:0},
                    {taskname:'<-单击图标更改完成状态',checked:1}
                ]
            });
        }
        // 处理点击事件
  
        $('body')._$on('click',function(_e){
            var _target = $(_e.target);
            var no = _target._$parent()._$attr('no');
            var edit = that.__curEdit;
            // 说明之前有编辑的内容
            if(edit >= 0){
                that.__curEdit = -1;
                var val = $('input')[edit].value;
                //查看内容是否为空
                if(val.length){ //不为空说明是修改标题
                    that.__data.tasklist[edit].taskname = val;
                } else { //如果为空说明为删除
                    that.__data.tasklist.splice(edit,1);
                    that.__events.onrefresh(that.__data); 
                }
            }
            // 说明是点击的图标，则切换状态
            if(_target[0].tagName === 'IMG' && _target[0].className === 'checkico'){
                // 记录当前状态
                // debugger
                var checked = that.__data.tasklist[no].checked;
                that.__data.tasklist[no].checked = !checked;
                var del = that.__data.tasklist.splice(no,1)[0];
                // 根据状态选择插入开头或结尾
                if(checked){
                    that.__data.tasklist.unshift(del);
                }else {
                    that.__data.tasklist.push(del);
                }
                // 刷新列表
                that.__events.onrefresh(that.__data); 

            }else if(_target[0].tagName === 'INPUT'&& _target[0].className === 'text'){
                // 表示当前位置正在编辑
                that.__curEdit = no;
                _target[0].selectionStart = 0;
                _target[0].selectionEnd = _target._$val().length;
            }
            else {

            }
            // console.log($(_target[0]))
            // console.log(e);
        })
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
        if(_options.tasklist){
            //   // 返回整合数据后的html代码
            //   console.log(_options)
              var _html = _j._$get('task-template',_options);
              $(this.__list)._$html(_html);
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
    _pro.__onHide = function(){
        this.__super();
        // TODO
    };
    _pro.__onMessage = function(_event){
        // _event.from 消息来源
        // _event.data 消息数据，这里可能是 {a:'aaaaaa',b:'bbbbbbbbb'}
        switch(_event.data.type){
            case 'add':
                this.__data.tasklist.unshift({taskname:"新建事项（单击编辑）",checked:0})
                this.__events.onrefresh(this.__data);
            break;
            default:
            
        }
    };
   // notify dispatcher
   _t1._$regist('layout-todaylist',_p._$$ModuleLayoutSystem);
});
