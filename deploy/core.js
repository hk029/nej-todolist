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
cant read file /Users/voidsky/project/nej项目/prj/easytodo/webapp/src/javascript/lib/nej/base/klass.js for utf-8, cause:
{"errno":-2,"code":"ENOENT","syscall":"open","path":"/Users/voidsky/project/nej项目/prj/easytodo/webapp/src/javascript/lib/nej/base/klass.js"}
cant read file /Users/voidsky/project/nej项目/prj/easytodo/webapp/src/javascript/lib/nej/base/element.js for utf-8, cause:
{"errno":-2,"code":"ENOENT","syscall":"open","path":"/Users/voidsky/project/nej项目/prj/easytodo/webapp/src/javascript/lib/nej/base/element.js"}
cant read file /Users/voidsky/project/nej项目/prj/easytodo/webapp/src/javascript/lib/nej/util/template/tpl.js for utf-8, cause:
{"errno":-2,"code":"ENOENT","syscall":"open","path":"/Users/voidsky/project/nej项目/prj/easytodo/webapp/src/javascript/lib/nej/util/template/tpl.js"}
cant read file /Users/voidsky/project/nej项目/prj/easytodo/webapp/src/javascript/lib/nej/util/dispatcher/module.js for utf-8, cause:
{"errno":-2,"code":"ENOENT","syscall":"open","path":"/Users/voidsky/project/nej项目/prj/easytodo/webapp/src/javascript/lib/nej/util/dispatcher/module.js"}
cant read file /Users/voidsky/project/nej项目/prj/easytodo/webapp/src/javascript/lib/nej/mypro/module/module.js for utf-8, cause:
{"errno":-2,"code":"ENOENT","syscall":"open","path":"/Users/voidsky/project/nej项目/prj/easytodo/webapp/src/javascript/lib/nej/mypro/module/module.js"}
cant read file /Users/voidsky/project/nej项目/prj/easytodo/webapp/src/javascript/lib/nej/util/chain/NodeList.js for utf-8, cause:
{"errno":-2,"code":"ENOENT","syscall":"open","path":"/Users/voidsky/project/nej项目/prj/easytodo/webapp/src/javascript/lib/nej/util/chain/NodeList.js"}
cant read file /Users/voidsky/project/nej项目/prj/easytodo/webapp/src/javascript/lib/nej/util/template/jst.js for utf-8, cause:
{"errno":-2,"code":"ENOENT","syscall":"open","path":"/Users/voidsky/project/nej项目/prj/easytodo/webapp/src/javascript/lib/nej/util/template/jst.js"}
cant read file /Users/voidsky/project/nej项目/prj/easytodo/webapp/src/javascript/lib/nej/mypro/stroage.js for utf-8, cause:
{"errno":-2,"code":"ENOENT","syscall":"open","path":"/Users/voidsky/project/nej项目/prj/easytodo/webapp/src/javascript/lib/nej/mypro/stroage.js"}