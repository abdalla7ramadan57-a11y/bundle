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

// ---- Text Hooks gallery (45 de-duplicated style previews) ----
const HOOKS=45, hookGrid=document.getElementById('hookGrid'),
      hookVid=document.getElementById('hookVideo'), hookName=document.getElementById('hookName');
if(hookGrid){
  const pad=n=>String(n).padStart(2,'0');
  const show=n=>{
    document.querySelectorAll('.hook-thumb').forEach(x=>x.classList.remove('active'));
    const btn=hookGrid.children[n-1]; if(btn) btn.classList.add('active');
    hookVid.src='assets/texthooks/th_'+pad(n)+'.mp4';
    hookVid.poster='assets/texthooks/th_'+pad(n)+'.jpg';
    hookName.textContent='Style '+pad(n);
    hookVid.play().catch(()=>{});
  };
  for(let n=1;n<=HOOKS;n++){
    const b=document.createElement('button');
    b.className='hook-thumb'+(n===1?' active':'');
    b.type='button';
    b.setAttribute('aria-label','Text Hook Style '+pad(n));
    const img=document.createElement('img');
    img.src='assets/texthooks/th_'+pad(n)+'.jpg';
    img.alt='Text Hook Style '+pad(n);
    img.loading='lazy'; img.width=320; img.height=180;
    b.appendChild(img);
    b.onclick=()=>show(n);
    hookGrid.appendChild(b);
  }
  // first clip is set up without autoplaying a fetch until it scrolls into view
  hookVid.poster='assets/texthooks/th_01.jpg';
  const io2=new IntersectionObserver((es,o)=>{es.forEach(e=>{if(e.isIntersecting){show(1);o.disconnect();}})},{rootMargin:'200px'});
  io2.observe(document.querySelector('.hook-stage'));
}

// ---- WhatsApp order ----
const WHATSAPP_NUMBER='201091339187';
document.getElementById('whatsappBtn').onclick=(e)=>{
  e.preventDefault();
  const msg='أهلاً، عايز أشترك في باكدج AutoCaption + AutoCut لمدة 3 سنين بـ 1,499 جنيه.';
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`,'_blank');
};
