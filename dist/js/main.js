/**
 * Bundle of AWEMA virual-tour
 * Generated: 2021-12-11 14:57:26
 * Version: 1.2.0
 */

!function(){"use strict";var t,e=(function(t,e){var i;i=function(){function t(){for(var t=0,e={};t<arguments.length;t++){var i=arguments[t];for(var s in i)e[s]=i[s]}return e}function e(t){return t.replace(/(%[0-9A-Z]{2})+/g,decodeURIComponent)}return function i(s){function o(){}function n(e,i,n){if("undefined"!=typeof document){"number"==typeof(n=t({path:"/"},o.defaults,n)).expires&&(n.expires=new Date(1*new Date+864e5*n.expires)),n.expires=n.expires?n.expires.toUTCString():"";try{var r=JSON.stringify(i);/^[\{\[]/.test(r)&&(i=r)}catch(t){}i=s.write?s.write(i,e):encodeURIComponent(String(i)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent),e=encodeURIComponent(String(e)).replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent).replace(/[\(\)]/g,escape);var l="";for(var a in n)n[a]&&(l+="; "+a,!0!==n[a]&&(l+="="+n[a].split(";")[0]));return document.cookie=e+"="+i+l}}function r(t,i){if("undefined"!=typeof document){for(var o={},n=document.cookie?document.cookie.split("; "):[],r=0;r<n.length;r++){var l=n[r].split("="),a=l.slice(1).join("=");i||'"'!==a.charAt(0)||(a=a.slice(1,-1));try{var h=e(l[0]);if(a=(s.read||s)(a,h)||e(a),i)try{a=JSON.parse(a)}catch(t){}if(o[h]=a,t===h)break}catch(t){}}return t?o[t]:o}}return o.set=n,o.get=function(t){return r(t,!1)},o.getJSON=function(t){return r(t,!0)},o.remove=function(e,i){n(e,"",t(i,{expires:-1}))},o.defaults={},o.withConverter=i,o}(function(){})},t.exports=i()}(t={exports:{}},t.exports),t.exports);function i(t,e){return new Promise(i=>{let s,o=getComputedStyle(t)["transition-duration"];"0s"!==o&&(o=o.split(",").map(t=>1e3*parseFloat(t)),s=Math.max.apply(null,o)),e(),s?function(t,e,i,s){let o,n=function(){clearTimeout(o),t.removeEventListener(e,n),i()};t.addEventListener(e,n),s&&(o=setTimeout(n,s))}(t,"transitionend",i,s+50):i()})}var s=function(t,e,i,s,o,n,r,l,a,h){"boolean"!=typeof r&&(a=l,l=r,r=!1);var p,c="function"==typeof i?i.options:i;if(t&&t.render&&(c.render=t.render,c.staticRenderFns=t.staticRenderFns,c._compiled=!0,o&&(c.functional=!0)),s&&(c._scopeId=s),n?(p=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),e&&e.call(this,a(t)),t&&t._registeredComponents&&t._registeredComponents.add(n)},c._ssrRegister=p):e&&(p=r?function(){e.call(this,h(this.$root.$options.shadowRoot))}:function(t){e.call(this,l(t))}),p)if(c.functional){var u=c.render;c.render=function(t,e){return p.call(e),u(t,e)}}else{var d=c.beforeCreate;c.beforeCreate=d?[].concat(d,p):[p]}return i};var o=s({render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return t.steps&&t.steps.length&&!t.isComplete?i("div",{staticClass:"virtual-tour"},[i("div",{staticClass:"virtual-tour__backdrop",class:{"is-visible":null!==t.currentStep&&t.showBackdrop}}),t._v(" "),i("div",{ref:"underlay",staticClass:"virtual-tour__underlay",class:{"is-visible":t.showUnderlay&&t.currentStepData.el&&t.showBackdrop},style:t.showBackdrop&&t.currentStepData.el?t.underlayPosition:null}),t._v(" "),i("tooltip-pin",{ref:"tooltip",staticClass:"virtual-tour__tooltip-pin",attrs:{visible:t.showTooltip,el:t.currentStepData.el,position:t.currentStepData.position},on:{close:t.finish,"calculated-position":t.setUnderlay}},[i("h3",{staticClass:"tooltip-pin__title"},[t.$lang.TOUR_STEP?[t._v(t._s(t.$lang.TOUR_STEP)+" "+t._s(t.currentStep+1)+"/"+t._s(t.steps.length))]:t._e()],2),t._v(" "),t.currentStepData.message?i("p",{staticClass:"tooltip-pin__message"},[t._v(t._s(t.currentStepData.message))]):t._e(),t._v(" "),i("div",{staticClass:"tooltip-pin__buttons"},[t.isFirstStep?t._e():i("button",{staticClass:"tooltip-pin__button is-prev",on:{click:t.prev}},[t._v(t._s(t.$lang.TOUR_PREV))]),t._v(" "),t.isLastStep?t._e():i("button",{staticClass:"tooltip-pin__button is-next",on:{click:t.next}},[t._v(t._s(t.$lang.TOUR_NEXT))]),t._v(" "),t.isLastStep?t._e():i("button",{staticClass:"tooltip-pin__button is-skip",on:{click:t.finish}},[t._v(t._s(t.$lang.TOUR_SKIP))]),t._v(" "),t.isLastStep?i("button",{staticClass:"tooltip-pin__button is-finish",on:{click:t.finish}},[t._v(t._s(t.$lang.TOUR_FINISH))]):t._e()])])],1):t._e()},staticRenderFns:[]},void 0,{name:"virtual-tour",props:{steps:Array,name:{type:String,required:!0},expires:{type:[Boolean,Number],default:!1},buttonsText:Object,fade:{type:Boolean,default:!0},fromBeginning:{type:[String,Boolean],default:!1}},data:()=>({currentStep:null,isComplete:!0,showUnderlay:!1,showTooltip:!1,underlayPosition:null}),computed:{isFirstStep(){return null!==this.currentStep&&0===this.currentStep},isFromBeginning(){return"false"!==this.fromBeginning.toString()},isLastStep(){return null!==this.currentStep&&this.currentStep===this.steps.length-1},currentStepData(){return this.steps&&this.steps.length&&null!==this.currentStep?this.steps[this.currentStep]:{}},showBackdrop(){return this.currentStepData.hasOwnProperty("fade")?this.currentStepData.fade:this.fade},computedButtonsText(){return Object.assign({next:this.$lang.TOUR_NEXT,prev:this.$lang.TOUR_PREV,skip:this.$lang.TOUR_SKIP,finish:this.$lang.TOUR_FINISH},this.buttonsText)},cookieDomain(){return this.$get(AWEMA_CONFIG,"virtualTour.cookieDomain")}},watch:{isComplete(t){if(t){if(t&&!isNaN(this.currentStep)){let t={};this.expires&&(t.expires=(new Date).getTime()+864e5*this.expires),this.setTourCookie(t),this.$emit("done",this.currentStep===this.steps.length-1),AWEMA._tours.shift(),AWEMA.off("tours:complete",this.checkStart),AWEMA.emit("tours:complete")}}else AWEMA._tours=AWEMA._tours||[],AWEMA._tours.push(this),AWEMA.on("tours:complete",this.checkStart),this.checkStart()}},methods:{start(){this.switchStep(0)},checkStart(){AWEMA._tours[0]===this&&(document.body.appendChild(this.$el),this.$nextTick(this.start))},getTourCookie(){let t=this._getTours()[this.name],e=(new Date).getTime(),i=!0;void 0!==t?this.expires&&e>t.expires&&(i=!1):i=!1,this.isComplete=i},fromBeginningTourCookie(){if(this.isFromBeginning){let t={path:"/"};this.cookieDomain&&(t.domain=this.cookieDomain),e.remove("virtual-tour",t),AWEMA_CONFIG.dev&&console.log("virtual-tour remove cookie")}},setTourCookie(t){let i=this._getTours(),s={expires:365};this.cookieDomain&&(s.domain=this.cookieDomain),i[this.name]=t,e.set("virtual-tour",i,s)},_getTours(){let t={};try{let i=e.get("virtual-tour");i&&(t=JSON.parse(i))}catch(t){AWEMA_CONFIG.dev&&console.log(t)}return t},next(){this.switchStep(this.currentStep+1)},prev(){this.switchStep(this.currentStep-1)},async finish(){await this.toggleTooltip(!1),await this.toggleUnderlay(!1),this.isComplete=!0},async switchStep(t){null!==this.currentStep&&(await this.toggleTooltip(!1),await this.toggleUnderlay(!1)),this.currentStep=t,await this.$nextTick(async()=>{await this.$refs.tooltip.scrollIntoView(),await this.toggleUnderlay(!0),await this.toggleTooltip(!0)})},toggleUnderlay(t){return i(this.$refs.underlay,()=>{this.showUnderlay=t})},toggleTooltip(t){return new Promise(e=>{this.$refs.tooltip.$once("toggle",e),this.showTooltip=t})},setUnderlay({elTop:t,elSizes:e}){this.underlayPosition={top:t+"px",left:e.left+"px",width:e.width+"px",height:e.height+"px"}}},mounted(){this.fromBeginningTourCookie(),this.getTourCookie()}},void 0,!1,void 0,void 0,void 0);var n=s({render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"tooltip-pin",class:["is-"+t.tooltipPosition,{"is-visible":t.visible}],style:t.tooltipStyle},[i("div",{staticClass:"tooltip-pin__inner"},[i("button",{staticClass:"tooltip-pin__close",attrs:{type:"button","aria-label":t.$lang.TOOLTIP_CLOSE},on:{click:function(e){return t.$emit("close")}}},[i("svg",{attrs:{width:"16",height:"16",viewBox:"0 0 16 16"}},[i("path",{attrs:{d:"M0 0L16 16 M16 0L0 16"}})])]),t._v(" "),t._t("default",[t._v("\n            "+t._s(t.message)+"\n        ")])],2)])},staticRenderFns:[]},void 0,{name:"tooltip-pin",props:{message:String,visible:{type:Boolean,default:!1},scrollOffset:{type:Number,default:32},el:[String,Object],position:{type:String,default:"auto"}},data(){return{element:null,isVisible:null,scrollHeight:0,tooltipPosition:this.position,tooltipStyle:null}},watch:{visible(t){i(this.$el,()=>{this.$emit("toggle",t)}),this.isVisible=t},element(t,e){e&&e.classList.remove("has-tooltip"),t&&t.classList.add("has-tooltip")},el:{handler:async function(t){this.$isServer||(t instanceof HTMLElement?this.element=t:this.element="string"==typeof t&&t?document.querySelector(t):null,await this.$nextTick(async()=>{this.element?await this.setTooltipPosition():this.showTooltipInCenter(),this.isVisible&&this.scrollIntoView()}))},immediate:!0}},methods:{setTooltipPosition(){return new Promise(t=>{let e,i,s=this.element.getBoundingClientRect(),o=this.$el.getBoundingClientRect(),n=this.$el.parentElement.clientWidth,r=function(t){let e=0;do{e+=t.offsetTop,t=t.offsetParent}while(t);return e}(this.element),l=this.getAvailablePositions(r,s,o,n);switch("auto"===this.position?this.tooltipPosition=l[0]:this.tooltipPosition=l.includes(this.position)?this.position:l[0],this.tooltipPosition){case"top":i={top:r-o.height,left:s.left+(s.width-o.width)/2},e=o.height+s.height<window.innerHeight,this.scrollHeight=e?r-window.innerHeight/2:r-o.height-this.scrollOffset;break;case"bottom":i={top:r+s.height,left:s.left+(s.width-o.width)/2},e=o.height+s.height<window.innerHeight,this.scrollHeight=e?r-(window.innerHeight-s.height-o.height)/2:r+s.height-o.height+this.scrollOffset;break;default:if("center"===this.position)break;i={top:r+(s.height-o.height)/2,left:"left"===this.tooltipPosition?s.left-o.width:s.right},this.scrollHeight=r-Math.max(s.height,o.height)/2}i.left<0&&(i.left=0),i.left+o.width>n&&(i.left="auto",i.right=0);for(let t in i){let e=i[t];i[t]=e+(isNaN(e)?"":"px")}this.tooltipStyle=i,this.$listeners["calculated-position"]&&this.$emit("calculated-position",{elTop:r,elSizes:s}),this.$nextTick(t)})},getAvailablePositions(t,e,i,s){let o=[];return t>i.height&&o.push("top"),e.left>i.width&&o.push("left"),s-e.right>i.width&&o.push("right"),document.body.scrollHeight-t>i.height&&o.push("bottom"),o},showTooltipInCenter(){this.tooltipPosition="center",this.tooltipStyle=null},onResize(){this.visible&&(clearTimeout(this.__onResize),this.__onResize=setTimeout(()=>{this.setTooltipPosition().then(()=>{this.scrollIntoView()})},200))},scrollIntoView(){this.$nextTick(()=>new Promise(t=>{!function(t,e=700,i){let s=(new Date).getTime(),o=window.pageYOffset,n=t-o;requestAnimationFrame(function r(){let l=(new Date).getTime()-s;if(l<e){let t=o+n*(a=l/e,--a*a*a+1);window.scrollTo(0,t),requestAnimationFrame(r)}else window.scrollTo(0,t),"function"==typeof i&&i();var a})}(this.scrollHeight,void 0,t)}))}},beforeMount(){this.__supportsPassive=function(){let t=!1;try{var e=Object.defineProperty({},"passive",{get(){t=!0}});window.addEventListener("testPassive",null,e),window.removeEventListener("testPassive",null,e)}catch(t){}return t}()},mounted(){window.addEventListener("resize",this.onResize,!!this.__supportsPassive&&{passive:!0})},beforeDestroy(){this.element&&this.element.classList.remove("has-tooltip"),window.removeEventListener("resize",this.onResize,!!this.__supportsPassive&&{passive:!0})}},void 0,!1,void 0,void 0,void 0);var r={installed:!1,install:function(t){this.installed||(this.installed=!0,t.component("virtual-tour",o),t.component("tooltip-pin",n))}},l={TOUR_NEXT:"Next",TOUR_PREV:"Previous",TOUR_SKIP:"Skip tour",TOUR_FINISH:"Finish",TOUR_STEP:"Step",TOOLTIP_CLOSE:"Close tooltip"};const a={install(t){t.lang=l,Vue.use(r)}};window&&"AWEMA"in window?AWEMA.use(a):(window.__awema_plugins_stack__=window.__awema_plugins_stack__||[],window.__awema_plugins_stack__.push(a))}();
