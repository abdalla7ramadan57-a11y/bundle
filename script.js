// ---- demo video tabs ----
const mainVideo=document.getElementById('mainVideo'),tabs=[...document.querySelectorAll('.vtab')];
function selectTab(i,play=true){const t=tabs[i];if(!t)return;tabs.forEach(x=>x.classList.remove('active'));t.classList.add('active');mainVideo.src=t.dataset.video;document.getElementById('videoTitle').textContent=t.dataset.title;document.getElementById('videoSub').textContent=t.dataset.sub;mainVideo.load();if(play)mainVideo.play().catch(()=>{});}
tabs.forEach((t,i)=>t.onclick=()=>selectTab(i));
document.querySelectorAll('.jump-video').forEach(b=>b.onclick=()=>{selectTab(+b.dataset.tab,false);document.querySelector('.video-shell').scrollIntoView({behavior:'smooth',block:'center'});});

// ---- caption animation previews ----
const anims=[
['Scale Words','Scale Words (B)(1).mp4'],['Opacity Words 1','Opacity Words 1(2).mp4'],['Opacity Words 2','Opacity Words 2(3).mp4'],['Opacity Words 3','Opacity Words 3(3).mp4'],['Line Down','Position Line Down (B)(1).mp4'],['Line Left','Position Line Left (B)(1).mp4'],['Line Right','Position Line Right (B)(2).mp4'],['Line Up','Position Line Up (B)(2).mp4'],['Words Down Bold','Position Words Down (B)(3).mp4'],['Words Down','Position Words Down(1).mp4'],['Words Left Bold','Position Words Left (B)(3).mp4'],['Words Left','Position Words Left(1).mp4'],['Words Right Bold','Position Words Right (B)(3).mp4'],['Words Right','Position Words Right.mp4'],['Words Up Bold','Position Words Up (B)(2).mp4'],['Words Up','Position Words Up.mp4'],['Scale + Tracking','Scale & Tracking Words 2 (B)(1).mp4'],['Scale Characters','Scale Characters (B)(1).mp4'],['Scale Line','Scale Line (B)(1).mp4']];
const grid=document.getElementById('animGrid'),av=document.getElementById('animVideo'),an=document.getElementById('animName');
if(grid)anims.forEach(([name,file],i)=>{let b=document.createElement('button');b.className='anim-btn'+(i===0?' active':'');b.type='button';b.textContent=name;b.onclick=()=>{document.querySelectorAll('.anim-btn').forEach(x=>x.classList.remove('active'));b.classList.add('active');av.src='assets/videos/'+file;an.textContent=name;av.play().catch(()=>{});};grid.appendChild(b)});

// ---- Text Hooks gallery (45 de-duplicated style previews) ----
const HOOKS=45, hookGrid=document.getElementById('hookGrid'),
      hookVid=document.getElementById('hookVideo'), hookName=document.getElementById('hookName');
if(hookGrid){
  const pad2=n=>String(n).padStart(2,'0');
  const show=n=>{
    document.querySelectorAll('.hook-thumb').forEach(x=>x.classList.remove('active'));
    const btn=hookGrid.children[n-1]; if(btn) btn.classList.add('active');
    hookVid.src='assets/texthooks/th_'+pad2(n)+'.mp4';
    hookVid.poster='assets/texthooks/th_'+pad2(n)+'.jpg';
    hookName.textContent='Style '+pad2(n);
    hookVid.play().catch(()=>{});
  };
  for(let n=1;n<=HOOKS;n++){
    const b=document.createElement('button');
    b.className='hook-thumb'+(n===1?' active':'');
    b.type='button';
    b.setAttribute('aria-label','Text Hook Style '+pad2(n));
    const img=document.createElement('img');
    img.src='assets/texthooks/th_'+pad2(n)+'.jpg';
    img.alt='Text Hook Style '+pad2(n);
    img.loading='lazy'; img.width=320; img.height=180;
    b.appendChild(img);
    b.onclick=()=>show(n);
    hookGrid.appendChild(b);
  }
  hookVid.poster='assets/texthooks/th_01.jpg';
  const io2=new IntersectionObserver((es,o)=>{es.forEach(e=>{if(e.isIntersecting){show(1);o.disconnect();}})},{rootMargin:'200px'});
  io2.observe(document.querySelector('.hook-stage'));
}

/* ------------------------------------------------------------------
   OFFER PRICE LADDER
   The countdown is driven by these two constants alone. They are real
   wall-clock instants, so every visitor sees the same number and a
   refresh (or a brand new visitor) cannot restart it.

   To run the offer again, change OFFER_START only.
   Current schedule (times are Cairo, UTC+3):
     stage 1  1,499  16 Sep 9:00 PM  ->  18 Sep 9:00 PM
     stage 2  2,500  18 Sep 9:00 PM  ->  20 Sep 9:00 PM
     stage 3  3,500  20 Sep 9:00 PM  ->  21 Sep 9:00 PM
------------------------------------------------------------------- */
const OFFER_START = new Date('2026-09-16T18:00:00Z');
const TIERS = [
  { price: 1499, hours: 48, label: 'أول 48 ساعة' },
  { price: 2500, hours: 48, label: 'الـ48 ساعة التالية' },
  { price: 3500, hours: 24, label: 'آخر 24 ساعة' }
];

const ends = [];
TIERS.reduce((t, tier) => {
  const e = t + tier.hours * 3600000;
  ends.push(new Date(e));
  return e;
}, OFFER_START.getTime());

const fmt = n => n.toLocaleString('en-US');
const pad = n => String(n).padStart(2, '0');
const setAll = (sel, val) => document.querySelectorAll(sel).forEach(el => { el.textContent = val; });

function currentStage() {
  const now = Date.now();
  for (let i = 0; i < TIERS.length; i++) {
    if (now < ends[i].getTime()) return i;
  }
  return -1; // every stage has elapsed
}

let lastStage = null;

function render() {
  const stage = currentStage();
  const idx = stage === -1 ? TIERS.length - 1 : stage;
  const tier = TIERS[idx];
  const next = stage === -1 ? null : TIERS[idx + 1] || null;

  if (stage !== lastStage) {
    lastStage = stage;
    setAll('[data-price]', fmt(tier.price));
    setAll('[data-tier-label]', tier.label);
    setAll('[data-per-year]', fmt(Math.round(tier.price / 3)));
    setAll('[data-per-month]', fmt(Math.round(tier.price / 36)));
    if (next) setAll('[data-next-price]', fmt(next.price));

    // a stage with nothing after it should not promise a next price
    document.querySelectorAll('[data-next-wrap]').forEach(el => { el.hidden = !next; });
    document.querySelectorAll('[data-countdown]').forEach(el => { el.hidden = stage === -1; });

    document.querySelectorAll('.tier').forEach(el => {
      const i = +el.dataset.tier;
      el.classList.toggle('current', i === idx && stage !== -1);
      el.classList.toggle('past', stage === -1 ? true : i < idx);
      el.classList.toggle('upcoming', stage !== -1 && i > idx);
      const state = el.querySelector('.t-state');
      if (state) state.textContent = (stage !== -1 && i === idx) ? 'المرحلة الحالية'
        : (stage === -1 || i < idx) ? 'انتهت' : 'المرحلة القادمة';
    });
  }

  if (stage === -1) return;

  const left = ends[idx].getTime() - Date.now();
  const s = Math.max(0, Math.floor(left / 1000));
  const d = Math.floor(s / 86400), h = Math.floor(s % 86400 / 3600),
        m = Math.floor(s % 3600 / 60), sec = s % 60;
  setAll('[data-cd-d]', pad(d));
  setAll('[data-cd-h]', pad(h));
  setAll('[data-cd-m]', pad(m));
  setAll('[data-cd-s]', pad(sec));
  setAll('[data-cd-compact]', (d > 0 ? d + 'ي ' : '') + pad(h) + ':' + pad(m) + ':' + pad(sec));
}

render();
setInterval(render, 1000);
// a tab left open across a stage boundary should catch up on return
document.addEventListener('visibilitychange', () => { if (!document.hidden) render(); });

// ---- WhatsApp order (every CTA routes here) ----
const WHATSAPP_NUMBER = '201091339187';
document.querySelectorAll('.wa-cta').forEach(el => {
  el.addEventListener('click', e => {
    e.preventDefault();
    const idx = currentStage() === -1 ? TIERS.length - 1 : currentStage();
    const msg = 'أهلاً، عايز أحصل على باكدج AutoCaption + AutoCut لمدة 3 سنوات بـ '
              + fmt(TIERS[idx].price) + ' جنيه.';
    window.open('https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(msg), '_blank');
  });
});
