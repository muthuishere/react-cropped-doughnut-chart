(this["webpackJsonpreact-cropped-doughnut-chart-example"]=this["webpackJsonpreact-cropped-doughnut-chart-example"]||[]).push([[0],{174:function(e,n,t){"use strict";t.r(n);t(68);var r=t(0),a=t.n(r),o=t(60),i=t.n(o),l=t(34),s=t(3),u=t(66);t(173);function c(){return(c=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e}).apply(this,arguments)}function d(e,n){var t=document.createElementNS("http://www.w3.org/2000/svg",e);return n.forEach((function(e){var n=e[0],r=e[1];return t.setAttributeNS(null,n,r)})),t}function p(e,n){var t=document.createElement(e);return n.forEach((function(e){var n=e[0],r=e[1];return t.setAttribute(n,r)})),t}var m=["#FF0000","#FF7F00","#FFFF00","#00FF00","#00FFFF","#0000FF","#8B00FF"];function h(e){return e.label?e:c({},e,{label:""+e.value})}function f(e,n){return e.color?e:c({},e,{color:m[n]})}function b(e,n){var t=function(e){var n=e.every((function(e){return"number"===typeof e})),t=e;return n&&(t=e.map((function(e){return{value:e}}))),t}(e);if(!t.every((function(e){return null!=e.value})))throw new Error("Invalid Data Found, All items must have a value property");var r=t.reduce((function(e,n){return e+n.value}),0);return t.map((function(e){return c({},e,{percentage:e.value/r*100})})).map(h).map(f).map((function(e){return function(e,n){return c({},{labelColor:n},e)}(e,n)})).map(v).map(g)}function v(e){return c({},{id:e.value+""+(""+Math.floor(999998*Math.random())+1).padStart(6,"0")},e)}function g(e,n,t){return c({},{previousId:(t[n-1]||{id:null}).id},e)}function y(e,n,t,r){var a=(r-90)*Math.PI/180;return{x:e+t*Math.cos(a),y:n+t*Math.sin(a)}}function A(e,n,t){var r=e.innerRadius,a=e.outerRadius,o=n.startAngle,i=n.endAngle;return function(e,n,t){var r=e.x,a=e.y,o=n.startAngle,i=n.endAngle,l=y(r,a,t,o),s=y(r,a,t,i),u=i-o<=180?"0":"1";return["M",s.x,s.y,"A",t,t,0,u,0,l.x,l.y].join(" ")}({x:t.x,y:t.y},{startAngle:o,endAngle:i},r+(a-r)/2-20)}function w(e,n,t,r){var a=d("path",e),o=function(e,n,t){var r=e.x,a=e.y,o=n.startAngle,i=n.endAngle,l=y(r,a,t,o),s=y(r,a,t,i),u=i-o<=180?"0":"1";return["M",s.x,s.y,"A",t,t,0,u,0,l.x,l.y].join(" ")}(n,t,r);return a.setAttributeNS(null,"d",o),a}function x(e,n,t,r,a){var o=t.outerRadius,i=t.innerRadius;return w([["fill","none"],["stroke",r],["stroke-width",o-i],["stroke-dashoffset",""+-1*a],["stroke-dasharray",""+a],["class","path-container"]],e,n,i)}function C(e,n,t,r,a){var o=e.x,i=e.y,l=n.innerRadius,s=n.outerRadius,u=x({x:o,y:i},{startAngle:t.startAngle-20,endAngle:t.endAngle+20},{innerRadius:l,outerRadius:s+10},r,900);u.setAttribute("stroke-dashoffset","0");var c=function(e,n){return void 0===n&&(n="2s"),d("animate",[["attributeType","CSS"],["attributeName","stroke-dashoffset"],["values","0;"+e],["dur",n],["fill","freeze"]])}(900,a+"s");return u.appendChild(c),u}function S(e,n,t,r){var a=function(e,n,t){return d("circle",[["cx",e.x],["cy",e.y],["r",n],["fill",t]])}({x:e.x,y:e.y},n,t),o=function(e){return d("animate",[["attributeName","opacity"],["from","1"],["to","0"],["dur",e],["begin",".5s"],["fill","freeze"],["repeatCount","1"]])}(r+1+"s");return a.appendChild(o),a}function F(){var e=d("filter",[["id","glowfilter"],["filterUnits","userSpaceOnUse"],["x","0"],["y","0"],["width","100%"],["height","100%"]]),n=d("desc",[]);e.appendChild(n);var t=d("feMorphology",[["operator","dilate"],["radius","2"]]);e.appendChild(t);var r=d("defs",[]);return r.appendChild(e),r}var k={XXL:150,XL:125,L:100,M:50,S:35},N={XXL:[261,460],XL:[241,480],L:[221,500],M:[201,520],S:[181,540]};function E(e,n,t,r,a){var o=n.label,i=n.labelSize,l=n.labelColor,s="text"+e,u=function(e,n,t,r){var a=d("defs",[]),o=d("path",[["id",e],["stroke-width","0"]]);a.appendChild(o);var i=A(n,t,r);return o.setAttributeNS(null,"d",i),a}(s,t,r,a),c=function(e,n){var t=n.label,r=d("text",[["font-size",n.labelSize+"px"],["fill",n.labelColor],["rotate","180"]]),a=d("textPath",[["href","#"+e],["text-anchor","middle"],["startOffset","50%"]]);return a.innerHTML=t.split("").reverse().join(""),r.appendChild(a),r}(s,{label:o,labelSize:i,labelColor:l}),p=d("g",[]);return p.appendChild(u),p.appendChild(c),p}function z(e,n,t,r,a,o){var i=n.label,l=n.color,s=n.labelColor,u=r.innerRadius,c=r.outerRadius,p=a.labelSize,m=o.id,h=d("a",[["id","container"+("box"+m)],["class","slice-container"],["style","text-decoration: none;"]]);h.appendChild(function(e){var n=d("title",[]);return n.innerHTML=e,n}(i));var f=x(t,e,{innerRadius:u,outerRadius:c},l,0);h.appendChild(f);var b=E(m,{label:i,labelSize:p,labelColor:s},{innerRadius:u,outerRadius:c},e,t);return h.appendChild(b),h}function O(e,n){var t=c({},{radius:100,showAnimation:!1,animationDurationInSeconds:5,title:"",titleColor:"#FF0000",thicknessSize:"M",gapSize:"XL",showGlow:!1,labelSize:12,labelColor:"white",backgroundColor:"white",imageUrl:"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"},n),r=c({},t,{showAnimation:"true"===String(t.showAnimation),showGlow:"true"===String(t.showGlow),radius:Number(t.radius),animationDurationInSeconds:Number(t.animationDurationInSeconds),labelSize:Number(t.labelSize)}),a=r.radius,o=r.title,i=r.showGlow,l=r.thicknessSize,s=r.showAnimation,u=r.animationDurationInSeconds,m=r.gapSize,h=r.backgroundColor,f=r.imageUrl,v=r.titleColor,g=r.labelSize,y=r.labelColor,A=k[l],w=2*(a+A),x=function(e){return{x:e/2,y:e/2}}(w),E=x.x,O=x.y,R=a+A,I=N[m],j=I[0],L=(I[1]-j)/100,M=d("g",[]),X=function(e,n,t,r,a){var o=e.x,i=e.y,l=p("div",[["style","display: table-cell; text-align: center; vertical-align: middle;color:"+a+";"]]),s=.8*n,u=p("img",[["src",t],["width",s],["height",s]]),c=p("br",[]);l.appendChild(u),l.appendChild(c),l.innerHTML+=r;var m=p("div",[["style","display: table; font-size: 24px; width: 100%; height: 100%;"]]);m.appendChild(l);var h=d("foreignObject",[["x",o-s],["y",i-s],["width",2*s],["height",2*s]]);return h.appendChild(m),h}({x:E,y:O},a,f,o,v);M.appendChild(X);var D=j,G=b(e,y);if(i){console.log("showGlow");var _=F();M.appendChild(_)}if(G.forEach((function(e,n){var t=e.percentage,r=e.id,o=e.previousId,i=D+t*L,l=z({startAngle:D,endAngle:i},e,{x:E,y:O},{innerRadius:a,outerRadius:R},{labelSize:g,labelColor:y},{id:r,previousId:o});M.appendChild(l),D=i})),s){var H=C({x:E,y:O},{innerRadius:a,outerRadius:R},{startAngle:j,endAngle:D},h,u);M.appendChild(H);var U=S({x:E,y:O},a,h,u);M.appendChild(U),U.querySelector("animate").onend=function(){M.removeChild(U),M.removeChild(H)}}var B=function(e){return d("svg",[["width",e],["height",e]])}(w),J=function(e){var n="";e.showGlow&&(n="\n\n  a:hover .path-container {\n    cursor: pointer;\n    transition: all 0.5s ease;\n   filter:url(#glowfilter) brightness(1.0);\n  }\n\n  a:hover text {\n    transition: all 0.5s ease;\n    cursor: pointer;\n    font-weight: bold;\n  }\n");var t=d("style",[]);return t.innerHTML=n+'\n\n\n.description {\n  pointer-events: none;\n  position: absolute;\n  font-size: 18px;\n  text-align: center;\n  background: white;\n  padding: 10px 15px;\n  z-index: 5;\n  height: 30px;\n  line-height: 30px;\n  margin: 0 auto;\n  color: #21669e;\n  border-radius: 5px;\n  box-shadow: 0 0 0 1px #eee;\n  -moz-transform: translateX(-50%);\n  -ms-transform: translateX(-50%);\n  -webkit-transform: translateX(-50%);\n  transform: translateX(-50%);\n  display: none;\n}\n.description.active {\n  display: block;\n}\n.description:after {\n  content: "";\n  position: absolute;\n  left: 50%;\n  top: 100%;\n  width: 0;\n  height: 0;\n  margin-left: -10px;\n  border-left: 10px solid transparent;\n  border-right: 10px solid transparent;\n  border-top: 10px solid white;\n}\n\n\n.horse-chart-tooltip::after {\n    content: "";\n    position: absolute;\n    top: 100%;\n    left: 50%;\n    margin-left: -5px;\n    border-width: 5px;\n    border-style: solid;\n    border-color: cornsilk transparent transparent transparent;\n}\n.tooltip-animation-on\n{\n    display: block;\n\n    -webkit-animation: fadeInFromNone 0.5s ease-out;\n    -moz-animation: fadeInFromNone 0.5s ease-out;\n    -o-animation: fadeInFromNone 0.5s ease-out;\n    animation: fadeInFromNone 0.5s ease-out;\n}\n@keyframes fadeInFromNone {\n    0% {\n        display: none;\n        opacity: 0;\n    }\n\n    1% {\n        display: block;\n        opacity: 0;\n    }\n\n    100% {\n        display: block;\n        opacity: 1;\n    }\n}\n.tooltip-animation-off\n{\n    display: block;\n\n    -webkit-animation: fadeOutFromNone 0.5s ease-out;\n    -moz-animation: fadeOutFromNone 0.5s ease-out;\n    -o-animation: fadeOutFromNone 0.5s ease-out;\n    animation: fadeOutFromNone 0.5s ease-out;\n}\n@keyframes fadeOutFromNone {\n    0% {\n        display: block;\n        opacity: 1;\n    }\n\n    1% {\n        display: block;\n        opacity: 0;\n    }\n\n    100% {\n        display: none;\n        opacity: 1;\n    }\n}\n\n\n  foreignObject {\n    cursor: pointer;\n  }\n\n  a text {\n    transition: all 0.5s ease;\n    filter: ;\n    cursor: pointer;\n  }\n    a .path-container {\n\n      transition: all 0.5s ease;\n      filter: brightness(0.7);\n    }\n   a:hover .path-container {\n    cursor: pointer;\n    transition: all 0.5s ease;\n   filter:brightness(0.8);\n  }\n\n',t}({showGlow:i});return B.appendChild(J),B.appendChild(M),B}var R=function(e){var n=e.items,t=e.options,o=Object(r.useRef)(null);return Object(r.useEffect)((function(){var e=O(n,t);o.current&&(o.current.children.length>0&&o.current.removeChild(o.current.children[0]),o.current.appendChild(e))}),[n,t]),a.a.createElement("div",{ref:o})};t(59);function I(){var e=[{value:24,color:"red",labelColor:"white",label:"High"},{value:227,color:"yellow",labelColor:"white",label:"Medium"},{value:49,color:"#00EE00",label:"Low"}],n={radius:200,title:"Issues",titleColor:"#FF0000",thicknessSize:"S",gapSize:"XL",labelSize:12,showAnimation:!1,animationDurationInSeconds:5,labelColor:"white",backgroundColor:"white",imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Noun_project_exclamation_icon_620383.svg/512px-Noun_project_exclamation_icon_620383.svg.png?20180327224854",items:JSON.stringify(e)},t=Object(r.useState)(e),o=Object(s.a)(t,2),i=o[0],c=o[1],d=Object(r.useState)(n),p=Object(s.a)(d,2),m=p[0],h=p[1],f={radius:"any Number",title:"any string",titleColor:"Color in format #FF0000 or color string",thicknessSize:"Any of S,M,L,XL",gapSize:"Any of S,M,L,XL",labelSize:"Any Number",labelColor:"Color in format #FF0000 or color string",backgroundColor:"Color in format #FF0000 or color string",imgUrl:"Any URL",showAnimation:"true or false",animationDurationInSeconds:"Any Number",items:"JSON string with format [ { value:24,color:'red',labelColor:'white'}]"},b=Object(u.a)({initialValues:Object(l.a)({},n),onSubmit:function(e){console.log("values:",e);var n=Object(l.a)({},e);delete n.items,h(n),c(JSON.parse(e.items))}});return a.a.createElement("div",{className:"container"},a.a.createElement("div",{className:"row"},a.a.createElement("div",{className:"col-6"},a.a.createElement(R,{items:i,options:m})),a.a.createElement("div",{className:"col-6"},a.a.createElement("h3",null," Change values to see in action"),a.a.createElement("form",{onSubmit:b.handleSubmit},Object.keys(n).map((function(e){return a.a.createElement("div",{className:"form-group",key:"div"+e},a.a.createElement("label",{htmlFor:e},e),a.a.createElement("input",{className:"form-control",id:e,name:e,type:"text",onChange:b.handleChange,value:b.values[e]}),a.a.createElement("small",{id:e+"Help",className:"form-text text-muted"},f[e]))})),a.a.createElement("button",{type:"submit"},"Submit")))))}var j=function(){return a.a.createElement("div",{className:"container"},a.a.createElement("h2",null,"React Doughnut chart demo"),a.a.createElement(I,null),a.a.createElement("hr",null))};i.a.render(a.a.createElement(j,null),document.getElementById("root"))},59:function(e,n,t){},67:function(e,n,t){e.exports=t(174)},68:function(e,n,t){}},[[67,1,2]]]);
//# sourceMappingURL=main.162068a4.chunk.js.map