(function(e){function t(t){for(var r,l,o=t[0],u=t[1],s=t[2],f=0,p=[];f<o.length;f++)l=o[f],a[l]&&p.push(a[l][0]),a[l]=0;for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(e[r]=u[r]);c&&c(t);while(p.length)p.shift()();return i.push.apply(i,s||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],r=!0,o=1;o<n.length;o++){var u=n[o];0!==a[u]&&(r=!1)}r&&(i.splice(t--,1),e=l(l.s=n[0]))}return e}var r={},a={1:0},i=[];function l(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,l),n.l=!0,n.exports}l.m=e,l.c=r,l.d=function(e,t,n){l.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},l.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.t=function(e,t){if(1&t&&(e=l(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(l.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)l.d(n,r,function(t){return e[t]}.bind(null,r));return n},l.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return l.d(t,"a",t),t},l.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},l.p="/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],u=o.push.bind(o);o.push=t,o=o.slice();for(var s=0;s<o.length;s++)t(o[s]);var c=u;i.push([2,0]),n()})({2:function(e,t,n){e.exports=n("Vtdi")},"8fLD":function(e,t,n){"use strict";var r=n("zW5s"),a=n.n(r);a.a},EDI0:function(e,t,n){},Vtdi:function(e,t,n){"use strict";n.r(t);n("VRzm");var r=n("Kw5r"),a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("PlateList")],1)},i=[],l=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",[e._v(" \n      Welcome "+e._s(e.currentFamily.name)+"!\n    ")]),n("div",[e._v("\n      \n  Select your family:"),n("select",{directives:[{name:"model",rawName:"v-model",value:e.currentFamily,expression:"currentFamily"}],on:{change:[function(t){var n=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(e){var t="_value"in e?e._value:e.value;return t});e.currentFamily=t.target.multiple?n:n[0]},function(t){e.getPlates()}]}},e._l(e.families,function(t){return n("option",{key:t._id,domProps:{value:t}},[e._v(e._s(t.name))])}))]),n("ul",e._l(e.plates,function(t){return n("li",{key:t.name,staticClass:"plate",class:{found:t.found},on:{click:function(n){e.markAsDone(t)}}},[n("div"),e._v("\n        "+e._s(t.name)+"\n      ")])}))])},o=[],u=(n("f3/d"),n("ls82"),n("MECJ")),s=n("vDqi"),c=n.n(s),f=function(e){return console.log(e)},p={name:"PlateList",props:{},data:function(){return{plates:[],families:[],selected:"",currentFamily:{}}},created:function(){var e=Object(u["a"])(regeneratorRuntime.mark(function e(){var t;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return f("compotnent created"),e.next=3,c.a.post("/api",{query:"{\n          allFamilies{\n            name\n            _id\n        }}"});case 3:t=e.sent,this.families=t.data.data.allFamilies;case 5:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),methods:{getPlates:function(){var e=Object(u["a"])(regeneratorRuntime.mark(function e(t){var n;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return f({msg:"getting plates, on change",evt:t}),e.next=3,c.a.post("/api",{query:"\n       query GetPlatesForFamily($familyId: String!) {   \n          familyPlates (familyId: $familyId){\n            name\n            abbreviation\n            familyId\n            _id\n            found\n        }}",variables:{familyId:this.currentFamily._id}});case 3:n=e.sent,this.plates=n.data.data.familyPlates;case 5:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),markAsDone:function(){var e=Object(u["a"])(regeneratorRuntime.mark(function e(t){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return f({msg:"marking plate as done",plate:t,name:t.name}),e.next=3,c.a.post("/api",{query:"\n       mutation MarkPlateForFamily($familyId: String!, $plateId: String!) {   \n          markPlateSelected(familyId: $familyId, plateId: $plateId){\n          familyId\n          plateId\n        }}",variables:{familyId:this.currentFamily._id,plateId:t._id}});case 3:t.found=new Date;case 4:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()}},d=p,m=(n("8fLD"),n("KHd+")),v=Object(m["a"])(d,l,o,!1,null,"78e6c95a",null),y=v.exports,h={name:"app",components:{PlateList:y}},g=h,_=(n("ZL7j"),Object(m["a"])(g,a,i,!1,null,null,null)),b=_.exports;r["a"].config.productionTip=!1,new r["a"]({render:function(e){return e(b)}}).$mount("#app")},ZL7j:function(e,t,n){"use strict";var r=n("EDI0"),a=n.n(r);a.a},zW5s:function(e,t,n){}});
//# sourceMappingURL=app.ec46e3c9.js.map