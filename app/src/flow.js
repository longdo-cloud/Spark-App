/* Generate video / Generate image flows — Figma 1365:77183 (video) & 1365:81391 (image) */
const FEED_VIDEO = ['neon', 'cosmic', 'billionaire', 'street', 'skyhero'];
const FEED_PHOTO = ['lavender', 'cake', 'thirty', 'candle', 'midnight'];
const CATS = [['🔥', 'Trending AI Video'], ['📸', 'Trending AI Photo'], ['✨', 'Trending AI Tools'], ['⚡', 'Action Video'], ['🎀', 'AI Hair Studio'], ['🎄', 'Holiday Glow'], ['💖', 'Valentine'], ['🎃', 'Halloween Night'], ['💿', 'Y2K Vibes']];
const isVid = t => t.kind === 'video';
const media = (t, style = '', cls = '') => t.v ? `<video class="${cls}" src="v/${t.v}.mp4" poster="${IMG(t.img)}" muted loop playsinline autoplay data-auto style="${style}"></video>` : `<img class="${cls}" src="${IMG(t.img)}" alt="" style="${style}">`;

/* ---------- 01 · Collection grid ---------- */
const FILTER_SVG = '<svg width="21" height="13" viewBox="0 0 21 13" fill="#fff"><path d="M5.05 12.49h10.4c.64 0 1.14-.55 1.14-1.18 0-.64-.5-1.17-1.14-1.17H5.05c-.64 0-1.15.54-1.15 1.17 0 .62.51 1.18 1.15 1.18ZM3.1 7.42h14.28c.64 0 1.14-.55 1.14-1.17 0-.65-.5-1.18-1.14-1.18H3.1c-.64 0-1.14.54-1.14 1.18 0 .61.51 1.17 1.14 1.17ZM1.15 2.35H19.3c.65 0 1.15-.55 1.15-1.17C20.46.53 19.97 0 19.32 0H1.15C.5 0 0 .54 0 1.18c0 .61.51 1.17 1.15 1.17Z"/></svg>';
const BM_BTN = 'position:absolute;right:8px;top:8px;width:32px;height:32px;border-radius:50%;background:rgba(0,0,0,.28);-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);display:flex;align-items:center;justify-content:center;font-size:15px';
function chipsRow(active, filterAct = 'cats') {
  return `<div class="abs" style="left:0;top:124px;width:100%;height:36px;z-index:31"><div class="hscroll" style="gap:8px;padding:0 60px 0 16px">${CATS.slice(0, 5).map(([e, l]) => `<button class="chip ${l === active ? 'on' : 'a1'}" style="height:36px" data-act="pickCat" data-v="${l}">${e} ${l}</button>`).join('')}</div>
  <div class="abs" style="right:0;top:0;width:105px;height:36px;background:linear-gradient(90deg,transparent,#000 50%);pointer-events:none"></div>
  <button class="abs" style="right:16px;top:0;width:36px;height:36px;display:flex;align-items:center;justify-content:center" data-act="${filterAct}" aria-label="Filter">${FILTER_SVG}</button></div>`;
}
function gridCard(t) {
  const bm = S.bookmarks.has(t.id);
  return `<div class="mcard press" style="width:179px;height:318px;border-radius:20px" data-act="openTpl" data-v="${t.id}">${t.v ? `<video src="v/${t.v}.mp4" poster="${IMG(t.img)}" muted loop playsinline autoplay data-auto></video>` : `<img src="${IMG(t.img)}" alt="" loading="lazy">`}
   <div class="scrim" style="padding:40px 12px 12px;display:flex;flex-direction:column;gap:2px"><span class="shs">${t.name}</span><span class="fns" style="display:flex;align-items:center;gap:4px"><img src="img/coin.png" style="width:16px;height:16px" alt="">${t.price}</span></div>
   <button style="${BM_BTN}" data-act="toggleBm" data-v="${t.id}" aria-label="Save">${ic(bm ? 'bookmarkf' : 'bookmark')}</button></div>`;
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
ACT.toggleBm = (el, e) => { e.stopPropagation(); const id = el.dataset.v; if (S.bookmarks.has(id)) { S.bookmarks.delete(id); rerender(); toast('Removed from Saved', { icon: BMO, pos: 'bottom' }); } else { S.bookmarks.add(id); addToDefault(id); rerender(); toast('Saved', { icon: BMI, pos: 'bottom', act: 'Collections', fn: () => saveToCollection(id) }); } };
function addToDefault(id) { const d = S.collections.find(c => c.def); if (!d.items.includes(id)) d.items.unshift(id); }

/* ---------- 02 · Template detail (full-screen feed) ---------- */
SCREENS.feed = ({ id = 'neon' }) => {
  const list = isVid(T[id]) ? FEED_VIDEO : FEED_PHOTO; const order = [id, ...list.filter(x => x !== id)];
  const ttlTxt = isVid(T[id]) ? 'Trending AI Video' : 'Trending AI Photo';
  const page = t => {
    const bm = S.bookmarks.has(t.id);
    return `<section class="fpage" data-id="${t.id}" style="position:relative;height:874px;scroll-snap-align:start;scroll-snap-stop:always;overflow:hidden">
    ${media(t, 'position:absolute;inset:0;width:100%;height:100%;object-fit:cover')}
    <div class="abs" style="left:0;top:0;width:100%;height:200px;background:linear-gradient(rgba(0,0,0,.5),transparent)"></div>
    <div class="abs" style="left:0;bottom:0;width:100%;height:325px;background:linear-gradient(transparent,rgba(0,0,0,.8))"></div>
    <div class="abs fmeta" style="left:16px;top:700px;width:300px">
      <div style="font-size:36px;line-height:43px;font-weight:800;font-style:italic;letter-spacing:-.5px">${t.name}</div>
      <div class="fns" style="display:flex;align-items:center;gap:4px;margin-top:4px;color:rgba(255,255,255,.85)"><img src="img/coin.png" style="width:20px;height:20px" alt="">${t.price} coins</div></div>
    <div class="abs fside" style="left:340px;top:692px;display:flex;flex-direction:column;gap:12px">
      <button class="press" data-act="feedSave" data-v="${t.id}" style="display:flex;flex-direction:column;align-items:center;gap:4px"><span class="circ glass dark">${ic(bm ? 'bookmarkf' : 'bookmark')}</span><span class="c1" style="font-weight:700">Save</span></button>
      <button class="press" data-act="more" data-v="${t.id}" style="display:flex;flex-direction:column;align-items:center;gap:4px"><span class="circ glass dark">${ic('ellipsis')}</span><span class="c1" style="font-weight:700">More</span></button></div>
    <button class="btn glass prom abs fuse" style="left:16px;top:788px;width:192px;height:50px;font-weight:500;gap:8px" data-act="useStyle" data-v="${t.id}"><span style="font-size:22px;display:flex">${ic('sparkles')}</span>Use This Style</button>
    </section>`;
  };
  return {
    html: `<div class="scroll feedsc" style="scroll-snap-type:y mandatory">${order.map(i => page(T[i])).join('')}</div>
    <div class="abs pager" style="right:6px;top:416px;display:flex;flex-direction:column;gap:4px;z-index:31">${order.map((_, i) => `<i style="width:4px;height:${i ? 4 : 16}px;border-radius:2px;background:${i ? 'var(--a400)' : '#fff'};display:block;transition:all .3s"></i>`).join('')}</div>
    <div class="feedtop">${chipsRow(ttlTxt)}</div>
    <div class="tb">${backBtn()}<button class="feedttl" data-act="cats" style="opacity:0;pointer-events:none;transition:opacity .25s;display:flex;align-items:center;gap:8px;font-size:17px;font-weight:600;letter-spacing:-.43px">${ttlTxt}<span style="display:flex;width:24px;justify-content:center">${FILTER_SVG}</span></button><span class="sp"></span>${joinNow()}</div>
    <div class="compact abs" style="left:16px;right:16px;top:792px;height:50px;display:flex;justify-content:space-between;align-items:center;z-index:32;opacity:0;pointer-events:none;transition:opacity .25s">
      <button class="btn glass dark usethis" style="height:50px;width:144px;font-size:17px;font-weight:500;gap:8px" data-act="useStyleCur"><span style="font-size:18px;display:flex">${ic('sparkles')}</span>Use this</button>
      <button class="circ s glass dark feedbm" data-act="feedSaveCur">${ic('bookmark')}</button></div>`,
    mount(el) {
      const sc = el.querySelector('.feedsc'), top = el.querySelector('.feedtop'), ttl = el.querySelector('.feedttl'), cp = el.querySelector('.compact'); const dots = el.querySelectorAll('.pager i');
      attachPager(sc);
      let collapsed = false;
      sc.addEventListener('scroll', () => {
        const i = Math.round(sc.scrollTop / sc.clientHeight); el.dataset.cur = order[i];
        dots.forEach((d, k) => { d.style.height = k === i ? '16px' : '4px'; d.style.background = k === i ? '#fff' : 'var(--a400)'; });
        const c = sc.scrollTop > 60; if (c !== collapsed) { collapsed = c; top.style.opacity = c ? 0 : 1; top.style.pointerEvents = c ? 'none' : ''; ttl.style.opacity = c ? 1 : 0; ttl.style.pointerEvents = c ? 'auto' : 'none'; cp.style.opacity = c ? 1 : 0; cp.style.pointerEvents = c ? 'auto' : 'none';
          el.querySelectorAll('.fpage .fuse, .fpage .fside, .fpage .fmeta').forEach(n => { n.style.transition = 'opacity .25s'; n.style.opacity = c ? 0 : 1; n.style.pointerEvents = c ? 'none' : ''; }); }
        cp.querySelector('.feedbm').innerHTML = ic(S.bookmarks.has(order[i]) ? 'bookmarkf' : 'bookmark');
        el.querySelectorAll('.fpage video').forEach((v, k) => k === i ? v.play().catch(() => { }) : v.pause());
      }, { passive: true });
      top.style.transition = 'opacity .25s'; el.dataset.cur = order[0];
    }
  };
};
ACT.openTpl = el => go('feed', { id: el.dataset.v });
ACT.feedSave = el => { const id = el.dataset.v; if (S.bookmarks.has(id)) { S.bookmarks.delete(id); toast('Removed from Saved', { icon: BMO, pos: 'bottom' }); } else { S.bookmarks.add(id); addToDefault(id); toast('Saved', { icon: BMI, pos: 'bottom', act: 'Collections', fn: () => saveToCollection(id) }); }
  const c = el.querySelector('.circ'); c.innerHTML = ic(S.bookmarks.has(id) ? 'bookmarkf' : 'bookmark'); };
ACT.feedSaveCur = el => { const cur = stack[stack.length - 1].el.dataset.cur; const b = stack[stack.length - 1].el.querySelector(`.fpage[data-id="${cur}"] [data-act="feedSave"]`); if (b) ACT.feedSave(b); el.innerHTML = ic(S.bookmarks.has(cur) ? 'bookmarkf' : 'bookmark'); };
ACT.useStyle = el => startCreate(el.dataset.v);
ACT.useStyleCur = () => startCreate(stack[stack.length - 1].el.dataset.cur);
/* Figma: first time → 04 Guidelines sheet over the feed, Continue → 03 Create */
function startCreate(id) { if (!S.guideAgreed) { guidelinesSheet(() => go('create', { id, people: T[id].people || 1 })); return; } go('create', { id, people: T[id].people || 1 }); }

/* More sheet (option B: social + icon buttons) */
ACT.more = () => {
  const soc = [['tiktok', 'TikTok'], ['instagram', 'Instagram'], ['facebook', 'Facebook'], ['messenger', 'Messenger'], ['whatsapp', 'WhatsApp']];
  const item = (inner, l, act) => `<button class="press" data-act="${act}" style="width:70px;display:flex;flex-direction:column;align-items:center;gap:4px">${inner}<span class="c1" style="font-weight:700">${l}</span></button>`;
  const solid = i => `<span class="circ" style="background:#2c2c2e">${ic(i)}</span>`;
  const socImg = k => k === 'messenger' ? `<span class="circ" style="background:linear-gradient(#00b2ff,#006aff)"><svg width="24" height="24" viewBox="0 0 24 24" fill="#fff"><path d="M12 .96C5.9.96.96 5.57.96 11.28c0 3.02 1.39 5.86 3.84 7.82v4.23l4.13-2.16c1 .29 2.01.38 3.07.38 6.1 0 11.04-4.6 11.04-10.32C23.04 5.57 18.1.96 12 .96Zm1.1 13.73-2.78-2.98-5.18 2.93 5.76-6.1 2.83 2.84 5.04-2.84-5.67 6.15Z"/></svg></span>` : `<img src="img/soc_${k}.png" style="width:48px;height:48px" alt="">`;
  sheet({
    title: 'More', html: `<div style="display:flex;gap:2px;padding-bottom:16px">${soc.map(([k, l]) => item(socImg(k), l, 'shareTo')).join('')}</div>
    <div style="height:1px;background:rgba(255,255,255,.08);margin-bottom:16px"></div>
    <div style="display:flex;gap:2px">${item(solid('link'), 'Copy link', 'copyLink')}${item(solid('flag'), 'Report', 'report')}${item(solid('chat'), 'Contact us', 'contact')}${item(solid('ellipsis'), 'Other', 'shareTo')}</div>`
  });
};
ACT.shareTo = () => { closeSheet(); toast('Opening share…', { icon: '' }); };
ACT.copyLink = () => { closeSheet(); toast('Link copied'); };
ACT.report = () => { closeSheet(); setTimeout(() => sheet({ title: 'Report this template', html: `<div class="grp noic">${['Inappropriate content', 'Misleading preview', 'Copyright issue', 'Something else'].map(r => `<button class="row" data-act="reportDone">${r}<span class="r">${ic('chev')}</span></button>`).join('')}</div>` }), 250); };
ACT.reportDone = () => { closeSheet(); toast('Thanks — we’ll review it'); };
ACT.contact = () => { closeSheet(); toast('Opening email…', { icon: '' }); };

/* ---------- 03 · Create ---------- */
function priceOf(st) { const t = T[st.id]; return isVid(t) ? (st.dur === 'Long' ? 160 : 120) : 100; }
function newCreate(id, people) { const t = T[id]; return { id, people, photos: people === 2 ? [null, null] : [null], check: people === 2 ? ['', ''] : [''], sound: true, dur: 'Short', res: '480p', quality: 'Standard', ratio: isVid(t) ? '9:16' : '4:5' }; }
const SETUP = {}; // per create session
function settingsBar(st) {
  const t = T[st.id];
  const items = t.tool ? [['ratio', st.ratio], ['sparkles', st.quality]] : isVid(t) ? [['sound', st.sound ? 'On' : 'Off'], ['clock', st.dur], ['film', st.res]] : [['ratio', st.ratio], ['film', st.res]];
  return `<button class="press" data-act="openSettings" style="height:52px;border-radius:16px;background:var(--a100);display:flex;align-items:center;padding:0 16px 0 14px;width:100%">${items.map(([i, l], k) => `${k ? '<span style="width:1px;height:20px;background:var(--a200);margin:0 14px"></span>' : ''}<span class="sh" style="display:flex;align-items:center;gap:6px;font-weight:600"><span class="n5" style="font-size:14px">${ic(i)}</span>${l}</span>`).join('')}<span class="n5" style="margin-left:auto;font-size:13px">${ic('chev')}</span></button>`;
}
function toolHero(t) {
  return `<div class="abs" style="left:0;top:0;width:402px;height:660px;overflow:hidden"><img src="${IMG(t.img)}" alt="" style="position:absolute;left:-1px;top:-1px;width:404px;height:663px;object-fit:cover">
  <div class="abs" style="left:0;top:0;width:100%;height:140px;background:linear-gradient(rgba(0,0,0,.6),transparent)"></div>
  <div class="abs" style="left:0;top:487px;width:100%;height:173px;background:linear-gradient(rgba(10,10,13,0),#0a0a0d)"></div></div>
  <div class="abs" style="left:0;top:746px;width:100%;height:128px;background:linear-gradient(rgba(10,10,12,0),#0a0a0c 40%)"></div>`;
}
const isTool = st => !!(st && T[st.id] && T[st.id].tool);
function thumb(img, w = 96, h = 120) { return `<span style="width:${w}px;height:${h}px;border-radius:16px;overflow:hidden;flex:none;display:block"><img src="${IMG(img)}" alt="" style="width:100%;height:100%;object-fit:cover"></span>`; }
function emptyThumb(w = 96, h = 120, act = 'addPhoto', i = 0) { return `<button class="press" data-act="${act}" data-i="${i}" style="width:${w}px;height:${h}px;border-radius:16px;background:rgba(255,255,255,.04);border:1.5px dashed rgba(255,255,255,.3);position:relative;flex:none;display:flex;align-items:center;justify-content:center"><span class="ripple"></span><span class="addlime">${ic('plus')}</span></button>`; }
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
  const sub = 'font-size:13px;line-height:18px;color:rgba(255,255,255,.6);margin-top:4px';
  if (!ph) { left = emptyThumb(); text = `<div class="hl">Add your photo</div><div style="${sub};white-space:nowrap">${isTool(st) ? 'Full body, head to toe works best' : 'A clear, front-facing selfie works best'}</div>`; }
  else if (c === 'checking') { left = `<span style="position:relative">${thumb(ph)}<span class="abs" style="inset:0;border-radius:16px;background:rgba(255,255,255,.35);display:flex;align-items:center;justify-content:center"><span class="spin"></span></span></span>`; text = `<div class="hl">Checking photo...</div><div style="${sub}">Making sure your face is clear</div>`; }
  else if (c === 'bad') { left = `<span style="border-radius:16px;box-shadow:0 0 0 2px var(--red);display:block">${thumb(ph)}</span>`; text = `<div class="hl">Your photo</div><span class="pill bad" style="margin-top:8px">${ic('xcirc')} No clear face</span><div style="${sub};margin-top:8px">Try one person<br>facing the camera</div>`; right = `<button class="btn glass prom" style="height:36px;width:auto;padding:0 14px;font-size:15px" data-act="addPhoto" data-i="0">Change</button>`; }
  else { left = thumb(ph); text = `<div class="hl">Your photo</div><span class="pill ok" style="margin-top:8px">${ic('checkc')} Looks good</span>`; right = `<button class="btn" style="height:36px;width:auto;padding:0 14px;font-size:15px;${isTool(st) ? 'background:#2c2c2e;color:#fff' : 'background:#fff;color:#000'}" data-act="addPhoto" data-i="0">Change</button>`; }
  return `<div style="height:152px;border-radius:24px;background:rgba(255,255,255,.08);padding:0 16px;display:flex;align-items:center;gap:16px;-webkit-backdrop-filter:blur(24px);backdrop-filter:blur(24px)">${left}<div style="flex:1;min-width:0">${text}</div>${right}</div>`;
}
SCREENS.create = ({ id = 'neon', people = 1, fresh = true }) => {
  const key = id + people; if (fresh || !SETUP[key]) SETUP[key] = SETUP[key] && !fresh ? SETUP[key] : newCreate(id, people);
  const st = SETUP[key]; const t = T[id]; const price = priceOf(st);
  const ready = st.check.every(c => c === 'ok'); const checking = st.check.some(c => c === 'checking'); const any = st.photos.some(Boolean);
  const label = ready || checking || st.check.some(c => c === 'bad') ? 'Create with' : 'Create ·';
  return {
    html: `${t.tool ? toolHero(t) : `${media(t, 'position:absolute;inset:0;width:100%;height:100%;object-fit:cover')}
    <div class="abs" style="left:0;top:0;width:100%;height:140px;background:linear-gradient(rgba(0,0,0,.55),transparent)"></div>
    <div class="abs" style="left:0;top:${people === 2 ? 380 : 469}px;width:100%;bottom:0;background:linear-gradient(rgba(10,10,12,0),#0a0a0c 37%)"></div>`}
    <div class="tb">${closeBtn('closeCreate')}<div class="ttl">${t.name}</div></div>
    <div class="abs" style="left:16px;right:16px;top:${people === 2 ? 437 : 530}px;display:flex;flex-direction:column;gap:12px">${photoCard(st)}${settingsBar(st)}</div>
    <div class="abs" style="left:16px;right:16px;top:762px">
      <button class="btn glass ${ready ? 'prom' : 'dis'}" style="height:50px;font-weight:500" data-act="doCreate">${label} ${COIN} ${price}</button>
      ${checking ? `<div class="ctr" style="font-size:13px;color:rgba(255,255,255,.5);margin-top:12px">Checking your photo...</div>` : ''}</div>`,
    mount(el) { el.dataset.key = key; }
  };
};
const curSetupSafe = () => { try { return curSetup(); } catch (e) { return null; } };
const curSetup = () => SETUP[stack[stack.length - 1].el.dataset.key] || SETUP[Object.keys(SETUP).pop()];
const refreshCreate = () => { const c = stack[stack.length - 1]; if (c.name === 'create') { c.args.fresh = false; rerender(); } };
ACT.closeCreate = () => back();
ACT.addPhoto = el => { const st = curSetup(); st.slot = +(el.dataset.i || 0); if (!S.guideAgreed) guidelinesSheet(chooseSheet); else chooseSheet(); };

/* 04 · Guidelines + Permission */
let guideNext = null;
function guidelinesSheet(next) {
  guideNext = next || null;
  if (isTool(curSetupSafe())) {
    const ex = ['selfie1', 'selfie2', 'selfie3', 'selfie4'];
    return sheet({ title: 'Before you add a photo', html: `<div style="display:flex;flex-direction:column;gap:16px;padding-bottom:4px">
    <div><div class="hl" style="display:flex;align-items:center;gap:4px"><img src="img/lg_check.png" style="width:24px;height:24px" alt="">Works great</div>
      <div style="display:flex;gap:8px;margin:8px 0">${ex.map(h => `<img src="${IMG(h)}" style="width:84px;height:104px;border-radius:16px;object-fit:cover" alt="">`).join('')}</div>
      <div class="fn n5">Your own selfie · face the camera · one person</div></div>
    <div><button class="btn glass prom" style="height:50px" data-act="agreeUnderstand">I understand</button><div class="fn n5 ctr" style="padding:7px">Read full guidelines</div></div></div>` });
  }
  const ex = [SELFIE, '726146ff99', '2a841c84a2', '9f43c6d6b2'];
  const s = sheet({
    title: 'Before you add a photo', html: `<div style="display:flex;flex-direction:column;gap:24px;padding-bottom:4px">
    <div><div class="hl" style="display:flex;align-items:center;gap:8px"><span style="width:20px;height:20px;border-radius:5px;background:#0a84ff;display:flex;align-items:center;justify-content:center;font-size:12px">${ic('face')}</span>Works great</div>
      <div style="display:flex;gap:8px;margin:12px 0 8px">${ex.map(h => `<img src="${IMG(h)}" style="width:84px;height:104px;border-radius:16px;object-fit:cover" alt="">`).join('')}</div>
      <div class="fn n5">Your own selfie · face the camera · one person</div></div>
    <div><div class="hl" style="display:flex;align-items:center;gap:8px"><span style="font-size:17px">⚠️</span>Permission required</div>
      <ul style="margin:16px 0 0 22px;padding:0;display:flex;flex-direction:column;gap:8px;color:rgba(255,255,255,.85);font-size:15px;line-height:20px">
      <li>Your photo is sent to third-party AI providers to make your result.</li><li>They use it only for that — nothing else.</li><li>Your original photo is deleted within 24 hours.</li><li>I'm in this photo, or everyone in it allowed me to use it.</li></ul>
      <button class="press" data-act="agreeTick" style="display:flex;align-items:center;gap:12px;margin-top:16px;text-align:left"><span class="cbx">${ic('check')}</span><span class="shs">I've read and agree with the above</span></button></div>
    <div><button class="btn glass dis agreebtn" style="height:50px" data-act="agreeGo">Continue</button><div class="fn n5 ctr" style="padding:8px">Read full guidelines</div></div></div>`
  });
  return s;
}
ACT.agreeTick = el => { const c = el.querySelector('.cbx'); c.classList.toggle('on'); const b = el.closest('.sheet').querySelector('.agreebtn'); const on = c.classList.contains('on'); b.classList.toggle('dis', !on); b.classList.toggle('prom', on); };
ACT.agreeUnderstand = () => { S.guideAgreed = true; closeSheet(); const n = guideNext; guideNext = null; if (n) setTimeout(n, 320); };
ACT.agreeGo = el => { if (el.classList.contains('dis')) return; S.guideAgreed = true; closeSheet(); const n = guideNext; guideNext = null; if (n) setTimeout(n, 320); };

/* 05 · Choose a photo */
let hasCreations = true;
let hasRecent = true;
function chooseSheet() {
  const tool = isTool(curSetupSafe());
  const recent = tool ? ['selfie1', 'selfie2', 'selfie3', 'selfie4', 'selfie5'] : [SELFIE, '726146ff99', '2a841c84a2', '9f43c6d6b2'];
  if (tool) {
    const body = hasRecent ? `<div class="hscroll" style="gap:8px;margin:0 -16px;padding:0 16px">${recent.map(h => `<button class="press rph" data-act="pickRecent" data-v="${h}" style="position:relative;width:110px;height:136px;border-radius:16px;overflow:hidden;flex:none"><img src="${IMG(h)}" style="width:100%;height:100%;object-fit:cover" alt=""></button>`).join('')}</div>`
      : `<div style="height:136px;border-radius:16px;background:rgba(255,255,255,.04);box-shadow:inset 0 0 0 1px rgba(255,255,255,.12);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:0 1px;text-align:center"><span style="font-size:24px;color:rgba(255,255,255,.48);display:flex;height:32px;align-items:center">${ic('library')}</span><div class="hl" style="margin-top:8px">No recent photos</div><div class="fn n5" style="margin-top:8px">Photos you use will show up here next time.</div></div>`;
    sheet({ title: 'Choose a photo', html: `<div style="display:flex;flex-direction:column;gap:12px;padding-bottom:20px">
    <div style="display:flex;gap:12px">${[['camera', 'Take a selfie', 'selfie'], ['library', 'Photo library', 'library']].map(([i, l, a]) => `<button class="press" data-act="${a}" style="flex:1;height:58px;border-radius:20px;background:rgba(255,255,255,.09);display:flex;align-items:center;gap:12px;padding:0 16px"><span style="width:24px;font-size:20px;display:flex;justify-content:center">${ic(i)}</span><span class="shs">${l}</span></button>`).join('')}</div>
    <div class="hl" style="margin-top:0">Recent</div>${body}</div>` });
    return;
  }
  const body = hasCreations ? `<div class="hscroll" style="gap:8px;margin:0 -16px;padding:0 16px">${recent.map(h => `<button class="press rph" data-act="pickRecent" data-v="${h}" style="position:relative;width:110px;height:136px;border-radius:16px;overflow:hidden;flex:none"><img src="${IMG(h)}" style="width:100%;height:100%;object-fit:cover" alt=""></button>`).join('')}</div>`
    : `<div style="height:136px;border-radius:16px;background:var(--a100);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;padding:0 24px;text-align:center"><span class="icbox" style="width:32px;height:32px;font-size:22px">${ic('sparkles')}</span><div class="hl">No creations yet</div><div class="fn n5">Photos you make in Spark will show up here.</div></div>`;
  sheet({
    title: 'Choose a photo', html: `<div style="display:flex;flex-direction:column;gap:24px;padding-bottom:17px">
    <div style="display:flex;gap:12px">${[['camera', 'Take a selfie', 'selfie'], ['library', 'Photo library', 'library']].map(([i, l, a]) => `<button class="press" data-act="${a}" style="flex:1;height:56px;border-radius:20px;background:rgba(255,255,255,.09);box-shadow:inset 0 0 0 .5px rgba(255,255,255,.15);display:flex;align-items:center;gap:12px;padding:0 16px"><span class="icbox" style="width:24px;height:24px;font-size:20px">${ic(i)}</span><span class="shs">${l}</span></button>`).join('')}</div>
    <div style="display:flex;flex-direction:column;gap:12px"><div class="hl" style="display:flex;align-items:center;gap:8px"><span class="icbox" style="width:24px;height:24px">${ic('sparkles')}</span>My creations</div>${body}</div></div>`
  });
}
ACT.pickRecent = el => {
  el.style.boxShadow = 'inset 0 0 0 2px var(--green)'; el.insertAdjacentHTML('beforeend', `<span style="position:absolute;right:8px;top:8px;width:20px;height:20px;border-radius:50%;background:var(--green);display:flex;align-items:center;justify-content:center;font-size:10px;box-shadow:inset 0 0 0 2px #fff;z-index:1;color:#fff">${ic('check')}</span><span style="position:absolute;inset:0;border-radius:16px;box-shadow:inset 0 0 0 2px var(--green)"></span>`);
  const img = el.dataset.v; setTimeout(() => { closeSheet(); setPhoto(img); }, 350);
};
function setPhoto(img) {
  const st = curSetup(); const i = st.slot || 0; st.photos[i] = img; st.check[i] = 'checking'; refreshCreate();
  setTimeout(() => { st.check[i] = (img === '30b2d83d18' || img === 'a0c009bf83' || img === '3188779628') ? 'bad' : 'ok'; refreshCreate(); }, 1600);
}
ACT.selfie = () => { const tool = isTool(curSetupSafe()); closeSheet(); setTimeout(() => go('crop', { img: tool ? 'selfie1' : SELFIE }), 250); };
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
  const st = SETUP[key]; const t = T[st.id]; const d = (st.draft = st.draft || { sound: st.sound, dur: st.dur, res: st.res, ratio: st.ratio, quality: st.quality });
  const price = isVid(t) ? (d.dur === 'Long' ? 160 : 120) : 100;
  const seg = (k, opts) => `<div class="seg">${opts.map(o => `<button class="${d[k] === o ? 'on' : ''}" data-act="setOpt" data-k="${k}" data-v="${o}">${o}</button>`).join('')}</div>`;
  const row = (icon, label, ctl) => `<div class="row" style="min-height:56px;padding:0 16px"><span class="icbox n5" style="width:32px;height:32px;font-size:18px">${ic(icon)}</span><span style="flex:1">${label}</span>${ctl}</div>`;
  const rows = t.tool ? [row('ratio', 'Ratio', seg('ratio', ['4:5', '1:1', '9:16'])), row('sparkles', 'Quality', seg('quality', ['Standard', 'HD']))] : isVid(t) ? [row('sound', 'Sound', `<button class="tog ${d.sound ? 'on' : ''}" data-act="setOpt" data-k="sound" data-v="${!d.sound}"></button>`), row('clock', 'Duration', seg('dur', ['Short', 'Long'])), row('film', 'Resolution', seg('res', ['480p', '720p']))]
    : [row('ratio', 'Ratio', seg('ratio', ['4:5', '1:1', '9:16'])), row('film', 'Resolution', seg('res', ['480p', '720p']))];
  return {
    html: `${t.tool ? toolHero(t) : `${media(t, 'position:absolute;inset:0;width:100%;height:100%;object-fit:cover')}
    <div class="abs" style="left:0;top:0;width:100%;height:140px;background:linear-gradient(rgba(0,0,0,.55),transparent)"></div>
    <div class="abs" style="left:0;top:420px;width:100%;bottom:0;background:linear-gradient(rgba(10,10,12,0),#0a0a0c 40%)"></div>`}
    <div class="tb">${closeBtn('closeSettings')}<div class="ttl">${t.name}</div></div>
    <div class="abs" style="left:16px;right:16px;top:${t.tool ? 602 : 535}px"><div style="font-size:15px;font-weight:600;margin-bottom:12px">Generation settings</div><div class="grp">${rows.join('')}</div></div>
    <div class="abs" style="left:16px;right:16px;top:${t.tool ? 763 : 760}px"><button class="btn glass prom" style="height:50px;font-weight:600" data-act="saveSettings">Save</button>
    <div class="fn ctr" style="${t.tool ? 'display:none!important;' : ''}color:rgba(255,255,255,.5);margin-top:12px;display:flex;align-items:center;justify-content:center;gap:4px"><img src="img/coin.png" style="width:16px;height:16px" alt="">${price} · ${isVid(t) ? 'Price changes with the length only.' : 'Same price for every setting.'}</div></div>`,
    mount(el) { el.dataset.key = key; }
  };
};
ACT.setOpt = el => { const st = SETUP[stack[stack.length - 1].el.dataset.key]; let v = el.dataset.v; if (v === 'true') v = true; if (v === 'false') v = false; st.draft[el.dataset.k] = v; rerender(); };
ACT.saveSettings = () => { const st = SETUP[stack[stack.length - 1].el.dataset.key]; Object.assign(st, st.draft); delete st.draft; back(); setTimeout(refreshCreate, 430); };
ACT.closeSettings = () => {
  const st = SETUP[stack[stack.length - 1].el.dataset.key]; const d = st.draft; const changed = d && ['sound', 'dur', 'res', 'ratio', 'quality'].some(k => d[k] !== st[k]);
  if (!changed) { delete st.draft; back(); return; }
  discardDialog(() => { delete st.draft; back(); });
};
function discardDialog(onDiscard) {
  const p = $phone(); const d = document.createElement('div'); d.className = 'alertdim';
  d.innerHTML = `<div class="glass dark" style="width:338px;border-radius:32px;padding:44px 22px 22px;display:flex;flex-direction:column;align-items:center;gap:20px;animation:pop .3s var(--ease) both">
   <img src="img/lg_risk.png" style="width:72px;height:72px" alt="">
   <div class="ctr"><div class="t3">Discard changes?</div><div class="sh n5" style="margin-top:12px">Your new settings won't be saved if you leave now.</div></div>
   <div style="width:100%;display:flex;flex-direction:column;gap:12px;margin-top:4px"><button class="btn glass prom" data-x="keep">Keep editing</button><button class="btn" style="background:var(--a100);color:var(--red)" data-x="discard">Discard</button></div></div>`;
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
  const t = T[id]; const vid = isVid(t); const mimg = t.res || t.img; if (t.tool && photo === SELFIE) photo = 'selfie1';
  const sp = [[48, 74, 1], [82, 118, 0], [133, 140, 0], [64, 214, 1], [252, 212, 0], [198, 230, 0], [38, 358, 0], [178, 324, 1], [251, 351, 1], [129, 408, 0], [223, 454, 0], [96, 30, 1]];
  return {
    html: `<div class="abs" style="inset:0;background:#000"><img src="${IMG(mimg)}" alt="" style="position:absolute;inset:-60px;width:calc(100% + 120px);height:calc(100% + 120px);object-fit:cover;filter:blur(60px) brightness(.35)"></div>
    <div class="tb">${closeBtn('leaveMaking')}</div>
    <div class="abs mk-card" style="left:45px;top:${t.tool ? 136 : 113}px;width:312px;height:${t.tool ? 527 : 554}px;border-radius:40px;overflow:hidden">
      <span class="mk-edge"></span>
      <div class="abs" style="inset:2px;border-radius:38px;overflow:hidden;background:#0d0b14">
        <img class="mk-img" src="${IMG(mimg)}" alt="" style="position:absolute;inset:-40px;width:calc(100% + 80px);height:calc(100% + 80px);object-fit:cover;filter:blur(18px) saturate(1.1)">
        <div class="abs" style="inset:0;background:rgba(0,0,0,.15)"></div>
        ${sp.map(([x, y, big], i) => `<span class="mk-star" style="left:${x}px;top:${y}px;font-size:${big ? 30 : 16}px;animation-delay:${(i * .27) % 1.8}s">✦</span>`).join('')}
        <div class="abs glass dark" style="${t.tool ? 'display:none!important;' : ''}left:12px;right:12px;top:18px;height:44px;border-radius:100px;display:flex;align-items:center;gap:8px;padding:0 6px 0 16px">
          <span class="bellring" style="display:flex;font-size:15px">${ic('bell')}</span><span style="flex:1;font-size:13px;font-weight:600">Notify me when ready</span>
          <button class="notifybtn" style="height:32px;padding:0 12px;border-radius:100px;background:rgba(255,255,255,.2);font-size:13px;font-weight:600" data-act="notifyOn">Turn on</button></div>
        <span class="abs glass dark" style="left:50%;top:260px;transform:translateX(-50%);height:36px;border-radius:100px;padding:0 16px 0 12px;display:flex;align-items:center;gap:8px;white-space:nowrap"><span style="font-size:16px;display:flex">${ic('sparkles')}</span><span class="mk-chipt" style="font-size:15px;font-weight:600">Dreaming up your scene...</span></span>
        <span class="abs" style="left:18px;bottom:18px;width:70px;height:70px;border-radius:50%;overflow:hidden;background:#fff;box-shadow:0 0 0 3px #fff"><img src="${IMG(photo)}" style="width:100%;height:100%;object-fit:cover" alt=""></span>
      </div></div>
    <div class="abs ctr" style="left:16px;right:16px;top:686px"><div style="font-size:22px;line-height:28px;font-weight:700">Your ${vid ? 'video' : 'photo'} is on its way...</div><div style="font-size:13px;color:rgba(255,255,255,.6);margin-top:6px">You can leave this screen and find it in Gallery › Queue.</div></div>
    <div class="abs" style="left:16px;right:16px;top:762px"><button class="btn glass prom" style="height:50px;font-weight:500" data-act="keepBrowsing">Keep browsing</button><button style="display:block;margin:14px auto 0;font-size:15px;font-weight:600;color:rgba(255,255,255,.6)" data-act="goQueue">Go to Queue</button></div>`,
    mount(el) {
      const msgs = ['Dreaming up your scene...', 'Adding final touches...'];
      let k = 0; const tt = el.querySelector('.mk-chipt');
      el._iv = setInterval(() => { k = (k + 1) % 2; tt.textContent = msgs[k]; }, 2600);
      el._to = setTimeout(() => { clearInterval(el._iv); if (stack[stack.length - 1].el === el) replace('result', { id }, 'fade'); else toast(`Your ${vid ? 'video' : 'photo'} is ready`, { act: 'View', fn: () => go('result', { id }) }); }, 7000);
    }
  };
};
ACT.notifyOn = el => { el.textContent = 'On'; el.style.background = 'rgba(48,209,88,.25)'; el.style.color = 'var(--green)'; };
ACT.leaveMaking = () => { back(); };
ACT.keepBrowsing = () => { const vid = stack[stack.length - 1].args && T[stack[stack.length - 1].args.id] && isVid(T[stack[stack.length - 1].args.id]); reset(T[stack[stack.length - 1].args.id] && T[stack[stack.length - 1].args.id].tool ? 'tab_tools' : vid ? 'tab_video' : 'tab_photo'); };
ACT.goQueue = () => { S.galleryTab = 'queue'; reset('tab_gallery'); };

/* 09 · Result */
const RETRY_PRICE = { video: 160, photo: 100 }; // Figma 09-A / 09-E
SCREENS.result = ({ id = 'neon', img, failed = false, kind }) => {
  const t = T[id] || T.neon; const vid = kind ? kind === 'video' : isVid(t); const price = RETRY_PRICE[vid ? 'video' : 'photo']; const src = img || t.res || t.img;
  if (t.tool) return toolResult(t, src, failed, price);
  const w = vid ? (failed ? 304 : 266) : 320, h = vid ? (failed ? 540 : 472) : 400;
  const actsTop = 720; const y = vid ? (failed ? 144 : 132) : (failed ? 216 : 168);
  const soc = [['tiktok', 'TikTok'], ['instagram', 'Instagram'], ['facebook', 'Facebook'], ['whatsapp', 'WhatsApp'], ['more', 'Other']];
  const coinBtn = (cls, label) => `<button class="btn glass ${cls}" data-act="tryAgain" data-v="${id}" style="height:54px;font-weight:500">${label} · ${COIN} ${price}</button>`;
  const mediaBox = failed
    ? `<div class="abs" style="left:${(402 - w) / 2}px;top:${y}px;width:${w}px;height:${h}px;border-radius:24px;overflow:hidden"><img src="${IMG(src)}" style="position:absolute;inset:-30px;width:calc(100% + 60px);height:calc(100% + 60px);object-fit:cover;filter:blur(32px)" alt=""><div class="abs" style="inset:0;background:rgba(0,0,0,.55)"></div>
       <div class="abs" style="left:24px;right:24px;top:50%;transform:translateY(-50%);display:flex;flex-direction:column;align-items:center;gap:16px;text-align:center"><img src="img/lg_error.png" style="width:64px;height:64px" alt="">
       <div><div class="t3">Couldn't make your ${vid ? 'video' : 'photo'}</div><div class="sh" style="color:rgba(255,255,255,.7);margin-top:8px">Something went wrong on our side. Please try again.</div></div>
       <span class="pill" style="background:var(--yellow20);color:var(--yellow);height:28px;padding:0 12px">${ic('shield')} ${price} <img src="img/coin.png" style="width:16px;height:16px" alt=""> refunded</span></div></div>`
    : `<button class="abs" style="left:${(402 - w) / 2}px;top:${y}px;width:${w}px;height:${h}px;border-radius:24px;overflow:hidden" data-act="${vid ? 'playToggle' : ''}">${t.v && vid ? `<video src="v/${t.v}.mp4" poster="${IMG(src)}" playsinline loop style="width:100%;height:100%;object-fit:cover"></video>` : `<img src="${IMG(src)}" style="width:100%;height:100%;object-fit:cover" alt="">`}
       ${vid ? `<span class="abs playbtn glass dark circ" style="width:64px;height:64px;left:50%;top:50%;transform:translate(-50%,-50%);font-size:22px">${ic('play')}</span>` : ''}</button>`;
  return {
    html: `<div class="tb">${backBtn('resultBack')}<div class="ttl" style="font-size:20px;font-weight:600">${t.name}</div></div>${mediaBox}
    ${failed ? '' : `<div class="abs" style="left:16px;right:16px;top:628px;display:flex;justify-content:center;gap:4px">${soc.map(([k, l]) => `<button class="press" data-act="shareTo" style="width:70px;display:flex;flex-direction:column;align-items:center;gap:4px"><img src="img/soc_${k}.png" style="width:48px;height:48px" alt=""><span class="c1" style="font-weight:700">${l}</span></button>`).join('')}</div>`}
    <div class="abs" style="left:16px;right:16px;top:${actsTop}px;display:flex;flex-direction:column;gap:12px">
    ${failed ? coinBtn('prom', 'Try again') + `<button class="btn glass" style="height:54px" data-act="anotherPhoto" data-v="${id}">Use another photo</button>`
        : `<button class="btn glass prom" style="height:54px" data-act="saveAlbum">${ic('save')} Save to Album</button>` + coinBtn('', 'Try again')}</div>`
  };
};
/* Tools / 09 · Photo result (+ Failed) — Figma 1030:47252, 1390:149779 */
function toolResult(t, src, failed, price) {
  const soc = [['tiktok', 'TikTok'], ['instagram', 'Instagram'], ['facebook', 'Facebook'], ['whatsapp', 'WhatsApp'], ['more', 'Other']];
  return {
    html: `<div class="tb">${backBtn('resultBack')}<div class="ttl" style="font-size:20px;font-weight:600">${t.name}</div></div>
    <div class="abs" style="left:77px;top:144px;width:248px;height:440px;border-radius:17.5px;overflow:hidden"><img src="${IMG(src)}" style="width:100%;height:100%;object-fit:cover${failed ? ';filter:blur(24px);transform:scale(1.15)' : ''}" alt="">${failed ? `<div class="abs" style="inset:0;background:rgba(0,0,0,.55)"></div>
      <div class="abs" style="left:-12px;right:-12px;top:50%;transform:translateY(-50%);display:flex;flex-direction:column;align-items:center;gap:12px;text-align:center;padding:0 12px"><img src="img/lg_error.png" style="width:56px;height:56px" alt="">
      <div><div class="t3">Couldn't make your photo</div><div class="fn" style="color:rgba(255,255,255,.7);margin-top:6px">Something went wrong on our side. Please try again.</div></div>
      <span class="pill" style="background:var(--yellow20);color:var(--yellow);height:28px;padding:0 12px">${ic('shield')} ${price} <img src="img/coin.png" style="width:16px;height:16px" alt=""> refunded</span></div>` : ''}</div>
    <div class="abs" style="left:16px;right:16px;top:628px;display:flex;justify-content:center;gap:4px">${soc.map(([k, l]) => `<button class="press" data-act="shareTo" style="width:70px;display:flex;flex-direction:column;align-items:center;gap:4px"><img src="img/soc_${k}.png" style="width:48px;height:48px" alt=""><span class="c1" style="font-weight:700">${l}</span></button>`).join('')}</div>
    <div class="abs" style="left:16px;right:16px;top:720px;display:flex;flex-direction:column;gap:12px">
      <button class="btn glass prom" style="height:54px" data-act="saveAlbum">${ic('save')} Save to Album</button>
      <button class="btn glass" data-act="tryAgain" data-v="${t.id}" style="height:54px;font-weight:600">Try again · ${COIN} ${price}</button></div>`
  };
}
ACT.resultBack = () => { const prev = stack[stack.length - 2]; if (prev && (prev.name === 'create' || prev.name === 'making')) { const tt = T[stack[stack.length - 1].args.id] || T.neon; reset(tt.tool ? 'tab_tools' : isVid(tt) ? 'tab_video' : 'tab_photo'); } else back(); };
ACT.saveAlbum = () => toast('Saved to Album', { act: 'Share', fn: () => ACT.more() });
ACT.tryAgain = el => { const id = el.dataset.v; const price = isVid(T[id]) ? 120 : 100; if (S.coins < price) { notEnoughCoins(price - S.coins); return; } S.coins -= price; replace('making', { id }, 'fade'); };
ACT.anotherPhoto = el => { const id = el.dataset.v; reset(T[id].tool ? 'tab_tools' : isVid(T[id]) ? 'tab_video' : 'tab_photo'); go('create', { id }, 'none'); };
ACT.playToggle = el => { const v = el.querySelector('video'), b = el.querySelector('.playbtn'); if (!v) { b.style.opacity = b.style.opacity === '0' ? 1 : 0; return; } if (v.paused) { v.play(); b.style.opacity = 0; } else { v.pause(); b.style.opacity = 1; } };
