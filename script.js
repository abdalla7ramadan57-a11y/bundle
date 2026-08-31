// ---- demo video tabs ----
const mainVideo=document.getElementById('mainVideo'),tabs=[...document.querySelectorAll('.vtab')];
function selectTab(i,play=true){const t=tabs[i];if(!t)return;tabs.forEach(x=>x.classList.remove('active'));t.classList.add('active');mainVideo.src=t.dataset.video;document.getElementById('videoTitle').textContent=t.dataset.title;document.getElementById('videoSub').textContent=t.dataset.sub;mainVideo.load();if(play)mainVideo.play().catch(()=>{});}
tabs.forEach((t,i)=>t.onclick=()=>selectTab(i));
document.querySelectorAll('.jump-video').forEach(b=>b.onclick=()=>{selectTab(+b.dataset.tab,false);document.querySelector('.video-shell').scrollIntoView({behavior:'smooth',block:'center'});});

// ---- caption animation previews ----
const anims=[
['Scale Words','Scale Words (B)(1).mp4'],['Opacity Words 1','Opacity Words 1(2).mp4'],['Opacity Words 2','Opacity Words 2(3).mp4'],['Opacity Words 3','Opacity Words 3(3).mp4'],['Line Down','Position Line Down (B)(1).mp4'],['Line Left','Position Line Left (B)(1).mp4'],['Line Right','Position Line Right (B)(2).mp4'],['Line Up','Position Line Up (B)(2).mp4'],['Words Down Bold','Position Words Down (B)(3).mp4'],['Words Down','Position Words Down(1).mp4'],['Words Left Bold','Position Words Left (B)(3).mp4'],['Words Left','Position Words Left(1).mp4'],['Words Right Bold','Position Words Right (B)(3).mp4'],['Words Right','Position Words Right.mp4'],['Words Up Bold','Position Words Up (B)(2).mp4'],['Words Up','Position Words Up.mp4'],['Scale + Tracking','Scale & Tracking Words 2 (B)(1).mp4'],['Scale Characters','Scale Characters (B)(1).mp4'],['Scale Line','Scale Line (B)(1).mp4']];
const grid=document.getElementById('animGrid'),av=document.getElementById('animVideo'),an=document.getElementById('animName');
anims.forEach(([name,file],i)=>{let b=document.createElement('button');b.className='anim-btn'+(i===0?' active':'');b.textContent=name;b.onclick=()=>{document.querySelectorAll('.anim-btn').forEach(x=>x.classList.remove('active'));b.classList.add('active');av.src='assets/videos/'+file;an.textContent=name;av.play().catch(()=>{});};grid.appendChild(b)});

// ---- offer countdown ----
// موعد انتهاء العرض: 5 سبتمبر 2026، 11:59 مساءً بتوقيت القاهرة (UTC+3)
const OFFER_END = new Date('2026-09-05T20:59:00Z');
const pad = n => String(n).padStart(2,'0');
const el = {
  d:document.getElementById('cdD'), h:document.getElementById('cdH'),
  m:document.getElementById('cdM'), s:document.getElementById('cdS'),
  mini:document.getElementById('miniCd'), box:document.getElementById('boxCd'),
  sticky:document.getElementById('stickyCd'), note:document.getElementById('cdNote'),
  wrapCd:document.getElementById('countdown'), bar:document.getElementById('offerbar'),
  wa:document.getElementById('whatsappBtn')
};
function renderCountdown(){
  const left = OFFER_END - new Date();
  if(left <= 0){
    [el.d,el.h,el.m,el.s].forEach(x=>x.textContent='00');
    el.mini.textContent='انتهى العرض';
    el.box.textContent='انتهى العرض';
    el.sticky.textContent='انتهى العرض';
    el.note.textContent='العرض ده خلص. تابعنا عشان تلحق العرض الجاي.';
    el.wrapCd.classList.add('ended'); el.bar.classList.add('ended');
    el.box.classList.add('ended'); el.wa.classList.add('ended');
    el.wa.textContent='العرض انتهى';
    clearInterval(timer);
    return;
  }
  const sec = Math.floor(left/1000);
  const d = Math.floor(sec/86400), h = Math.floor(sec%86400/3600), m = Math.floor(sec%3600/60), s = sec%60;
  el.d.textContent=pad(d); el.h.textContent=pad(h); el.m.textContent=pad(m); el.s.textContent=pad(s);
  const compact = (d>0? d+'ي ':'') + pad(h)+':'+pad(m)+':'+pad(s);
  el.mini.textContent=compact; el.box.textContent=compact; el.sticky.textContent=compact;
}
renderCountdown();
const timer = setInterval(renderCountdown, 1000);

// ---- WhatsApp order ----
const WHATSAPP_NUMBER='201091339187';
el.wa.onclick=(e)=>{
  e.preventDefault();
  if(el.wa.classList.contains('ended')) return;
  const msg='كابشن — عايز أشترك في العرض: الباكدج كاملة (4 إضافات) لمدة 3 سنين بـ 500 جنيه بدل 2000.';
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`,'_blank');
};
