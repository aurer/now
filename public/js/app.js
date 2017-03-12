var App={progressElements:[],segmentElements:[],init:function(){this.svg=document.querySelector("svg.clock"),this.setSize(),this.addProps(),this.setupCircles(),this.setupSegments(),this.setTimouts(),this.enableDisplayOptions(),this.updateMinute(),this.updateHour(),this.updateDay(),this.updateWeek(),this.updateMonth(),this.updateYear()},addProps:function(){SVGElement.prototype.circumference=function(){return 2*this.getAttribute("r")*Math.PI}},setupCircles:function(){for(var e=App.svg.querySelectorAll("circle"),t=0;t<e.length;t++){var s=e[t],r=s.getAttribute("class"),n=s.cloneNode(!0);n.setAttribute("stroke-dasharray",s.circumference()),n.setAttribute("stroke-dashoffset",s.circumference()),n.setAttribute("class",r+" progress"),App.progressElements[r]=App.svg.appendChild(n);var a=s.cloneNode(!0);a.setAttribute("class",r+" segments"),App.segmentElements[r]=App.svg.appendChild(a)}},setupSegments:function(){function e(e){var t=App.segmentElements[e],s=new Date,r={second:1,minute:60,hour:60,day:24,week:7,month:new Date(s.getFullYear(),s.getMonth(),0).getDate(),year:12};return 2*t.getAttribute("r")*Math.PI/r[e]-1}App.segmentElements.second.setAttribute("stroke-dasharray","1 "+e("second")),App.segmentElements.minute.setAttribute("stroke-dasharray","1 "+e("minute")),App.segmentElements.hour.setAttribute("stroke-dasharray","1 "+e("hour")),App.segmentElements.day.setAttribute("stroke-dasharray","1 "+e("day")),App.segmentElements.week.setAttribute("stroke-dasharray","1 "+e("week")),App.segmentElements.month.setAttribute("stroke-dasharray","1 "+e("month")),App.segmentElements.year.setAttribute("stroke-dasharray","1 "+e("year"))},setSize:function(){var e=window.innerHeight,t=window.innerwidth,s=t>e?t:e;App.svg.setAttribute("height",s-20),App.svg.setAttribute("width",s-20)},enableDisplayOptions:function(){var e=function(){App.svg.classList.toggle("hide-details")};setTimeout(e,2e3),document.body.onclick=e,document.body.ontouchend=e},updateMinute:function(){var e=App.progressElements.minute,t=(new Date).getSeconds(),s=t/60*100,r=e.circumference()-e.circumference()/100*s;e.setAttribute("stroke-dashoffset",r),0==s?e.setAttribute("data-ending",!0):e.removeAttribute("data-ending")},updateHour:function(){var e=App.progressElements.hour,t=new Date,s=t.getMinutes();s+=t.getSeconds()/60;var r=s/60*100;e.setAttribute("stroke-dasharray",e.circumference()),e.setAttribute("stroke-dashoffset",e.circumference()-e.circumference()/100*r)},updateDay:function(){var e=App.progressElements.day,t=(new Date).getHours(),s=60*t+(new Date).getMinutes(),r=s/1440*100;e.setAttribute("stroke-dasharray",e.circumference()),e.setAttribute("stroke-dashoffset",e.circumference()-e.circumference()/100*r)},updateWeek:function(){var e=App.progressElements.week,t=new Date,s=(new Date).getDay(),r=t.getHours(),n=(new Date).getMinutes()/60,a=(r+n)/168*100,i=s/7*100+a;e.setAttribute("stroke-dasharray",e.circumference()),e.setAttribute("stroke-dashoffset",e.circumference()-e.circumference()/100*i)},updateMonth:function(){var e=App.progressElements.month,t=new Date,s=t.getDate(),r=new Date(t.getYear(),t.getMonth(),0).getDate(),n=t.getHours(),a=n/24,i=(s+a)/r*100;e.setAttribute("stroke-dasharray",e.circumference()),e.setAttribute("stroke-dashoffset",e.circumference()-e.circumference()/100*i)},updateYear:function(){var e=App.progressElements.year,t=new Date,s=new Date(t.getFullYear(),0,1),r=Math.round((t-s)/1e3/60/60/24+.5,0),n=100/365*r;e.setAttribute("stroke-dasharray",e.circumference()),e.setAttribute("stroke-dashoffset",e.circumference()-e.circumference()/100*n)},setTimouts:function(){var e=new Date,t=e.getSeconds(),s=e.getMilliseconds(),r=1e3-s-1e3,n=1e3*(60-t);setTimeout(function(){App.progressElements.second.classList.add("is-animated"),setInterval(App.updateMinute.bind(this),1e3),setInterval(App.updateHour.bind(this),1e3)},r),setTimeout(function(){setInterval(function(){App.updateDay(),App.updateWeek(),App.updateMonth(),App.updateYear()},6e4),App.updateDay(),App.updateWeek(),App.updateMonth(),App.updateYear()},n)}};App.init();