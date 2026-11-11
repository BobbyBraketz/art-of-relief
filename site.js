(function(){if(document.body.classList.contains('sub'))return;var m={'#details':'week.html','#week':'week.html','#attire':'attire.html','#attire-beach':'attire.html#attire-beach','#attire-wedding':'attire.html#attire-wedding','#travel':'travel.html','#story':'story.html'};var t=m[location.hash];if(t)location.replace(t)})();
(function(){
var n=document.getElementById('nav'),sub=document.body.classList.contains('sub');
function ns(){n.classList.toggle('scrolled',sub||window.scrollY>80)}
ns();window.addEventListener('scroll',ns,{passive:true});
var mm=document.getElementById('mm');
document.getElementById('ham').addEventListener('click',function(){mm.classList.add('open')});
document.getElementById('mc').addEventListener('click',function(){mm.classList.remove('open')});
[].forEach.call(mm.querySelectorAll('a'),function(a){a.addEventListener('click',function(){mm.classList.remove('open')})});
document.addEventListener('keydown',function(e){if(e.key==='Escape')mm.classList.remove('open')});

var rvs=document.querySelectorAll('.rv');
if('IntersectionObserver' in window){var ob=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('vis');ob.unobserve(e.target)}})},{threshold:.1,rootMargin:'0px 0px -40px 0px'});
rvs.forEach(function(el){ob.observe(el)})}else{rvs.forEach(function(el){el.classList.add('vis')})}

var lbt=[].slice.call(document.querySelectorAll('.lb-tab'));
function lbs(t){lbt.forEach(function(b){var on=b===t;b.setAttribute('aria-selected',on?'true':'false');b.tabIndex=on?0:-1;document.getElementById(b.getAttribute('aria-controls')).hidden=!on})}
lbt.forEach(function(b,i){b.addEventListener('click',function(){lbs(b)});b.addEventListener('keydown',function(e){if(e.key==='ArrowRight'||e.key==='ArrowLeft'){var o=lbt[(i+1)%lbt.length];lbs(o);o.focus()}})});
if(lbt.length)lbs(lbt[0]);

var today=null;
try{var p=new Intl.DateTimeFormat('en-US',{timeZone:'America/Santo_Domingo',year:'numeric',month:'numeric',day:'numeric'}).formatToParts(new Date()),o={};p.forEach(function(x){o[x.type]=x.value});
if(o.year==='2026'&&o.month==='11'&&+o.day>=14&&+o.day<=21){today=o.day;[].forEach.call(document.querySelectorAll('[data-d="'+today+'"]'),function(el){el.classList.add('is-today')})}}catch(e){}

var wk=document.getElementById('week'),sw=document.getElementById('wkSw');
if(!wk||!sw)return;
function setP(on,save){wk.classList.toggle('is-party',on);sw.setAttribute('aria-checked',on?'true':'false');if(save){try{localStorage.setItem('aor-party',on?'1':'0')}catch(e){}}}
var q=new URLSearchParams(location.search),stored=null;try{stored=localStorage.getItem('aor-party')}catch(e){}
setP(q.has('party')||stored==='1',q.has('party'));
sw.addEventListener('click',function(){setP(!wk.classList.contains('is-party'),true)});

var days=[].slice.call(wk.querySelectorAll('.wkd')),chips=[].slice.call(wk.querySelectorAll('.wk-days a')),
    prev=document.getElementById('wkPrev'),next=document.getElementById('wkNext'),bar=document.getElementById('wkDays');
if(!days.length)return;
wk.classList.add('tabbed');
function lbl(d){var c=chips.filter(function(x){return x.dataset.d===d})[0];return c?c.querySelector('b').textContent+' '+d:''}
var cur;
function show(d,scroll){
  if(!days.some(function(x){return x.dataset.d===d}))d=days[0].dataset.d;
  cur=d;
  days.forEach(function(x){x.classList.toggle('on',x.dataset.d===d)});
  chips.forEach(function(c){var on=c.dataset.d===d;c.classList.toggle('on',on);if(on)c.setAttribute('aria-current','date');else c.removeAttribute('aria-current')});
  var i=days.findIndex(function(x){return x.dataset.d===d});
  var pd=days[i-1],nd=days[i+1];
  prev.hidden=!pd;next.hidden=!nd;
  if(pd){prev.textContent='← '+lbl(pd.dataset.d);prev.dataset.d=pd.dataset.d}
  if(nd){next.textContent=lbl(nd.dataset.d)+' →';next.dataset.d=nd.dataset.d}
  if(scroll)bar.scrollIntoView({behavior:'smooth',block:'start'});
}
function pick(d,scroll){show(d,scroll);try{history.replaceState(null,'',location.pathname+location.search+'#d'+d)}catch(e){}}
chips.forEach(function(c){c.addEventListener('click',function(e){e.preventDefault();pick(c.dataset.d,false)})});
prev.addEventListener('click',function(){pick(prev.dataset.d,true)});
next.addEventListener('click',function(){pick(next.dataset.d,true)});
[].forEach.call(wk.querySelectorAll('.wk-mc[href^="#d"]'),function(a){a.addEventListener('click',function(e){e.preventDefault();pick(a.getAttribute('href').slice(2),true)})});
var m=location.hash.match(/^#d(\d+)$/);
if(m){show(m[1]);setTimeout(function(){bar.scrollIntoView({block:'start'})},60)}
else show(today||'14');
window.addEventListener('hashchange',function(){var h=location.hash.match(/^#d(\d+)$/);if(h)show(h[1],true)});
})();
