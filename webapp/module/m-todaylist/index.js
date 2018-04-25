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
            _t0._$getTextTemplate('module-id-today')
        );
        console.log('today build')
        // 添加模板
        _j._$add('task-template');
        // 看localStroage里有没有数据
        this.__curEdit = -1;
        this.__data = _s._get('tasklist');
    };

    /**
     * 修改任务列表，主要处理以下业务逻辑
     * - 修改列表内容
     * - 将事项调换顺序
     * - 删除事项
     * @param  pos 位置  options 选项
     * @return {Void}
     */


    _pro.__changeList = function (pos, options) {
        var name = this.__data.tasklist[pos].taskname;
        var state = this.__data.tasklist[pos].done;
        // 提供options 说明是更改特定的任务
        if (options) {
            //修改task名称或状态
            this.__data.tasklist[pos].taskname = options.taskname === undefined ? name : options.taskname;
            this.__data.tasklist[pos].done = options.done === undefined ? state : options.done;
            // 根据状态选择插入开头或结尾
            if (options.done !== undefined) {
                if (state == true) { // 从完成到未完成，移动到开头
                    this.__data.tasklist.unshift(this.__data.tasklist.splice(pos, 1)[0]);
                } else {
                    this.__data.tasklist.push(this.__data.tasklist.splice(pos, 1)[0]);
                }
            }
        } else { //没提供options  说明是删除任务
            this.__data.tasklist.splice(pos, 1);
        }
        // 更新页面
        this.__events.onrefresh(this.__data);
        // 把修改同步到loalstorage
        _s._set('tasklist', this.__data);
    }
    /**
     * 显示模块，主要处理以下业务逻辑
     * - 添加事件
     * - 分配组件
     * - 处理输入信息
     * @param  {Object} 输入参数
     * @return {Void}
     */
    _pro.__onShow = function (_options) {
        this.__super(_options);
        var that = this;
        this.__list = $('#task-content');
        // 如果有数据则调用更新
        if (this.__data) {
            this.__events.onrefresh(this.__data);
        } else {
            this.__data = {
                tasklist: [{
                        taskname: '单击标题编辑',
                        done: 0
                    },
                    {
                        taskname: '清空标题，删除事项',
                        done: 0
                    },
                    {
                        taskname: '点击 + ，新增任务',
                        done: 0
                    },
                    {
                        taskname: '<-单击图标更改完成状态',
                        done: 1
                    }
                ]
            };
            _s._set('tasklist', this.__data);
            this.__events.onrefresh(this.__data);
        }
        // 处理点击事件

        $('body')._$on('click', function (_e) {
            console.log(_e)
            var _target = $(_e.target);
            var no = _target._$parent()._$attr('no');
            var edit = that.__curEdit;
            // 说明之前有编辑的内容
            if (edit >= 0) {
                // 设置当前编辑编号为-1
                that.__curEdit = -1;
                var val = $('input')[edit].value;
                //查看内容是否为空
                if (val.length) { //不为空说明是修改标题
                    that.__changeList(edit, {
                        taskname: val
                    });
                } else { //如果为空说明为删除
                    that.__changeList(edit)
                }
            }
            // 说明是点击的图标，则切换状态
            if (_target[0].tagName === 'IMG' && _target[0].className === 'checkico') {
                // 记录当前状态
                var done = that.__data.tasklist[no].done;
                that.__changeList(no, {
                    done: !done
                });
            } else if (_target[0].tagName === 'INPUT' && _target[0].className === 'text') {
                // 表示当前位置正在编辑
                that.__curEdit = no;
                // 把输入框内文字全选中
                if(_target._$val() === '新建事项（单击编辑）'){
                    _target._$val('');
                }
                console.log(_target);
                // _target[0].onfocus();
                _target[0].selectionStart = 0;
                _target[0].selectionEnd = _target._$val().length;

            } else {

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

    _pro.__onRefresh = function (_options) {
        this.__super(_options);
        // 根据数据刷新内容
        if (_options.tasklist) {
            var _html = _j._$get('task-template', _options);
            $(this.__list)._$html(_html);
        }
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
    _pro.__onMessage = function (_event) {
        // _event.from 消息来源
        // _event.data 消息数据，这里可能是 {a:'aaaaaa',b:'bbbbbbbbb'}
        switch (_event.data.type) {
            case 'add':
                this.__data.tasklist.unshift({
                    taskname: "新建事项（单击编辑）",
                    done: 0
                })
                this.__events.onrefresh(this.__data);
                break;
            default:

        }
    };
    // notify dispatcher
    _t1._$regist('layout-todaylist', _p._$$ModuleLayoutSystem);
});