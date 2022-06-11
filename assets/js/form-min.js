function getTimeRemaining(e){let t=Date.parse(e)-Date.parse(new Date),o=Math.floor(t/1e3%60);return{total:t,minutes:Math.floor(t/1e3/60%60),seconds:o}}function initializeClock(e,t){let o=document.querySelector(".form__timer__hours span"),n=document.querySelector(".form__timer__minutes span");function s(){let e=getTimeRemaining(t);if(e.total<=0){clearInterval(r),initializeClock("countdown",new Date(Date.parse(new Date)+18e4))}o.innerHTML=("0"+e.minutes).slice(-2),n.innerHTML=("0"+e.seconds).slice(-2)}s();let r=setInterval(s,1e3)}console.log("Работает только на form");let deadline=new Date(Date.parse(new Date)+18e4);initializeClock("countdown",deadline);const toolBack=document.querySelector(".tooltip__back"),toolPrice=document.querySelector(".tooltip__price-mounth");let range1="65000",range2="8",percent=.5;const calc=()=>{toolBack.innerHTML=Math.round(range1*(percent+percent/(1+percent)*range2-1)),toolPrice.innerHTML=Math.round(range1/range2)},rangeSliderSum=document.querySelector(".range__slider__sum"),sumOut=document.querySelector(".tooltip__sum");noUiSlider.create(rangeSliderSum,{start:65e3,connect:"lower",tooltips:!0,step:1e3,range:{min:1e3,max:1e5},tooltips:{to:function(e){return parseInt(e)},to:function(e){return parseInt(e)}}}),rangeSliderSum.noUiSlider.on("update",function(e){range1=parseInt(e[0]),sumOut.innerHTML=parseInt(e[0]),calc()});const rangeSliderDate=document.querySelector(".range__slider__date"),dateOut=document.querySelector(".tooltip__date");noUiSlider.create(rangeSliderDate,{start:8,connect:"lower",tooltips:!0,step:1,range:{min:3,max:30},tooltips:{to:function(e){return e<=4?parseInt(e)+" дня":parseInt(e)+" дней"},to:function(e){return e<=4?parseInt(e)+" дня":parseInt(e)+" дней"}}});const months={1:"января",2:"февраля",3:"марта",4:"апреля",5:"мая",6:"июня",7:"июля",8:"августа",9:"сентября",10:"октября",11:"ноября",12:"декабря"};rangeSliderDate.noUiSlider.on("update",function(e){range2=parseInt(e[0]);const t=new Date,o=new Date;o.setDate(t.getDate()+parseInt(e[0])),dateOut.innerHTML=o.getDate()+"  "+months[o.getMonth()]+"  "+o.getFullYear(),calc()});const title=document.querySelector(".form__title"),sideLine=document.querySelector(".sidebar__line"),formStep1=document.querySelector(".form__step__1"),formStep2=document.querySelector(".form__step__2"),formStep3=document.querySelector(".form__step__3"),formStep4=document.querySelector(".form__step__4"),formStep5=document.querySelector(".form__step__5"),formStep6=document.querySelector(".form__step__6"),formStep7=document.querySelector(".form__step__7"),formStep8=document.querySelector(".form__step__8"),buttonStep1=document.querySelector(".btn-step1"),buttonStep2=document.querySelector(".btn-step2"),buttonStep4=document.querySelector(".btn-step4"),buttonStep5=document.querySelector(".btn-step5"),buttonStep6=document.querySelector(".btn-step6"),stepCounter=document.querySelector(".step-counter"),formInputs1=document.querySelectorAll(".js-input-1"),checkBox=document.querySelector(".js-check"),labelCheck=document.querySelector(".label-check"),sideBar=document.querySelector(".form__sidebar");let count=1;function noDigits(e){-1!="1234567890".indexOf(e.key)&&e.preventDefault()}const telInput=document.querySelector(".js-tel");let maskOptions={mask:"+{7}(000)000-00-00"},mask=IMask(telInput,maskOptions);buttonStep1.addEventListener("click",e=>{emptyInputs=Array.from(formInputs1).filter(e=>""===e.value),formInputs1.forEach(function(e){""===e.value?e.classList.add("_error"):e.classList.remove("_error")}),checkBox.checked?labelCheck.classList.remove("_error"):labelCheck.classList.add("_error"),0===emptyInputs.length&&checkBox.checked?(title.style.display="none",formStep1.classList.add("_close"),formStep2.classList.add("_open"),buttonStep1.style.display="none",buttonStep2.style.display="block",count++,stepCounter.innerHTML=count):console.log("inputs not filled")}),buttonStep2.addEventListener("click",()=>{if(count++,stepCounter.innerHTML=count,formStep2.style.display="none",formStep3.classList.add("_open"),sideLine.classList.add("_count2"),buttonStep2.style.display="none",buttonStep4.style.display="block",buttonStep4.disabled=!0,formStep3.classList.contains("_open")){setTimeout(function(){formStep3.classList.remove("_open"),formStep3.style.display="none",sideLine.classList.add("_count3"),count++,stepCounter.innerHTML=count,buttonStep4.disabled=!1,formStep4.classList.add("_open")},3e3)}}),buttonStep4.addEventListener("click",()=>{formStep4.classList.remove("_open"),formStep4.style.display="none",formStep5.classList.add("_open"),sideLine.classList.add("_count4"),buttonStep4.style.display="none",buttonStep5.style.display="block",count++,stepCounter.innerHTML=count,function(e,t){let o=document.querySelector(".counter__sms");function n(){let e=getTimeRemaining(t);o.innerHTML=("0"+e.seconds).slice(-2)}n(),setInterval(n,1e3)}(0,new Date(Date.parse(new Date)+18e4))}),buttonStep5.addEventListener("click",()=>{formStep5.classList.remove("_open"),formStep5.style.display="none",formStep6.classList.add("_open"),sideLine.classList.add("_count5"),buttonStep5.style.display="none",buttonStep6.style.display="block",count++,stepCounter.innerHTML=count}),buttonStep6.addEventListener("click",()=>{if(formStep6.classList.remove("_open"),formStep6.style.display="none",formStep7.classList.add("_open"),sideLine.classList.add("_count6"),buttonStep6.style.display="none",count++,stepCounter.innerHTML=count,formStep7.classList.contains("_open")){let e=document.querySelector(".form__back");setTimeout(function(){formStep7.classList.remove("_open"),formStep7.style.display="none",sideBar.style.display="none",formStep8.classList.add("_open"),e.classList.add("_remove")},5e3)}});class ItcAccordion{constructor(e,t){this._el="string"==typeof e?document.querySelector(e):e;this._config=Object.assign({alwaysOpen:!0,duration:350},t),this.addEventListener()}addEventListener(){this._el.addEventListener("click",e=>{const t=e.target.closest(".accordion__header");if(t){if(!this._config.alwaysOpen){const e=this._el.querySelector(".accordion__item_show");e&&e!==t.parentElement&&this.toggle(e)}this.toggle(t.parentElement)}})}show(e){const t=e.querySelector(".accordion__body");if(t.classList.contains("collapsing")||e.classList.contains("accordion__item_show"))return;t.style.display="block";const o=t.offsetHeight;t.style.height=0,t.style.overflow="hidden",t.style.transition=`height ${this._config.duration}ms ease`,t.classList.add("collapsing"),e.classList.add("accordion__item_slidedown"),t.offsetHeight,t.style.height=`${o}px`,window.setTimeout(()=>{t.classList.remove("collapsing"),e.classList.remove("accordion__item_slidedown"),t.classList.add("collapse"),e.classList.add("accordion__item_show"),t.style.display="",t.style.height="",t.style.transition="",t.style.overflow=""},this._config.duration)}hide(e){const t=e.querySelector(".accordion__body");!t.classList.contains("collapsing")&&e.classList.contains("accordion__item_show")&&(t.style.height=`${t.offsetHeight}px`,t.offsetHeight,t.style.display="block",t.style.height=0,t.style.overflow="hidden",t.style.transition=`height ${this._config.duration}ms ease`,t.classList.remove("collapse"),e.classList.remove("accordion__item_show"),t.classList.add("collapsing"),window.setTimeout(()=>{t.classList.remove("collapsing"),t.classList.add("collapse"),t.style.display="",t.style.height="",t.style.transition="",t.style.overflow=""},this._config.duration))}toggle(e){e.classList.contains("accordion__item_show")?this.hide(e):this.show(e)}}new ItcAccordion(document.querySelector(".accordion"),{alwaysOpen:!1});