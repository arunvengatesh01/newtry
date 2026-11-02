(function(){
var d=document,page=d.body.dataset.page,KEY='newtryVisited';
function get(){try{return JSON.parse(localStorage.getItem(KEY))||[]}catch(e){return []}}
function set(v){try{localStorage.setItem(KEY,JSON.stringify(v))}catch(e){}}
var seen=get();
if(['bran','germ','endosperm'].indexOf(page)>-1&&seen.indexOf(page)<0){seen.push(page);set(seen)}
var circles=d.querySelectorAll('.circles a');
circles.forEach(function(a){if(seen.indexOf(a.getAttribute('href').replace('.html',''))>-1)a.classList.add('seen')});
var jag=d.getElementById('jag');
function jagCheck(){
  if(!jag)return;var all=seen.length>=3;
  if(all){var first=jag.classList.contains('lock');jag.classList.remove('lock');
    if(first){jag.classList.add('open');var n=d.createElement('p');n.textContent='Unlocked. Sweetness without refined white sugar is next.';n.style.color='#d8a64a';jag.parentNode.appendChild(n)}}
}
var carvo=d.querySelector('.carvo'),actions=d.querySelector('.actions'),done=false;
function say(t){try{var u=new SpeechSynthesisUtterance(t);u.rate=.95;u.pitch=1.2;speechSynthesis.cancel();speechSynthesis.speak(u)}catch(e){}}
function start(){
  if(done)return;done=true;var bis=carvo.querySelector('.bis'),bub=carvo.querySelector('.bubble'),t=carvo.dataset.say;
  var s=function(f,ms){setTimeout(f,ms)};
  bis.classList.add('show');
  s(function(){bis.classList.add('mouth')},700);
  s(function(){bis.classList.add('b1')},1700);
  s(function(){bis.classList.add('b2')},2100);
  s(function(){bis.classList.add('b3');bub.textContent=t;bub.hidden=false;say(t)},2500);
  s(function(){d.querySelector('.stage').classList.add('done');actions.hidden=false;jagCheck()},3000);
}
carvo.addEventListener('click',start);
carvo.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();start()}});
var f=d.getElementById('orderForm');
if(f)f.addEventListener('submit',function(e){
  e.preventDefault();var b=f.querySelector('button');b.disabled=true;b.textContent='Sending...';
  var data=new URLSearchParams(new FormData(f)),name=f.name.value.trim();
  fetch(d.body.dataset.exec,{method:'POST',mode:'no-cors',body:data}).then(function(){
    f.hidden=true;d.getElementById('thanksName').textContent=name+', you have successfully ordered. Thank you';
    d.getElementById('thanks').hidden=false;
  }).catch(function(){b.disabled=false;b.textContent='Place order';alert('Order failed. Check your internet connection and try again.')});
});
})();
