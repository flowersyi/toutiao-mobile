(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3e9e35ce"],{1235:function(t,e,n){},2423:function(t,e,n){"use strict";n.d(e,"f",(function(){return r})),n.d(e,"e",(function(){return i})),n.d(e,"b",(function(){return c})),n.d(e,"d",(function(){return s})),n.d(e,"a",(function(){return l})),n.d(e,"c",(function(){return o}));var a=n("b775"),r=function(t){return Object(a["a"])({method:"GET",url:"/app/v1_1/articles",params:t})},i=function(t){return Object(a["a"])({method:"GET",url:"/app/v1_0/articles/".concat(t)})},c=function(t){return Object(a["a"])({method:"POST",url:"/app/v1_0/article/likings",data:{target:t}})},s=function(t){return Object(a["a"])({method:"DELETE",url:"/app/v1_0/article/likings/".concat(t)})},l=function(t){return Object(a["a"])({method:"POST",url:"/app/v1_0/article/collections",data:{target:t}})},o=function(t){return Object(a["a"])({method:"DELETE",url:"/app/v1_0/article/collections/".concat(t)})}},5899:function(t,e){t.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},"58a8":function(t,e,n){var a=n("1d80"),r=n("577e"),i=n("5899"),c="["+i+"]",s=RegExp("^"+c+c+"*"),l=RegExp(c+c+"*$"),o=function(t){return function(e){var n=r(a(e));return 1&t&&(n=n.replace(s,"")),2&t&&(n=n.replace(l,"")),n}};t.exports={start:o(1),end:o(2),trim:o(3)}},7070:function(t,e,n){"use strict";n("7e3a")},"7abe":function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"home-container"},[n("van-nav-bar",{staticClass:"app-nav-bar"},[n("van-button",{staticClass:"search-btn",attrs:{slot:"title",icon:"search",type:"info",round:"",size:"small",to:"/search"},slot:"title"},[t._v("搜索")])],1),n("van-tabs",{staticClass:"channel-tabs",model:{value:t.channel_active,callback:function(e){t.channel_active=e},expression:"channel_active"}},[t._l(t.channels,(function(t){return n("van-tab",{key:t.id,staticClass:"tab-item",attrs:{title:t.name}},[n("article-list",{attrs:{channel:t}})],1)})),n("div",{staticClass:"wap-nav-placeholder",attrs:{slot:"nav-right"},slot:"nav-right"}),n("div",{staticClass:"channel-nav-right",attrs:{slot:"nav-right"},on:{click:function(e){t.isChannelEditshow=!0}},slot:"nav-right"},[n("van-icon",{attrs:{name:"wap-nav"}})],1)],2),n("van-popup",{style:{height:"100%"},attrs:{closeable:"","close-icon-position":"top-left",position:"bottom",round:"","get-container":"body",overlay:!1},model:{value:t.isChannelEditshow,callback:function(e){t.isChannelEditshow=e},expression:"isChannelEditshow"}},[n("channel-edit",{attrs:{channels:t.channels,active:t.channel_active},on:{close:function(e){t.isChannelEditshow=!1},"update-active":function(e){t.channel_active=e}}})],1)],1)},r=[],i=n("1da1"),c=n("5530"),s=(n("96cf"),n("b775")),l=function(){return Object(s["a"])({method:"GET",url:"/app/v1_0/user/channels"})},o=function(){return Object(s["a"])({method:"GET",url:"/app/v1_0/channels"})},u=function(t){return Object(s["a"])({method:"PATCH",url:"/app/v1_0/user/channels",data:t})},d=function(t){return Object(s["a"])({method:"DELETE",url:" /app/v1_0/user/channels/".concat(t)})},h=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{ref:"article-list",staticClass:"article-list"},[n("van-pull-refresh",{on:{refresh:t.onRefresh},model:{value:t.refreshing,callback:function(e){t.refreshing=e},expression:"refreshing"}},[n("van-list",{attrs:{finished:t.finished,"finished-text":"没有更多了"},on:{load:t.onLoad},model:{value:t.loading,callback:function(e){t.loading=e},expression:"loading"}},t._l(t.list,(function(t,e){return n("article-item",{key:e,attrs:{title:t.title,article:t}})})),1)],1)],1)},f=[],p=n("2909"),v=n("2423"),m=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("van-cell",{staticClass:"article-item",attrs:{to:"/article/"+t.article.art_id}},[n("div",{staticClass:"title van-multi-ellipsis--l3",attrs:{slot:"title"},slot:"title"},[t._v(t._s(t.article.title))]),n("div",{attrs:{slot:"label"},slot:"label"},[3===t.article.cover.type?n("div",{staticClass:"cover-wrap"},t._l(t.article.cover.images,(function(t,e){return n("div",{key:e,staticClass:"cover-item"},[n("van-image",{staticClass:"image-item",attrs:{src:t}})],1)})),0):t._e(),n("div",{staticClass:"label-wrap"},[n("span",{},[t._v(t._s(t.article.aut_name))]),n("span",{},[t._v(t._s(t.article.comm_count))]),n("span",{},[t._v(t._s(t._f("relativeTime")(t.article.pubdate)))])])]),1===t.article.cover.type?n("van-image",{staticClass:"right-cover",attrs:{src:t.article.cover.images[0]}}):t._e()],1)},b=[],g={name:"ArticleItem",components:{},props:{article:{type:Object,required:!0}},data:function(){return{}},computed:{},watch:{},created:function(){},mounted:function(){},methods:{}},_=g,C=(n("8dda"),n("2877")),w=Object(C["a"])(_,m,b,!1,null,"4e3b7c2e",null),E=w.exports,O=n("2ef0"),x={name:"ArticleList",components:{ArticleItem:E},props:{channel:{type:Object,required:!0}},data:function(){return{list:[],finished:!1,loading:!1,refreshing:!1,timestamp:null,scrollTop:0}},computed:{},watch:{},created:function(){},mounted:function(){var t=this,e=this.$refs["article-list"];e.onscroll=Object(O["debounce"])((function(){t.scrollTop=e.scrollTop}),50)},activated:function(){this.$refs["article-list"].scrollTop=this.scrollTop},methods:{onLoad:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){var n,a,r,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(v["f"])({channel_id:t.channel.id,timestamp:t.timestamp||+new Date,with_top:0});case 2:a=e.sent,r=a.data,console.log(r),t.timestamp=r.data.pre_timestamp,i=r.data.results,(n=t.list).push.apply(n,Object(p["a"])(i)),t.loading=!1,i.length||(t.finished=!0);case 10:case"end":return e.stop()}}),e)})))()},onRefresh:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){var n,a,r,i,c;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(v["f"])({channel_id:t.channel.id,timestamp:Date.now(),with_top:0});case 2:a=e.sent,r=a.data,i=r.data.results,(n=t.list).unshift.apply(n,Object(p["a"])(i)),t.refreshing=!1,c=i.length?"更新了".concat(i.length,"条数据"):"暂无数据更新",t.$toast({message:c,position:"top",duration:1500});case 9:case"end":return e.stop()}}),e)})))()}}},k=x,j=(n("7070"),Object(C["a"])(k,h,f,!1,null,"6ced2a6e",null)),y=j.exports,A=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"channel-edit"},[n("van-cell",{attrs:{center:"",border:!1}},[n("div",{staticClass:"channel-title",attrs:{slot:"title"},slot:"title"},[t._v("我的频道")]),n("van-button",{staticClass:"edit-btn",attrs:{size:"mini",type:"danger",plain:"",round:""},on:{click:function(e){t.isEdit=!t.isEdit}}},[t._v(t._s(t.isEdit?"完成":"编辑"))])],1),n("van-grid",{attrs:{gutter:10}},t._l(t.channels,(function(e,a){return n("van-grid-item",{key:a,staticClass:"grid-item",class:{active:a===t.active},attrs:{text:e.name,icon:t.isEdit&&0!==a?"clear":""},on:{click:function(n){return t.onUserChannelClick(e.id,a)}}})})),1),n("van-cell",{attrs:{center:"",border:!1}},[n("div",{staticClass:"channel-title",attrs:{slot:"title"},slot:"title"},[t._v("频道推荐")])]),n("van-grid",{attrs:{gutter:10}},t._l(t.recommendChannels,(function(e){return n("van-grid-item",{key:e.id,staticClass:"grid-item",attrs:{text:e.name},on:{click:function(n){return t.onAdd(e)}}})})),1)],1)},T=[],I=(n("a9e3"),n("4de4"),n("7db0"),n("a434"),n("2f62")),N=n("5d2d"),R={name:"ChannelEdit",components:{},props:{channels:{type:Array,required:!0},active:{type:Number,required:!0}},data:function(){return{allChannel:[],isEdit:!1}},computed:Object(c["a"])({recommendChannels:function(){var t=this;return this.allChannel.filter((function(e){return!t.channels.find((function(t){return t.id===e.id}))}))}},Object(I["b"])(["user"])),watch:{},created:function(){this.loadAllChannels()},mounted:function(){},methods:{loadAllChannels:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){var n,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,o();case 2:n=e.sent,a=n.data,t.allChannel=a.data.channels,console.log(a);case 6:case"end":return e.stop()}}),e)})))()},onAdd:function(t){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(console.log(t),e.channels.push(t),!e.user){n.next=7;break}return n.next=5,u({channels:[{id:t.id},{sqe:e.channels.length}]});case 5:n.next=8;break;case 7:Object(N["b"])("user-channels",e.channels);case 8:case"end":return n.stop()}}),n)})))()},onUserChannelClick:function(t,e){this.isEdit&&0!==e?this.deleteChannel(t,e):this.switchChannel(e)},deleteChannel:function(t,e){var n=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(console.log("删除频道"),e<=n.active&&n.$emit("update-active",n.active-1),n.channels.splice(e,1),!n.user){a.next=8;break}return a.next=6,d(t);case 6:a.next=9;break;case 8:Object(N["b"])("user-channels",n.channels);case 9:case"end":return a.stop()}}),a)})))()},switchChannel:function(t){this.$emit("update-active",t),this.$emit("close"),console.log("切换频道")}}},$=R,L=(n("8b7d"),Object(C["a"])($,A,T,!1,null,"1eb2bf9b",null)),S=L.exports,G={name:"HomeIndex",components:{ArticleList:y,ChannelEdit:S},props:{},data:function(){return{channel_active:0,channels:[],isChannelEditshow:!1}},computed:Object(c["a"])({},Object(I["b"])(["user"])),watch:{},created:function(){this.loadChannels()},mounted:function(){},methods:{loadChannels:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){var n,a,r,i,c,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(n=[],!t.user){e.next=9;break}return e.next=4,l();case 4:a=e.sent,r=a.data,n=r.data.channels,e.next=19;break;case 9:if(i=Object(N["a"])("user-channels"),!i){e.next=14;break}n=i,e.next=19;break;case 14:return e.next=16,l();case 16:c=e.sent,s=c.data,n=s.data.channels;case 19:t.channels=n;case 20:case"end":return e.stop()}}),e)})))()}}},F=G,q=(n("8df0"),Object(C["a"])(F,a,r,!1,null,"6d6877da",null));e["default"]=q.exports},"7db0":function(t,e,n){"use strict";var a=n("23e7"),r=n("b727").find,i=n("44d2"),c="find",s=!0;c in[]&&Array(1)[c]((function(){s=!1})),a({target:"Array",proto:!0,forced:s},{find:function(t){return r(this,t,arguments.length>1?arguments[1]:void 0)}}),i(c)},"7e3a":function(t,e,n){},"8b7d":function(t,e,n){"use strict";n("d3e7")},"8dda":function(t,e,n){"use strict";n("1235")},"8df0":function(t,e,n){"use strict";n("ecb5")},a9e3:function(t,e,n){"use strict";var a=n("83ab"),r=n("da84"),i=n("94ca"),c=n("6eeb"),s=n("5135"),l=n("c6b6"),o=n("7156"),u=n("d9b5"),d=n("c04e"),h=n("d039"),f=n("7c73"),p=n("241c").f,v=n("06cf").f,m=n("9bf2").f,b=n("58a8").trim,g="Number",_=r[g],C=_.prototype,w=l(f(C))==g,E=function(t){if(u(t))throw TypeError("Cannot convert a Symbol value to a number");var e,n,a,r,i,c,s,l,o=d(t,"number");if("string"==typeof o&&o.length>2)if(o=b(o),e=o.charCodeAt(0),43===e||45===e){if(n=o.charCodeAt(2),88===n||120===n)return NaN}else if(48===e){switch(o.charCodeAt(1)){case 66:case 98:a=2,r=49;break;case 79:case 111:a=8,r=55;break;default:return+o}for(i=o.slice(2),c=i.length,s=0;s<c;s++)if(l=i.charCodeAt(s),l<48||l>r)return NaN;return parseInt(i,a)}return+o};if(i(g,!_(" 0o1")||!_("0b1")||_("+0x1"))){for(var O,x=function(t){var e=arguments.length<1?0:t,n=this;return n instanceof x&&(w?h((function(){C.valueOf.call(n)})):l(n)!=g)?o(new _(E(e)),n,x):E(e)},k=a?p(_):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger,fromString,range".split(","),j=0;k.length>j;j++)s(_,O=k[j])&&!s(x,O)&&m(x,O,v(_,O));x.prototype=C,C.constructor=x,c(r,g,x)}},d3e7:function(t,e,n){},ecb5:function(t,e,n){}}]);
//# sourceMappingURL=chunk-3e9e35ce.15312beb.js.map