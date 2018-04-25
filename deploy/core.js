if (typeof I$==="undefined"){I$=(function() {
    var o = {},
        f = function() {return !1;},
        cache = {};
    var is = function(data,type){
        return o.toString.call(data)==='[object '+type+']';
    };
    return function(key,func) {
        var result = cache[key],
            isfunc = is(func,'Function');
        // func is data
        if (func!=null&&!isfunc){
            result = func;
        }
        // do function defined
        if (isfunc){
            var arr = [];
            for(var i=2,l=arguments.length;i<l;i++){
                arr.push(arguments.callee(arguments[i]));
            }
            var exports = {};
            arr.push.call(arr,exports,{},f,[]);
            var ret = func.apply(null,arr)||exports;
            if (!result||!is(ret,'Object')){
                // for non-object return
                result = ret;
            }else{
                // for namespace return
                // bad performance for-in in v8 for instance
                if (!!Object.keys){
                    for(var ls=Object.keys(ret),i=0,l=ls.length,x;i<l;i++){
                        x = ls[i];
                        result[x] = ret[x];
                    }
                }else{
                    for(var x in ret){
                        result[x] = ret[x];
                    }
                }
            }
        }
        // init data
        if (result==null){
            result = {};
        }
        cache[key] = result;
        // return
        return result;
    };
})();;}
I$('083c017e2a5450e295d417651bc93279',function (_p,_o,_f,_r){
    var _extpro = Function.prototype;
    /**
     * AOP增强操作，增强操作接受一个输入参数包含以下信息
     *
     *  | 参数名称 | 参数类型  | 参数描述 |
     *  | :--     | :--      | :-- |
     *  | args    | Array    | 函数调用时实际输入参数，各增强操作中可以改变值后将影响至后续的操作 |
     *  | value   | Variable | 输出结果 |
     *  | stopped | Boolean  | 是否结束操作，终止后续操作 |
     *
     * @method external:Function#_$aop
     * @param  {Function} arg0 - 前置操作，接受一个输入参数，见描述信息
     * @param  {Function} arg1 - 后置操作，接受一个输入参数，见描述信息
     * @return {Function}        增强后操作函数
     */
    _extpro._$aop = function(_before,_after){
        var _after = _after||_f,
            _before = _before||_f,
            _handler = this;
        return function(){
            var _event = {args:_r.slice.call(arguments,0)};
            _before(_event);
            if (!_event.stopped){
                _event.value = _handler.apply(this,_event.args);
                _after(_event);
            }
            return _event.value;
        };
    };
    /**
     * 绑定接口及参数，使其的调用对象保持一致
     *
     *  ```javascript
     *  var scope = {a:0};
     * 
     *  var func = function(a,b){
     *      // 第一个参数 ：1
     *      console.log(a);
     *      // 第二个参数 ： 2
     *      consoel.log(b);
     *      // 当前this.a ： 0
     *      console.log(this.a);
     *  };
     * 
     *  func._$bind(scope,"1")(2);
     *  ```
     *
     * @method external:Function#_$bind
     * @see    external:Function#_$bind2
     * @param  {Object} arg0 - 需要保持一致的对象，null表示window对象，此参数外的其他参数作为绑定参数
     * @return {Function}      返回绑定后的函数
     */
    _extpro._$bind = function() {
        var _args = arguments,
            _object = arguments[0],
            _function = this;
        return function(){
            // not use slice for chrome 10 beta and Array.apply for android
            var _argc = _r.slice.call(_args,1);
            _r.push.apply(_argc,arguments);
            return _function.apply(_object||null,_argc);
        };
    };
    /**
     * 绑定接口及参数，使其的调用对象保持一致，
     * 该接口与_$bind接口的差别在于绑定时参数和调用时参数的顺序不一样，
     * _$bind优先传入绑定时参数，_$bind2优先传入调用时参数
     *
     *  ```javascript
     *  var scope = {a:0};
     * 
     *  var func = function(a,b){
     *      // 第一个参数 ：2
     *      console.log(a);
     *      // 第二个参数 ： 1
     *      consoel.log(b);
     *      // 当前this.a ： 0
     *      console.log(this.a);
     *  };
     * 
     *  func._$bind(scope,"1")(2);
     *  ```
     *
     * @method external:Function#_$bind2
     * @see    external:Function#_$bind
     * @param  {Object} arg0 - 需要保持一致的对象，null表示window对象，此参数外的其他参数作为绑定参数
     * @return {Function}      返回绑定后的事件函数
     */
    _extpro._$bind2 = function() {
        var _args = arguments,
            _object = _r.shift.call(_args),
            _function = this;
        return function(){
            _r.push.apply(arguments,_args);
            return _function.apply(_object||null,arguments);
        };
    };
    // for compatiable
    var _extpro = String.prototype;
    if (!_extpro.trim){
         _extpro.trim = (function(){
            var _reg = /(?:^\s+)|(?:\s+$)/g;
            return function(){
                return this.replace(_reg,'');
            };
         })();
    }
    if (!this.console){
        this.console = {
            log:_f,
            error:_f
        };
    }

    if (CMPT){
        NEJ = this.NEJ||{};
        // copy object properties
        // only for nej compatiable
        NEJ.copy = function(a,b){
            a = a||{};
            b = b||_o;
            for(var x in b){
                if (b.hasOwnProperty(x)){
                    a[x] = b[x];
                }
            }
            return a;
        };
        // NEJ namespace
        NEJ = NEJ.copy(
            NEJ,{
                O:_o,R:_r,F:_f,
                P:function(_namespace){
                    if (!_namespace||!_namespace.length){
                        return null;
                    }
                    var _package = window;
                    for(var a=_namespace.split('.'),
                            l=a.length,i=(a[0]=='window')?1:0;i<l;
                            _package=_package[a[i]]=_package[a[i]]||{},i++);
                    return  _package;
                }
            }
        );
        
        return NEJ;
    }

    return _p;
});
I$('eb6d346317b1f5d7b22b71598ce3d4c2',function (_p,_o,_f,_r){
    /**
     * 遍历对象
     * @param  {Object}   对象
     * @param  {Function} 迭代回调
     * @param  {Object}   回调执行对象
     * @return {String}   循环中断时的key值
     */
    _p.__forIn = function(_obj,_callback,_this){
        if (!_obj||!_callback){
            return null;
        }
        var _keys = Object.keys(_obj);
        for(var i=0,l=_keys.length,_key,_ret;i<l;i++){
            _key = _keys[i];
            _ret = _callback.call(
                _this||null,
                _obj[_key],_key,_obj
            );
            if (!!_ret){
                return _key;
            }
        }
        return null;
    };
    /**
     * 遍历列表
     * @param  {Array}    列表
     * @param  {Function} 迭代回调
     * @param  {Object}   回调执行对象
     * @return {Void}
     */
    _p.__forEach = function(_list,_callback,_this){
        _list.forEach(_callback,_this);
    };
    /**
     * 集合转数组
     * @param  {Object} 集合
     * @return {Array}  数组
     */
    _p.__col2array = function(_list){
        return _r.slice.call(_list,0);
    };
    /**
     * YYYY-MM-DDTHH:mm:ss.sssZ格式时间串转时间戳
     * @param  {String} 时间串
     * @return {Number} 时间戳
     */
    _p.__str2time = function(_str){
        return Date.parse(_str);
    };
    
    return _p;
});
I$('d552af5339ac27c31f311f3fdadefdc3',function (NEJ,_p,_o,_f,_r){
    var _platform  = this.navigator.platform,
        _useragent = this.navigator.userAgent;
    /**
     * 平台判断信息
     * 
     * ```javascript
     * NEJ.define([
     *     'base/platform'
     * ],function(_m){
     *     var _is = _m._$IS;
     *     // 是否MAC系统
     *     console.log(_is.mac);
     *     // 是否IPhone
     *     console.log(_is.iphone);
     *     // ...
     * });
     * ```
     * 
     * @const    module:base/platform._$IS
     * @see      module:base/platform._$is
     * @type     {Object}
     * @property {Boolean} mac     - 是否Mac系统
     * @property {Boolean} win     - 是否windows系统
     * @property {Boolean} linux   - 是否linux系统
     * @property {Boolean} ipad    - 是否Ipad
     * @property {Boolean} iphone  - 是否IPhone
     * @property {Boolean} android - 是否Android系统
     * @property {Boolean} ios     - 是否IOS系统
     * @property {Boolean} tablet  - 是否平板
     * @property {Boolean} desktop - 是否桌面系统
     */
    var _is = {
        mac     : _platform,
        win     : _platform,
        linux   : _platform,
        ipad    : _useragent,
        ipod    : _useragent,
        iphone  : _platform,
        android : _useragent
    };
    _p._$IS = _is;
    for(var x in _is){
        _is[x] = new RegExp(x,'i').test(_is[x]);
    }
    _is.ios = _is.ipad||_is.iphone||_is.ipod;
    _is.tablet = _is.ipad;
    _is.desktop = _is.mac||_is.win||(_is.linux&&!_is.android);
    /**
     * 判断是否指定平台
     * 
     * ```javascript
     * NEJ.define([
     *     'base/platform'
     * ],function(_m){
     *     // 是否MAC系统
     *     console.log(_m._$is('mac'));
     *     // 是否iphone
     *     console.log(_m._$is('iphone'));
     *     // ...
     * });
     * ```
     * 
     * @method module:base/platform._$is
     * @see    module:base/platform._$IS
     * @param  {String} arg0 - 平台名称
     * @return {Boolean}       是否指定平台
     */
    _p._$is = function(_platform){
        return !!_is[_platform];
    };
    // parse kernel information
    /**
     * 引擎内核信息
     * 
     * ```javascript
     * NEJ.define([
     *     'base/platform'
     * ],function(_m){
     *     var _kernel = _m._$KERNEL;
     *     // 打印平台信息
     *     console.log(_kernel.engine);
     *     console.log(_kernel.release);
     *     console.log(_kernel.browser);
     *     console.log(_kernel.version);
     * });
     * ```
     * 
     * @const    module:base/platform._$KERNEL
     * @type     {Object}
     * @property {String} engine  - 布局引擎，trident/webkit/gecko/presto...
     * @property {Number} release - 布局引擎版本
     * @property {String} browser - 浏览器名称，ie/chrome/safari/opera/firefox/maxthon...
     * @property {Number} version - 浏览器版本
     * @property {Object} prefix  - 平台前缀，html5/css3 attribute/method/constructor
     */
    var _kernel = {
        engine:'unknow',
        release:'unknow',
        browser:'unknow',
        version:'unknow',
        prefix:{css:'',pro:'',clz:''}
    };
    _p._$KERNEL  = _kernel;
    if (/msie\s+(.*?);/i.test(_useragent)||
        /trident\/.+rv:([\d\.]+)/i.test(_useragent)){
        _kernel.engine  = 'trident';
        _kernel.browser = 'ie';
        _kernel.version = RegExp.$1;
        _kernel.prefix  = {css:'ms',pro:'ms',clz:'MS',evt:'MS'};
        // 4.0-ie8 5.0-ie9 6.0-ie10 7.0-ie11
        // adjust by document mode setting in develop toolbar
        var _test = {6:'2.0',7:'3.0',8:'4.0',9:'5.0',10:'6.0',11:'7.0'};
        _kernel.release = _test[document.documentMode]||
                          _test[parseInt(_kernel.version)];
    }else if(/webkit\/?([\d.]+?)(?=\s|$)/i.test(_useragent)){
        _kernel.engine  = 'webkit';
        _kernel.release = RegExp.$1||'';
        _kernel.prefix  = {css:'webkit',pro:'webkit',clz:'WebKit'};
    }else if(/rv\:(.*?)\)\s+gecko\//i.test(_useragent)){
        _kernel.engine  = 'gecko';
        _kernel.release = RegExp.$1||'';
        _kernel.browser = 'firefox';
        _kernel.prefix  = {css:'Moz',pro:'moz',clz:'Moz'};
        if (/firefox\/(.*?)(?=\s|$)/i.test(_useragent))
            _kernel.version = RegExp.$1||'';
    }else if(/presto\/(.*?)\s/i.test(_useragent)){
        _kernel.engine  = 'presto';
        _kernel.release = RegExp.$1||'';
        _kernel.browser = 'opera';
        _kernel.prefix  = {css:'O',pro:'o',clz:'O'};
        if (/version\/(.*?)(?=\s|$)/i.test(_useragent))
            _kernel.version = RegExp.$1||'';
    }
    if (_kernel.browser=='unknow'){
        var _test = ['chrome','maxthon','safari'];
        for(var i=0,l=_test.length,_name;i<l;i++){
            if (_test[i] == 'safari') {
                _name = 'version';
            } else if (_test[i] == 'chrome') {
                _name = '[chrome|CriOS]'; // CriOS is Google Chrome for iOS
            } else {
                _name = _test[i];
            }
            if (new RegExp(_name+'/(.*?)(?=\\s|$)','i').test(_useragent)){
                _kernel.browser = _test[i];
                _kernel.version = RegExp.$1.trim();
                break;
            }
        }
    }
    /**
     * 引擎特性支持信息
     * 
     * ```javascript
     * NEJ.define([
     *     'base/platform'
     * ],function(_m){
     *     var _support = _m._$SUPPORT;
     *     // 打印平台是否支持CSS3 3D特效
     *     console.log(_support.css3d);
     * });
     * ```
     * @const    module:base/platform._$SUPPORT
     * @see      module:base/platform._$support
     * @type     {Object}
     * @property {Boolean} css3d  - 是否支持CSS3 3D
     */
    _p._$SUPPORT = {};
    /**
     * 判断平台是否支持指定特性
     * 
     * ```javascript
     * NEJ.define([
     *     'base/platform'
     * ],function(_m){
     *     // 是否支持CSS3 3D特效
     *     console.log(_m._$support('css3d'));
     * });
     * ```
     * 
     * @method module:base/platform._$support
     * @see    module:base/platform._$SUPPORT
     * @param  {String} arg0 - 特性标识
     * @return {Boolean}       是否支持指定特性
     */
    _p._$support = function(_feature){
        return !!_p._$SUPPORT[_feature];
    };
    
    if (CMPT){
        NEJ.copy(NEJ.P('nej.p'),_p);
    }
    
    return _p;
},'083c017e2a5450e295d417651bc93279');
I$('3d5e532482be00d99bd99a6d0a18067d',function(_h,_m,_p,_o,_f,_r){if (_m._$KERNEL.engine==='trident'&&_m._$KERNEL.release<='4.0'){I$('d31aba584a0ccf4dea0cd5e449c4dbda',function (){
        /**
         * 遍历对象
         * @param  {Object}   对象
         * @param  {Function} 迭代回调
         * @param  {Object}   回调执行对象
         * @return {String}   循环中断时的key值
         */
        _h.__forIn = function(_obj,_callback,_this){
            if (!_obj||!_callback){
                return;
            }
            // iterate
            var _ret;
            for(var x in _obj){
                if (!_obj.hasOwnProperty(x)) continue;
                _ret = _callback.call(_this,_obj[x],x,_obj);
                if (!!_ret){
                    return x;
                }
            }
        };
        /**
         * 遍历列表
         * @param  {Array}    列表
         * @param  {Function} 迭代回调
         * @param  {Object}   回调执行对象
         * @return {Void}
         */
        _h.__forEach = function(_list,_callback,_this){
            for(var i=0,l=_list.length;i<l;i++){
                _callback.call(_this,_list[i],i,_list);
            }
        };
        /**
         * 集合转数组
         * @param  {Object} 集合
         * @return {Array}  数组
         */
        _h.__col2array = function(_list){
            var _result = [];
            if (!!_list&&!!_list.length){
                for(var i=0,l=_list.length;i<l;i++){
                    _result.push(_list[i]);
                }
            }
            return _result;
        };
        /**
         * YYYY-MM-DDTHH:mm:ss.sssZ格式时间串转时间戳
         * @param  {String} 时间串
         * @return {Number} 时间戳
         */
        _h.__str2time = (function(){
            var _reg = /-/g;
            return function(_str){
                // only support YYYY/MM/DDTHH:mm:ss
                return Date.parse(_str.replace(_reg,'/').split('.')[0]);
            };
        })();
    });}return _h;},'eb6d346317b1f5d7b22b71598ce3d4c2','d552af5339ac27c31f311f3fdadefdc3');
I$('7d45f691904093dd3d0d2a39eb337c1c',function (NEJ,_u,_p,_o,_f,_r){
    /**
     * 定义类，通过此api定义的类具有以下特性：
     *
     * * {@link external:Function#_$extend|_$extend}作为类的静态扩展方法
     * * __init作为类的初始化函数
     * * __super作为子类调用父类的同名函数
     *
     * ```javascript
     * NEJ.define([
     *     'base/klass'
     * ],function(k,p){
     *     // 定义类A
     *     p.A = k._$klass();
     *     var pro = A.prototype;
     *     // 初始化
     *     pro.__init = function(){
     *          // do init
     *     };
     *     // 类接口
     *     pro.__doSomething = function(a){
     *         // TODO something
     *     };
     * 
     *     return p;
     * });
     * ```
     * 
     * ```javascript
     * NEJ.define([
     *     'base/klass',
     *     '/path/to/class/a.js'
     * ],function(k,a,p){
     *     // 定义类B，并继承自A
     *     p.B = k._$klass();
     *     var pro = B._$extend(a.A);
     *     // 初始化
     *     pro.__init = function(){
     *         // 调用A的初始化逻辑
     *         this.__super();
     *         // TODO B的初始化逻辑
     *     };
     *     // 类接口
     *     pro.__doSomething = function(a){
     *         // 调用A的__doSomething接口
     *         this.__super(a);
     *         // TODO B的逻辑
     *     };
     * 
     *     return p;
     * });
     * ```
     * 
     * @method module:base/klass._$klass
     * @see    external:Function#_$extend
     * @return {Function} 返回定义的类
     */
    _p._$klass = (function(){
        var _isNotFunction = function(){
            return _o.toString.call(arguments[0])!=='[object Function]';
        };
        var _doFindIn = function(_method,_klass){
            while(!!_klass){
                var _pro = _klass.prototype,
                    _key = _u.__forIn(_pro,function(v){
                        return _method===v;
                    });
                if (_key!=null){
                    return {
                        name:_key,
                        klass:_klass
                    };
                }
                _klass = _klass._$super;
            }
        };
        return function(){
            // class constructor
            var _Klass = function(){
                return this.__init.apply(this,arguments);
            };
            _Klass.prototype.__init = _f;
            /**
             * 子类继承父类
             *
             * ```javascript
             * NEJ.define([
             *     'base/klass'
             * ],function(k,p){
             *     // 定义类A
             *     p.A = k._$klass();
             *     var pro = A.prototype;
             *     // 初始化
             *     pro.__init = function(){
             *          // do init
             *     };
             *     // 类接口
             *     pro.__doSomething = function(a){
             *         // TODO something
             *     };
             * 
             *     return p;
             * });
             * ```
             * 
             * ```javascript
             * NEJ.define([
             *     'base/klass',
             *     '/path/to/class/a.js'
             * ],function(k,a,p){
             *     // 定义类B，并继承自A
             *     p.B = k._$klass();
             *     var pro = B._$extend(a.A);
             *     // 初始化
             *     pro.__init = function(){
             *         // 调用A的初始化逻辑
             *         this.__super();
             *         // TODO B的初始化逻辑
             *     };
             *     // 类接口
             *     pro.__doSomething = function(a){
             *         // 调用A的__doSomething接口
             *         this.__super(a);
             *         // TODO B的逻辑
             *     };
             * 
             *     return p;
             * });
             * ```
             *
             * @method external:Function#_$extend
             * @see    module:base/klass._$klass
             * @param  {Function} arg0 - 父类
             * @param  {Boolean}  arg1 - 是否拷贝父类的静态方法，默认拷贝父类静态方法
             * @return {Object}          扩展类的prototype对象
             */
            _Klass._$extend = function(_super,_static){
                if (_isNotFunction(_super)){
                    return;
                }
                // for static method
                var _this = this;
                if (_static!==!1){
                    _u.__forIn(_super,function(v,k){
                        if (!_isNotFunction(v)){
                            _this[k] = v;
                        }
                    });
                }
                // do inherit
                this._$super = _super;
                var _parent = function(){};
                _parent.prototype = _super.prototype;
                this.prototype = new _parent();
                this.prototype.constructor = this;
                // for super method call
                var _stack = [],
                    _phash = {};
                var _doUpdateCache = function(_method,_klass){
                    var _result = _doFindIn(_method,_klass);
                    if (!_result) return;
                    // save state
                    if (_stack[_stack.length-1]!=_result.name){
                        _stack.push(_result.name);
                    }
                    _phash[_result.name] = _result.klass._$super;
                    return _result.name;
                };
                this.prototype.__super = function(){
                    var _name = _stack[_stack.length-1],
                        _method = arguments.callee.caller;
                    if (!_name){
                        _name = _doUpdateCache(_method,this.constructor);
                    }else{
                        var _parent = _phash[_name].prototype;
                        // switch caller name
                        if (!_parent.hasOwnProperty(_name)||
                            _method!=_parent[_name]){
                            _name = _doUpdateCache(_method,this.constructor);
                        }else{
                            // other method in current parent
                            _phash[_name] = _phash[_name]._$super;
                        }
                    }
                    // call parent method
                    var _ret = _phash[_name].prototype[_name].apply(this,arguments);
                    // exit super
                    if (_name==_stack[_stack.length-1]){
                        _stack.pop();
                        delete _phash[_name];
                    }
                    return _ret;
                };

                if (CMPT){
                    var _pro = this.prototype;
                    _pro.__supInit      = _pro.__super;
                    _pro.__supReset     = _pro.__super;
                    _pro.__supDestroy   = _pro.__super;
                    _pro.__supInitNode  = _pro.__super;
                    _pro.__supDoBuild   = _pro.__super;
                    _pro.__supOnShow    = _pro.__super;
                    _pro.__supOnHide    = _pro.__super;
                    _pro.__supOnRefresh = _pro.__super;
                    this._$supro = _super.prototype;
                }

                return this.prototype;
            };
            return _Klass;
        };
    })();

    if (CMPT){
        NEJ.C = _p._$klass;
        NEJ.copy(this.NEJ,NEJ);
    }

    return _p;
},'083c017e2a5450e295d417651bc93279','3d5e532482be00d99bd99a6d0a18067d');
I$('3695926c26a1894dcce266fdc52d2e3a',function (NEJ,_h,_p,_o,_f,_r){
    /*
     * 查看数据是否指定类型
     * @param  {Variable} 数据
     * @param  {String}   类型
     * @return {Boolean}  是否指定类型
     */
    var _isTypeOf = function(_data,_type){
        try{
            _type = _type.toLowerCase();
            if (_data===null) return _type=='null';
            if (_data===undefined) return _type=='undefined';
            return _o.toString.call(_data).toLowerCase()=='[object '+_type+']';
        }catch(e){
            return !1;
        }
    };
    /**
     * 判断是否函数类型
     *
     * ```javascript
     * NEJ.define([
     *     'base/util'
     * ],function(_u){
     *     // 返回false
     *     var is = _u._$isFunction(123);
     *     // 返回true
     *     var is = _u._$isFunction(function(){});
     * });
     * ```
     *
     * @method module:base/util._$isFunction
     * @param  {Variable} arg0 - 待检测类型的数据
     * @return {Boolean}         是否函数类型
     */
    _p._$isFunction = function(_data){
        return _isTypeOf(_data,'function');
    };
    /**
     * 判断是否字符串
     *
     * ```javascript
     * NEJ.define([
     *     'base/util'
     * ],function(_u){
     *     // 返回false
     *     var is = _u._$isString(123);
     *     // 返回true
     *     var is = _u._$isString("123");
     * });
     * ```
     *
     * @method module:base/util._$isString
     * @param  {Variable} arg0 - 待检测类型的数据
     * @return {Boolean}         是否字符串
     */
    _p._$isString = function(_data){
        return _isTypeOf(_data,'string');
    };
    /**
     * 判断是否数字
     *
     * ```javascript
     * NEJ.define([
     *     'base/util'
     * ],function(_u){
     *     // 返回false
     *     var is = _u._$isNumber("123");
     *     // 返回true
     *     var is = _u._$isNumber(123);
     *     var is = _u._$isNumber(-123);
     *     var is = _u._$isNumber(Number.MAX_VALUE);
     * });
     * ```
     *
     * @method module:base/util._$isNumber
     * @param  {Variable} arg0 - 待检测类型的数据
     * @return {Boolean}         是否数值类型
     */
    _p._$isNumber = function(_data){
        return _isTypeOf(_data,'number');
    };
    /**
     * 判断是否布尔值
     *
     * ```javascript
     * NEJ.define([
     *     'base/util'
     * ],function(_u){
     *     // 返回false
     *     var is = _u._$isBoolean(0);
     *     // 返回true
     *     var is = _u._$isBoolean(false);
     * });
     * ```
     *
     * @method module:base/util._$isBoolean
     * @param  {Variable} arg0 - 待检测类型的数据
     * @return {Boolean}         是否布尔值
     */
    _p._$isBoolean = function(_data){
        return _isTypeOf(_data,'boolean');
    };
    /**
     * 判断是否日期
     *
     * ```javascript
     * NEJ.define([
     *     'base/util'
     * ],function(_u){
     *     // 返回false
     *     var is = _u._$isDate(0);
     *     // 返回true
     *     var is = _u._$isDate(new Date());
     * });
     * ```
     *
     * @method module:base/util._$isDate
     * @param  {Variable} arg0 - 待检测类型的数据
     * @return {Boolean}         是否日期
     */
    _p._$isDate = function(_data){
        return _isTypeOf(_data,'date');
    };
    /**
     * 判断是否数组
     *
     * ```javascript
     * NEJ.define([
     *     'base/util'
     * ],function(_u){
     *     // 返回false
     *     var is = _u._$isArray(0);
     *     // 返回true
     *     var is = _u._$isArray([1,2]);
     * });
     * ```
     *
     * @method module:base/util._$isArray
     * @param  {Variable} arg0 - 待检测类型的数据
     * @return {Boolean}         是否数组
     */
    _p._$isArray = function(_data){
        return _isTypeOf(_data,'array');
    };
    /**
     * 判断是否对象
     *
     * ```javascript
     * NEJ.define([
     *     'base/util'
     * ],function(_u){
     *     // 返回false
     *     var is = _u._$isObject(function(){});
     *     // 返回true
     *     var is = _u._$isObject({});
     *     var is = _u._$isObject({a:"a"});
     * });
     * ```
     *
     * @method module:base/util._$isObject
     * @param  {Variable} arg0 - 待检测类型的数据
     * @return {Boolean}         是否对象
     */
    _p._$isObject = function(_data){
        return _isTypeOf(_data,'object');
    };
    /**
     * 计算字符串长度，中文算两个字符
     *
     * ```javascript
     * NEJ.define([
     *     'base/util'
     * ],function(_u){
     *     // 字符串长度为5
     *     var len = _u._$length('你i他');
     * });
     * ```
     *
     * @method module:base/util._$length
     * @param  {String} arg0 - 待计算长度字符串
     * @return {Number}        字符串长度
     */
    _p._$length = (function(){
        var _reg = /[^\x00-\xff]/g;
        return function(_content){
            return (''+(_content||'')).replace(_reg,'**').length;
        };
    })();
    /**
     * 遍历对象
     * 
     * ```javascript
     * NEJ.define([
     *     'base/util'
     * ],function(_u){
     *       var obj = {a:{id:1,name:'a'},b:{id:2,name:'b'},...};
     * 
     *       // 遍历对象    
     *       _u._$loop(obj,function(_item,_key){
     *           // TODO
     *       });
     * 
     *       // 从对象里查找id为2的元素，如果有返回KEY，没有返回null
     *       var key = _u._$loop(obj,function(_item){
     *           return _item.id==2;
     *       });
     * });
     * ```
     * 
     * @method module:base/util._$loop
     * @see    module:base/util._$forIn
     * @param  {Object}   arg0 - 对象
     * @param  {Function} arg1 - 回调，如果返回true，则中断遍历
     * @param  {Object}   arg2 - 回调函数调用时this对象
     * @return {String}          返回中断时的标识，没有中断则统一返回null
     */
    _p._$loop = function(_obj,_callback,_this){
        if (_p._$isObject(_obj)&&
            _p._$isFunction(_callback)){
            return _h.__forIn.apply(_h,arguments);
        }
        return null;
    };
    /**
     * 线性查找指定项
     *
     * ```javascript
     * NEJ.define([
     *     'base/util'
     * ],function(_u){
     *     var list = ["你","我","他"];
     *     // 返回下标1
     *     var index = _u._$indexOf(list,"我");
     *     // 没有找到，返回-1
     *     var index = _u._$indexOf(list,"他们");
     *     // 如果第二个参数是过滤接口，根据接口的规则查找
     *     // 以下规则排除第一个下标
     *     var index = _u._$indexOf(list,function(_item,_index,_list){
     *           return _item==='他';
     *     });
     * });
     * ```
     *
     * @method module:base/util._$indexOf
     * @param  {Array}    arg0 - 待搜索列表
     * @param  {Variable} arg1 - 指定项，如果为function则表示过滤接口
     * @return {Number}          给定项所在的位置索引，以0开始，没有项返回-1
     */
    _p._$indexOf = function(_list,_item){
        var _filter = _p._$isFunction(_item) ? _item
                    : function(_value){return _value===_item;},
            _index  = _p._$forIn(_list,_filter);
        return _index!=null?_index:-1;
    };
    /**
     * 二分法查找指定项
     * 
     * 验证函数输入输出说明
     * 
     * |      | 类型          | 结果说明 |
     * | :--  | :--      | :-- |
     * | 输入  | Variable | 中间项元素 |
     * | 输出  | Number   | < 0  目标元素在低位区间 |
     * |      |          | = 0  匹配到目标元素 |
     * |      |          | > 0  目标元素在高位区间 |
     *
     * ```javascript
     * NEJ.define([
     *     'base/util'
     * ],function(_u){
     *     // 二分查找id为2的项的索引值
     *     var list = [{id:1,name:'aaa'},{id:2,name:'bbbb'},...];
     *     var index = _u._$binSearch(list,function(_item){
     *         return _item.id-2;
     *     });
     * });
     * ```
     *
     * @method module:base/util._$binSearch
     * @param  {Array}    arg0 - 待查找列表
     * @param  {Function} arg1 - 验证函数
     * @return {Number}          找到匹配项索引，找不到返回-1
     */
    _p._$binSearch = (function(){
        var _docheck;
        // do binary search
        var _doSearch = function(_list,_low,_high){
            if (_low>_high) return -1;
            var _middle = Math.ceil((_low+_high)/2),
                _result = _docheck(_list[_middle],_middle,_list);
            if (_result==0)
                return _middle;
            if (_result<0)
                return _doSearch(_list,_low,_middle-1);
            return _doSearch(_list,_middle+1,_high);
        };
        return function(_list,_check){
            _docheck = _check||_f;
            return _doSearch(_list,0,_list.length-1);
        };
    })();
    /**
     * 逆序遍历列表，支持中断
     * 
     * 回调函数输入输出说明
     * 
     * |      | 类型          | 说明 |
     * | :--  | :--      | :-- |
     * | 输入  | Variable | 值 |
     * |      | Number   | 下标 |
     * |      | Array    | 列表对象 |
     * | 输出  | Boolean  | 是否匹配 |
     * 
     * ```javascript
     * NEJ.define([
     *     'base/util'
     * ],function(_u){
     *     // 删除id为3的项，并退出循环
     *     var list = [{id:1,name:'aaa'},{id:2,name:'bbbb'},...];
     *     _u._$reverseEach(list,function(_item,_index,_list){
     *         if (_item.id==3){
     *             _list.splice(_index,1);
     *             return !0;
     *         }
     *     });
     * });
     * ```
     *
     * @method module:base/util._$reverseEach
     * @see    module:base/util._$forEach
     * @param  {Array}    arg0 - 列表
     * @param  {Function} arg1 - 回调，如果返回true，则中断遍历
     * @param  {Object}   arg2 - 回调函数调用时this对象
     * @return {Number}          返回遍历中断时的索引值，没有中断则返回null
     */
    _p._$reverseEach = function(_list,_callback,_this){
        if (!!_list&&!!_list.length&&_p._$isFunction(_callback)){
            for(var i=_list.length-1;i>=0;i--){
                if (!!_callback.call(_this,_list[i],i,_list)){
                    return i;
                }
            }
        }
        return null;
    };
    /**
     * 正序遍历列表，不支持中断
     * 
     * 回调函数输入输出说明
     * 
     * |      | 类型          | 说明 |
     * | :--  | :--      | :-- |
     * | 输入  | Variable | 值 |
     * |      | Number   | 下标 |
     * |      | Array    | 列表对象 |
     * | 输出  | Boolean  | 是否匹配 |
     * 
     * ```javascript
     * NEJ.define([
     *     'base/util'
     * ],function(_u){
     *     var list = [1,2,3];
     *     _u._$forEach(list,function(_item,_index,_list){
     *         // TODO somthing
     *     });
     * });
     * ```
     *
     * @method module:base/util._$forEach
     * @see    module:base/util._$reverseEach
     * @param  {Array}    arg0 - 列表
     * @param  {Function} arg1 - 回调，如果返回true，则中断遍历
     * @param  {Object}   arg2 - 回调函数调用时this对象
     * @return {Void}
     */
    _p._$forEach = function(_list,_callback,_this){
        if (!!_list&&!!_list.length&&
            _p._$isFunction(_callback)){
            if (!_list.forEach){
                _p._$forIn.apply(_p,arguments);
            }else{
                _h.__forEach(_list,_callback,_this);
            }
        }
    };
    /**
     * 遍历列表或对象，如果带length属性，则作为数组遍历，如果要遍历带length属性的对象用_$loop接口，支持中断退出
     *
     * 回调函数输入输出说明
     * 
     * |      | 类型          | 说明 |
     * | :--  | :--      | :-- |
     * | 输入  | Variable | 值 |
     * |      | Number   | 下标 |
     * |      | Object_Array | 列表或者集合对象 |
     * | 输出  | Boolean  | 是否匹配 |
     * 
     * ```javascript
     * NEJ.define([
     *     'base/util'
     * ],function(_u){
     *       // 从有序列表里查找id为2的元素，如果有则返回索引，没有返回null
     *       var list = [{id:1,name:'a'},{id:2,name:'b'},...];
     *       var index = _u._$forIn(list,function(_item){
     *           return _item.id==2;
     *       });
     *
     *       // 从对象里查找id为2的元素，如果有返回KEY，没有返回null
     *       var obj = {a:{id:1,name:'a'},b:{id:2,name:'b'},...};
     *       var key = _u._$forIn(obj,function(_item){
     *           return _item.id==2;
     *       });
     * });
     * ```
     *
     * @method module:base/util._$forIn
     * @param  {Object|Array} arg0 - 列表或者对象
     * @param  {Function}     arg1 - 回调，如果返回true，则中断遍历
     * @param  {Object}       arg2 - 回调函数调用时this对象
     * @return {String|Number}       返回中断时的索引或者标识，没有中断则统一返回null
     */
    _p._$forIn = function(_list,_callback,_this){
        if (!_list||!_p._$isFunction(_callback)){
            return null;
        }
        if (_p._$isNumber(_list.length)){
            // list see as array
            for(var i=0,l=_list.length;i<l;i++){
                if (!!_callback.call(_this,_list[i],i,_list)){
                    return i;
                }
            }
        }else if (_p._$isObject(_list)){
            // list is object
            return _p._$loop(_list,_callback,_this);
        }
        return null;
    };
    /**
     * 编码字符串，
     * 编码规则对象中r正则表达式参数提取字符串需要编码的内容，
     * 然后使用编码规则对象中的映射表进行替换
     *
     * ```javascript
     * NEJ.define([
     *     'base/util'
     * ],function(_u){
     *     // 把字符串99999根据规则9替换成t，结果：ttttt
     *     var str = _u._$encode({r:/\d/g,'9':'t'},'99999');
     * });
     * ```
     *
     * @method module:base/util._$encode
     * @param  {Object} arg0 - 编码规则
     * @param  {String} arg1 - 待编码的字串
     * @return {String}        编码后的字串
     */
    _p._$encode = function(_map,_content){
        _content = ''+_content;
        if (!_map||!_content){
            return _content||'';
        }
        return _content.replace(_map.r,function($1){
            var _result = _map[!_map.i?$1.toLowerCase():$1];
            return _result!=null?_result:$1;
        });
    };
    /**
     * 编码html代码，'<' -> '&amp;lt;'
     *
     * ```javascript
     * NEJ.define([
     *     'base/util'
     * ],function(_u){
     *     // 编码，结果：&amp;lt;a&amp;gt;util&amp;lt;/a&amp;gt;&amp;amp;
     *     var str = _u._$escape('<a>util</a>&');
     * });
     * ```
     *
     * @method module:base/util._$escape
     * @see    module:base/util._$unescape
     * @param  {String} arg0 - 待编码串
     * @return {String}        编码后的串
     */
    _p._$escape = (function(){
        var _reg = /<br\/?>$/,
            _map = {
                r:/\<|\>|\&|\r|\n|\s|\'|\"/g,
                '<':'&lt;','>':'&gt;','&':'&amp;',' ':'&nbsp;',
                '"':'&quot;',"'":'&#39;','\n':'<br/>','\r':''
            };
        return function(_content){
            _content = _p._$encode(_map,_content);
            return _content.replace(_reg,'<br/><br/>');
        };
    })();
    /**
     * 反编码html代码，'&amp;lt;' -> '<' 
     *
     * ```javascript
     * NEJ.define([
     *     'base/util'
     * ],function(_u){
     *     // 反编码，结果：<&a>util</a>
     *     var str = _u._$unescape('&amp;lt;&amp;amp;a&amp;gt;util&amp;lt;/a&amp;gt;');
     * });
     * ```
     *
     * @method module:base/util._$unescape
     * @see    module:base/util._$escape
     * @param  {String} arg0 - 待反编码串
     * @return {String}        反编码后的串
     */
    _p._$unescape = (function(){
        var _map = {r:/\&(?:lt|gt|amp|nbsp|#39|quot)\;|\<br\/\>/gi,'&lt;':'<','&gt;':'>','&amp;':'&','&nbsp;':' ','&#39;':"'",'&quot;':'"','<br/>':'\n'};
        return function(_content){
            return _p._$encode(_map,_content);
        };
    })();
    /**
     * 格式化时间，yyyy|yy|MM|cM|eM|M|dd|d|HH|H|mm|ms|ss|m|s|w
     *
     * 各标识说明：
     * 
     * | 标识  | 说明 |
     * | :--  | :-- |
     * | yyyy | 四位年份，如2001 |
     * | yy   | 两位年费，如01 |
     * | MM   | 两位月份，如08 |
     * | M    | 一位月份，如8 |
     * | dd   | 两位日期，如09 |
     * | d    | 一位日期，如9 |
     * | HH   | 两位小时，如07 |
     * | H    | 一位小时，如7 |
     * | mm   | 两位分钟，如03 |
     * | m    | 一位分钟，如3 |
     * | ss   | 两位秒数，如09 |
     * | s    | 一位秒数，如9 |
     * | ms   | 毫秒数，如234 |
     * | w    | 中文星期几，如一 |
     * | ct   | 12小时制中文后缀，上午/下午 |
     * | et   | 12小时制英文后缀，A.M./P.M. |
     * | cM   | 中文月份，如三 |
     * | eM   | 英文月份，如Mar |
     *
     * ```javascript
     * NEJ.define([
     *     'base/util'
     * ],function(_u){
     *     // 根据格式输出时间，比如:2012-01-11,连接符可自定义
     *     var str = _u._$format(new Date(),'yyyy-MM-dd');
     * });
     * ```
     *
     * @method module:base/util._$format
     * @param  {Number|String|Date} arg0 - 时间
     * @param  {String}             arg1 - 格式
     * @return {String}                    指定格式的时间串
     */
    _p._$format = (function(){
        var _map = {i:!0,r:/\byyyy|yy|MM|cM|eM|M|dd|d|HH|H|mm|ms|ss|m|s|w|ct|et\b/g},
            _12cc = ['上午','下午'],
            _12ec = ['A.M.','P.M.'],
            _week = ['日','一','二','三','四','五','六'],
            _cmon = ['一','二','三','四','五','六','七','八','九','十','十一','十二'],
            _emon = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec'];
        var _fmtnmb = function(_number){
            _number = parseInt(_number)||0;
            return (_number<10?'0':'')+_number;
        };
        var _fmtclc = function(_hour){
            return _hour<12?0:1;
        };
        return function(_time,_format,_12time){
            if (!_time||!_format)
                return '';
            _time = _p._$var2date(_time);
            _map.yyyy = _time.getFullYear();
            _map.yy   = (''+_map.yyyy).substr(2);
            _map.M    = _time.getMonth()+1;
            _map.MM   = _fmtnmb(_map.M);
            _map.eM   = _emon[_map.M-1];
            _map.cM   = _cmon[_map.M-1];
            _map.d    = _time.getDate();
            _map.dd   = _fmtnmb(_map.d);
            _map.H    = _time.getHours();
            _map.HH   = _fmtnmb(_map.H);
            _map.m    = _time.getMinutes();
            _map.mm   = _fmtnmb(_map.m);
            _map.s    = _time.getSeconds();
            _map.ss   = _fmtnmb(_map.s);
            _map.ms   = _time.getMilliseconds();
            _map.w    = _week[_time.getDay()];
            var _cc   = _fmtclc(_map.H);
            _map.ct   = _12cc[_cc];
            _map.et   = _12ec[_cc];
            if (!!_12time){
                _map.H = _map.H%12;
            }
            return _p._$encode(_map,_format);
        };
    })();
    /**
     * 日期字符串转日期对象
     * 
     * 字符串日期格式同ECMA规范定义：YYYY-MM-DDTHH:mm:ss.sssZ
     * 
     * 各标识说明：
     * 
     * | 标识 | 说明 |
     * | :--  | :-- |
     * | YYYY | 四位年份，0000-9999，如2001 |
     * | -    | 年月日分隔符 |
     * | MM   | 两位月份，01-12，如03 |
     * | DD   | 两位日期，01-31，如07 |
     * | T    | 时间起始标识 |
     * | HH   | 两位小时，00-24，如05 |
     * | :    | 时分秒分隔符 |
     * | mm   | 两位分钟，00-59，如30 |
     * | ss   | 两位秒数，00-59，如08 |
     * | .    | 秒/毫秒分隔符 |
     * | sss  | 三位毫秒数，000-999，如004 |
     * | Z    | 时区偏移 |
     *
     * ```javascript
     * NEJ.define([
     *     'base/util'
     * ],function(_u){
     *     // 输入YYYY-MM-DDTHH:mm:ss.sssZ格式字符串，生成日期对象
     *     var date = _u._$var2date('2013-07-29T13:12:45.300');
     *
     *     // 输入YYYY-MM-DDTHH:mm:ss格式字符串，生成日期对象
     *     var date = _u._$var2date('2013-07-29T13:12:45');
     *
     *     // 输入YYYY-MM-DD格式字符串，生成日期对象
     *     var date = _u._$var2date('2013-07-29');
     * });
     * ```
     *
     * @method module:base/util._$var2date
     * @param  {String} arg0 - 日期串
     * @return {Date}          日期对象
     */
    _p._$var2date = function(_time){
        var _date = _time;
        if (_p._$isString(_time)){
            _date = new Date(
                _h.__str2time(_time)
            );
        }
        if (!_p._$isDate(_date)){
            _date = new Date(_time);
        }
        return _date;
    };
    /**
     * 浮点数值保留指定位数小数点
     *
     * ```javascript
     * NEJ.define([
     *     'base/util'
     * ],function(_u){
     *     // 保留2位小数，返回3.14
     *     var value = _u._$fixed(3.14159,2);
     * });
     * ```
     *
     * @method module:base/util._$fixed
     * @param  {Float}  arg0 - 浮点数
     * @param  {Number} arg1 - 小数位
     * @return {Number}        浮点数
     */
    _p._$fixed = function(_float,_fraction){
        return parseFloat(new Number(_float).toFixed(_fraction));
    };
    /**
     * 相对路径转绝对路径
     *
     * ```javascript
     * NEJ.define([
     *     'base/util'
     * ],function(_u){
     *     // 相对路径../a/b.html转绝对路径http://a.b.com:8010/a/b.html
     *     var url = _u._$absolute(
     *         '../a/b.html',
     *         'http://a.b.com:8010/z/'
     *     );
     * });
     * ```
     * 
     * @method module:base/util._$absolute
     * @param  {String} arg0 - 相对路径
     * @param  {String} arg1 - 绝对路径ROOT，必须以http://开始，默认为location目录
     * @return {String}        绝对路径地址
     */
    _p._$absolute = (function(){
        var _reg0 = /([^\/:])\/.*$/,
            _reg1 = /\/[^\/]+$/,
            _reg2 = /[#\?]/,
            _base = location.href.split(/[?#]/)[0],
            _anchor = document.createElement('a');
        // fix for relative protocol, e.g //a.b.com/a
        var _isAbsolute = function(_uri){
            _uri = _uri||'';
            return _uri.indexOf('://')>0||
                   _uri.indexOf('//')===0;
        };
        var _doFormat = function(_uri){
            return (_uri||'').split(_reg2)[0]
                             .replace(_reg1,'/');
        };
        var _doMergeURI = function(_uri,_root){
            // for /a/b/c
            if (_uri.indexOf('/')==0)
                return _root.replace(_reg0,'$1')+_uri;
            // for a/b or ./a/b or ../a/b
            return _doFormat(_root)+_uri;
        };
        _base = _doFormat(_base);
        return function(_uri,_root){
            _uri = (_uri||'').trim();
            // check url
            if (!_isAbsolute(_root))
                _root = _base;
            if (!_uri) return _root;
            // fix relative protocol error
            if (_uri.indexOf('//')===0){
                var arr = _root.split(':');
                _uri = arr[0]+':'+_uri;
            }
            if (_isAbsolute(_uri))
                return _uri;
            _uri = _doMergeURI(_uri,_root);
            _anchor.href = _uri;
            _uri = _anchor.href;
            return _isAbsolute(_uri) ? _uri :
                _anchor.getAttribute('href',4); // ie6/7;
        };
    })();
    /**
     * 从URL地址中提取源信息
     * 
     * * http://a.b.com:8080/a/b/ -> http://a.b.com:8080
     * * /a/b -> 
     *
     * ```javascript
     * NEJ.define([
     *     'base/util'
     * ],function(_u){
     *     // 提取url地址的源信息
     *     // 返回http://a.b.com:8080
     *     var origin = _u._$url2origin("http://a.b.com:8080/a/b/");
     * });
     * ```
     *
     * @method module:base/util._$url2origin
     * @param  {String} arg0 - URL地址
     * @return {String}        源信息
     */
    _p._$url2origin = (function(){
        var _reg = /^([\w]+?:\/\/.*?(?=\/|$))/i;
        return function(_url){
            _url = _url||'';
            // fix relative protocol
            if (_url.indexOf('//')===0){
                _url = location.protocol+_url;
            }
            // dump origin
            if (_reg.test(_url))
                return RegExp.$1.toLowerCase();
            return '';
        };
    })();
    /**
     * key-value字符串转对象
     *
     * ```javascript
     * NEJ.define([
     *     'base/util'
     * ],function(_u){
     *     var str = "abc=abc,123=123";
     *     // 返回对象{abc:"abc",123:"123"}
     *     var obj = _u._$string2object(_str,",");
     * });
     * ```
     *
     * @method module:base/util._$string2object
     * @see    module:base/util._$object2string
     * @param  {String}           arg0 - 待处理数据
     * @param  {String|RegExp}    arg1 - 分隔符
     * @param  {Boolean|Function} arg2 - 是否反编码
     * @return {Object}           转换后对象
     */
    _p._$string2object = function(_string,_split,_decode){
        var _obj = {};
        // decode function
        var _func = _decode;
        if (!_p._$isFunction(_func)){
            _func = function(v){
                return !_decode?v:decodeURIComponent(v);
            };
        }
        // parse string
        _p._$forEach(
            (_string||'').split(_split),
            function(_name){
                var _brr = _name.split('=');
                if (!_brr||!_brr.length) return;
                var _key = _brr.shift();
                if (!!_key){
                    _obj[_func(_key)] = _func(_brr.join('='));
                }
            }
        );
        return _obj;
    };
    /**
     * key-value对象转成key=value对后用分隔符join
     * 
     * 对象中不同类型的取值规则如下：
     * 
     * | 类型            |  取值规则 |
     * | :--       | :-- |
     * | Function  |  过滤掉，不输出 |
     * | Date      |  转成时间戳，getTime取值 |
     * | Array     |  值用逗号分隔，如[1,2,3] -> 1,2,3 |
     * | Object    |  使用JSON转成字符串 |
     *
     * ```javascript
     * NEJ.define([
     *     'base/util'
     * ],function(_u){
     *     // 返回字符串 abc=abc,123=123
     *     var obj = {
     *         abc:"abc",
     *         123:"123"
     *     };
     *     var str = _u._$object2string(obj);
     *
     *     // 返回字符串
     *     // a=1871406603152186&b=1,2,3&d={"a":"a","b":"b"}&e=e&f=1&g=true
     *     var obj = {
     *         a:new Date,
     *         b:[1,2,3],
     *         c:function(){},
     *         d:{a:'a',b:'b'},
     *         e:'e',
     *         f:1,
     *         g:true
     *     };
     *     var str = _u._$object2string(obj,'&');
     * });
     * ```
     *
     * @method module:base/util._$object2string
     * @see    module:base/util._$string2object
     * @param  {Object}  arg0 - 对象
     * @param  {String}  arg1 - 分隔符，默认为逗号
     * @param  {Boolean|Function} arg2 - 是否编码
     * @return {String}         key-value串
     */
    _p._$object2string = function(_object,_split,_encode){
        if (!_object) return '';
        var _arr = [];
        // encode function
        var _func = _encode;
        if (!_p._$isFunction(_func)){
            _func = function(v){
                return !_encode?v:encodeURIComponent(v);
            };
        }
        // parse object
        _p._$loop(
            _object,function(_value,_key){
                if (_p._$isFunction(_value)){
                    return;
                }
                if (_p._$isDate(_value)){
                    _value = _value.getTime();
                }else if(_p._$isArray(_value)){
                    _value = _value.join(',');
                }else if(_p._$isObject(_value)){
                    _value = JSON.stringify(_value);
                }
                _arr.push(_func(_key)+'='+_func(_value));
            }
        );
        return _arr.join(_split||',');
    };
    /**
     * 查询串转对象
     *
     * ```javascript
     * NEJ.define([
     *     'base/util'
     * ],function(_u){
     *     // 返回对象{abc:"abc",123:"123"}
     *     var obj = _u._$query2object("abc=abc&123=123");
     * });
     * ```
     *
     * @method module:base/util._$query2object
     * @see    module:base/util._$object2query
     * @see    module:base/util._$string2object
     * @param  {String} arg0 - 查询串
     * @return {Object}        转换出来的对象
     */
    _p._$query2object = function(_query){
        return _p._$string2object(_query,'&',!0);
    };
    /**
     * 对象转查询串
     *
     * ```javascript
     * NEJ.define([
     *     'base/util'
     * ],function(_u){
     *     // 返回对象123=123&abc=abc
     *     var query = _u._$object2query({abc:"abc",123:"123"});
     * });
     * ```
     *
     * @method module:base/util._$object2query
     * @see    module:base/util._$query2object
     * @see    module:base/util._$object2string
     * @param  {Object} arg0 - 对象
     * @return {String}        查询串
     */
    _p._$object2query = function(_object){
        return _p._$object2string(_object,'&',!0);
    };
    /**
     * 集合转数组，集合具有length属性
     *
     * ```javascript
     * NEJ.define([
     *     'base/util'
     * ],function(_u){
     *     // 返回数组['1','2','3']
     *     var map = {0:'0',1:'1',2:'2',length:3};
     *     var arr = _u._$object2array(map);
     *
     *     // 多用于对节点集合的转换
     *     var nodes = document.body.childNodes;
     *     var arr = _u._$object2array(nodes);
     * });
     * ```
     *
     * @method module:base/util._$object2array
     * @see    module:base/util._$array2object
     * @param  {Object} arg0 - 集合，必须有length属性
     * @return {Array}         数组
     */
    _p._$object2array = function(_object){
        return _h.__col2array(_object);
    };
    /**
     * 数组转对象，将列表中元素按照指定KEY组成对象<br/>
     *
     * ```javascript
     * NEJ.define([
     *     'base/util'
     * ],function(_u){
     *     // 输出结果为 {2:{id:2,name:'b'},...}
     *     var arr = [{id:1,name:'a'},{id:2,name:'b'},...];
     *     var obj = _u._$array2object(
     *         arr,function(_item){
     *             // 过滤name为a的项
     *             if (_item.name=='a'){
     *                 return;
     *             }
     *             // 组对象的KEY用每项的id
     *             return _item.id;
     *         }
     *     );
     *
     *     // 默认使用每项的值组对象
     *     var brr = ['a','b','c',...];
     *     // 输出 {a:'a',b:'b',c:'c',...}
     *     var obj = _u._$array2object(brr);
     * });
     * ```
     *
     * @method module:base/util._$array2object
     * @see    module:base/util._$object2array
     * @param  {Array}    arg0 - 列表
     * @param  {Function} arg1 - 过滤函数，返回每一项的KEY，没有返回则过滤当前项
     * @return {Object}   对象
     */
    _p._$array2object = function(_list,_filter){
        var _result = {};
        _p._$forEach(
            _list,function(_item){
                var _key = _item;
                if (!!_filter){
                    _key = _filter(_item);
                }
                if (_key!=null){
                    _result[_key] = _item;
                }
            }
        );
        return _result;
    };
    /**
     * 格式化数字为指定位数，不足位数前面用0补足
     *
     * ```javascript
     * NEJ.define([
     *     'base/util'
     * ],function(_u){
     *     // 2    -> 002
     *     // 22   -> 022
     *     // 222  -> 222
     *     // 2222 -> 2222
     *     var str = _u._$number2string(2,3);
     * });
     * ```
     *
     * @method module:base/util._$number2string
     * @param  {Number} arg0 - 数值
     * @param  {Number} arg1 - 位数，至少1位
     * @return {String}        格式化后字符串
     */
    _p._$number2string = function(_number,_limit){
        var _len1 = (''+_number).length,
            _len2 = Math.max(1,parseInt(_limit)||0),
            _delta = _len2-_len1;
        if (_delta>0){
            _number = new Array(_delta+1).join('0')+_number;
        }
        return ''+_number;
    };
    /**
     * 安全删除属性，
     * 部分浏览器（如低版本IE）禁止直接delete节点上的属性
     *
     * ```javascript
     * NEJ.define([
     *     'base/util'
     * ],function(_u){
     *     // 节点上保存的数据
     *     _node.data = {a:'aaaaa',b:'bbbbb'};
     *     _node.test = 'aaaaa';
     *
     *     // 删除单个属性
     *     _u._$safeDelete(_node,'test');
     *     // 批量删除
     *     _u._$safeDelete(_node,['test','data']);
     * });
     * ```
     *
     * @method module:base/util._$safeDelete
     * @param  {Object}       arg0 - 对象
     * @param  {String|Array} arg1 - 属性
     * @return {Void}
     */
    _p._$safeDelete = function(_object,_name){
        if (!_p._$isArray(_name)){
            try{
                delete _object[_name];
            }catch(e){
                _object[_name] = undefined;
            }
        }else{
            _p._$forEach(
                _name,function(_item){
                    _p._$safeDelete(_object,_item);
                }
            );
        }
    };
    /**
     * 随机一个字符串
     *
     * ```javascript
     * NEJ.define([
     *     'base/util'
     * ],function(_u){
     *     // 可能返回"13d1r1dt2"
     *     var seed = _u._$randString(9);
     * });
     * ```
     *
     * @method module:base/util._$randString
     * @param  {String} arg0 - 字符串长度
     * @return {String}        随机字符串
     */
    _p._$randString = (function(){
        var _chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
        return function(_length){
            _length = _length||10;
            var _result = [];
            for(var i=0,_rnum;i<_length;++i){
                _rnum = Math.floor(Math.random()*_chars.length);
                _result.push(_chars.charAt(_rnum));
            }
            return _result.join('');
        };
    })();
    /**
     * 随机生成一个给定范围的整数
     *
     * ```javascript
     * NEJ.define([
     *     'base/util'
     * ],function(_u){
     *     // 可能返回3
     *     var seed = _u._$randNumber(0,9);
     * });
     * ```
     * 
     * @method module:base/util._$randNumber
     * @see    module:base/util._$randNumberString
     * @param  {Number} arg0 - 小区间，包含
     * @param  {Number} arg1 - 大区间，不包含
     * @return {Number}        随机整数
     */
    _p._$randNumber = function(_min,_max){
        return Math.floor(Math.random()*(_max-_min)+_min);
    };
    /**
     * 随机生成一个全部为数字的字符串
     *
     * ```javascript
     * NEJ.define([
     *     'base/util'
     * ],function(_u){
     *     // 可能返回123456789
     *     var seed = _u._$randNumberString(9);
     * });
     * ```
     *
     * @deprecated
     * @method module:base/util._$randNumberString
     * @see    module:base/util._$randNumber
     * @see    module:base/util._$uniqueID
     * @param  {Number} arg0 - 随机字符串的长度[1,30]
     * @return {String}        随机生成的字符串
     */
    _p._$randNumberString = function(_length){
        _length = Math.max(0,Math.min(_length||8,30));
        var _min = Math.pow(10,_length-1),_max = _min*10;
        return _p._$randNumber(_min,_max).toString();
    };
    /**
     * 生成系统中的唯一标识，每次调用均生成一个新的标识
     *
     * ```javascript
     * NEJ.define([
     *     'base/util'
     * ],function(_p){
     *    // 可能返回123456789
     *    var _id1 = _p._$uniqueID(),
     *        _id2 = _p._$uniqueID();
     *    // _id1 != _id2
     * });
     * ```
     *
     * @method module:base/util._$uniqueID
     * @return {String} 唯一标识
     */
    _p._$uniqueID = (function(){
        var _seed = +new Date;
        return function(){
            return ''+(_seed++);
        };
    })();
    /**
     * 读取上下文中指定名字空间的值
     *
     * ```javascript
     * NEJ.define([
     *     'base/util'
     * ],function(_u){
     *     var obj = {
     *         a:{
     *             b:{
     *                 c:{
     *                     d:'ddddd'
     *                 }
     *             }
     *         }
     *     };
     *     // 输出 ddddd
     *     var value = _u._$query(obj,'a.b.c.d');
     *     // 输出 undefined
     *     var value = _u._$query(null,'a.b.c.d');
     * });
     * ```
     *
     * @method module:base/util._$query
     * @param  {Object} arg0 - 上下文
     * @param  {String} arg1 - 名字空间
     * @return {Varaible}      查询到的值
     */
    _p._$query = function(_context,_namespace){
        _context = _context||_o;
        var _arr = (_namespace||'').split('.');
        for(var i=0,l=_arr.length;i<l;i++){
            _context = _context[_arr[i]];
            if (!_context) break;
        }
        return _context;
    };
    /**
     * 合并数据，同名属性右侧覆盖左侧，
     * 最后一个如果是函数则用做数据过滤，
     * 第一个参数作为合并数据结果集对象，如果为空则新建对象
     * 
     * 过滤接口输入输出说明
     * 
     * |      | 类型          | 说明 |
     * | :--  | :--      | :-- |
     * | 输入  | Variable | 值 |
     * |      | String   | 键 |
     * | 输出  | Boolean  | 是否过滤 |
     * 
     * ```javascript
     * NEJ.define([
     *     'base/util'
     * ],function(_u){
     *     // 合并多个数据至obj0中
     *     var obj0 = {a:0,b:1},
     *         obj1 = {a:"a",b:"b",c:"c"},
     *         obj2 = {c:"c",d:"d",e:"f"},
     *         ... ;
     *     var obj = _u._$merge(obj0,obj1,obj2,...);
     *
     *     // 带过滤接口合并
     *     // 阻止a属性的覆盖
     *     var obj = _u._$merge(
     *         obj0,obj1,obj2,...,
     *         function(_value,_key){
     *             return _key=='a';
     *         }
     *     );
     * });
     * ```
     *
     * @method module:base/util._$merge
     * @see    module:base/util._$fetch
     * @param  {Object}   arg0 - 原始对象
     * @param  {Object}   arg1 - 待拷贝对象
     * @param  {Function} arg2 - 过滤接口
     * @return {Object}          拷贝后对象
     */
    _p._$merge = function(){
        var _last = arguments.length-1,
            _filter = arguments[_last];
        // check filter function for last args
        if (_p._$isFunction(_filter)){
            _last -= 1;
        }else{
            _filter = _f;
        }
        // args0 as result
        var _result = arguments[0]||{};
        // merge
        for(var i=1;i<=_last;i++){
            _p._$loop(arguments[i],function(v,k){
                if (!_filter(v,k)){
                    _result[k] = v;
                }
            });
        }
        return _result;
    };
    /**
     * 根据原始对象属性，从目标对象提取非空值
     *
     * ```javascript
     * NEJ.define([
     *     'base/util'
     * ],function(_u){
     *     var obj0 = {a:0,b:1},
     *         obj1 = {a:"a",b:"b",c:"c"};
     *     // 根据obj0的属性,从obj1拷贝非null属性到obj0中
     *     // 结果是obj0.a = "a",obj.b = "b",没有拷贝c属性;
     *     var obj = _u._$fetch(obj0,obj1);
     * });
     * ```
     *
     * @method module:base/util._$fetch
     * @see    module:base/util._$merge
     * @param  {Object} arg0 - 原始对象
     * @param  {Object} arg1 - 目标对象
     * @return {Object}        合并后的对象
     */
    _p._$fetch = function(_object,_config){
        if (!!_config){
            _p._$loop(_object,function(v,k,m){
                var _value = _config[k];
                if (_value!=null){
                    m[k] = _value;
                }
            });
        }
        return _object;
    };
    /**
     * 判断对象自生是否包含元素
     * 
     * ```javascript
     * NEJ.define([
     *     'base/util'
     * ],function(_u){
     *     // 判断空对象是否有属性
     *     // 输出 false
     *     var has = _u._$hasProperty({});
     *       
     *     // 判断非空对象是否有属性
     *     // 输出 true
     *     var has = _u._$hasProperty({a:'a',b:'b',c:'c'});
     *       
     *     // 判断空数组是否有属性
     *     // 输出 false
     *     var has = _u._$hasProperty([]);
     *       
     *     // 判断非空数组是否有属性
     *     // 输出 true
     *     var has = _u._$hasProperty([1,2,3]);
     * });
     * ```
     * 
     * @method module:base/util._$hasProperty
     * @param  {Object|Array} arg0 - 对象
     * @return {Boolean}             是否有元素
     */
    _p._$hasProperty = function(_obj){
        // for null
        if (!_obj){
            return !1;
        }
        // for object with length
        if (_obj.length!=null){
            return _obj.length>0;
        }
        // for object
        var _length = 0;
        _p._$loop(_obj,function(){
            _length++;
            return _length>0;
        });
        return _length>0;
    };
    
    if (CMPT){
        NEJ.Q  = _p._$query;
        NEJ.X  = _p._$merge;
        NEJ.EX = _p._$fetch;
        NEJ.copy(this.NEJ,NEJ);
        NEJ.copy(NEJ.P('nej.u'),_p);
    }

    return _p;
},'083c017e2a5450e295d417651bc93279','3d5e532482be00d99bd99a6d0a18067d');
I$('640a80c98bdf4b524950233d7016021d',function (NEJ,_u,_p,_o,_f,_r){
    var _cache = {};
    /*
     * URL地址转源信息
     * http://a.b.com:8080/a/bc/ -> http://a.b.com:8080
     * @param  {String} URL地址
     * @return {String} 源信息
     */
    _p.__url2host = (function(){
        var _reg = /^([\w]+?:\/\/.*?(?=\/|$))/i;
        return function(_url){
            _url = _url||'';
            // fix relative protocol url
            if (_url.indexOf('//')===0){
                _url = location.protocol+_url;
            }
            if (_reg.test(_url))
                return RegExp.$1;
            return location.protocol+'//'+location.host;
        };
    })();
    /**
     * 设置NEJ配置信息
     * @param  {String}   配置标识
     * @param  {Variable} 配置信息
     * @return {Void}
     */
    _p.__set = function(_key,_value){
        _cache[_key] = _value;
    };
    /**
     * 获取NEJ配置信息
     * @param  {String}   配置标识
     * @return {Variable} 配置信息
     */
    _p.__get = function(_key){
        return _cache[_key];
    };

    // init
    /*
     * 初始化配置信息
     * @param  {Object} 配置信息
     * @return {Void}
     */
    var _doInit = (function(){
        var _conf = {
            'portrait':{name:'portrait',dft:'portrait/'},
            'ajax.swf':{name:'ajax',dft:'nej_proxy_flash.swf'},
            'chart.swf':{name:'chart',dft:'nej_flex_chart.swf'},
            'audio.swf':{name:'audio',dft:'nej_player_audio.swf'},
            'video.swf':{name:'video',dft:'nej_player_video.swf'},
            'clipboard.swf':{name:'clipboard',dft:'nej_clipboard.swf'},
            'upload.image.swf':{name:'uploadimage',dft:'nej_upload_image.swf'}
        };
        var _doInitProxy = function(_list){
            var _map = {};
            if (!_list||!_list.length){
                return _map;
            }
            for(var i=0,l=_list.length,_path;i<l;i++){
                _path = _list[i];
                if (_path.indexOf('://')>0)
                    _map[_p.__url2host(_path)] = _path;
            }
            return _map;
        };
        return function(_config){
            // check path config
            _p.__set('root',_config.root||'/res/');
            var _root = _p.__get('root');
            _u._$loop(_conf,function(v,k,m){
                _p.__set(k,_config[v.name]||(_root+v.dft));
            });
            // csrf config
            var _csrf = _config.p_csrf;
            if (_csrf===!0){
                _csrf = {
                    cookie:'AntiCSRF',
                    param:'AntiCSRF'
                };
            }
            _csrf = _csrf || _o;
            _p.__set('csrf',{
                param:_csrf.param||'',
                cookie:_csrf.cookie||''
            });
            // ajax by frame proxy
            _p.__set('frames',_doInitProxy(_config.p_frame));
            // ajax by flash proxy
            _p.__set('flashs',_doInitProxy(_config.p_flash));
        };
    })();
    _doInit(this.NEJ_CONF||_o);

    return _p;
},'083c017e2a5450e295d417651bc93279','3695926c26a1894dcce266fdc52d2e3a');
I$('ec3cb66c96113fe65fee08a206ff8f09',function(_h,_m,_p,_o,_f,_r){if (_m._$KERNEL.engine==='trident'){I$('6321fc97e40739c30c208c15d346db89',function (){
        _h.__set(
            'storage.swf',
            (this.NEJ_CONF||_o).storage||
            (_h.__get('root')+'nej_storage.swf')
        );
    });}
if (_m._$KERNEL.engine==='trident'&&_m._$KERNEL.release<='3.0'){I$('d43ca44e1422a028353850d47c32c4ff',function (){
        _h.__set(
            'blank.png',
            (this.NEJ_CONF||_o).blank||
            (_h.__get('root')+'nej_blank.gif')
        );
    });}return _h;},'640a80c98bdf4b524950233d7016021d','d552af5339ac27c31f311f3fdadefdc3');
I$('1c763bdf30dcc32bedb3bfa2afd89a26',function (NEJ,_h,_p,_o,_f,_r){
    /**
     * 取Frame跨域Ajax代理文件，通过NEJ_CONF的p_frame配置给定域名的代理文件地址
     *
     * @method module:base/config._$getFrameProxy
     * @see    module:base/config._$get
     * @param  {String} arg0 - 请求地址或者域名
     * @return {String}        代理文件地址
     */
    _p._$getFrameProxy = function(_url){
        var _host = _h.__url2host(_url);
        return _p._$get('frames')[_host]||
              (_host+'/res/nej_proxy_frame.html');
    };
    /**
     * 取Flash跨域Ajax配置文件，通过NEJ_CONF的p_flash配置给定域名的代理文件地址
     *
     * @method module:base/config._$getFlashProxy
     * @see    module:base/config._$get
     * @param  {String} arg0 - 请求地址或者域名
     * @return {String}        代理文件地址
     */
    _p._$getFlashProxy = function(_url){
        return _p._$get('flashs')[_h.__url2host(_url)];
    };
    /**
     * 获取NEJ配置信息，通过NEJ_CONF配置相关信息
     *
     * ```javascript
     *  window.NEJ_CONF = {
     *      // resource root
     *      // defalut value -> '/res/'
     *      root : '/nej/'
     *      // blank image for ie6-ie7
     *      // default value -> $root+'nej_blank.gif'
     *      blank : '/res/nej_blank.gif'
     *      // localstorage flash
     *      // default value -> $root+'nej_storage.swf'
     *      storage : '/res/nej_storage.swf'
     *      // audio player flash
     *      // default value -> $root+'nej_player_audio.swf'
     *      audio : '/res/nej_player_audio.swf'
     *      // video player flash
     *      // default value -> $root+'nej_player_video.swf'
     *      video : '/res/nej_player_video.swf'
     *      // clipboard flash
     *      // default value -> $root+'nej_clipboard.swf'
     *      clipboard : '/res/nej_clipboard.swf'
     *      // https request proxy
     *      // default value -> $root+'nej_proxy_flash.swf'
     *      ajax : '/res/nej_proxy_flash.swf'
     *      // portrait root
     *      // default value -> $root+'portrait/'
     *      portrait : '/res/portrait/'
     *      // cross domain xhr request for ie6-ie9
     *      // if path not start with http[s]://
     *      // will use /res/nej_proxy_frame.html as default
     *      p_frame:['http://c.d.com/html/nej_proxy_frame.html']
     *      // flash crossdomain.xml file path
     *      // default value -> http://a.b.com/crossdomain.xml
     *      p_flash:['http://a.b.com/proxy/crossdomain.xml']
     *      // CSRF cookie name and parameter name
     *      // set p_csrf:true to use URS config {cookie:'AntiCSRF',param:'AntiCSRF'}
     *      // default value -> {cookie:'',param:''}
     *      p_csrf:{cookie:'AntiCSRF',param:'AntiCSRF'}
     *  };
     * ```
     *
     * 配置标识支持
     *
     * | 标识                          | 说明 |
     * | :--              | :-- |
     * | portrait         | 表情根路径 |
     * | blank.png        | 空白图片文件地址 |
     * | ajax.swf         | Ajax代理Flash文件地址 |
     * | chart.swf        | 图标Flash文件地址 |
     * | audio.swf        | 实现Audio功能的Flash文件地址 |
     * | video.swf        | 实现Video功能的Flash文件地址 |
     * | clipboard.swf    | 实现剪切板功能的Flash文件地址 |
     * | upload.image.swf | 实现图片上传功能的Flash文件地址 |
     * | storage.swf      | 实现本地存储功能的Flash文件地址 |
     *
     * @method module:base/config._$get
     * @param  {String}   arg0 - 配置标识
     * @return {Variable}        配置信息
     */
    _p._$get = function(_key){
        return _h.__get(_key);
    };

    if (CMPT){
        NEJ.copy(NEJ.P('nej.c'),_p);
    }

    return _p;
},'083c017e2a5450e295d417651bc93279','ec3cb66c96113fe65fee08a206ff8f09');
I$('d0109f80b9992d1fd93e85a35ede12b1',function (NEJ,_c,_p,_o,_f,_r){
    var _seed = +new Date;
    /**
     * 找不到指定内容的错误码
     *
     * @const {Number} module:base/constant._$CODE_NOTFUND
     */
    _p._$CODE_NOTFUND = 10000-_seed;
    /**
     * 需要指定的参数未指定的错误码
     *
     * @const {Number} module:base/constant._$CODE_NOTASGN
     */
    _p._$CODE_NOTASGN = 10001-_seed;
    /**
     * 不支持操作的错误码
     *
     * @const {Number} module:base/constant._$CODE_NOTSPOT
     */
    _p._$CODE_NOTSPOT = 10002-_seed;
    /**
     * 操作超时的错误码
     *
     * @const {Number} module:base/constant._$CODE_TIMEOUT
     */
    _p._$CODE_TIMEOUT = 10003-_seed;
    /**
     * 字符串作为脚本执行异常的错误码
     *
     * @const {Number} module:base/constant._$CODE_ERREVAL
     */
    _p._$CODE_ERREVAL = 10004-_seed;
    /**
     * 回调执行异常的错误码
     *
     * @const {Number} module:base/constant._$CODE_ERRCABK
     */
    _p._$CODE_ERRCABK = 10005-_seed;
    /**
     * 服务器返回异常的错误码
     *
     * @const {Number} module:base/constant._$CODE_ERRSERV
     */
    _p._$CODE_ERRSERV = 10006-_seed;
    /**
     * 异常终止的错误码
     *
     * @const {Number} module:base/constant._$CODE_ERRABRT
     */
    _p._$CODE_ERRABRT = 10007-_seed;
    /**
     * 请求头content-type统一名称
     *
     * @const {Number} module:base/constant._$HEAD_CT
     */
    _p._$HEAD_CT      = 'Content-Type';
    /**
     * 文本请求头content-type值
     *
     * @const {String} module:base/constant._$HEAD_CT_PLAN
     */
    _p._$HEAD_CT_PLAN = 'text/plain';
    /**
     * 文件请求头content-type值
     *
     * @const {String} module:base/constant._$HEAD_CT_FILE
     */
    _p._$HEAD_CT_FILE = 'multipart/form-data';
    /**
     * 表单请求头content-type值
     *
     * @const {String} module:base/constant._$HEAD_CT_FORM
     */
    _p._$HEAD_CT_FORM = 'application/x-www-form-urlencoded';
    /**
     * 空图片BASE64编码地址，低版本浏览器使用图片地址
     *
     * @const {String} module:base/constant._$BLANK_IMAGE
     */
    _p._$BLANK_IMAGE  = _c._$get('blank.png')||'data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';

    if (CMPT){
        NEJ.copy(NEJ.P('nej.g'),_p);
    }

    return _p;
},'083c017e2a5450e295d417651bc93279','1c763bdf30dcc32bedb3bfa2afd89a26');
I$('9964aa517a3b6122213b910cbdd3428e',function (_u,_p){
    var _cache = {};
    /**
     * 添加可链式调用的接口
     *
     * 添加可链式接口
     * ```javascript
     * NEJ.define([
     *     'base/chain'
     * ],function(_l){
     *     var _map = {};
     *
     *      _map._$api1 = function(){
     *          // TODO
     *      }
     *      
     *      _map._$api2 = function(){
     *          // TODO
     *      }
     * 
     *     _l._$merge(_map);
     * });
     * ```
     *
     * 使用链式调用接口
     * ```javascript
     * NEJ.define([
     *     '/path/to/api.js',
     *     'util/chain/chainable'
     * ],function(_x,$){
     *     // 使用链式调用api
     *     $('body > p')._$api1()._$api2();
     * });
     * ```
     * 
     * @method module:base/chain._$merge
     * @param  {Object} arg0 - 接口集合
     * @return {Void}
     */
    _p._$merge = function(_map){
        _u._$merge(_cache,_map);
    };
    /**
     * 导出链式接口列表
     * 
     * @method module:base/chain._$dump
     * @return {Object} 链式接口列表
     */
    _p._$dump = function(){
        return _cache;
    };
    /**
     * 清除链式列表
     * 
     * @method module:base/chain._$clear
     * @return {Void}
     */
    _p._$clear = function(){
        _cache = {};
    };
    
    return _p;
},'3695926c26a1894dcce266fdc52d2e3a');
I$('8a0da5ebd8c45378075fcb865cd929cb',function (_u,_m,_p,_o,_f,_r){
    /**
     * 验证事件信息
     * @param  {Node}     节点
     * @param  {String}   事件类型
     * @param  {Function} 处理函数
     * @return {Object}   验证后事件信息 type/handler
     */
    _p.__checkEvent = (function(){
            // need change event name
        var _tmap = {
                touchstart:'mousedown',
                touchmove:'mousemove',
                touchend:'mouseup'
            },
            // need prefix
            _pfix = _m._$KERNEL.prefix,
            _emap = {
                transitionend:'TransitionEnd',
                animationend:'AnimationEnd',
                animationstart:'AnimationStart',
                animationiteration:'AnimationIteration',
                visibilitychange:'visibilitychange',
                fullscreenchange:'fullscreenchange'
            };
        var _fmap = {
            enter:function(_element,_type,_handler){
                var _result = {
                    type:'keypress'
                };
                if (!!_handler){
                    _result.handler = function(_event){
                        if (_event.keyCode===13){
                            _handler.call(_element,_event);
                        }
                    };
                }
                return _result;
            }
        };
        var _doPrefix = function(_name){
            return (_pfix.evt||_pfix.pro)+_name;
        };
        return function(_element,_type,_handler){
            var _result = {
                type:_type,
                handler:_handler
            };
            if (!(('on'+_type) in _element)){
                // check name convert
                var _name = _tmap[_type];
                if (!!_name){
                    _result.type = _name;
                    return _result;
                }
                // check prefix complete
                var _name = _emap[_type];
                if (!!_name){
                    _result.type = _doPrefix(_name);
                    return _result;
                }
                // check event update
                var _func = _fmap[_type];
                if (!!_func){
                    return _func.apply(null,arguments);
                }
            }
            return _result;
        };
    })();
    /**
     * 添加事件
     * @param  {Node}     节点
     * @param  {String}   事件
     * @param  {Function} 处理函数
     * @param  {Boolean}  是否捕捉阶段
     * @return {Void}
     */
    _p.__addEvent = function(){
        var _args = arguments;
        if (DEBUG){
            if (!(('on'+_args[1]) in _args[0])){
                console.log('not support event['+_args[1]+'] for '+_args[0]);
            }
        }
        _args[0].addEventListener(
            _args[1],_args[2],_args[3]
        );
    };
    /**
     * 删除事件
     * @param  {Node}     节点
     * @param  {String}   事件
     * @param  {Function} 处理函数
     * @param  {Boolean}  是否捕捉阶段
     * @return {Void}
     */
    _p.__delEvent = function(){
        var _args = arguments;
        _args[0].removeEventListener(
            _args[1],_args[2],_args[3]
        );
    };
    /**
     * 触发对象的某个事件
     * @param  {String|Node} 节点ID或者对象
     * @param  {String}      鼠标事件类型
     * @return {Void}
     */
    _p.__dispatchEvent = function(_element,_type,_options){
        var _event = document.createEvent('Event');
        _event.initEvent(_type,!0,!0);
        _u._$merge(_event,_options);
        _element.dispatchEvent(_event);
    };
    
    return _p;
},'3695926c26a1894dcce266fdc52d2e3a','d552af5339ac27c31f311f3fdadefdc3');
I$('e51e56f12f3ae38ab3a25f03a298bafa',function(b1524476395011,_h,_u,_p,_o,_f,_r){if (b1524476395011._$KERNEL.engine==='trident'&&b1524476395011._$KERNEL.release>='6.0'){I$('3281617e4656fc470993df05ce469d33',function (){
        /**
         * 验证事件信息
         * @param  {Node}     节点
         * @param  {String}   事件类型
         * @param  {Function} 处理函数
         * @return {Object}   验证后事件信��? type/handler
         */
        _h.__checkEvent = (function(){
            var _emap = {
                touchcancel:'MSPointerCancel',
                touchstart:'MSPointerDown',
                touchmove:'MSPointerMove',
                touchend:'MSPointerUp',
                fullscreenchange:'MSFullscreenChange'
            };
            return _h.__checkEvent._$aop(function(_event){
                var _args = _event.args;
                // check event convert
                var _name = _emap[_args[1]];
                if (!!_name){
                    _event.stopped = !0;
                    _event.value = {
                        type:_name,
                        handler:_args[2]
                    };
                }
            });
        })();
    });}
if (b1524476395011._$KERNEL.engine==='trident'&&b1524476395011._$KERNEL.release=='5.0'){I$('ea5625ee7f345b2a8f213251e8cf4fb4',function (){
        /**
         * 验证事件信息
         * @param  {Node}     节点
         * @param  {String}   事件类型
         * @param  {Function} 处理函数
         * @return {Object}   验证后事件信��? type/handler
         */
        _h.__checkEvent = (function(){
            var _vmap = {};
            var _fmap = {
                input:function(_element,_type,_handler){
                    // for check type only
                    if (!_handler){
                        return {type:_type};
                    }
                    // fix input backspace/delete/ctrl+x bug
                    return {
                        type:_type,
                        handler:function(_event){
                            var _id = _element.id;
                            _vmap[_id] = _element.value;
                            _handler.call(_element,_event);
                        },
                        link:[[
                            document,'selectionchange',
                            function(_event){
                                var _id = _element.id;
                                if (_element!=document.activeElement){
                                    delete _vmap[_id];
                                    return;
                                }
                                if (_vmap[_id]!==_element.value){
                                    _vmap[_id] = _element.value;
                                    _handler.call(_element,_event);
                                }
                            }
                        ]]
                    };
                }
            };
            return _h.__checkEvent._$aop(function(_event){
                var _args = _event.args;
                // check event update
                var _func = _fmap[_args[1]];
                if (!!_func){
                    _event.stopped = !0;
                    _event.value = _func.apply(null,_args);
                }
            });
        })();
    });}
if (b1524476395011._$KERNEL.engine==='trident'&&b1524476395011._$KERNEL.release>='5.0'){I$('a7ca4d9d6ff0eae898ebe85b843010c0',function (){
        // must use attach/detach for event
        var _attached = {
            'propertychange':1
        };
        /**
         * 添加事件
         * @param  {Node}     节点
         * @param  {String}   事件
         * @param  {Function} 处理函数
         * @param  {Boolean}  是否捕捉阶段
         * @return {Void}
         */
        _h.__addEvent = 
        _h.__addEvent._$aop(function(_event){
            var _args = _event.args;
            if (_attached[_args[1]]!=null&&!!_args[0].attachEvent){
                _event.stopped = !0;
                _args[0].attachEvent('on'+_args[1],_args[2]);
            }
        });
        /**
         * 删除事件
         * @param  {Node}     节点
         * @param  {String}   事件
         * @param  {Function} 处理函数
         * @param  {Boolean}  是否捕捉阶段
         * @return {Void}
         */
        _h.__delEvent = 
        _h.__delEvent._$aop(function(_event){
            var _args = _event.args,
                _alias = _attached[_args[1]];
            if (_attached[_args[1]]!=null&&!!_args[0].detachEvent){
                _event.stopped = !0;
                _args[0].detachEvent('on'+_args[1],_args[2]);
            }
        });
    });}
if (b1524476395011._$KERNEL.engine==='trident'&&b1524476395011._$KERNEL.release<='4.0'){I$('c4d0210553d60c334b0badfa280b2af1',function (){
        /**
         * 验证事件信息
         * @param  {Node}     节点
         * @param  {String}   事件类型
         * @param  {Function} 处理函数
         * @return {Object}   验证后事件信��? type/handler
         */
        _h.__checkEvent = (function(){
            var _lmap = {};
            var _fmap = {
                input:function(_element,_type,_handler){
                    var _result = {
                        type:'propertychange'
                    };
                    if (!!_handler){
                        var _id = _element.id;
                        var _hack = function(_event){
                            if (!!_element.value&&!_lmap['x-'+_id]){
                                _lmap['x-'+_id] = !0;
                                _handler.call(_element,_event);
                            }
                        };
                        _result.handler = function(_event){
                            // for input.value or textarea.value
                            if (('value' in _element)&&
                                _event.propertyName=='value'){
                                // lock cycle trigger
                                if (!!_lmap[_id]){
                                    return;
                                }
                                _lmap[_id] = !0;
                                _handler.call(_element,_event);
                                delete _lmap[_id];
                            }
                        };
                        _result.link = [
                            [_element,'keyup',_hack],
                            [_element,'mouseup',_hack],
                            [_element,'mousemove',_hack]
                        ];
                        _result.destroy = function(){
                            delete _lmap[_id];
                            delete _lmap['x-'+_id];
                        };
                    }
                    return _result;
                },
                load:function(_element,_type,_handler){
                    var _result = {
                        type:'readystatechange'
                    };
                    if (!!_handler){
                        _result.handler = function(_event){
                            if (_element.readyState=='loaded'||
                                _element.readyState=='complete'){
                                _handler.call(_element,_event);
                            }
                        };
                    }
                    return _result;
                }
            };
            return _h.__checkEvent._$aop(function(_event){
                var _args = _event.args;
                // check event update
                var _func = _fmap[_args[1]];
                if (!!_func){
                    _event.stopped = !0;
                    _event.value = _func.apply(null,_args);
                }
                // use element for this in handler
                if (!!_args[2]){
                    _args[2] = _args[2]._$bind(_args[0]);
                }
            });
        })();
        /**
         * 添加事件
         * @param  {Node}     节点
         * @param  {String}   事件
         * @param  {Function} 处理函数
         * @param  {Boolean}  是否捕捉阶段
         * @return {Void}
         */
        _h.__addEvent = function(){
            var _args = arguments;
            if (DEBUG){
                if (!(('on'+_args[1]) in _args[0])){
                    console.log('not support event['+_args[1]+'] for '+_args[0]);
                }
            }
            _args[0].attachEvent('on'+_args[1],_args[2]);
        };
        /**
         * 删除事件
         * @param  {Node}     节点
         * @param  {String}   事件
         * @param  {Function} 处理函数
         * @param  {Boolean}  是否捕捉阶段
         * @return {Void}
         */
        _h.__delEvent = function(){
            var _args = arguments;
            _args[0].detachEvent('on'+_args[1],_args[2]);
        };
        /**
         * 触发对象的某个事��?
         * @param  {String|Node} 节点ID或�?�对��?
         * @param  {String}      鼠标事件类型
         * @return {Void}
         */
        _h.__dispatchEvent = (function(){
            var _omap = {
                propertychange:{propertyName:'value'}
            };
            return function(_element,_type,_options){
                var _event = document.createEventObject();
                try{
                    _u._$merge(_event,_omap[_type],_options);
                    _element.fireEvent('on'+_type,_event);
                }catch(ex){
                    // ignore unrecognized event name
                    console.error(ex.message);
                    console.error(ex.stack);
                }
            };
        })();
    });}
if (b1524476395011._$KERNEL.engine==='gecko'){I$('ab75be0ff51d8736b9d570ea669d01ca',function (){
        /**
         * 验证事件信息
         * @param  {Node}     节点
         * @param  {String}   事件类型
         * @param  {Function} 处理函数
         * @return {Object}   验证后事件信��? type/handler
         */
        _h.__checkEvent = (function(){
            var _nreg = /^(?:transitionend|animationend|animationstart|animationiteration)$/i;
            var _fmap = {
                mousewheel:function(_element,_type,_handler){
                    var _result = {
                        type:'MozMousePixelScroll'
                    };
                    if (!!_handler){
                        _result.handler = function(_event){
                            var _delta = _event.detail;
                            _event.wheelDelta = -_delta;
                            _event.wheelDeltaY = -_delta;
                            _event.wheelDeltaX = 0;
                            _handler.call(_element,_event);
                        };
                    }
                    return _result;
                }
            };
            return _h.__checkEvent._$aop(function(_event){
                var _args = _event.args;
                // check animation event
                if (_nreg.test(_args[1])){
                    _event.stopped = !0;
                    _event.value = {
                        type:_args[1],
                        handler:_args[2]
                    };
                }
                // check event update
                var _func = _fmap[_args[1]];
                if (!!_func){
                    _event.stopped = !0;
                    _event.value = _func.apply(null,_args);
                }
            });
        })();
    });}return _h;},'d552af5339ac27c31f311f3fdadefdc3','8a0da5ebd8c45378075fcb865cd929cb','3695926c26a1894dcce266fdc52d2e3a');
I$('0dd9ac3de45a7a1ce7c2f3ff80d53fcc',function (NEJ,_e,_u,_x,_h,_p,_o,_f,_r){
    // {id:{type:[{type:'click',func:function,sfun:function,capt:true},...]}}
    // id   - element id
    // type - event name, no on prefix
    // func - event after wrapper
    // capt - capture flag
    // sfun - event before wrapper
    // link - events link to this event [[element,type,handler,capture],...]
    var _xcache = {},
        _y = {}; // chainable methods
    /*
     * 取事件类型列表
     * @param  {String} 事件类型
     * @return {Array}  事件列表
     */
    var _getTypeList = (function(){
        var _reg = /[\s,;]+/;
        return function(_type){
            var _type = (_type||'').trim().toLowerCase();
            return !_type?null:_type.split(_reg);
        };
    })();
    /*
     * 取鼠标相对于BODY的偏移
     * @param  {Event}  事件对象
     * @param  {String} 类型，X/Y
     * @param  {String} 滚动偏移名称，Left/Top
     * @return {Void}
     */
    var _getClientOffset = function(_event,_type,_name){
        var _key1 = 'page'+_type;
        return _event[_key1]!=null?_event[_key1]:(
            _event['client'+_type]+
            _e._$getPageBox()['scroll'+_name]
        );
    };
    /*
     * 取鼠标相对于页面的偏移
     * @param  {Event}  事件对象
     * @param  {String} 类型，X/Y
     * @param  {String} 滚动偏移名称，Left/Top
     * @return {Void}
     */
    var _getPageOffset = function(_event,_type,_name){
        var _key3 = 'scroll'+_name;
            _node = _p._$getElement(_event),
            _xret = _getClientOffset(_event,_type,_name);
        while(!!_node&&
                _node!=document.body&&
                _node!=document.documentElement){
            _xret += _node[_key3]||0;
            _node = _node.parentNode;
        }
        return _xret;
    };
    /*
     * 格式化添加删除事件接口参数
     * @param  {String|Node} 节点ID或者对象
     * @param  {String}      事件类型，不带on前缀，不区分大小写，多个事件用空格分隔
     * @param  {Function}    事件处理函数
     * @param  {Boolean}     是否捕获阶段事件，IE低版本浏览器忽略此参数
     * return  {Object}      格式化后参数
     */
    var _doFormatArgs = function(_element,_type,_handler,_capture){
        var _result = {};
        // check element
        _element = _e._$get(_element);
        if (!_element){
            return null;
        }
        _e._$id(_element);
        _result.element = _element;
        // check event handler
        if (!_u._$isFunction(_handler)){
            return null;
        }
        _result.handler = _handler;
        // check type
        var _type = _getTypeList(_type);
        if (!_type){
            return null;
        }
        // save info
        _result.type = _type;
        _result.capture = !!_capture;
        return _result;
    };
    /**
     * 节点添加事件，
     * 支持添加自定义事件，
     * 对于自定义事件的实现逻辑由其他模块负责实现
     *
     * 结构举例
     * ```html
     *   <div id="abc">123</div>
     * ```
     *
     * 脚本举例
     * ```javascript
     *   NEJ.define([
     *       'base/event'
     *   ],function(_v){
     *       // 添加系统预定义事件
     *       _v._$addEvent(
     *           'abc','mouseover',function(_event){
     *               // TODO something
     *           },false
     *       );
     *
     *       // 添加自定义事件，回车事件
     *       _v._$addEvent(
     *           'abc','enter',function(_event){
     *               // TODO something
     *           },false
     *       );
     *
     *       // 添加多个事件，用空格分隔
     *       _v._$addEvent(
     *           'abc','mouseover click mousedown',
     *           function(_event){
     *               // TODO something
     *           },false
     *       );
     *   });
     * ```
     *
     * 带自定义事件的类构造或者对象
     * ```javascript
     * NEJ.define([
     *     'base/klass',
     *     'base/event',
     *     'util/event',
     *     'util/event/event'
     * ],function(_k,_v,_t0,_t1,_p){
     *     // 定义类
     *     _p._$$Klass = _k._$klass();
     *     var _pro = _p._$$Klass._$extend(_t0._$$EventTarget);
     *     
     *     // TODO
     *     
     *     // 添加自定义事件支持
     *     // 对节点的事件同样支持此自定义事件
     *     _t1._$$CustomEvent._$allocate({
     *         element:_p._$$Klass,
     *         event:['ok','fail']
     *     });
     * 
     *     // 使用事件接口添加/删除/调度事件
     *     var _handler = function(_event){
     *         // TODO
     *     };
     *     _v._$addEvent(_p._$$Klass,'ok',_handler);
     *     _v._$delEvent(_p._$$Klass,'ok',_handler);
     * });
     * ```
     * 
     * @method module:base/event._$addEvent
     * @see    module:base/event._$delEvent
     * @param  {String|Node|Object} arg0 - 节点或者类构造或者对象
     * @param  {String}      arg1 - 事件类型，不带on前缀，不区分大小写，多个事件用空格分隔
     * @param  {Function}    arg2 - 事件处理函数
     * @param  {Boolean}     arg3 - 是否捕获阶段事件，IE低版本浏览器忽略此参数
     * @return {Void}
     */
    /**
     * @method CHAINABLE._$addEvent
     * @see module:base/event._$addEvent
     */
    _p._$addEvent = 
    _y._$addEvent = (function(){
        // cache event
        // type/handler/link
        var _doCacheEvent = function(_type,_source,_real){
            var _id = _e._$id(_source.element),
                _cch_id = _xcache[_id]||{},
                _cch_tp = _cch_id[_type]||[];
            _cch_tp.push({
                type:_real.type||_type,
                func:_real.handler||_source.handler,
                sfun:_source.handler,
                capt:_source.capture,
                link:_real.link,
                destroy:_real.destroy
            });
            _cch_id[_type] = _cch_tp;
            _xcache[_id] = _cch_id;
        };
        return function(){
            var _args = _doFormatArgs.apply(null,arguments);
            if (!_args) return;
            _u._$forEach(
                _args.type,function(_name){
                    var _argc = _h.__checkEvent(
                        _args.element,
                        _name,_args.handler
                    );
                    // add event
                    _h.__addEvent(
                        _args.element,_argc.type,
                        _argc.handler,_args.capture
                    );
                    // add event link
                    _u._$forIn(
                        _argc.link,function(_item){
                            _item[3] = !!_item[3];
                            _h.__addEvent.apply(_h,_item);
                            _item[0] = _e._$id(_item[0]);
                        }
                    );
                    // cache event
                    _doCacheEvent(_name,_args,_argc);
                }
            );
        };
    })();
    /**
     * 节点删除事件，输入参数必须保证与添加接口_$addEvent输入参数完全一致
     *
     * 结构举例
     * ```html
     *   <div id="abc">123</div>
     * ```
     *
     * 脚本举例
     * ```javascript
     *   NEJ.define([
     *       'base/event'
     *   ],function(_v){
     *       // 事件回调业务逻辑
     *       var _doCallback = function(_event){
     *           // TODO something
     *           alert('0');
     *       };
     *
     *       // 添加事件
     *       _v._$addEvent('abc','mouseover',_doCallback,false);
     *       // 删除事件，这里参数必须保持完全一致
     *       _v._$delEvent('abc','mouseover',_doCallback,false);
     *
     *       // 比如以下方式虽然回调的业务逻辑一致，但是无法删除之前添加的事件
     *       _v._$delEvent(
     *           'abc',"mouseover",function(_event){
     *               // TODO something
     *               alert('0');
     *           },false
     *       );
     *
     *       // 删除多个事件
     *       _v._$delEvent(
     *           'abc','mouseover click mouseup',
     *           _doCallback,false
     *       );
     *   });
     * ```
     *
     * @method module:base/event._$delEvent
     * @see    module:base/event._$addEvent
     * @param  {String|Node} arg0 - 节点ID或者对象
     * @param  {String}      arg1 - 事件类型，不带on前缀，不区分大小写，多个事件用空格分隔
     * @param  {Function}    arg2 - 事件处理函数
     * @param  {Boolean}     arg3 - 是否捕获阶段事件
     * @return {Void}
     */
    /**
     * @method CHAINABLE._$delEvent
     * @see module:base/event._$delEvent
     */
    _p._$delEvent = 
    _y._$delEvent = (function(){
        var _unCacheEvent = function(_type,_conf){
            var _id = _e._$id(_conf.element),
                _cch_id = _xcache[_id]||_o,
                _cch_tp = _cch_id[_type],
                _index = _u._$indexOf(
                    _cch_tp,function(_item){
                        // check handler and capture
                        return _item.sfun===_conf.handler&&
                               _item.capt===_conf.capture;
                    }
                );
            // check result
            var _result = null;
            if (_index>=0){
                var _item = _cch_tp.splice(_index,1)[0];
                _result = [[
                    _conf.element,_item.type,
                    _item.func,_conf.capture
                ]];
                if (!!_item.link){
                    // complete element by id
                    _u._$forEach(_item.link,function(v){
                        v[0] = _e._$get(v[0]);
                    });
                    _result.push.apply(_result,_item.link);
                }
                if (!!_item.destroy){
                    _item.destroy();
                }
                // clear cache
                if (!_cch_tp.length){
                    delete _cch_id[_type];
                }
                if (!_u._$hasProperty(_cch_id)){
                    delete _xcache[_id];
                }
            }
            return _result;
        };
        return function(){
            var _args = _doFormatArgs.apply(null,arguments);
            if (!_args) return;
            _u._$forEach(
                _args.type,function(_name){
                    _u._$forEach(
                        _unCacheEvent(_name,_args),
                        function(_item){
                            _h.__delEvent.apply(_h,_item);
                        }
                    );
                }
            );
        };
    })();
    /**
     * 清除节点事件
     *
     * 结构举例
     * ```html
     *   <div id="abc">123</div>
     * ```
     *
     * 脚本举例
     * ```javascript
     *   NEJ.define([
     *       'base/event'
     *   ],function(_v){
     *       // 添加事件
     *       _v._$addEvent(
     *           'abc','mouseover',function(_event){
     *               // TODO something
     *           }
     *       );
     *       _v._$addEvent(
     *           'abc','mouseover',function(_event){
     *               // TODO something
     *           },true
     *       );
     *       _v._$addEvent(
     *           'abc','custom',function(_event){
     *               // TODO something
     *           }
     *       );
     *
     *       // 清除节点所有事件，包括两个mouseover事件和一个custom事件
     *       _v._$clearEvent('abc');
     *
     *       // 清除节点指定类型事件，只清除两个mouseover事件
     *       _v._$clearEvent('abc','mouseover');
     *
     *       // 清除多个事件，用空格分隔
     *       _v._$clearEvent('abc','mouseover custom');
     *   });
     * ```
     *
     * @method module:base/event._$clearEvent
     * @see    module:base/event._$delEvent
     * @param  {String|Node} arg0 - 节点ID或者对象
     * @param  {String}      arg1 - 事件类型，不带on前缀，不区分大小写，多个事件用空格分隔
     * @return {Void}
     */
    /**
     * @method CHAINABLE._$clearEvent
     * @see module:base/event._$clearEvent
     */
    _p._$clearEvent = 
    _y._$clearEvent = (function(){
        var _doClearEvent = function(_id,_name,_list){
            _u._$reverseEach(
                _list,function(_item){
                    _p._$delEvent(
                        _id,_name,_item.sfun,_item.capt
                    );
                }
            );
        };
        return function(_element,_type){
            var _id = _e._$id(_element);
            if (!_id) return;
            var _cch_id = _xcache[_id];
            if (!!_cch_id){
                _type = _getTypeList(_type);
                if (!!_type){
                    // clear event by type
                    _u._$forEach(
                        _type,function(_name){
                            _doClearEvent(_id,_name,_cch_id[_name]);
                        }
                    );
                }else{
                    // clear all event
                    _u._$loop(
                        _cch_id,function(_value,_name){
                            _p._$clearEvent(_element,_name);
                        }
                    );
                }
            }
        };
    })();
    /**
     * 触发对象的某个事件，注：对于IE浏览器该接口节点事件有以下限制
     *
     * * 捕获阶段支持需要浏览器IE9+
     * * 节点上自定义事件支持需要浏览器IE9+
     *
     *
     * 结构举例
     * ```html
     *   <div id="abc">123</div>
     * ```
     *
     * 脚本举例
     * ```javascript
     *   NEJ.define([
     *       'base/event'
     *   ],function(_v){
     *       // 注册鼠标事件
     *       _v._$addEvent(
     *           'abc','click',function(_event){
     *               // 获取鼠标事件触发的垂直位置
     *               var _y = _v._$pageY(_event);
     *           }
     *       );
     *       // 触发鼠标事件
     *       _v._$dispatchEvent('abc','click');
     *
     *       // 注册自定义事件
     *       _v._$addEvent(
     *           'abc','ok',function(_event){
     *               // TODO something
     *           }
     *       );
     *       // 触发自定义事件
     *       _v._$dispatchEvent('abc','ok');
     *   });
     * ```
     *
     * @method module:base/event._$dispatchEvent
     * @param  {String|Node} arg0 - 节点ID或者对象
     * @param  {String}      arg1 - 鼠标事件类型，不区分大小写，多个事件用空格分隔
     * @param  {Object}      arg2 - 传递的参数信息
     * @return {Void}
     */
    /**
     * @method CHAINABLE._$dispatchEvent
     * @see module:base/event._$dispatchEvent
     */
    _p._$dispatchEvent = 
    _y._$dispatchEvent = function(_element,_type,_options){
        var _element = _e._$get(_element);
        if (!!_element){
            _u._$forEach(
                _getTypeList(_type),function(_name){
                    var _result = _h.__checkEvent(
                        _element,_name
                    );
                    _h.__dispatchEvent(
                        _element,_result.type,_options
                    );
                }
            );
        }
    };
    /**
     * 获取触发事件的节点，可以传入过滤接口来遍历父节点找到符合条件的节点
     *
     * 结构举例
     * ```html
     *   <div id="a">
     *     <p>
     *       <span id="b">123</span>
     *       <span link="a">123</span>
     *       <span class="a link">123</span>
     *       <span data-link="a">123</span>
     *       <label>aaaaa</label>
     *     </p>
     *   </div>
     * ```
     *
     * 脚本举例
     * ```javascript
     *   NEJ.define([
     *       'base/event'
     *   ],function(_v){
     *       // 取事件触发节点
     *       _v._$addEvent(
     *           'b','click',function(_event){
     *               // id为b的节点
     *               var _node = _v._$getElement(_event);
     *               // TODO something
     *           }
     *       );
     *
     *       // 事件触发，取id是a的节点
     *       _v._$addEvent(
     *           'b','click',function(_event){
     *               // id为a的节点
     *               var _node = _v._$getElement(
     *                   _event,function(_element){
     *                       return _element.id=='a';
     *                   }
     *               );
     *               // TODO something
     *
     *               // class含link或者属性含link或者data-link的节点
     *               var _node = _v._$getElement(_event,'link');
     *
     *               // 仅匹配class即 class="link xx xxx"
     *               var _node = _v._$getElement(_event,'c:link');
     *
     *               // 仅匹配dataset即 data-link="aaaa"
     *               var _node = _v._$getElement(_event,'d:link');
     *
     *               // 仅匹配attributer即 link="aaa"
     *               var _node = _v._$getElement(_event,'a:link');
     *
     *               // 仅匹配tag即 <label>
     *               var _node = _v._$getElement(_event,'t:label');
     *           }
     *       );
     *   });
     * ```
     *
     * @method module:base/event._$getElement
     * @param  {Event}    arg0 - 事件对象
     * @param  {Function} arg1 - 过滤接口
     * @return {Node}            符合条件的节点
     */
    _p._$getElement = function(_event){
        if (!_event) return null;
        var _element = _event.target||
                _event.srcElement,
            _filter = arguments[1];
        return _e._$getParent(_element,_filter);
    };
    /**
     * 阻止事件，包括默认事件和传递事件
     *
     * 结构举例
     * ```html
     *   <div id="a">
     *     <a href="xxx.html" id="b">123</a>
     *   </div>
     * ```
     *
     * 脚本举例
     * ```javascript
     *   NEJ.define([
     *       'base/event'
     *   ],function(_v){
     *       // 事件回调中阻止事件冒泡
     *       _v._$addEvent(
     *           'b','click',function(_event){
     *               // 阻止事件继续传播
     *               // 阻止链接打开的默认事件
     *               _v._$stop(_event);
     *           }
     *       );
     *
     *       // a节点上的点击事件不会触发
     *       _v._$addEvent(
     *           'a','click',function(_event){
     *               alert(0);
     *               // TODO something
     *           }
     *       );
     *   });
     * ```
     *
     * @method module:base/event._$stop
     * @see    module:base/event._$stopBubble
     * @see    module:base/event._$stopDefault
     * @param  {Event} arg0 - 要阻止的事件对象
     * @return {Void}
     */
    _p._$stop = function(_event){
        _p._$stopBubble(_event);
        _p._$stopDefault(_event);
    };
    /**
     * 阻止事件的冒泡传递
     *
     * 结构举例
     * ```html
     *   <div id="a">
     *     <a href="xxx.html" id="b">123</a>
     *   </div>
     * ```
     *
     * 脚本举例
     * ```javascript
     *   NEJ.define([
     *       'base/event'
     *   ],function(_v){
     *       // 事件回调中阻止事件冒泡
     *       _v._$addEvent(
     *           'b','click',function(_event){
     *               // 阻止事件继续传播
     *               // 链接仍然会被打开
     *               _v._$stopBubble(_event);
     *           }
     *       );
     *
     *       // a节点上的点击事件不会触发
     *       _v._$addEvent(
     *           'a','click',function(_event){
     *               alert(0);
     *               // TODO something
     *           }
     *       );
     *   });
     * ```
     *
     * @see    module:base/event._$stop}
     * @method module:base/event._$stopBubble
     * @param  {Event} arg0 - 要阻止的事件对象
     * @return {Void}
     */
    _p._$stopBubble = function(_event){
        if (!!_event){
            !!_event.stopPropagation
            ? _event.stopPropagation()
            : _event.cancelBubble = !0;
        }
    };
    /**
     * 阻止标签的默认事件
     *
     * 结构举例
     * ```html
     *   <div id="a">
     *     <a href="xxx.html" id="b">123</a>
     *   </div>
     * ```
     *
     * 脚本举例
     * ```javascript
     *   NEJ.define([
     *       'base/event'
     *   ],function(_v){
     *       // 事件回调中阻止链接默认事件
     *       _v._$addEvent(
     *           'b','click',function(_event){
     *               // 阻止链接打开页面的默认行为
     *               _v._$stopDefault(_event);
     *           }
     *       );
     *
     *       // a节点上的点击事件仍然会触发
     *       _v._$addEvent(
     *           'a','click',function(_event){
     *               alert(0);
     *               // TODO something
     *           }
     *       );
     *   });
     * ```
     *
     * @method module:base/event._$stopDefault
     * @see    module:base/event._$stop
     * @param  {Event} arg0 - 要阻止的事件对象
     * @return {Void}
     */
    _p._$stopDefault = function(_event) {
        if (!!_event){
            !!_event.preventDefault
            ? _event.preventDefault()
            : _event.returnValue = !1;
        }
    };
    /**
     * 取事件相对于页面的位置
     *
     * 结构举例
     * ```html
     *   <div id="abc" style="width:100%;height:100%;">123</div>
     * ```
     *
     * 脚本举例
     * ```javascript
     *   NEJ.define([
     *       'base/event'
     *   ],function(_v){
     *       // 回调中取鼠标位置
     *       _v._$addEvent(
     *           'abc','click',function(_event){
     *               // 获取鼠标事件触发的水平、垂直位置
     *               var _pos = _v._$page(_event);
     *           }
     *       );
     *   });
     * ```
     *
     * @method module:base/event._$page
     * @see    module:base/event._$pageX
     * @see    module:base/event._$pageY
     * @param  {Event}  arg0 - 事件对象
     * @return {Object}        位置信息，{x:10,y:10}
     */
    _p._$page = function(_event){
        return {
            x:_p._$pageX(_event),
            y:_p._$pageY(_event)
        };
    };
    /**
     * 取事件相对于页面左侧的位置，累加所有内部滚动高度
     *
     * 结构举例
     * ```html
     *   <div id="abc" style="width:100%;height:100%;">123</div>
     * ```
     *
     * 脚本举例
     * ```javascript
     *   NEJ.define([
     *       'base/event'
     *   ],function(_v){
     *       // 回调中取鼠标位置
     *       _p._$addEvent(
     *           'abc','click',function(_event){
     *               // 获取鼠标事件触发的水平位置
     *               var _x = _v._$pageX(_event);
     *           }
     *       );
     *   });
     * ```
     *
     * @method module:base/event._$pageX
     * @see    module:base/event._$clientX
     * @param  {Event}  arg0 - 事件对象
     * @return {Number}        水平位置
     */
    _p._$pageX = function(_event){
        return _getPageOffset(_event,'X','Left');
    };
    /**
     * 取事件相对于页面顶部的位置，累加所有内部滚动高度
     *
     * 结构举例
     * ```html
     *   <div id="abc" style="width:100%;height:100%;">123</div>
     * ```
     *
     * 脚本举例
     * ```javascript
     *   NEJ.define([
     *       'base/event'
     *   ],function(_v){
     *       // 回调中取鼠标位置
     *       _v._$addEvent(
     *           'abc','click',function(_event){
     *               // 获取鼠标事件触发的垂直位置
     *               var _y = _v._$pageY(_event);
     *           }
     *       );
     *   });
     * ```
     *
     * @method module:base/event._$pageY
     * @see    module:base/event._$clientY
     * @param  {Event}  arg0 - 事件对象
     * @return {Number}        垂直位置
     */
    _p._$pageY = function(_event){
        return _getPageOffset(_event,'Y','Top');
    };
    /**
     * 取事件相对于页面左侧的位置，仅累加页面滚动高度
     *
     * 结构举例
     * ```html
     *   <div id="abc" style="width:100%;height:100%;">123</div>
     * ```
     *
     * 脚本举例
     * ```javascript
     *   NEJ.define([
     *       'base/event'
     *   ],function(_v){
     *       // 回调中取鼠标位置
     *       _p._$addEvent(
     *           'abc','click',function(_event){
     *               // 获取鼠标事件触发的水平位置
     *               var _x = _v._$clientX(_event);
     *           }
     *       );
     *   });
     * ```
     *
     * @method module:base/event._$clientX
     * @see    module:base/event._$pageX
     * @param  {Event}  arg0 - 事件对象
     * @return {Number}        水平位置
     */
    _p._$clientX = function(_event){
        return _getClientOffset(_event,'X','Left');
    };
    /**
     * 取事件相对于页面顶部的位置，仅累加页面滚动高度
     *
     * 结构举例
     * ```html
     *   <div id="abc" style="width:100%;height:100%;">123</div>
     * ```
     *
     * 脚本举例
     * ```javascript
     *   NEJ.define([
     *       'base/event'
     *   ],function(_v){
     *       // 回调中取鼠标位置
     *       _v._$addEvent(
     *           'abc','click',function(_event){
     *               // 获取鼠标事件触发的垂直位置
     *               var _y = _v._$pageY(_event);
     *           }
     *       );
     *   });
     * ```
     *
     * @method module:base/event._$clientY
     * @see    module:base/event._$pageY
     * @param  {Event}  arg0 - 事件对象
     * @return {Number}        垂直位置
     */
    _p._$clientY = function(_event){
        return _getClientOffset(_event,'Y','Top');
    };
    
    // for chainable method
    _x._$merge(_y);
    
    if (CMPT){
        NEJ.copy(NEJ.P('nej.v'),_p);
    }

    return _p;
},'083c017e2a5450e295d417651bc93279','43a92a1cb30f0322e2bca627e0f6b635','3695926c26a1894dcce266fdc52d2e3a','9964aa517a3b6122213b910cbdd3428e','e51e56f12f3ae38ab3a25f03a298bafa');
I$('31891af64cb762158a2d3af5cfd930eb',function (_u,_m,_p,_o,_f,_r){
    /**
     * 从DocumentFragment中取指定ID的节点
     * @param  {Document} 文档对象
     * @param  {String}   节点标识
     * @return {Node}     指定标识的节点
     */
    _p.__getElementById = function(_fragment,_id){
        if (!!_fragment.getElementById){
            return _fragment.getElementById(''+_id);
        }
        try{
            return _fragment.querySelector('#'+_id);
        }catch(e){
            return null;
        }
    };
    /**
     * 取节点的子节点列表
     * @param  {Node}  节点ID或者对象
     * @return {Array} 子节点列表
     */
    _p.__getChildren = function(_element){
        return _u._$object2array(
            _element.children||_element.childNodes
        );
    };
    /**
     * 根据类名取节点列表
     * @param  {Node}   节点ID或者对象
     * @param  {String} 类名
     * @return {Array}  节点列表
     */
    _p.__getElementsByClassName = function(_element,_class){
        return _u._$object2array(_element.getElementsByClassName(_class));
    };
    /**
     * 取下一个兄弟节点
     * @param  {Node}  节点对象
     * @return {Node}  节点
     */
    _p.__nextSibling = function(_element){
        return _element.nextElementSibling;
    };
    /**
     * 取上一个兄弟节点
     * @param  {Node}  节点对象
     * @return {Node}  节点
     */
    _p.__previousSibling = function(_element){
        return _element.previousElementSibling;
    };
    /**
     * 设置、获取数据
     * @param {Node}     节点
     * @param {String}   标识
     * @param {Variable} 值
     */
    _p.__dataset = function(_element,_name,_value){
        _element.dataset = _element.dataset||{};
        if (_value!==undefined){
            _element.dataset[_name] = _value;
        }
        return _element.dataset[_name];
    };
    /**
     * 取节点属性值
     * @param  {Node}   节点
     * @param  {String} 属性名
     * @return {String} 属性值
     */
    _p.__getAttribute = function(_element,_name){
        if ('getAttribute' in _element){
            return _element.getAttribute(_name);
        }
    };
    /**
     * 将dom节点转为xml串
     * @param  {Node}   节点
     * @return {String} XML代码
     */
    _p.__serializeDOM2XML = function(_dom){
        return new XMLSerializer().serializeToString(_dom)||'';
    };
    /**
     * 将xml转为dom节点
     * @param  {String} XML代码
     * @return {Node}   节点
     */
    _p.__parseDOMFromXML = function(_xml){
        var _root = new DOMParser()
                       .parseFromString(_xml,'text/xml')
                       .documentElement;
        return _root.nodeName=='parsererror'?null:_root;
    };
    /**
     * 节点占全屏
     * @param  {Node}   节点
     * @param  {Object} 视窗模型
     * @return {Void}
     */
    _p.__fullScreen = function(){
        // use css fixed position
    };
    /**
     * 为节点增加用于盖select/flash等控件的层
     * @param  {Node} 节点
     * @return {Void}
     */
    _p.__mask = function(){
        // do nothing
    };
    /**
     * 去除用于盖select/flash等控件的层
     * @param  {Node} 节点
     * @return {Void}
     */
    _p.__unmask = function(){
        // do nothing
    };
    // variables
    var _ospt = _m._$SUPPORT,
        _opfx = _m._$KERNEL.prefix;
    /**
     * 指定名称是否在配置表中
     * @param  {String}  名称
     * @param  {Object}  配置表
     * @return {Boolean} 是否命中
     */
    _p.__isMatchedName = (function(){
        var _reg = /^([a-z]+?)[A-Z]/;
        return function(_name,_map){
            return !!(_map[_name]||(_reg.test(_name)&&_map[RegExp.$1]));
        };
    })();
    /**
     * 样式名称做前缀增强
     * @param  {String}  名称
     * @return {Boolean} 是否需要前缀增强
     */
    _p.__isNeedPrefixed = (function(){
        var _pmap = _u._$array2object([
            'animation','transform','transition',
            'appearance','userSelect','box','flex','column'
        ]);
        return function(_name){
            return _p.__isMatchedName(_name,_pmap);
        };
    })();
    /**
     * 格式化样式属性名称
     * border-width -> borderWidth
     * @param  {String} 样式样式名
     * @return {String} 格式化后样式名
     */
    _p.__fmtStyleName = (function(){
        var _reg = /-([a-z])/g;
        return function(_name){
            _name = _name||'';
            return _name.replace(_reg,function($1,$2){
                return $2.toUpperCase();
            });
        };
    })();
    /**
     * 针对样式名称做格式化及前缀增强
     * @param  {String} 样式名
     * @return {String} 增强后的样式名
     */
    _p.__getStyleName = (function(){
        var _reg = /^[a-z]/,
            _prefix = _opfx.css||'';
        return function(_name){
            _name = _p.__fmtStyleName(_name);
            if (!_p.__isNeedPrefixed(_name)){
                return _name;
            }
            // add prefix
            // userSelect -> webkitUserSelect
            return _prefix+_name.replace(_reg,function($1){
                return $1.toUpperCase();
            });
        };
    })();
    /**
     * 取样式值
     * @param  {String|Node} 节点
     * @param  {String}      样式名称
     * @return {Variable}    样式值
     */
    _p.__getStyleValue = function(_element,_name){
        var _current = window.getComputedStyle(_element,null);
        return _current[_p.__getStyleName(_name)]||'';
    };
    /**
     * 设置样式
     * @param  {String|Node} 节点
     * @param  {String}      样式名称
     * @param  {String}      样式值
     * @return {Void}
     */
    _p.__setStyleValue = function(_element,_name,_value){
        _element.style[_p.__getStyleName(_name)] = _value;
    };
    /**
     * 取样式变换矩阵对象
     * @param  {String}    变换信息
     * @return {CSSMatrix} 变换矩阵对象
     */
    _p.__getCSSMatrix = (function(){
        var _reg0 = /\((.*?)\)/,
            _reg1 = /\s*,\s*/,
            _klss = ['CSSMatrix',_opfx.clz+'CSSMatrix'],
            _list = ['m11','m12','m21','m22','m41','m42'];
        // matrix(1,2,3,4,5,6)
        // -> {m11:1,m12:2,m21:3,m22:4,m41:5,m42:6}
        var _doParse = function(_matrix){
            var _obj = {};
            if (_reg0.test(_matrix||'')){
                // 11,12,21,22,41,42
                _u._$forEach(
                    RegExp.$1.split(_reg1),
                    function(_value,_index){
                        _obj[_list[_index]] = _value;
                    }
                );
            }
            return _obj;
        };
        return function(_matrix){
            var _mtrx;
            _u._$forIn(_klss,function(_name){
                if (!!this[_name]){
                    _mtrx = new this[_name](_matrix||'');
                    return !0;
                }
            });
            return !_mtrx?_doParse(_matrix):_mtrx;
        };
    })();
    /**
     * 注入样式
     * @param  {Node}   样式节点
     * @param  {String} 样式内容
     * @return {Void}
     */
    _p.__injectCSSText = function(_style,_css){
        _style.textContent = _css;
    };
    /**
     * 对样式进行预处理
     * @param  {String} 待处理样式内容
     * @return {String} 处理后样式内容
     */
    _p.__processCSSText = (function(){
        var _reg0 = /\$<(.*?)>/gi,
            _reg1 = /\{(.*?)\}/g,
            _pfx = '-'+_opfx.css.toLowerCase()+'-',
            _2dmap = {
                scale:'scale({x|1},{y|1})',
                rotate:'rotate({a})',
                translate:'translate({x},{y})',
                matrix:'matrix({m11},{m12},{m21},{m22},{m41},{m42})'
            },
            _3dmap  = {
                scale:'scale3d({x|1},{y|1},{z|1})',
                rotate:'rotate3d({x},{y},{z},{a})',
                translate:'translate3d({x},{y},{z})',
                matrix:'matrix3d({m11},{m12},{m13},{m14},{m21},{m22},{m23},{m24},{m31},{m32},{m33|1},{m34},{m41},{m42},{m43},{m44|1})'
            };
        // merge template and data
        var _getTransformValue = function(_tpl,_map){
            _map = _map||_o;
            return _tpl.replace(_reg1,function($1,$2){
                var _arr = $2.split('|');
                return _map[_arr[0]]||_arr[1]||'0';
            });
        };
        // process transform value
        _p.__processTransformValue = function(_name,_data){
            var _tpl = (!_ospt.css3d?_2dmap:_3dmap)[_name.trim()];
            if (!!_tpl){
                return _getTransformValue(_tpl,_data);
            }
            return '';
        };
        return function(_css){
            if (!_css.replace){
                return _css;
            }
            return _css.replace(_reg0,function($1,$2){
                // prefix for css3
                if ($2==='vendor'){
                    return _pfx;
                }
                // parse 3D value
                var _arr = ($2||'').split('|');
                return _p.__processTransformValue(
                    _arr[0],_u._$query2object(_arr[1])
                )||$1;
            });
        };
    })();
    /**
     * 追加CSS规则
     * @param  {Node}    样式节点
     * @param  {String}  单条样式规则
     * @return {CSSRule} 样式规则对象
     */
    _p.__appendCSSText = function(_element,_css){
        var _sheet = _element.sheet,
            _length = _sheet.cssRules.length;
        _sheet.insertRule(_css,_length);
        return _sheet.cssRules[_length];
    };
    /**
     * 取待验证的样式列表
     * @param  {String} 样式，多个以空格分隔
     * @return {Array}  样式列表
     */
    _p.__getClassList = (function(){
        var _reg = /\s+/;
        return function(_class){
            _class = (_class||'').trim();
            return !!_class?_class.split(_reg):null;
        };
    })();
    /**
     * 操作样式
     * @param  {Node}   节点
     * @param  {String} 操作
     * @param  {String} 样式
     * @return {Void}
     */
    _p.__processClassName = function(_element,_type,_class){
        if (_type=='replace'){
            _p.__processClassName(
                _element,'remove',_class
            );
            _p.__processClassName(
                _element,'add',arguments[3]
            );
            return;
        }
        _u._$forEach(
            _p.__getClassList(_class),
            function(_clazz){
                _element.classList[_type](_clazz);
            }
        );
    };
    /**
     * 检测节点是否包含指定样式，多个样式用空格分隔，检测时包含其中之一即表示包含
     * @param  {Node}    节点ID或者对象
     * @param  {String}  样式串
     * @return {Boolean} 是否含指定样式
     */
    _p.__hasClassName = function(_element,_class){
        var _list = _element.classList;
        if (!_list||!_list.length){
            return !1;
        }
        return _u._$indexOf(
            _p.__getClassList(_class),
            function(_clazz){
                return _list.contains(_clazz);
            }
        )>=0;
    };
    // for init
    (function(){
        if (!_ospt.css3d){
            var _matrix = _p.__getCSSMatrix();
            _ospt.css3d = !!_matrix&&_matrix.m41!=null;
        }
    })();

    return _p;
},'3695926c26a1894dcce266fdc52d2e3a','d552af5339ac27c31f311f3fdadefdc3');
I$('fa4adc31e3482a11e7cc270432769c2b',function(_h,_m,_u,_p,_o,_f,_r){if (_m._$KERNEL.engine==='trident'){I$('a8a6428bbab7e0e7b9dad1d63629e737',function (){
        /**
         * 取节点的子节点列表
         * @param  {Node} _element 节点ID或者对象
         * @return {Array}         子节点列表
         */
        _h.__getChildren = _h.__getChildren._$aop(
            function(_event){
                var _element = _event.args[0];
                if (!!_element.children) return;
                // hack children
                _event.stopped = !0;
                var _result = [];
                _u._$forEach(
                    _element.childNodes,
                    function(_node){
                        if (_node.nodeType==1){
                            _result.push(_node);
                        }
                    }
                );
                _event.value = _result;
            }
        );
    });}
if (_m._$KERNEL.engine==='trident'&&_m._$KERNEL.release<='6.0'){I$('46c2ec7967f95c2e8a953c545ec69fc8',function (){
        /**
         * 设置、获取数据
         * @param {Node}     节点
         * @param {String}   标识
         * @param {Variable} 值
         */
        _h.__dataset = (function(){
            var _dataset = {},
                _tag = 'data-',
                _reg = /\-(.{1})/gi;
            // init element dataset
            var _init = function(_element){
                var _id = _element.id;
                if (!!_dataset[_id]) return;
                var _map = {};
                _u._$forEach(
                    _element.attributes,
                    function(_node){
                        var _key  = _node.nodeName;
                        if (_key.indexOf(_tag)!=0) return;
                        _key = _key.replace(_tag,'')
                                   .replace(_reg,function($1,$2){
                                        return $2.toUpperCase();
                                   });
                        _map[_key] = _node.nodeValue||'';
                    }
                );
                _dataset[_id] = _map;
            };
            return function(_element,_key,_value){
                _init(_element);
                var _set = _dataset[_element.id];
                if (_value!==undefined){
                    _set[_key] = _value;
                }
                return _set[_key];
            };
        })();
    });}
if (_m._$KERNEL.engine==='trident'&&_m._$KERNEL.release<='5.0'){I$('129d2bd1ff9eebaece180f9b855d4f37',function (){
        // cache background image
        try{document.execCommand('BackgroundImageCache',!1,!0);}catch(e){}
        /**
         * 注入样式
         * @param  {Node}   样式节点
         * @param  {String} 样式内容
         * @return {Void}
         */
        _h.__injectCSSText = (function(){
            var _max = 30;
            return _h.__injectCSSText._$aop(function(_event){
                var _element = _event.args[0];
                if (!_element.styleSheet) return;
                _event.stopped = !0;
                var _css = _event.args[1];
                // ie9- has 31 style/link limitation
                var _list = document.styleSheets;
                if (_list.length>_max){
                    // bad performance
                    _element = _list[_max];
                    _css = _element.cssText + _css;
                }else{
                    _element = _element.styleSheet;
                }
                _element.cssText = _css;
            });
        })();
        /**
         * 取待验证的样式正则表达式
         * @param  {String} 样式，多个以空格分隔
         * @return {RegExp} 正则表达式
         */
        _h.__getClassRegExp = (function(){
            var _reg = /\s+/g;
            return function(_class){
                _class = (_class||'').trim().replace(_reg,'|');
                return !_class?null:new RegExp('(\\s|^)(?:'+_class+')(?=\\s|$)','g');
            };
        })();
        /**
         * 操作样式
         * @param  {Node}   节点
         * @param  {String} 操作
         * @param  {String} 样式
         * @return {Void}
         */
        _h.__processClassName = function(_element,_type,_class){
            _class = _class||'';
            var _name = _element.className||'',
                _xreg = _h.__getClassRegExp(
                    _class+' '+(arguments[3]||'')
                );
            // remove all calss
            var _result = _name;
            if (!!_xreg){
                _result = _result.replace(_xreg,'');
            }
            // parse added class
            switch(_type){
                case 'remove':
                    _class = '';
                break;
                case 'replace':
                    _class = arguments[3]||'';
                break;
            }
            // generate class result
            _result = (_result+' '+_class).trim();
            if (_name!=_result){
                _element.className = _result;
            }
        };
        /**
         * 检测节点是否包含指定样式，多个样式用空格分隔，检测时包含其中之一即表示包含
         * @param  {Node}    节点ID或者对象
         * @param  {String}  样式串
         * @return {Boolean} 是否含指定样式
         */
        _h.__hasClassName = function(_element,_class){
            var _xreg = _h.__getClassRegExp(_class);
            if (!!_xreg){
                return _xreg.test(_element.className||'');
            }
            return !1;
        };
    });}
if (_m._$KERNEL.engine==='trident'&&_m._$KERNEL.release<='4.0'){I$('e7999cad2b12b7e77accedae0ddcd854',function (){
        /**
         * 根据类名取节点列表
         * @param  {Node}   节点ID或者对象
         * @param  {String} 类名
         * @return {Array}  节点列表
         */
        _h.__getElementsByClassName = function(_element,_class){
            var _result = [],
                _regexp = new RegExp('(\\s|^)(?:'+_class.replace(/\s+/g,'|')+')(?=\\s|$)');
            _u._$forEach(
                _element.getElementsByTagName('*'),
                function(_node){
                    if (_regexp.test(_node.className)){
                        _result.push(_node);
                    }
                }
            );
            return _result;
        };
        /**
         * 取下一个兄弟节点
         * @param  {Node}  节点对象
         * @return {Node}  节点
         */
        _h.__nextSibling = function(_element){
            while(_element=_element.nextSibling){
                if (_element.nodeType==1){
                    return _element;
                }
            }
        };
        /**
         * 取上一个兄弟节点
         * @param  {Node}  节点对象
         * @return {Node}  节点
         */
        _h.__previousSibling = function(_element){
            while(_element=_element.previousSibling){
                if (_element.nodeType==1){
                    return _element;
                }
            }
        };
        /**
         * 将dom节点转为xml串
         * @param  {Node}   节点
         * @return {String} XML代码
         */
        _h.__serializeDOM2XML = function(_dom){
            return ('xml' in _dom)?_dom.xml:_dom.outerHTML;
        };
        /**
         * 将xml转为dom节点
         * @param  {String} XML代码
         * @return {Node}   节点
         */
        _h.__parseDOMFromXML = (function(){
            // http://blogs.msdn.com/b/xmlteam/archive/2006/10/23/using-the-right-version-of-msxml-in-internet-explorer.aspx
            var _msxml = [
                'Msxml2.DOMDocument.6.0',
                'Msxml2.DOMDocument.3.0'
            ];
            var _getParser = function(){
                try{
                    for(var i=0,l=_msxml.length;i<l;i++){
                        return new ActiveXObject(_msxml[i]);
                    }
                }catch(ex){
                    return null;
                }
            };
            return function(_xml){
                var _parser = _getParser();
                if (!!_parser&&
                      _parser.loadXML(_xml)&&
                     !_parser.parseError.errorCode){
                    return _parser.documentElement;
                }
                return null;
            };
        })();
        /**
         * 取样式值
         * @param  {String|Node} 节点
         * @param  {String}      样式名称
         * @return {Variable}    样式值
         */
        _h.__getStyleValue = (function(){
            var _reg0 = /opacity\s*=\s*([\d]+)/i;
            var _fmap = {
                // get opacity from filter:alpha(opacity=50)
                opacity:function(_style){
                    var _result = 0;
                    if (_reg0.test(_style.filter||'')){
                        _result = parseFloat(RegExp.$1)/100;
                    }
                    return _result;
                }
            };
            return function(_element,_name){
                var _current = _element.currentStyle,
                    _func = _fmap[_name];
                if (!!_func){
                    return _func(_current);
                }
                return _current[_h.__getStyleName(_name)]||'';
            };
        })();
        /**
         * 设置样式
         * @param  {String|Node} 节点
         * @param  {String}      样式名称
         * @param  {String}      样式值
         * @return {Void}
         */
        _h.__setStyleValue = (function(){
            var _fmap = {
                // opacity -> filter:alpha(opacity=50)
                opacity:function(_element,_value){
                    _element.style.filter = 'alpha(opacity='+_value*100+')';
                }
            };
            return function(_element,_name,_value){
                var _func = _fmap[_name];
                if (!!_func){
                    _func(_element,_value);
                }else{
                    _element.style[_h.__getStyleName(_name)] = _value;
                }
            };
        })();
        /**
         * 追加CSS规则
         * @param  {Node}    样式节点
         * @param  {String}  单条样式规则
         * @return {CSSRule} 样式规则对象
         */
        _h.__appendCSSText = function(_element,_css){
            var _sheet = _element.styleSheet,
                _length = _sheet.rules.length,
                _arr = _css.split(/[\{\}]/);
            _sheet.addRule(_arr[0],_arr[1],_length);
            return _sheet.rules[_length];
        };
     });}
if (_m._$KERNEL.engine==='trident'&&_m._$KERNEL.release<='3.0'){I$('207be283ef0ed4a9de71db637860904c',function (){
        /**
         * 取节点属性值
         * @param  {Node}   节点
         * @param  {String} 属性名
         * @return {String} 属性值
         */
        _h.__getAttribute =
        _h.__getAttribute._$aop(null,function(_event){
            // fix ie7 maxlength default value 2147483647
            var _args = _event.args;
            if (_args[1]=='maxlength'&&
                _event.value==2147483647){
                _event.value = null;
            }
        });
    });}
if (_m._$KERNEL.engine==='trident'&&_m._$KERNEL.release<='2.0'){I$('ba2cddecd8600523f357936ae629ec99',function (){
        /**
         * 节点占全屏
         * @param  {Node}   节点
         * @param  {Object} 视窗模型
         * @return {Void}
         */
        _h.__fullScreen = function(_element,_viewport){
            var _style = _element.style;
            _style.width = _viewport.scrollWidth+'px';
            _style.height = _viewport.scrollHeight+'px';
        };
        /**
         * 为节点增加用于盖select/flash等控件的层
         * @param  {Node} 节点
         * @return {Void}
         */
        _h.__mask = (function(){
            var _cache = {};
            // remove mask
            _h.__unmask = function(_element){
                var _id = _element.id,
                    _mask = _cache[_id];
                if (!!_mask){
                    delete _cache[_id];
                    _mask.parentNode.removeChild(_mask);
                }
            };
            // append mask
            return function(_element){
                var _id = _element.id,
                    _mask = _cache[_id];
                // create mask
                if (!_mask){
                    _mask = document.createElement('iframe');
                    _mask.style.position = 'absolute';
                    _cache[_id] = _mask;
                }
                // sync mask size
                var _style1 = _mask.style,
                    _style0 = _element.style;
                _style1.top = (parseInt(_style0.top)||0)+'px';
                _style1.left = (parseInt(_style0.left)||0)+'px';
                _style1.width = _element.offsetWidth+'px';
                _style1.height = _element.offsetHeight+'px';
                _element.insertAdjacentElement('beforeBegin',_mask);
                return _mask;
            };
        })();
    });}
if (_m._$KERNEL.engine==='gecko'){I$('3a12c627906cd622616e226dca91e8cc',function (){
        if (!_m._$SUPPORT.css3d){
            _m._$SUPPORT.css3d = 'MozPerspective' in document.body.style;
        }
        if (!('insertAdjacentElement' in document.body)){
            HTMLElement.prototype.insertAdjacentElement = function(_where,_element){
                if (!_where||!_element) return;
                switch(_where){
                    case 'beforeEnd'  :
                        this.appendChild(_element);
                    return;
                    case 'beforeBegin':
                        this.parentNode.insertBefore(_element,this);
                    return;
                    case 'afterBegin' :
                        !this.firstChild
                        ?this.appendChild(_element)
                        :this.insertBefore(_element,this.firstChild);
                    return;
                    case 'afterEnd'   :
                        !this.nextSibling
                        ?this.parentNode.appendChild(_element)
                        :this.parentNode.insertBefore(_element,this.nextSibling);
                    return;
                }
            };
        }
        if (!('innerText' in document.body)){
            HTMLElement.prototype['__defineGetter__']("innerText",function(){return this.textContent;});
            HTMLElement.prototype['__defineSetter__']("innerText",function(_content){this.textContent = _content;});
        }
    });}return _h;},'31891af64cb762158a2d3af5cfd930eb','d552af5339ac27c31f311f3fdadefdc3','3695926c26a1894dcce266fdc52d2e3a');
I$('43a92a1cb30f0322e2bca627e0f6b635',function (NEJ,_g,_u,_v,_x,_h,_p,_o,_f,_r){
    // variables
    var _y = {},     // chainable methods
        _cspol,      // css text pool
        _empol = {}, // elements without id property, eg. document,window
        _dirty = {}, // temporary element with id
        _fragment = document.createDocumentFragment(); // node in memory
    // init
    if (!document.head){
         document.head = document.getElementsByTagName('head')[0]||document.body;
    }
    // only for test
    _p.dump = function(){
        return {
            pool:_empol,
            dirty:_dirty,
            fragment:_fragment
        };
    };
    /**
     * 为节点设置一个唯一的标识
     *
     * 结构举例
     * ```html
     *    <div id="abc">aaaaa</div>
     * ```
     *
     * 脚本举例
     * ```javascript
     *   NEJ.define([
     *       'base/element'
     *   ],function(_e){
     *       // 如果有id，返回原来的id,否则返回auto-id-12345678(8位随机字符串)
     *       var _id = _e._$id(_node||"abc");
     *   });
     * ```
     *
     * @method module:base/element._$id
     * @param  {String|Node} arg0 - 节点标识或者对象
     * @return {String}             节点标识
     */
    /**
     * @method CHAINABLE._$id
     * @see module:base/element._$id
     */
    _p._$id =
    _y._$id = function(_element){
        _element = _p._$get(_element);
        if (!_element) return;
        var _id = !!_element.id ? _element.id
                : 'auto-id-'+_u._$uniqueID();
        if (!('id' in _element)){
            _empol[_id] = _element;
        }
        _element.id = _id;
        // check if element can be getted
        if (!_p._$get(_id)){
            _dirty[_id] = _element;
        }
        return _id;
    };
    /**
     * 根据标识取节点对象，包括在内存中的节点
     *
     * 结构举例
     * ```html
     *   <div id="abc">123</div>
     * ```
     *
     * 脚本举例
     * ```javascript
     *   NEJ.define([
     *       'base/element'
     *   ],function(_e){
     *       // 先根据id从内存中取，再从页面取
     *       var _node = _e._$get("abc");
     *   });
     * ```
     *
     * @method module:base/element._$get
     * @param  {String|Node} arg0 - 节点标识或者对象
     * @return {Node}               节点对象
     */
    _p._$get = function(_element){
        // for document/window
        // fix dirty window object in mac safari
        try{
            var _node = _empol[''+_element];
        }catch(ex){
            // ignore
        }
        if (!!_node){
            return _node;
        }
        // element is node
        if (!_u._$isString(_element)&&
            !_u._$isNumber(_element)){
            return _element;
        }
        // element is id
        // check node in page first
        var _node = document.getElementById(_element);
        if (!_node){
            _node = _h.__getElementById(_fragment,_element);
        }
        // remove dirty element
        if (!!_node){
            delete _dirty[_element];
        }
        return _node||_dirty[_element];
    };
    /**
     * 取节点的子节点列表
     *
     * 结构举例
     * ```html
     *   <div id="abc">
     *       <p>1</p>
     *       <p><span>2</span></p>
     *       <p>3</p>
     *   </div>
     * ```
     *
     * 脚本举例
     * ```javascript
     *   NEJ.define([
     *       'base/element'
     *   ],function(_e){
     *       // 取直接的3个子节点(p标签)
     *       var _childs = _e._$getChildren('abc');
     *
     *       // 使用类名过滤，去带a或者b样式类的子节点
     *       var _childs = _e._$getChildren('abc','a b');
     *   });
     * ```
     *
     * @method module:base/element._$getChildren
     * @param  {String|Node} arg0 - 节点标识或者对象
     * @param  {String}      arg1 - 样式标识
     * @return {Array}              子节点列表
     */
    /**
     * @method CHAINABLE._$getChildren
     * @see module:base/element._$getChildren
     */
    _p._$getChildren =
    _y._$getChildren = function(_element,_clazz){
        _element = _p._$get(_element);
        if (!_element) return null;
        var _list = _h.__getChildren(_element);
        if (!!_clazz){
            _u._$reverseEach(
                _list,function(_node,_index,_list){
                    if (!_p._$hasClassName(_node,_clazz)){
                        _list.splice(_index,1);
                    }
                }
            );
        }
        return _list;
    };
    /**
     * 根据过滤条件取第一个满足条件的父节点
     *
     * 结构举例
     * ```html
     *   <div data-a="aaa">
     *       <p>1</p>
     *       <div a="aaaaaa">
     *           <p class="a">
     *               <span id="abc">2</span>
     *           </p>
     *       </div>
     *       <p>3</p>
     *   </div>
     * ```
     *
     * 脚本举例
     * ```javascript
     *   NEJ.define([
     *       'base/element'
     *   ],function(_e){
     *       // 返回包含样式a的节点 <p class="a">
     *       var node = _e._$getParent('abc','c:a');
     *
     *       // 返回包含属性a的节点 <div a="aaaaaa">
     *       var node = _e._$getParent('abc','a:a')
     *
     *       // 返回包含data属性a的节点 <div data-a="aaa">
     *       var node = _e._$getParent('abc','d:a');
     *
     *       // 返回标签为p的节点 <p class="a">
     *       var node = _e._$getParent('abc','t:p');
     *
     *       // 返回符合过滤条件的父节点
     *       var node = _e._$getParent('abc',function(_element){
     *           return _element.scrollHeight>_element.clientHeight;
     *       });
     *   });
     * ```
     *
     * @method module:base/element._$getChildren
     * @param  {String|Node}      arg0 - 节点标识或者对象
     * @param  {String|Function}  arg1 - 过滤规则
     * @return {Node}             父节点
     */
    _p._$getParent = (function(){
        var _exmap;
        var _doFilter = function(_name,_element){
            var _arr = _name.split(':');
            if (_arr.length>1){
                if (!_exmap){
                    _exmap = {
                        a:_p._$attr,
                        d:_p._$dataset,
                        c:_p._$hasClassName,
                        t:function(n,v){return (n.tagName||'').toLowerCase()===v;}
                    };
                }
                var _check = _exmap[_arr[0]];
                if (!!_check){
                    return !!_check(_element,_arr[1]);
                }
                _name = _arr[1];
            }
            return !!_p._$attr(_element,_name)||
                   !!_p._$dataset(_element,_name)||
                     _p._$hasClassName(_element,_name);
        };
        return function(_element,_filter){
            _element = _p._$get(_element);
            if (!_element){
                return;
            }
            if (!_filter){
                return _element;
            }
            if (_u._$isString(_filter)){
                _filter = _doFilter._$bind(null,_filter);
            }
            if (_u._$isFunction(_filter)){
                while(_element){
                    if (!!_filter(_element)){
                        return _element;
                    }
                    _element = _element.parentNode;
                }
                return null;
            }
            return _element;
        };
    })();
    /**
     * 根据类名取节点列表
     *
     * 结构举例
     * ```html
     *   <div id="abc">
     *     <p class="item">1</p>
     *     <div><p class="item">2</p></div>
     *     <p class="item">3</p>
     *   </div>
     * ```
     *
     * 脚本举例
     * ```javascript
     *   NEJ.define([
     *       'base/element'
     *   ],function(_e){
     *       // 获取abc节点下样式带有"item"的节点列表,如果没有父节点，返回null
     *       var _list = _e._$getByClassName('abc','item');
     *   });
     * ```
     *
     * @method module:base/element._$getByClassName
     * @param  {String|Node} arg0 - 节点标识或者对象
     * @param  {String}      arg1 - 类名
     * @return {Array}              节点列表
     */
    /**
     * @method CHAINABLE._$getByClassName
     * @see module:base/element._$getByClassName
     */
    _p._$getByClassName =
    _y._$getByClassName = function(_element,_class){
        _element = _p._$get(_element);
        return !_element ? null :
                _h.__getElementsByClassName(
                    _element,_class.trim()
                );
    };
    /**
     * 根据从兄弟节点中搜索符合条件的节点
     *
     * 结构举例
     * ```html
     *   <div>
     *     <p class="item" id="a1">1</p>
     *     <p class="item" id="a2">2</p>
     *     <p class="item" id="a3">3</p>
     *   </div>
     * ```
     *
     * 脚本举例
     * ```javascript
     *   NEJ.define([
     *       'base/element'
     *   ],function(_e){
     *       // 取a2的后一个兄弟节点a3
     *       var _node = _e._$getSibling('a2');
     *
     *       // 取a2的前一个兄弟节点a1
     *       var _node = _e._$getSibling('a2',{backward:true});
     *
     *       // 过滤搜索，从a2向后搜索找id为a4的节点
     *       var _node = _e._$getSibling('a2',function(_element){
     *           return _element.id=='a4'
     *       });
     *
     *       // 过滤搜索，从a2向前搜索找id为a0的节点
     *       var _node = _e._$getSibling('a2',{
     *           backward:true,
     *           filter:function(_element){
     *               return _element.id=='a0'
     *           }
     *       });
     *   });
     * ```
     *
     * @method   module:base/element._$getSibling
     * @param    {String|Node}     arg0     - 节点标识或者对象
     * @param    {Function|Object} arg1     - 如果是函数则表示过滤器，否则为配置信息
     * @property {Boolean}         backward - 是否后向搜索，默认前向搜索
     * @property {Function}        filter   - 节点过滤器，返回true表示需要返回的节点，找到第一个即返回
     * @return   {Node}                       符合条件的节点
     */
    /**
     * @method CHAINABLE._$getSibling
     * @see module:base/element._$getSibling
     */
    _p._$getSibling =
    _y._$getSibling = (function(){
        var _doFilter = function(){
            return !0;
        };
        return function(_element,_filter){
            _element = _p._$get(_element);
            if (!_element){
                return null;
            }
            var _conf = {
                backward:!1,
                filter:_doFilter
            };
            if (_u._$isFunction(_filter)){
                _conf.filter = _filter;
            }else{
                _conf = _u._$fetch(_conf,_filter);
            }
            var _next = _conf.backward
                      ? _h.__previousSibling
                      : _h.__nextSibling;
            while(_element=_next(_element)){
                if (_conf.filter(_element)){
                    break;
                }
            }
            return _element;
        };
    })();
    /**
     * 取节点所在的滚动容器，
     * 从当前节点开始往上遍历，直到出现滚动条的节点
     *
     * 结构举例
     * ```html
     *   <div id="efg">
     *     <div id="abc">123</div>
     *   </div>
     * ```
     *
     * 脚本举例
     * ```javascript
     *   NEJ.define([
     *       'base/element'
     *   ],function(_e){
     *       // 加入efg节点出现滚动条，则这里找到的是efg节点
     *       var _sbody = _e._$getScrollViewPort('abc');
     *
     *       // 不带任何参数取页面滚动条所在节点
     *       var _sbody = _e._$getScrollViewPort();
     *   });
     * ```
     *
     * @method module:base/element._$getScrollViewPort
     * @param  {String|Node} arg0 - 节点标识或者对象
     * @return {Node}               视窗节点
     */
    _p._$getScrollViewPort = function(_element){
        _element = _p._$get(_element);
        if (!!_element){
            _element = _element.parentNode;
            while(!!_element){
                if (_element.scrollHeight>
                    _element.clientHeight){
                    break;
                }
                _element = _element.parentNode;
            }
            if (!!_element){
                return _element;
            }
        }
        var _tmp1 = document.body.scrollHeight,
            _tmp2 = document.documentElement.scrollHeight;
        return _tmp2>=_tmp1?document.documentElement:document.body;
    };
    /**
     * 盒模型结构
     *
     * @typedef  {Object} module:base/element~BoxModel
     * @property {Number} scrollTop    - 滚动垂直偏移
     * @property {Number} scrollLeft   - 滚动水平偏移
     * @property {Number} clientWidth  - 页面可视宽度
     * @property {Number} clientHeight - 页面可视高度
     * @property {Number} scrollWidth  - 页面滚动宽度
     * @property {Number} scrollHeight - 页面滚动高度
     */
    /**
     * 取页面盒信息，返回盒信息内容：
     *
     * 脚本举例
     * ```javascript
     *   NEJ.define([
     *       'base/element'
     *   ],function(_e){
     *       // 返回信息见说明
     *       var _box = _e._$getPageBox();
     *   });
     * ```
     *
     * @method module:base/element._$getPageBox
     * @param  {Document} arg0 - 文档对象
     * @return {module:base/element~BoxModel} 盒信息
     */
    _p._$getPageBox = (function(){
        // get min value but not zero
        var _getClientBox = function(_list){
            var _result = 0;
            _u._$forEach(
                _list,function(_size){
                    if (!_size) return;
                    if (!_result){
                        _result = _size;
                    }else{
                        _result = Math.min(_result,_size);
                    }
                }
            );
            return _result;
        };
        var _farr = [
            {
                main:'scroll',
                sub:['Top','Left'],
                func:function(_key,_body0,_body1){
                    return Math.max(
                        _body0['scroll'+_key],
                        _body1['scroll'+_key]
                    );
                }
            },
            {
                main:'client',
                sub:['Width','Height'],
                func:function(_key,_body0,_body1){
                    return _getClientBox([
                        _body0['client'+_key],
                        _body0['offset'+_key],
                        _body1['client'+_key],
                        _body1['offset'+_key]
                    ]);
                }
            },
            {
                main:'scroll',
                sub:['Width','Height'],
                func:function(_key,_body0,_body1,_result){
                    return Math.max(
                        _result['client'+_key],
                        _body0['scroll'+_key],
                        _body1['scroll'+_key]
                    );
                }
            }
        ];
        return function(_document){
            var _result = {},
                _doc   = _document||document,
                _body0 = _doc.body,
                _body1 = _doc.documentElement;
            _u._$forEach(
                _farr,function(_item){
                    var _main = _item.main;
                    _u._$forEach(
                        _item.sub,function(_key){
                            _result[_main+_key] = _item.func(
                                _key,_body0,_body1,_result
                            );
                        }
                    );
                }
            );
            return _result;
        };
    })();
    /**
     * 按比例将给定大小缩放至限制区域内
     *
     * 脚本举例
     * ```javascript
     *   NEJ.define([
     *       'base/element'
     *   ],function(_e){
     *       // 限制区域大小 100*10
     *       var _limit = {width:100,height:10};
     *
     *       // 给定200*10的大小，由于宽度超出，缩放后为{width:100,height:5}
     *       var _box = _e._$getMaxBox({width:200,height:10},_limit);
     *
     *       // 给定100*20的大小，由于高度超出，缩放后为{width:50,height:10}
     *       var _box = _e._$getMaxBox({width:100,height:20},_limit);
     *
     *       // 给定 50*5，没有超出限制，返回{width:50,height:5}
     *       var _box = _e._$getMaxBox({width:50,height:5},_limit);
     *   });
     * ```
     *
     * @method   module:base/element._$getMaxBox
     * @param    {module:base/element~SizeModel} arg0 - 原始大小
     * @param    {module:base/element~SizeModel} arg1 - 最大限制大小
     * @return   {module:base/element~SizeModel}        按比例计算出的最大值信息
     */
    _p._$getMaxBox = function(_org,_max){
        var _result = _u._$merge({},_org),
            _mrto = _max.width/_max.height,
            _orto = _org.width/_org.height;
        // height overflow
        if (_mrto>_orto&&
            _org.height>_max.height){
            _result.height = _max.height;
            _result.width = _result.height*_orto;
        }
        // width overflow
        if (_mrto<_orto&&
            _org.width>_max.width){
            _result.width = _max.width;
            _result.height = _result.width/_orto;
        }
        return _result;
    };
    /**
     * 滚动到指定节点
     *
     * 结构举例
     * ```html
     *   <div id="a" style="padding:5px 0 0 10px;"></div>
     * ```
     *
     * 脚本举例
     * ```javascript
     *   NEJ.define([
     *       'base/element'
     *   ],function(_e){
     *       // 滚动到页面上a这节点的位置
     *       _e._$scrollTo('a');
     *   });
     * ```
     *
     * @method module:base/element._$scrollTo
     * @param  {Node|String} arg0 - 节点
     * @return {Void}
     */
    /**
     * @method CHAINABLE._$scrollTo
     * @see module:base/element._$scrollTo
     */
    _p._$scrollTo =
    _y._$scrollTo = function(_element){
        var _offset = _p._$offset(_element);
        window.scrollTo(_offset.x,_offset.y);
    };
    /**
     * 大小信息对象
     * @typedef  {Object} module:base/element~SizeModel
     * @property {Number} width  - 宽度
     * @property {Number} height - 高度
     */
    /**
     * 位置信息对象
     * @typedef  {Object} module:base/element~PositionModel
     * @property {Number} top  - 垂直位置
     * @property {Number} left - 水平位置
     */
    /**
     * 计算在容器中对齐时的位置信息
     *
     * 脚本举例
     * ```javascript
     *   NEJ.define([
     *       'base/element'
     *   ],function(_e){
     *       // 容器大小
     *       var _box = {width:100,height:40};
     *
     *       // 默认居中对齐返回 {top:15,left:40}
     *       var _pos = _e._$align(_box,{width:20,height:10});
     *
     *       // 左下对齐返回 {top:30,left:0}
     *       var _pos = _e._$align(_box,{width:20,height:10},'left bottom');
     *   });
     * ```
     *
     * @method module:base/element._$align
     * @param  {module:base/element~SizeModel} arg0 - 容器大小
     * @param  {module:base/element~SizeModel} arg1 - 原始大小
     * @param  {String} arg2 - 对齐方式，水平+空格+垂直，如left top，默认为 center middle，
     *                         水平：left/center/right，
     *                         垂直：top/middle/bottom
     * @return {module:base/element~PositionModel} 位置信息
     */
    _p._$align = (function(){
        var _reg = /\s+/;
        var _fmap = {
            left:function(){
                return 0;
            },
            center:function(_box,_org){
                return (_box.width-_org.width)/2;
            },
            right:function(_box,_org){
                return _box.width-_org.width;
            },
            top:function(){
                return 0;
            },
            middle:function(_box,_org){
                return (_box.height-_org.height)/2;
            },
            bottom:function(_box,_org){
                return _box.height-_org.height;
            }
        };
        return function(_box,_org,_align){
            var _result = {},
                _arr  = (_align||'').split(_reg),
                _top  = _fmap[_arr[1]]||_fmap.middle,
                _left = _fmap[_arr[0]]||_fmap.center;
            _result.top = _top(_box,_org);
            _result.left = _left(_box,_org);
            return _result;
        };
    })();
    /**
     * 计算两个节点之间的偏移量
     *
     * 结构举例
     * ```html
     *   <div id="a" style="position:relative;padding:5px 0 0 10px;">
     *     <span id="b">123</span>
     *   </div>
     * ```
     *
     * 脚本举例
     * ```javascript
     *   NEJ.define([
     *       'base/element'
     *   ],function(_e){
     *       // 计算节点b到节点a(外层需要定位属性)的距离，如果没有指定节点，默认计算的根节点
     *       // _result : {x:10,y:5}
     *       var _result = _e._$offset('b','a');
     *   });
     * ```
     *
     * @method module:base/element._$offset
     * @param  {String|Node} arg0 - 起始节点
     * @param  {String|Node} arg1 - 结束节点，没有该参数则计算到根节点
     * @return {Object}             偏移量，如{x:234,y:987}
     */
    /**
     * @method CHAINABLE._$offset
     * @see module:base/element._$offset
     */
    _p._$offset =
    _y._$offset = (function(){
        var _isRoot = function(_element){
            return _element==document.body||
                   _element==document.documentElement;
        };
        return function(_from,_to){
            _from = _p._$get(_from);
            if (!_from){
                return null;
            }
            _to = _p._$get(_to)||null;
            var _node = _from,
                _result = {x:0,y:0},
                _isroot,_delta,_border;
            while(!!_node&&_node!=_to){
                _isroot = _isRoot(_node)||_node==_from;
                _delta = _isroot?0:_node.scrollLeft;
                _border = parseInt(_p._$getStyle(_node,'borderLeftWidth'))||0;
                _result.x += _node.offsetLeft+_border-_delta;
                _delta = _isroot?0:_node.scrollTop;
                _border = parseInt(_p._$getStyle(_node,'borderTopWidth'))||0;
                _result.y += _node.offsetTop+_border-_delta;
                _node = _node.offsetParent;
            }
            return _result;
        };
    })();
    /**
     * 节点占全屏
     *
     * @method module:base/element._$fullScreen
     * @param  {Node} arg0 - 节点
     * @return {Void}
     */
    /**
     * @method CHAINABLE._$fullScreen
     * @see module:base/element._$fullScreen
     */
    _p._$fullScreen =
    _y._$fullScreen = function(_element){
        _element = _p._$get(_element);
        if (!!_element){
            _h.__fullScreen(
                _element,
                _p._$getPageBox()
            );
        }
    };
    /**
     * 为节点增加用于盖select/flash等控件的层
     *
     * @method module:base/element._$mask
     * @see    module:base/element._$unmask
     * @param  {Node} arg0 - 节点
     * @return {Node}        盖层节点
     */
    /**
     * @method CHAINABLE._$mask
     * @see module:base/element._$mask
     */
    _p._$mask =
    _y._$mask = function(_element){
        _element = _p._$get(_element);
        if (!!_element){
            _p._$id(_element);
            return _h.__mask(_element);
        }
        return null;
    };
    /**
     * 为节点移除用于盖select/flash等控件的层
     *
     * @method module:base/element._$unmask
     * @see    module:base/element._$mask
     * @param  {Node} arg0 - 节点
     * @return {Node}        盖层节点
     */
    /**
     * @method CHAINABLE._$unmask
     * @see module:base/element._$unmask
     */
    _p._$unmask =
    _y._$unmask = function(_element){
        _element = _p._$get(_element);
        if (!!_element){
            _p._$id(_element);
            return _h.__unmask(_element);
        }
        return null;
    };
    /**
     * 创建节点，使用该接口创建的结构后续可通过_$get接口根据ID取到节点
     *
     * 结构举例
     * ```javascript
     *   <div id="abc">1</div>
     * ```
     *
     * 脚本举例
     * ```javascript
     *   NEJ.define([
     *       'base/element'
     *   ],function(_e){
     *       // 创建一个节点，挂到body上
     *       _e._$create("div","m-body",document.body);
     *
     *       // 创建一个节点挂到id是abc的节点上
     *       // 结果：<div id="abc">1<p class="m-list"></p></div>
     *       _e._$create("p","m-list","abc");
     * 
     *       // 创建一个节点放在内存中
     *       var _node = _e._$create('div');
     *       _node.innerHTML = '<p id="a">aaaaaa</p><p id="b">bbbbbb</p>';
     *       // 后续可以通过id取id为a的节点
     *       var _pa = _e._$get('a');
     *   });
     * ```
     *
     * @method module:base/element._$create
     * @param  {String}      arg0 - 标签
     * @param  {String}      arg1 - 样式
     * @param  {String|Node} arg2 - 父节点标识或者对象
     * @return {Node}               节点
     */
    _p._$create = (function(){
        var _map = {
            a:{href:'#',hideFocus:!0},
            style:{type:'text/css'},
            link:{type:'text/css',rel:'stylesheet'},
            iframe:{frameBorder:0},
            script:{defer:!0,type:'text/javascript'}
        };
        return function(_tag,_class,_parent){
            var _element = document.createElement(_tag),
                _config = _map[_tag.toLowerCase()];
            _u._$merge(_element,_config);
            if (!!_class) _element.className = _class;
            _parent = _p._$get(_parent);
            if (!!_parent){
                _parent.appendChild(_element);
            }else{
                // append to documentfragment for get by id
                if (!_config){
                    _fragment.appendChild(_element);
                }
            }
            return _element;
        };
    })();
    /**
     * 创建可交互框架
     *
     * 结构举例
     * ```html
     *   <div id="frameCnt"></div>
     * ```
     *
     * 脚本举例
     * ```javascript
     *   NEJ.define([
     *       'base/element'
     *   ],function(_e){
     *      var _xFrame = _e._$createXFrame({
     *          src:'http://www.baidu.com',
     *          name:'百度',
     *          parent:'frameCnt',
     *          visible:false,
     *          onload:function(){
     *              // 加载frame成功后，name设置成功，为百度
     *              // 加载frame成功后，显示效果正确，display:none
     *          }
     *      });
     *   });
     * ```
     *
     * @method   module:base/element._$createXFrame
     * @param    {Object}               arg0    - 可选配置参数
     * @property {String}               src     - 框架地址
     * @property {String}               name    - 框架名称
     * @property {String|Node|Function} parent  - 父节点或者框架加入父容器的执行函数
     * @property {Boolean}              visible - 是否可见
     * @property {Function}             onload  - 框架载入回调
     * @return {Node}                             框架节点
     */
    _p._$createXFrame = (function(){
        var _getFrameSrc = function(){
            if (location.hostname==document.domain){
                return 'about:blank';
            }
            return 'javascript:(function(){document.open();document.domain="'+document.domain+'";document.close();})();';
        };
        var _getFrameWithName = function(_name){
            _name = _name.trim();
            if (!_name){
                return _p._$create('iframe');
            }
            // pass name to frame
            var _iframe;
            try{
                _iframe = document.createElement(
                          '<iframe name="'+_name+'"></iframe>');
                _iframe.frameBorder = 0;
            }catch(e){
                _iframe = _p._$create('iframe');
                _iframe.name = _name;
            }
            return _iframe;
        };
        return function(_options){
            _options = _options||_o;
            var _iframe = _getFrameWithName(_options.name||'');
            if (!_options.visible){
                _iframe.style.display = 'none';
            }
            if (_u._$isFunction(_options.onload)){
                _v._$addEvent(_iframe,'load',function(_event){
                    if (!_iframe.src) return;
                    _v._$clearEvent(_iframe,'load');
                    _options.onload(_event);
                });
            }
            // will trigger onload
            var _parent = _options.parent;
            if (_u._$isFunction(_parent)){
                try{_parent(_iframe);}catch(e){}
            }else{
                (_p._$get(_parent)||document.body).appendChild(_iframe);
            }
            // ensure trigger onload async
            var _src = _options.src||_getFrameSrc();
            window.setTimeout(function(){
                _iframe.src = _src;
            },0);
            return _iframe;
        };
    })();
    /**
     * 删除节点
     *
     * 结构举例
     * ```html
     *   <div id="abc">123</div>
     * ```
     *
     * 脚本举例
     * ```javascript
     *   NEJ.define([
     *       'base/element'
     *   ],function(_e){
     *       // 移除节点前先清理节点上的事件
     *       _e._$remove('abc',false);
     *       // 移除节点前不清理节点上的事件
     *       _e._$remove('abc',true);
     *   });
     * ```
     *
     * @method module:base/element._$remove
     * @see    module:base/element._$removeByEC
     * @param  {String|Node} arg0 - 节点标识或者对象
     * @param  {Boolean}     arg1 - 是否禁止事件清理
     * @return {Void}
     */
    /**
     * @method CHAINABLE._$remove
     * @see module:base/element._$remove
     */
    _p._$remove =
    _y._$remove = (function(){
        var _fmap = {
            img:function(_node){
                _node.src = _g._$BLANK_IMAGE;
            },
            iframe:function(_node){
                _node.src = 'about:blank';
            }
        };
        var _doClear = function(_node,_tag){
            if (!_tag){
                var _xtag = (_node.tagName||'').toLowerCase(),
                    _func = _fmap[_xtag];
                if (!!_func){
                    _func(_node);
                }
                return;
            }
            if (!!_node.getElementsByTagName){
                _u._$forEach(
                    _node.getElementsByTagName(_tag),
                    _doClear
                );
            }
        };
        return function(_element){
            _element = _p._$get(_element);
            if (!!_element){
                // clear events
                if (!arguments[1]){
                    _v._$clearEvent(_element);
                }
                // clear elements
                _doClear(_element);
                _doClear(_element,'img');
                _doClear(_element,'iframe');
                // remove node
                if (!!_element.parentNode){
                    _element.parentNode.removeChild(_element);
                }
            }
        };
    })();
    /**
     * 节点移至内存
     *
     * 脚本举例
     * ```javascript
     *   NEJ.define([
     *       'base/element'
     *   ],function(_e){
     *       // 先生成一个节点加到body下
     *       var _node = _e._$create('div','js-div',document.body);
     *       // 把节点移动到内存中
     *       _e._$removeByEC(_node);
     *       // 从body上没有取到节点,结果为[]
     *       _e._$getByClassName(document.body,'js-div');
     *   });
     * ```
     *
     * @method module:base/element._$removeByEC
     * @see    module:base/element._$remove
     * @param  {String|Node} arg0 - 节点标识或者对象
     * @return {Void}
     */
    /**
     * @method CHAINABLE._$removeByEC
     * @see module:base/element._$removeByEC
     */
    _p._$removeByEC =
    _y._$removeByEC = function(_element){
        _element = _p._$get(_element);
        if (!!_element){
            try{
                _fragment.appendChild(_element);
            }catch(ex){
                // ignore
                console.error(ex);
            }
        }
    };
    /**
     * 清除所有子节点
     *
     * 结构举例
     * ```html
     *   <ul id="abc">
     *     <li>aaaaaaaaaaaaa</li>
     *     <li>bbbbbbbbbbbbb</li>
     *     <li>ccccccccccccc</li>
     *   </ul>
     *
     *   <table id="efg">
     *     <tr><td>1111</td><td>1111</td></tr>
     *     <tr><td>2222</td><td>2222</td></tr>
     *     <tr><td>3333</td><td>3333</td></tr>
     *   </table>
     * ```
     *
     * 脚本举例
     * ```javascript
     *   NEJ.define([
     *       'base/element'
     *   ],function(_e){
     *       // 清除ul下的子节点
     *       _e._$clearChildren('abc');
     *
     *       // 清除table下的子节点
     *       _e._$clearChildren('efg');
     *   });
     * ```
     *
     * @method module:base/element._$clearChildren
     * @see    module:base/element._$remove
     * @param  {String|Node} arg0 - 容器节点
     * @return {Void}
     */
    /**
     * @method CHAINABLE._$clearChildren
     * @see module:base/element._$clearChildren
     */
    _p._$clearChildren =
    _y._$clearChildren = function(_element){
        _element = _p._$get(_element);
        if (!!_element){
            _u._$reverseEach(
                _element.childNodes,
                function(_node){
                    _p._$remove(_node);
                }
            );
        }
    };
    /**
     * 内联元素增加定位封装
     *
     * 结构举例
     * ```html
     *   <input type="text" id="abc"/>
     * ```
     *
     * 脚本举例
     * ```javascript
     *   NEJ.define([
     *       'base/element'
     *   ],function(_e){
     *       // 包装定位的span
     *       _e._$wrapInline('abc');
     *   });
     * ```
     *
     * 生成结构如下
     * ```html
     *   <span style="position:relative;zoom:1">
     *     <input type="text" id="abc"/>
     *     <!-- 此api返回以下这个节点 -->
     *     <span style="position:absolute;top:0;left:0;"></span>
     *   </span>
     * ```
     *
     * 应用举例
     * ```javascript
     *   NEJ.define([
     *       'base/element'
     *   ],function(_e){
     *       // 返回容器的样式名称
     *       // 通过这个样式名称可以取到一个绝对定位的样式名 class+'-show'
     *       var _node = _e._$wrapInline('abc',{
     *           tag:'label',
     *           clazz:'js-xxx'
     *       });
     *       // 可以在返回的节点里添加想要显示的结构
     *       _node.innerHTML = '<span>aaa</span><span>aaa</span>';
     *   });
     * ```
     *
     * @method   module:base/element._$wrapInline
     * @param    {String|Node}  arg0  - 内联节点
     * @param    {Object}       arg1  - 绝对定位节点配置信息
     * @property {String}       tag   - 标记名称，默认span
     * @property {String}       nid   - 节点识别样式名，这个会被添加到样式中作为标识
     * @property {String}       clazz - 样式名称
     * @return   {Node}                 绝对定位的节点
     */
    /**
     * @method CHAINABLE._$wrapInline
     * @see module:base/element._$wrapInline
     */
    _p._$wrapInline =
    _y._$wrapInline = (function(){
        var _clazz,
            _reg0 = /\s+/;
        var _doInitStyle = function(){
            if (!!_clazz) return;
            _clazz = _p._$pushCSSText('.#<uispace>{position:relative;zoom:1;}.#<uispace>-show{position:absolute;top:0;left:100%;cursor:text;white-space:nowrap;overflow:hidden;}');
            _p._$dumpCSSText();
        };
        return function(_element,_options){
            _element = _p._$get(_element);
            if (!_element){
                return null;
            }
            // init style
            _doInitStyle();
            _options = _options||_o;
            // check relative parent
            var _parent = _element.parentNode;
            if (!_p._$hasClassName(_parent,_clazz)){
                // build wrapper box
                _parent = _p._$create('span',_clazz);
                _element.insertAdjacentElement('beforeBegin',_parent);
                _parent.appendChild(_element);
            }
            // check absolute node
            var _nid = _options.nid||'',
                _node = _p._$getByClassName(
                    _parent,_nid||
                   (_clazz+'-show')
                )[0];
            if (!_node){
                var _klass = ((_options.clazz||'')+' '+_nid).trim();
                _klass = _clazz+'-show'+(!_klass?'':' ')+_klass;
                _node = _p._$create(_options.tag||'span',_klass);
                _parent.appendChild(_node);
            }
            // append class to parent node
            var _klass = _options.clazz;
            if (!!_klass){
                _klass = (_klass||'').trim().split(_reg0)[0]+'-parent';
                _p._$addClassName(_parent,_klass);
            }
            return _node;
        };
    })();
    /**
     * 设置或者获取指定标识的数据
     *
     * 结构举例
     * ```html
     *   <div id="abc">123</div>
     * ```
     *
     * 脚本举例
     * ```javascript
     *   NEJ.define([
     *       'base/element'
     *   ],function(_e){
     *       // 设置值操作
     *       // <div id="abc" data-img="http://a.b.com/a.png">123</div>
     *       // 返回value值: http://a.b.com/a.png
     *       var _src = _e._$dataset('abc','img','http://a.b.com/a.png');
     *       // 取值操作
     *       var _src = _e._$dataset('abc','img');
     * 
     *       // 批量设置
     *       var _map = _e._$dataset('abc',{
     *           a:'aaaaa',
     *           b:'bbbbbbbb',
     *           c:'ccccccccc'
     *       });
     * 
     *       // 批量取值
     *       // 返回：{a:'aaaaa',b:'bbbbbbbb',c:'ccccccccc'}
     *       var _map = _e._$dataset('abc',['a','b','c']);
     *   });
     * ```
     *
     * @method module:base/element._$dataset
     * @see    module:base/element._$attr
     * @param  {String}              arg0 - 数据标识
     * @param  {String|Object|Array} arg1 - 属性名
     * @return {String|Object}              数据值
     */
    /**
     * @method CHAINABLE._$dataset
     * @see module:base/element._$dataset
     */
    _p._$dataset =
    _y._$dataset = function(_element,_key,_value){
        // check element
        var _id = _p._$id(_element);
        if (!_id){
            return null;
        }
        // check single key-value
        if (_u._$isString(_key)){
            return _h.__dataset(
                _p._$get(_element),
                _key,_value
            );
        }
        // check map set
        // ignore argument _value
        if (_u._$isObject(_key)){
            var _ret = {};
            _u._$forIn(_key,function(_v,_k){
                _ret[_k] = _p._$dataset(_id,_k,_v);
            });
            return _ret;
        }
        // check array get
        // ignore argument _value
        if (_u._$isArray(_key)){
            var _ret = {};
            _u._$forEach(_key,function(_k){
                _ret[_k] = _p._$dataset(_id,_k);
            });
            return _ret;
        }
        return null;
    };
    /**
     * 取某个节点的属性值
     *
     * 结构举例
     * ```html
     *   <div id="abc">123</div>
     * ```
     *
     * 脚本举例
     * ```javascript
     *   NEJ.define([
     *       'base/element'
     *   ],function(_e){
     *       // 设置成 <div id="abc" data-img="http://a.b.com/a.png">123</div>
     *       // 返回value值: http://a.b.com/a.png
     *       var _src = _e._$attr('abc','data-img','http://a.b.com/a.png');
     *
     *       // 如果设置了img的值返回data-img，否则放回空字符串
     *       var _src = _e._$attr('abc','data-img');
     *   });
     * ```
     *
     * @method module:base/element._$attr
     * @see    module:base/element._$dataset
     * @param  {String|Node} arg0 - 节点标识或者对象
     * @param  {String}      arg1 - 属性名称
     * @param  {String}      arg2 - 属性值，如果没有设置此参数则表示取值
     * @return {String}             属性值
     */
    /**
     * @method CHAINABLE._$attr
     * @see module:base/element._$attr
     */
    _p._$attr =
    _y._$attr = function(_element,_name,_value){
        _element = _p._$get(_element);
        if (!_element){
            return '';
        }
        if (_value!==undefined&&!!_element.setAttribute){
            _element.setAttribute(_name,_value);
        }
        return _h.__getAttribute(_element,_name);
    };
    /**
     * html代码转节点对象，
     * 如果转换出来的节点数量超过[包含]2个，
     * 则最外面增加一个容器节点，即返回的始终是一个节点
     *
     * 结构举例
     * ```html
     *   <div id="abc">
     *     <span>123</span>
     *   </div>
     * ```
     *
     * 代码举例
     * ```javascript
     *   NEJ.define([
     *       'base/element'
     *   ],function(_e){
     *       var _node = _e._$html2node('<div>1</div><div><span>2</span></div>');
     *   });
     * ```
     *
     * 返回结果
     * ```html
     *   <div> <!-- 返回此节点 -->
     *     <div>1</div>
     *     <div><span>2</span></div>
     *   </div>
     * ```
     *
     * @method module:base/element._$html2node
     * @param  {String} arg0 - 代码
     * @return {Node}          节点
     */
    _p._$html2node = (function(){
        var _reg = /<(.*?)(?=\s|>)/i, // first tag name
            _tmap = {li:'ul',tr:'tbody',td:'tr',th:'tr',option:'select'};
        return function(_html){
            var _tag;
            if (_reg.test(_html)){
                _tag = _tmap[(RegExp.$1||'').toLowerCase()]||'';
            }
            var _div = _p._$create(_tag||'div');
            _div.innerHTML = _html;
            var _list = _p._$getChildren(_div);
            return _list.length>1?_div:_list[0];
        };
    })();
    /**
     * 将dom节点转为xml串
     *
     * 结构举例
     * ```html
     *   <div id="abc">123</div>
     * ```
     *
     * 脚本举例
     * ```javascript
     *   NEJ.define([
     *       'base/element'
     *   ],function(_p){
     *       // 生成<div id="abc">123</div>字符串
     *       var _xml = _p._$dom2xml('abc'));
     *   });
     * ```
     *
     * @see    module:base/element._$xml2dom
     * @method module:base/element._$dom2xml
     * @param  {String|Node} arg0 - 节点
     * @return {String}             XML代码
     */
    /**
     * @method CHAINABLE._$dom2xml
     * @see module:base/element._$dom2xml
     */
    _p._$dom2xml =
    _y._$dom2xml = function(_element){
        _element = _p._$get(_element);
        return !_element?'':_h.__serializeDOM2XML(_element);
    };
    /**
     * 将xml转为dom节点
     *
     * 脚本举例
     * ```javascript
     *   NEJ.define([
     *       'base/element'
     *   ],function(_e){
     *       // 生成<div id="abc">123</div>节点
     *       var _node = _e._$xml2dom('<div id="abc">123</div>');
     *   });
     * ```
     *
     * @method module:base/element._$xml2dom
     * @see    module:base/element._$dom2xml
     * @param  {String} arg0 - xml文本
     * @return {Node}          DOM节点
     */
    _p._$xml2dom = function(_xml){
        _xml = (_xml||'').trim();
        return !_xml?null:_h.__parseDOMFromXML(_xml);
    };
    /**
     * dom节点转对象，多用于XML DOM转数据对象
     *
     * 结构举例
     * ```html
     *   <div id="abc">123</div>
     *
     *   <div id="efg">
     *     <p>aaaa</p>
     *     <span>bbbb</span>
     *   </div>
     * ```
     *
     * 脚本举例
     * ```javascript
     *   NEJ.define([
     *       'base/element'
     *   ],function(_p){
     *       // 返回对象{div:'123'}
     *       var _obj = _p._$dom2object('abc');
     *
     *       // 返回对象{div:{p:'aaaa',span:'bbbb'}}
     *       var _obj = _p._$dom2object('efg');
     *   });
     * ```
     *
     * @method module:base/element._$dom2object
     * @see    module:base/element._$xml2object
     * @param  {String|Node} arg0 - 节点
     * @return {Object}             转换完成的对象
     */
    /**
     * @method CHAINABLE._$dom2object
     * @see module:base/element._$dom2object
     */
    _p._$dom2object =
    _y._$dom2object = function(_dom,_obj){
         _obj = _obj||{};
         _dom = _p._$get(_dom);
         if (!_dom) return _obj;
        var _name = _dom.tagName.toLowerCase(),
            _list = _p._$getChildren(_dom);
        if (!_list||!_list.length){
            _obj[_name] = _dom.textContent||_dom.text||'';
            return _obj;
        }
        var _tmp = {};
        _obj[_name] = _tmp;
        _u._$forEach(
            _list,function(_node){
                _p._$dom2object(_node,_tmp);
            }
        );
        return _obj;
    };
    /**
     * XML转对象
     *
     * 脚本举例
     * ```javascript
     *   NEJ.define([
     *       'base/element'
     *   ],function(_e){
     *       // 返回 {user:{id:'1',username:'aaa',password:'123456'}}
     *       var _obj = _e._$xml2object('\
     *           <?xml version="1.0" encoding="utf-8" ?>\
     *           <user>\
     *             <id>1</id>\
     *             <username>aaa</username>\
     *             <password>123456</password>\
     *           </user>\
     *       ');
     *   });
     * ```
     *
     * @method module:base/element._$xml2object
     * @see    module:base/element._$dom2object
     * @param  {String} arg0 - xml代码
     * @return {Object}        对象
     */
    _p._$xml2object = function(_xml){
        try{
            return _p._$dom2object(_p._$xml2dom(_xml));
        }catch(ex){
            return null;
        }
    };
    /**
     * 文本转指定类型的数据
     *
     * 脚本举例
     * ```javascript
     *   NEJ.define([
     *       'base/element'
     *   ],function(_e){
     *       // 转成dom节点
     *       var _dom = _e._$text2type('<div id="abc">123</div>',"xml");
     *       // 转成json字符串
     *       var _json = _e._$text2type('{"a":"aaaaaaaaaaaaa"}',"json");
     *       // 原样返回
     *       var _text = _e._$text2type('<div id="abc">123</div>');
     *   });
     * ```
     *
     * @method module:base/element._$text2type
     * @param  {String} arg0 - 文本内容
     * @param  {String} arg1 - 类型，如xml/json/text
     * @return {Variable}      指定类型的数据
     */
    _p._$text2type = (function(){
        var _fmap = {
            xml:function(_text){
                return _p._$xml2dom(_text);
            },
            json:function(_text){
                try{
                    return JSON.parse(_text);
                }catch(ex){
                    return null;
                }
            },
            dft:function(_text){
                return _text;
            }
        };
        return function(_text,_type){
            _type = (_type||'').toLowerCase();
            return (_fmap[_type]||_fmap.dft)(_text||'');
        };
    })();
    /**
     * 批量设置节点样式
     *
     * 结构举例
     * ```html
     *   <div id="abc">123</div>
     * ```
     *
     * 脚本举例
     * ```javascript
     *   NEJ.define([
     *       'base/element'
     *   ],function(_e){
     *       _e._$style('abc',{color:'red',width:'100px'});
     *   });
     * ```
     *
     * 输出结果
     * ```html
     *   <div id="abc" style="color:red;width:100px;">123</div>
     * ```
     *
     * @method module:base/element._$style
     * @see    module:base/element._$setStyle
     * @param  {String|Node} arg0 - 节点
     * @param  {Object}      arg1 - 样式信息{color:'red',width:'100px'}
     * @return {Void}
     */
    /**
     * @method CHAINABLE._$style
     * @see module:base/element._$style
     */
    _p._$style =
    _y._$style = function(_element,_map){
        _element = _p._$get(_element);
        if (!!_element){
            _u._$loop(_map,function(_value,_name){
                _p._$setStyle(_element,_name,_value);
            });
        }
    };
    /**
     * 设置单个样式
     *
     * 结构举例
     * ```html
     *   <div id="abc">123</div>
     * ```
     *
     * 脚本举例
     * ```javascript
     *   NEJ.define([
     *       'base/element'
     *   ],function(_e){
     *       _e._$setStyle('abc','color','red');
     *   });
     * ```
     *
     * 输出结果
     * ```html
     *   <div id="abc" style="color:red;">123</div>
     * ```
     *
     * @method module:base/element._$setStyle
     * @see    module:base/element._$getStyle
     * @param  {String|Node} arg0 - 节点
     * @param  {String}      arg1 - 样式名称
     * @param  {String}      arg2 - 样式值
     * @return {Void}
     */
    /**
     * @method CHAINABLE._$setStyle
     * @see module:base/element._$setStyle
     */
    _p._$setStyle =
    _y._$setStyle = function(_element,_name,_value){
        _element = _p._$get(_element);
        if (!!_element){
            _h.__setStyleValue(
                _element,_name,
                _h.__processCSSText(_value)
            );
        }
    };
    /**
     * 取样式值
     *
     * 结构举例
     * ```html
     *   <div id="abc" style="color:red;">123</div>
     * ```
     *
     * 脚本举例
     * ```javascript
     *   NEJ.define([
     *       'base/element'
     *   ],function(_e){
     *       // 返回节点的颜色值red（高版本浏览器返回rgb值），如果没有返回空字符串
     *       var _value = _e._$getStyle('abc','color');
     *   });
     * ```
     *
     * @method module:base/element._$getStyle
     * @see    module:base/element._$setStyle
     * @param  {String|Node} arg0 - 节点
     * @param  {String}      arg1 - 样式名称
     * @return {String}             样式值
     */
    /**
     * @method CHAINABLE._$getStyle
     * @see module:base/element._$getStyle
     */
    _p._$getStyle =
    _y._$getStyle = function(_element,_name){
        _element = _p._$get(_element);
        return !_element ? '' :
                _h.__getStyleValue(
                    _element,_name
                );
    };
    /**
     * 页面注入脚本
     *
     * 结构举例
     * ```html
     *   <div id="abc">123</div>
     * ```
     *
     * 脚本举例
     * ```javascript
     *   NEJ.define([
     *       'base/element'
     *   ],function(_e){
     *       // 注入脚本，全局执行环境
     *       _e._$addScript('\
     *           document.getElementById("abc").style.color = "green"\
     *       ');
     *   });
     * ```
     *
     * 输出结果
     * ```html
     *   <div id="abc" style="color:green;">123</div>
     * ```
     *
     * @method module:base/element._$addScript
     * @param  {String} arg0 - 脚本内容
     * @return {Void}
     */
    _p._$addScript = function(_script){
        try{
            _script = _script.trim();
            if (!!_script){
                return (new Function(_script))();
            }
        }catch(ex){
            // ignore
            console.error(ex.message);
            console.error(ex.stack);
        }
    };
    /**
     * 注入页面内联样式，
     * 样式支持前缀标记$&lt;vendor&gt; ，
     * 如下样式值支持3D/2D切换，优先选用3D，格式：$&lt;NAME|VALUE&gt;
     *
     * * NAME支持：scale/rotate/translate/matrix
     * * VALUE格式：x=1&y=2&z=3&a=30
     *
     *
     * 范例如$&lt;scale|a=30&gt;，各名称支持的参数列表
     *
     * | 名称              | 参数 |
     * | :--        | :-- |
     * | scale      | x,y,z |
     * | rotate     | x,y,z,a |
     * | translate  | x,y,z |
     * | matrix     | m11,m12,m13,m14,m21,m22,m23,m24,m31,m32,m33,m34,m41,m42,m43,m44 |
     *
     *
     * 结构举例
     * ```html
     *   <html>
     *    <head>
     *        <title>test</title>
     *    </head>
     *   </html>
     * ```
     *
     * 脚本举例
     * ```javascript
     *   NEJ.define([
     *       'base/element'
     *   ],function(_e){
     *       // 注入样式
     *       _e._$addStyle('body{font-size:20px}');
     *
     *       // 注入样式支持变量
     *       _e._$addStyle('\
     *           .a{$<vendor>transform-origin:0 0;}\
     *           .b{$<vendor>transform:$<translate|x=0&y=1&z=1>}\
     *       ');
     *   });
     * ```
     *
     * 输出结果
     * ```html
     *   <html>
     *    <head>
     *        <title>test</title>
     *        <style>body{font-size:20px;}</style>
     *        <style>
     *           .a{-webkit-transform-origin:0 0;}\
     *           .b{-webkit-transform:translate3d(0,1,1);}\
     *        </style>
     *    </head>
     *   </html>
     * ```
     *
     * @method module:base/element._$addStyle
     * @param  {String} arg0 - 样式内容
     * @return {Node}          样式节点
     */
    _p._$addStyle = (function(){
        var _reg = /[\s\r\n]+/gi;
        return function(_css){
            _css = (_css||'').replace(_reg,' ').trim();
            var _node = null;
            if (!!_css){
                _node = _p._$create('style');
                document.head.appendChild(_node);
                _h.__injectCSSText(
                    _node,_h.__processCSSText(_css)
                );
            }
            return _node;
        };
    })();
    /**
     * 缓存待激活样式
     *
     * 脚本举例
     * ```javascript
     *   NEJ.define([
     *       'base/element'
     *   ],function(_e){
     *       // 设置样式到缓存中，自动生成样式名，返回自动生成的类名#<class>
     *       var _class = _e._$pushCSSText('.#<uispace>{width:300px;}');
     *
     *       // 把缓存中的样式内联到页面
     *       _e._$dumpCSSText();
     *   });
     * ```
     *
     * @method module:base/element._$pushCSSText
     * @see    module:base/element._$dumpCSSText
     * @param  {String} arg0 - 样式
     * @return {String}        样式标识
     */
    _p._$pushCSSText = (function(){
        var _reg = /#<(.*?)>/g,
            _seed = +new Date;
        return function(_css,_data){
            if (!_cspol){
                _cspol = [];
            }
            var _class = 'auto-'+_u._$uniqueID(),
                _dmap = _u._$merge({uispace:_class},_data);
            _cspol.push(
                _css.replace(_reg,function($1,$2){
                    return _dmap[$2]||$1;
                })
            );
            return _class;
        };
    })();
    /**
     * 激活缓存中的样式
     *
     * 结构举例
     * ```html
     *   <div id="abc" class="item">123</div>
     * ```
     *
     * 脚本举例
     * ```javascript
     *   NEJ.define([
     *       'base/element'
     *   ],function(_e){
     *       // 设置样式.item{width:300px;}到缓存中
     *       _e._$pushCSSText('.item{width:300px;}');
     *
     *       // 把缓存中的样式内联到页面
     *       _e._$dumpCSSText();
     *   });
     * ```
     *
     * @method module:base/element._$dumpCSSText
     * @see    module:base/element._$pushCSSText
     * @return {Void}
     */
    _p._$dumpCSSText = function(){
        if (!!_cspol){
            _p._$addStyle(_cspol.join(' '));
            _cspol = null;
        }
    };
    /**
     * 追加CSS规则
     *
     * 结构举例
     * ```html
     *   <style id="abc"></style>
     * ```
     *
     * 脚本举例
     * ```javascript
     *   NEJ.define([
     *       'base/element'
     *   ],function(_e){
     *       // 设置样式.item{width:300px;}到缓存中
     *       _e._$appendCSSText('node-id','.item{width:300px;}');
     *   });
     * ```
     *
     * @method module:base/element._$appendCSSText
     * @see    module:base/element._$addStyle
     * @param  {Node}   arg0 - 样式节点
     * @param  {String} arg1 - 单条样式规则
     * @return {CSSRule}       样式规则对象
     */
    /**
     * @method CHAINABLE._$appendCSSText
     * @see module:base/element._$appendCSSText
     */
    _p._$appendCSSText =
    _y._$appendCSSText = function(_element,_css){
        _element = _p._$get(_element);
        return !_element ? null :
                _h.__appendCSSText(
                    _element,
                    _h.__processCSSText(_css)
                );
    };
    /**
     * 新增样式类，多个样式用空格分开
     *
     * 结构举例
     * ```html
     *   <div id="abc">123</div>
     * ```
     *
     * 脚本举例
     * ```javascript
     *   NEJ.define([
     *       'base/element'
     *   ],function(_e){
     *       // 添加样式 fc01 fc03
     *       _e._$addClassName('abc','fc01 fc03');
     *   });
     * ```
     *
     * 输出结果
     * ```html
     *   <div id="abc" class="fc01 fc03">123</div>
     * ```
     *
     * @method module:base/element._$addClassName
     * @see    module:base/element._$delClassName
     * @see    module:base/element._$replaceClassName
     * @param  {String|Node} arg0 - 要操作的节点标识或者节点对象
     * @param  {String}      arg1 - 要新增的样式类名称
     * @return {Void}
     */
    /**
     * @method CHAINABLE._$addClassName
     * @see module:base/element._$addClassName
     */
    _p._$addClassName =
    _y._$addClassName = function(_element,_class){
        if (!_class){
            return;
        }
        _element = _p._$get(_element);
        if (!!_element){
            _h.__processClassName(
                _element,'add',_class
            );
        }
    };
    /**
     * 删除样式类，多个样式用空格分开
     *
     * 结构举例
     * ```html
     *   <div id="abc" class="fc01 fc03">123</div>
     * ```
     *
     * 脚本举例
     * ```javascript
     *   NEJ.define([
     *       'base/element'
     *   ],function(_e){
     *       // 删除fc02 fc03样式名
     *       _e._$delClassName('abc','fc02 fc03');
     *   });
     * ```
     *
     * 输出结果
     * ```html
     *   <div id="abc" class="fc01">123</div>
     * ```
     *
     * @method module:base/element._$delClassName
     * @see    module:base/element._$addClassName
     * @see    module:base/element._$replaceClassName
     * @param  {String|Node} arg0 - 要操作的节点标识或者节点对象
     * @param  {String}      arg1 - 要删除的样式类名称
     * @return {Void}
     */
    /**
     * @method CHAINABLE._$delClassName
     * @see module:base/element._$delClassName
     */
    _p._$delClassName =
    _y._$delClassName = function(_element,_class){
        _element = _p._$get(_element);
        if (!!_element){
            _h.__processClassName(
                _element,'remove',_class
            );
        }
    };
    /**
     * 替换节点的样式类名称，多个样式用空格分隔，
     * 操作过程为先删除待删样式，再添加待添样式，因此不需要删除样式存在才添加样式
     *
     * 结构举例
     * ```html
     *   <div id="abc" class="fc01 fc03">123</div>
     * ```
     *
     * 脚本举例
     * ```javascript
     *   NEJ.define([
     *       'base/element'
     *   ],function(_e){
     *       // 替换fc02为fc05
     *       // 这里不需要fc02存在
     *       _e._$replaceClassName('abc','fc02','fc05');
     *   });
     * ```
     *
     * 输出结果
     * ```html
     *   <div id="abc" class="fc01 fc03 fc05">123</div>
     * ```
     *
     * @method module:base/element._$replaceClassName
     * @see    module:base/element._$addClassName
     * @see    module:base/element._$delClassName
     * @param  {String|Node} arg0 - 要操作的节点标识或者节点对象
     * @param  {String}      arg1 - 要删除的样式类名称
     * @param  {String}      arg2 - 要新增的样式类名称
     * @return {Void}
     */
    /**
     * @method CHAINABLE._$replaceClassName
     * @see module:base/element._$replaceClassName
     */
    _p._$replaceClassName =
    _y._$replaceClassName = function(_element,_del,_add){
        _element = _p._$get(_element);
        if (!!_element){
            _h.__processClassName(
                _element,'replace',
                _del,_add
            );
        }
    };
    /**
     * 检测节点是否包含指定样式，多个样式用空格分隔，检测时包含其中之一即表示包含
     *
     * 结构举例
     * ```html
     *   <div id="abc" class="fc01 fc03">123</div>
     * ```
     *
     * 脚本举例
     * ```javascript
     *   NEJ.define([
     *       'base/element'
     *   ],function(_e){
     *       // 如果有fc01样式返回true，否则返回false
     *       _e._$hasClassName('abc',"fc01");
     *   });
     * ```
     *
     * @method module:base/element._$hasClassName
     * @param  {String|Node} arg0 - 节点标识或者对象
     * @param  {String}      arg1 - 样式串
     * @return {Boolean}            是否含指定样式
     */
    /**
     * @method CHAINABLE._$hasClassName
     * @see module:base/element._$hasClassName
     */
    _p._$hasClassName =
    _y._$hasClassName = function(_element,_class){
        _element = _p._$get(_element);
        if (!!_element){
            return _h.__hasClassName(_element,_class);
        }
        return !1;
    };
    /**
     * 取样式变换矩阵对象
     *
     * 脚本举例
     * ```javascript
     *   NEJ.define([
     *       'base/element'
     *   ],function(_e){
     *       // 生成下面矩阵的对象
     *       // |a:1,b:0,c:0,d:1,e:0:f:0|
     *       // |m11:1,m12:0,m13:0,m14:0|
     *       // |m21:0,m22:1,m23:0,m24:0|
     *       // |m31:0,m32:0,m33:1,m34:0|
     *       // |m41:0,m42:0,m43:0,m44:1|
     *       var _matrix = _e._$matrix("matrix(1,0,0,1,0,0)");
     *   });
     * ```
     *
     * @method module:base/element._$matrix
     * @param  {String} arg0 - 变化信息
     * @return {CSSMatrix}     变换矩阵对象
     */
    _p._$matrix = function(_matrix){
        _matrix = (_matrix||'').trim();
        return _h.__getCSSMatrix(_matrix);
    };
    /**
     * 设置3D变换，对于不支持3D的系统自动切换为2D变换
     *
     * 结构举例
     * ```html
     *   <div id="abc"></div>
     * ```
     * 脚本举例
     * ```javascript
     *   NEJ.define([
     *       'base/element'
     *   ],function(_e){
     *       // 进行css3d变换，对应css样式为-webkit-transform:rotate3d( 2, 1, 1, -75deg);
     *       _e._$css3d('abc','rotate',{x:2,y:1,z:1,a:'-75deg'});
     *   });
     * ```
     *
     * @method module:base/element._$css3d
     * @see    module:base/element._$addStyle
     * @param  {String|Node} arg0 - 节点标识或者对象
     * @param  {String}      arg1 - 变换类型，matrix/translate/scale/rotate
     * @param  {Object}      arg2 - 变换值，{x:1,y:2,z:3,a:'30deg'}
     * @return {Void}
     */
    /**
     * @method CHAINABLE._$css3d
     * @see module:base/element._$css3d
     */
    _p._$css3d =
    _y._$css3d = function(_element,_name,_map){
        _element = _p._$get(_element);
        if (!!_element){
            var _value = _h.__processTransformValue(_name,_map);
            if (!!_value){
                _p._$setStyle(_element,'transform',_value);
            }
        }
    };
    // for chainable
    _x._$merge(_y);

    if (CMPT){
        NEJ.copy(NEJ.P('nej.e'),_p);
    }

    return _p;
},'083c017e2a5450e295d417651bc93279','d0109f80b9992d1fd93e85a35ede12b1','3695926c26a1894dcce266fdc52d2e3a','0dd9ac3de45a7a1ce7c2f3ff80d53fcc','9964aa517a3b6122213b910cbdd3428e','fa4adc31e3482a11e7cc270432769c2b');
/*
 * TrimPath Template. Release 1.1.2.
 * Copyright (C) 2004 - 2007 TrimPath.
 * 
 * TrimPath Template is licensed under the GNU General Public License
 * and the Apache License, Version 2.0, as follows:
 *
 * This program is free software; you can redistribute it and/or 
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.
 * 
 * This program is distributed WITHOUT ANY WARRANTY; without even the 
 * implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  
 * See the GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA 02111-1307, USA.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/*
 * ------------------------------------------
 * JST模板引擎实现文件
 * 实现原理参考trimpath项目 (GPL & APL)
 * http://code.google.com/p/trimpath/
 * @version  1.0
 * @author   genify(caijf@corp.netease.com)
 * ------------------------------------------
 */
(function(){
    /**
     * TrimPath模版引擎名字空间
     * @namespace TrimPath
     */
    // init TrimPath
    if (typeof TrimPath==='undefined'){
        TrimPath = {};
        if (typeof exports!=='undefined')
            TrimPath = exports;
    }
    // variable declaration
    var _tcache = {}, // jst string cache
        _stack  = [], // loop statement stack
        _rspc   = /\s+/g,
        _seed   = +new Date,
        _trim,_config,_vars;
    /*
     * 解析表达式中变量信息，如
     * a.b(c,d) || d('aaaa',f,g) && !!test() || 'eeee'
     * @param  {String} 内容
     * @return {Void}
     */
    var _doParseVars = (function(){
        var _reg0 = /^\s*[\[\{'"].*?[\]\}'"]\s*$/,
            _reg1 = /[\&\|\<\>\+\-\*\/\%\,\(\)\[\]\?\:\!\=\;]/,
            // keyword extend later
            _reg2 = /^(?:defined|null|undefined|true|false|instanceof|new|this|typeof|\$v|[\d]+)$/i,
            // statement extend later
            // new XX
            _reg3 = /^new\s+/,
            _reg4 = /['"]/;
        var _doParseSimple = function(_value){
            if (_reg0.test(_value)) return;
            _value = _value.split('.')[0].trim();
            if (!_value||_reg4.test(_value)) return;
            _value = _value.replace(_reg3,'');
            //console.log('-->'+_value+'<--');
            try{
                if (_reg2.test(_value))
                    return;
                _vars[_value] = 1;
                //console.log('=====>'+_value+'<====');
            }catch(e){
                // ignore
            }
        };
        return function(_content){
            _content = _content||'';
            // for string/array
            if (!_content||_reg0.test(_content)) 
                return;
            var _arr = _content.split(_reg1);
            for(var i=0,l=_arr.length;i<l;i++)
                _doParseSimple(_arr[i]);
        };
    })();
    /*
     * 解析{for x in b}字符串的前缀
     * @param  {Array}  按空格拆分的值,['for','x','in','b']
     * @return {String} 解析后的前缀值
     */
    var _doParsePrefixFor = function(_part){
        if (_part[2]!='in')
            throw 'bad for loop statement: '+_part.join(' ');
        _stack.push(_part[1]);
        // b is array or has [1,2,4],{a:'aaa',b:'bbb'}
        _doParseVars(_part[3]);
        return 'var __HASH__'+_part[1]+' = '+_part[3]+','+
                    _part[1]+','+_part[1]+'_count=0;'+
               'if (!!__HASH__'+_part[1]+')'+
                   'for(var '+_part[1]+'_key in __HASH__'+_part[1]+'){'+
                        _part[1]+' = __HASH__'+_part[1]+'['+_part[1]+'_key];'+
                        'if (typeof('+_part[1]+')=="function") continue;'+
                        _part[1]+'_count++;';
    };
    /*
     * 解析{forelse}字符串的前缀
     * @return {String} 解析后的前缀值
     */
    var _doParsePrefixForElse = function(){
        var _part = _stack[_stack.length-1];
        return '}; if(!__HASH__'+_part+'||!'+_part+'_count){';
    };
    /*
     * 解析{/for}字符串的前缀
     * @return {String} 解析后的前缀值
     */
    var _doParsePrefixForEnd = function(){
        _stack.pop();
        return '};';
    };
    /*
     * 解析{list seq as x}或者{list 1..100 as x}字符串的前缀
     * @param  {Array}  按空格拆分的值,['list','seq','as','x']
     * @return {String} 解析后的前缀值
     */
    var _doParsePrefixList = function(_part){
        if (_part[2]!='as')
            throw 'bad for list loop statement: '+_part.join(' ');
        var _seq = _part[1].split('..');
        if (_seq.length>1){
            // {list 1..100 as x}
            _doParseVars(_seq[0]);
            _doParseVars(_seq[1]);
            return 'for(var '+_part[3]+','+_part[3]+'_index=0,'+
                        _part[3]+'_beg='+_seq[0]+','+_part[3]+'_end='+_seq[1]+','+
                        _part[3]+'_length=parseInt('+_part[3]+'_end-'+_part[3]+'_beg+1);'+
                        _part[3]+'_index<'+_part[3]+'_length;'+_part[3]+'_index++){'+
                        _part[3]+' = '+_part[3]+'_beg+'+_part[3]+'_index;';
        }else{
            // {list seq as x}
            // seq is array [1,2,4]
            _doParseVars(_part[1]);
            return 'for(var __LIST__'+_part[3]+' = '+_part[1]+','+
                        _part[3]+','+_part[3]+'_index=0,'+
                        _part[3]+'_length=__LIST__'+_part[3]+'.length;'+
                        _part[3]+'_index<'+_part[3]+'_length;'+_part[3]+'_index++){'+
                        _part[3]+' = __LIST__'+_part[3]+'['+_part[3]+'_index];';
        }
    };
    /*
     * 解析{macro macroName(arg1,arg2,...argN)}字符串的前缀
     * @param  {Array}  按空格拆分的值,['macro','macroName(arg1,arg2,...argN)']
     * @return {String} 解析后的前缀值
     */
    var _doParsePrefixMacro = function(_part){
        if (!_part||!_part.length) return;
        _part.shift(); // remove macro key word
        var _name = _part[0].split('(')[0];
        return 'var '+_name+' = function'+_part.join('').replace(_name,'')+'{var __OUT=[];';
    };
    /*
     * 解析{include "text-template-id"}字符串前缀
     * @param  {Array}  按空格拆分的值,['include','"text-template-id"']
     * @return {String} 解析后的前缀值
     */
    var _doParsePrefixInline = function(_part){
        if (!_part[1]) 
            throw 'bad include statement: '+_part.join(' ');
        return 'if (typeof inline == "function"){__OUT.push(inline(';
    };
    /**
     * 解析IF语句前缀，{if customer != null && customer.balance > 1000 || test(customer)}
     * @param  {String}  返回值
     * @param  {Array}   按空格拆分的值
     * @return {String}  解析后的前缀值
     */
    var _doParsePrefixCondition = function(_prefix,_part){
        _doParseVars(_part.slice(1).join(' '));
        return _prefix;
    };
    // parse prefix condition
    var _doParsePrefixConditionIF = function(_part){
        return _doParsePrefixCondition('if(',_part);
    };
    var _doParsePrefixConditionELSEIF = function(_part){
        return _doParsePrefixCondition('}else if(',_part);
    };
    var _doParsePrefixConditionVAR = function(_part){
        return _doParsePrefixCondition('var ',_part);
    };
    // jst configuration
    _config = {
        blk : /^\{(cdata|minify|eval)/i,
        tag : 'forelse|for|list|if|elseif|else|var|macro|break|notrim|trim|include',
        // {pmin : min param number,
        //  pdft : param default value,
        //  pfix : statement prefix,
        //  sfix : statement suffix}
        def : {
            'if'     : {pfix:_doParsePrefixConditionIF,sfix:'){',pmin:1},
            'else'   : {pfix:'}else{'},
            'elseif' : {pfix:_doParsePrefixConditionELSEIF,sfix:'){',pdft:'true'},
            '/if'    : {pfix:'}'},
            'for'    : {pfix:_doParsePrefixFor,pmin:3},
            'forelse': {pfix:_doParsePrefixForElse},
            '/for'   : {pfix:_doParsePrefixForEnd},
            'list'   : {pfix:_doParsePrefixList,pmin:3},
            '/list'  : {pfix:'};'},
            'break'  : {pfix:'break;'},
            'var'    : {pfix:_doParsePrefixConditionVAR,sfix:';'},
            'macro'  : {pfix:_doParsePrefixMacro},
            '/macro' : {pfix:'return __OUT.join("");};'},
            'trim'   : {pfix:function(){_trim = !0;}},
            '/trim'  : {pfix:function(){_trim = null;}},
            'inline' : {pfix:_doParsePrefixInline,pmin:1,sfix:'));}'}
        },
        ext : {
            'seed'   : function(_prefix){return (_prefix||'')+''+_seed;},
            'default': function(_value,_default){return _value||_default;}
        }
    };
    /*
     * 解析语句，如{if customer != null && customer.balance > 1000}
     * @param  {String} 待解析语句
     * @param  {Array}  内容输出
     * @return {Void}
     */
    var _doParseStatement = (function(){
        var _rbrc = /\\([\{\}])/g;
        return function(_content,_out){
            _content = _content.replace(_rbrc,'$1');
            //console.log('++++>'+_content);
            var _part = _content.slice(1, -1).split(_rspc),
                _conf = _config.def[_part[0]];
            if (!_conf){_doParseSectionText(_content,_out);return;}
            if (!!_conf.pmin&&_conf.pmin>=_part.length)
                throw 'Statement needs more parameters:'+_content;
            // parse prefix
            _out.push((!!_conf.pfix&&
                       typeof(_conf.pfix)!='string')
                       ?_conf.pfix(_part):(_conf.pfix||''));
            // parse params and suffix
            if (!!_conf.sfix){
                if (_part.length<=1) {
                    if (!!_conf.pdft) _out.push(_conf.pdft);
                }else{
                    for(var i=1,l=_part.length;i<l;i++){
                        if (i>1) _out.push(' ');
                        _out.push(_part[i]);
                    }
                }
                _out.push(_conf.sfix);
            }
        };
    })();
    /*
     * 解析表达式，如['firstName','default:"John Doe"','capitalize']
     * @param  {Array}  表达式内容
     * @param  {Number} 表达式索引
     * @param  {Array}  内容输出
     * @return {Void}
     */
    var _doParseExpression = function(_exps,_out){
        // foo|a:x|b:y1,y2|c:z1,z2 -> c(b(a(foo,x),y1,y2),z1,z2)
        if (!_exps||!_exps.length) return;
        if (_exps.length==1){
            var _var = _exps.pop();
            _doParseVars(_var);
            // fix error for ${}
            _out.push(_var==''?'""':_var);
            return;
        }
        var _exp = _exps.pop().split(':');
        _out.push('__MDF[\''+_exp.shift()+'\'](');
        _doParseExpression(_exps,_out);
        if (_exp.length>0){
            var _args = _exp.join(':');
            _doParseVars(_args);
            _out.push(','+_args);
        }
        _out.push(')');
    };
    /*
     * 解析内容，内容中可能包含换行
     * @param  {String} 待解析语句
     * @param  {Array}  内容输出
     * @return {Void}
     */
    var _doParseSectionText = function(_content,_out){
        if (!_content) return;
        var _lines = _content.split('\n');
        if (!_lines||!_lines.length) return;
        for(var i=0,l=_lines.length,_line;i<l;i++){
            _line = _lines[i];
            if (!!_trim){
                _line = _line.trim();
                if (!_line) continue;
            } 
            _doParseSectionTextLine(_line,_out);
            if (!!_trim&&i<l-1) _out.push('__OUT.push(\'\\n\');');
        }
    };
    /*
     * 解析内容，内容中可能包含${a}或者${%a%}取值语句
     * @param  {String} 待解析语句
     * @param  {Array}  内容输出
     * @return {Void}
     */
    var _doParseSectionTextLine = (function(){
        var _raor = /\|\|/g,
            _rvor = /#@@#/g;
        return function(_content,_out){
            // defined used variable
            var _prvmrkend = '}',_prvexpend = -1,
                _length = _content.length,
                _begin,_end,_begexp,_endexp,_exparr;
            while((_prvexpend+_prvmrkend.length)<_length){
                _begin = '${'; _end = '}';
                _begexp = _content.indexOf(_begin,_prvexpend+_prvmrkend.length);
                if (_begexp<0) break;
                // parse ${% customer.firstName %} syntax
                if (_content.charAt(_begexp+2)=='%'){
                    _begin = '${%'; _end = '%}';
                }
                _endexp = _content.indexOf(_end,_begexp+_begin.length);
                if (_endexp<0) break;
                _doParseText(_content.substring(_prvexpend+_prvmrkend.length,_begexp),_out);
                // parse expression: 'firstName|default:"John Doe"|capitalize'.split('|')
                _exparr = _content.substring(_begexp+_begin.length,_endexp).replace(_raor,'#@@#').split('|');
                for(var i=0,l=_exparr.length;i<l;_exparr[i]=_exparr[i].replace(_rvor,'||'),i++);
                _out.push('__OUT.push('); _doParseExpression(_exparr,_out); _out.push(');');
                _prvmrkend = _end; _prvexpend = _endexp;
            }
            _doParseText(_content.substring(_prvexpend+_prvmrkend.length),_out);
        };
    })();
    /*
     * 解析纯文本内容，不包含需要解析的内容
     * @param  {String} 待解析内容
     * @param  {Array}  内容输出
     * @return {Void}
     */
    var _doParseText = (function(){
        var _map = {r:/\n|\\|\'/g,'\n':'\\n','\\':'\\\\','\'':'\\\''};
        var _doEncode = function(_content){
            return (_content||'').replace(_map.r,function($1){
                return _map[$1]||$1;
            });
        };
        return function(_content,_out){
            if (!_content) return;
            _out.push('__OUT.push(\''+_doEncode(_content)+'\');');
        };
    })();
    /*
     * 解析模板为执行函数
     * @param  {String}   模板内容
     * @return {Function} 模板执行函数
     */
    var _doParseTemplate = (function(){
        var _rtab = /\t/g,
            _rnln = /\n/g,
            _rlne = /\r\n?/g;
        var _doSearchEnd = function(_content,_begin){
            var _index = _content.indexOf("}",_begin+1);
            // for {for x in \{a:'aaa',b:'bbbb'\}}
            while(_content.charAt(_index-1)=='\\'){
                _index = _content.indexOf("}",_index+1);
            }
            return _index;
        };
        var _doParseVarMap = function(){
            var _arr = [],
                _arg = arguments[0];
            for(var x in _arg){
                x = (x||'').trim();
                if (!x) continue;
                _arr.push(x+'=$v(\''+x+'\')');
            }
            return _arr.length>0?('var '+_arr.join(',')+';'):'';
        };
        return function(_content){
            _vars = {};
            _content = _content.replace(_rlne,'\n').replace(_rtab,'    ');
            var _ftxt = ['if(!__CTX) return \'\';',''];
            _ftxt.push('function $v(__NAME){var v = __CTX[__NAME];return v==null?window[__NAME]:v;};');
            _ftxt.push('var defined=function(__NAME){return __CTX[__NAME]!=null;},');
            _ftxt.push('__OUT=[];');
            // defiend used variables
            var _prvend = -1,_length = _content.length;
            var _stmtbeg,_stmtend,_statement,
                _blockrx,_blktmp,_blkend,_blkmrk,_blktxt;
            // search content
            while((_prvend+1)<_length){
                // search statement begin
                _stmtbeg = _prvend;
                _stmtbeg = _content.indexOf("{",_stmtbeg+1);
                while(_stmtbeg>=0){
                    _stmtend = _doSearchEnd(_content,_stmtbeg);
                    _statement = _content.substring(_stmtbeg,_stmtend);
                    _blockrx = _statement.match(_config.blk);
                    // minify/eval/cdata implementation
                    if (!!_blockrx){
                        _blktmp = _blockrx[1].length+1;
                        _blkend = _content.indexOf('}',_stmtbeg+_blktmp);
                        if (_blkend>=0){
                            // gen block end marker
                            _blkmrk = _blkend-_stmtbeg-_blktmp<=0
                                    ? ('{/'+_blockrx[1]+'}')
                                    : _statement.substr(_blktmp+1);
                            _blktmp = _content.indexOf(_blkmrk,_blkend+1);
                            // parse block content
                            if (_blktmp>=0){
                                _doParseSectionText(_content.substring(_prvend+1,_stmtbeg),_ftxt);
                                // get block text and parse
                                _blktxt = _content.substring(_blkend+1,_blktmp);
                                switch(_blockrx[1]){
                                    case 'cdata' : _doParseText(_blktxt,_ftxt); break;
                                    case 'minify': _doParseText(_blktxt.replace(_rnln,' ').replace(_rspc,' '),_ftxt); break;
                                    case 'eval'  : if (!!_blktxt) _ftxt.push('__OUT.push((function(){'+_blktxt+'})());'); break;
                                }
                                _stmtbeg = _prvend = _blktmp+_blkmrk.length-1;
                            }
                        }
                    }else if(_content.charAt(_stmtbeg-1)!='$'&&
                             _content.charAt(_stmtbeg-1)!='\\'&&
                             _statement.substr(_statement.charAt(1)=='/'?2:1)
                                                         .search(_config.tag)==0){
                        // break when result is a statement
                        break;
                    }
                    _stmtbeg = _content.indexOf("{",_stmtbeg+1);
                }
                if (_stmtbeg<0) break;
                _stmtend = _doSearchEnd(_content,_stmtbeg);
                if (_stmtend<0) break;
                // parse content
                _doParseSectionText(_content.substring(_prvend+1,_stmtbeg),_ftxt);
                _doParseStatement(_content.substring(_stmtbeg,_stmtend+1),_ftxt);
                _prvend = _stmtend;
            }
            _doParseSectionText(_content.substring(_prvend+1),_ftxt);
            _ftxt.push(';return __OUT.join("");'); 
            _ftxt[1] = _doParseVarMap(_vars);
            _vars = null;
            //console.log(_ftxt.join(''));
            return new Function('__CTX','__MDF',_ftxt.join(''));
        };
    })();
    // interface
    /**
     * 取模板随机数种子
     *
     * 代码举例
     * ```javascript
     * NEJ.define([
     *     'util/template/trimpath.nej'
     * ],function(){
     *     // 模版统一随机标识
     *     var _seed = TrimPath.seed();
     * });
     * ```
     * 
     * @method TrimPath.seed
     * @return {String} 随机数种子
     */
    TrimPath.seed = function(){
        return _seed;
    };
    /**
     * 根据模板的序列号合并模板数据
     * 
     * 代码举例
     * ```javascript
     * NEJ.define([
     *     'util/template/trimpath'
     * ],function(){
     *     // 模版合并数据
     *     var _html = TrimPath.merge(
     *         _jst_id,{
     *             a:'aaaaaa',
     *             b:'bbbbbbbbbb',
     *             c:'cccccccccccc'
     *         }
     *     );
     * });
     * ```
     *
     * @method TrimPath.merge
     * @param  {String} arg0 - 模板序列号
     * @param  {Object} arg1 - 模板数据
     * @param  {Object} arg2 - 扩展接口
     * @return {String}        合并数据后的内容
     */
    TrimPath.merge = (function(){
        var _fcache = {};
        // for test
        TrimPath.dump = function(){
            return {
                func:_fcache,
                text:_tcache
            };
        };
        return function(_sn,_data,_extend){
            try{
                _data = _data||{};
                if (!_fcache[_sn]&&!_tcache[_sn])
                    return '';
                if (!_fcache[_sn]){
                    _fcache[_sn] = _doParseTemplate(_tcache[_sn]);
                    delete _tcache[_sn];
                }
                if (!!_extend){
                    for(var x in _config.ext)
                        if (!_extend[x])
                            _extend[x] = _config.ext[x];
                }
                return _fcache[_sn](_data,_extend||_config.ext);
            }catch(ex){
                return ex.message||'';
            }
        };
    })();
    /**
     * 添加JST模板，JST模板可以是节点的值
     *
     * 代码举例
     * ```javascript
     * NEJ.define([
     *     'util/template/trimpath'
     * ],function(){
     *     // 解析缓存模版
     *     var _jst_id = TrimPath.merge(
     *         '<div>\
     *              <p>${a}</p>\
     *              <p>${b}</p>\
     *              <p>${c}</p>\
     *          </div>'
     *     );
     * });
     * ```
     *
     * @method TrimPath.parse
     * @param  {String}  arg0 - JST模板内容
     * @param  {Boolean} arg1 - 是否保留节点
     * @return {String}         JST模板在缓存中的标识
     */
    TrimPath.parse = (function(){
        var _xeed = +new Date;
        return function(_content,_sn){
            if (!_content) return '';
            _sn = _sn||('ck_'+(_xeed++));
            _tcache[_sn] = _content;
            return _sn;
        };
    })();
})();
I$('01daafc45eed32c99fa66fa6bd62337a',function (NEJ,_u,_e,_x,_t,_p,_o,_f,_r){
    var _ext = {};
    /**
     * 取模板随机数种子
     *
     * 脚本举例
     * ```javascript
     * NEJ.define([
     *     'util/template/jst'
     * ],function(_p){
     *     // 返回一个标识符
     *     var _seed = _p._$seed();
     * });
     * ```
     *
     * @method module:util/template/jst._$seed
     * @return {String} 随机数种子
     */
    _p._$seed = TrimPath.seed;
    /**
     * 根据模板的序列号合并模板数据
     *
     * 脚本举例
     * ```javascript
     * NEJ.define([
     *     'util/template/jst'
     * ],function(_p){
     *     // 添加模版
     *     var _html_seed =  _p._$add('<div>${name}</div>');
     *     // 生成结构<div>jack</div>
     *     var _html = _p._$get(_html_seed,{name:'jack'});
     * });
     * ```
     *
     * @method module:util/template/jst._$get
     * @see    module:util/template/jst._$add
     * @param  {String} arg0 - 模板序列号
     * @param  {Object} arg1 - 模板数据
     * @param  {Object} arg2 - 扩展接口
     * @return {String}        合并数据后的内容
     */
    _p._$get = (function(){
        var _doInline = function(_id){
            return !_p._$getTextTemplate?'':
                    _p._$getTextTemplate(_id);
        };
        return function(_sn,_data,_extend){
            _data = _data||{};
            _data.inline = _doInline;
            _extend = _u._$merge({},_ext,_extend);
            _extend.rand = _u._$uniqueID;
            _extend.format = _u._$format;
            _extend.escape = _u._$escape;
            _extend.inline = _doInline;
            return TrimPath.merge(_sn,_data,_extend);
        };
    })();
    /**
     * 添加JST模板，JST模板可以是节点的值
     *
     * 脚本举例
     * ```javascript
     * NEJ.define([
     *     'util/template/jst'
     * ],function(_p){
     *     // 添加模版缓存
     *     var _html_seed =  _p._$add('<div>${name}</div>');
     * });
     * ```
     *
     * @method module:util/template/jst._$add
     * @see    module:util/template/jst._$get
     * @param  {String}  arg0 - JST模板内容或者节点ID
     * @param  {Boolean} arg1 - 是否保留节点
     * @return {String}         JST模板在缓存中的序列号
     */
    _p._$add = function(_content,_keep){
        if (!_content) return '';
        var _sn,_element = _e._$get(_content);
        if (!!_element){
            _sn = _element.id;
            _content = _element.value||_element.innerText;
            if (!_keep) _e._$remove(_element);
        }
        return TrimPath.parse(_content,_sn);
    };
    /**
     * 添加JST模板内容
     * 
     * @method module:util/template/jst._$addTemplate
     * @see    module:util/template/jst._$add
     * @param  {String}  arg0 - JST模板内容
     * @param  {String}  arg1 - 模板标识
     * @return {String}         JST模板在缓存中的序列号
     */
    _p._$addTemplate = function(_content,_sn){
        return TrimPath.parse(_content,_sn);
    };
    /**
     * 整合模板后输出至指定容器节点
     *
     * 结构举例
     * ```html
     * <div id="box">aaa</div>
     * ```
     *
     * 脚本举例
     * ```javascript
     * NEJ.define([
     *     'util/template/jst'
     * ],function(_p){
     *     // 添加模版缓存
     *     var _html_seed =  _p._$add('<div>${name}</div>');
     *     // 把结构塞到box中，生成<div id="box"><div>jack</div></div>
     *     _p._$render('box',_html_seed,{name:'jack'});
     * });
     * ```
     *
     * @method module:util/template/jst._$render
     * @param  {String|Node} arg0 - 容器节点
     * @param  {String}      arg1 - 模板序列号
     * @param  {Object}      arg2 - 模板数据
     * @param  {Object}      arg3 - 扩展接口
     * @return {Void}
     */
    /**
     * @method CHAINABLE._$render
     * @see module:util/template/jst._$render
     */
    _p._$render = function(_parent,_sn,_data,_extend){
        _parent = _e._$get(_parent);
        if (!!_parent){
            _parent.innerHTML =
                _p._$get(_sn,_data,_extend);
        }
    };
    /**
     * 注册JST扩展方法
     *
     * 结构举例
     * ```html
     * <textarea name="jst" id="abc">
     *   <div>
     *     <p>${name|a|b}</p>
     *   </div>
     * </textarea>
     * ```
     *
     * 脚本举例
     * ```javascript
     * NEJ.define([
     *     'util/template/jst'
     * ],function(_p){
     *     // 注册扩展方法 a和b
     *     _p._$extend({
     *         a:function(){},
     *         b:function(){}
     *     });
     *     // 模板整合数据
     *     _p._$render(
     *         'box','abc',{name:'jack'}
     *     );
     * });
     * ```
     *
     * @method module:util/template/jst._$extend
     * @param  {Object} arg0 - 扩展方法
     * @return {Void}
     */
    _p._$extend = function(_map){
        _u._$merge(_ext,_map);
    };
    // for chainable method
    _x._$merge({_$render:_p._$render});

    if (CMPT){ 
        var _z = NEJ.P('nej.e');
        _z._$addHtmlTemplate     = _p._$add;
        _z._$getHtmlTemplate     = _p._$get;
        _z._$getHtmlTemplateSeed = _p._$seed;
        _z._$renderHtmlTemplate  = _p._$render;
        _z._$registJSTExt        = _p._$extend;
    }

    return _p;
},'083c017e2a5450e295d417651bc93279','3695926c26a1894dcce266fdc52d2e3a','43a92a1cb30f0322e2bca627e0f6b635','9964aa517a3b6122213b910cbdd3428e','624f9f43e8e3e4c4eb9d90513481608b');
I$('5dc30961f3452903950eb8a25e3d2109',function (NEJ,_k,_v,_u,_p,_o,_f,_r){
    var _pro;
    /**
     * 控件基类，主要实现以下功能：
     * * 对事件驱动编程模型的支持
     * * 对控件通用行为及业务逻辑的抽象
     * 
     * ```javascript
     *   NEJ.define([
     *       'base/klass',
     *       'util/event'
     *   ],function(_k,_t,_p,_o,_f,_r){
     *       // 自定义一个控件及使用、回收的流程
     *       var _pro;
     *   
     *       // 第一步
     *       // 定义控件类，从父类继承
     *       _p._$$Widget = _k._$klass();
     *       _pro = _p._$$Widget._$extend(_t._$$EventTarget);
     *   
     *       // 第二步
     *       // 重写控件初始化业务逻辑
     *       _pro.__init = function(_options){
     *           // _options - 配置参数信息
     *           //            初始化时一般不对该参数做处理
     *           // 调用父类初始化业务逻辑
     *           this.__super(_options);
     *           // TODO something
     *       };
     *   
     *       // 第三步
     *       // 重写控件重置业务逻辑
     *       _pro.__reset = function(_options){
     *           // _options - 配置参数信息
     *           //            此处重置控件配置信息
     *           // 调用父类重置业务逻辑
     *           this.__super(_options);
     *           // TODO something
     *       };
     *   
     *       // 第四步
     *       // 重写控件回收业务逻辑
     *       _pro.__destroy = function __destroy(){
     *           // 调用父类回收业务逻辑
     *           this.__super();
     *           // TODO something
     *       };
     *   
     *       // 第五步
     *       // 使用控件
     *       var _widget = _p._$$Widget._$allocate({
     *           a:'aaaaaaaaaaa',
     *           b:'bbbbbbbbbbbbb',
     *           c:'ccccccccccccccc'
     *       });
     *   
     *       // 第六步
     *       // 回收控件
     *       _widget = _widget._$recycle();
     *       // 也可以使用以下方式回收，建议使用上面的回收方式
     *       _widget = _p._$$Widget._$recycle(_widget);
     *   });
     * ```
     * 
     * @class module:util/event._$$EventTarget
     * @param {Object} config - 配置参数，根据控件实际情况提供配置参数支持
     */
    /** 
     * 控件回收前触发事件，控件在具体实现时如需触发回收前的事件
     * 
     * ```javascript
     *   // 重写控件回收业务逻辑触发onbeforerecycle事件
     *   _pro.__destroy = function(){
     *       this._$dispatchEvent('onbeforerecycle');
     *       // 调用父类回收业务逻辑
     *       this.__super();
     *       // TODO something
     *   };
     * 
     *   // 监测onbeforerecycle事件
     *   var _widget = _p._$$Widget._$allocate({
     *       onbeforerecycle:function(_event){
     *           // TODO something
     *       }
     *   });
     * ```
     * 
     * @event module:util/event._$$EventTarget#onbeforerecycle
     * @param {Object} event - 事件触发信息
     */
    /**
     * 控件回收后触发事件，控件在具体实现时如需触发回收后的事件
     * 
     * ```javascript
     *   // 重写控件回收业务逻辑触发onbeforerecycle事件
     *   _pro.__destroy = function(){
     *       // 调用父类回收业务逻辑
     *       this.__super();
     *       // TODO something
     *       this._$dispatchEvent('onaftercycle');
     *   };
     *   
     *   // 监测onaftercycle事件
     *   var _widget = _p._$$Widget._$allocate({
     *       onaftercycle:function(_event){
     *           // TODO something
     *       }
     *   });
     * ```
     * 
     * @event module:util/event._$$EventTarget#onaftercycle
     * @param {Object} event - 事件触发信息
     */
    _p._$$EventTarget = _k._$klass();
    _pro = _p._$$EventTarget.prototype;
    /**
     * 控件分配，NEJ框架提供的所有控件统一使用分配和回收机制，
     * 分配空间时会优先考虑使用前面回收的同种控件，只有在没有可用控件的情况下才会实例化新的控件
     * 
     * ```javascript
     *   // 分配一个控件
     *   var _widget = _p._$$Widget._$allocate({
     *       conf0:'aaaaaaa',
     *       conf1:'bbbbbbbbbbbbb',
     *       onxxx:function(){
     *           // TODO something
     *       }
     *   });
     * ```
     * 
     * @method module:util/event._$$EventTarget._$allocate
     * @see    module:util/event._$$EventTarget._$getInstance
     * @see    module:util/event._$$EventTarget._$getInstanceWithReset
     * @param  {Object}  arg0 - 配置参数，根据控件实际情况提供配置参数支持
     * @return {module:util/event._$$EventTarget} 控件实例
     */
    _p._$$EventTarget._$allocate = function(_options){
        _options = _options||{};
        var _instance = !!this.__pool
                        &&this.__pool.shift();
        if (!_instance){
            _instance = new this(_options);
            this.__inst__ = (this.__inst__||0)+1;
        }
        // reset instance, flag first
        _instance.__reset(_options);
        return _instance;
    };
    /**
     * 控件回收，NEJ框架提供的所有控件统一使用分配和回收机制，
     * 如果提供的实例非当前类的实例则自动调整为输入实例的类来回收此实例
     * 
     * ```javascript
     *   // 回收前面分配的实例有两种方式
     *   // 如果不能确定实例的构造类，则可以直接使用实例的回收接口
     *   _widget._$recycle();
     *   // 如果可以确定实例的构造类，则可以使用构造类的静态回收接口
     *   _p._$$Widget._$recycle(_widget);
     *   // 如果回收多个实例则使用构造类的静态回收接口
     *   _p._$$Widget._$recycle([_widget0,_widget1]);
     * ```
     * 
     * @method module:util/event._$$EventTarget._$recycle
     * @param  {module:util/event._$$EventTarget|module:util/event._$$EventTarget[]} arg0 - 待回收实例或者实例列表
     * @return {Void}
     */
    _p._$$EventTarget._$recycle = (function(){
        var _doRecycle = function(_item,_index,_list){
            _item._$recycle();
            _list.splice(_index,1);
        };
        return function(_instance){
            if (!_instance) return null;
            if (!_u._$isArray(_instance)){
                // instance is not instanceof class
                if (!(_instance instanceof this)){
                    // use constructor recycle instance
                    var _class = _instance.constructor;
                    if (!!_class._$recycle){
                        _class._$recycle(_instance);
                    }
                    return null;
                }
                // delete singleton instance
                if (_instance==this.__instance){
                    delete this.__instance;
                }
                if (_instance==this.__inctanse){
                    delete this.__inctanse;
                }
                // do recycle
                _instance.__destroy();
                // recycle instance
                if (!this.__pool){
                    this.__pool = [];
                } 
                if (_u._$indexOf(this.__pool,_instance)<0){
                    this.__pool.push(_instance);
                }
                return null;
            }
            // recycle instance array
            _u._$reverseEach(_instance,_doRecycle,this);
        };
    })();
    /**
     * 取控件实例（单例），如果控件指明了为单例模式，
     * 则项目中使用该控件时统一使用此接口获取控件实例，使用方式同_$allocate
     * 
     * ```javascript
     *   // 取控件单例，确保在第一次取单例时输入所有配置参数
     *   var _widget = _p._$$Widget._$getInstance({
     *       conf0:'aaaaaaa',
     *       conf1:'bbbbbbbbbbbbb',
     *       onxxx:function(){
     *           // TODO something
     *       }
     *   });
     *   
     *   // 后续取单例忽略配置参数
     *   var _widget1 = _p._$$Widget._$getInstance({
     *       conf0:'bbbbb'  // <-- 如果单例已生成，则这里的配置信息不会生效
     *   });
     * 
     *   // 等价于如下调用
     *   var _widget2 = _p._$$Widget._$getInstance();
     * ```
     * 
     * @method module:util/event._$$EventTarget._$getInstance
     * @see    module:util/event._$$EventTarget._$getInstanceWithReset
     * @see    module:util/event._$$EventTarget._$allocate
     * @param  {Object}  arg0 - 配置参数，根据控件实际情况提供配置参数支持
     * @return {module:util/event._$$EventTarget} 控件实例
     */
    _p._$$EventTarget._$getInstance = function(_options){
        if (!this.__instance){
            this.__instance = this._$allocate(_options);
        }
        return this.__instance;
    };
    /**
     * 取控件实例（单例），如果控件指明了为单例模式，
     * 则项目中使用该控件时统一使用此接口获取控件实例，使用方式同_$getInstance，
     * 该接口同_$getInstance接口的主要区别在于输入的配置参数是否在每次调用接口时都重置
     * 
     * ```javascript
     *   // 取控件单例，确保在第一次取单例时输入所有配置参数
     *   var _widget = _p._$$Widget._$getInstanceWithReset({
     *       conf0:'aaaaaaa',
     *       conf1:'bbbbbbbbbbbbb',
     *       onxxx:function(){
     *           // TODO something
     *       }
     *   });
     *   
     *   // 后续取单例使用新的配置参数
     *   var _widget1 = _p._$$Widget._$getInstanceWithReset({
     *       conf0:'bbbbb'  // <-- 如果单例已生成，则重置这里的配置信息
     *   });
     * ```
     * 
     * @method module:util/event._$$EventTarget._$getInstanceWithReset
     * @see    module:util/event._$$EventTarget._$getInstance
     * @see    module:util/event._$$EventTarget._$allocate
     * @param  {Object}  arg0 - 配置参数，根据控件实际情况提供配置参数支持
     * @param  {Boolean} arg1 - 是否需要先清理已有实例
     * @return {module:util/event._$$EventTarget} 控件实例
     */
    _p._$$EventTarget._$getInstanceWithReset = function(_options,_clear){
        // clear instance
        if (!!_clear&&!!this.__inctanse){
            this.__inctanse._$recycle();
            delete this.__inctanse;
        }
        // allocate instance
        if (!this.__inctanse){
            this.__inctanse = this._$allocate(_options);
        }else{
            this.__inctanse.__reset(_options);
        }
        return this.__inctanse;
    };
    /**
     * 控件初始化，
     * 子类可重写此接口业务逻辑，
     * 子类可通过调用__super接口调用父类的初始化业务逻辑
     * 
     * ```javascript
     *   // 子类控件初始化业务逻辑
     *   _pro.__init = function(){
     *       // 调用父类控件初始化
     *       this.__super();
     *       // TODO something
     *   };
     * ```
     * 
     * @protected
     * @method module:util/event._$$EventTarget#__init
     * @return {Void}
     */
    _pro.__init = function(){
        this.__events = {};
        this.__events_dom = {};
        this.id = _u._$uniqueID();
    };
    /**
     * 控件重置，此接口用来接收控件配置参数的处理，
     * 控件基类已处理以下业务逻辑：
     * 
     * * 缓存通过配置参数输入的回调事件
     * 
     * 子类重写此接口业务逻辑来处理具体控件对配置参数的处理，
     * 子类通过调用__super接口调用父类的重置业务逻辑
     * 
     * ```javascript
     *   // 子类控件重置业务逻辑
     *   _pro.__reset = function(_options){
     *       // 调用父类控件重置逻辑
     *       this.__super(_options);
     *       // TODO something
     *   };
     * ```
     * 
     * @protected
     * @method module:util/event._$$EventTarget#__reset
     * @param  {Object} arg0 - 配置参数，根据控件实际情况提供配置参数支持
     * @return {Void}
     */
    _pro.__reset = function(_options){
        this._$batEvent(_options);
    };
    /**
     * 控件销毁，当控件在回收时会调用此接口，基类已处理以下业务逻辑：
     * 
     * * 通过配置参数输入的事件回调的清理
     * * 通过__doInitDomEvent接口添加的DOM事件的清理
     * 
     * 一般情况下控件还需回收通过重置接口__reset产生的数据，
     * 子类可重写此接口业务逻辑来触发onbeforerecycle和onafterrecycle事件，
     * 子类可通过调用__super接口调用父类的销毁业务逻辑
     * 
     * ```javascript
     *   // 子类重写控件销毁逻辑
     *   _pro.__destroy = function(){
     *       // 触发回收之前事件
     *       this._$dispatchEvent('onbeforerecycle');
     *       // 调用父类清理逻辑，如果有触发回收之后事件则以下业务逻辑需在触发回收之后事件后面调用
     *       //this.__super();
     *       // 清理本控件的数据
     *       delete this.__conf0;
     *       this.__widget2 = this.__widget2._$recycle();
     *       // 触发回收之后事件，确保在onafterrecycle事件被清理前触发
     *       this._$dispatchEvent('onafterrecycle');
     *       this.__super();
     *   };
     * ```
     * 
     * @protected
     * @method module:util/event._$$EventTarget#__destroy
     * @return {Void}
     */
    _pro.__destroy = function(){
        this._$clearEvent();
        this.__doClearDomEvent();
    };
    /**
     * 初始化事件，
     * 重置接口__reset中需要通过_$addEvent接口添加的事件，
     * 使用此接口添加可以在回收时自动被清理
     * 
     * ```javascript
     *   // 子类重置接口添加节点事件
     *   _pro.__reset = function(_options){
     *       this.__super(_options);
     *       // 添加DOM事件或者自定义事件
     *       this.__doInitDomEvent([
     *           [document,'click',this.__onDocClick._$bind(this)],
     *           [window,'ok',this.__onWindowOK._$bind(this)]
     *       ]);
     *   };
     * ```
     * 
     * @protected
     * @method module:util/event._$$EventTarget#__doInitDomEvent
     * @see    module:util/event._$$EventTarget#__doClearDomEvent
     * @param  {Array} arg0 - 待添加的事件配置列表 
     * @return {Void}
     */
    _pro.__doInitDomEvent = (function(){
        var _doAttach = function(_args){
            if (!_args||_args.length<3) return;
            this.__events_dom['de-'+_u._$uniqueID()] = _args;
            _v._$addEvent.apply(_v,_args);
        };
        return function(_list){
            _u._$forEach(_list,_doAttach,this);
        };
    })();
    /**
     * 清除DOM事件，_$recycle接口会自动调用来清理这种DOM事件
     * 
     * ```javascript
     *   // 子类重置接口清理节点事件
     *   _pro.__destroy = function(_options){
     *       this.__doClearDomEvent();
     *       this.__super(_options);
     *   };
     * ```
     * 
     * @protected
     * @method module:util/event._$$EventTarget#__doClearDomEvent
     * @see    module:util/event._$$EventTarget#__doInitDomEvent
     * @return {Void}
     */
    _pro.__doClearDomEvent = (function(){
        var _doRemoveEvent = function(_args,_key,_map){
            delete _map[_key];
            _v._$delEvent.apply(_v,_args);
        };
        return function(){
            _u._$loop(this.__events_dom,_doRemoveEvent);
        };
    })();
    /**
     * 清理所有组合的控件
     * 
     * ```javascript
     *   // 子类重置接口清理组件
     *   _pro.__destroy = function(_options){
     *       this.__doClearComponent(function(_inst){
     *           // 不回收_p._$$Widget2控件实例
     *           return _inst instanceof _p._$$Widget2;
     *       });
     *       this.__super(_options);
     *   };
     * ```
     * 
     * @protected
     * @method module:util/event._$$EventTarget#__doClearComponent
     * @param  {Function} arg0 - 过滤接口，返回true表示不清理该控件
     * @return {Void}
     */
    _pro.__doClearComponent = function(_filter){
        _filter = _filter||_f;
        _u._$loop(this,function(_inst,_key,_map){
            if (!!_inst&&!!_inst._$recycle&&!_filter(_inst)){
                delete _map[_key];
                _inst._$recycle();
            }
        });
    };
    /**
     * 回收控件，通过实例的构造类来回收当前实例
     * 
     * ```javascript
     *   // 通过实例的接口回收当前实例
     *   _widget._$recycle();
     * ```
     * 
     * @method module:util/event._$$EventTarget#_$recycle
     * @see    module:util/event._$$EventTarget#_$allocate
     * @return {Void}
     */
    _pro._$recycle = function(){
        this.constructor._$recycle(this);
    };
    /**
     * 判断是否有注册事件回调
     * 
     * ```javascript
     *   // 分配实例
     *   var _widget = _p._$$Widget._$allocate({
     *       onok:function(){
     *           // TODO
     *       }
     *   });
     *   // 判断控件实例是否注册有onok事件回调
     *   _widget._$hasEvent('onok');
     * ```
     * 
     * @method module:util/event._$$EventTarget#_$hasEvent
     * @param  {String} arg0 - 事件类型
     * @return {Boolean}       是否注册了事件回调
     */
    _pro._$hasEvent = function(_type){
        var _type = (_type||'').toLowerCase(),
            _event = this.__events[_type];
        return !!_event&&_event!==_f;
    };
    /**
     * 删除单个事件回调
     * 
     * ```javascript
     *   var _handler = function(){
     *       // TODO
     *   };
     *   // 分配实例
     *   var _widget = _p._$$Widget._$allocate({
     *       onok:_handler
     *   });
     *   // 删除onok事件回调
     *   _widget._$delEvent('onok',_handler);
     * ```
     * 
     * @method module:util/event._$$EventTarget#_$delEvent
     * @param  {String}   arg0 - 事件类型
     * @param  {Function} arg1 - 事件处理函数
     * @return {Void}
     */
    _pro._$delEvent = function(_type,_event){
        var _type = (_type||'').toLowerCase(),
            _events = this.__events[_type];
        if (!_u._$isArray(_events)){
            if (_events==_event){
                delete this.__events[_type];
            }
            return;
        }
        // batch remove
        _u._$reverseEach(
            _events,function(_func,_index,_list){
                if (_func==_event){
                    _list.splice(_index,1);
                }
            }
        );
        if (!_events.length){
            delete this.__events[_type];
        }
    };
    /**
     * 重置事件，覆盖原有事件
     * 
     * ```javascript
     *   // 分配实例
     *   var _widget = _p._$$Widget._$allocate();
     *   // 设置控件事件回调
     *   _widget._$setEvent('onok',function(){
     *       // TODO something
     *   });
     *   _widget._$setEvent('oncancel',function(){
     *       // TODO something
     *   });
     * ```
     * 
     * @method module:util/event._$$EventTarget#_$setEvent
     * @param  {String}   arg0 - 事件类型，大小写不敏感
     * @param  {Function} arg1 - 事件处理函数
     * @return {Void}
     */
    _pro._$setEvent = function(_type,_event){
        if (!!_type&&_u._$isFunction(_event)){
            this.__events[_type.toLowerCase()] = _event;
        }
    };
    /**
     * 批量添加事件
     * 
     * ```javascript
     *   // 分配实例
     *   var _widget = _p._$$Widget._$allocate();
     *   // 批量设置控件事件回调
     *   _widget._$batEvent({
     *       onok:function(){
     *           // TODO something
     *       },
     *       oncancel:function(){
     *           // TODO something
     *       }
     *   });
     * ```
     * 
     * @method module:util/event._$$EventTarget#_$batEvent
     * @see    module:util/event._$$EventTarget#_$setEvent
     * @param  {Object} arg0 - 事件集合,{type:function}
     * @return {Void}
     */
    _pro._$batEvent = (function(){
        var _doSetEvent = function(_event,_type){
            this._$setEvent(_type,_event);
        };
        return function(_events){
            _u._$loop(_events,_doSetEvent,this);
        };
    })();
    /**
     * 清除事件，没有指定类型则清除所有事件
     * 
     * ```javascript
     *   // 分配实例
     *   var _widget = _p._$$Widget._$allocate({
     *       onok:function(){
     *           // TODO something
     *       }
     *   });
     *   // 清除onok事件回调
     *   _widget._$clearEvent('onok');
     *   // 清除所有时间回调
     *   _widget._$clearEvent();
     * ```
     * 
     * @method module:util/event._$$EventTarget#_$clearEvent
     * @param  {String} arg0 - 事件类型
     * @return {Void}
     */
    _pro._$clearEvent = (function(){
        var _doClearEvent = function(_event,_type){
            this._$clearEvent(_type);
        };
        return function(_type){
            var _type = (_type||'').toLowerCase();
            if (!!_type){
                delete this.__events[_type];
            }else{
                _u._$loop(this.__events,_doClearEvent,this);
            }
        };
    })();
    /**
     * 追加事件，通过此接口可以对同一个事件添加多个回调函数
     * 
     * ```javascript
     *   // 分配实例
     *   var _widget = _p._$$Widget._$allocate({
     *       onok:function(){
     *           // TODO something
     *       }
     *   });
     *   // 追加事件回调
     *   _widget._$addEvent({
     *       onok:function(){
     *           // TODO something
     *       }
     *   });
     * ```
     * 
     * @method module:util/event._$$EventTarget#_$addEvent
     * @param  {String}   arg0 - 事件类型
     * @param  {Function} arg1 - 事件处理函数
     * @return {Void}
     */
    _pro._$addEvent = function(_type,_event){
        // check type and event
        if (!_type||!_u._$isFunction(_event)){
            return;
        }
        // cache event
        _type = _type.toLowerCase();
        var _events = this.__events[_type];
        if (!_events){
            this.__events[_type] = _event;
            return;
        }
        if (!_u._$isArray(_events)){
            this.__events[_type] = [_events];
        }
        this.__events[_type].push(_event);
    };
    /**
     * 调用事件，一般在控件实现的具体业务逻辑中使用
     * 
     * ```javascript
     *   // 分配实例
     *   var _widget = _p._$$Widget._$allocate({
     *       onok:function(){
     *           // TODO something
     *       }
     *   });
     *   // 触发控件onok事件
     *   _widget._$dispatchEvent('onok');
     *   
     *   // 在控件实现的业务逻辑中使用
     *   _pro.__doSomething = function(){
     *       // TODO something
     *       // 触发onok事件
     *       this._$dispatchEvent('onok');
     *   };
     * ```
     * 
     * @method module:util/event._$$EventTarget#_$dispatchEvent
     * @param  {String}   arg0 - 事件类型，不区分大小写
     * @param  {Variable} arg1 - 事件可接受参数，具体看调用时的业务逻辑
     * @return {Void}
     */
    _pro._$dispatchEvent = function(_type){
        var _type = (_type||'').toLowerCase(),
            _event = this.__events[_type];
        if (!_event) return;
        var _args = _r.slice.call(arguments,1);
        // single event
        if (!_u._$isArray(_event)){
            _event.apply(this,_args);
            return;
        }
        // event list
        _u._$forEach(
            _event,function(_handler){
                if (DEBUG){
                    _handler.apply(this,_args);
                }else{
                    try{
                        _handler.apply(this,_args);
                    }catch(ex){
                        // ignore
                        console.error(ex.message);
                        console.error(ex.stack);
                    }
                }
            },this
        );
    };
    
    if (CMPT){
        _p._$$Event = _p._$$EventTarget;
        NEJ.copy(NEJ.P('nej.ut'),_p);
    }
    
    return _p;
},'083c017e2a5450e295d417651bc93279','7d45f691904093dd3d0d2a39eb337c1c','0dd9ac3de45a7a1ce7c2f3ff80d53fcc','3695926c26a1894dcce266fdc52d2e3a');
I$('df1fd1a19dd83f534a4afd4e03e3b8a0',function (NEJ,_k,_e,_v,_u,_t,_p,_o,_f,_r){
    var _pro;
    /**
     * 自定义事件封装对象，封装的事件支持通过事件相关接口进行添加、删除等操作
     * 
     * 脚本举例
     * ```javascript
     * NEJ.define([
     *     'base/event'
     *     'util/event'
     * ],function(_v,_t){
     *     // 支持自定义事件
     *     _t._$$CustomEvent._$allocate({
     *         element:window,
     *         event:'ok'
     *     });
     * 
     *     // 添加自定义事件 
     *     _v._$addEvent(window,'ok',function(){alert(0);});
     *     _v._$addEvent(window,'ok',function(){alert(1);});
     *     
     *     // 删除自定义事件
     *     _v._$delEvent(window,'ok',function(){alert(0);});
     *     _v._$clearEvent(window,'ok');
     *     
     *     // 触发自定义事件
     *     window.onok({a:'aaaaa'});
     *     _v._$dispatchEvent(window,'ok',{a:'aaaaa'});
     * });
     * ```
     * 
     * @class    module:util/event/event._$$CustomEvent
     * @extends  module:util/event._$$EventTarget
     * 
     * @param    {Object}       config  - 可选配置参数
     * @property {String|Node}  element - 事件关联节点ID或者对象，默认为window对象
     * @property {String|Array} event   - 事件名称或者名称列表
     */
    /** 
     * 初始化时触发事件
     * 
     * @event module:util/event/event._$$CustomEvent#oninit
     * @param {Object} event - 事件信息
     */
    /** 
     * 事件调度前触发事件
     * 
     * @event    module:util/event/event._$$CustomEvent#ondispatch
     * @param    {Object} event - 事件信息
     * @property {String} type  - 事件类型
     */
    /**
     * 添加事件时触发事件
     * 
     * @event    module:util/event/event._$$CustomEvent#oneventadd
     * @param    {Object}   event    - 事件信息
     * @property {String}   type     - 事件类型
     * @property {Function} listener - 事件执行函数
     */
    _p._$$CustomEvent = _k._$klass();
    _pro = _p._$$CustomEvent._$extend(_t._$$EventTarget);
    /**
     * 控件初始化
     * 
     * @protected
     * @method module:util/event/event._$$CustomEvent#__init
     * @return {Void}
     */
    _pro.__init = function(){
        // onxxx - event entry handler
        //   xxx - event callback handler list
        this.__cache = {};
        this.__super();
    };
    /**
     * 控件重置
     * 
     * @protected
     * @method module:util/event/event._$$CustomEvent#__reset
     * @param  {Object} arg0 - 可选配置参数
     * @return {Void}
     */
    _pro.__reset = function(_options){
        this.__super(_options);
        this.__element = _e._$get(_options.element)||window;
        // init event
        this.__doEventInit(_options.event);
        this.__doEventAPIEnhance();
        this._$dispatchEvent('oninit');
    };
    /**
     * 销毁控件
     * 
     * @protected
     * @method module:util/event/event._$$CustomEvent#__destroy
     * @return {Void}
     */
    _pro.__destroy = (function(){
        var _doClear = function(_value,_key,_map){
            if (!_u._$isArray(_value)){
                _u._$safeDelete(this.__element,_key);
            }
            delete _map[_key];
        };
        return function(){
            this.__super();
            // clear cache
            _u._$loop(
                this.__cache,_doClear,this
            );
            delete this.__element;
        };
    })();
    /**
     * 判断是否需要代理事件
     * 
     * @protected
     * @method module:util/event/event._$$CustomEvent#__isDelegate
     * @param  {String|Node} arg0 - 节点
     * @param  {String}      arg1 - 事件
     * @return {Boolean}            是否需要代理事件
     */
    _pro.__isDelegate = function(_element,_type){
        _element = _e._$get(_element);
        return _element===this.__element&&
               (!_type||!!this.__cache['on'+_type]);
    };
    /**
     * 初始化事件
     * 
     * @protected
     * @method module:util/event/event._$$CustomEvent#__doEventInit
     * @param  {String} arg0 - 事件名称
     * @return {Void}
     */
    _pro.__doEventInit = function(_event){
        if (_u._$isString(_event)){
            var _name = 'on'+_event;
            if (!this.__cache[_name]){
                this.__cache[_name] = 
                    this.__doEventDispatch.
                        _$bind(this,_event);
            }
            this.__doEventBind(_event); 
            return;
        }
        if (_u._$isArray(_event)){
            _u._$forEach(
                _event,this.__doEventInit,this
            );
        }
    };
    /**
     * 绑定事件
     * 
     * @protected
     * @method module:util/event/event._$$CustomEvent#__doEventBind
     * @param  {String} arg0 - 事件名称
     * @return {Void}
     */
    _pro.__doEventBind = function(_type){
        var _event = 'on'+_type,
            _handler = this.__element[_event],
            _handler1 = this.__cache[_event];
        if (_handler!=_handler1){
            this.__doEventDelete(_type);
            if (!!_handler&&_handler!=_f){
                this.__doEventAdd(_type,_handler);
            }
            this.__element[_event] = _handler1;
        }
    };
    /**
     * 添加事件
     * 
     * protected
     * @method module:util/event/event._$$CustomEvent#__doEventAdd
     * @param  {String}   arg0 - 事件名称
     * @param  {Function} arg1 - 事件回调
     * @return {Void}
     */
    _pro.__doEventAdd = function(_type,_handler,_front){
        var _list = this.__cache[_type];
        if (!_list){
            _list = [];
            this.__cache[_type] = _list;
        }
        if (_u._$isFunction(_handler)){
            !_front ? _list.push(_handler)
                    : _list.unshift(_handler);
        } 
    };
    /**
     * 删除事件
     * 
     * protected
     * @method module:util/event/event._$$CustomEvent#__doEventDelete
     * @param  {String}   arg0 - 事件名称
     * @param  {Function} arg1 - 事件回调
     * @return {Void}
     */
    _pro.__doEventDelete = function(_type,_handler){
        var _list = this.__cache[_type];
        if (!_list||!_list.length) return;
        // clear all event handler
        if (!_handler){
            delete this.__cache[_type];
            return;
        }
        // delete one event handler
        _u._$reverseEach(
            _list,function(_value,_index,_xlist){
                if (_handler===_value){
                    _xlist.splice(_index,1);
                    return !0;
                }
            }
        );
    };
    /**
     * 事件调度
     * 
     * protected
     * @method module:util/event/event._$$CustomEvent#__doEventDispatch
     * @param  {String} arg0 - 事件名称
     * @param  {Object} arg1 - 事件对象
     * @return {Void}
     */
    _pro.__doEventDispatch = function(_type,_event){
        _event = _event||{noargs:!0};
        if (_event==_o){
            _event = {};
        }
        _event.type = _type;
        this._$dispatchEvent('ondispatch',_event);
        if (!!_event.stopped) return;
        _u._$forEach(
            this.__cache[_type],function(_handler){
                if (DEBUG){
                    _handler(_event);
                }else{
                    try{
                        _handler(_event);
                    }catch(ex){
                        // ignore
                        console.error(ex.message);
                        console.error(ex.stack);
                    }
                }
            }
        );
    };
    /**
     * 增强事件操作API
     * 
     * protected
     * @method module:util/event/event._$$CustomEvent#__doEventAPIEnhance
     * @return {Void}
     */
    _pro.__doEventAPIEnhance = (function(){
        var _doAddEvent = function(_event){
            var _args = _event.args,
                _type = _args[1].toLowerCase();
            if (this.__isDelegate(_args[0],_type)){
                _event.stopped = !0;
                this.__doEventBind(_type);
                this.__doEventAdd(_type,_args[2],_args[3]);
                this._$dispatchEvent('oneventadd',{
                    type:_type,
                    listener:_args[2]
                });
            }
        };
        var _doDelEvent = function(_event){
            var _args = _event.args,
                _type = _args[1].toLowerCase();
            if (this.__isDelegate(_args[0],_type)){
                _event.stopped = !0;
                this.__doEventDelete(_type,_args[2]);
            }
        };
        var _doClearEvent = function(_event){
            var _args = _event.args,
                _type = (_args[1]||'').toLowerCase();
            if (this.__isDelegate(_args[0])){
                if (!!_type){
                    this.__doEventDelete(_type);
                    return;
                }
                _u._$loop(
                    this.__cache,function(_value,_key){
                        if (_u._$isArray(_value)){
                            this.__doEventDelete(_key);
                        }
                    },this
                );
            }
        };
        var _doDispatchEvent = function(_event){
            var _args = _event.args,
                _type = _args[1].toLowerCase();
            if (this.__isDelegate(_args[0],_type)){
                _event.stopped = !0;
                _args[0]['on'+_type].apply(_args[0],_args.slice(2));
            }
        };
        return function(){
            // void multi-enhance
            if (!!this.__enhanced){
                return;
            }
            // enhance event api
            this.__enhanced = true;
            _v._$addEvent = _v._$addEvent._$aop(_doAddEvent._$bind(this));
            _v._$delEvent = _v._$delEvent._$aop(_doDelEvent._$bind(this));
            _v._$clearEvent = _v._$clearEvent._$aop(_doClearEvent._$bind(this));
            _v._$dispatchEvent = _v._$dispatchEvent._$aop(_doDispatchEvent._$bind(this));
            
            if (CMPT){
                NEJ.copy(NEJ.P('nej.v'),_v);
            }
        };
    })();
    
    if (CMPT){
        NEJ.copy(NEJ.P('nej.ut'),_p);
    }
    
    return _p;
},'083c017e2a5450e295d417651bc93279','7d45f691904093dd3d0d2a39eb337c1c','43a92a1cb30f0322e2bca627e0f6b635','0dd9ac3de45a7a1ce7c2f3ff80d53fcc','3695926c26a1894dcce266fdc52d2e3a','5dc30961f3452903950eb8a25e3d2109');
I$('d4d1cd9341f1ae03363136541b2b61e5',function (NEJ,_k,_g,_v,_u,_t,_p,_o,_f,_r){
    var _pro,
        _timeout = 60000;
    /**
     * 资源加载器
     * 
     * @class    module:util/ajax/loader/loader._$$LoaderAbstract
     * @extends  module:util/event._$$EventTarget
     * 
     * @param    {Object} config  - 可选配置参数
     * @property {String} version - 版本信息
     * @property {Number} timeout - 超时时间，0表示禁止超时监测
     */
    /** 
     * 资源载入失败回调
     * 
     * @event    module:util/ajax/loader/loader._$$LoaderAbstract#onerror
     * @param    {Object} event   - 错误信息
     * @property {Number} code    - 错误码
     * @property {String} message - 错误信息
     */
    /** 
     * 资源载入成功回调
     * 
     * @event  module:util/ajax/loader/loader._$$LoaderAbstract#onload
     * @param  {Variable} event - 请求返回数据
     */
    /** 
     * 资源加载中回调
     * 
     * @event  module:util/ajax/loader/loader._$$LoaderAbstract#onloading
     */
    _p._$$LoaderAbstract = _k._$klass();
    _pro = _p._$$LoaderAbstract._$extend(_t._$$EventTarget);
    /**
     * 控件初始化
     * 
     * @protected
     * @method module:util/ajax/loader/loader._$$LoaderAbstract#__init
     * @return {Void}
     */
    _pro.__init = function(){
        this.__super();
        this.__qopt = {
            onerror:this.__onQueueError._$bind(this),
            onload:this.__onQueueLoaded._$bind(this)
        };
        if (!this.constructor.__cache){
            // url : {request:script,timer:2,bind:[instance1,instance2 ... ]}
            // key : {error:0,loaded:0,total:0,bind:[instance1,instance2 ... ]}
            this.constructor.__cache = {loaded:{}};
        }
    };
    /**
     * 控件重置
     * 
     * @protected
     * @method module:util/ajax/loader/loader._$$LoaderAbstract#__reset
     * @param  {Object} arg0 - 可选配置参数
     * @return {Void}
     */
    _pro.__reset = function(_options){
        this.__super(_options);
        this.__version = _options.version;
        this.__timeout = _options.timeout;
        this.__qopt.version = this.__version;
        this.__qopt.timeout = this.__timeout;
    };
    /**
     * 删除加载信息
     * 
     * @protected
     * @method module:util/ajax/loader/loader._$$LoaderAbstract#__delLoadData
     * @param  {String} arg0 - 标识
     * @return {Object}        加载信息
     */
    _pro.__delLoadData = function(_key){
        delete this.constructor.__cache[_key];
    };
    /**
     * 取加载信息
     * 
     * @protected
     * @method module:util/ajax/loader/loader._$$LoaderAbstract#__getLoadData
     * @param  {String} arg0 - 标识
     * @return {Object}        加载信息
     */
    _pro.__getLoadData = function(_key){
        return this.constructor.__cache[_key];
    };
    /**
     * 设置加载信息
     * 
     * @protected
     * @method module:util/ajax/loader/loader._$$LoaderAbstract#__setLoadData
     * @param  {String} arg0 - 标识
     * @param  {Object} arg1 - 加载信息
     * @return {Void}
     */
    _pro.__setLoadData = function(_key,_data){
        this.constructor.__cache[_key] = _data;
    };
    /**
     * 取资源载入控件，子类实现具体逻辑
     * 
     * @abstract
     * @method module:util/ajax/loader/loader._$$LoaderAbstract#__getRequest
     * @return {Script|Link} 控件
     */
    _pro.__getRequest = _f;
    /**
     * 清理控件
     * 
     * @protected
     * @method module:util/ajax/loader/loader._$$LoaderAbstract#__doClearRequest
     * @param  {Script|Link} arg0 - 控件
     * @return {Void}
     */
    _pro.__doClearRequest = function(_request){
        _v._$clearEvent(_request);
    };
    /**
     * 资源载入
     * 
     * @protected
     * @method module:util/ajax/loader/loader._$$LoaderAbstract#__doRequest
     * @param  {Script|Link} arg0 - 控件
     * @return {Void}
     */
    _pro.__doRequest = function(_request){
        _request.src = this.__url;
        document.head.appendChild(_request);
    };
    /**
     * 执行清理任务
     * 
     * @protected
     * @method module:util/ajax/loader/loader._$$LoaderAbstract#__doClear
     * @return {Void}
     */
    _pro.__doClear = function(){
        var _cache = this.__getLoadData(this.__url);
        if (!_cache) return;
        window.clearTimeout(_cache.timer);
        this.__doClearRequest(_cache.request);
        delete _cache.bind;
        delete _cache.timer;
        delete _cache.request;
        this.__delLoadData(this.__url);
        this.__getLoadData('loaded')[this.__url] = !0;
    };
    /**
     * 执行回调
     * 
     * @protected
     * @method module:util/ajax/loader/loader._$$LoaderAbstract#__doCallback
     * @param  {String} arg0 - 回调名称
     * @return {Void}
     */
    _pro.__doCallback = function(_name){
        var _cache = this.__getLoadData(this.__url);
        if (!_cache) return;
        var _list = _cache.bind;
        this.__doClear();
        if (!!_list&&_list.length>0){
            var _instance;
            while(_list.length){
                _instance = _list.shift();
                try{
                    _instance._$dispatchEvent(_name,arguments[1]);
                }catch(ex){
                    // ignore
                    if (DEBUG) throw ex;
                    console.error(ex.message);
                    console.error(ex.stack);
                }
                _instance._$recycle();
            }
        }
    };
    /**
     * 资源载入异常事件
     * 
     * @protected
     * @method module:util/ajax/loader/loader._$$LoaderAbstract#__onError
     * @param  {Object} arg0 - 错误信息
     * @return {Void}
     */
    _pro.__onError = function(_error){
        this.__doCallback('onerror',_error);
    };
    /**
     * 资源载入成功事件
     * 
     * @protected
     * @method module:util/ajax/loader/loader._$$LoaderAbstract#__onLoaded
     * @return {Void}
     */
    _pro.__onLoaded = function(){
        this.__doCallback('onload');
    };
    /**
     * 载入队列资源
     * 
     * @protected
     * @method module:util/ajax/loader/loader._$$LoaderAbstract#__doLoadQueue
     * @param  {String} arg0 - 资源地址
     * @return {Void}
     */
    _pro.__doLoadQueue = function(_url){
        this.constructor._$allocate(this.__qopt)._$load(_url);
    };
    /**
     * 检查队列状况
     * 
     * @protected
     * @method module:util/ajax/loader/loader._$$LoaderAbstract#__onQueueCheck
     * @return {Void}
     */
    _pro.__onQueueCheck = function(_error){
        var _cache = this.__getLoadData(this.__key);
        if (!_cache) return;
        if (!!_error) 
            _cache.error++;
        _cache.loaded ++;
        if (_cache.loaded<_cache.total) return;
        this.__delLoadData(this.__key);
        this._$dispatchEvent(_cache.error>0?'onerror':'onload');
    };
    /**
     * 队列载入资源异常事件
     * 
     * @protected
     * @method module:util/ajax/loader/loader._$$LoaderAbstract#__onQueueError
     * @param  {Object} arg0 - 错误信息
     * @return {Void}
     */
    _pro.__onQueueError = function(_error){
        this.__onQueueCheck(!0);
    };
    /**
     * 队列载入资源成功事件
     * 
     * @protected
     * @method module:util/ajax/loader/loader._$$LoaderAbstract#__onQueueLoaded
     * @return {Void}
     */
    _pro.__onQueueLoaded = function(){
        this.__onQueueCheck();
    };
    /**
     * 载入资源
     * 
     * 脚本举例
     * ```javascript
     * NEJ.define([
     *     'util/ajax/loader/html',
     *     'util/ajax/loader/style',
     *     'util/ajax/loader/script'
     * ],function(_t0,_t1,_t2){
     *     // 载入指定html,10秒超时
     *     var _loader = _t0._$$LoaderHtml._$allocate({
     *         timeout:10000,
     *         onload:function(){
     *             // 载入资源成功的回调
     *         }
     *     });
     *     // 绝对路径或者当前页面的相对路径
     *     _loader._$load('../../../html/util/formTest.html');
     * 
     *     // 载入指定script,20秒超时
     *     var _loader = _t2._$$LoaderScript._$allocate({
     *         timeout:20000,
     *         onload:function(){
     *             // 载入资源成功的回调
     *         }
     *     });
     *     // 绝对路径或者当前页面的相对路径
     *     _loader._$load('../../../javascript/log.js');
     * 
     *     // 载入指定style,30秒超时
     *     var _loader = _t1._$$LoaderStyle._$allocate({
     *         timeout:30000,
     *         onload:function(){
     *             // 载入资源成功的回调
     *         }
     *     });
     *     // 绝对路径或者当前页面的相对路径
     *     _loader._$load('../../../base/qunit.css');
     * });
     * ```
     * 
     * @method module:util/ajax/loader/loader._$$LoaderAbstract#_$load
     * @param  {String} arg0 - 资源地址
     * @return {Void}
     */
    _pro._$load = function(_url){
        _url = _u._$absolute(_url);
        if (!_url){
            this._$dispatchEvent('onerror',{
                code:_g._$CODE_NOTASGN,
                message:'请指定要载入的资源地址！'
            });
            return;
        };
        this.__url = _url;
        if (!!this.__version){
            this.__url += (this.__url.indexOf('?')<0?'?':'&')+this.__version;
        }
        if (this.__getLoadData('loaded')[this.__url]){
            try{
                this._$dispatchEvent('onload');
            }catch(ex){
                // ignore
                if (DEBUG) throw ex;
                console.error(ex.message);
                console.error(ex.stack);
            }
            this._$recycle();
            return;
        }
        var _cache = this.__getLoadData(this.__url),_request;
        if (!!_cache){
            _cache.bind.unshift(this);
            _cache.timer = window.clearTimeout(_cache.timer);
        }else{
            _request = this.__getRequest();
            _cache = {request:_request,bind:[this]};
            this.__setLoadData(this.__url,_cache);
            _v._$addEvent(
                _request,'load',
                this.__onLoaded._$bind(this)
            );
            _v._$addEvent(
                _request,'error',
                this.__onError._$bind(this,{
                    code:_g._$CODE_ERRSERV,
                    message:'无法加载指定资源文件['+this.__url+']！'
                })
            );
        }
        if (this.__timeout!=0){
            _cache.timer = window.setTimeout(
                this.__onError._$bind(this,{
                    code:_g._$CODE_TIMEOUT,
                    message:'指定资源文件['+this.__url+']载入超时！'
                }),
                this.__timeout||_timeout
            );
        }
        if (!!_request){
            this.__doRequest(_request);
        }
        this._$dispatchEvent('onloading');
    };
    /**
     * 队列载入资源
     * 
     * 脚本举例
     * ```javascript
     * NEJ.define([
     *     'util/ajax/loader/html.js'
     * ],function(_t){
     *     var _loader = _t._$$LoaderHtml._$allocate({
     *         onload:function(){
     *             // 载入队列资源成功的回调
     *         }
     *     });
     *     // 路径列表，可以是绝对路径也可以是当前页面的相对路径
     *     var _list = [
     *         '../../../html/util/formTest.html',
     *         '../../../html/util/cacheTest.html'
     *     ];
     *     _loader._$queue(_list);
     * });
     * ```
     * 
     * @method module:util/ajax/loader/loader._$$LoaderAbstract#_$queue
     * @param  {Array} arg0 - 资源地址队列
     * @return {Void}
     */
    _pro._$queue = function(_list){
        if (!_list||!_list.length){
            this._$dispatchEvent('onerror',{
                code:_g._$CODE_NOTASGN,
                message:'请指定要载入的资源队列！'
            });
            return;
        } 
        this.__key = _u._$uniqueID();
        var _cache = {error:0,loaded:0,total:_list.length};
        this.__setLoadData(this.__key,_cache);
        _u._$forEach(
            _list,function(v,i){
                if (!v){
                    _cache.total--;
                    return;
                }
                this.__doLoadQueue(v);
            },this
        );
        this._$dispatchEvent('onloading');
    };
    
    return _p;
},'083c017e2a5450e295d417651bc93279','7d45f691904093dd3d0d2a39eb337c1c','d0109f80b9992d1fd93e85a35ede12b1','0dd9ac3de45a7a1ce7c2f3ff80d53fcc','3695926c26a1894dcce266fdc52d2e3a','5dc30961f3452903950eb8a25e3d2109');
I$('b8e614627cfce9e8736aba76cc3d5265',function (NEJ,_u,_p,_o,_f,_r){
    /**
     * 设置或者获取cookie
     *
     * * 没有输入第二个参数则表示返回已有cookie
     * * 如果cookie值为空字符串则表示删除cookie
     *
     * 脚本举例
     * ```javascript
     *   NEJ.define([
     *       'util/cookie'
     *   ],function(_j){
     *       // 设置cookie的name=abc
     *       var _cookie = _j._$cookie('name','abc');
     *       _j._$cookie('name',{value:'abc'});
     *
     *       // 设置路径，domain(如果domain不同域，cookie设置不会成功),设置过期时间1天;
     *       var _cookie = _j._$cookie('name',{
     *           value:'abc',
     *           path:'/a/',
     *           domain:'www.163.com',
     *           expires:1
     *       });
     *
     *       // 删除cookie
     *       _j._$cookie('name','');
     *       _j._$cookie('name',{expires:-1});
     *   });
     * ```
     *
     * @method   module:util/cache/cookie._$cookie
     * @param    {String}        arg0    - cookie名称
     * @param    {String|Object} arg1    - cookie值，如果有其他配置信息输入对象，已处理属性包括
     * @property {String}        value   - cookie值
     * @property {String}        path    - 路径
     * @property {String}        domain  - 域名，当前域或者当前域的父域
     * @property {Number}        expires - 过期时间偏移，单位天，负值表示删除cookie
     * @return   {String}                  cookie值
     */
    _p._$cookie = (function(){
        var _date = new Date(),
            _crut = +_date,   // current time milliseconds
            _days = 86400000; // milliseconds of one day
        var _getcookie = function(_name){
            var _cookie = document.cookie,
                _search = '\\b'+_name+'=',
                _index1 = _cookie.search(_search);
            if (_index1<0) return '';
            _index1 += _search.length-2;
            var _index2 = _cookie.indexOf(';',_index1);
            if (_index2<0) _index2 = _cookie.length;
            return _cookie.substring(_index1,_index2)||'';
        };
        return function(_name,_data){
            if (_data===undefined){
                return _getcookie(_name);
            }
            if (_u._$isString(_data)){
                if (!!_data){
                    document.cookie = _name+'='+_data+';';
                    return _data;
                }
                _data = {expires:-100};
            }
            _data = _data||_o;
            var _cookie = _name+'='+(_data.value||'')+';';
            delete _data.value;
            if (_data.expires!==undefined){
                _date.setTime(_crut+_data.expires*_days);
                _data.expires = _date.toGMTString();
            }
            _cookie += _u._$object2string(_data,';');
            //console.log(_cookie);
            document.cookie = _cookie;
        };
    })();

    if (CMPT){
        NEJ.copy(NEJ.P('nej.j'),_p);
    }

    return _p;
},'083c017e2a5450e295d417651bc93279','3695926c26a1894dcce266fdc52d2e3a');
/*! JSON v3.2.5 | http://bestiejs.github.io/json3 | Copyright 2012-2013, Kit Cambridge | http://kit.mit-license.org */
;(function(){var o=!0,w=null;
(function(B){function v(a){if("bug-string-char-index"==a)return"a"!="a"[0];var f,c="json"==a;if(c||"json-stringify"==a||"json-parse"==a){if("json-stringify"==a||c){var d=k.stringify,b="function"==typeof d&&l;if(b){(f=function(){return 1}).toJSON=f;try{b="0"===d(0)&&"0"===d(new Number)&&'""'==d(new String)&&d(m)===r&&d(r)===r&&d()===r&&"1"===d(f)&&"[1]"==d([f])&&"[null]"==d([r])&&"null"==d(w)&&"[null,null,null]"==d([r,m,w])&&'{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}'==d({a:[f,o,!1,w,"\x00\u0008\n\u000c\r\t"]})&&
"1"===d(w,f)&&"[\n 1,\n 2\n]"==d([1,2],w,1)&&'"-271821-04-20T00:00:00.000Z"'==d(new Date(-864E13))&&'"+275760-09-13T00:00:00.000Z"'==d(new Date(864E13))&&'"-000001-01-01T00:00:00.000Z"'==d(new Date(-621987552E5))&&'"1969-12-31T23:59:59.999Z"'==d(new Date(-1))}catch(n){b=!1}}if(!c)return b}if("json-parse"==a||c){a=k.parse;if("function"==typeof a)try{if(0===a("0")&&!a(!1)){f=a('{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}');var e=5==f.a.length&&1===f.a[0];if(e){try{e=!a('"\t"')}catch(g){}if(e)try{e=
1!==a("01")}catch(i){}}}}catch(O){e=!1}if(!c)return e}return b&&e}}var m={}.toString,p,C,r,D=typeof define==="function"&&define.amd,k="object"==typeof exports&&exports;k||D?"object"==typeof JSON&&JSON?k?(k.stringify=JSON.stringify,k.parse=JSON.parse):k=JSON:D&&(k=B.JSON={}):k=B.JSON||(B.JSON={});var l=new Date(-3509827334573292);try{l=-109252==l.getUTCFullYear()&&0===l.getUTCMonth()&&1===l.getUTCDate()&&10==l.getUTCHours()&&37==l.getUTCMinutes()&&6==l.getUTCSeconds()&&708==l.getUTCMilliseconds()}catch(P){}if(!v("json")){var s=
v("bug-string-char-index");if(!l)var t=Math.floor,J=[0,31,59,90,120,151,181,212,243,273,304,334],z=function(a,f){return J[f]+365*(a-1970)+t((a-1969+(f=+(f>1)))/4)-t((a-1901+f)/100)+t((a-1601+f)/400)};if(!(p={}.hasOwnProperty))p=function(a){var f={},c;if((f.__proto__=w,f.__proto__={toString:1},f).toString!=m)p=function(a){var f=this.__proto__,a=a in(this.__proto__=w,this);this.__proto__=f;return a};else{c=f.constructor;p=function(a){var f=(this.constructor||c).prototype;return a in this&&!(a in f&&
this[a]===f[a])}}f=w;return p.call(this,a)};var K={"boolean":1,number:1,string:1,undefined:1};C=function(a,f){var c=0,b,h,n;(b=function(){this.valueOf=0}).prototype.valueOf=0;h=new b;for(n in h)p.call(h,n)&&c++;b=h=w;if(c)c=c==2?function(a,f){var c={},b=m.call(a)=="[object Function]",d;for(d in a)!(b&&d=="prototype")&&!p.call(c,d)&&(c[d]=1)&&p.call(a,d)&&f(d)}:function(a,f){var c=m.call(a)=="[object Function]",b,d;for(b in a)!(c&&b=="prototype")&&p.call(a,b)&&!(d=b==="constructor")&&f(b);(d||p.call(a,
b="constructor"))&&f(b)};else{h=["valueOf","toString","toLocaleString","propertyIsEnumerable","isPrototypeOf","hasOwnProperty","constructor"];c=function(a,f){var c=m.call(a)=="[object Function]",b,d;if(d=!c)if(d=typeof a.constructor!="function"){d=typeof a.hasOwnProperty;d=d=="object"?!!a.hasOwnProperty:!K[d]}d=d?a.hasOwnProperty:p;for(b in a)!(c&&b=="prototype")&&d.call(a,b)&&f(b);for(c=h.length;b=h[--c];d.call(a,b)&&f(b));}}c(a,f)};if(!v("json-stringify")){var L={92:"\\\\",34:'\\"',8:"\\b",12:"\\f",
10:"\\n",13:"\\r",9:"\\t"},u=function(a,f){return("000000"+(f||0)).slice(-a)},G=function(a){var f='"',b=0,d=a.length,h=d>10&&s,n;for(h&&(n=a.split(""));b<d;b++){var e=a.charCodeAt(b);switch(e){case 8:case 9:case 10:case 12:case 13:case 34:case 92:f=f+L[e];break;default:if(e<32){f=f+("\\u00"+u(2,e.toString(16)));break}f=f+(h?n[b]:s?a.charAt(b):a[b])}}return f+'"'},E=function(a,b,c,d,h,n,e){var g=b[a],i,j,k,l,q,s,v,x,y;try{g=b[a]}catch(A){}if(typeof g=="object"&&g){i=m.call(g);if(i=="[object Date]"&&
!p.call(g,"toJSON"))if(g>-1/0&&g<1/0){if(z){k=t(g/864E5);for(i=t(k/365.2425)+1970-1;z(i+1,0)<=k;i++);for(j=t((k-z(i,0))/30.42);z(i,j+1)<=k;j++);k=1+k-z(i,j);l=(g%864E5+864E5)%864E5;q=t(l/36E5)%24;s=t(l/6E4)%60;v=t(l/1E3)%60;l=l%1E3}else{i=g.getUTCFullYear();j=g.getUTCMonth();k=g.getUTCDate();q=g.getUTCHours();s=g.getUTCMinutes();v=g.getUTCSeconds();l=g.getUTCMilliseconds()}g=(i<=0||i>=1E4?(i<0?"-":"+")+u(6,i<0?-i:i):u(4,i))+"-"+u(2,j+1)+"-"+u(2,k)+"T"+u(2,q)+":"+u(2,s)+":"+u(2,v)+"."+u(3,l)+"Z"}else g=
w;else if(typeof g.toJSON=="function"&&(i!="[object Number]"&&i!="[object String]"&&i!="[object Array]"||p.call(g,"toJSON")))g=g.toJSON(a)}c&&(g=c.call(b,a,g));if(g===w)return"null";i=m.call(g);if(i=="[object Boolean]")return""+g;if(i=="[object Number]")return g>-1/0&&g<1/0?""+g:"null";if(i=="[object String]")return G(""+g);if(typeof g=="object"){for(a=e.length;a--;)if(e[a]===g)throw TypeError();e.push(g);x=[];b=n;n=n+h;if(i=="[object Array]"){j=0;for(a=g.length;j<a;y||(y=o),j++){i=E(j,g,c,d,h,n,
e);x.push(i===r?"null":i)}a=y?h?"[\n"+n+x.join(",\n"+n)+"\n"+b+"]":"["+x.join(",")+"]":"[]"}else{C(d||g,function(a){var b=E(a,g,c,d,h,n,e);b!==r&&x.push(G(a)+":"+(h?" ":"")+b);y||(y=o)});a=y?h?"{\n"+n+x.join(",\n"+n)+"\n"+b+"}":"{"+x.join(",")+"}":"{}"}e.pop();return a}};k.stringify=function(a,b,c){var d,h,j;if(typeof b=="function"||typeof b=="object"&&b)if(m.call(b)=="[object Function]")h=b;else if(m.call(b)=="[object Array]"){j={};for(var e=0,g=b.length,i;e<g;i=b[e++],(m.call(i)=="[object String]"||
m.call(i)=="[object Number]")&&(j[i]=1));}if(c)if(m.call(c)=="[object Number]"){if((c=c-c%1)>0){d="";for(c>10&&(c=10);d.length<c;d=d+" ");}}else m.call(c)=="[object String]"&&(d=c.length<=10?c:c.slice(0,10));return E("",(i={},i[""]=a,i),h,j,d,"",[])}}if(!v("json-parse")){var M=String.fromCharCode,N={92:"\\",34:'"',47:"/",98:"\u0008",116:"\t",110:"\n",102:"\u000c",114:"\r"},b,A,j=function(){b=A=w;throw SyntaxError();},q=function(){for(var a=A,f=a.length,c,d,h,k,e;b<f;){e=a.charCodeAt(b);switch(e){case 9:case 10:case 13:case 32:b++;
break;case 123:case 125:case 91:case 93:case 58:case 44:c=s?a.charAt(b):a[b];b++;return c;case 34:c="@";for(b++;b<f;){e=a.charCodeAt(b);if(e<32)j();else if(e==92){e=a.charCodeAt(++b);switch(e){case 92:case 34:case 47:case 98:case 116:case 110:case 102:case 114:c=c+N[e];b++;break;case 117:d=++b;for(h=b+4;b<h;b++){e=a.charCodeAt(b);e>=48&&e<=57||e>=97&&e<=102||e>=65&&e<=70||j()}c=c+M("0x"+a.slice(d,b));break;default:j()}}else{if(e==34)break;e=a.charCodeAt(b);for(d=b;e>=32&&e!=92&&e!=34;)e=a.charCodeAt(++b);
c=c+a.slice(d,b)}}if(a.charCodeAt(b)==34){b++;return c}j();default:d=b;if(e==45){k=o;e=a.charCodeAt(++b)}if(e>=48&&e<=57){for(e==48&&(e=a.charCodeAt(b+1),e>=48&&e<=57)&&j();b<f&&(e=a.charCodeAt(b),e>=48&&e<=57);b++);if(a.charCodeAt(b)==46){for(h=++b;h<f&&(e=a.charCodeAt(h),e>=48&&e<=57);h++);h==b&&j();b=h}e=a.charCodeAt(b);if(e==101||e==69){e=a.charCodeAt(++b);(e==43||e==45)&&b++;for(h=b;h<f&&(e=a.charCodeAt(h),e>=48&&e<=57);h++);h==b&&j();b=h}return+a.slice(d,b)}k&&j();if(a.slice(b,b+4)=="true"){b=
b+4;return o}if(a.slice(b,b+5)=="false"){b=b+5;return false}if(a.slice(b,b+4)=="null"){b=b+4;return w}j()}}return"$"},F=function(a){var b,c;a=="$"&&j();if(typeof a=="string"){if((s?a.charAt(0):a[0])=="@")return a.slice(1);if(a=="["){for(b=[];;c||(c=o)){a=q();if(a=="]")break;if(c)if(a==","){a=q();a=="]"&&j()}else j();a==","&&j();b.push(F(a))}return b}if(a=="{"){for(b={};;c||(c=o)){a=q();if(a=="}")break;if(c)if(a==","){a=q();a=="}"&&j()}else j();(a==","||typeof a!="string"||(s?a.charAt(0):a[0])!="@"||
q()!=":")&&j();b[a.slice(1)]=F(q())}return b}j()}return a},I=function(a,b,c){c=H(a,b,c);c===r?delete a[b]:a[b]=c},H=function(a,b,c){var d=a[b],h;if(typeof d=="object"&&d)if(m.call(d)=="[object Array]")for(h=d.length;h--;)I(d,h,c);else C(d,function(a){I(d,a,c)});return c.call(a,b,d)};k.parse=function(a,f){var c,d;b=0;A=""+a;c=F(q());q()!="$"&&j();b=A=w;return f&&m.call(f)=="[object Function]"?H((d={},d[""]=c,d),"",f):c}}}D&&define(function(){return k})})(this);return JSON;
}());
I$('c63ad9550ef9f853e27b6f2ce3111f95',function(_m,_p,_o,_f,_r){
if (_m._$KERNEL.engine==='trident'&&_m._$KERNEL.release=='2.0'){I$('cf5146232a66a7cf0072b5d39c829944',function (){
	    // eval for big string
	    JSON.parse = (function(){
	        // check save json string
	        // http://www.ietf.org/rfc/rfc4627.txt
	        var _isSafeJSON = function(_content){
	            return !(/[^,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]/.test(
	                        _content.replace(/"(\\.|[^"\\])*"/g,'')
	                    ));
	        };
	        return JSON.parse._$aop(function(_event){
	            var _str = _event.args[0]||'';
	            if (_str.length>=500000){  // &&_isSafeJSON(_str)
	                _event.stopped = !0;
	                _event.value = eval('('+_str+')');
	            }
	        });
	    })();
	});}return JSON;},'d552af5339ac27c31f311f3fdadefdc3');
I$('1a23f59605f35c80a512f9a5a30bffc2',function (){return JSON;},'c63ad9550ef9f853e27b6f2ce3111f95');
I$('9223dd4ce3e58580d50ea005ce24edcc',function (_k,_u,_e,_c,_g,_t,_j,JSON,_p,_o,_f,_r){
    var _pro;
    /**
     * Ajax代理对象
     * 
     * @class   module:util/ajax/proxy/proxy._$$ProxyAbstract
     * @extends module:util/event._$$EventTarget
     * 
     * @param    {Object}  config  - 构造配置参数
     * @property {String}  url     - 请求地址
     * @property {Boolean} sync    - 是否同步请求
     * @property {String}  type    - 返回数据格式,text/json/xml
     * @property {String}  method  - 请求方式,GET/POST
     * @property {Number}  timeout - 超时时间,0表示禁止超时监测
     * @property {Object}  headers - 头信息
     */
    /** 
     * 载入回调
     * 
     * @event module:util/ajax/proxy/proxy._$$ProxyAbstract#onload
     * @param {Object} event - 服务器返回数据信息
     */
    /** 
     * 异常回调
     * 
     * @event    module:util/ajax/proxy/proxy._$$ProxyAbstract#onerror
     * @param    {Object}   event   - 错误信息
     * @property {Number}   code    - 错误代码
     * @property {String}   message - 错误描述
     * @property {Variable} data    - 出错时携带数据
     */
    /** 
     * [hr]
     * 请求之前对数据处理回调
     * @event    module:util/ajax/proxy/proxy._$$ProxyAbstract#onbeforerequest
     * @param    {Object} event   - 请求信息
     * @property {Object} request - 请求参数，数据信息 url/sync/cookie/type/method/timeout
     * @property {Object} headers - 请求头信息
     */
    _p._$$ProxyAbstract = _k._$klass();
    _pro = _p._$$ProxyAbstract._$extend(_t._$$EventTarget);
    /**
     * 控件重置
     * 
     * @protected
     * @method module:util/ajax/proxy/proxy._$$ProxyAbstract#__reset
     * @param  {Object} arg0 - 配置参数
     * @return {Void}
     */
    _pro.__reset = function(_options){
        this.__super(_options);
        // reset request information
        this.__request = _u._$fetch({
            url:'',
            sync:!1,
            cookie:!1,
            type:'text',
            method:'GET',
            timeout:60000
        },_options);
        // for csrf attack
        var _csrf = _c._$get('csrf');
        if (!!_csrf.cookie&&!!_csrf.param){
            var _query = encodeURIComponent(_csrf.param)+'='+
                         encodeURIComponent(_j._$cookie(_csrf.cookie)||''),
                _split = this.__request.url.indexOf('?')<0?'?':'&';
            this.__request.url += _split+_query;
        }
        // reset headers
        this.__headers = _options.headers||{};
        var _content = this.__headers[_g._$HEAD_CT];
        if (_content==null){
            this.__headers[_g._$HEAD_CT] = _g._$HEAD_CT_FORM;
        }
    };
    /**
     * 回收控件
     * 
     * @protected
     * @method module:util/ajax/proxy/proxy._$$ProxyAbstract#__destroy
     * @return {Void}
     */
    _pro.__destroy = function(){
        this.__super();
        delete this.__rkey;
        delete this.__request;
        delete this.__headers;
    };
    /**
     * 请求载入回调
     * 
     * @protected
     * @method   module:util/ajax/proxy/proxy._$$ProxyAbstract#__onLoadRequest
     * @param    {Object} arg0   - 数据信息
     * @property {Number} status - 请求状态
     * @property {String} result - 请求结果，纯文本形式
     * @return   {Void}
     */
    _pro.__onLoadRequest = function(_event){
        var _status = _event.status;
        // timeout error
        if (_status==-1){
            this._$dispatchEvent('onerror',{
                code:_g._$CODE_TIMEOUT,
                message:'请求['+this.__request.url+']超时！'
            });
            return;
        }
        // check status
        if ((''+_status).indexOf('2')!=0){
            this._$dispatchEvent('onerror',{
                data:_status,
                result:_event.result,
                code:_g._$CODE_ERRSERV,
                message:'服务器返回异常状态['+_status+']!'
            });
            return;
        }
        // onload
        this._$dispatchEvent(
             'onload',_e._$text2type(
                 _event.result,
                 this.__request.type
             )
        );
    };
    /**
     * 往服务器发送请求，子类实现具体业务逻辑
     * 
     * @abstract
     * @method module:util/ajax/proxy/proxy._$$ProxyAbstract#__doSendRequest
     * @param  {Object} arg0 - 请求信息
     * @return {Void}
     */
    _pro.__doSendRequest = _f;
    /**
     * 取头信息，子类实现具体业务逻辑
     * 
     * @abstract
     * @method module:util/ajax/proxy/proxy._$$ProxyAbstract#__getResponseHeader
     * @param  {String} arg0 - 要取的头信息名称
     * @return {String}        头信息结果或集合
     */
    _pro.__getResponseHeader = _f;
    /**
     * 请求终止事件
     * @private
     */
    _pro.__onAbort = function(){
        this._$dispatchEvent('onerror',{
            code:_g._$CODE_ERRABRT,
            message:'客户端终止请求'
        });
    };
    /**
     * 发送请求
     * 
     * @method module:util/ajax/proxy/proxy._$$ProxyAbstract#_$send
     * @param  {Variable} arg0 - 要发送的数据
     * @return {Void}
     */
    _pro._$send = function(_data){
        var _url = this.__request.url;
        if (!_url){
            this._$dispatchEvent('onerror',{
                code:_g._$CODE_NOTASGN,
                message:'没有输入请求地址！'
            });
            return;
        }
        try{
            this.__request.data = _data==null?null:_data;
            var _event = {
                request:this.__request,
                headers:this.__headers
            };
            // adjust param before request
            try{
                this._$dispatchEvent('onbeforerequest',_event);
            }catch(ex){
                // ignore exception
                console.error(ex.message);
                console.error(ex.stack);
            }
            this.__doSendRequest(_event);
        }catch(e){
            this._$dispatchEvent('onerror',{
                code:_g._$CODE_ERRSERV,
                message:'请求['+_url+']失败:'+e.message+'！'
            });
        }
    };
    /**
     * 中断请求，子类实现具体业务逻辑
     *
     * @abstract
     * @method module:util/ajax/proxy/proxy._$$ProxyAbstract#_$abort
     * @return {Void}
     */
    _pro._$abort = _f;
    /**
     * 取头信息
     * 
     * @method module:util/ajax/proxy/proxy._$$ProxyAbstract#_$header
     * @param  {String|Array}  arg0 - 要取的头信息名称
     * @return {String|Object}        头信息结果或集合
     */
    _pro._$header = function(_key){
        if (!_u._$isArray(_key)){
            return this.__getResponseHeader(_key)||'';
        }
        var _result = {};
        _u._$forEach(
            _key,function(_value){
                _result[_value] = this._$header(_value);
            },this
        );
        return _result;
    };
    
    return _p;
},'7d45f691904093dd3d0d2a39eb337c1c','3695926c26a1894dcce266fdc52d2e3a','43a92a1cb30f0322e2bca627e0f6b635','1c763bdf30dcc32bedb3bfa2afd89a26','d0109f80b9992d1fd93e85a35ede12b1','5dc30961f3452903950eb8a25e3d2109','b8e614627cfce9e8736aba76cc3d5265','1a23f59605f35c80a512f9a5a30bffc2');
I$('9814edbbef317f24d8d7b5d15f9574de',function (_p,_o,_f,_r){
    /**
     * 取XHR对象
     * @return {XMLHttpRequest} XHR对象
     */
    _p.__getXMLHttpRequest = function(){
        return new XMLHttpRequest();
    };
    /**
     * 判断是否有Abort事件
     * @return {Boolean}
     */
    _p.__hasAbortEvent = function(){
        return !0;
    };
    return _p;
});
I$('27ed534e8b206ef7d0a9f4b4f9dd40b3',function(b1524476400468,_h,_u,_p,_o,_f,_r){if (b1524476400468._$KERNEL.engine==='trident'&&b1524476400468._$KERNEL.release<='5.0'){I$('65c92af7ddbee0609faf862274aa3000',function (){
        /**
         * 判断是否有Abort事件
         * @return {Boolean}
         */
        _h.__hasAbortEvent = function(){
            return !1;
        };
    });}
if (b1524476400468._$KERNEL.engine==='trident'&&b1524476400468._$KERNEL.release<='2.0'){I$('baca7822aa3194f1e3801967797e9e47',function (){
        /**
         * 取XHR对象
         * @return {XMLHttpRequest} XHR对象
         */
        _h.__getXMLHttpRequest = (function(){
            // http://blogs.msdn.com/b/xmlteam/archive/2006/10/23/using-the-right-version-of-msxml-in-internet-explorer.aspx
            var _msxml = [
                'Msxml2.XMLHTTP.6.0',
                'Msxml2.XMLHTTP.3.0',
                'Msxml2.XMLHTTP.4.0',
                'Msxml2.XMLHTTP.5.0',
                'MSXML2.XMLHTTP',
                'Microsoft.XMLHTTP'
            ];
            return function(){
                var _xhr = null;
                _u._$forIn(
                    _msxml,function(_name){
                        try{
                            _xhr = new ActiveXObject(_name);
                            return !0;
                        }catch(e){
                            // ignore exception
                        }
                    }
                );
                return _xhr;
            };
        })();
    });}return _h;},'d552af5339ac27c31f311f3fdadefdc3','9814edbbef317f24d8d7b5d15f9574de','3695926c26a1894dcce266fdc52d2e3a');
I$('2632334c6621ed21d526ac5ffb02a81e',function (_t,_u,_k,_g,_h,_p,_o,_f,_r){
    var _pro;
    /**
     * Ajax代理对象
     * 
     * @class   module:util/ajax/proxy/xhr._$$ProxyXHR
     * @extends module:util/ajax/proxy/proxy._$$ProxyAbstract
     * 
     * @param   {Object} config - 构造配置参数
     */
    _p._$$ProxyXHR = _k._$klass();
    _pro = _p._$$ProxyXHR._$extend(_t._$$ProxyAbstract);
    /**
     * 控件销毁
     * 
     * @protected
     * @method module:util/ajax/proxy/xhr._$$ProxyXHR#__destroy
     * @return {Void}
     */
    _pro.__destroy = function(){
        this.__super();
        // clear timeout
        window.clearTimeout(this.__timer);
        delete this.__timer;
        // clear request
        try{
            this.__xhr.onreadystatechange = _f;
            this.__xhr.abort();
        }catch(e){
            // ignore
        }
        delete this.__xhr;
    };
    /**
     * 往服务器发送请求
     * 
     * @protected
     * @method module:util/ajax/proxy/xhr._$$ProxyXHR#__doSendRequest
     * @param  {Object} arg0 - 请求信息
     * @return {Void}
     */
    _pro.__doSendRequest = (function(){
        // set header
        var _doSetHeader = function(_value,_key){
            this.__xhr.setRequestHeader(_key,_value);
        };
        // split input.file for multiple files
        var _doSplitMultFiles = function(_form){
            var _result = [];
            _u._$reverseEach(
                _form.getElementsByTagName('input'),
                function(_input){
                    if (_input.type!='file'){
                        return;
                    }
                    // remove file without name
                    if (!_input.name){
                        _input.parentNode.removeChild(_input);
                        return;
                    }
                    // for multiple file per-input
                    if (_input.files.length>1){
                        _u._$forEach(_input.files,function(_file){
                            _result.push({name:_input.name,file:_file});
                        });
                        _input.parentNode.removeChild(_input);
                    }
                }
            );
            return _result.length>0?_result:null;
        };
        return function(_options){
            var _request = _options.request,
                _headers = _options.headers;
            this.__xhr = _h.__getXMLHttpRequest();
            // add event listener
            // upload progress
            if (_headers[_g._$HEAD_CT]===_g._$HEAD_CT_FILE){
                delete _headers[_g._$HEAD_CT];
                this.__xhr.upload.onprogress = 
                    this.__onStateChange._$bind(this,1);
                if (_request.data.tagName==='FORM'){
                    var _files = _doSplitMultFiles(_request.data);
                    _request.data = new FormData(_request.data);
                    _u._$forEach(_files,function(_ret){
                        var _file = _ret.file;
                        _request.data.append(
                            _ret.name||_file.name||
                            ('file-'+_u._$uniqueID()),_file
                        );
                    });
                }
            }
            // state change
            this.__xhr.onreadystatechange = 
                this.__onStateChange._$bind(this,2);
            this.__xhr.onabort =
                this.__onAbort._$bind(this);
            // timeout
            if (_request.timeout!==0){
                this.__timer = window.setTimeout(
                    this.__onStateChange._$bind(this,3),
                    _request.timeout
                );
            }
            // prepare and send request
            this.__xhr.open(
                _request.method,
                _request.url,
               !_request.sync
            );
            _u._$loop(_headers,_doSetHeader,this);
            // support credential
            if (!!this.__request.cookie&&
               ('withCredentials' in this.__xhr)){
                this.__xhr.withCredentials = !0;
            }
            // format data for sending Object
            if(_headers[_g._$HEAD_CT]===_g._$HEAD_CT_FORM&&
              (!window.FormData||!(_request.data instanceof window.FormData))){
                _request.data = _u._$object2string(_request.data,'&',!0);
            }
            this.__xhr.send(_request.data);
        };
    })();
    /**
     * 请求状态变化事件
     * 
     * @protected
     * @method module:util/ajax/proxy/xhr._$$ProxyXHR#__onStateChange
     * @param  {Number} arg0 - 状态变化类型
     * @return {Void}
     */
    _pro.__onStateChange = function(_type){
        switch(_type){
            // upload progress
            case 1 :
                this._$dispatchEvent('onuploading',arguments[1]);
            break;
            // state change
            case 2 :
                if (this.__xhr.readyState==4){
                    this.__onLoadRequest({
                        status:this.__xhr.status,
                        result:this.__xhr.responseText||''
                    });
                }
            break;
            // timeout
            case 3:
                this.__onLoadRequest({status:-1});
            break;
        }
    };
    /**
     * 取头信息
     * 
     * @protected
     * @method module:util/ajax/proxy/xhr._$$ProxyXHR#__getResponseHeader
     * @param  {String} arg0 - 要取的头信息名称
     * @return {String}        头信息结果或集合
     */
    _pro.__getResponseHeader = function(_key){
        return !this.__xhr?'':this.__xhr.getResponseHeader(_key);
    };
    /**
     * 中断请求
     * 
     * @method module:util/ajax/proxy/xhr._$$ProxyXHR#_$abort
     * @return {Void}
     */
    _pro._$abort = function(){
        if (!_h.__hasAbortEvent()){
            this.__onAbort();
        }else{
            this.__xhr.onreadystatechange = _f;
            this.__xhr.abort();
        }
    };
    
    return _p;
},'9223dd4ce3e58580d50ea005ce24edcc','3695926c26a1894dcce266fdc52d2e3a','7d45f691904093dd3d0d2a39eb337c1c','d0109f80b9992d1fd93e85a35ede12b1','27ed534e8b206ef7d0a9f4b4f9dd40b3');
I$('43fbca5333c2b902e0eed542a8ee0f51',function (_m,_p,_o,_f,_r){
    var _this = this,
        _prefix = _m._$KERNEL.prefix.pro,
        _fps = _m._$is('desktop')?80:(_m._$is('ios')?50:30);
    /**
     * 请求动画
     * @param  {Function} 动画回调
     * @return {String}   动画标识
     */
    _p.__requestAnimationFrame = (function(){
        var _handler = _m._$is('android')?null:(
            _this.requestAnimationFrame||
            _this[_prefix+'RequestAnimationFrame']
        );
        return function(){
            if (!_handler){
                _handler = function(_callback){
                    return window.setTimeout(
                        function(){
                            try{_callback(+new Date);}catch(ex){}
                        },1000/_fps
                    );
                };
            }
            return _handler.apply(this,arguments);
        };
    })();
    /**
     * 取消动画
     * @param  {String} 动画标识
     * @return {Void}
     */
    _p.__cancelAnimationFrame = (function(){
        var _handler = _m._$is('android')?null:(
            _this.cancelAnimationFrame||
            _this[_prefix+'CancelAnimationFrame']
        );
        return function(){
            if (!_handler){
                _handler = function(_id){
                    window.clearTimeout(_id);
                };
            }
            return _handler.apply(this,arguments);
        };
    })();
    
    return _p;
},'d552af5339ac27c31f311f3fdadefdc3');
I$('8a239e16417b76e580785aee34b5ce48',function (_h,_m){
    return _h;
},'43fbca5333c2b902e0eed542a8ee0f51','d552af5339ac27c31f311f3fdadefdc3');
I$('71cb57f89fa4394d808a414fc2bee70d',function (_m,_h,_p,_o,_f,_r){
    /**
     * 请求动画
     * 
     * 脚本举例
     * ```javascript
     * NEJ.define([
     *     'util/timer/animation'
     * ],function(_p){
     *     // 桌面端一秒钟调用12.5次，ios端没秒调用20次，否则调用33次
     *     var _id  = _p.requestAnimationFrame(
     *         function(_time){
     *             console.log(_time);
     *         }
     *     );
     * });
     * ```
     * 
     * @method module:util/timer/animation.requestAnimationFrame
     * @param  {Function} arg0 - 动画回调
     * @return {String}          动画标识
     */
    _p.requestAnimationFrame = function(){
        _h.__requestAnimationFrame.apply(null,arguments);
    };
    /**
     * 取消动画
     * 
     * 脚本举例
     * ```javascript
     * NEJ.define([
     *     'util/timer/animation'
     * ],function(_p){
     *     var _id  = _p.requestAnimationFrame(
     *         function(_time){
     *             console.log(_time);
     *         }
     *     );
     *     // 停止掉时钟
     *     _p.cancelAnimationFrame(_id);
     * });
     * ```
     * 
     * @method module:util/timer/animation.cancelAnimationFrame
     * @param  {String} arg0 - 动画标识
     * @return {Void}
     */
    _p.cancelAnimationFrame = function(){
        _h.__cancelAnimationFrame.apply(null,arguments);
    };
    
    if (CMPT){
        if (!this.requestAnimationFrame){
            this.requestAnimationFrame = _p.requestAnimationFrame;
        }
        if (!this.cancelAnimationFrame){
            this.cancelAnimationFrame = _p.cancelAnimationFrame;
        }
    }
    
    return _p;
},'d552af5339ac27c31f311f3fdadefdc3','8a239e16417b76e580785aee34b5ce48');
I$('016163f09bcd3e6cabd72bfa98dc6dfc',function (_m,_p,_o,_f,_r){
    /**
     * 判断是否需要对Flash事件做代理，
     * 主要fix flash上的鼠标事件没法响应到DOM节点上的问题
     * @return {Boolean} 是否做代理
     */
    _p.__canFlashEventBubble = function(_wmode){
        return (_wmode||'').toLowerCase()!='transparent';
    };

    return _p;
},'d552af5339ac27c31f311f3fdadefdc3');
I$('7206314d9c8b7b12e8bbc0750285f49d',function(_h,_m,_p,_o,_f,_r){if (_m._$KERNEL.engine==='trident'){I$('bd70d2a2cc3fc1f9355d14fea267e27a',function (){
        /**
         * 判断是否需要对Flash事件做代理，
         * 主要fix flash上的鼠标事件没法响应到DOM节点上的问题
         * @return {Boolean} 是否做代理
         */
        _h.__canFlashEventBubble = function(_wmode){
            return !0;
        };

    });}
if (_m._$KERNEL.engine==='webkit'){I$('2dd9407485148a604d05f5596ca30803',function (){
        /**
         * 判断是否需要对Flash事件做代理，
         * 主要fix flash上的鼠标事件没法响应到DOM节点上的问题
         * @return {Boolean} 是否做代理
         */
        _h.__canFlashEventBubble = function(_wmode){
            return !0;
        };

    });}return _h;},'016163f09bcd3e6cabd72bfa98dc6dfc','d552af5339ac27c31f311f3fdadefdc3');
I$('9b2314ac1ec3cd2936ccc4d0a08d884e',"{var hide  = defined(\"hidden\")&&!!hidden}\n{var param = defined(\"params\")&&params||NEJ.O}\n{var width = !hide?width:\"1px\",height = !hide?height:\"1px\"}\n{if hide}<div style=\"position:absolute;top:0;left:0;width:1px;height:1px;z-index:10000;overflow:hidden;\">{/if}\n<object classid = \"clsid:d27cdb6e-ae6d-11cf-96b8-444553540000\"\n        codebase = \"http://fpdownload.macromedia.com/get/flashplayer/current/swflash.cab\"\n        width = \"${width|default:\"100px\"}\"\n        height = \"${height|default:\"100px\"}\" id=\"${id}\">\n    <param value=\"${src}\" name=\"movie\">\n    {for x in param}\n    <param value=\"${x}\" name=\"${x_key}\"/>\n    {/for}\n    <embed src=\"${src}\" name=\"${id}\"\n           width=\"${width|default:\"100px\"}\"\n           height=\"${height|default:\"100px\"}\"\n           pluginspage=\"http://www.adobe.com/go/getflashplayer\"\n           type=\"application/x-shockwave-flash\"\n           {for x in param}${x_key}=\"${x}\" {/for}></embed>\n</object>\n{if hide}</div>{/if}");
I$('12782c588b6c70296cf3b8dedff46777',function (NEJ,_e,_v,_u,_t0,_t1,_h,_html,_p,_o,_f,_r){
    var _seed_html = _t0._$add(_html);
    /**
     * 页面嵌入flash，NEJ嵌入Flash如果需要同JS交互的遵循以下规则
     *
     *  1. Flash对象提供JS可访问接口 inited （返回Boolean值）
     *  2. 如果Flash未初始化完成inited返回为false
     *  3. 如果Flash初始化完成inited返回为true
     *  4. inited返回true表示Flash已完成所有初始化，此时JS可调用Flash的API
     *
     * Flash事件规则
     *
     *  1. JS中使用window.onflashevent监听flash中的事件（此步骤NEJ已封装）
     *  2. Flash通过flashvars参数输入当前flash的ID，如 &lt;param name="flashvars" value="id=ab&a=b"/&gt;
     *  3. Flash在需要触发事件时调用window.onflashevent回调函数，并输入一个Object作为参数,Object信息包括
     *     type   [String] - 鼠标事件类型，如click/mouseover/mouseout/play/pause...
     *     target [String] - 触发事件的flash标识，通过flashvars参数输入的id参数，做了encodeURIComponent，如a%23b
     *     ...
     *
     * 结构举例
     * ```html
     * <div id='flash'></div>
     * ```
     *
     * 脚本举例
     * ```javascript
     * NEJ.define([
     *     'util/flash/flash'
     * ],function(_e){
     *     // 生成flash对象，可以设置宽高，地址，父节点，flash参数在params中设置
     *     // flash需要提供inited接口，返回falsh已经准备好的状态
     *     _e._$flash({
     *         src:'../../qunit/res/FlexChart.swf',
     *         hidden:false,
     *         parent:'flash',
     *         width:900,
     *         height:600,
     *         params:{
     *             flashvars:'',
     *             wmode:'transparent',
     *             allowscriptaccess:'always'
     *         },
     *         onready:function(_flash){
     *             // 返回准备好的flash对象
     *             // 如果没有传入flash对象则表示无法识别到flash
     *         },
     *         oncustom:function(_event){
     *             // 自定义事件需Flash同JS预先协定好自定义事件名称，如这里的oncustom
     *             // Flash中通过调用JS的window.onflashevent({id:2222,type:'custom',...})调入此回调
     *         }
     *     });
     * });
     * ```
     *
     * @method   module:util/flash/flash._$flash
     * @param    {Object}      arg0    - 可选配置参数
     * @property {String}      src     - Flash文件地址，必须指定地址
     * @property {Boolean}     hidden  - Flash是否不可见
     * @property {Number}      width   - Flash显示宽度，设为不可见时可以不设此参数
     * @property {Number}      height  - Flash显示高度，设为不可见时可以不设此参数
     * @property {String|Node} parent  - 容器节点，默认为document.body
     * @property {Object}      params  - 设置参数，object标签中的param标签参数
     * @property {String|Node} target  - 触发事件的源节点
     * @property {Function}    onready - Flash初始化完毕触发事件，输入可交互的Flash对象
     * @return   {Void}
     */
    _p._$flash = (function(){
        var _cache = {},_title,
            _reg0 = /^(?:mouse.*|(?:dbl)?click)$/i;
        // flash event
        window.onflashevent = function(_event){
            var _id = decodeURIComponent(_event.target),
                _type = _event.type.toLowerCase();
            // check mouse event bubble
            var _target = _cache[_id+'-tgt'];
            if (!!_target&&_reg0.test(_type)){
                _doMouseEventBubble(
                    _target,_event
                );
            }
            // check id-type handler
            var _handler = _cache[_id+'-on'+_type];
            if (!!_handler){
                var _result = '';
                try{
                    _result = _handler(_event);
                }catch(e){
                    // ignore
                }
                return _result;
            }
        };
        // append flash element
        var _doInitDOM = function(_options){
            // bugfix for ie title with flash
            _title = document.title;
            var _parent = _e._$get(_options.parent)||document.body,
                _html = _t0._$get(_seed_html,_options);
            _parent.insertAdjacentHTML(
               !_options.hidden?'beforeEnd':'afterBegin',_html
            );
        };
        // listen flash mouse event
        var _doMouseEventBubble = function(_id,_event){
            var _type = _event.type.toLowerCase();
            _t1.requestAnimationFrame(function(){
                _v._$dispatchEvent(_id,_type);
            });
        };
        // check flash init state
        var _doCheckFlashInit = function(_flash){
            return !!_flash&&!!_flash.inited&&!!_flash.inited();
        };
        var _doCheckFlash = function(_id){
            var _arr = [document.embeds[_id],
                       _e._$get(_id),document[_id],window[_id]],
                _index = _u._$forIn(_arr,_doCheckFlashInit),
                _flash = _arr[_index],
                _ctkey = _id+'-count';
            _cache[_ctkey]++;
            if (!!_flash||_cache[_ctkey]>100){
                if (!!_title){
                    document.title = _title;
                    _title = null;
                }
                _cache[_id](_flash);
                delete _cache[_id];
                delete _cache[_ctkey];
                return;
            }
            window.setTimeout(_doCheckFlash._$bind(null,_id),300);
        };
        // init flash event
        var _doInitFlashEvent = function(_options){
            // init flash vars
            var _id = _options.id,
                _params = _options.params;
            if (!_params){
                _params = {};
                _options.params = _params;
            }
            var _vars = _params.flashvars||'';
            _vars += (!_vars?'':'&')+('id='+_id);
            // delegate mouse event bubble
            if (!_options.hidden&&(!!_options.target||
                 _h.__canFlashEventBubble(_params.wmode))){
                var _tid = _e._$id(_options.target)||
                           _e._$id(_options.parent);
                _cache[_id+'-tgt'] = _tid;
            }
            _params.flashvars = _vars;
            // check event callback
            _u._$loop(_options,function(_value,_key){
                if (_u._$isFunction(_value)&&_key!='onready'){
                    _cache[_id+'-'+_key] = _value;
                }
            });
        };
        return function(_options){
            _options = NEJ.X({},_options);
            if (!_options.src) return;
            var _id = '_'+_u._$uniqueID();
            _options.id = _id;
            // delegate event
            _doInitFlashEvent(_options);
            // append flash
            _doInitDOM(_options);
            // check flash ready
            if (!_options.onready) return;
            _cache[_id] = _options.onready;
            _cache[_id+'-count'] = 0;
            _doCheckFlash(_id);
        };
    })();

    if (CMPT){
        NEJ.copy(NEJ.P('nej.e'),_p);
    }

    return _p;
},'083c017e2a5450e295d417651bc93279','43a92a1cb30f0322e2bca627e0f6b635','0dd9ac3de45a7a1ce7c2f3ff80d53fcc','3695926c26a1894dcce266fdc52d2e3a','01daafc45eed32c99fa66fa6bd62337a','71cb57f89fa4394d808a414fc2bee70d','7206314d9c8b7b12e8bbc0750285f49d','9b2314ac1ec3cd2936ccc4d0a08d884e');
I$('e8068e50221d8dd536bd7c496c185632',function (_t,_k,_c,_u,_e,_p,_o,_f,_r){
    var _pro,
        _cache = {},
        _seed = _u._$uniqueID();
    /*
     * 代理请求正常回调
     * @param  {String} 请求标识
     * @param  {String} 返回数据
     * @return {Void}
     */
    this['ld'+_seed] = function(_key,_text){
        var _proxy = _cache[_key];
        if (!_proxy) return;
        delete _cache[_key];
        _proxy.__onLoadRequest({
            status:200,
            result:_text
        });
    };
    /*
     * 代理请求异常回调
     * @param  {String} 请求标识
     * @param  {Number} 请求状态
     * @return {Void} 
     */
    this['er'+_seed] = function(_key,_status){
        var _proxy = _cache[_key];
        if (!_proxy) return;
        delete _cache[_key];
        _proxy.__onLoadRequest({
            status:_status||0
        });
    };
    /**
     * Flash代理方式Ajax请求对象
     * 
     * @class   module:util/ajax/proxy/flash._$$ProxyFlash
     * @extends module:util/ajax/proxy/proxy._$$ProxyAbstract
     * 
     * @param   {Object}  config - 构造配置参数
     */
    _p._$$ProxyFlash = _k._$klass();
    _pro = _p._$$ProxyFlash._$extend(_t._$$ProxyAbstract);
    /**
     * 往服务器发送请求
     * 
     * @protected
     * @method module:util/ajax/proxy/flash._$$ProxyFlash#__doSendRequest
     * @param  {Object} arg0 - 请求信息
     * @return {Void}
     */
    _pro.__doSendRequest = function(_options){
        var _flash = _cache.flash;
        // callback list
        if (_u._$isArray(_flash)){
            _flash.push(
                this.__doSendRequest.
                    _$bind(this,_options)
            );
            return;
        }
        // build flash proxy
        if (!_flash){
            _cache.flash = [
                this.__doSendRequest.
                    _$bind(this,_options)
            ];
            _e._$flash({
                hidden:!0,
                src:_c._$get('ajax.swf'),
                onready:function(_flash){
                    if (!_flash) return;
                    var _list = _cache.flash;
                    _cache.flash = _flash;
                    _u._$reverseEach(
                        _list,function(_handler,_index,_list){
                            try{
                                _handler();
                            }catch(ex){
                                // ignore
                            }
                        }
                    );
                }
            });
            return;
        }
        // send request by flash
        this.__rkey = _u._$uniqueID();
        _cache[this.__rkey] = this;
        var _data = _u._$fetch({
            url:'',
            data:null,
            method:'GET'
        },_options.request);
        _data.key = this.__rkey;
        _data.headers  = _options.headers;
        _data.onerror  = 'cb.er'+_seed;
        _data.onloaded = 'cb.ld'+_seed;
        var _policy = _c._$getFlashProxy(_data.url);
        if (!!_policy){
            _data.policyURL = _policy;
        }
        _flash.request(_data);
    };
    /**
     * 中断请求
     * 
     * @method module:util/ajax/proxy/flash._$$ProxyFlash#_$abort
     * @return {Void}
     */
    _pro._$abort = function(){
        delete _cache[this.__rkey];
        this.__onAbort();
    };

    return _p;
},'9223dd4ce3e58580d50ea005ce24edcc','7d45f691904093dd3d0d2a39eb337c1c','1c763bdf30dcc32bedb3bfa2afd89a26','3695926c26a1894dcce266fdc52d2e3a','12782c588b6c70296cf3b8dedff46777');
I$('ea976ed8a0afd73280caa6ffcd1f8c5d',function (_p,_o,_f,_r){
    /**
     * 格式化源信息
     * @param  {String} 源
     * @return {String} 格式化后源
     */
    _p.__formatOrigin = (function(){
        var _reg = /^([\w]+?:\/\/.*?(?=\/|$))/i;
        return function(_origin){
            _origin = _origin||'';
            if (_reg.test(_origin)){
                return RegExp.$1;
            }
            return '*';
        };
    })();
    /**
     * 解析消息传递数据
     * @param  {Variable} 数据
     * @return {Variable} 数据
     */
    _p.__formatPassData = function(_data){
        return _data;
    };
    /**
     * 跨文档发送数据
     * @param  {Window} 窗体对象
     * @param  {Object} 发送配置
     * @return {Void}
     */
    _p.__postMessage = function(_window,_options){
        if (!_window.postMessage){
            return;
        }
        _options = _options||_o;
        _window.postMessage(
            _p.__formatPassData(_options.data),
            _p.__formatOrigin(_options.origin)
        );
    };
    
    return _p;
});
I$('f7d4b1f161631059a008e129d548ac8c',function(b1524476404740,_h,_u,_v,_p,_o,_f,_r){if (b1524476404740._$KERNEL.engine==='trident'&&b1524476404740._$KERNEL.release>='4.0'&&b1524476404740._$KERNEL.release<='5.0'){I$('0ab1e99328990e696ca40cd65ace3585',function (){
        /**
         * 解析消息传递数据
         * @param  {Variable} 数据
         * @return {Variable} 数据
         */
        _h.__formatPassData = function(_data){
            // ie8-9 only support string data
            return JSON.stringify(_data);
        };
    });}
if (b1524476404740._$KERNEL.engine==='trident'&&b1524476404740._$KERNEL.release<='3.0'){I$('58ea369bcf6779baf16013b23ab336d3',function (_t){
        var _key = 'MSG|',
            _queue = [];
        /*
         * 检测window.name变化情况
         * @return {Void}
         */
        var _doCheckWindowName = function(){
            // check name
            var _name = unescape(window.name||'').trim();
            if (!_name||_name.indexOf(_key)!=0) return;
            window.name = '';
            // check result
            var _result = _u._$string2object(_name.replace(_key,''),'|'),
                _origin = (_result.origin||'').toLowerCase();
            // check origin
            if (!!_origin&&_origin!='*'&&
                location.href.toLowerCase().indexOf(_origin)!=0){
                return;
            }
            // dispatch onmessage event
            _v._$dispatchEvent(window,'message',{
                data:JSON.parse(_result.data||'null'),
                source:window.frames[_result.self]||_result.self,
                origin:_h.__formatOrigin(_result.ref||document.referrer)
            });
        };
        /*
         * 检测window.name设置队列
         * @return {Void}
         */
        var _doCheckNameQueue = (function(){
            var _checklist;
            // set window.name
            var _doSetWindowName = function(_map,_index,_list){
                if (_u._$indexOf(_checklist,_map.w)<0){
                    _checklist.push(_map.w);
                    _list.splice(_index,1);
                    _map.w.name = _map.d;
                }
            };
            return function(){
                _checklist = [];
                _u._$reverseEach(_queue,_doSetWindowName);
                _checklist = null;
            };
        })();
        /**
         * 跨文档发送数据
         * @param  {Window} 窗体对象
         * @param  {Object} 发送配置
         * @return {Void}
         */
        _h.__postMessage = (function(){
            // serialize send data
            var _doSerialize = function(_data){
                var _result = {};
                _data = _data||_o;
                _result.origin = _data.origin||'';
                _result.ref  = location.href;
                _result.self = _data.source;
                _result.data = JSON.stringify(_data.data);
                return _key+_u._$object2string(_result,'|',!0);
            };
            // function body
            return function(_window,_options){
                _queue.unshift({
                    w:_window,
                    d:escape(_doSerialize(_options))
                });
            };
        })();

        // init window onmessage event
        _t._$$CustomEvent._$allocate({
            element:window,
            event:'message'
        });
        setInterval(_doCheckNameQueue,100);
        setInterval(_doCheckWindowName,20);
    },'df1fd1a19dd83f534a4afd4e03e3b8a0','1a23f59605f35c80a512f9a5a30bffc2');}return _h;},'d552af5339ac27c31f311f3fdadefdc3','ea976ed8a0afd73280caa6ffcd1f8c5d','3695926c26a1894dcce266fdc52d2e3a','0dd9ac3de45a7a1ce7c2f3ff80d53fcc');
I$('c2c292068a884d95c2e2e0367eece473',function (NEJ,_u,_e,_h,_p,_o,_f,_r){
    /**
     * 发送跨文档的消息
     *
     * 结构举例
     * ```html
     * <!-- 注意需要通过source进行双向交互的frame节点必须设置id属性作为标识 -->
     * <iframe id="targetFrame" src="http://a.b.com/a.html"></iframe>
     * ```
     *
     * 脚本举例
     * ```javascript
     * NEJ.define([
     *     'base/event'
     *     'util/ajax/message'
     * ],function(_v,_j){
     *     // top页面代码
     *     // 发送消息至 http://c.d.com 的页面
     *     _j._$postMessage('targetFrame',{
     *         data:'hello c.d.com',
     *         origin:'http://c.d.com'
     *     });
     *
     *     // http://a.b.com/a.html页面代码
     *     // 添加消息监测事件
     *     _v._$addEvent(
     *         window,'message',function(_event){
     *             // 因为top页面发送消息到 http://c.d.com
     *             // 所以在http://a.b.com页面不会收到任何消息
     *         }
     *     );
     *
     *     // top页面代码
     *     // 发送消息至 http://a.b.com 的页面
     *     _j._$postMessage('targetFrame',{
     *         data:'hello a.b.com'
     *     });
     *
     *     // http://a.b.com/a.html页面代码
     *     // 添加消息监测事件
     *     _v._$addEvent(
     *         window,'message',function(_event){
     *             // 必须先验证消息来源_event.origin是否你允许的域
     *              if (!_isAllow(_event.origin))
     *                 return;
     *
     *             // 处理_event.data中的消息内容
     *             // TODO something
     *
     *             // 回复消息，使用_event.source
     *             _j._$postMessage(_event.source,{
     *                 data:'hello!',
     *                 origin:_event.origin
     *             });
     *         }
     *     );
     * });
     * ```
     *
     * @method module:util/ajax/message._$postMessage
     * @param  {String|Window} arg0   - window对象或者Frame的name，或者字符串如_top、_parent、_self
     * @param  {Object}        arg1   - 消息配置
     * @property {Variable}      data   - 消息内容
     * @property {String}        origin - 目标Origin，只有指定的页面可以收到消息，如http://a.b.com
     * @property {String}        source - 当前窗体标识，除非你非常确定当前窗体的标识是什么，否则请采用自动识别
     * @return {Void}
     */
    _p._$postMessage = (function(){
        var _self = window.name||'_parent',
            _wmap = {
                '_top'   : window.top,
                '_self'  : window,
                '_parent': window.parent
            };
        return function(_target,_options){
            if (_u._$isString(_target)){
                _target = _wmap[_target]||
                          window.frames[_target]||
                         (_e._$get(_target)||_o).contentWindow;
                if (!_target) return;
            }
            // check data
            var _data = _u._$fetch({
                data:null,
                origin:'*',
                source:_self
            },_options);
            // send message
            _h.__postMessage(_target,_data);
        };
    })();

    if (CMPT){
        NEJ.copy(NEJ.P('nej.j'),_p);
    }

    return _p;
},'083c017e2a5450e295d417651bc93279','3695926c26a1894dcce266fdc52d2e3a','43a92a1cb30f0322e2bca627e0f6b635','f7d4b1f161631059a008e129d548ac8c');
I$('406bf105bfb4b1acc0e1978d84fc46e7',function (_t,_u,_k,_v,_c,_e,_j,_p,_o,_f,_r){
    var _pro,
        _cache = {};
    /**
     * Frame代理方式Ajax请求对象
     * 
     * @class   module:util/ajax/proxy/frame._$$ProxyFrame
     * @extends module:util/ajax/proxy/proxy._$$ProxyAbstract
     * 
     * @param   {Object}  config - 构造配置参数
     */
    _p._$$ProxyFrame = _k._$klass();
    _pro = _p._$$ProxyFrame._$extend(_t._$$ProxyAbstract);
    /**
     * 控件初始化
     *
     * @protected
     * @method module:util/ajax/proxy/frame._$$ProxyFrame#__init
     * @return {Void}
     */
    _pro.__init = (function(){
        var _flag = 'NEJ-AJAX-DATA:',
            _init = !1;
        // receive message
        var _doReceiveMessage = function(_event){
            var _data = _event.data;
            if (_data.indexOf(_flag)!=0) return;
            _data = JSON.parse(_data.replace(_flag,''));
            var _proxy = _cache[_data.key];
            if (!_proxy) return;
            delete _cache[_data.key];
            _data.result = decodeURIComponent(_data.result||'');
            _proxy.__onLoadRequest(_data);
        };
        // init message listener
        var _doInitMessage = function(){
            if (!_init){
                _init = !0;
                _v._$addEvent(
                    window,'message',
                    _doReceiveMessage
                );
            }
        };
        return function(){
            this.__super();
            _doInitMessage();
        };
    })();
    /**
     * 往服务器发送请求
     *
     * @protected
     * @method module:util/ajax/proxy/frame._$$ProxyFrame#__doSendRequest
     * @param  {Object} arg0 - 请求信息
     * @return {Void}
     */
    _pro.__doSendRequest = function(_options){
        var _request = _options.request,
            _proxy = _c._$getFrameProxy(_request.url),
            _frame = _cache[_proxy];
        // callback list
        if (_u._$isArray(_frame)){
            _frame.push(
                this.__doSendRequest.
                    _$bind(this,_options)
            );
            return;
        }
        // build frame proxy
        if (!_frame){
            _cache[_proxy] = [
                this.__doSendRequest.
                    _$bind(this,_options)
            ];
            _e._$createXFrame({
                src:_proxy,visible:!1,
                onload:function(_event){
                    var _list = _cache[_proxy];
                    _cache[_proxy] = _v.
                        _$getElement(_event).contentWindow;
                    _u._$reverseEach(
                        _list,function(_handler){
                            try{
                                _handler();
                            }catch(ex){
                                // ignore
                            }
                        }
                    );
                }
            });
            return;
        }
        // send message to frame
        this.__rkey = _u._$uniqueID();
        _cache[this.__rkey] = this;
        var _data = _u._$fetch({
            url:'',data:null,
            timeout:0,method:'GET'
        },_request);
        _data.key = this.__rkey;
        _data.headers = _options.headers;
        _j._$postMessage(_cache[_proxy],{data:_data});
    };
    /**
     * 中断请求
     * 
     * @method module:util/ajax/proxy/frame._$$ProxyFrame#_$abort
     * @return {Void}
     */
    _pro._$abort = function(){
        delete _cache[this.__rkey];
        this.__onAbort();
    };
    
    return _p;
},'9223dd4ce3e58580d50ea005ce24edcc','3695926c26a1894dcce266fdc52d2e3a','7d45f691904093dd3d0d2a39eb337c1c','0dd9ac3de45a7a1ce7c2f3ff80d53fcc','1c763bdf30dcc32bedb3bfa2afd89a26','43a92a1cb30f0322e2bca627e0f6b635','c2c292068a884d95c2e2e0367eece473');
I$('cd450b4f1dfaf2cadad7a93a206801ec',function (_t,_k,_u,_v,_e,_g,_j0,_j1,_p,_o,_f,_r){
    var _pro,
        _cache = {},
        _xflag = 'NEJ-UPLOAD-RESULT:';
    /**
     * 文件上传代理
     *
     * @class   module:util/ajax/proxy/upload._$$ProxyUpload
     * @extends module:util/ajax/proxy/proxy._$$ProxyAbstract
     *
     * @param   {Object}  config - 构造配置参数
     */
    _p._$$ProxyUpload = _k._$klass();
    _pro = _p._$$ProxyUpload._$extend(_t._$$ProxyAbstract);
    /**
     * 控件初始化
     *
     * @protected
     * @method module:util/ajax/proxy/upload._$$ProxyUpload#__init
     * @return {Void}
     */
    _pro.__init = (function(){
        var _init = !1;
        // receive message callback
        var _doReceiveMessage = function(_event){
            var _data = _event.data;
            if (_data.indexOf(_xflag)!=0) return;
            _data = JSON.parse(_data.replace(_xflag,''));
            var _proxy = _cache[_data.key];
            if (!_proxy) return;
            delete _cache[_data.key];
            _proxy.__onLoadRequest(
                decodeURIComponent(_data.result)
            );
        };
        // init message listener
        var _doInitMessage = function(){
            if (!_init){
                _init = !0;
                _v._$addEvent(
                    window,'message',
                    _doReceiveMessage
                );
            }
        };
        return function(){
            this.__super();
            _doInitMessage();
        };
    })();
    /**
     * 控件销毁
     * 
     * @protected
     * @method module:util/ajax/proxy/upload._$$ProxyUpload#__destroy
     * @return {Void}
     */
    _pro.__destroy = function(){
        this.__super();
        _e._$remove(this.__frame);
        delete this.__frame;
        window.clearTimeout(this.__timer);
        delete this.__timer;
    };
    /**
     * 请求载入回调
     * 
     * @protected
     * @method module:util/ajax/proxy/upload._$$ProxyUpload#__onLoadRequest
     * @param  {String} arg0 - 数据信息
     * @return {Void}
     */
    _pro.__onLoadRequest = function(_text){
        try{
            var _ret = _e._$text2type(
                _text,this.__request.type
            );
            this._$dispatchEvent('onload',_ret);
        }catch(ex){
            this._$dispatchEvent('onerror',{
                code:_g._$CODE_ERREVAL,
                message:_text
            });
        }
    };
    /**
     * 往服务器发送请求
     * 
     * @protected
     * @method module:util/ajax/proxy/upload._$$ProxyUpload#__doSendRequest
     * @param  {Object} arg0 - 请求信息
     * @return {Void}
     */
    _pro.__doSendRequest = (function(){
        // same domain upload result check
        var _doCheckResult = function(){
            var _body,_text;
            try{
                var _body = this.__frame.contentWindow.document.body,
                    _text = (_body.innerText||_body.textContent||'').trim();
                // check result for same domain with upload proxy html
                if (_text.indexOf(_xflag)>=0||
                    _body.innerHTML.indexOf(_xflag)>=0){
                    // use post message path
                    return;
                }
            }catch(ex){
                // ignore if not same domain
                return;
            }
            this.__onLoadRequest(_text);
        };
        // check upload progress
        var _doProgress = function(_url,_mode,_cookie){
            _j0._$request(_url,{
                type:'json',
                method:'POST',
                cookie:_cookie,
                mode:parseInt(_mode)||0,
                onload:function(_data){
                    if (!this.__timer) return;
                    this._$dispatchEvent('onuploading',_data);
                    this.__timer = window.setTimeout(
                        _doProgress._$bind(
                            this,_url,_mode,_cookie
                        ),1000
                    );
                }._$bind(this),
                onerror:function(_error){
                    if (!this.__timer) return;
                    this.__timer = window.setTimeout(
                        _doProgress._$bind(
                            this,_url,_mode,_cookie
                        ),1000
                    );
                }._$bind(this)
            });
        };
        return function(_options){
            var _request = _options.request,
                _headers = _options.headers,
                _form = _request.data,
                _name = _u._$uniqueID();
            _cache[_name]  = this;
            _form.target   = _name;
            _form.method   = 'POST';
            _form.enctype  = _g._$HEAD_CT_FILE;
            _form.encoding = _g._$HEAD_CT_FILE;
            var _url = _form.action||'',
                _sep = _url.indexOf('?')<=0?'?':'&';
            _form.action = _url+_sep+'_proxy_=form';
            this.__frame = _e._$createXFrame({
                name:_name,
                onload:function(_event){
                    var _frame = _v._$getElement(_event);
                    _v._$addEvent(
                        _frame,'load',
                        _doCheckResult._$bind(this)
                    );
                    _form.submit();
                    var _qurl = (_form.nej_query||_o).value;
                    if (!_qurl) return;
                    var _mode = (_form.nej_mode||_o).value,
                        _cookie = (_form.nej_cookie||_o).value==='true';
                    this.__timer = window.setTimeout(
                        _doProgress._$bind(
                            this,_qurl,_mode,_cookie
                        ),100
                    );
                }._$bind(this)
            });
        };
    })();
    /**
     * 中断请求
     * 
     * @method module:util/ajax/proxy/upload._$$ProxyUpload#_$abort
     * @return {Void}
     */
    _pro._$abort = function(){
        this.__onAbort();
    };

    return _p;
},'9223dd4ce3e58580d50ea005ce24edcc','7d45f691904093dd3d0d2a39eb337c1c','3695926c26a1894dcce266fdc52d2e3a','0dd9ac3de45a7a1ce7c2f3ff80d53fcc','43a92a1cb30f0322e2bca627e0f6b635','d0109f80b9992d1fd93e85a35ede12b1','be138b98c209a9dceaea0fb54e8cbde1','c2c292068a884d95c2e2e0367eece473');
I$('a5086232d56f45933f06ae99262d5fa0',function (_t0,_t1,_t2,_t3,_p,_o,_f,_r){
    /**
     * 根据模式返回代理实例，模式说明
     * 0 - 自动模式，高版本使用HTML5的CORS协议，低版本采用Frame代理方式
     * 1 - 高版本使用HTML5的CORS协议，普通请求低版本采用Flash代理方式
     * 2 - 全部使用Frame代理方式
     * 3 - 全部使用Flash代理方式
     * @param  {Number}   模式
     * @param  {Boolean}  是否文件上传
     * @param  {Object}   构造配置参数
     * @return {_$$ProxyAbstract} 代理实例
     */
    _p.__getProxyByMode = function(_mode,_upload,_options){
        var _map = !!_upload 
                 ? {2:_t3._$$ProxyUpload}
                 : {2:_t2._$$ProxyFrame,3:_t1._$$ProxyFlash};
        return (_map[_mode]||_t0._$$ProxyXHR)._$allocate(_options);
    };
    
    return _p;
},'2632334c6621ed21d526ac5ffb02a81e','e8068e50221d8dd536bd7c496c185632','406bf105bfb4b1acc0e1978d84fc46e7','cd450b4f1dfaf2cadad7a93a206801ec');
I$('5e4566ed1788848a97f12d1455fb175b',function(b1524476397881,_h,_p,_o,_f,_r){if (b1524476397881._$KERNEL.engine==='trident'&&b1524476397881._$KERNEL.release<='5.0'){I$('fedd2119db6319335fcc7b00780da87b',function (){
        /**
         * 根据模式返回代理实例，模式说明
         * 0 - 自动模式，高版本使用HTML5的CORS协议，低版本采用Frame代理方式
         * 1 - 高版本使用HTML5的CORS协议，普通请求低版本采用Flash代理方式
         * 2 - 全部使用Frame代理方式
         * 3 - 全部使用Flash代理方式
         * @param  {Number}  模式
         * @param  {Boolean} 是否文件上传
         * @param  {Object}  构造配置参数
         * @return {_$$ProxyAbstract} 代理实例
         */
        _h.__getProxyByMode = (function(){
            var _pmap = {0:2,1:3};
            return _h.__getProxyByMode._$aop(function(_event){
               var _args = _event.args,
                   _mode = _args[0]||0;
               _args[0] = !!_args[1] ? 2 :
                          _pmap[_mode]||_mode;
            });
        })();
    });}return _h;},'d552af5339ac27c31f311f3fdadefdc3','a5086232d56f45933f06ae99262d5fa0');
I$('be138b98c209a9dceaea0fb54e8cbde1',function (NEJ,_g,_u,_e,_t,_h,_p,_o,_f,_r){
    /**
     * 载入回调
     *
     * @callback module:util/ajax/xdr.onload
     * @param    {Variable|Object} event - 请求返回数据，根据请求时type指定格式返回，
     *                                     如果请求时指定了result参数，则此处输入为包含额外信息的对象，
     *                                     数据结果从此对象的data属性中取，如{headers:{'x-res-0':'12345', ...},data:{a:'aaa', ...}}
     */
    /**
     * 出错回调
     *
     * @callback module:util/ajax/xdr.onerror
     * @param    {Object}   event   - 错误信息
     * @property {Number}   code    - 错误代码
     * @property {String}   message - 错误描述
     * @property {Variable} data    - 出错时携带数据
     */
    /**
     * 请求之前对数据处理回调
     *
     * @callback module:util/ajax/xdr.onbeforerequest
     * @param    {Object} event   - 请求信息
     * @property {Object} request - 请求参数，数据信息 url/sync/cookie/type/method/timeout
     * @property {Object} headers - 请求头信息
     */
    /**
     * 上传进度回调
     *
     * @callback module:util/ajax/xdr.onuploading
     * @param    {Object} event  - 进度信息
     * @property {Number} loaded - 载入数量
     * @property {Number} total  - 总量
     */
    // sn:{req:proxy,onload:function(){},onerror:function(){}}
    var _xcache = {},
        _doFilter = _f;
    /**
     * 中断请求
     *
     * 脚本举例
     * ```javascript
     * NEJ.define([
     *     'util/ajax/xdr'
     * ],function(_j){
     *     var _id = _j._$request(
     *         'http://123.163.com/xhr/',{
     *             type:'json',
     *             method:'POST',
     *             data:{name:'ABC'},
     *             timeout:60000,
     *             onload:function(_data){
     *                 // TODO
     *             },
     *             onerror:function(_error){
     *                 // TODO
     *             }
     *         }
     *     );
     *     // 1秒后中断掉这个请求
     *     window.setTimeout(
     *         function(){
     *             _j._$abort(_id);
     *         },1000
     *     );
     * });
     * ```
     *
     * @method module:util/ajax/xdr._$abort
     * @param  {String} arg0 - 请求标识
     * @return {Void}
     */
    _p._$abort = function(_sn){
        var _cache = _xcache[_sn];
        if (!!_cache){
            _cache.req._$abort();
        }
    };
    /**
     * 全局请求过滤器，过滤器中可以通过设置输入事件对象的stopped值阻止继续回调
     *
     * 脚本举例
     * ```javascript
     * NEJ.define([
     *     'util/ajax/xdr'
     * ],function(_j){
     *     _j._$filter(function(_event){
     *         // _event.type     请求过滤类型
     *         // _event.result   请求结果
     *         // _event.stopped  是否阻止后续逻辑
     *
     *         // 过滤掉404的异常，如果type是onload不做处理
     *         if (_event.type == 'onerror'){
     *             if (_event.result.data == 404){
     *                 _event.stopped = false;
     *             }
     *         }
     *     });
     *     _j._$request('xxxx',{
     *         type:'json',
     *         method:'POST',
     *         data:{name:'abc'},
     *         timeout:3000,
     *         onload:function(_data){
     *             // TODO
     *         },
     *         onerror:function(_error){
     *             // TODO
     *         }
     *     });
     * });
     * ```
     *
     * @method module:util/ajax/xdr._$filter
     * @param  {Function} arg0 - 过滤器
     * @return {Void}
     */
    _p._$filter = function(_filter){
        _doFilter = _filter||_f;
    };
    /**
     * 发送ajax请求
     *
     * 脚本举例
     * ```javascript
     * NEJ.define([
     *     'util/ajax/xdr'
     * ],function(_p){
     *     var _id = _p._$request(
     *         'http://a.b.com/api',{
     *             sync:true,
     *             type:'json',
     *             data:'hello',
     *             query:'a=1&b=2',
     *             method:'post',
     *             timeout:3000,
     *             mode:0||1||2||3,
     *             onload:function(_data){
     *                 // 正常回调处理
     *             },
     *             onerror:function(_error){
     *                 // 异常处理
     *             },
     *             onbeforerequest:function(_data){
     *                 // 请求发送前，对请求数据处理
     *             }
     *         }
     *     );
     * });
     * ```
     *
     * @method   module:util/ajax/xdr._$request
     * @param    {String}   arg0    - 请求地址
     * @param    {Object}   arg1    - 配置参数
     * @property {Boolean}  sync    - 是否同步请求
     * @property {String}   type    - 返回数据格式,text/json/xml
     * @property {Variable} data    - 要发送的数据
     * @property {Variable} query   - 查询参数,字符串格式a=b&c=d,对象格式{a:'b',c:'d'}
     * @property {String}   method  - 请求方式,GET/POST
     * @property {Number}   timeout - 超时时间,0 禁止超时监测
     * @property {Object}   headers - 头信息表
     * @property {Boolean}  cookie  - 跨域请求是否带cookie，仅对CORS方式有效
     * @property {Number}   mode    - 请求模式,针对跨域请求采用的请求方式
     *
     * * 0 - 自动模式，高版本使用HTML5的CORS协议，低版本采用Frame代理方式
     * * 1 - 高版本使用HTML5的CORS协议，低版本采用Flash代理方式
     * * 2 - 全部使用Frame代理方式
     * * 3 - 全部使用Flash代理方式
     *
     * @property {Object}   result  - onload回调输入时需包含的额外信息，已处理额外数据
     *
     * * headers - 服务器返回头信息，如{headers:'x-res-0'}或者{headers:['x-res-0','x-res-1']}
     *
     * @property {module:util/ajax/xdr.onload}          onload  - 数据载入回调
     * @property {module:util/ajax/xdr.onerror}         onerror - 请求异常回调
     * @property {module:util/ajax/xdr.onbeforerequest} onbeforerequest - 请求之前回调
     *
     * @return   {String} 分配给请求的ID
     */
    _p._$request = (function(){
        var _location = (location.protocol+'//'
                        +location.host).toLowerCase();
        // check cross-domain request
        var _isXDomain = function(_url){
            var _origin = _u._$url2origin(_url);
            return !!_origin&&_origin!=_location;
        };
        // check file upload
        var _isUpload = function(_headers){
            return (_headers||_o)[_g._$HEAD_CT]==_g._$HEAD_CT_FILE;
        };
        // get ajax proxy
        var _getProxy = function(_options){
            var _upload = _isUpload(_options.headers);
            if (!_isXDomain(_options.url)&&!_upload)
                return _t._$$ProxyXHR._$allocate(_options);
            return _h.__getProxyByMode(_options.mode,_upload,_options);
        };
        // parse ext result
        var _doParseExtData = function(_cache,_result){
            var _data = {
                data:_result
            };
            // parse ext headers
            var _keys = _cache.result.headers;
            if (!!_keys){
                _data.headers = _cache.req._$header(_keys);
            }
            // TODO parse other ext data
            return _data;
        };
        // clear cache
        var _doClear = function(_sn){
            var _cache = _xcache[_sn];
            if (!_cache) return;
            if (!!_cache.req)
                _cache.req._$recycle();
            delete _xcache[_sn];
        };
        // do callback
        var _doCallback = function(_sn,_type){
            var _cache = _xcache[_sn];
            if (!_cache) return;
            var _data = arguments[2];
            if (_type=='onload'&&!!_cache.result){
                _data = _doParseExtData(_cache,_data);
            }
            _doClear(_sn);
            var _event = {
                type:_type,
                result:_data
            };
            _doFilter(_event);
            if (!_event.stopped){
               (_cache[_type]||_f)(_event.result);
            }
        };
        // onload callback
        var _onLoad = function(_sn,_data){
            _doCallback(_sn,'onload',_data);
        };
        // onerror callback
        var _onError = function(_sn,_error){
            _doCallback(_sn,'onerror',_error);
        };
        // check data for get method
        var _doMergeURL = function(_url,_data){
            var _sep = _url.indexOf('?')<0?'?':'&',
                _data = _data||'';
            if (_u._$isObject(_data))
                _data = _u._$object2query(_data);
            if (!!_data) _url += _sep+_data;
            return _url;
        };
        // function body
        return function(_url,_options){
            _options = _options||{};
            // cache request callback
            var _sn = _u._$uniqueID(),
                _cache = {
                    result:_options.result,
                    onload:_options.onload||_f,
                    onerror:_options.onerror||_f
                };
            _xcache[_sn] = _cache;
            _options.onload = _onLoad._$bind(null,_sn);
            _options.onerror = _onError._$bind(null,_sn);
            // append request query
            if (!!_options.query){
                _url = _doMergeURL(_url,_options.query);
            }
            // append request data for get
            var _method = _options.method||'';
            if ((!_method||/get/i.test(_method))&&!!_options.data){
                _url = _doMergeURL(_url,_options.data);
                _options.data = null;
            }
            _options.url = _url;
            _cache.req = _getProxy(_options);
            _cache.req._$send(_options.data);
            return _sn;
        };
    })();
    /**
     * 文件上传
     *
     * 结构举例
     * ```html
     * <form id="upload" name="upload" action="http://123.163.com:3000/xhr/uploadCallback">
     *    <input type="text" id="progress" />
     *    <input type="hidden" name="nej_mode" value="2" />
     *    <input type="hidden" name="nej_query" value="http://123.163.com:3000/xhr/progress" />
     * </form>
     * ```
     *
     * 脚本举例
     * ```javascript
     * NEJ.define([
     *     'util/ajax/xdr'
     * ],function(_j){
     *     _j._$upload('upload',{
     *         mode:2,
     *         cookie:true,
     *         onuploading:function(_data){
     *             // 后台处理http://123.163.com:3000/xhr/progress，返回一个json对象
     *             // 前台会去轮询此接口获取进度
     *             if(!!_data.total&&_data.progress){
     *                 _progress.value = _data.progress;
     *             }
     *         },
     *         onload:function(_url){
     *             // 此前会把进度轮询终止掉。如果要显示进度100%，可在此设置一次
     *             // 后台处理http://123.163.com:3000/xhr/uploadCallback，返回url
     *             // 文件上传完成的回调,url为返回的地址
     *         }
     *     });
     * });
     * ```
     *
     * @method   module:util/ajax/xdr._$upload
     * @see      module:util/ajax/xdr._$request
     * @param    {HTMLFormElement}  arg0    - 表单对象，待上传的文件及目标地址信息封装在此对象中
     * @param    {Object}           arg1    - 可选配置参数
     * @property {String}           type    - 返回数据格式
     * @property {Variable}         query   - 查询参数
     * @property {Number}           mode    - 跨域类型，0/2，见_$request接口说明
     * @property {Object}           headers - 头信息
     * @property {Boolean}          cookie  - 跨域请求是否带cookie，仅对CORS方式有效
     *
     * @property {module:util/ajax/xdr.onload}          onload  - 数据载入回调
     * @property {module:util/ajax/xdr.onerror}         onerror - 请求异常回调
     * @property {module:util/ajax/xdr.onuploading}     onuploading     - 上传进度回调
     * @property {module:util/ajax/xdr.onbeforerequest} onbeforerequest - 请求之前回调
     *
     * @return   {String}                     分配给请求的ID
     */
    _p._$upload = function(_form,_options){
        _form = _e._$get(_form);
        if (!_form){
            return '';
        }
        // init param
        var _option = _u._$fetch({
            mode:0,
            type:'json',
            query:null,
            cookie:!1,
            headers:{},
            onload:null,
            onerror:null,
            onuploading:null,
            onbeforerequest:null
        },_options);
        _option.data = _form;
        _option.method = 'POST';
        _option.timeout = 0;
        _option.headers[_g._$HEAD_CT] =
                        _g._$HEAD_CT_FILE;
        return _p._$request(_form.action,_option);
    };

    if (CMPT){
        NEJ.copy(NEJ.P('nej.j'),_p);
    }

    return _p;
},'083c017e2a5450e295d417651bc93279','d0109f80b9992d1fd93e85a35ede12b1','3695926c26a1894dcce266fdc52d2e3a','43a92a1cb30f0322e2bca627e0f6b635','2632334c6621ed21d526ac5ffb02a81e','5e4566ed1788848a97f12d1455fb175b');
I$('887198cb312fa73fdd5736868cacf8ad',function (_t,_k,_e,_j,_p,_o,_f,_r){
    var _pro;
    /**
     * 文本资源加载器
     *
     * @class   module:util/ajax/loader/text._$$LoaderText
     * @extends module:util/ajax/loader/loader._$$LoaderAbstract
     *
     * @param   {Object} config - 可选配置参数
     */
    _p._$$LoaderText = _k._$klass();
    _pro = _p._$$LoaderText._$extend(_t._$$LoaderAbstract);
    /**
     * 取资源载入控件
     *
     * @protected
     * @method module:util/ajax/loader/style._$$LoaderText#__getRequest
     * @return {Node} 控件节点
     */
    _pro.__getRequest = function(){
        return null;
    };
    /**
     * 资源载入
     *
     * @protected
     * @method module:util/ajax/loader/style._$$LoaderText#__doRequest
     * @param  {Node} 控件节点
     * @return {Void}
     */
    _pro.__doRequest = function(){
        _j._$request(this.__url,{
            method:'GET',
            type:'text',
            onload:this.__onLoaded._$bind(this),
            onerror:this.__onError._$bind(this)
        });
    };
    /**
     * 资源载入成功事件
     *
     * @protected
     * @method module:util/ajax/loader/style._$$LoaderText#__onLoaded
     * @return {Void}
     */
    _pro.__onLoaded = function(_text){
        this.__doCallback('onload',{
            url:this.__url,
            content:_text
        });
    };

    return _p;
},'d4d1cd9341f1ae03363136541b2b61e5','7d45f691904093dd3d0d2a39eb337c1c','43a92a1cb30f0322e2bca627e0f6b635','be138b98c209a9dceaea0fb54e8cbde1');
I$('ce8cdf6bc864c82369be8a1c14cf7150',function (_e,_p,_o,_f,_r){
    /**
     * 删除IFrame节点，保留历史
     * @param  {Node} iframe节点
     * @return {Void}
     */
    _p.__removeIFrameKeepHistory = function(_iframe){
        _e._$remove(_iframe);
    };
    
    return _p;
},'43a92a1cb30f0322e2bca627e0f6b635');
I$('273905e1adea67264407d86cf2d32a3f',function(_h,_e,_m,_p,_o,_f,_r){if (_m._$KERNEL.engine==='trident'&&_m._$KERNEL.release<='2.0'){I$('9e9e75eea4dc3120b8254b89e7e1a8d5',function (){
        /**
         * 删除IFrame节点，保留历史
         * @param  {Node} iframe节点
         * @return {Void}
         */
        _h.__removeIFrameKeepHistory = function(_iframe){
            _e._$setStyle(_iframe,'display','none');
            try{_iframe.contentWindow.document.body.innerHTML = '&nbsp;';}catch(ex){}
        };
    });}return _h;},'ce8cdf6bc864c82369be8a1c14cf7150','43a92a1cb30f0322e2bca627e0f6b635','d552af5339ac27c31f311f3fdadefdc3');
I$('17d5f1c88f21d84280a6e4699efbdf85',function (_t,_k,_e,_h,_p,_o,_f,_r){
    var _pro;
    /**
     * HTML资源加载器
     * 
     * @class   module:util/ajax/loader/html._$$LoaderHtml
     * @extends module:util/ajax/loader/loader._$$LoaderAbstract
     * 
     * @param   {Object} config - 可选配置参数
     */
    _p._$$LoaderHtml = _k._$klass(); 
    _pro = _p._$$LoaderHtml._$extend(_t._$$LoaderAbstract);
    /**
     * 取资源载入控件
     * 
     * @protected
     * @method module:util/ajax/loader/html._$$LoaderHtml#__getRequest
     * @return {Node} IFrame节点
     */
    _pro.__getRequest = function(){
        var _iframe = _e._$create('iframe');
        _iframe.width = 0;
        _iframe.height = 0;
        _iframe.style.display = 'none';
        return _iframe;
    };
    /**
     * 资源载入
     * 
     * @protected
     * @method module:util/ajax/loader/html._$$LoaderHtml#__doRequest
     * @param  {Node} arg0 - 控件节点
     * @return {Void}
     */
    _pro.__doRequest = function(_request){
        try{
            // append first for history bug
            document.body.appendChild(_request);
            _request.src = this.__url;
        }catch(ex){
            console.log(_request);
            console.error(ex);
        }
    };
    /**
     * 资源载入异常事件
     * 
     * @protected
     * @method module:util/ajax/loader/html._$$LoaderHtml#__onError
     * @param  {Object} arg0 - 错误信息
     * @return {Void}
     */
    _pro.__onError = function(_error){
        var _iframe = (
            this.__getLoadData(this.__url)||_o
        ).request;
        this.__doCallback('onerror',_error);
        _h.__removeIFrameKeepHistory(_iframe);
    };
    /**
     * 资源载入成功事件
     * 
     * @protected
     * @method module:util/ajax/loader/html._$$LoaderHtml#__onLoaded
     * @return {Void}
     */
    _pro.__onLoaded = function(){
        var _body = null,
            _iframe = (this.__getLoadData(this.__url)||_o).request;
        try{
            if (_iframe.src!=this.__url) return;
            _body = _iframe.contentWindow.document.body;
        }catch(ex){
            // ignore
        }
        this.__doCallback('onload',_body);
        _h.__removeIFrameKeepHistory(_iframe);
    };

    return _p;
},'d4d1cd9341f1ae03363136541b2b61e5','7d45f691904093dd3d0d2a39eb337c1c','43a92a1cb30f0322e2bca627e0f6b635','273905e1adea67264407d86cf2d32a3f');
I$('97a193361550060e67f7837be61187b5',function (_t,_k,_e,_p,_o,_f,_r){
    var _pro;
    /**
     * 样式加载器
     *
     * @class   module:util/ajax/loader/style._$$LoaderStyle
     * @extends module:util/ajax/loader/loader._$$LoaderAbstract
     *
     * @param   {Object} config - 可选配置参数
     */
    _p._$$LoaderStyle = _k._$klass();
    _pro = _p._$$LoaderStyle._$extend(_t._$$LoaderAbstract);
    /**
     * 取资源载入控件
     *
     * @protected
     * @method module:util/ajax/loader/style._$$LoaderStyle#__getRequest
     * @return {Node} 控件节点
     */
    _pro.__getRequest = function(){
        return _e._$create('link');
    };
    /**
     * 资源载入
     *
     * @protected
     * @method module:util/ajax/loader/style._$$LoaderStyle#__doRequest
     * @param  {Node} 控件节点
     * @return {Void}
     */
    _pro.__doRequest = function(_request){
        _request.href = this.__url;
        document.head.appendChild(_request);
    };

    return _p;
},'d4d1cd9341f1ae03363136541b2b61e5','7d45f691904093dd3d0d2a39eb337c1c','43a92a1cb30f0322e2bca627e0f6b635');
I$('3538e7607f6f816e25cd8ae833d5266a',function (_t,_k,_e,_p,_o,_f,_r){
    var _pro;
    /**
     * 脚本加载器
     * 
     * @class    module:util/ajax/loader/script._$$LoaderScript
     * @extends  module:util/ajax/loader/loader._$$LoaderAbstract
     * 
     * @param    {Object} config   - 可选配置参数
     * @property {Boolean} async   - 异步载入并立刻执行，默认为!0
     * @property {String}  charset - 脚本编码
     */
    _p._$$LoaderScript = _k._$klass();
    _pro = _p._$$LoaderScript._$extend(_t._$$LoaderAbstract);
    /**
     * 控件重置
     * 
     * @protected
     * @method module:util/ajax/loader/script._$$LoaderScript#__reset
     * @param  {Object} arg0 - 可选配置参数
     * @return {Void}
     */
    _pro.__reset = function(_options){
        this.__super(_options);
        this.__async = _options.async;
        this.__charset = _options.charset;
        this.__qopt.async = !1;
        this.__qopt.charset = this.__charset;
    };
    /**
     * 取资源载入控件
     * 
     * @protected
     * @method module:util/ajax/loader/script._$$LoaderScript#__getRequest
     * @return {Script} 控件
     */
    _pro.__getRequest = function(){
        var _request = _e._$create('script');
        if (this.__async!=null){
            _request.async = !!this.__async;
        }
        if (this.__charset!=null){
            _request.charset = this.__charset;
        }
        return _request;
    };
    /**
     * 删除控件
     * 
     * @protected
     * @method module:util/ajax/loader/script._$$LoaderScript#__doClearRequest
     * @param  {Node} arg0 - 控件节点
     * @return {Void}
     */
    _pro.__doClearRequest = function(_request){
        _e._$remove(_request);
    };
    
    return _p;
},'d4d1cd9341f1ae03363136541b2b61e5','7d45f691904093dd3d0d2a39eb337c1c','43a92a1cb30f0322e2bca627e0f6b635');
I$('c2e3bbcbfb91469d1fdea97731063a2e',function (NEJ,_t0,_t1,_t2,_t3,_p,_o,_f,_r){
    /**
     * 载入完成回调函数
     *
     * @callback module:util/ajax/tag.onload
     * @param    {Variable} event - 请求返回数据
     */
    /**
     * 载入出错回调函数
     *
     * @callback module:util/ajax/tag.onerror
     * @param    {Object} event   - 错误信息
     * @property {Number} code    - 错误码
     * @property {String} message - 错误信息
     */
    /**
     * 载入脚本文件
     *
     * 脚本举例
     * ```javascript
     * NEJ.define([
     *     'util/ajax/tag'
     * ],function(_j){
     *     _j._$loadScript('../../../javascript/log.js',{
     *         onload:function(){
     *             // 载入成功的回调方法
     *         },
     *         onerror:function(_error){
     *             // 抛出异常回调
     *         }
     *     });
     * });
     * ```
     *
     * @method   module:util/ajax/tag._$loadScript
     * @see      module:util/ajax/tag._$queueScript
     * @param    {String}  arg0    - 请求地址
     * @param    {Object}  arg1    - 可选配置参数
     * @property {Boolean} async   - 异步载入并立刻执行，默认为!0
     * @property {Number}  timeout - 超时时间,0表示禁止超时监测
     * @property {String}  version - 版本信息
     * @property {String}  charset - 脚本编码
     * @property {module:util/ajax/tag.onload}  onload  - 载入回调
     * @property {module:util/ajax/tag.onerror} onerror - 异常回调
     * @return   {Void}
     */
    _p._$loadScript = function(_url,_options){
        _t3._$$LoaderScript._$allocate(_options)._$load(_url);
    };
    /**
     * 载入队列脚本并依次执行
     *
     * 脚本举例
     * ```javascript
     * NEJ.define([
     *     'util/ajax/tag'
     * ],function(_j){
     *     _j._$queueScript([
     *         '../../../javascript/log.js',
     *         'http://123.163.com/a.js'
     *     ],{
     *         onload:function(){
     *            // 载入成功的回调方法
     *         },
     *         onerror:function(_error){
     *            // 异常回调方法
     *         }
     *     });
     * });
     * ```
     *
     * @method   module:util/ajax/tag._$queueScript
     * @see      module:util/ajax/tag._$loadScript
     * @param    {Array}  arg0    - 脚本队列
     * @param    {Object} arg1    - 可选配置参数
     * @property {String} version - 版本信息
     * @property {String} charset - 脚本编码
     * @property {Number} timeout - 每个脚本超时时间,0表示禁止超时监测
     * @property {module:util/ajax/tag.onload}  onload  - 载入回调
     * @property {module:util/ajax/tag.onerror} onerror - 异常回调
     * @return   {Void}
     */
    _p._$queueScript = function(_list,_options){
        _t3._$$LoaderScript._$allocate(_options)._$queue(_list);
    };
    /**
     * 载入样式文件
     * ```javascript
     * NEJ.define([
     *     'util/ajax/tag'
     * ],function(_j){
     *     _j._$loadStyle('http://123.163.com/a.css',{
     *         onload:function(){
     *             // 载入成功的回调方法
     *         },
     *         onerror:function(_error){
     *             // 异常回调方法
     *         }
     *     });
     * });
     * ```
     *
     * @method   module:util/ajax/tag._$loadStyle
     * @see      module:util/ajax/tag._$queueStyle
     * @param    {String} arg0    - 样式文件地址
     * @param    {Object} arg1    - 可选配置参数
     * @property {Number} timeout - 超时时间,0表示禁止超时监测
     * @property {String} version - 版本信息
     * @property {module:util/ajax/tag.onload}  onload  - 载入回调
     * @property {module:util/ajax/tag.onerror} onerror - 异常回调
     * @return   {Void}
     */
    _p._$loadStyle = function(_url,_options){
        _t2._$$LoaderStyle._$allocate(_options)._$load(_url);
    };
    /**
     * 载入样式队列
     *
     * 脚本举例
     * ```javascript
     * NEJ.define([
     *     'util/ajax/tag'
     * ],function(_j){
     *     _j._$queueStyle([
     *         'http://123.163.com/a.css',
     *         'http://123.163.com/b.css'
     *     ],{
     *         onload:function(){
     *             // 载入成功的回调方法
     *         },
     *         onerror:function(_error){
     *             // 异常回调方法
     *         }
     *     });
     * });
     * ```
     *
     * @method   module:util/ajax/tag._$queueStyle
     * @see      module:util/ajax/tag._$loadStyle
     * @param    {Array}  arg0    - 样式队列
     * @param    {Object} arg1    - 可选配置参数
     * @property {Number} timeout - 超时时间,0表示禁止超时监测
     * @property {String} version - 版本信息
     * @property {module:util/ajax/tag.onload}  onload  - 载入回调
     * @property {module:util/ajax/tag.onerror} onerror - 异常回调
     * @return   {Void}
     */
    _p._$queueStyle = function(_list,_options){
        _t2._$$LoaderStyle._$allocate(_options)._$queue(_list);
    };
    /**
     * 载入HTML文件
     *
     * 脚本举例
     * ```javascript
     * NEJ.define([
     *     'util/ajax/tag'
     * ],function(_j){
     *     _j._$loadHtml('http://123.163.com/a.html',{
     *         onload:function(){
     *             // 载入成功的回调方法
     *         },
     *         onerror:function(_error){
     *             // 异常回调方法
     *         }
     *     });
     * });
     * ```
     *
     * @method   module:util/ajax/tag._$loadHtml
     * @param    {String} arg0    - 文件地址
     * @param    {Object} arg1    - 可选配置参数
     * @property {String} version - 版本信息
     * @property {module:util/ajax/tag.onload}  onload  - 载入回调
     * @property {module:util/ajax/tag.onerror} onerror - 异常回调
     * @return   {Void}
     */
    _p._$loadHtml = function(_url,_options){
        _t1._$$LoaderHtml._$allocate(_options)._$load(_url);
    };
    /**
     * 载入HTML文件
     *
     * 脚本举例
     * ```javascript
     * NEJ.define([
     *     'util/ajax/tag'
     * ],function(_j){
     *     _j._$loadText('http://123.163.com/a.txt',{
     *         onload:function(){
     *             // 载入成功的回调方法
     *         },
     *         onerror:function(_error){
     *             // 异常回调方法
     *         }
     *     });
     * });
     * ```
     *
     * @method   module:util/ajax/tag._$loadText
     * @param    {String} arg0    - 文件地址
     * @param    {Object} arg1    - 可选配置参数
     * @property {String} version - 版本信息
     * @property {module:util/ajax/tag.onload}  onload  - 载入回调
     * @property {module:util/ajax/tag.onerror} onerror - 异常回调
     * @return {Void}
     */
    _p._$loadText = function(_url,_options){
        _t0._$$LoaderText._$allocate(_options)._$load(_url);
    };

    if (CMPT){
        NEJ.copy(NEJ.P('nej.j'),_p);
    }

    return _p;
},'083c017e2a5450e295d417651bc93279','887198cb312fa73fdd5736868cacf8ad','17d5f1c88f21d84280a6e4699efbdf85','97a193361550060e67f7837be61187b5','3538e7607f6f816e25cd8ae833d5266a');
I$('73f169cf794774f1be9fb45582c96a38',function (NEJ,_u,_v,_e,_b,_y,_t,_j0,_j1,_x,_p,_o,_f,_r){
    var _cache = {}, // template cache
        _skey  = (+new Date)+'-';
    /**
     * 解析模板集合
     *
     * 结构举例
     * ```html
     * <textarea name="jst" id="jst-box">
     *     <div>${name}</div>
     * </textarea>
     * <textarea name="txt" id="txt-box">
     *     <div>pure text</div>
     * </textarea>
     * <textarea name="ntp" id="ntp-box">
     *     <div>ntp</div>
     * </textarea>
     * <textarea name="js" id="js-box" data-src='/nej-baseline/src/define.js'></textarea>
     * <textarea name="css" id="css-box" data-src='/nej-baseline/qunit/base/qunit.css'></textarea>
     * <textarea name="html" id="html-box" data-src='/nej-baseline/qunit/html/ui/audioTest.html'></textarea>
     * <textarea name="res" id="res-box" data-src='http://pagead2.googlesyndication.com/simgad/15167196758298977737'></textarea>
     * ```
     *
     * 脚本举例
     * ```javascript
     * NEJ.define([
     *     'util/template/tpl'
     * ],function(_p){
     *     // 调用_$add接口缓存模版，id为key
     *     // 要用的时候通过_$get(key,{数据})合并模版后返回字符串
     *     _p._$parseTemplate('jst-box');
     *     // 生成结果：<div>jack</div>
     *     _p._$getTextTemplate('jst-box').trim();
     *
     *     // 通过_$addTextTemplate接口缓存纯文本,id为key
     *     _p._$parseTemplate('txt-box');
     *     // 要用的时候通过_e._$getTextTemplate(key)取到纯文本
     *     _p._$getTextTemplate('txt-box')
     *
     *
     *     // 通过_$addNodeTemplate接口缓存节点，第一次如果是字符串，缓存字符串，id为key
     *     _p._$parseTemplate('ntp-box');
     *     // 要用的时候通过_$getNodeTemplate('ntp-box')取出节点，
     *     // 如果缓存中是字符串,取的时候要重新转换成节点，然后重新缓存一边，下次直接是取节点
     *     _p._$getNodeTemplate('ntp-box');
     *
     *     // 加载id为js-box的textarea节点data-src指定的js文件
     *     _p._$parseTemplate('js-box');
     *
     *     // 加载id为css-box的textarea节点data-src指定的css文件
     *     _p._$parseTemplate('css-box');
     *
     *     // 加载id为html-box的textarea节点data-src指定的html文件
     *     _p._$parseTemplate('html-box');
     *
     *     // 加载id为res-box的textarea节点data-src指定的纯文本文件
     *     _p._$parseTemplate('res-box');
     * });
     * ```
     *
     * @method   module:util/template/tpl._$parseTemplate
     * @param    {String|Node} arg0 - 模板集合节点
     * @param    {Object}      arg1 - 可选配置参数
     * @property {String}      root - 根路径，相对规则
     * @return   {Void}
     */
    /**
     * @method CHAINABLE._$parseTemplate
     * @see module:util/template/tpl._$parseTemplate
     */
    _p._$parseTemplate = (function(){
        var _count = 0;
        var _doCheckReady = function(){
            if (_count>0) return;
            _count = 0;
            _v._$dispatchEvent(document,'templateready');
            _v._$clearEvent(document,'templateready');
        };
        var _doParseSrc = function(_textarea,_options){
            var _src = _e._$dataset(_textarea,'src');
            if (!_src) return;
            _options = _options||_o;
            var _root = _options.root;
            if (!_root){
                _root = _textarea.ownerDocument.location.href;
            }else{
                _root = _u._$absolute(_root);
            }
            _src = _src.split(',');
            _u._$forEach(_src,function(_value,_index,_list){
                _list[_index] = _u._$absolute(_value,_root);
            });
            return _src;
        };
        var _doDumpContent = function(_node){
            // bugfix textarea content not corrent for safari in mac 
            if (_b._$is('mac')&&_b._$KERNEL.browser==='safari'){
                return _u._$unescape(_node.innerHTML);
            }else{
                return _node.value||_node.innerText||'';
            }
        };
        var _doAddStyle = function(_textarea,_options){
            if (!_textarea) return;
            var _src = _doParseSrc(_textarea,_options);
            if (!!_src){
                _j0._$queueStyle(_src,{
                    version:_e._$dataset(_textarea,'version')
                });
            }
            _e._$addStyle(_textarea.value);
        };
        var _onAddScript = function(_value){
            _count--;
            _e._$addScript(_value);
            _doCheckReady();
        };
        var _doAddScript = function(_textarea,_options){
            if (!_textarea) return;
            var _src = _doParseSrc(_textarea,_options),
                _val = _textarea.value;
            if (!!_src){
                _count++;
                var _options = {
                    version:_e._$dataset(_textarea,'version'),
                    onload:_onAddScript._$bind(null,_val)
                };
                window.setTimeout(
                    _j0._$queueScript._$bind(
                        _j0,_src,_options
                    ),0
                );
                return;
            }
            _e._$addScript(_val);
        };
        var _onAddHtml = function(_body){
            _count--;
            _p._$parseTemplate(_body);
            _doCheckReady();
        };
        var _doAddHtml = function(_textarea,_options){
            if (!_textarea) return;
            var _src = _doParseSrc(_textarea,_options)[0];
            if (!!_src){
                _count++;
                var _options = {
                    version:_e._$dataset(_textarea,'version'),
                    onload:_onAddHtml
                };
                window.setTimeout(
                    _j0._$loadHtml._$bind(
                        _j0,_src,_options
                    ),0
                );
            }
        };
        var _onAddTextResource = function(_id,_text){
            _count--;
            _p._$addTextTemplate(_id,_text||'');
            _doCheckReady();
        };
        var _doAddTextResource = function(_textarea,_options){
            if (!_textarea||!_textarea.id) return;
            var _id = _textarea.id,
                _src = _doParseSrc(_textarea,_options)[0];
            if (!!_src){
                _count++;
                var _url = _src+(_src.indexOf('?')<0?'?':'&')+
                          (_e._$dataset(_textarea,'version')||''),
                    _options = {
                        type:'text',
                        method:'GET',
                        onload:_onAddTextResource._$bind(null,_id)
                    };
                window.setTimeout(
                    _j1._$request._$bind(
                        _j1,_url,_options
                    ),0
                );
            }
        };
        var _doAddTemplate = function(_node,_options){
            var _type = _node.name.toLowerCase();
            //console.debug(_type+'<'+_node.id+'> : '+_node.value.replace(/\n/g,' '));
            switch(_type){
                case 'jst':
                    _y._$addTemplate(_doDumpContent(_node),_node.id);
                return;
                case 'txt':
                    _p._$addTextTemplate(_node.id,_doDumpContent(_node));
                return;
                case 'ntp':
                    _p._$addNodeTemplate(_doDumpContent(_node),_node.id);
                return;
                case 'js':
                    _doAddScript(_node,_options);
                return;
                case 'css':
                    _doAddStyle(_node,_options);
                return;
                case 'html':
                    _doAddHtml(_node,_options);
                return;
                case 'res':
                    _doAddTextResource(_node,_options);
                return;
            }
        };
        /**
         * 模版准备完毕触发事件，包括所有外联模版载入完成
         *
         * 结构举例
         * ```html
         * <div id="template-box">
         *   <textarea name="jst">
         *     jst tempalte here
         *   </textarea>
         *   <!-- text template with id="txt-id-1" in widget.html -->
         *   <textarea name="html" data-src="./widget.html"></textarea>
         * </div>
         * ```
         *
         * 脚本举例
         * ```javascript
         * NEJ.define([
         *     'base/event'
         *     'util/template/tpl'
         * ],function(_v,_e){
         *     // 解析模版集合
         *     _e._$parseTemplate('template-box');
         *
         *     // 在templateready事件中使用外联模版可以保证正确性
         *     _v._$addEvent(
         *         document,'templateready',
         *         function(_event){
         *             var _text = _e._$getTextTemplate('txt-id-1');
         *             // TODO
         *         }
         *     );
         * });
         * ```
         *
         * @event    external:document.ontemplateready
         * @param    {Object} event - 事件信息
         */
        _t._$$CustomEvent._$allocate({
            element:document,
            event:'templateready',
            oneventadd:_doCheckReady
        });
        return function(_element,_options){
            _element = _e._$get(_element);
            if (!!_element){
                var _list = _element.tagName=='TEXTAREA' ? [_element]
                          : _u._$object2array(
                                _element.getElementsByTagName('textarea')
                            );
                _u._$forEach(_list,function(_node){
                    _doAddTemplate(_node,_options);
                });
                _e._$remove(_element,!0);
            }
            _doCheckReady();
        };
    })();
    /**
     * 添加文本模板
     *
     * 脚本举例
     * ```javascript
     * // 通过_e._$addTextTemplate接口缓存纯文本,id为key
     * _e._$addTextTemplate('txt-box','i am content');
     * // 要用的时候通过_e._$getTextTemplate(key)取到纯文本
     * _e._$getTextTemplate('txt-box')
     * ```
     *
     * @method module:util/template/tpl._$addTextTemplate
     * @see    module:util/template/tpl._$getTextTemplate
     * @param  {String} arg0 - 模板键值
     * @param  {String} arg1 - 模板内容
     * @return {Void}
     */
    _p._$addTextTemplate = function(_key,_value){
        _cache[_key] = _value||'';
    };
    /**
     * 取文本模板
     *
     * 脚本举例
     * ```javascript
     * NEJ.define([
     *     'util/template/tpl'
     * ],function(_p){
     *     // 通过_$addTextTemplate接口缓存纯文本,id为key
     *     _p._$addTextTemplate('txt-box','i am content');
     *     // 要用的时候通过_$getTextTemplate(key)取到纯文本
     *     _p._$getTextTemplate('txt-box')
     * });
     * ```
     *
     * @method module:util/template/tpl._$getTextTemplate
     * @see    module:util/template/tpl._$addTextTemplate
     * @param  {String} arg0 - 模板键值
     * @return {String}        模板内容
     */
    _p._$getTextTemplate = function(_key){
        return _cache[_key]||'';
    };
    /**
     * 添加节点模板
     *
     * 脚本举例
     * ```javascript
     * NEJ.define([
     *     'util/template/tpl'
     * ],function(_p){
     *     // 通过_$addNodeTemplate接口缓存节点，第一次如果是字符串，缓存字符串，id为key
     *     _p._$addNodeTemplate(node,'ntp-box');
     *     // 要用的时候通过_$getNodeTemplate('ntp-box')取出节点，
     *     // 如果缓存中是字符串,取的时候要重新转换成节点，然后重新缓存一边，下次直接是取节点
     *     _p._$getNodeTemplate('ntp-box');
     * });
     * ```
     *
     * @method module:util/template/tpl._$addNodeTemplate
     * @see    module:util/template/tpl._$getNodeTemplate
     * @param  {String|Node} arg0 - 模板
     * @param  {String}      arg1 - 模板序列号
     * @return {String}             模板序列号
     */
    /**
     * @method CHAINABLE._$addNodeTemplate
     * @see module:util/template/tpl._$addNodeTemplate
     */
    _p._$addNodeTemplate = function(_element,_key){
        _key = _key||_u._$uniqueID();
        _element = _e._$get(_element)||_element;
        _p._$addTextTemplate(_skey+_key,_element);
        if (!_u._$isString(_element)){
            _e._$removeByEC(_element);
        }
        return _key;
    };
    /**
     * 取节点模板
     *
     * 脚本举例
     * ```javascript
     * NEJ.define([
     *     'util/template/tpl'
     * ],function(_p){
     *     // 通过_$addNodeTemplate接口缓存节点，第一次如果是字符串，缓存字符串，id为key
     *     _p._$addNodeTemplate('txt-box');
     *     // 要用的时候通过_$getNodeTemplate('ntp-box')取出节点，
     *     // 如果缓存中是字符串,取的时候要重新转换成节点，然后重新缓存一边，下次直接是取节点
     *     _p._$getNodeTemplate('ntp-box');
     * });
     * ```
     *
     * @method module:util/template/tpl._$getNodeTemplate
     * @see    module:util/template/tpl._$addNodeTemplate
     * @param  {String} arg0 - 模板序列号
     * @return {Node}          节点模板
     */
    _p._$getNodeTemplate = function(_key){
        if (!_key) return null;
        _key = _skey+_key;
        var _value = _p._$getTextTemplate(_key);
        if (!_value) return null;
        var _node;
        if (_u._$isString(_value)){
            _value = _e._$html2node(_value);
            // bugfix: https://connect.microsoft.com/IE/feedback/details/811408
            var _list = _value.getElementsByTagName('textarea');
            if (_value.tagName!='TEXTAREA'&&
               (!_list||!_list.length)){
                _p._$addTextTemplate(_key,_value);
            }else{
                _node = _value;
            }
        }
        // clone node and push to memory
        if (!_node){
            _node = _value.cloneNode(!0);
        }
        _e._$removeByEC(_node);
        return _node;
    };
    /**
     * 取ITEM模板列表
     *
     * 结构举例
     * ```html
     * <div id="item-box"></div>
     * ```
     *
     * 脚本举例
     * ```javascript
     * NEJ.define([
     *     'base/klass',
     *     'ui/item/item',
     *     'util/template/tpl'
     * ],function(_k,_i,_t,_p){
     *     var _pro;
     *     var _html_key = _t._$addNodeTemplate('<div>123</div>');
     *
     *     _p._$$MyItem = _k._$klass();
     *     _pro = _p._$$MyItem._$extend(_i._$$Item);
     *
     *     _pro.__reset = function(_options){
     *         this.__data = _options.data;
     *         this.__super(_options);
     *     }
     *
     *     _pro.__doRefresh = function(){
     *         this.__body.innerText = this.__data.name;
     *     };
     *
     *     _pro.__initXGui = function(){
     *         this.__seed_html = _html_key;
     *     };
     *
     *     return _p;
     * });
     * ```
     *
     * 脚本举例
     * ```javascript
     * NEJ.define([
     *     '/path/to/my/item.js',
     *     'util/template/tpl'
     * ],function(_t,_p){
     *     // _$getItemTemplate接口生成item列表
     *     // 返回一个item的列表，可以循环调用_$recycle()，来销毁
     *     var _items = _p._$getItemTemplate(
     *         [{name:'jack'},{name:'sean'}],
     *         _t._$$MyItem,{parent:'item-box'}
     *     );
     * });
     * ```
     *
     * @method   module:util/template/tpl._$getItemTemplate
     * @param    {Array}   arg0   - 数据列表
     * @param    {module:ui/item/item._$$Item} arg1   - 列表项构造函数
     * @param    {Object}  arg2   - 可选配置参数，其他参数参见item指定的构造函数的配置参数
     * @property {Number}  offset - 起始指针【包含】，默认0
     * @property {Number}  limit  - 分配数据长度或者数量，默认为列表长度
     * @return   {Array}            ITEM模板列表
     */
    _p._$getItemTemplate = (function(){
        var _doFilter = function(_value,_key){
            return _key=='offset'||_key=='limit';
        };
        return function(_list,_item,_options){
            var _arr = [];
            if (!_list||!_list.length||!_item){
                return _arr;
            }
            _options = _options||_o;
            var _len = _list.length,
                _beg = parseInt(_options.offset)||0,
                _end = Math.min(_len,_beg+(
                       parseInt(_options.limit)||_len)),
                _opt = {total:_list.length,range:[_beg,_end]};
            _u._$merge(_opt,_options,_doFilter);
            for(var i=_beg,_instance;i<_end;i++){
                _opt.index = i;
                _opt.data = _list[i];
                _instance = _item._$allocate(_opt);
                var _id = _instance._$getId();
                _cache[_id] = _instance;
                _instance._$recycle =
                _instance._$recycle._$aop(
                    function(_id,_instance){
                        delete _cache[_id];
                        delete _instance._$recycle;
                    }._$bind(null,_id,_instance));
                _arr.push(_instance);
            }
            return _arr;
        };
    })();
    /**
     * 根据ID取列表项对象
     *
     * 脚本举例
     * ```javascript
     * NEJ.define([
     *     'util/template/tpl'
     * ],function(_p){
     *     // 通过id拿某一项item
     *     // id是生成item的时候，'itm'+日期字符串生成,存在于_instance.__id变量中
     *     var _item = _p._$getItemById('itm-123');
     * });
     * ```
     *
     * @method module:util/template/tpl._$getItemById
     * @param  {String} arg0 - 列表项
     * @return {module:ui/item/item._$$Item} 列表项实例
     */
    _p._$getItemById = function(_id){
        return _cache[_id];
    };
    /**
     * 解析UI模板集合
     *
     * @method module:util/template/tpl._$parseUITemplate
     * @param  {String} html - 待解析字符串
     * @param  {Object} map  - 模版id的对应map
     * @return {Object} 模版id的map
     */
    _p._$parseUITemplate = (function(){
        var _reg = /#<(.+?)>/;
        return function(_html,_map){ // {abc:'eeee'} // #<abc>
            _map = _map||{};
            var _element = _e._$html2node(_html);
            _u._$forIn(
                _element.getElementsByTagName('textarea'),
                function(_textarea){
                    _textarea.id = (_textarea.id||'').replace(
                        _reg,function($1,$2){
                            var _id = _map[$2];
                            if (!_id){
                                _id = 'tpl-'+_u._$uniqueID();
                                _map[$2] = _id;
                            }
                            return _id;
                        }
                    );
                }
            );
            _p._$parseTemplate(_element);
            return _map;
        };
    })();
    // for chainable method
    _x._$merge({
        _$parseTemplate:_p._$parseTemplate,
        _$addNodeTemplate:_p._$addNodeTemplate
    });

    if (CMPT){
        NEJ.copy(NEJ.P('nej.e'),_p);
    }

    return _p;
},'083c017e2a5450e295d417651bc93279','3695926c26a1894dcce266fdc52d2e3a','0dd9ac3de45a7a1ce7c2f3ff80d53fcc','43a92a1cb30f0322e2bca627e0f6b635','d552af5339ac27c31f311f3fdadefdc3','01daafc45eed32c99fa66fa6bd62337a','df1fd1a19dd83f534a4afd4e03e3b8a0','c2e3bbcbfb91469d1fdea97731063a2e','be138b98c209a9dceaea0fb54e8cbde1','9964aa517a3b6122213b910cbdd3428e');
cant read file /Users/voidsky/project/nej项目/prj/easytodo/webapp/src/javascript/lib/nej/util/history/history.js for utf-8, cause:
{"errno":-2,"code":"ENOENT","syscall":"open","path":"/Users/voidsky/project/nej项目/prj/easytodo/webapp/src/javascript/lib/nej/util/history/history.js"}
I$('41acb32203547e00abf26d38d541f1cc',function (NEJ,_k,_u,_t,_p,_o,_f,_r){
    var _pro;
    /**
     * 树节点对象
     * 
     * 脚本举例
     * ```javascript
     * NEJ.define([
     *     'util/dispatcher/dsp/node'
     * ],function(_p){
     *     //      ___
     *     //     |_/_|       <-- 节点名称为"/"的节点
     *     //     /   \
     *     //   _/_   _\_ 
     *     //  |_a_| |_b_|    <-- 节点名称为"b"的节点
     * 
     *     // 分配一个名称为“/”的节点
     *     var _root = _p._$$Node._$allocate();
     * 
     *     // 分配一个名称为“a”的节点，并指定父节点为_root
     *     var _node = _p._$$Node._$allocate({
     *         parent:_root,
     *         name:'a'
     *     });
     * 
     *     // 分配一个名称为“b”的节点，手动设置父节点
     *     var _node = _$$Node._$allocate({
     *         name:'b'
     *     });
     *     _node._$setParent(_root);
     * 
     *     // 回收树，同时回收节点的所有子孙节点
     *     _root = _root._$recycle();
     * });
     * ```
     * 
     * @class    module:util/dispatcher/dsp/node._$$Node
     * @extends  module:util/event._$$EventTarget
     * 
     * @param    {Object}  config - 可选配置参数
     * @property {_$$Node} parent - 父节点
     * @property {String}  name   - 节点名称，默认为"/"
     * @property {Object}  data   - 节点缓存的数据信息
     */
    _p._$$Node = _k._$klass();
    _pro = _p._$$Node._$extend(_t._$$EventTarget);
    /**
     * 控件初始化
     * 
     * @protected
     * @method module:util/dispatcher/dsp/node._$$Node#__init
     * @return {Void}
     */
    _pro.__init = function(){
        this.__super();
        this.__children = [];
    };
    /**
     * 控件重置
     * 
     * @protected
     * @method module:util/dispatcher/dsp/node._$$Node#__reset
     * @param  {Object} arg0 - 可选配置参数
     * @return {Void}
     */
    _pro.__reset = function(_options){
        this.__super(_options);
        this._$setParent(_options.parent);
        this.__name = _options.name||'/';
        this.__data = _options.data||{};
    };
    /**
     * 控件销毁
     * 
     * @protected
     * @method module:util/dispatcher/dsp/node._$$Node#__destroy
     * @return {Void}
     */
    _pro.__destroy = (function(){
        var _doRecycle = function(_node,_index,_list){
            _list.splice(_index,1);
            _node._$recycle();
        };
        return function(){
            this.__super();
            delete this.__data;
            _u._$reverseEach(
                this.__children,
                _doRecycle
            );
            this._$setParent(null);
        };
    })();
    /**
     * 是否节点实例
     * 
     * @protected
     * @method module:util/dispatcher/dsp/node._$$Node#__isNode
     * @param  {module:util/dispatcher/dsp/node._$$Node} arg0 - 节点
     * @return {Boolean} 是否节点实例
     */
    _pro.__isNode = function(_node){
        return _node instanceof this.constructor;
    };
    /**
     * 是否有子节点
     * 
     * @protected
     * @method module:util/dispatcher/dsp/node._$$Node#__hasChild
     * @param  {module:util/dispatcher/dsp/node._$$Node} arg0 - 子节点
     * @return {Boolean} 是否有子节点
     */
    _pro.__hasChild = function(_child){
        return _u._$indexOf(this.__children,_child)>=0;
    };
    /**
     * 取节点名称
     * 
     * @method module:util/dispatcher/dsp/node._$$Node#_$getName
     * @return {String} 节点名称
     */
    _pro._$getName = function(){
        return this.__name;
    };
    /**
     * 取节点保存的信息
     * 
     * @method module:util/dispatcher/dsp/node._$$Node#_$getData
     * @return {Object} 数据信息
     */
    _pro._$getData = function(){
        return this.__data;
    };
    /**
     * 取当前节点路径
     * 
     * @method module:util/dispatcher/dsp/node._$$Node#_$getPath
     * @return {String} 路径
     */
    _pro._$getPath = function(){
        var _parent = this._$getParent(),
            _name = this._$getName();
        if (!_parent) return _name;
        var _pname = _parent._$getName();
        if (_pname!='/'&&_name!='/')
            _name = '/'+_name;
        return _parent._$getPath()+_name;
    };
    /**
     * 取父节点
     * 
     * @method module:util/dispatcher/dsp/node._$$Node#_$getParent
     * @return {_$$Node} 父节点
     */
    _pro._$getParent = function(){
        return this.__parent;
    };
    /**
     * 取子节点列表
     * 
     * @method module:util/dispatcher/dsp/node._$$Node#_$getChildren
     * @return {Array} 子节点列表
     */
    _pro._$getChildren = function(){
        return this.__children;
    };
    /**
     * 取指定名称的子节点
     * 
     * @method module:util/dispatcher/dsp/node._$$Node#_$getChildByName
     * @param  {String} arg0 - 名称
     * @return {module:util/dispatcher/dsp/node._$$Node} 子节点
     */
    _pro._$getChildByName = function(_name){
        var _index = _u._$indexOf(
            this.__children,function(_node){
                return _name==_node._$getName();
            }
        );
        return this.__children[_index]||null;
    };
    /**
     * 设置父节点
     * 
     * @method module:util/dispatcher/dsp/node._$$Node#_$setParent
     * @param  {module:util/dispatcher/dsp/node._$$Node} arg0 - 父节点
     * @return {Void}
     */
    _pro._$setParent = function(_parent){
        _parent = this.__isNode(_parent)?_parent:null;
        if (_parent==this.__parent) return;
        !!_parent ? _parent._$appendChild(this)
                  : this.__parent._$removeChild(this);
        this.__parent = _parent;
    };
    /**
     * 添加子节点
     * 
     * @method module:util/dispatcher/dsp/node._$$Node#_$appendChild
     * @param  {module:util/dispatcher/dsp/node._$$Node} arg0 - 子节点
     * @return {Void}
     */
    _pro._$appendChild = function(_child){
        _child = this.__isNode(_child)?_child:null;
        if (!_child||this.__hasChild(_child)) return;
        this.__children.push(_child);
        _child._$setParent(this);
    };
    /**
     * 删除子节点
     * 
     * @method module:util/dispatcher/dsp/node._$$Node#_$removeChild
     * @param  {module:util/dispatcher/dsp/node._$$Node} arg0 - 子节点
     * @return {module:util/dispatcher/dsp/node._$$Node} 删除的节点
     */
    _pro._$removeChild = function(_child){
        _child = this.__isNode(_child)?_child:null;
        var _index = _u._$indexOf(this.__children,_child);
        if (_index>=0){
            this.__children.splice(_index,1);
            _child._$setParent(null);
        }
        return _child;
    };
    
    return _p;
},'083c017e2a5450e295d417651bc93279','7d45f691904093dd3d0d2a39eb337c1c','3695926c26a1894dcce266fdc52d2e3a','5dc30961f3452903950eb8a25e3d2109');
I$('2d9f3e261792e3200572a50c66511cea',function (_u,_t0,_t1,_p,_o,_f,_r){
    /*
     * 解析UMI对应的节点
     * @param  {_$$Node}  根节点
     * @param  {String}   UMI值
     * @param  {Function} 解析过程处理函数
     * @return {_$$Node}  对应节点
     */
    var _doParseUMI = function(_root,_umi,_hanlder){
        var _node = _root,
            _hanlder = _hanlder||_f;
        if (_umi!='/'){
            _u._$forEach(
                _umi.split('/'),function(_name){
                    var _result = _hanlder(_node,_name);
                    if (!_result) 
                        return !0;
                    _node = _result;
                }
            );
        }
        return _node;
    };
    /**
     * 根据UMI取对应的节点
     * 
     * @method module:util/dispatcher/dsp/util._$getNodeByUMI
     * @param  {module:util/dispatcher/dsp/node._$Node} arg0 - 根节点
     * @param  {String} arg1 - UMI值
     * @return {module:util/dispatcher/dsp/node._$Node} UMI对应的节点
     */
    _p._$getNodeByUMI = (function(){
        var _doSearch = function(_parent,_name){
            var _name = _name||'/',
                _pname = _parent._$getName();
            if (_pname=='/'&&_name=='/')
                return _parent;
            return _parent._$getChildByName(_name);
        };
        return function(_root,_umi){
            return _doParseUMI(_root,_umi,_doSearch);
        };
    })();
    /**
     * 根据UMI追加对应的节点
     * 
     * @method module:util/dispatcher/dsp/util._$appendNodeByUMI
     * @param  {module:util/dispatcher/dsp/node._$Node} arg0 - 根节点
     * @param  {String} arg1 - UMI值
     * @return {module:util/dispatcher/dsp/node._$Node} UMI对应的节点
     */
    _p._$appendNodeByUMI = (function(){
        // build tree
        var _doBuild = function(_parent,_name){
            var _pname = _parent._$getName();
            // root not add slash child
            if (!_name&&_pname=='/'){
                return _parent;
            }
            var _node = null;
            // check slash child first
            if (_pname!='/'){
                _node = _parent._$getChildByName('/');
                if (!_node){
                    _node = _t0._$$Node._$allocate();
                    _parent._$appendChild(_node);
                }
            }
            // check non-slash child
            if (!!_name){
                _node = _parent._$getChildByName(_name);
                if (!_node){
                    _node = _t0._$$Node._$allocate({name:_name});
                    _parent._$appendChild(_node);
                }
            }
            return _node;
        };
        return function(_root,_umi){
            return _doParseUMI(_root,_umi,_doBuild);
        };
    })();
    /**
     * 取两个节点的公共
     * 
     * @method module:util/dispatcher/dsp/util._$getCommonRoot
     * @param  {module:util/dispatcher/dsp/node._$Node} arg0 - 匹配节点
     * @param  {module:util/dispatcher/dsp/node._$Node} arg1 - 匹配节点
     * @return {module:util/dispatcher/dsp/node._$Node}        公共节点
     */
    _p._$getCommonRoot = function(_root,_source,_target){
        if (!_source||!_target) return _root;
        var _source = _source._$getPath().split('/'),
            _target = _target._$getPath().split('/'),
            _difidx = _u._$forIn(
                _source,function(_value,_index){
                    if (_value!=_target[_index]){
                        return !0;
                    }
                }
            )||1,
            _umi = _source.splice(0,_difidx).join('/')||'/';
        return _p._$getNodeByUMI(_root,_umi);
    };
    /**
     * 广度优先搜索
     * 
     * @method module:util/dispatcher/dsp/util._$breadthFirstSearch
     * @param  {module:util/dispatcher/dsp/node._$Node} arg0 - 起始节点
     * @param  {Function} arg1 - 搜索过程处理函数
     * @return {Void}
     */
    _p._$breadthFirstSearch = function(_root,_handler){
        var _arr = [_root],
            _node = _arr.shift(),
            _handler = _handler||_f;
        while(!!_node){
            _arr.push.apply(
                _arr,_node._$getChildren()
            );
            _handler(_node);
            _node = _arr.shift();
        }
    };
    /**
     * 判断是否节点实例
     * 
     * @method module:util/dispatcher/dsp/util._$isNode
     * @param  {module:util/dispatcher/dsp/node._$$Node} arg0 - 节点
     * @return {Boolean} 是否节点实例
     */
    _p._$isNode = function(_node){
        return _node instanceof _t0._$$Node;
    };
    /**
     * 判断是否模块实例
     * 
     * @method module:util/dispatcher/dsp/util._$isModule
     * @param  {module:util/dispatcher/module._$$ModuleAbstract} arg0 - 模块实例
     * @return {Boolean}          是否模块实例
     */
    _p._$isModule = function(_module){
        return _module instanceof _t1._$$ModuleAbstract;
    };
    /**
     * 判断给定UMI是否代表私有模块
     * 
     * @method module:util/dispatcher/dsp/util._$isUMIPrivate
     * @param  {String}  arg0 - UMI值
     * @return {Boolean}        是否私有模块
     */
    _p._$isUMIPrivate = (function(){
        var _reg = /^\/?\?(?=\/|$)/;
        return function(_umi){
            return _reg.test(_umi||'');
        };
    })();
    /**
     * 路径转UMI
     * 
     * 转换逻辑
     * 
     * 1. 路径按照"?"或者"#"分割
     * 2. 识别私有模块，条件：第一个元素为"/"同时第二个元素以"?"开始
     * 3. 非私有模块返回第一个元素，私有模块返回用"?"合并的第一和第二个元素
     * 
     * 转换举例
     * ```
     * /a/b              ->   /a/b
     * /a/b?a=aa         ->   /a/b
     * /a/b#a=aa         ->   /a/b
     * /a/b?a=aa#b=bb    ->   /a/b
     * /a/b#a=aa?b=bb    ->   /a/b
     * /a/b?/a/b         ->   /a/b
     * /a/b#/a/b         ->   /a/b
     * /?/a/b            ->   /?/a/b
     * /?/a/b?a=aa       ->   /?/a/b
     * /?/a/b#a=aa       ->   /?/a/b
     * /?/a/b?a=aa#b=bb  ->   /?/a/b
     * /?/a/b#a=aa?b=bb  ->   /?/a/b
     * /?a=aa            ->   /
     * /#a=aa            ->   /
     * ```
     * 
     * @method module:util/dispatcher/dsp/util._$path2umi
     * 
     * @param  {String} arg0 - 路径，可带查询参数
     * @return {String}        模块UMI
     */
    _p._$path2umi = (function(){
        var _reg = /[\?#]/;
        return function(_url){
            var _arr = (_url||'').trim().split(_reg),
                _prv = _arr[0]=='/'&&(_arr[1]||'').indexOf('/')==0;
            return _arr[0]+(_prv?('?'+_arr[1]):'');
        };
    })();
    
    return _p;    
},'3695926c26a1894dcce266fdc52d2e3a','41acb32203547e00abf26d38d541f1cc','16c6ee60c6b3ca72fb25ef265bef87a8');
I$('098c486f81cc3b0080bce996faad3294',function (_u,_k,_g,_e,_j,_t0,_t1,_t2,_p,_o,_f,_r){
    var _pro;
    /**
     * 模块分组管理器
     * 
     * @class   module:util/dispatcher/dsp/group._$$GroupManager
     * @extends module:util/event._$$EventTarget
     * 
     * @param    {Object} config - 可选配置参数
     * @property {module:util/dispatcher/dsp/node._$$Node} root - 树根节点
     * @property {module:util/dispatcher/dispatcher._$$Dispatcher} dispatcher - 调度器
     */
    _p._$$GroupManager = _k._$klass();
    _pro = _p._$$GroupManager._$extend(_t0._$$EventTarget);
    /**
     * 控件重置
     * 
     * @protected
     * @method   module:util/dispatcher/dsp/group._$$GroupManager#__reset
     * @param    {Object} arg0 - 可选配置参数
     * @return   {Void}
     */
    _pro.__reset = function(_options){
        this.__super(_options);
        this.__root = _options.root;
        this.__dispatcher = _options.dispatcher;
        this.__mpool = {}; // umi in this group
    };
    /**
     * 控件销毁
     * 
     * @protected
     * @method module:util/dispatcher/dsp/group._$$GroupManager#__destroy
     * @return {Void}
     */
    _pro.__destroy = function(){
        this.__super();
        delete this.__root;
        delete this.__mpool;
        delete this.__dispatcher;
    };
    /**
     * 判断父节点是否被阻止行为
     * 
     * @protected
     * @method module:util/dispatcher/dsp/group._$$GroupManager#__isStopped
     * @param  {module:util/dispatcher/dsp/node._$$Node} arg0 - 节点
     * @return {Boolean} 是否被阻止
     */
    _pro.__isStopped = function(_node){
        if (!_t2._$isNode(_node)) return !1;
        return !!_node._$getData().stopped||
               this.__isStopped(_node._$getParent());
    };
    /**
     * 清理阻止标记
     * 
     * @protected
     * @method module:util/dispatcher/dsp/group._$$GroupManager#__doClearStopped
     * @param  {module:util/dispatcher/dsp/node._$$Node} arg0 - 节点
     * @return {Void}
     */
    _pro.__doClearStopped = function(_node){
        if (!_t2._$isNode(_node)) return;
        delete _node._$getData().stopped;
        this.__doClearStopped(_node._$getParent());
    };
    /**
     * 隐藏模块
     * 
     * @protected
     * @method module:util/dispatcher/dsp/group._$$GroupManager#__doModuleHide
     * @param  {module:util/dispatcher/dsp/node._$$Node} arg0 - 起始节点（包含）
     * @param  {module:util/dispatcher/dsp/node._$$Node} arg1 - 结束节点（不包含）
     * @return {Void}
     */
    _pro.__doModuleHide = function(_from,_to){
        this.__doModuleCheck('onhide',_from,_to);
    };
    /**
     * 模块显示并检测
     * 
     * @protected
     * @method module:util/dispatcher/dsp/group._$$GroupManager#__doModuleShow
     * @param  {module:util/dispatcher/dsp/node._$$Node} arg0 - 起始节点（包含）
     * @param  {module:util/dispatcher/dsp/node._$$Node} arg1 - 结束节点（不包含）
     * @return {Void}
     */
    _pro.__doModuleShow = function(_from,_to){
        this.__doModuleCheck('onshow',_from,_to);
        this.__doModuleAction(_from);
    };
    /**
     * 刷新模块
     * 
     * @protected
     * @method module:util/dispatcher/dsp/group._$$GroupManager#__doModuleRefresh
     * @param  {module:util/dispatcher/dsp/node._$$Node} arg0 - 节点对象
     * @return {Void}
     */
    _pro.__doModuleRefresh = function(_node){
        this.__doModuleCheck('onrefresh',_node);
        this.__doModuleAction(_node);
    };
    /**
     * 标记操作
     * 
     * @protected
     * @method module:util/dispatcher/dsp/group._$$GroupManager#__doModuleCheck
     * @param  {String}  arg0 - 调度类型
     * @param  {module:util/dispatcher/dsp/node._$$Node} arg1 - 起始节点（包含）
     * @param  {module:util/dispatcher/dsp/node._$$Node} arg2 - 结束节点（不包含）
     * @return {Void}
     */
    _pro.__doModuleCheck = function(_type,_from,_to){
        if (_from==_to||!_t2._$isNode(_from)){
            return;
        }
        // dispatch first if hide module
        if (_type=='onhide'){
            this.__doModuleDispatch(_from,_type);
        }
        this.__doModuleCheck(
            _type,_from._$getParent(),_to
        );
        if (_type!='onhide'){
            this.__doModuleDispatch(_from,_type);
        }
    };
    /**
     * 执行模块行为
     * 
     * @protected
     * @method module:util/dispatcher/dsp/group._$$GroupManager#__doModuleAction
     * @param  {module:util/dispatcher/dsp/node._$$Node} arg0 - 节点对象
     * @return {Boolean} 节点行为是否执行完成
     */
    _pro.__doModuleAction = function(_node){
        if (!_t2._$isNode(_node)){
            return !0;
        }
        var _data = _node._$getData(),
            _action = _data.action,
            _module = _data.module;
        // check parent dispatched
        // check module loading
        if (!this.__doModuleAction(_node._$getParent())||
           (!!_action&&_u._$isString(_module))){
            return !1;
        }
        // dispatch action
        if (!!_module&&
            !!_module._$allocate&&
           (!!_action&&_action!='onhide')){
            // check node stopped
            if (this.__isStopped(_node)) return;
            var _options = {
                umi:_node._$getPath(),
                config:_data.config,
                composite:_data.composite,
                dispatcher:this.__dispatcher
            };
            _module = _module._$allocate(_options);
            if (_t2._$isModule(_module)){
                _data.module = _module;
                this.__doModuleDispatch(_node,'onshow');
            }else{
                delete _data.module;
            }
        }
        delete _data.action;
        
        return !0;
    };
    /**
     * 调度模块事件，如果模块已经载入则调度相应操作，如果模块未载入则先载入模块
     * 
     * @protected
     * @method module:util/dispatcher/dsp/group._$$GroupManager#__doModuleDispatch
     * @param  {module:util/dispatcher/dsp/node._$$Node} arg0 - 节点对象
     * @param  {String}  arg1 - 事件名称 onshow/onhide/onrefresh
     * @return {Void}
     */
    _pro.__doModuleDispatch = (function(){
        // get nearest parent export data
        var _getParentExport = function(_node){
            var _module;
            _node = _node._$getParent();
            while(!!_node){
                _module = _node._$getData().module;
                if (_t2._$isModule(_module)){
                    return _module._$getExportData();
                }
                _node = _node._$getParent();
            }
            return null;
        };
        // parse module url
        // config - ver,root,mode
        var _doParseModuleURL = function (module, config) {
            var ret = {
                url: (config.root||'')+module,
                version: (config.ver||_o)[module]
            };
            // convert xxx.html to xxx_ver.html
            if (!!config.mode&&!!ret.version){
                ret.url = ret.url.replace(
                    /(\.[^.\/]*?)$/,
                    '_'+ret.version+'$1'
                );
                ret.version = null;
            }
            return ret;
        };
        return function(_node,_name){
            if (!_t2._$isNode(_node)){
                return;
            }
            // format data
            var _data = _node._$getData(),
                _module = _data.module,
                _nothide = _name!='onhide';
            if (_t2._$isModule(_module)){
                // check node stopped
                if (_nothide&&this.__isStopped(_node)){
                    return;
                }
                // check event
                var _event = !this.__source ? _data.event
                             :this.__source._$getData().event;
                if (!!_event){
                    _event.umi = _node._$getPath();
                    _event.data = _getParentExport(_node);
                }
                // check event name
                // order must be onhide->onshow->onrefresh
                // onshow must after onhide
                var _xname = _data.xname||'onhide';
                if (_name=='onshow'&&_xname!='onhide'){
                    _name = 'onrefresh';
                }
                // onrefresh must after onshow
                if (_name=='onrefresh'&&_xname=='onhide'){
                    _name = 'onshow';
                }
                _data.xname = _name;
                // do dispatch event
                _module._$dispatchEvent(_name,_event||{});
                // position to element
                if (_nothide&&
                    !!_event&&
                    !!_event.pos&&
                    _event.umi==_event.target){
                    _e._$scrollTo(_event.pos);
                }
                // check stopped flag
                if (_nothide&&!!_event){
                    _data.stopped = _event.stopped;
                    delete _event.stopped;
                }
            }else if(!!_module){
                _data.action = _name;
                if (_name=='onshow'&&_u._$isString(_module)){
                    // check module template inline
                    var _element = _e._$get('umi://'+_module);
                    if (!!_element){
                        _t1._$parseTemplate(_element);
                    }else{
                        // support xxx_23423423.html mode
                        var _config = location.config||_o,
                            ret = _doParseModuleURL(
                                _module, _config
                            );
                        _j._$loadTemplate(ret.url,{
                            version:ret.version,
                            onload:_t1._$parseTemplate
                        });
                    }
                }
            }
        };
    })();
    /**
     * 判断UMI是否属于该分组管理器
     * 
     * @method module:util/dispatcher/dsp/group._$$GroupManager#_$hasUMI
     * @param  {String}  arg0 - 模块UMI
     * @return {Boolean} 是否属于该分组管理器
     */
    _pro._$hasUMI = function(_umi){
        return !!this.__mpool[_umi];
    };
    /**
     * 将UMI加入分组管理器中
     * 
     * @method module:util/dispatcher/dsp/group._$$GroupManager#_$addUMI
     * @param  {String} arg0 - 模块UMI
     * @return {Void}
     */
    _pro._$addUMI = function(_umi){
        this.__mpool[_umi] = !0;
    };
    /**
     * 删除分组管理器中的UMI
     * 
     * @method module:util/dispatcher/dsp/group._$$GroupManager#_$delUMI
     * @param  {Object} arg0 - 模块UMI
     * @return {Void}
     */
    _pro._$delUMI = function(_umi){
        delete this.__mpool[_umi];
    };
    /**
     * 指定UMI的模块载入完成
     * 
     * @method module:util/dispatcher/dsp/group._$$GroupManager#_$loadedUMI
     * @param  {String} arg0 - 模块UMI
     * @return {Void}
     */
    _pro._$loadedUMI = function(_umi){
        if (this._$hasUMI(_umi)){
            this.__doModuleAction(
                _t2._$getNodeByUMI(this.__root,_umi)
            );
        }
    };
    /**
     * 调度到指定UMI的模块
     * 
     * @method module:util/dispatcher/dsp/group._$$GroupManager#_$dispatchUMI
     * @param  {String} arg0 - 模块UMI
     * @return {Void}
     */
    _pro._$dispatchUMI = function(_umi){
        if (this._$hasUMI(_umi)){
            var _node = _t2._$getNodeByUMI(this.__root,_umi);
            this.__doClearStopped(_node);
            this.__doModuleShow(_node);
        }
    };
    /**
     * 隐藏指定UMI的模块
     * 
     * @method module:util/dispatcher/dsp/group._$$GroupManager#_$hideUMI
     * @param  {String} arg0 - 模块UMI
     * @return {Void}
     */
    _pro._$hideUMI = function(_umi){
        if (this._$hasUMI(_umi)){
            this.__doModuleHide(
                _t2._$getNodeByUMI(this.__root,_umi)
            );
        }
    };
    
    return _p;
},'3695926c26a1894dcce266fdc52d2e3a','7d45f691904093dd3d0d2a39eb337c1c','d0109f80b9992d1fd93e85a35ede12b1','43a92a1cb30f0322e2bca627e0f6b635','c2e3bbcbfb91469d1fdea97731063a2e','5dc30961f3452903950eb8a25e3d2109','73f169cf794774f1be9fb45582c96a38','2d9f3e261792e3200572a50c66511cea');
I$('6b0f41e54284357ad927f7ab1f2e0818',function (_k,_e,_t0,_t1,_p,_o,_f,_r){
    var _pro;
    /**
     * 模块分组管理器
     * 
     * @class   module:util/dispatcher/dsp/single._$$GroupManagerSingle
     * @extends module:util/dispatcher/dsp/group._$$GroupManager
     * 
     * @param    {Object}  config  - 可选配置参数
     * @property {Boolean} classed - 是否需要切换样式
     */
    _p._$$GroupManagerSingle = _k._$klass();
    _pro = _p._$$GroupManagerSingle._$extend(_t1._$$GroupManager);
    /**
     * 控件重置
     * 
     * @protected
     * @method module:util/dispatcher/dsp/single._$$GroupManagerSingle#__reset
     * @return {Void}
     */
    _pro.__reset = function(_options){
        this.__super(_options);
        this.__classed = !!_options.classed;
    };
    /**
     * 控件销毁
     * 
     * @protected
     * @method module:util/dispatcher/dsp/single._$$GroupManagerSingle#__destroy
     * @return {Void}
     */
    _pro.__destroy = function(){
        this.__super();
        delete this.__cmroot;
        delete this.__source;
    };
    /**
     * 判断当前模块是否可以退出
     * 
     * @method module:util/dispatcher/dsp/single._$$GroupManagerSingle#_$exitable
     * @param  {Object}  arg0 - 目标信息
     * @return {Boolean} 是否允许退出当前模块
     */
    _pro._$exitable = function(_event){
        if (!this.__source){
            return !0;
        }
        var _module = this.__source._$getData().module;
        // sure module has loaded
        if (_t0._$isModule(_module)){
            _module._$dispatchEvent('onbeforehide',_event);
        }
        return !_event.stopped;
    };
    /**
     * 刷新当前模块
     * 
     * @method module:util/dispatcher/dsp/single._$$GroupManagerSingle#_$refresh
     * @return {Void}
     */
    _pro._$refresh = function(){
        if (!this.__source) return;
        // keep asynchronous for finishing last process
        window.setTimeout(
            this._$dispatchUMI._$bind(
                this,this.__source._$getPath()
            ),0
        );
    };
    /**
     * 调度到指定UMI的模块,大致调度策略为:
     * 
     * 1. 计算原始节点与目标节点的公共节点
     * 2. 依次刷新根节点到公共节点之间的节点上注册的模块
     * 3. 依次隐藏原始节点到公共节点之间的节点上注册的模块
     * 4. 依次显示公共节点到目标节点之间的节点上注册的模块
     *   
     * 执行过程中遇到任何需要动态载入的模块均自动载入,
     * 子节点执行操作之前必须确保父节点已执行完相应操作
     * 
     * 以下两种情况忽略本次调度逻辑:
     * 
     * * 需要调度的UMI非本组管理器的UMI
     * * 需要调度的UMI上没有注册模块
     * 
     * @method module:util/dispatcher/dsp/single._$$GroupManagerSingle#_$dispatchUMI
     * @param  {String} arg0 - 模块UMI
     * @return {Void}
     */
    _pro._$dispatchUMI = function(_umi){
        if (!this._$hasUMI(_umi)) return;
        var _target = _t0._$getNodeByUMI(this.__root,_umi),
            _data = _target._$getData();
        // no module registed in target
        if (!_data.module) return;
        // update event information
        var _source = this.__source,
            _event  = _data.event,
            _odata  = _o;
        this.__source = _target;
        this.__doClearStopped(_target);
        if (!!_source){
            _odata = _source._$getData().event;
            _event.referer = _odata.href||'';
        }
        // source==target do refresh
        if (_source==_target){
            this.__doModuleRefresh(this.__source);
            return;
        }
        // hide source
        this.__cmroot = _t0._$getCommonRoot(
            this.__root,_source,_target
        );
        if (_source!=null){
            // hide source -> common root
            if (_source!=this.__cmroot){
                if (this.__classed){
                    _e._$delClassName(
                        document.body,
                        _odata.clazz
                    );
                }
                this.__doModuleHide(
                    _source,this.__cmroot
                );
            }
            // refresh common root -> root
            this.__doModuleRefresh(this.__cmroot);
        }else{
            // show common root -> root
            this.__doModuleShow(this.__cmroot);
        }
        // show target
        if (_target!=this.__cmroot){
            if (this.__classed){
                _e._$addClassName(
                    document.body,_event.clazz
                );
            }
            // show target -> common root
            this.__doModuleShow(_target,this.__cmroot);
        }
    };
    /**
     * 指定UMI的模块载入完成
     * 
     * @method module:util/dispatcher/dsp/single._$$GroupManagerSingle#_$loadedUMI
     * @param  {String} arg0 - 模块UMI
     * @return {Void}
     */
    _pro._$loadedUMI = function(_umi){
        if (this._$hasUMI(_umi)){
            this.__doModuleAction(this.__source);
        }
    };
    /**
     * 隐藏当前分组
     * 
     * @method module:util/dispatcher/dsp/single._$$GroupManagerSingle#_$hide
     * @return {Void}
     */
    _pro._$hide = function(){
        if (!this.__source){
            return;
        }
        this._$hideUMI(
            this.__source._$getPath()
        );
        delete this.__cmroot;
        delete this.__source;
    };
    
    return _p;
},'7d45f691904093dd3d0d2a39eb337c1c','43a92a1cb30f0322e2bca627e0f6b635','2d9f3e261792e3200572a50c66511cea','098c486f81cc3b0080bce996faad3294');
I$('4fac08cfcb3517b2cdce55a527af2c2c',function (_m,_p,_o,_f,_r){
    /**
     * 修正标题
     * @param  {String} 上次标题
     * @return {String} 修正后的标题
     */
    _p.__doFixTitle = (function(){
        var _reg = /#.*?$/i;
        return function(_title){
            var _odttl = document.title,
                _nwttl = _odttl.replace(_reg,'');
            if (_odttl!=_nwttl){
                _title = _nwttl||_title;
                document.title = _title;
            }
            return document.title;
        };
    })();
    /**
     * 修正标题被Hash污染问题
     * @param  {String} 原始标题
     * @return {Void}
     */
    _p.__doFixHashTitle = function(_title){
        // TODO
    };
    
    return _p;
},'d552af5339ac27c31f311f3fdadefdc3');
I$('ccb7acfe43034a55fd768d13b42c2b97',function(_h,_m,_p,_o,_f,_r){if (_m._$KERNEL.engine==='trident'&&_m._$KERNEL.release>='7.0'){I$('7b4a53ed8193dcc58062ae83d98320d8',function (_u){
        /**
         * 修正标题被Hash污染问题
         * @param  {String} 原始标题
         * @return {Void}
         */
        _h.__doFixHashTitle = function(_title){
            new MutationObserver(function(_list){
                _u._$reverseEach(
                    _list,function(_record){
                        if (_record.target.tagName=='TITLE'||
                            _record.type=='characterData'){
                            _title = _h.__doFixTitle(_title);
                            return !0;
                        }
                    }
                );
            }).observe(
                document,{
                    subtree:!0,
                    childList:!0,
                    characterData:!0
                }
            );
        };
    },'3695926c26a1894dcce266fdc52d2e3a');}
if (_m._$KERNEL.engine==='trident'&&_m._$KERNEL.release<'7.0'){I$('d618dcd58464143214bb41baee852df6',function (_v){
        /** 
         * 修正标题被Hash污染问题
         * @param  {String} 原始标题
         * @return {Void}
         */
        _h.__doFixHashTitle = function(_title){
            _v._$addEvent(
                document,'propertychange',function(_event){
                    if (_event.propertyName!='title'){
                        return;
                    }
                    _title = _h.__doFixTitle(_title);
                }
            );
        };
    },'0dd9ac3de45a7a1ce7c2f3ff80d53fcc');}return _h;},'4fac08cfcb3517b2cdce55a527af2c2c','d552af5339ac27c31f311f3fdadefdc3');
I$('df0ec655432039eee923b32bea3dbbe5',function (NEJ,_k,_e,_v,_u,_t0,_t1,_t2,_t3,_t4,_t5,_t6,_t7,_h,_p,_o,_f,_r){
    var _pro;
    /**
     * 调度器对象，项目仅允许实例化一个调度器
     *
     * 代码举例
     * ```javascript
     * NEJ.define([
     *     'util/template/tpl',
     *     'util/dispatcher/dispatcher'
     * ],function(_e,_p){
     *     // 取调度器实例
     *     var dispatcher = _p._$$Dispatcher._$getInstance();
     *
     *     // 添加规则
     *     dispatcher._$rule({
     *         title:{
     *             '/m/a':'模块标题',
     *             '/m/b':'模块标题'
     *         },
     *         rewrite:[
     *             {'/m/a':''},
     *             {'/m/b':/^\/m\/d.*$/i}
     *         ]
     *     });
     *
     *     // 注册模块
     *     dispatcher._$regist({
     *         '/m/a':'/m/a.html',
     *         '/m/b':'/m/b.html',
     *         '/m/c':'/m/c.html'
     *     });
     *
     *     // 激活调度器
     *     dispatcher._$active();
     *
     *     // 以上逻辑也可通过构造参数方式输入
     *     var dispatcher = _p._$$Dispatcher._$getInstance({
     *         rules:{
     *             title:{
     *                 '/m/a':'模块标题',
     *                 '/m/b':'模块标题'
     *             },
     *             rewrite:[
     *                {'/m/a':''},
     *                {'/m/b':/^\/m\/b.*$/i}
     *             ]
     *         },
     *         modules:{
     *             '/m/a':'/m/a.html',
     *             '/m/b':'/m/b.html',
     *             '/m/c':'/m/c.html'
     *         },
     *         onbeforechange:function(_event){
     *             // 根据dispatcher规则解析出来的路径信息
     *             // _event.path   <--- 模块UMI
     *             // _event.href   <--- 路径完整信息
     *             // _event.query  <--- 查询参数信息
     *             // 可以通过修改以上参数调整调度模块
     *         }
     *     })
     *     dispatcher._$active();
     *
     *     // 调度器激活前需确保当前可能出现的模块均已注册到调度器中
     *     // 实际应用中常出现以下情况
     *     var dispatcher = _$$Dispatcher._$getInstance({
     *         modules:{
     *             '/m/a':'/m/a.html',
     *             '/m/b':'/m/b.html',
     *             '/m/c':'/m/c.html'
     *         }
     *     });
     *     // 先解析页面模板，因为在解析模板的过程中可能会有模块构造器的注册逻辑
     *     // 注册模块构造器的优先级要比注册模板文件地址的优先级高，
     *     // 因此必须确保此处可能出现注册构造器的逻辑已处理以避免调度器激活时发出模块模板文件的请求
     *     // 比如 在模板内联了'/m/c'模块的相关模板（包括样式、结构和逻辑），如果此处不先解析模板，
     *     // 则在调度器激活时，调度器会识别出'/m/c'对应的是模板文件'/m/c.html'，因此回去加载这个文件，
     *     // 而实际上这个文件的内容已内联在页面的模板中，因此会产生额外的请求开销
     *     _e._$parseTemplate('template-box');
     *     // 激活调度器
     *     dispatcher._$active();
     * });
     * ```
     *
     * @class    module:util/dispatcher/dispatcher._$$Dispatcher
     * @extends  module:util/event._$$EventTarget
     *
     * @param    {Object}  config  - 可选配置参数，已处理的参数列表如下
     * @property {Object}  modules - 模块配置
     * @property {Object}  rules   - 规则配置
     * @property {Boolean} rest    - 是否支持REST风格的UMI解析
     */
    /**
     * 行为解析之前触发事件，一般用于解析节点中行为相关信息
     *
     * 结构举例
     * ```html
     * <div data-res-id="xxxx"
     *      data-res-type="2"
     *      data-res-action="show"
     *      data-res-data="a=aaaa&b=bbbb&c=cccc">
     *   <!-- content here -->
     * </div>
     * ```
     *
     * 脚本举例
     * ```javascript
     * NEJ.define([
     *     'util/dispatcher/dispatcher'
     * ],function(_p){
     *     // startup dispatcher
     *     _p._$startup({
     *         // ...
     *         onbeforeaction:function(_event){
     *             var _data = _e._$dataset(_event.target,'resData');
     *             // _event.result -> {id:'xxxx',type:'2',action:'show'}
     *             _event.result.param = _data;
     *         }
     *     });
     * });
     * ```
     *
     * @event    module:util/dispatcher/dispatcher._$$Dispatcher#onbeforeaction
     * @param    {Object} event  - 行为相关信息
     * @property {Node}   target - 触发行为的节点对象
     * @property {Event}  event  - 原始事件对象
     * @property {Object} result - 行为相关信息
     */
    /**
     * 地址变换之前触发事件
     *
     * 脚本举例
     * ```javascript
     * NEJ.define([
     *     'util/dispatcher/dispatcher'
     * ],function(_p){
     *     // startup dispatcher
     *     _p._$startup({
     *         // ...
     *         onbeforechange:function(_event){
     *             // _event -> {path:'/m/a',href:'http://a.b.com/m/a',query:{a:'aaaaa'}}
     *             var _umi = _event.path||'';
     *             if (!!_umi&&_umi.indexOf('/?')<0&&_umi.indexOf('/m')<0){
     *                 _event.path = '/m'+_umi;
     *             }
     *         }
     *     });
     * });
     * ```
     *
     * @event    module:util/dispatcher/dispatcher._$$Dispatcher#onbeforechange
     * @param    {Object} event - 地址信息
     * @property {String} path  - 路径信息，不带查询参数
     * @property {String} href  - 完整路径，带查询参数
     * @property {Object} query - 查询参数解析出来的对象
     */
    /**
     * 模块无法匹配时触发事件
     *
     * 脚本举例
     * ```javascript
     * NEJ.define([
     *     'util/dispatcher/dispatcher'
     * ],function(_p){
     *     // startup dispatcher
     *     _p._$startup({
     *         // ...
     *         onnotfound:function(_event){
     *             // _event -> {path:'/m/a',href:'http://a.b.com/m/a'}
     *             _event.stopped = !0;
     *             location.href = '/404';
     *         }
     *     });
     * });
     * ```
     *
     * @event    module:util/dispatcher/dispatcher._$$Dispatcher#onnotfound
     * @param    {Object}  event - 地址信息
     * @property {String}  path  - 路径信息，不带查询参数
     * @property {String}  href  - 完整路径，带查询参数
     * @property {Boolean} stopped - 是否阻止进一步调度器逻辑
     */
    _p._$$Dispatcher = _k._$klass();
    _pro = _p._$$Dispatcher._$extend(_t2._$$EventTarget);
    /**
     * 控件初始化
     *
     * @protected
     * @method module:util/dispatcher/dispatcher._$$Dispatcher#__init
     * @return {Void}
     */
    _pro.__init = function(){
        this.__super();
        var _seed = _u._$uniqueID();
        this.__pbseed = 'pb-'+_seed;
        this.__pvseed = 'pv-'+_seed;
    };
    /**
     * 控件重置
     *
     * @protected
     * @method module:util/dispatcher/dispatcher._$$Dispatcher#__reset
     * @param  {Object} arg0 - 可选配置参数
     * @return {Void}
     */
    _pro.__reset = function(_options){
        // temporary params
        // umi - input params
        this.__dtmp = {};
        this.__rest = !!_options.rest;
        this.__root = _t4._$$Node._$allocate();
        // config map
        // - m   config for module, umi:{title:'xxx' ... }
        // - mg  umi to group id map, umi:gid
        // - r   config for rewrite, [{umi:regexp or string or function or array}]
        // - rr  build-in rewrite
        // - al  alias map
        // - am  actions map, {click:[],dblclick:[]}
        this.__config = {m:{},mg:{},r:[],rr:{},al:{},am:{}};
        this.__groups = {};
        // for public module umi manager
        this.__doBuildGroup(this.__pbseed);
        // for private module umi manager
        this.__groups[this.__pvseed] =
            _t5._$$GroupManager._$allocate({
                root:this.__root,
                dispatcher:this
            });
        // bugfix hash title for ie with flash
        _h.__doFixHashTitle(document.title);
        // add listeners
        this.__doInitDomEvent([[
            location,'urlchange',
            this.__onURLChange._$bind(this)
        ]]);
        this.__super(_options);
        // init config
        this._$rule(_options.rules);
        this._$regist(_options.modules);
    };
    /**
     * 控件销毁
     *
     * @protected
     * @method module:util/dispatcher/dispatcher._$$Dispatcher#__destroy
     * @return {Void}
     */
    _pro.__destroy = (function(){
        var _doRecycle = function(_group,_key,_map){
            delete _map[_key];
            _group._$recycle();
        };
        return function(){
            delete this.__config;
            this.__root = this.__root._$recycle();
            _u._$loop(this.__groups,_doRecycle);
            this.__super();
        };
    })();
    /**
     * 设置模块配置信息
     *
     * @protected
     * @method module:util/dispatcher/dispatcher._$$Dispatcher#__setModuleConf
     * @param  {String}   arg0 - 模块UMI
     * @param  {String}   arg1 - 配置类别
     * @param  {Variable} arg2 - 配置信息
     * @return {Void}
     */
    _pro.__setModuleConf = function(_umi,_key,_value){
        var _mconf = this.__config.m[_umi];
        if (!_mconf){
            _mconf = {};
            this.__config.m[_umi] = _mconf;
        }
        _mconf[_key] = _value;
    };
    /**
     * 取模块配置信息
     *
     * @protected
     * @method module:util/dispatcher/dispatcher._$$Dispatcher#__getModuleConf
     * @param  {String} arg0 - 模块UMI
     * @param  {String} arg1 - 配置标识
     * @return {String}        配置信息
     */
    _pro.__getModuleConf = function(_umi,_key){
        var _mconf = this.__config.m[_umi];
        return !_mconf?'':_mconf[_key];
    };
    /**
     * 构建分组管理器
     *
     * @protected
     * @method module:util/dispatcher/dispatcher._$$Dispatcher#__doBuildGroup
     * @param  {String} arg0 - 管理器标识
     * @return {module:util/dispatcher/dsp/single._$$GroupManagerSingle} 分组管理器实例
     */
    _pro.__doBuildGroup = function(_gid){
        if (!_gid) return;
        var _group = this.__groups[_gid];
        if (!_group){
            _group = _t6._$$GroupManagerSingle._$allocate({
                root:this.__root,
                dispatcher:this,
                classed:_gid==this.__pbseed
            });
            this.__groups[_gid] = _group;
        }
        return _group;
    };
    /**
     * 添加UMI至分组管理器
     *
     * @protected
     * @method module:util/dispatcher/dispatcher._$$Dispatcher#__doAddUMI2Group
     * @param  {String} arg0 - 模块UMI
     * @param  {String} arg1 - 分组标识
     * @return {Void}
     */
    _pro.__doAddUMI2Group = function(_umi,_gid){
        var _group = this.__doBuildGroup(_gid);
        if (!_group){
            _gid = _t3._$isUMIPrivate(_umi)
                 ? this.__pvseed : this.__pbseed;
            _group = this.__groups[_gid];
        }
        _group._$addUMI(_umi);
        this.__config.mg[_umi] = _gid;
    };
    /**
     * 重写UMI规则
     *
     * @protected
     * @method module:util/dispatcher/dispatcher._$$Dispatcher#__doRewriteUMI
     * @param  {String} arg0 - 模块UMI
     * @return {String}        重写后模块UMI
     */
    _pro.__doRewriteUMI = (function(){
        var _reg = /\$\d/;
        return function(_umi,_href){
            var _result;
            _u._$forIn(this.__config.r,
                function(_config){
                    _u._$forIn(_config,
                        function(_value,_key){
                            // fix safari array bug #{404:'/'}
                            if (_value==null){
                                return;
                            }
                            // function
                            if (_u._$isFunction(_value)){
                                var _ret = !1;
                                try{
                                    _ret = _value.call(null,{
                                        umi:_umi,
                                        href:_href
                                    });
                                }catch(ex){
                                    // ignore
                                }
                                if (!!_ret){
                                    _result = _key;
                                    return !0;
                                }
                            }
                            // array
                            if (_u._$isArray(_value)){
                                var _index = _u._$indexOf(_value,function(v){
                                    return v===_umi||v===_href;
                                });
                                if (_index>=0){
                                    _result = _key;
                                    return !0;
                                }
                            }
                            // regexp
                            if (!!_value.test&&(
                                  _value.test(_umi)||
                                  _value.test(_href))){
                                // /^\/a\/([\d]+)\/([\d]+)\/$/ ---> /a/?p=$1&k=$2
                                // /a/123/456/ ---> /a/?p=123&k=456
                                _result = _reg.test(_key)?_umi.replace(_value,_key):_key;
                                return !0;
                            }
                            // string
                            if (_value===_umi||
                                _value===_href){
                                _result = _key;
                                return !0;
                            }
                        });
                    return !!_result;
                });
            return _result||_umi;
        };
    })();
    /**
     * URL变化触发事件
     *
     * @protected
     * @method module:util/dispatcher/dispatcher._$$Dispatcher#__onURLChange
     * @param  {Object} arg0 - 地址信息
     * @return {Void}
     */
    _pro.__onURLChange = (function(){
        var _trim = /(?:^\/+)|(?:\/+$)/gi,
            _reg0 = /#(\$.*?)$/,
            _reg1 = /\/$/;
        var _doParseRestParam = function(_umi,_node){
            var _path = _node._$getPath(),
                _umi = _umi.replace(_path,'')
                           .replace(_trim,'');
            return _umi.split('/');
        };
        var _doTryGroupId = function(_umi,_map){
            // TODO improve performance
            var _value,
                _arr = _umi.split('/');
            while(_arr.length>0){
                if (!_arr[_arr.length-1]){
                    _arr.pop();
                }else{
                    _arr[_arr.length-1] = '';
                }
                _value = _map[_arr.join('/')];
                if (!!_value) return _value;
            }
            return '';
        };
        return function(_location){
            // ignore if hash start with $
            if (_location.path.indexOf('$')==0) return;
            // check input param
            var _input = this.__dtmp[_location.path];
            delete this.__dtmp[_location.path];
            // check outer logic
            this._$dispatchEvent('onbeforechange',_location);
            var _umi = this.__doRewriteUMI(
                    _location.path,
                    _location.href
                ),
                _gid = this.__config.mg[_umi];
            // try umi from rest path
            if (!_gid&&this.__rest){
                _gid = _doTryGroupId(
                       _umi,this.__config.mg);
            }
            // public umi not registed
            if (!_gid&&!_t3._$isUMIPrivate(_umi)){
                // check 404 callback
                var event = {
                    path:_umi,
                    href:_location.href
                };
                this._$dispatchEvent('onnotfound',event);
                if (event.stopped){
                    return;
                }
                // go 404 config
                _umi = this.__config.rr['404'];
                _gid = this.__config.mg[_umi];
            }
            // try umi from rest path
            if (!_gid&&this.__rest){
                _gid = _doTryGroupId(
                       _umi,this.__config.mg);
            }
            if (!_gid) return;
            // save dispatch event
            var _node = _t3._$getNodeByUMI(this.__root,_umi),
                _prst = null;
            if (this.__rest){
                _prst = _doParseRestParam(_umi,_node);
                // try rest umi end with /
                if (!_reg1.test(_umi)&&
                    !!this.__config.mg[_umi+'/']){
                    _node = _node._$getChildByName('/');
                }
            }
            // fix umi for module
            var _source = _umi;
            _umi = _node._$getPath();
            _node._$getData().event = {
                target:_umi,
                source:_source,
                href:_location.href,
                param:_location.query,
                input:_input,
                prest:_prst,
                clazz:this.__getModuleConf(_umi,'clazz'),
                pos:_reg0.test(_location.href)?RegExp.$1:''
            };
            // dispatch module
            var event = {
                title:this.__getModuleConf(_source,'title')
            };
            this._$dispatchEvent('ontitlechange',event);
            if (!!event.title){
                document.title = event.title;
            }
            this.__groups[_gid]._$dispatchUMI(_umi);
        };
    })();
    /**
     * 点击代理
     *
     * @protected
     * @method module:util/dispatcher/dispatcher._$$Dispatcher#__onClickDelegate
     * @param  {Event} arg0 - 点击事件对象
     * @return {Void}
     */
    _pro.__onClickDelegate = (function(){
        // check event need delegated
        var _doCheckUMI = function(_url,_href){
            if (!_url) return;
            var _info = location.parse(_url);
            this._$dispatchEvent('onbeforechange',_info);
            var _umi = this.__doRewriteUMI(
                _info.path,_href||_info.href
            );
            return this.__groups[this.__pbseed]._$hasUMI(_umi);
        };
        var _doParseUMI = function(_node){
            // parse data-href
            var _umi = _e._$dataset(_node,'href');
            if (!!_umi) return _umi;
            // parse href without data-not-umi
            var _href = _e._$attr(_node,'href');
            if (!!_href&&!_e._$dataset(_node,'notUmi')){
                // umi in hash
                var _arr = _href.split('#');
                _arr.shift();
                var _umi = _arr.join('#');
                if (_doCheckUMI.call(this,_umi,_href)){
                    return _umi;
                }
                // umi in path
                if (_doCheckUMI.call(this,_href)){
                    var _info = location.parse(_href);
                    return _info.path+'?'+
                           _u._$object2query(_info.query);
                }
            }
        };
        var _isNode = function(_node){
            return !!_doParseUMI.call(this,_node);
        };
        return function(_event){
            var _element = _v._$getElement(
                _event,_isNode._$bind(this)
            );
            if (!!_element){
                _v._$stopDefault(_event);
                this._$redirect(
                    _doParseUMI.call(this,_element)
                );
            }
        };
    })();
    /**
     * 解析行为代理
     *
     * @protected
     * @method module:util/dispatcher/dispatcher._$$Dispatcher#__onActionDelegate
     * @param  {Event} arg0 - 点击事件对象
     * @return {Void}
     */
    _pro.__onActionDelegate = function(_event){
        var _am = this.__config.am,
            _conf = _am[_event.type];
        if (!_conf) return;
        // has action delegate
        var _element = _v._$getElement(_event,'d:resAction');
        if (!_element) return;
        var _action = _e._$dataset(_element,'resAction')||'',
            _handler = _conf[_action.toLowerCase()];
        if (!_handler) return;
        // has action node
        var _options = {
            action:_action,
            target:_element,
            id:_e._$dataset(_element,'resId'),
            type:_e._$dataset(_element,'resType'),
            extra:_e._$dataset(_element,'resExtra')
        };
        // do other parse
        this._$dispatchEvent('onbeforeaction',{
            event:_event,
            target:_element,
            result:_options
        });
        // trigger action
        _handler.call(this,_options);
    };
    /**
     * 添加调度规则
     *
     * 脚本举例
     * ```javascript
     * // 配置模块标题
     * dispatcher._$rule('title',{
     *     '/m/a':'模块标题',
     *     '/m/b':'模块标题',
     *     '/m/c':'模块标题'
     * });
     *
     * // 配置别名
     * dispatcher._$rule('alias',{
     *     'a':'/m/a',
     *     'b':['/m/b','/m/bb'],
     *     'c':'/m/c'
     * });
     *
     * // 配置与匹配顺序无关重写规则
     * // 重写规则配置结构：{ 目标UMI:重写规则 }
     * // 重写规则可以是字符串（全字符匹配）或者正则表达式
     * dispatcher._$rule('rewrite',{
     *     '/m/b':/^\/m\/b.*$/i,
     *     '/m/c':'/m/d'
     * });
     *
     * // 批量配置重写规则
     * // 重写规则内置匹配代码支持
     * // 404 - 当模块不存在时重定向的模块UMI
     * dispatcher._$rule([
     *     {'/m/a':'/m/','/m/c':'/m/d'},  // <---- 此处两条规则匹配与顺序无关
     *     {'/m/b':/^\/m\/b.*$/i},
     *     {'404':'/m/a'}                 // <---- 模块不存在时定向到/m/a模块
     * ]);
     *
     * // 配置行为，默认为click行为，模块中通过options.input接收配置信息
     * // 默认行为信息解析节点上的以下内容：
     * // data-res-id         资源标识
     * // data-res-type       资源类型
     * // data-res-action     对资源操作的行为
     * // data-res-extra      其他信息，如a=aaa&b=bbb或者{"a":"aaa","b":"bbb"}等等，根据实际情况配置
     * dispatcher._$rule('action',{
     *     'show':'/m/a',    // 等价于dispatcher._$redirect('/m/a')
     *     'play':function(_options){
     *         // _options -> {type:'xxxx',id:'xxxx'}
     *         // TODO something
     *         // 返回结果如果为：
     *         // undefined/null  表明业务逻辑已在此函数内处理完毕
     *         // string          表明返回的是UMI，后续会调用_$redirect到该UMI
     *     },
     *     'fav':{
     *         event:'dblclick',
     *         value:'/m/b' // or function
     *     }
     * });
     *
     * // 批量配置标题和重写规则
     * dispatcher._$rule({
     *     'title':{
     *         '/m/a':'模块标题',
     *         '/m/b':'模块标题',
     *         '/m/c':'模块标题'
     *     },
     *     'rewrite':{
     *         '/m/b':/^\/m\/b.*$/i,
     *         '/m/c':'/m/d'
     *     },
     *     'alias':{
     *         'a':'/m/a',
     *         'b':['/m/b','/m/bb'],
     *         'c':'/m/c'
     *     },
     *     action:{
     *         'show':'/m/a',
     *         'play':function(_options){
     *             // TODO something
     *         }
     *     }
     * });
     * ```
     *
     * @method module:util/dispatcher/dispatcher._$$Dispatcher#_$rule
     * @param  {String}       arg0 - 规则类型，支持类型: title/rewrite/alias/action
     * @param  {Object|Array} arg1 - 规则配置，对于重写规则存在匹配的先后顺序
     * @return {Void}
     */
    _pro._$rule = (function(){
        var _buildin = ['404'];
        // regist rule
        var _doRegistRule = function(_config,_key){
            this._$rule(_key,_config);
        };
        // regist title
        var _doRegistTitle = function(_title,_umi){
            this.__setModuleConf(_umi,'title',_title);
        };
        // regist alias map
        var _doRegistAlias = function(_umi,_alias){
            this.__config.al[_alias] = _umi;
        };
        // regist rewrite
        var _doRegistRewrite = function(_config){
            if (!_config) return;
            this.__config.r.push(_config);
            // parse build-in rewrite rule
            _u._$forEach(_buildin,
                function(_key){
                    if (!_config[_key]) return;
                    this.__config.rr[_key] = _config[_key];
                    delete _config[_key];
                },this);
        };
        // regist actions
        var _doRegistAction = function(_action,_name){
            var _am = this.__config.am;
            // parse event/handler from object
            var _event = 'click',
                _handler = _action,
                _name = (_name||'').toLowerCase();
            if (_u._$isObject(_action)){
                _event = _action.event||_event;
                _handler = _action.value;
            }
            // parse handler
            if (_u._$isString(_handler)){
                _handler = function(_umi,_options){
                    this._$redirect(_umi,{
                        force:!0,
                        input:_options
                    });
                }._$bind(this,_handler);
            }else if(_u._$isFunction(_handler)){
                _handler = _handler._$aop(null,function(_event){
                    var _result = _event.value;
                    if (_u._$isString(_result)){
                        this._$redirect(_result,{
                            force:!0,
                            input:_event.args[0]
                        });
                    }
                }._$bind(this));
            }
            // push handler to cache
            if (_u._$isFunction(_handler)){
                // add event delegate
                if (!_am[_event]) {
                    this.__doInitDomEvent([[
                        document,_event,
                        this.__onActionDelegate._$bind(this)
                    ]]);
                    _am[_event] = {};
                }
                _am[_event][_name] = _handler;
            }
        };
        // rule parse function map
        var _fmap = {
            title:function(_config){
                _u._$loop(_config,
                   _doRegistTitle,this);
            },
            rewrite:function(_config){
                if (!_u._$isArray(_config)){
                    _doRegistRewrite.call(this,_config);
                }else{
                    _u._$forEach(
                        _config,
                        _doRegistRewrite,this
                    );
                }
            },
            alias:function(_config){
                _u._$loop(
                    _config,
                    _doRegistAlias,this
                );
            },
            action:function(_config){
                _u._$loop(
                    _config,
                    _doRegistAction,this
                );
            }
        };
        return function(_key,_config){
            if (_u._$isArray(_key)){
                _config = _key;
                _key = 'rewrite';
            }else if (!_u._$isString(_key)){
                _u._$forIn(_key,_doRegistRule,this);
                return;
            }
            // regist rule by type
            (_fmap[_key]||_f).call(this,_config);
        };
    })();
    /**
     * 注册UMI与模块的对应关系
     *
     * 脚本举例
     * ```javascript
     * // 注册模块的模板文件路径
     * dispatcher._$regist('/m/a/','/m/a.html');
     *
     * // 注册模块的配置信息，包括标题和文件路径
     * dispatcher._$regist('/m/a/',{
     *     title:'模块标题',
     *     clazz:'g-ma',
     *     module:'/m/a.html'
     * });
     *
     * // 注册模块的配置信息，包括标题和模块构造器
     * dispatcher._$regist('/m/a/',{
     *     title:'模块标题',
     *     clazz:'g-ma',
     *     module:np.m._$$ModuleA
     * });
     *
     * // 注册模块的构造器
     * dispatcher._$regist('/m/a/',np.m._$$ModuleA);
     *
     * // 注册私有模块指定分组ID，同一分组的私有模块调度时仅显示一个模块
     * dispatcher._$regist('/?/a/b/',{
     *     gid:'234567890',
     *     module:'/m/a/b.html'
     * });
     *
     * // 批量注册模块
     * dispatcher._$regist({
     *     '/m/a/':'/m/a.html',
     *     '/m/a/a':np.m._$$ModuleAA,
     *     '/m/b/':{
     *               title:'模块标题',
     *               clazz:'g-mb',
     *               module:'/m/b.html'
     *             },
     *     '/m/c/':{
     *               title:'模块标题',
     *               clazz:'g-mc',
     *               module:np.m._$$ModuleC
     *             },
     *     '/?/m/a/':'/m/s/a.html',
     *     '/?/m/a/a':np.m.s._$$ModuleAA,
     *     '/?/m/b/':{
     *                 gid:'abc',
     *                 title:'模块标题',
     *                 module:'/m/b.html'
     *               },
     *     '/?/m/c/':{
     *                 gid:'abc',
     *                 title:'模块标题',
     *                 module:np.m._$$ModuleC
     *               },
     * });
     * ```
     *
     * @method   module:util/dispatcher/dispatcher._$$Dispatcher#_$regist
     * @param    {String|Object} arg0      - 统一模块标识或者模块批量添加信息
     * @param    {String|Object|module:util/dispatcher/module._$$ModuleAbstract}
     *                           arg1      - 模块构造或者模块路径或者模块配置信息
     * @property {String}        gid       - 指定模块分组，仅对私有模块有效，对外模块忽略此配置
     * @property {String}        title     - 模块标题，显示模块时修改页面的标题
     * @property {String}        clazz     - 模块切换时body样式调整，仅对公共模块有效
     * @property {String|module:util/dispatcher/module._$$ModuleAbstract}
     *                           module    - 指定模块对应的模板文件地址或者模块的构造函数
     * @property {Object}        composite - 组合模块容器对应关系,{pid:umi},其中pid为umi对应模块的容器
     * @property {Object}        config    - 模块构建配置信息，在模块的init/reset/dobuild时可以获取到的配置信息
     * @return   {Void}
     */
    _pro._$regist = (function(){
        // regist single module
        var _doRegistUMI = function(_config,_umi){
            this._$regist(_umi,_config);
        };
        // check if module constructor
        var _isModuleClass = function(_module){
            return !!_module&&!!_module._$extend;
        };
        // function body
        return function(_umi,_config){
            // batch regist
            if (!_u._$isString(_umi)){
                _u._$forIn(_umi,_doRegistUMI,this);
                return;
            }
            // regist module with umi
            var _data = _t3._$appendNodeByUMI(
                    this.__root,_umi
                )._$getData(),
                _module = _data.module;
            // ignore if
            // - module constructor is registed
            // - module is instanced
            if (_t3._$isModule(_module)||
                _isModuleClass(_module)){
                return;
            }
            // parse conifg
            var _gid = this.__config.mg[_umi],_module;
            if (_u._$isString(_config)||
                _isModuleClass(_config)){
                // config is module template file or module constructor
                _module = _config;
            }else{
                // conifg is module information
                _config = _config||_o;
                _gid = _config.gid;
                _module = _config.module;
                // cache module title
                if (!!_config.title){
                    this.__setModuleConf(
                        _umi,'title',
                        _config.title
                    );
                }
                // cache module clazz
                if (!!_config.clazz){
                    this.__setModuleConf(
                        _umi,'clazz',
                        _config.clazz
                    );
                }
                // cache module composite
                if (!!_config.composite){
                    _data.composite = _config.composite;
                }
                // cache module build config
                if (!!_config.config){
                    _data.config = _config.config;
                }
            }
            // save module
            this.__doAddUMI2Group(_umi,_gid);
            _data.module = _module;
        };
    })();
    /**
     * 发送消息，消息模式
     *
     * * 0 - 目标消息【默认】，只有目标节点收到消息
     * * 1 - 目标广播，从根节点至路目标节点径上的节点收到消息
     * * 2 - 群体广播，节点下所有子孙子孙节点收到消息
     *
     * @method   module:util/dispatcher/dispatcher._$$Dispatcher#_$message
     * @param    {Object} arg0 - 消息相关信息
     * @property {String} to   - 消息目标UMI
     * @property {String} from - 消息来源UMI
     * @property {Object} data - 消息数据
     * @property {Number} mode - 消息模式
     * @return   {Void}
     */
    _pro._$message = (function(){
        // send message
        var _doSendMessage = function(_node,_message){
            var _module = _node._$getData().module;
            if (_t3._$isModule(_module)){
                _module._$dispatchEvent('onmessage',_message);
            }
        };
        // message mode function
        var _fmap = [
            _doSendMessage,
            // send message to every node in target path
            function(_target,_message){
                var _from = _message.from;
                while(!!_target){
                    if (_target._$getPath()!=_from){
                        _doSendMessage(_target,_message);
                    }
                    _target = _target._$getParent();
                }
            },
            // broadcast to all target descendants
            function(_target,_message){
                var _from = _message.from;
                _t3._$breadthFirstSearch(
                    _target,function(_node){
                        if (_node._$getPath()!=_from){
                            _doSendMessage(_node,_message);
                        }
                    }
                );
            }
        ];
        return function(_message){
            var _event = _u._$merge({},_message),
                _target = _t3._$getNodeByUMI(this.__root,_event.to);
            _event.path = _target._$getPath();
           (_fmap[_event.mode]||_fmap[0]).call(this,_target,_event);
        };
    })();
    /**
     * 发布消息
     *
     * 脚本举例
     * ```javascript
     *   dispatcher._$publish(
     *       'onchange',{
     *           from:'/m/login/',
     *           data:{action:'delete',value:'xxxxxx'}
     *       }
     *   );
     * ```
     *
     * @method   module:util/dispatcher/dispatcher._$$Dispatcher#_$publish
     * @param    {String} arg0 - 消息类型
     * @param    {Object} arg0 - 消息相关信息
     * @property {String} from - 消息来源UMI
     * @property {Object} data - 消息数据
     * @return   {Void}
     */
    _pro._$publish = function(_type,_message){
        var _message = _u._$merge({},_message);
        _message.type = _type||'';
        this._$dispatchEvent(
            (_message.from||'')+':'
            +_message.type,_message
        );
    };
    /**
     * 订阅消息
     *
     * 脚本举例
     * ```javascript
     *   dispatcher._$subscribe(
     *       '/m/login/','onchange',
     *       function(_event){
     *           // _event.type
     *           // _event.from
     *           // _event.data
     *       }
     *   );
     * ```
     *
     * @method module:util/dispatcher/dispatcher._$$Dispatcher#_$subscribe
     * @param  {String}   arg0 - 目标模块的UMI
     * @param  {String}   arg1 - 消息类型
     * @param  {Function} arg2 - 消息处理回调
     * @return {Void}
     */
    _pro._$subscribe = function(_umi,_type,_callback){
        _umi = this.__config.al[_umi]||_umi;
        this._$addEvent(
            (_umi||'')+':'+(_type||''),_callback
        );
    };
    /**
     * 取消订阅消息
     *
     * 脚本举例
     * ```javascript
     *   dispatcher._$unsubscribe(
     *       '/m/login/','onchange',
     *       function(_event){
     *           // 必须同添加的事件一致
     *       }
     *   );
     * ```
     *
     * @method module:util/dispatcher/dispatcher._$$Dispatcher#_$unsubscribe
     * @param  {String}   arg0 - 目标模块的UMI
     * @param  {String}   arg1 - 消息类型
     * @param  {Function} arg2 - 消息处理回调
     * @return {Void}
     */
    _pro._$unsubscribe = function(_umi,_type,_callback){
        _umi = this.__config.al[_umi]||_umi;
        this._$delEvent(
            (_umi||'')+':'+(_type||''),_callback
        );
    };
    /**
     * 隐藏非分组私有模块
     *
     * 脚本举例
     * ```javascript
     *   // 隐藏私有模块
     *   dispatcher._$hide('/?/m/a/b/');
     * ```
     *
     * @method module:util/dispatcher/dispatcher._$$Dispatcher#_$hide
     * @param  {String} arg0 - 私有模块地址
     * @return {Void}
     */
    _pro._$hide = function(_umi){
        var _gid = this.__config.mg[_umi];
        if (_gid==this.__pvseed){
            this.__groups[_gid]._$hideUMI(_umi);
        }
    };
    /**
     * 隐藏私有分组
     * 
     * @method module:util/dispatcher/dispatcher._$$Dispatcher#_$hideGroup
     * @param  {String} arg0 - 分组ID
     * @return {Void}
     */
    _pro._$hideGroup = function(_gid){
        var _group = this.__groups[_gid];
        if (!!_group){
            _group._$hide();
        }
    };
    /**
     * 重定向模块，此接口支持
     *
     * * 私有模块重定向
     * * 可访问模块退出前验证
     * * 重定向地址带查询参数
     *
     * 脚本举例
     * ```javascript
     *   // 重定向私有模块
     *   dispatcher._$redirect('/?/m/a/b?a=aa&b=bb');
     *
     *   // 系统存在需退出验证模块时需使用以下业务逻辑接管页面自动调整的逻辑
     *   _v._$addEvent(document,'click',function(_event){
     *       var _element = _v._$getElement(_event,
     *                      function(_node){
     *                          // filter node here
     *                          // e.g. _node.tagName=='A'
     *                      });
     *       if (!!_element){
     *           _v._$stopDefault(_event);
     *           dispatcher._$redirect(_e._$dataset(_element,'href'));
     *       }
     *   });
     *
     *   // 如果页面带跳转的节点有data-href标识跳转地址的情况可以使用{#_$delegate}处理以上业务逻辑
     *   // <span data-href="#/m/a/?a=aa">aaaa</span>
     *   // <a href="#/m/a/?a=aa" data-href="#/m/a/?a=aa">bbbbbb</a>
     *   dispatcher._$delegate();
     * ```
     *
     * @method   module:util/dispatcher/dispatcher._$$Dispatcher#_$redirect
     * @param    {String}   arg0     - 模块UMI，可以带查询参数
     * @param    {Object}   arg1     - 配置信息
     * @property {Variable} input    - 输入数据
     * @property {Boolean}  replace  - 是否替换当前历史
     * @property {Boolean}  force    - 是否强制刷新
     * @property {Boolean}  ignored  - 是否忽略地址变化前的验证
     * @property {Boolean}  exitable - 是否可强行退出前面的模块
     * @return   {Void}
     */
    _pro._$redirect = function(_url,_options){
        _options = _options||_o;
        var _umi = _t3._$path2umi(_url),
            _location = location.parse(_url);
        this.__dtmp[_location.path] = _options.input;
        if (_t3._$isUMIPrivate(_umi)){
            // dispatch private module
            this.__onURLChange(_location);
        }else{
            // dispatch public module
            var _group = this.__groups[this.__pbseed],
                _event = {target:_location,umi:_umi};
            if (_options.exitable||!!_group._$exitable(_event)){
                if (location.same(_url)&&!!_options.force){
                    this.__onURLChange(_location);
                }else{
                    location.ignored = !!_options.ignored;
                    location.redirect(_url,!!_options.replace);
                }
            }
        }
    };
    /**
     * 刷新模块
     *
     * @method module:util/dispatcher/dispatcher._$$Dispatcher#_$refresh
     * @param  {String} arg0 - 模块UMI，可以带查询参数
     * @return {Void}
     */
    _pro._$refresh = function(_url){
        if (!!_url){
            this._$redirect(_url,{
                replace:!0,force:!0
            });
        }else{
            this.__groups[this.__pbseed]._$refresh();
        }
    };
    /**
     * 模块切换跳转委托，
     * 如果系统存在需退出验证模块时需使用此接口接管页面自动调整的逻辑
     *
     * @method module:util/dispatcher/dispatcher._$$Dispatcher#_$delegate
     * @see    module:util/dispatcher/dispatcher._$$Dispatcher#_$redirect
     * @return {Void}
     */
    _pro._$delegate = function(){
        this.__doInitDomEvent([[
            document,'click',
            this.__onClickDelegate._$bind(this)
        ]]);
    };
    /**
     * 激活调度器，激活之前确保注册完会被调用的模块
     *
     * @method module:util/dispatcher/dispatcher._$$Dispatcher#_$active
     * @return {Void}
     */
    _pro._$active = function(){
        location.active();
    };
    /**
     * 模块载入回调
     *
     * @method module:util/dispatcher/dispatcher._$$Dispatcher#_$loaded
     * @param  {String} arg0 - 模块UMI
     * @param  {module:util/dispatcher/module._$$ModuleAbstract} arg1 - 模块构造器
     * @return {Void}
     */
    _pro._$loaded = function(_umi,_module){
        _umi = this.__config.al[_umi]||_umi;
        if (!_u._$isArray(_umi)){
            this._$regist(_umi,_module);
            this.__groups[this.__config.mg[_umi]]._$loadedUMI(_umi);
        }else{
            _u._$forEach(
                _umi,function(_key){
                    this._$loaded(_key,_module);
                },this
            );
        }
    };
    /**
     * 获取对应UMI配置的标题信息
     *
     * @method module:util/dispatcher/dispatcher._$$Dispatcher#_$getTitle
     * @param  {String} umi - 模块 UMI 标识
     * @return {String} 模块标题
     */
    _pro._$getTitle = function(umi){
        return this.__getModuleConf(umi,'title');
    };
    /**
     * 获取对应UMI配置的标题信息
     *
     * @method module:util/dispatcher/dispatcher._$$Dispatcher#_$getUMIByAlias
     * @param  {String} alias - 别名
     * @param  {Number} index - 多个 UMI 指定索引值
     * @return {String} 别名对应的 UMI 值
     */
    _pro._$getUMIByAlias = function(alias, index){
        var umi = this.__config.al[alias];
        if (_u._$isArray(umi)){
            return umi[index||0];
        }
        return umi;
    };
    /**
     * 启动调度系统
     *
     * 脚本举例
     * ```javascript
     * NEJ.define([
     *     'util/dispatcher/dispatcher'
     * ],function(_p){
     *     // 实例化调度器，并在全局设置dispatcher变量供模块使用
     *     _p._$startup({
     *         // 设置规则
     *         rules:{
     *             title:{
     *                 '/m/a/':'模块A',
     *                 '/m/b/':'模块B',
     *                 '/m/c/':'模块C'
     *             },
     *             rewrite:{
     *                 '404':'/m/c/0/',
     *                 '/m/c/$1/':/^\/c\/([\d])\/$/
     *             }
     *         },
     *         // 注册模块
     *         modules:{
     *             '/m':'/module/m.html',
     *             '/m/a/':'/module/m.c.html',
     *             '/m/b/':'/module/m.c.html',
     *             '/m/c/':{module:'/module/m.c.html',clazz:'g-mdl-c'}
     *         }
     *     });
     * });
     * ```
     *
     * @method   module:util/dispatcher/dispatcher._$startup
     * @param    {Object} arg0 - 配置信息，其他配置同调度器实例化配置
     * @property {String} tid  - 模版ID，默认template-box
     * @return   {module:util/dispatcher/dispatcher._$$Dispatcher} 调度器实例
     */
    _p._$startup = function(_options){
        if (!!window.dispatcher){
            console.error('dispatcher is already startup');
            return;
        }
        window.dispatcher =
            _p._$$Dispatcher.
            _$getInstance(_options);
        _t7._$dumpModules();
        _t1._$parseTemplate(
            (_options||_o).tid||'template-box',
            location.config
        );
        _v._$addEvent(
            document,'templateready',function(){
                window.setTimeout(
                    dispatcher._$active._$bind(dispatcher),0
                );
            }
        );
        return window.dispatcher;
    };

    if (CMPT){
        NEJ.P('nej.e')._$startup = _p._$startup;
        NEJ.P('nej.ut')._$$Dispatcher = _p._$$Dispatcher;
    }

    return _p;
},'083c017e2a5450e295d417651bc93279','7d45f691904093dd3d0d2a39eb337c1c','43a92a1cb30f0322e2bca627e0f6b635','0dd9ac3de45a7a1ce7c2f3ff80d53fcc','3695926c26a1894dcce266fdc52d2e3a','72ad80be205b50946707ef93158448db','73f169cf794774f1be9fb45582c96a38','5dc30961f3452903950eb8a25e3d2109','2d9f3e261792e3200572a50c66511cea','41acb32203547e00abf26d38d541f1cc','098c486f81cc3b0080bce996faad3294','6b0f41e54284357ad927f7ab1f2e0818','16c6ee60c6b3ca72fb25ef265bef87a8','ccb7acfe43034a55fd768d13b42c2b97');
I$('16c6ee60c6b3ca72fb25ef265bef87a8',function (NEJ,_k,_e,_u,_t0,_t1,_p,_o,_f,_r){
    var _pro;
    /**
     * 项目模块基类对象
     * 
     * @class    module:util/dispatcher/module._$$ModuleAbstract
     * @extends  module:util/event._$$EventTarget
     * 
     * @param    {Object} config    - 可选配置参数
     * @property {String} umi       - 当前模块的统一模块标识符
     * @property {Object} composite - 组合模块配置信息
     * @property {module:util/dispatcher/dispatcher._$$Dispatcher} dispatcher - 调度器实例
     */
    _p._$$ModuleAbstract = _k._$klass();
    _pro = _p._$$ModuleAbstract._$extend(_t0._$$EventTarget);
    /**
     * 控件初始化
     * 
     * @protected
     * @method module:util/dispatcher/module._$$ModuleAbstract#__init
     * @return {Void}
     */
    _pro.__init = function(_options){
        this.__super(_options);
        this.__export = {};
        this.__doBuild(_options.config);
    };
    /**
     * 控件重置
     * 
     * @protected
     * @method module:util/dispatcher/module._$$ModuleAbstract#__reset
     * @param  {Object} arg0 - 可选配置参数
     * @return {Void}
     */
    _pro.__reset = function(_options){
        this.__super(_options);
        this.__umi = _options.umi||'';
        this.__dispatcher = _options.dispatcher;
        this.__composites = _options.composite||_o;
        // void rewrite
        this._$batEvent({
            onshow:this.__onShow._$bind(this),
            onhide:this.__onHide._$bind(this),
            onrefresh:this.__onRefresh._$bind(this),
            onmessage:this.__onMessage._$bind(this),
            onbeforehide:this.__onBeforeHide._$bind(this)
        });
    };
    /**
     * 控件销毁
     * 
     * @protected
     * @method module:util/dispatcher/module._$$ModuleAbstract#__destroy
     * @return {Void}
     */
    _pro.__destroy = function(){
        this.__super();
        this.__export = {};
        delete this.__umi;
        delete this.__composites;
        delete this.__dispatcher;
    };
    /**
     * 阻止事件
     * 
     * @protected
     * @method module:util/dispatcher/module._$$ModuleAbstract#__stop
     * @param  {Object} arg0 - 事件对象
     * @return {Void}
     */
    _pro.__stop = function(_event){
        if (!!_event){
            _event.stopped = !0;
        }
    };
    /**
     * 构建模块，子类实现具体业务逻辑
     * 
     * @abstract
     * @method module:util/dispatcher/module._$$ModuleAbstract#__doBuild
     * @return {Void}
     */
    _pro.__doBuild = _f;
    /**
     * 模块退出前触发事件，通过阻止输入的事件做退出验证，子类实现具体逻辑
     * 
     * @abstract
     * @method module:util/dispatcher/module._$$ModuleAbstract#__onBeforeHide
     * @param  {Object} arg0 - 事件对象
     * @return {Void}
     */
    _pro.__onBeforeHide = _f;
    /**
     * 清除所有组合控件，除了调度器控件
     * 
     * @protected
     * @method module:util/dispatcher/module._$$ModuleAbstract#__doClearComponentExDsp
     * @return {Void}
     */
    _pro.__doClearComponentExDsp = (function(){
        var _doCheck = function(_component){
            return !!_t1._$$Dispatcher&&
                    (_component instanceof _t1._$$Dispatcher);
        };
        return function(){
            this.__doClearComponent(_doCheck);
        };
    })();
    /**
     * 接受到消息触发事件，子类实现具体逻辑
     * 
     * @abstract
     * @method module:util/dispatcher/module._$$ModuleAbstract#__onMessage
     * @param  {Object} arg0 - 事件对象
     * @return {Void}
     */
    _pro.__onMessage = _f;
    /**
     * 向目标模块发送消息
     * 
     * @protected
     * @method module:util/dispatcher/module._$$ModuleAbstract#__doSendMessage
     * @param  {String}   arg0 - 目标模块UMI
     * @param  {Variable} arg1 - 消息内容
     * @param  {Number}   arg2 - 消息模式
     * @return {Void}
     */
    _pro.__doSendMessage = function(_to,_message,_mode){
        this.__dispatcher._$message({
            to:_to,
            mode:_mode||0,
            data:_message,
            from:this.__umi
        });
    };
    /**
     * 发布消息
     * 
     * @protected
     * @method module:util/dispatcher/module._$$ModuleAbstract#__doPublishMessage
     * @param  {String} arg0 - 消息类型
     * @param  {Object} arg1 - 消息信息
     * @return {Void}
     */
    _pro.__doPublishMessage = function(_type,_data){
        this.__dispatcher._$publish(
            _type,{
                from:this.__umi,
                data:_data
            }
        );
    };
    /**
     * 订阅消息
     * 
     * @protected
     * @method module:util/dispatcher/module._$$ModuleAbstract#__doSubscribeMessage
     * @param  {String}   arg0 - 目标模块的UMI
     * @param  {String}   arg1 - 消息类型
     * @param  {Function} arg2 - 消息处理回调
     * @return {Void}
     */
    _pro.__doSubscribeMessage = function(){
        this.__dispatcher._$subscribe
            .apply(this.__dispatcher,arguments);
    };
    /**
     * 取模块对外开放的数据信息，依赖此模块的子模块可以访问到此信息
     * 
     * @method module:util/dispatcher/module._$$ModuleAbstract#_$getExportData
     * @return {Object} 对外开放的数据信息
     */
    _pro._$getExportData = function(){
        return this.__export;
    };
    /**
     * 解析模块所在容器节点
     * 
     * @protected
     * @method module:util/dispatcher/module._$$ModuleAbstract#__doParseParent
     * @param  {Object} arg0 - 配置信息
     * @return {Node}          模块所在容器节点
     */
    _pro.__doParseParent = function(_options){
        // try get parent
        // check input first
        var _parent;
        if (!_parent){
            var _data = _options.input||_o;
            _parent = _e._$get(_data.parent);
        }
        if (!_parent){
            var _data = _options.data||_o;
            _parent = _e._$get(_data.parent);
        }
        if (!_parent){
            _parent = _e._$get(_options.parent);
        }
        return _parent;
    };
    /**
     * 显示模块触发事件，子类可重写具体逻辑
     * 
     * @protected
     * @method module:util/dispatcher/module._$$ModuleAbstract#__onShow
     * @param  {Object} arg0 - 事件对象
     * @return {Void}
     */
    _pro.__onShow = function(_options){
        var _parent = this.__doParseParent(_options);
        // show and refresh module
        if (!!_parent&&!!this.__body){
            _parent.appendChild(this.__body);
        }
        this.__doApplyComposite('onshow',_options);
        this.__onRefresh(_options);
    };
    /**
     * 显示模块触发事件，子类实现具体逻辑
     * 
     * @protected
     * @method module:util/dispatcher/module._$$ModuleAbstract#__onRefresh
     * @param  {Object} arg0 - 事件对象
     * @return {Void}
     */
    _pro.__onRefresh = function(_options){
        this.__doApplyComposite('onrefresh',_options);
    };
    /**
     * 隐藏模块触发事件，子类实现具体逻辑
     * 
     * @protected
     * @method module:util/dispatcher/module._$$ModuleAbstract#__onHide
     * @return {Void}
     */
    _pro.__onHide = function(){
        this.__doHideComposite();
        _e._$removeByEC(this.__body);
    };
    /**
     * 是否忽略模块组合
     * 
     * @protected
     * @method module:util/dispatcher/module._$$ModuleAbstract#__isEscapedComposite
     * @return {Boolean} 是否忽略
     */
    _pro.__isEscapedComposite = (function(){
        var _reg0 = /^onshow|onrefresh|delay$/;
        return function(_umi){
            return _reg0.test(_umi);    
        };
    })();
    /**
     * 动态生成组合模块的输入参数，子类实现具体业务逻辑
     * 
     * @abstract
     * @method module:util/dispatcher/module._$$ModuleAbstract#__doGenCompositeParam
     * @param  {String} arg0 - 模块类别
     * @param  {Object} arg1 - 输入信息
     * @return {Object}        参数信息
     */
    _pro.__doGenCompositeParam = _f;
    /**
     * 应用组合模块
     * 
     * @protected
     * @method module:util/dispatcher/module._$$ModuleAbstract#__doApplyComposite
     * @param  {String} arg0 - 类型，onshow/onrefresh
     * @param  {Object} arg1 - 事件对象
     * @return {Void}
     */
    _pro.__doApplyComposite = (function(){
        var _doRedirect = function(_query,_options,_umi,_pid){
            if (this.__isEscapedComposite(_pid)) return;
            if (!!_query) _umi += (_umi.indexOf('?')>1?'&':'?')+_query;
            var _input = this.__doGenCompositeParam(_pid,_options)||{};
            _input.location = _options;
            _input.parent = this.__export[_pid];
            this.__dispatcher._$redirect(_umi,{input:_input});
        };
        return function(_type,_options){
            if (!_options.nodelay){
                // delay all
                if (!!this.__composites.delay) return;
                // check delay
                var _composite = this.__composites[_type]||_o;
                if (_composite.delay) return;
            }
            // do apply
            var _query = _u._$object2query(_options.param)||'';
            if (_type=='onrefresh'){
                _u._$loop(
                    this.__composites,
                    _doRedirect._$bind(this,_query,_options)
                );
            }
            _u._$loop(
                _composite,_doRedirect.
                _$bind(this,_query,_options)
            );
        };
    })();
    /**
     * 隐藏组合模块
     * 
     * @protected
     * @method module:util/dispatcher/module._$$ModuleAbstract#__doHideComposite
     * @return {Void}
     */
    _pro.__doHideComposite = (function(){
        var _doHide = function(_umi,_pid){
            if (!this.__isEscapedComposite(_pid)){
                this.__dispatcher._$hide(_umi);
            }
        };
        return function(){
            _u._$loop(this.__composites,_doHide,this);
            _u._$loop(this.__composites.onshow,_doHide,this);
            _u._$loop(this.__composites.onrefresh,_doHide,this);
        };
    })();
    /**
     * 注册模块，如果调度器还没有被实例化则先缓存注册内容
     *
     * 脚本举例
     * ```javascript
     * NEJ.define([
     *     'util/dispatcher/module'
     * ],function(_t){
     *     // 注册别名
     *     _t._$regist('blog-list',a._$$Module);
     *
     *     // 注册UMI
     *     _t._$regist('/blog/list/',a._$$Module);
     * });
     * ```
     * 
     * @method module:util/dispatcher/module._$regist
     * @param  {String} arg0 - 模块UMI或者别名
     * @param  {module:util/dispatcher/module._$$ModuleAbstract} arg1 - 模块构造函数
     * @return {Void}
     */
    _p._$regist = (function(){
        var _modules;
        // dump modules for dispatcher startup
        _p._$dumpModules = function(){
            if (!_modules) return;
            _u._$loop(_modules,function(_module,_umi){
                dispatcher._$loaded(_umi,_module);
            });
            _modules = null;
        };
        return function(_umi,_module){
            if (!!window.dispatcher){
                dispatcher._$loaded.
                    apply(dispatcher,arguments);
            }else{
                if (!_modules){
                    _modules = {};
                }
                _modules[_umi] = _module;
            }
        };
    })();
    
    if (CMPT){
        NEJ.P('nej.e')._$regist = _p._$regist;
        NEJ.P('nej.ut')._$$Module = _p._$$ModuleAbstract;
        NEJ.P('nej.ut')._$$AbstractModule = _p._$$ModuleAbstract;
    }
    
    return _p;
},'083c017e2a5450e295d417651bc93279','7d45f691904093dd3d0d2a39eb337c1c','43a92a1cb30f0322e2bca627e0f6b635','3695926c26a1894dcce266fdc52d2e3a','5dc30961f3452903950eb8a25e3d2109','df0ec655432039eee923b32bea3dbbe5');
I$('6e94510af15d7b4fbe9c5bb0aa80cb90',function (_k,_t,_p,_o,_f,_r){
  // variable declaration
  var _pro;
  /**
   * 项目模块基类对象
   * @class   {_$$Module}
   * @extends {_$$AbstractModule}
   * @param   {Object}  可选配置参数，已处理参数列表如下所示
   */
  _p._$$Module = _k._$klass();
  _pro = _p._$$Module._$extend(_t._$$ModuleAbstract);
  /**
   * 从地址中解析出UMI信息
   * @return {String} UMI信息
   */
  _pro.__doParseUMIFromOpt = (function(){
      var _reg0 = /\?|#/,
          _reg1 = /^\/m\//i;
      return function(_options){
          _options = (_options.input||_o).location||_options;
          return (_options.href||'/blog/').split(_reg0)[0].replace(_reg1,'/');
      };
  })();
  /**
   * 显示加载中状态
   * @param  {Object} 事件信息
   * @return {Void}
   */
  _pro.__onLoadingShow = function(_event){
      _event.value = '<p class="w-loading">&nbsp;</p>';
  };
  /**
   * 显示提示信息
   * @param  {Object} 事件信息
   * @return {Void}
   */
  _pro.__onMessageShow = function(_msg,_event){
      _event.value = '<p class="w-message">'+_msg+'</p>';
  };
  
  return _p;
},'7d45f691904093dd3d0d2a39eb337c1c','16c6ee60c6b3ca72fb25ef265bef87a8');