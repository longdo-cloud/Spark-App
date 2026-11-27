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
function banner() {
  return `<button class="press" data-act="tab" data-v="tools" style="position:relative;width:370px;height:278px;border-radius:24px;overflow:hidden;margin:0 16px;flex:none">
  <img src="${IMG('5a2e1764e8')}" alt="" style="position:absolute;left:-12px;top:0;width:402px;height:301px;object-fit:cover"><span style="position:absolute;left:0;right:0;bottom:-1px;height:41px;background:linear-gradient(transparent,#000)"></span>
  <span class="dots" style="position:absolute;left:0;right:0;bottom:18px"><i class="on"></i><i></i><i></i><i></i><i class="s"></i><i class="xs"></i></span></button>`;
}
SCREENS.tab_video = () => ({
  html: `<div class="scroll"><div style="padding-bottom:140px;display:flex;flex-direction:column;gap:32px">
   <div style="display:flex;flex-direction:column;gap:24px">
    <div style="position:relative;height:536px;overflow:hidden">
      <img class="kb" src="${IMG('0e29a76592')}" alt="" style="position:absolute;left:-8px;top:42px;width:420px;height:747px;object-fit:cover;transform-origin:50% 40%">
      <div class="abs" style="left:0;top:0;width:100%;height:130px;background:linear-gradient(rgba(0,0,0,.6),transparent)"></div>
      <div class="abs" style="left:0;top:236px;width:100%;height:300px;background:linear-gradient(transparent,rgba(0,0,0,.8) 70%,#000)"></div>
      <div class="abs" style="left:0;right:0;bottom:34px;display:flex;flex-direction:column;align-items:center;gap:4px">
        <div class="c1" style="font-weight:700;color:var(--n3)">A little imagination</div><div class="t1">Ordinary, meet art.</div>
        <button class="btn glass prom" style="width:222px;margin-top:10px" data-act="openTpl" data-v="neon">Try now ${ic('arrowr')}</button></div>
      <div class="dots abs" style="left:0;right:0;top:518px"><i class="on"></i><i></i><i></i><i></i><i class="s"></i><i class="xs"></i></div>
    </div>
    <div class="hscroll" style="gap:8px;padding:0 16px">${['🔥 Trending AI Video', '⚡️ Action Video', '🎀 AI Hair Studio', 'Birthday'].map(c => `<button class="chip" data-act="grid" data-v="${c}">${c}</button>`).join('')}</div>
   </div>
   ${ROWS_VIDEO.map(r => rowSection(r[0], r[1])).join('')}
   ${top10()}
   ${rowSection('✨ Fantasy Video', ['cosmic', 'skyhero', 'neon'])}
   ${banner()}
   ${rowSection('✨ Fantasy Video', ['cosmic', 'skyhero', 'neon'])}
  </div></div>
  <div class="abs" style="left:0;top:0;width:100%;height:120px;background:linear-gradient(rgba(0,0,0,.55),transparent);pointer-events:none;z-index:25"></div>
  ${largeTitle('Video')}${tabBar('video')}`
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
  const tools = [['sparkles', 'Enhance'], ['brush', 'Stylist'], ['scissors', 'Hairstyle', 'New'], ['eyedrop', 'Makeup', 'Hot'], ['face', 'Face Slim'], ['body', 'Body Slim'], ['sun', 'Skin Tone'], ['halfcircle', 'Remove BG']];
  const pc = (img, title, base = '8fa2b1b0eb') => `<button class="mcard press" style="width:132px;height:208px" data-act="soon"><img src="${IMG(img || base)}" alt="" loading="lazy"><div class="scrim" style="background:linear-gradient(transparent,rgba(0,0,0,.6))">${title}</div></button>`;
  const sec = (t, cards) => `<section style="display:flex;flex-direction:column;gap:12px"><div class="sech" style="padding:0 16px">${t} ${ic('chev')}</div><div class="hscroll" style="gap:12px;padding:0 16px">${cards}</div></section>`;
  return {
    html: `<div class="scroll"><div style="padding:118px 0 140px;display:flex;flex-direction:column;gap:24px">
    <div style="display:grid;grid-template-columns:repeat(4,1fr);row-gap:20px;padding:8px 16px 0">${tools.map(([i, l, b]) => `<button class="press" data-act="soon" style="position:relative;display:flex;flex-direction:column;align-items:center;gap:8px"><span class="circ l glass">${ic(i)}</span><span class="fns">${l}</span>${b ? `<span class="c2s" style="position:absolute;right:4px;top:-4px;background:var(--lime);color:#000;border-radius:8px;padding:0 8px">${b}</span>` : ''}</button>`).join('')}</div>
    ${banner()}
    ${sec('🎀 More Hairstyles', pc(0, 'Color Change') + pc(0, 'Hair Length') + pc(0, 'Smooth Hair'))}
    ${sec('✨ More Beauty tools', pc('8495a865f8', 'Double Eyelids') + pc('db21aa5772', 'V-Line Face') + pc('aae04f701a', 'Brighten Skin'))}
    ${sec('💄 Makeup with Spark', pc('3f38aee88d', 'Soft Glow') + pc('d9d50e1ff3', 'Soft Glow') + pc('f978d182a2', 'Douyin Doll'))}
    </div></div>${largeTitle('Tools')}${tabBar('tools')}`
  };
};
ACT.soon = () => toast('This tool has its own flow (not in this build)', { icon: '' });
ACT.grid = el => go('grid', { title: el.dataset.v });

/* Gallery */
const GAL_VIDEO = [
  ['Today', [['cc8862499f', '0:08'], ['dd0d6a9b85', '0:10'], ['3188779628', '0:08']]],
  ['Nov 16, 2026', [['0006932189', '0:10'], ['84861eff55', '0:06'], ['7852d2c76e', '0:12'], ['27c4cd7892', '0:08'], ['a0c009bf83', '0:10']]],
];
const GAL_IMAGE = [['Today', [['0e4cddc53b', ''], ['d4bd65a314', ''], ['4378f76bb3', '']]], ['Nov 16, 2026', [['37b2464de8', ''], ['3bf90c3605', ''], ['030c9d320f', ''], ['0fcda8a89f', '']]]];
function galleryChips(cur) {
  return `<div class="hscroll" style="gap:8px;padding:0 16px">${[['queue', 'Queue'], ['video', 'Video'], ['image', 'Image'], ['uploads', 'Uploads'], ['bookmarks', 'Bookmarks']].map(([k, l]) => `<button class="chip ${k === cur ? 'on' : 'a1'}" data-act="galTab" data-v="${k}">${l}</button>`).join('')}</div>`;
}
function galGroups(groups, dur = true) {
  return groups.map(([h, items]) => `<section style="display:flex;flex-direction:column;gap:16px"><div class="t3" style="padding:0 16px">${h} ${ic('chev', 'n5')}</div>
  <div class="hscroll" style="gap:12px;padding:0 16px">${items.map(([img, d]) => `<button class="mcard press" style="width:148px;height:264px" data-act="openResult" data-v="${img}"><img src="${IMG(img)}" alt="" loading="lazy">${dur && d ? `<span class="c2s" style="position:absolute;left:8px;bottom:8px;background:rgba(0,0,0,.48);border-radius:8px;padding:4px 8px">${d}</span>` : ''}</button>`).join('')}</div></section>`).join('');
}
function ring(p) { const r = 21, c = 2 * Math.PI * r; return `<svg width="48" height="48" viewBox="0 0 48 48" style="position:absolute;inset:0"><circle cx="24" cy="24" r="${r}" fill="none" stroke="rgba(255,255,255,.2)" stroke-width="3"/><circle cx="24" cy="24" r="${r}" fill="none" stroke="var(--green)" stroke-width="3" stroke-linecap="round" stroke-dasharray="${c}" stroke-dashoffset="${c * (1 - p / 100)}" transform="rotate(-90 24 24)"/></svg>`; }
function queueBody() {
  const making = [['5856cee567', 'Moonlight Witch Cat', 62, '~1 min'], ['3188779628', 'Neon Corridor', 20, '~2 min']];
  const qc = (img, inner, info) => `<div class="mcard" style="width:148px;height:264px"><img src="${IMG(img)}" alt=""><span class="abs" style="inset:0;background:rgba(0,0,0,.6)"></span>${inner}<div class="abs" style="left:8px;right:8px;bottom:8px">${info}</div></div>`;
  return `<section style="display:flex;flex-direction:column;gap:16px"><div class="t3" style="padding:0 16px">Making now</div><div class="hscroll" style="gap:12px;padding:0 16px">
  ${making.map(([img, n, p, t]) => qc(img, `<span class="abs" style="left:50px;top:96px;width:48px;height:48px">${ring(p)}<span class="fns abs" style="inset:0;display:flex;align-items:center;justify-content:center">${p}%</span></span>`, `<div class="shs" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${n}</div><div class="fn n5">Making · ${t}</div>`)).join('')}</div></section>
  <section style="display:flex;flex-direction:column;gap:16px"><div class="t3" style="padding:0 16px">Didn’t work</div><div class="hscroll" style="gap:12px;padding:0 16px">
  ${qc('7852d2c76e', `<button class="btn xs glass abs" style="left:31px;top:106px" data-act="openTpl" data-v="neon">Try again</button>`, `<div class="shs">Mountain Ride</div><div class="fn red">Didn’t work · refunded</div>`)}</div></section>`;
}
SCREENS.tab_gallery = () => {
  const g = S.galleryTab;
  let body = '';
  if (g === 'video') body = galGroups(GAL_VIDEO);
  else if (g === 'queue') body = queueBody();
  else if (g === 'image') body = galGroups(GAL_IMAGE, false);
  else if (g === 'uploads') body = galGroups([['Recent uploads', [[SELFIE, ''], [SELFIE2, ''], ['726146ff99', ''], ['2a841c84a2', '']]]], false);
  else if (g === 'bookmarks') body = bookmarksBody();
  const right = `<button class="circ s glass" data-act="profile" aria-label="Profile" style="overflow:hidden">${S.signedIn ? `<img src="${IMG(AVATAR)}" alt="" style="width:36px;height:36px;border-radius:50%;object-fit:cover;background:#fff">` : ic('gear')}</button>`;
  return { html: `<div class="scroll"><div style="padding:124px 0 140px;display:flex;flex-direction:column;gap:23px">${galleryChips(g)}<div style="display:flex;flex-direction:column;gap:28px">${body}</div></div></div>
  <div class="abs" style="left:0;top:0;width:100%;height:124px;background:linear-gradient(#000 70%,transparent);z-index:25;pointer-events:none"></div>${largeTitle('Gallery', right)}${tabBar('gallery')}` };
};
ACT.galTab = el => { S.galleryTab = el.dataset.v; rerender(); };
ACT.profile = () => go('profile', {});
ACT.openResult = el => go('result', { kind: 'video', img: el.dataset.v, from: 'gallery' });
