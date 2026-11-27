/* App · 4 tabs (Video · Photo · Tools · Gallery) — Figma 908:13051 */
const ROWS_VIDEO = [
  ['🔥 Trending AI Video', ['billionaire', 'neon', 'cosmic']],
  ['⚡️ Action Video', ['dream', 'street', 'skyhero']],
  ['✨ Fantasy Video', ['cosmic', 'skyhero', 'neon']],
];
const TOP10 = ['candle', 'papercut', 'felt', 'midnight', 'noir'];
function rowSection(title, ids, w = 160, h = 252) {
  return `<section style="display:flex;flex-direction:column;gap:16px"><button class="sech" style="padding:0 16px" data-act="grid" data-v="${esc(title)}">${title} ${ic('chev')}</button>
  <div class="hscroll" style="gap:12px;padding:0 16px">${ids.map(id => card(T[id], w, h)).join('')}</div></section>`;
}
function top10() {
  return `<section style="display:flex;flex-direction:column;gap:16px"><div class="sech" style="padding:0 16px">🏆 Top 10 photo styles this week ${ic('chev')}</div>
  <div class="hscroll" style="gap:12px;padding:0 16px">${TOP10.map((id, i) => `<button class="press" data-act="openTpl" data-v="${id}" style="position:relative;width:202px;height:224px;flex:none">
    <span style="position:absolute;left:0;bottom:-18px;font-size:176px;font-weight:900;letter-spacing:-10.5px;line-height:1;background:linear-gradient(#fff,rgba(140,140,148,.8) 55%,rgba(77,77,82,0));-webkit-background-clip:text;background-clip:text;color:transparent;-webkit-text-stroke:1px rgba(255,255,255,.35)">${i + 1}</span>
    <span class="mcard" style="position:absolute;right:0;top:0;width:126px;height:224px;border-radius:16px"><img src="${IMG(T[id].img)}" alt="" loading="lazy"><span class="scrim" style="font-size:13px;line-height:16px;padding:40px 10px 12px;background:linear-gradient(transparent,rgba(0,0,0,.85))">${T[id].name}</span></span></button>`).join('')}</div></section>`;
}
function banner(img = '5a2e1764e8', act = 'tab') {
  return `<button class="press" data-act="${act}" data-v="tools" style="position:relative;width:370px;height:278px;border-radius:24px;overflow:hidden;margin:0 16px;flex:none">
  <img src="${IMG(img)}" alt="" style="position:absolute;left:-12px;top:0;width:402px;height:301px;object-fit:cover"><span style="position:absolute;left:0;right:0;bottom:-1px;height:41px;background:linear-gradient(transparent,#000)"></span>
  <span class="dots" style="position:absolute;left:0;right:0;bottom:18px"><i class="on"></i><i></i><i></i><i></i><i class="s"></i><i class="xs"></i></span></button>`;
}
/* Hero carousel — clips from v/ (same set and copy as the earlier prototype's Discover hero) */
const HERO = [['03', 'A little imagination', 'Ordinary, meet art.', 'chefs'], ['12', 'Action Video', 'Grandma goes full blockbuster.', 'granny'], ['06', 'Couple', 'Two of you, one movie scene.', 'pool'], ['14', 'Funny', 'Wake up to something big.', 'whale'], ['08', 'Trending AI Video', 'Game day, main character.', 'gameday']];
function videoHero() {
  return `<div class="hscroll herotrack" style="position:absolute;inset:0;gap:0;scroll-snap-type:x mandatory">${HERO.map(([v, k, t, col], i) => `<div style="position:relative;flex:none;width:402px;height:536px;scroll-snap-align:start;overflow:hidden">
    <video src="v/${v}.mp4" poster="p/${v}.jpg" muted loop playsinline autoplay preload="${i ? 'none' : 'auto'}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover"></video>
    <div class="abs" style="left:0;top:0;width:100%;height:130px;background:linear-gradient(rgba(0,0,0,.6),transparent)"></div>
    <div class="abs" style="left:0;top:236px;width:100%;height:300px;background:linear-gradient(transparent,rgba(0,0,0,.8) 70%,#000)"></div>
    <div class="abs" style="left:0;right:0;bottom:34px;display:flex;flex-direction:column;align-items:center;gap:4px">
      <div class="c1" style="font-weight:700;color:var(--n3)">${k}</div><div class="t1">${t}</div>
      <button class="btn glass prom" style="width:222px;margin-top:10px" data-act="heroTry" data-v="${col}">Try now ${ic('arrowr')}</button></div></div>`).join('')}</div>
  <div class="dots abs herodots" style="left:0;right:0;top:518px;pointer-events:none">${HERO.map((_, i) => `<i class="${i ? '' : 'on'}"></i>`).join('')}</div>`;
}
ACT.heroTry = el => startCreate(el.dataset.v);
function mountHero(el) {
  const tr = el.querySelector('.herotrack'); if (!tr) return; const dots = el.querySelectorAll('.herodots i'); const vids = tr.querySelectorAll('video');
  let cur = 0; const show = i => { cur = i; dots.forEach((d, k) => d.className = k === i ? 'on' : ''); vids.forEach((v, k) => { if (k === i) { v.preload = 'auto'; v.play().catch(() => { }); } else v.pause(); }); };
  tr.addEventListener('scroll', () => { const i = Math.round(tr.scrollLeft / 402); if (i !== cur) show(i); }, { passive: true });
  el._hero = setInterval(() => { if (!document.body.contains(tr)) return clearInterval(el._hero); if (tr._drag || Date.now() - (tr._touched || 0) < 5000) return; smoothScroll(tr, 'scrollLeft', ((cur + 1) % HERO.length) * 402, 650); }, 6000);
  show(0);
}
SCREENS.tab_video = () => ({
  html: `<div class="scroll"><div style="padding-bottom:140px;display:flex;flex-direction:column;gap:32px">
   <div style="display:flex;flex-direction:column;gap:24px">
    <div style="position:relative;height:536px;overflow:hidden">${videoHero()}</div>
    <div class="hscroll" style="gap:8px;padding:0 16px">${['🔥 Trending AI Video', '⚡️ Action Video', '🎀 AI Hair Studio', 'Birthday'].map(c => `<button class="chip" data-act="grid" data-v="${c}">${c}</button>`).join('')}</div>
   </div>
   <div style="display:flex;flex-direction:column;gap:40px">${ROWS_VIDEO.map(r => rowSection(r[0], r[1])).join('')}
   ${top10()}
   ${rowSection('✨ Fantasy Video', ['cosmic', 'skyhero', 'neon'])}
   ${banner()}
   ${rowSection('✨ Fantasy Video', ['cosmic', 'skyhero', 'neon'])}</div>
  </div></div>
  <div class="abs" style="left:0;top:0;width:100%;height:120px;background:linear-gradient(rgba(0,0,0,.55),transparent);pointer-events:none;z-index:25"></div>
  ${largeTitle('Video')}${tabBar('video')}`,
  mount: mountHero
});
SCREENS.tab_photo = () => ({
  html: `<div class="scroll"><div style="padding-bottom:140px">
   <div id="ba" style="position:relative;height:536px;overflow:hidden;touch-action:pan-y">
     <img src="${IMG('dc5ec66190')}" alt="" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover">
     <div class="ba-before" style="position:absolute;left:0;top:0;bottom:0;width:238px;overflow:hidden"><img src="${IMG('dc5ec66190')}" alt="" style="position:absolute;left:0;top:0;width:402px;height:536px;object-fit:cover;filter:saturate(.35) brightness(.78) contrast(.95)"></div>
     <div class="abs" style="left:0;top:0;width:100%;height:160px;background:linear-gradient(rgba(0,0,0,.6),transparent)"></div>
     <div class="abs" style="left:0;top:236px;width:100%;height:300px;background:linear-gradient(transparent,rgba(0,0,0,.8) 70%,#000)"></div>
     <div class="ba-line abs" style="left:237px;top:0;width:2px;height:536px;background:rgba(255,255,255,.36)"></div>
     <span class="ba-handle abs circ s glass" style="left:216px;top:228px">${ic('lr')}</span>
     <span class="abs c2s" style="left:16px;top:240px;background:rgba(0,0,0,.36);border-radius:8px;padding:4px 8px">Your selfie</span>
     <span class="abs c2s" style="right:16px;top:240px;background:rgba(0,0,0,.36);border-radius:8px;padding:4px 8px">AI result</span>
     <div class="abs" style="left:16px;right:16px;top:446px;display:flex;align-items:center"><div style="flex:1"><div class="t2">Candlelight Wish</div><div class="sh n5" style="margin-top:2px">Birthday edit</div></div>
       <button class="btn glass prom s" style="height:50px;padding:0 18px" data-act="openTpl" data-v="lavender">Try it!</button></div>
     <div class="dots abs" style="left:0;right:0;top:518px"><i class="on"></i><i></i><i></i><i></i><i class="s"></i><i class="xs"></i></div>
   </div>
   <div style="padding:28px 16px 0"><div class="sech">✨ Styles</div>
    <div style="display:flex;justify-content:space-between;margin-top:16px">${[['gift', 'Birthday'], ['camera', 'Portrait'], ['brush', 'Art'], ['heart', 'Cute'], ['couple', 'Couple']].map(([i, l]) => `<button class="press" data-act="grid" data-v="${l}" style="display:flex;flex-direction:column;align-items:center;gap:8px;width:61px"><span class="circ l glass">${ic(i)}</span><span class="shs n5">${l}</span></button>`).join('')}</div></div>
   <div style="margin-top:36px">${rowSection('🎂 Birthday Glow', ['cake', 'lavender', 'thirty'])}</div>
   <div style="margin-top:36px">${top10()}</div>
  </div></div>
  ${largeTitle('Photo')}${tabBar('photo')}`,
  mount(el) { // before/after drag
    const ba = el.querySelector('#ba'), bf = el.querySelector('.ba-before'), ln = el.querySelector('.ba-line'), hd = el.querySelector('.ba-handle');
    const set = x => { x = Math.max(24, Math.min(378, x)); bf.style.width = x + 'px'; ln.style.left = (x - 1) + 'px'; hd.style.left = (x - 22) + 'px'; };
    let drag = false; const pos = e => (e.touches ? e.touches[0].clientX : e.clientX) - ba.getBoundingClientRect().left;
    const scale = () => ba.getBoundingClientRect().width / 402;
    hd.addEventListener('pointerdown', e => { drag = true; hd.setPointerCapture(e.pointerId); });
    hd.addEventListener('pointermove', e => { if (drag) set(pos(e) / scale()); });
    hd.addEventListener('pointerup', () => drag = false);
    let t = 0; const auto = () => { if (!document.body.contains(ba)) return; if (!drag) { t += 0.012; set(201 + Math.sin(t) * 120); } requestAnimationFrame(auto); }; auto();
  }
});
SCREENS.tab_tools = () => {
  const tools = [['sparkles', 'Enhance'], ['brush', 'Stylist'], ['scissors', 'Hairstyle', 'New'], ['eyedrop', 'Makeup', 'Hot'], ['face', 'Face Slim'], ['person', 'Body Slim'], ['sun', 'Skin Tone'], ['halfcircle', 'Remove BG']];
  const pc = (img, title, act = 'soon') => `<button class="mcard press" style="width:132px;height:208px" data-act="${act}"><img src="${IMG(img)}" alt="" loading="lazy">${title ? `<div class="scrim" style="background:linear-gradient(transparent,rgba(0,0,0,.6))">${title}</div>` : ''}</button>`;
  const sec = (t, cards) => `<section style="display:flex;flex-direction:column;gap:12px"><div class="sech" style="padding:0 16px">${t} ${ic('chev')}</div><div class="hscroll" style="gap:12px;padding:0 16px">${cards}</div></section>`;
  return {
    html: `<div class="scroll"><div style="padding:118px 0 140px;display:flex;flex-direction:column;gap:24px">
    <div style="display:grid;grid-template-columns:repeat(4,1fr);row-gap:20px;padding:8px 16px">${tools.map(([i, l, b]) => `<button class="press" data-act="${l === 'Hairstyle' ? 'hairstyle' : 'soon'}" style="position:relative;display:flex;flex-direction:column;align-items:center;gap:8px"><span class="circ l glass">${ic(i)}</span><span class="fns">${l}</span>${b ? `<span class="c2s" style="position:absolute;right:4px;top:-4px;background:var(--lime);color:#000;border-radius:8px;padding:0 8px">${b}</span>` : ''}</button>`).join('')}</div>
    ${banner('banner_hair', 'hairstyle')}
    ${sec('🎀 More Hairstyles', pc('tool_color', '', 'hairstyle') + pc('tool_length', '', 'hairstyle') + pc('tool_smooth', '', 'hairstyle'))}
    ${sec('✨ More Beauty tools', pc('a18c5a684d', 'Double Eyelids') + pc('bd8119b45f', 'V-Line Face') + pc('670c26d5b1', 'Brighten Skin'))}
    ${sec('💄 Makeup with Spark', pc('beauty_1', 'Soft Glow') + pc('beauty_2', 'Soft Glow') + pc('beauty_3', 'Douyin Doll'))}
    </div></div>${largeTitle('Tools')}${tabBar('tools')}`
  };
};
ACT.soon = () => toast('This tool has its own flow (not in this build)', { icon: '' });
ACT.grid = el => go('grid', { title: el.dataset.v });

