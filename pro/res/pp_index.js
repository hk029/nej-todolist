window.NEJ_CONF={root:"../res/"};I$("8a2ee5e4c7957b999f052aedf7f1c8a3",function(e){e._$startup({rules:{rewrite:{404:"/m/today/","/m/":"/m/today/"},title:{"/m/":"Easy.To.Do - by voidsky","/m/today/":"Easy.To.Do - 今日待办","/m/history/":"Easy.To.Do - 历史完成","/m/reminder/":"Easy.To.Do- 提醒","/m/profile/":"Easy.To.Do- 个人资料"},alias:{"layout-top":"/?/top/","layout-hislist":"/m/history/","layout-reminder":"/m/reminder/","layout-profile":"/m/profile/","layout-btm":"/?/btm/","layout-todaylist":"/m/today/","layout-system":"/m"}},modules:{"/?/top/":"module/m-top/index.html","/?/btm/":"module/m-btm/index.html","/m":{module:"module/m-layout/index.html",composite:{top:"/?/top/",btm:"/?/btm/"}},"/m/history/":"module/m-historylist/index.html","/m/today/":"module/m-todaylist/index.html","/m/reminder/":"module/m-reminder/index.html","/m/profile/":"module/m-profile/index.html"},onbeforechange:function(e){var t=e.path||"";if(t&&t.indexOf("/?")<0&&t.indexOf("/m")<0)e.path="/m"+t}})},"245c10805cb6e2cba1c9e0aefc252670");