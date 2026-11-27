/* Generate video / Generate image flows — Figma 1365:77183 (video) & 1365:81391 (image) */
const FEED_VIDEO = ['neon', 'cosmic', 'billionaire', 'street', 'skyhero'];
const FEED_PHOTO = ['lavender', 'cake', 'thirty', 'candle', 'midnight'];
const CATS = [['🔥', 'Trending AI Video'], ['📸', 'Trending AI Photo'], ['✨', 'Trending AI Tools'], ['⚡', 'Action Video'], ['🎀', 'AI Hair Studio'], ['🎄', 'Holiday Glow'], ['💖', 'Valentine'], ['🎃', 'Halloween Night']];
const isVid = t => t.kind === 'video';
const media = (t, style = '', cls = '') => t.v ? `<video class="${cls}" src="v/${t.v}.mp4" poster="${IMG(t.img)}" muted loop playsinline autoplay data-auto style="${style}"></video>` : `<img class="${cls}" src="${IMG(t.img)}" alt="" style="${style}">`;

/* ---------- 01 · Collection grid ---------- */
function chipsRow(active, filterAct = 'cats') {
  return `<div class="abs" style="left:0;top:124px;width:100%;height:36px;z-index:31"><div class="hscroll" style="gap:8px;padding:0 60px 0 16px">${CATS.slice(0, 5).map(([e, l]) => `<button class="chip ${l === active ? 'on' : 'a1'}" style="height:36px" data-act="pickCat" data-v="${l}">${e} ${l}</button>`).join('')}</div>
  <div class="abs" style="right:0;top:0;width:105px;height:36px;background:linear-gradient(90deg,transparent,#000 50%);pointer-events:none"></div>
  <button class="abs circ xs glass" style="right:16px;top:0" data-act="${filterAct}" aria-label="Filter">${ic('filter')}</button></div>`;
}
function gridCard(t) {
  const bm = S.bookmarks.has(t.id);
  return `<div class="mcard press" style="width:179px;height:318px;border-radius:20px" data-act="openTpl" data-v="${t.id}">${t.v ? `<video src="v/${t.v}.mp4" poster="${IMG(t.img)}" muted loop playsinline autoplay data-auto></video>` : `<img src="${IMG(t.img)}" alt="" loading="lazy">`}
   <div class="scrim" style="padding:40px 12px 12px;display:flex;flex-direction:column;gap:2px"><span class="shs">${t.name}</span><span class="fns" style="display:flex;align-items:center;gap:4px"><img src="img/coin.png" style="width:16px;height:16px" alt="">${t.price}</span></div>
   <button class="abs circ xs glass" style="right:8px;top:8px" data-act="toggleBm" data-v="${t.id}" aria-label="Save">${ic(bm ? 'bookmarkf' : 'bookmark')}</button></div>`;
}
SCREENS.grid = ({ title = '🔥 Trending AI Video' }) => {
  const clean = title.replace(/^[^A-Za-z]+/, '').trim() || 'Trending AI Video';
  const ids = /Photo|Birthday|Portrait|Art|Cute|Couple/.test(clean) ? ['lavender', 'cake', 'thirty', 'candle', 'midnight', 'noir'] : ['billionaire', 'neon', 'cosmic', 'street', 'skyhero', 'pinkhair'];
  return {
    html: `<div class="scroll"><div style="padding:184px 16px 40px;display:grid;grid-template-columns:179px 179px;gap:12px">${ids.map(id => gridCard(T[id])).join('')}</div></div>
  <div class="abs" style="left:0;top:0;width:100%;height:168px;background:linear-gradient(#000 85%,transparent);z-index:29;pointer-events:none"></div>
  <div class="tb">${backBtn()}<div class="ttl">${clean}</div></div>${chipsRow(clean)}`
  };
};
ACT.pickCat = el => { const cur = stack[stack.length - 1]; if (cur.name === 'grid') { cur.args.title = el.dataset.v; rerender(); } else go('grid', { title: el.dataset.v }); };
ACT.cats = () => sheet({ title: 'Categories', html: `<div class="grp">${CATS.map(([e, l], i) => `<button class="row" data-act="catRow" data-v="${l}"><span style="width:24px;text-align:center;font-size:18px">${e}</span>${l}${i === 0 ? `<span class="r" style="color:var(--lime)">${ic('check')}</span>` : ''}</button>`).join('')}</div>` });
ACT.catRow = el => { closeSheet(); setTimeout(() => ACT.pickCat(el), 200); };
ACT.toggleBm = (el, e) => { e.stopPropagation(); const id = el.dataset.v; if (S.bookmarks.has(id)) { S.bookmarks.delete(id); rerender(); toast('Removed from Saved', { icon: '' }); } else { S.bookmarks.add(id); addToDefault(id); rerender(); toast('Saved', { act: 'Collections', fn: () => saveToCollection(id) }); } };
function addToDefault(id) { const d = S.collections.find(c => c.def); if (!d.items.includes(id)) d.items.unshift(id); }

/* ---------- 02 · Template detail (full-screen feed) ---------- */
SCREENS.feed = ({ id = 'neon' }) => {
  const list = isVid(T[id]) ? FEED_VIDEO : FEED_PHOTO; const order = [id, ...list.filter(x => x !== id)];
  const page = t => {
    const bm = S.bookmarks.has(t.id);
    return `<section class="fpage" data-id="${t.id}" style="position:relative;height:874px;scroll-snap-align:start;scroll-snap-stop:always;overflow:hidden">
    ${media(t, 'position:absolute;inset:0;width:100%;height:100%;object-fit:cover')}
    <div class="abs" style="left:0;top:0;width:100%;height:246px;background:linear-gradient(rgba(0,0,0,.7),transparent)"></div>
    <div class="abs" style="left:0;bottom:0;width:100%;height:325px;background:linear-gradient(transparent,rgba(0,0,0,.8))"></div>
    <div class="abs" style="left:16px;top:670px;width:300px">
      <div style="display:flex;align-items:center;gap:8px"><span class="icbox" style="width:24px;height:24px;border-radius:12px;background:var(--a100);font-size:12px">${ic(isVid(t) ? 'film' : 'camera')}</span><span class="shs">${t.cat}</span></div>
      <div style="font-size:36px;line-height:43px;font-weight:800;letter-spacing:-.5px;margin-top:8px">${t.name}</div>
      <div class="fns" style="display:flex;align-items:center;gap:4px;margin-top:8px"><img src="img/coin.png" style="width:20px;height:20px" alt="">${t.price} coins</div></div>
    <div class="abs" style="left:340px;top:692px;display:flex;flex-direction:column;gap:16px">
      <button class="press" data-act="feedSave" data-v="${t.id}" style="display:flex;flex-direction:column;align-items:center;gap:4px"><span class="circ glass">${ic(bm ? 'bookmarkf' : 'bookmark')}</span><span class="c1" style="font-weight:700">${bm ? 'Saved' : 'Save'}</span></button>
      <button class="press" data-act="more" data-v="${t.id}" style="display:flex;flex-direction:column;align-items:center;gap:4px"><span class="circ glass">${ic('ellipsis')}</span><span class="c1" style="font-weight:700">More</span></button></div>
    <button class="btn glass prom abs" style="left:16px;top:788px;width:192px;height:50px" data-act="useStyle" data-v="${t.id}">${ic('sparkles')} Use This Style</button>
    </section>`;
  };
  return {
    html: `<div class="scroll feedsc" style="scroll-snap-type:y mandatory">${order.map(i => page(T[i])).join('')}</div>
    <div class="abs pager" style="right:6px;top:416px;display:flex;flex-direction:column;gap:4px;z-index:31">${order.map((_, i) => `<i style="width:4px;height:${i ? 4 : 16}px;border-radius:2px;background:${i ? 'var(--a400)' : '#fff'};display:block;transition:all .3s"></i>`).join('')}</div>
    <div class="feedtop">${chipsRow(isVid(T[id]) ? 'Trending AI Video' : 'Trending AI Photo')}</div>
    <div class="tb">${backBtn()}<div class="ttl feedttl" style="opacity:0;transition:opacity .25s;display:flex;align-items:center;justify-content:center;gap:8px">${isVid(T[id]) ? 'Trending AI Video' : 'Trending AI Photo'}</div><span class="sp"></span>${joinNow()}</div>
    <div class="compact abs" style="left:16px;right:16px;top:795px;height:44px;display:flex;justify-content:space-between;z-index:32;opacity:0;pointer-events:none;transition:opacity .25s">
      <span style="position:relative;display:inline-flex"><span class="runline"></span><button class="btn glass prom" style="height:44px;width:137px;font-size:15px" data-act="useStyleCur">${ic('sparkles')} Use this</button></span>
      <button class="circ s glass" data-act="feedSaveCur">${ic('bookmark')}</button></div>`,
    mount(el) {
      const sc = el.querySelector('.feedsc'), top = el.querySelector('.feedtop'), ttl = el.querySelector('.feedttl'), cp = el.querySelector('.compact'); const dots = el.querySelectorAll('.pager i');
      let collapsed = false;
      sc.addEventListener('scroll', () => {
        const i = Math.round(sc.scrollTop / sc.clientHeight); el.dataset.cur = order[i];
        dots.forEach((d, k) => { d.style.height = k === i ? '16px' : '4px'; d.style.background = k === i ? '#fff' : 'var(--a400)'; });
        const c = sc.scrollTop > 60; if (c !== collapsed) { collapsed = c; top.style.opacity = c ? 0 : 1; top.style.pointerEvents = c ? 'none' : ''; ttl.style.opacity = c ? 1 : 0; cp.style.opacity = c ? 1 : 0; cp.style.pointerEvents = c ? 'auto' : 'none';
          el.querySelectorAll('.fpage > .btn, .fpage > .abs[style*="left:340px"]').forEach(n => { n.style.transition = 'opacity .25s'; n.style.opacity = c ? 0 : 1; n.style.pointerEvents = c ? 'none' : ''; }); }
        el.querySelectorAll('.fpage video').forEach((v, k) => k === i ? v.play().catch(() => { }) : v.pause());
      }, { passive: true });
      top.style.transition = 'opacity .25s'; el.dataset.cur = order[0];
    }
  };
};
ACT.openTpl = el => go('feed', { id: el.dataset.v });
ACT.feedSave = el => { const id = el.dataset.v; if (S.bookmarks.has(id)) { S.bookmarks.delete(id); toast('Removed from Saved', { icon: '' }); } else { S.bookmarks.add(id); addToDefault(id); toast('Saved', { act: 'Collections', fn: () => saveToCollection(id) }); }
  const lbl = el.querySelector('.c1'), c = el.querySelector('.circ'); const on = S.bookmarks.has(id); lbl.textContent = on ? 'Saved' : 'Save'; c.innerHTML = ic(on ? 'bookmarkf' : 'bookmark'); };
ACT.feedSaveCur = el => { const cur = stack[stack.length - 1].el.dataset.cur; const b = stack[stack.length - 1].el.querySelector(`.fpage[data-id="${cur}"] [data-act="feedSave"]`); if (b) ACT.feedSave(b); el.innerHTML = ic(S.bookmarks.has(cur) ? 'bookmarkf' : 'bookmark'); };
ACT.useStyle = el => startCreate(el.dataset.v);
ACT.useStyleCur = () => startCreate(stack[stack.length - 1].el.dataset.cur);
function startCreate(id) { go('create', { id, people: T[id].people || 1 }); }

/* More sheet (option B: social + icon buttons) */
ACT.more = () => {
  const soc = [['tiktok', 'TikTok'], ['instagram', 'Instagram'], ['facebook', 'Facebook'], ['messenger', 'Messenger'], ['whatsapp', 'WhatsApp']];
  const item = (inner, l, act) => `<button class="press" data-act="${act}" style="width:70px;display:flex;flex-direction:column;align-items:center;gap:4px">${inner}<span class="c1" style="font-weight:700">${l}</span></button>`;
  const solid = i => `<span class="circ" style="background:#2c2c2e">${ic(i)}</span>`;
  const socImg = k => k === 'messenger' ? `<span class="circ" style="background:linear-gradient(#00b2ff,#006aff)">${ic('chat')}</span>` : `<img src="img/soc_${k}.png" style="width:48px;height:48px" alt="">`;
  sheet({
    title: 'More', html: `<div style="display:flex;gap:2px;padding-bottom:16px">${soc.map(([k, l]) => item(socImg(k), l, 'shareTo')).join('')}</div>
    <div style="height:1px;background:rgba(255,255,255,.08);margin-bottom:16px"></div>
    <div style="display:flex;gap:2px">${item(solid('link'), 'Copy link', 'copyLink')}${item(solid('flag'), 'Report', 'report')}${item(solid('chat'), 'Contact us', 'contact')}${item(solid('ellipsis'), 'More', 'shareTo')}</div>`
  });
};
ACT.shareTo = () => { closeSheet(); toast('Opening share…', { icon: '' }); };
ACT.copyLink = () => { closeSheet(); toast('Link copied'); };
ACT.report = () => { closeSheet(); setTimeout(() => sheet({ title: 'Report this template', html: `<div class="grp noic">${['Inappropriate content', 'Misleading preview', 'Copyright issue', 'Something else'].map(r => `<button class="row" data-act="reportDone">${r}<span class="r">${ic('chev')}</span></button>`).join('')}</div>` }), 250); };
ACT.reportDone = () => { closeSheet(); toast('Thanks — we’ll review it'); };
ACT.contact = () => { closeSheet(); toast('Opening email…', { icon: '' }); };

/* ---------- 03 · Create ---------- */
function priceOf(st) { const t = T[st.id]; return isVid(t) ? (st.dur === 'Long' ? 160 : 120) : 100; }
function newCreate(id, people) { const t = T[id]; return { id, people, photos: people === 2 ? [null, null] : [null], check: people === 2 ? ['', ''] : [''], sound: true, dur: 'Short', res: '480p', ratio: isVid(t) ? '9:16' : '4:5' }; }
const SETUP = {}; // per create session
function settingsBar(st) {
  const t = T[st.id];
  const items = isVid(t) ? [['sound', st.sound ? 'On' : 'Off'], ['clock', st.dur], ['film', st.res]] : [['ratio', st.ratio], ['film', st.res]];
  return `<button class="press" data-act="openSettings" style="height:52px;border-radius:16px;background:var(--a100);display:flex;align-items:center;padding:0 16px 0 14px;width:100%">${items.map(([i, l], k) => `${k ? '<span style="width:1px;height:20px;background:var(--a200);margin:0 14px"></span>' : ''}<span class="sh" style="display:flex;align-items:center;gap:6px;font-weight:600"><span class="n5" style="font-size:14px">${ic(i)}</span>${l}</span>`).join('')}<span class="n5" style="margin-left:auto;font-size:13px">${ic('chev')}</span></button>`;
}
function thumb(img, w = 96, h = 120) { return `<span style="width:${w}px;height:${h}px;border-radius:16px;overflow:hidden;flex:none;display:block"><img src="${IMG(img)}" alt="" style="width:100%;height:100%;object-fit:cover"></span>`; }
function emptyThumb(w = 96, h = 120, act = 'addPhoto', i = 0) { return `<button class="press" data-act="${act}" data-i="${i}" style="width:${w}px;height:${h}px;border-radius:16px;background:rgba(255,255,255,.04);box-shadow:inset 0 0 0 1.5px rgba(255,255,255,.3);position:relative;flex:none;display:flex;align-items:center;justify-content:center"><span class="ripple"></span><span class="ripple d2"></span><span class="addlime">${ic('plus')}</span></button>`; }
function photoCard(st) {
  if (st.people === 2) {
    const done = st.check.filter(c => c === 'ok').length;
    const slot = i => { const ph = st.photos[i], c = st.check[i]; const name = 'Photo ' + (i + 1);
      const th = ph ? `<button class="press" data-act="addPhoto" data-i="${i}" style="position:relative">${thumb(ph)}${c === 'checking' ? `<span class="abs" style="inset:0;border-radius:16px;background:rgba(0,0,0,.45);display:flex;align-items:center;justify-content:center"><span class="spin"></span></span>` : ''}</button>` : emptyThumb(96, 120, 'addPhoto', i);
      const pill = c === 'ok' ? `<span class="pill ok">${ic('checkc')} ${name}</span>` : c === 'bad' ? `<span class="pill bad">${ic('warn')} No clear face</span>` : c === 'checking' ? `<span class="pill neu">Checking…</span>` : `<span class="pill neu">${name}</span>`;
      return `<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:8px">${th}${pill}</div>`; };
    return `<div style="border-radius:24px;background:rgba(255,255,255,.08);padding:16px;display:flex;flex-direction:column;gap:16px;-webkit-backdrop-filter:blur(24px);backdrop-filter:blur(24px)">
      <div><div class="hl">${done === 2 ? 'Both photos ready' : 'Add 2 photos'}</div><div class="fn" style="color:rgba(255,255,255,.55);margin-top:4px">${done === 0 ? 'One clear selfie for each photo' : done === 1 ? 'Add 1 more photo to continue' : 'Tap a photo to change it'}</div></div>
      <div style="display:flex;gap:12px">${slot(0)}${slot(1)}</div></div>`;
  }
  const ph = st.photos[0], c = st.check[0];
  let left, text, right = '';
  if (!ph) { left = emptyThumb(); text = `<div class="hl">Add your photo</div><div class="fn" style="color:rgba(255,255,255,.55);margin-top:4px">A clear, front-facing selfie works best</div>`; }
  else if (c === 'checking') { left = `<span style="position:relative">${thumb(ph)}<span class="abs" style="inset:0;border-radius:16px;background:rgba(0,0,0,.45);display:flex;align-items:center;justify-content:center"><span class="spin"></span></span></span>`; text = `<div class="hl">Checking photo…</div><div class="fn" style="color:rgba(255,255,255,.55);margin-top:4px">Making sure your face is clear</div>`; }
  else if (c === 'bad') { left = thumb(ph); text = `<div class="hl">Your photo</div><span class="pill bad" style="margin-top:6px">${ic('warn')} No clear face</span><div class="fn" style="color:rgba(255,255,255,.55);margin-top:6px">Try one person facing the camera</div>`; right = `<button class="btn glass prom s" style="height:36px" data-act="addPhoto" data-i="0">Change</button>`; }
  else { left = thumb(ph); text = `<div class="hl">Your photo</div><span class="pill ok" style="margin-top:6px">${ic('checkc')} Looks good</span>`; right = `<button class="btn glass s" style="height:36px" data-act="addPhoto" data-i="0">Change</button>`; }
  return `<div style="border-radius:24px;background:rgba(255,255,255,.08);padding:16px;display:flex;align-items:center;gap:16px;-webkit-backdrop-filter:blur(24px);backdrop-filter:blur(24px)">${left}<div style="flex:1;min-width:0">${text}</div>${right}</div>`;
}
SCREENS.create = ({ id = 'neon', people = 1, fresh = true }) => {
  const key = id + people; if (fresh || !SETUP[key]) SETUP[key] = SETUP[key] && !fresh ? SETUP[key] : newCreate(id, people);
  const st = SETUP[key]; const t = T[id]; const price = priceOf(st);
  const ready = st.check.every(c => c === 'ok'); const checking = st.check.some(c => c === 'checking');
  const note = checking ? 'Checking your photo…' : ready ? '' : st.check.some(c => c === 'bad') ? 'Change your photo to continue' : (people === 2 ? 'Add 2 photos to continue' : 'Add a photo to continue');
  return {
    html: `${media(t, 'position:absolute;inset:0;width:100%;height:100%;object-fit:cover')}
    <div class="abs" style="left:0;top:0;width:100%;height:140px;background:linear-gradient(rgba(0,0,0,.55),transparent)"></div>
    <div class="abs" style="left:0;top:${people === 2 ? 380 : 469}px;width:100%;bottom:0;background:linear-gradient(rgba(10,10,12,0),#0a0a0c 37%)"></div>
    <div class="tb">${closeBtn('closeCreate')}<div class="ttl">${t.name}</div></div>
    <div class="abs" style="left:16px;right:16px;bottom:${note ? 128 : 112}px;display:flex;flex-direction:column;gap:12px">${photoCard(st)}${settingsBar(st)}</div>
    <div class="abs" style="left:16px;right:16px;bottom:${note ? 50 : 62}px">
      <button class="btn glass ${ready ? 'prom' : 'dis'}" style="height:50px" data-act="doCreate">${ready ? 'Create with' : 'Create ·'} ${COIN} ${price}</button>
      ${note ? `<div class="fn ctr" style="color:rgba(255,255,255,.5);margin-top:12px">${note}</div>` : ''}</div>`,
    mount(el) { el.dataset.key = key; }
  };
};
const curSetup = () => SETUP[stack[stack.length - 1].el.dataset.key] || SETUP[Object.keys(SETUP).pop()];
const refreshCreate = () => { const c = stack[stack.length - 1]; if (c.name === 'create') { c.args.fresh = false; rerender(); } };
ACT.closeCreate = () => back();
ACT.addPhoto = el => { const st = curSetup(); st.slot = +(el.dataset.i || 0); if (!S.guideAgreed) guidelinesSheet(); else chooseSheet(); };

/* 04 · Guidelines + Permission */
function guidelinesSheet() {
  const ex = [SELFIE, '726146ff99', '2a841c84a2', '9f43c6d6b2'];
  const s = sheet({
    title: 'Before you add a photo', html: `<div style="display:flex;flex-direction:column;gap:24px;padding-bottom:4px">
    <div><div class="hl" style="display:flex;align-items:center;gap:6px"><span class="green">${ic('face')}</span> Works great</div>
      <div style="display:flex;gap:8px;margin:12px 0 8px">${ex.map(h => `<img src="${IMG(h)}" style="width:84px;height:104px;border-radius:16px;object-fit:cover" alt="">`).join('')}</div>
      <div class="fn n5">Your own selfie · face the camera · one person</div></div>
    <div><div class="hl" style="display:flex;align-items:center;gap:6px"><img src="img/lg_risk.png" style="width:24px;height:24px" alt=""> Permission required</div>
      <ul style="margin:16px 0 0 20px;display:flex;flex-direction:column;gap:8px;color:var(--n3)" class="sh">
      <li>Your photo is sent to third-party AI providers to make your result.</li><li>They use it only for that — nothing else.</li><li>Your original photo is deleted within 24 hours.</li><li>I'm in this photo, or everyone in it allowed me to use it.</li></ul>
      <button class="press" data-act="agreeTick" style="display:flex;align-items:center;gap:12px;margin-top:16px;text-align:left"><span class="cbx">${ic('check')}</span><span class="shs">I've read and agree with the above</span></button></div>
    <div><button class="btn glass dis agreebtn" style="height:50px" data-act="agreeGo">Continue</button><div class="fn n5 ctr" style="padding:8px">Read full guidelines</div></div></div>`
  });
  return s;
}
ACT.agreeTick = el => { const c = el.querySelector('.cbx'); c.classList.toggle('on'); const b = el.closest('.sheet').querySelector('.agreebtn'); const on = c.classList.contains('on'); b.classList.toggle('dis', !on); b.classList.toggle('prom', on); };
ACT.agreeGo = () => { S.guideAgreed = true; closeSheet(); setTimeout(chooseSheet, 320); };

/* 05 · Choose a photo */
let hasCreations = true;
function chooseSheet() {
  const recent = [SELFIE, '726146ff99', '2a841c84a2', '9f43c6d6b2'];
  const body = hasCreations ? `<div class="hscroll" style="gap:8px;margin:0 -16px;padding:0 16px">${recent.map(h => `<button class="press" data-act="pickRecent" data-v="${h}" style="width:110px;height:136px;border-radius:16px;overflow:hidden;flex:none"><img src="${IMG(h)}" style="width:100%;height:100%;object-fit:cover" alt=""></button>`).join('')}</div>`
    : `<div style="height:136px;border-radius:16px;background:var(--a100);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;padding:0 24px;text-align:center"><span class="icbox" style="width:32px;height:32px;font-size:22px">${ic('sparkles')}</span><div class="hl">No creations yet</div><div class="fn n5">Photos you make in Spark will show up here.</div></div>`;
  sheet({
    title: 'Choose a photo', html: `<div style="display:flex;flex-direction:column;gap:24px;padding-bottom:17px">
    <div style="display:flex;gap:12px">${[['camera', 'Take a selfie', 'selfie'], ['library', 'Photo library', 'library']].map(([i, l, a]) => `<button class="press" data-act="${a}" style="flex:1;height:56px;border-radius:20px;background:var(--a100);display:flex;align-items:center;gap:12px;padding:0 16px"><span class="icbox" style="width:24px;height:24px;font-size:20px">${ic(i)}</span><span class="shs">${l}</span></button>`).join('')}</div>
    <div style="display:flex;flex-direction:column;gap:12px"><div class="hl" style="display:flex;align-items:center;gap:8px"><span class="icbox" style="width:24px;height:24px">${ic('sparkles')}</span>My creations</div>${body}</div></div>`
  });
}
ACT.pickRecent = el => { closeSheet(); setTimeout(() => go('crop', { img: el.dataset.v }), 250); };
ACT.selfie = () => { closeSheet(); setTimeout(() => go('crop', { img: SELFIE }), 250); };
ACT.library = () => {
  const imgs = [SELFIE, 'ffec858615', '30b2d83d18', '726146ff99', '3188779628', 'a0c009bf83', '2a841c84a2', 'cc8862499f', '3b449190bc', '9f43c6d6b2', '15cd66e195', '23e1943ea1', '5e89bb2630', 'd4bd65a314', '0e4cddc53b', '4378f76bb3', '5a2e1764e8', '8fa2b1b0eb'];
  closeSheet(); setTimeout(() => {
    const s = sheet({ title: '', cls: 'picker', right: 'close', html: `<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:3px;margin:0 -16px">${imgs.map(h => `<button data-act="pickLib" data-v="${h}" style="aspect-ratio:1;overflow:hidden"><img src="${IMG(h)}" style="width:100%;height:100%;object-fit:cover" alt="" loading="lazy"></button>`).join('')}</div>` });
    s.style.top = '62px'; s.style.left = '0'; s.style.right = '0'; s.style.bottom = '0'; s.style.borderRadius = '38px 38px 0 0'; s.style.maxHeight = 'none';
    s.querySelector('.stb .ttl').innerHTML = `<div class="seg"><button class="on">Photos</button><button>Collections</button></div>`;
  }, 250);
};
ACT.pickLib = el => { closeSheet(); setTimeout(() => go('crop', { img: el.dataset.v }), 250); };

/* 05b · Crop */
SCREENS.crop = ({ img }) => ({
  html: `<div class="tb">${backBtn()}<div class="ttl">Crop photo</div></div>
  <div class="abs" style="left:0;top:117px;width:402px;height:603px;overflow:hidden"><img src="${IMG(img)}" alt="" style="width:100%;height:100%;object-fit:cover">
    <div class="abs cropf" style="left:24px;top:64px;width:354px;height:451px;box-shadow:0 0 0 999px rgba(0,0,0,.5)">
      ${[['33.3%', 0, 1, '100%'], ['66.6%', 0, 1, '100%']].map(([l]) => `<i class="abs" style="left:${l};top:0;width:1px;height:100%;background:rgba(255,255,255,.36)"></i><i class="abs" style="top:${l};left:0;height:1px;width:100%;background:rgba(255,255,255,.36)"></i>`).join('')}
      ${[['-2px', '-2px', ''], ['-2px', 'auto', 'right:-2px'], ['auto', '-2px', 'bottom:-2px'], ['auto', 'auto', 'right:-2px;bottom:-2px']].map(([t, l, x]) => `<i class="abs" style="top:${t};left:${l};${x};width:23px;height:23px;border:4px solid #fff;border-radius:2px;${t === 'auto' ? 'border-top:0' : 'border-bottom:0'};${l === 'auto' ? 'border-left:0' : 'border-right:0'}"></i>`).join('')}</div></div>
  <div class="fn n5 ctr abs" style="left:0;right:0;top:728px">Drag the corners to crop · Pinch to zoom</div>
  <button class="btn glass prom abs" style="left:16px;width:370px;top:762px;height:50px" data-act="cropSave" data-v="${img}">Save</button>`
});
ACT.cropSave = el => {
  const img = el.dataset.v; back(); const st = curSetupAfter(); const i = st.slot || 0;
  st.photos[i] = img; st.check[i] = 'checking'; refreshSoon();
  setTimeout(() => { st.check[i] = (img === '30b2d83d18' || img === 'a0c009bf83' || img === '3188779628') ? 'bad' : 'ok'; refreshCreate(); }, 1600);
};
function curSetupAfter() { const c = stack[stack.length - 1]; return SETUP[c.el.dataset.key]; }
function refreshSoon() { setTimeout(refreshCreate, 430); }

/* 03a · Generation settings */
ACT.openSettings = () => { const st = curSetup(); go('settings', { key: Object.keys(SETUP).find(k => SETUP[k] === st) }); };
SCREENS.settings = ({ key }) => {
  const st = SETUP[key]; const t = T[st.id]; const d = (st.draft = st.draft || { sound: st.sound, dur: st.dur, res: st.res, ratio: st.ratio });
  const price = isVid(t) ? (d.dur === 'Long' ? 160 : 120) : 100;
  const seg = (k, opts) => `<div class="seg">${opts.map(o => `<button class="${d[k] === o ? 'on' : ''}" data-act="setOpt" data-k="${k}" data-v="${o}">${o}</button>`).join('')}</div>`;
  const row = (icon, label, ctl) => `<div class="row" style="min-height:56px;padding:0 16px"><span class="icbox n5" style="width:32px;height:32px;font-size:18px">${ic(icon)}</span><span style="flex:1">${label}</span>${ctl}</div>`;
  const rows = isVid(t) ? [row('sound', 'Sound', `<button class="tog ${d.sound ? 'on' : ''}" data-act="setOpt" data-k="sound" data-v="${!d.sound}"></button>`), row('clock', 'Duration', seg('dur', ['Short', 'Long'])), row('film', 'Resolution', seg('res', ['480p', '720p']))]
    : [row('ratio', 'Ratio', seg('ratio', ['4:5', '1:1', '9:16'])), row('film', 'Resolution', seg('res', ['480p', '720p']))];
  return {
    html: `${media(t, 'position:absolute;inset:0;width:100%;height:100%;object-fit:cover')}
    <div class="abs" style="left:0;top:0;width:100%;height:140px;background:linear-gradient(rgba(0,0,0,.55),transparent)"></div>
    <div class="abs" style="left:0;top:420px;width:100%;bottom:0;background:linear-gradient(rgba(10,10,12,0),#0a0a0c 40%)"></div>
    <div class="tb">${closeBtn('closeSettings')}<div class="ttl">${t.name}</div></div>
    <div class="abs" style="left:16px;right:16px;bottom:138px"><div class="fns n5" style="margin-bottom:12px">Generation settings</div><div class="grp">${rows.join('')}</div></div>
    <div class="abs" style="left:16px;right:16px;bottom:34px"><button class="btn glass prom" style="height:54px" data-act="saveSettings">Save</button>
    <div class="fn ctr" style="color:rgba(255,255,255,.5);margin-top:12px;display:flex;align-items:center;justify-content:center;gap:4px"><img src="img/coin.png" style="width:16px;height:16px" alt="">${price} · ${isVid(t) ? 'Price changes with the length only.' : 'Same price for every setting.'}</div></div>`,
    mount(el) { el.dataset.key = key; }
  };
};
ACT.setOpt = el => { const st = SETUP[stack[stack.length - 1].el.dataset.key]; let v = el.dataset.v; if (v === 'true') v = true; if (v === 'false') v = false; st.draft[el.dataset.k] = v; rerender(); };
ACT.saveSettings = () => { const st = SETUP[stack[stack.length - 1].el.dataset.key]; Object.assign(st, st.draft); delete st.draft; back(); setTimeout(refreshCreate, 430); };
ACT.closeSettings = () => {
  const st = SETUP[stack[stack.length - 1].el.dataset.key]; const d = st.draft; const changed = d && ['sound', 'dur', 'res', 'ratio'].some(k => d[k] !== st[k]);
  if (!changed) { delete st.draft; back(); return; }
  discardDialog(() => { delete st.draft; back(); });
};
function discardDialog(onDiscard) {
  const p = $phone(); const d = document.createElement('div'); d.className = 'alertdim';
  d.innerHTML = `<div class="glass dark" style="width:338px;border-radius:32px;padding:32px 24px 24px;display:flex;flex-direction:column;align-items:center;gap:24px;animation:pop .3s var(--ease) both">
   <img src="img/lg_risk.png" style="width:64px;height:64px" alt="">
   <div class="ctr"><div class="t3">Discard changes?</div><div class="sh n5" style="margin-top:8px">Your new settings won't be saved if you leave now.</div></div>
   <div style="width:100%;display:flex;flex-direction:column;gap:12px"><button class="btn glass prom" data-x="keep">Keep editing</button><button class="btn" style="background:var(--a100);color:var(--red)" data-x="discard">Discard</button></div></div>`;
  d.querySelector('[data-x=keep]').onclick = () => d.remove(); d.querySelector('[data-x=discard]').onclick = () => { d.remove(); onDiscard(); };
  p.appendChild(d);
}

/* Create → coins → Making */
ACT.doCreate = () => {
  const st = curSetup(); const price = priceOf(st);
  if (S.coins < price) { notEnoughCoins(price - S.coins); return; }
  S.coins -= price; go('making', { id: st.id, photo: st.photos[0], price });
};
function notEnoughCoins(need) {
  alertBox({ icon: `<img src="img/coin.png" style="width:56px;height:56px;margin:4px auto 12px" alt="">`, title: `You need ${need} more coins`, msg: 'Get more coins to make this.', h: true, acts: [{ t: 'Cancel' }, { t: 'Get coins', cls: 'def', fn: () => go('refill', { returnTo: true }) }] });
}

/* 08 · Making */
SCREENS.making = ({ id = 'neon', photo = SELFIE }) => {
  const t = T[id]; const vid = isVid(t);
  return {
    html: `<div class="abs" style="inset:0;background:radial-gradient(120% 70% at 50% 30%,#1b1530,#000 70%)"></div>
    <div class="tb">${closeBtn('leaveMaking')}</div>
    <div class="abs mk-card" style="left:13px;top:120px;width:376px;height:560px;border-radius:40px;overflow:hidden">
      <span class="mk-edge"></span>
      <div class="abs" style="inset:3px;border-radius:37px;overflow:hidden;background:#0d0b14">
        <img class="mk-img" src="${IMG(t.img)}" alt="" style="position:absolute;inset:-20px;width:calc(100% + 40px);height:calc(100% + 40px);object-fit:cover">
        <div class="abs" style="inset:0;background:radial-gradient(70% 50% at 50% 50%,rgba(150,120,255,.18),transparent),linear-gradient(transparent 55%,rgba(0,0,0,.6))"></div>
        ${Array.from({ length: 12 }, (_, i) => `<i class="mk-spark" style="left:${[18, 72, 40, 85, 28, 60, 12, 78, 50, 35, 90, 66][i]}%;top:${[20, 14, 38, 46, 64, 30, 50, 72, 56, 82, 26, 88][i]}%;animation-delay:${[0, 1.05, .3, 1.35, .6, 1.65, .9, .15, 1.2, .45, 1.5, .75][i]}s"></i>`).join('')}
        <span class="abs glass dark mk-chip" style="left:50%;top:268px;transform:translateX(-50%);height:32px;border-radius:100px;padding:0 14px;display:flex;align-items:center;gap:6px;white-space:nowrap" class="fns">${ic('sparkles')}<span class="fns mk-chipt">Dreaming up your scene…</span></span>
        <span class="abs" style="left:24px;bottom:24px;width:56px;height:56px;border-radius:50%;overflow:hidden;box-shadow:0 0 0 3px rgba(255,255,255,.85)"><img src="${IMG(photo)}" style="width:100%;height:100%;object-fit:cover" alt=""></span>
      </div></div>
    <div class="abs ctr" style="left:24px;right:24px;top:704px"><div class="hl">Your ${vid ? 'video' : 'photo'} is on its way...</div><div class="fn n5" style="margin-top:4px">You can leave this screen and find it in Gallery › Queue.</div></div>
    <div class="abs" style="left:16px;right:16px;top:770px"><button class="btn glass prom" style="height:50px" data-act="keepBrowsing">Keep browsing</button><button class="fn n5" style="display:block;margin:10px auto 0" data-act="goQueue">Go to Queue</button></div>`,
    mount(el) {
      const msgs = ['Dreaming up your scene…', 'Adding final touches…'];
      let k = 0; const tt = el.querySelector('.mk-chipt');
      el._iv = setInterval(() => { k = (k + 1) % 2; tt.textContent = msgs[k]; }, 2600);
      setTimeout(() => { if (stack[stack.length - 1].el === el) toast('Notify me when ready', { icon: 'bell', act: 'Turn on', fn: () => toast('We’ll let you know'), ms: 4000 }); }, 900);
      el._to = setTimeout(() => { clearInterval(el._iv); if (stack[stack.length - 1].el === el) replace('result', { id }, 'fade'); else toast(`Your ${vid ? 'video' : 'photo'} is ready`, { act: 'View', fn: () => go('result', { id }) }); }, 7000);
    }
  };
};
ACT.leaveMaking = () => { back(); };
ACT.keepBrowsing = () => { const vid = stack[stack.length - 1].args && T[stack[stack.length - 1].args.id] && isVid(T[stack[stack.length - 1].args.id]); reset(vid ? 'tab_video' : 'tab_photo'); };
ACT.goQueue = () => { S.galleryTab = 'queue'; reset('tab_gallery'); };

/* 09 · Result */
SCREENS.result = ({ id = 'neon', img, failed = false, kind }) => {
  const t = T[id] || T.neon; const vid = kind ? kind === 'video' : isVid(t); const price = vid ? 120 : 100; const src = img || t.img;
  const w = vid ? 266 : 320, h = vid ? 472 : 400;
  const top = 132, actsTop = failed ? 720 : 720, bottomOfMedia = failed ? actsTop - 24 : 628 - 24;
  const y = Math.round((top + (bottomOfMedia - top - h) / 2) / 4) * 4;
  const soc = [['tiktok', 'TikTok'], ['instagram', 'Instagram'], ['facebook', 'Facebook'], ['whatsapp', 'WhatsApp'], ['more', 'Other']];
  const coinBtn = (cls, label) => `<button class="btn glass ${cls}" style="height:54px" data-act="tryAgain" data-v="${id}">${ic('retry')} ${label} · ${COIN} ${price}</button>`;
  const mediaBox = failed
    ? `<div class="abs" style="left:${(402 - w) / 2}px;top:${y}px;width:${w}px;height:${h}px;border-radius:24px;overflow:hidden"><img src="${IMG(src)}" style="position:absolute;inset:-30px;width:calc(100% + 60px);height:calc(100% + 60px);object-fit:cover;filter:blur(32px)" alt=""><div class="abs" style="inset:0;background:rgba(0,0,0,.55)"></div>
       <div class="abs" style="left:24px;right:24px;top:50%;transform:translateY(-50%);display:flex;flex-direction:column;align-items:center;gap:16px;text-align:center"><img src="img/lg_error.png" style="width:64px;height:64px" alt="">
       <div><div class="t3">Couldn't make your ${vid ? 'video' : 'photo'}</div><div class="sh" style="color:rgba(255,255,255,.7);margin-top:8px">Something went wrong on our side. Please try again.</div></div>
       <span class="pill" style="background:var(--yellow20);color:var(--yellow);height:28px;padding:0 12px">${ic('shield')} ${price} <img src="img/coin.png" style="width:16px;height:16px" alt=""> refunded</span></div></div>`
    : `<button class="abs" style="left:${(402 - w) / 2}px;top:${y}px;width:${w}px;height:${h}px;border-radius:24px;overflow:hidden" data-act="${vid ? 'playToggle' : ''}">${t.v && vid ? `<video src="v/${t.v}.mp4" poster="${IMG(src)}" playsinline loop style="width:100%;height:100%;object-fit:cover"></video>` : `<img src="${IMG(src)}" style="width:100%;height:100%;object-fit:cover" alt="">`}
       ${vid ? `<span class="abs playbtn glass dark circ" style="width:64px;height:64px;left:50%;top:50%;transform:translate(-50%,-50%);font-size:22px">${ic('play')}</span>` : ''}</button>`;
  return {
    html: `<div class="tb">${backBtn('resultBack')}<div class="ttl">${t.name}</div></div>${mediaBox}
    ${failed ? '' : `<div class="abs" style="left:16px;right:16px;top:628px;display:flex;justify-content:center;gap:4px">${soc.map(([k, l]) => `<button class="press" data-act="shareTo" style="width:70px;display:flex;flex-direction:column;align-items:center;gap:4px"><img src="img/soc_${k}.png" style="width:48px;height:48px" alt=""><span class="c1" style="font-weight:700">${l}</span></button>`).join('')}</div>`}
    <div class="abs" style="left:16px;right:16px;top:${actsTop}px;display:flex;flex-direction:column;gap:12px">
    ${failed ? coinBtn('prom', 'Try again') + `<button class="btn glass" style="height:54px" data-act="anotherPhoto" data-v="${id}">Use another photo</button>`
        : `<button class="btn glass prom" style="height:54px" data-act="saveAlbum">${ic('save')} Save to Album</button>` + coinBtn('', 'Try again')}</div>`
  };
};
ACT.resultBack = () => { const prev = stack[stack.length - 2]; if (prev && (prev.name === 'create' || prev.name === 'making')) { const vid = isVid(T[stack[stack.length - 1].args.id] || T.neon); reset(vid ? 'tab_video' : 'tab_photo'); } else back(); };
ACT.saveAlbum = () => toast('Saved to Album', { act: 'Share', fn: () => ACT.more() });
ACT.tryAgain = el => { const id = el.dataset.v; const price = isVid(T[id]) ? 120 : 100; if (S.coins < price) { notEnoughCoins(price - S.coins); return; } S.coins -= price; replace('making', { id }, 'fade'); };
ACT.anotherPhoto = el => { const id = el.dataset.v; reset(isVid(T[id]) ? 'tab_video' : 'tab_photo'); go('create', { id }, 'none'); };
ACT.playToggle = el => { const v = el.querySelector('video'), b = el.querySelector('.playbtn'); if (!v) { b.style.opacity = b.style.opacity === '0' ? 1 : 0; return; } if (v.paused) { v.play(); b.style.opacity = 0; } else { v.pause(); b.style.opacity = 1; } };
