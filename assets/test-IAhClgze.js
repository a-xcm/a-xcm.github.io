import{i as u,j as c,f as a,_ as p,c as d,a as t,t as r,k as i,F as l,o as m}from"./index-DW19cnUD.js";function _(n,e,s){u(()=>n.addEventListener(e,s)),c(()=>n.removeEventListener(e,s))}function f(){const n=a(0),e=a(0);return _(window,"mousemove",s=>{n.value=s.pageX,e.value=s.pageY}),{x:n,y:e}}const v={__name:"test",setup(n){const{x:e,y:s}=f();return(g,o)=>(m(),d(l,null,[t("div",null," Mouse position: ("+r(i(e))+", "+r(i(s))+") ",1),o[0]||(o[0]=t("div",{class:"box"},[t("div",{class:"box-inner"},[t("img",{src:"http://hepengwei.cn/images/d2fa7cd8.png",alt:""})])],-1))],64))}},E=p(v,[["__scopeId","data-v-6ac77a75"]]);export{E as default};