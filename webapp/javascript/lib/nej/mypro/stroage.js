NEJ.define(['base/global'],function(NEJ,_p,_o,_f,_r){
  var _s = window.localStorage;
  var prefix = 'easy_';
  // 设置localstorage的当前长度为0
  _p.__curlen = 0;
  _p.MAX_LEN = 2048;

  _p._get = function (name){
    var item = _s.getItem(prefix+name);
    return JSON.parse(item);
  }
  _p._set = function(name,val){
    // 所有的类型都通过JSON格式化成字符出串（包括字符串，会多2字节）,方便提取处理
    var str = JSON.stringify(val);
    _s.setItem(prefix+name,str);
    this.__curlen += str.length;
  }

  _p._setMaxStroage = function(max){
    this.MAX_LEN = max;
  }
  _p._clear = function(){
    var tmp = [];
    this._forEach(function(key){
      if(key && key.indexOf(prefix) === 0){
        tmp.push(key);
      }
    });
    tmp.forEach(function(key){
      _s.removeItem(key);
    })
  }
  _p._remove = function(name){
    _s.removeItem(prefix+name);
  }
  _p._forEach = function(callback){
    var len = _s.length;
    for(var i = 0;i<len;i++){
      var key = _s.key(i),
          val = _s.getItem(key);
      if(key.indexOf(prefix)===0){
        callback(key,val);
      }
    }
  }

  if (CMPT){
    NEJ.copy(NEJ.P('nej.p'),_p);
  }
  
  return _p;
});
