I$("5b41ca3d013110810b5886650aa877f9",function(e,t,n,r,i,a,o,c,s,f,u,_){var d;s._$$ModuleLayoutSystem=e._$klass();d=s._$$ModuleLayoutSystem._$extend(a._$$Module);d.__doBuild=function(){this.__body=t._$html2node(n._$getTextTemplate("module-id-history"));console.log("his build");r._$add("his-template");this.__curEdit=-1;this.__hisdata=c._get("hislist")};d.__onShow=function(e){this.__super(e);var t=this;this.__hislist=o("#his-content");if(this.__hisdata)this.__events.onrefresh(this.__hisdata);else{this.__hisdata={hislist:[{date:"2018-04-25",tasks:[{taskname:"收拾行李",done:1},{taskname:"看电影",done:1},{taskname:"制定旅行计划",done:1}]},{date:"2018-04-24",tasks:[{taskname:"买菜",done:0},{taskname:"背单词",done:1}]}]};c._set("hislist",this.__hisdata);this.__events.onrefresh(this.__hisdata)}};d.__onRefresh=function(e){this.__super(e);if(e.hislist){var t=r._$get("his-template",e);o(this.__hislist)._$html(t)}};d.__onHide=function(){this.__super()};i._$regist("layout-hislist",s._$$ModuleLayoutSystem)},"a83e6f6615d975f5a8381c7c5c6bec91","5c7cd3f0e9d746e277df4064a5cb3396","3bd305aaf742c1eba49a237458f65614","65a40ac6aeefd404b1a59be130b9ea39","7439c9c83c68eefc0b89c521229b1943","8d792cf24135bbb3ddbc22ecb1f0a209","98f173d99953e99e8803ac3724f23fa6","f0b5165d7bfb3e7018ba3314755ff0fb");