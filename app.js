(function(){
  var d=document;
  // menu mobilne
  var b=d.querySelector('.burger'),m=d.getElementById('mob');
  function zamknij(){b.setAttribute('aria-expanded','false');m.classList.remove('open');d.body.style.overflow='';}
  b.addEventListener('click',function(){var o=b.getAttribute('aria-expanded')==='true';if(o){zamknij();}else{b.setAttribute('aria-expanded','true');m.classList.add('open');d.body.style.overflow='hidden';}});
  m.addEventListener('click',function(e){if(e.target.closest('a'))zamknij();});
  addEventListener('keydown',function(e){if(e.key==='Escape')zamknij();});

  // aktywna pozycja menu
  var linki=[].slice.call(d.querySelectorAll('.menu a'));
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(w){w.forEach(function(x){if(x.isIntersecting){var id=x.target.id;linki.forEach(function(a){a.classList.toggle('on',a.getAttribute('href')==='#'+id);});}});},{rootMargin:'-45% 0px -50% 0px'});
    d.querySelectorAll('main section[id]').forEach(function(s){io.observe(s);});
    // pasek kontaktu po zjechaniu z pierwszego ekranu
    var p=d.getElementById('pasek'),h=d.getElementById('start'),k=d.querySelector('#kontakt,#contact'),zaH=false,naK=false;
    function ust(){p.classList.toggle('on',zaH&&!naK);}
    new IntersectionObserver(function(w){zaH=!w[0].isIntersecting;ust();}).observe(h);
    new IntersectionObserver(function(w){naK=w[0].isIntersecting;ust();},{threshold:.15}).observe(k);
  }

  // karuzela: palec (natywnie), mysz (przeciaganie), przyciski
  var t=d.getElementById('tor');
  if(t){
    var kr=function(){var f=t.querySelector('figure');return f?f.getBoundingClientRect().width+18:300;};
    var bt=d.querySelectorAll('.kar-btn button');
    bt.forEach(function(x){x.addEventListener('click',function(){t.scrollBy({left:kr()*+x.dataset.k,behavior:'smooth'});});});
    function stan(){if(bt.length){bt[0].disabled=t.scrollLeft<4;bt[1].disabled=t.scrollLeft+t.clientWidth>=t.scrollWidth-4;}}
    t.addEventListener('scroll',stan,{passive:true});
    var dn=false,sx=0,sl=0,ruch=0;
    t.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse')return;dn=true;ruch=0;sx=e.clientX;sl=t.scrollLeft;t.classList.add('ciag');});
    addEventListener('pointermove',function(e){if(!dn)return;var dx=e.clientX-sx;ruch=Math.max(ruch,Math.abs(dx));t.scrollLeft=sl-dx;});
    addEventListener('pointerup',function(){if(!dn)return;dn=false;t.classList.remove('ciag');var i=Math.round(t.scrollLeft/kr());t.scrollTo({left:i*kr(),behavior:'smooth'});});
    t.addEventListener('click',function(e){if(ruch>6){e.preventDefault();e.stopPropagation();ruch=0;}},true);
    t.addEventListener('keydown',function(e){if(e.key==='ArrowRight'){t.scrollBy({left:kr(),behavior:'smooth'});}if(e.key==='ArrowLeft'){t.scrollBy({left:-kr(),behavior:'smooth'});}});
  }

  // powiekszanie zdjec
  var lb=d.getElementById('lb');
  if(lb&&lb.showModal){
    var li=lb.querySelector('img'),lp=lb.querySelector('p');
    d.addEventListener('click',function(e){var im=e.target.closest('img[data-lb]');if(!im)return;var s=im.currentSrc||im.src;li.src=s.replace(/-560\.webp$/,'-960.webp');li.alt=im.alt;lp.textContent=im.dataset.lb;lb.showModal();});
    lb.addEventListener('click',function(e){if(e.target!==li)lb.close();});
  }

  // formularz (podglad - bez wysylki)
  var f=d.getElementById('form'),fi=d.getElementById('f-pliki'),lst=d.getElementById('lista-plikow'),strefa=d.getElementById('pliki');
  if(fi){
    fi.addEventListener('change',function(){var n=[].map.call(fi.files,function(x){return x.name;});lst.textContent=n.length?((lst.dataset.txt||'Pliki')+' ('+n.length+'): '+n.join(', ')):'';});
    ['dragenter','dragover'].forEach(function(ev){strefa.addEventListener(ev,function(){strefa.classList.add('nad');});});
    ['dragleave','drop'].forEach(function(ev){strefa.addEventListener(ev,function(){strefa.classList.remove('nad');});});
  }
  if(f){f.addEventListener('submit',function(e){e.preventDefault();d.getElementById('info').classList.add('on');});}
  var r=d.getElementById('rok');if(r)r.textContent=new Date().getFullYear();
})();
