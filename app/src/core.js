/* Spark web prototype v2 — core: icons, assets, state, router, overlays */
const ICONS = __ICONS__;
const FIG = __FIG__; // icons exported from Figma (SF Symbols), px at 144px font size
const ic = (n, cls = '') => { const f = FIG[n]; if (f) return `<i class="ic fi fi-${n} ${cls}" aria-hidden="true" style="width:${(f[0] / 144).toFixed(3)}em;height:${(f[1] / 144).toFixed(3)}em"></i>`; const d = ICONS[n]; if (!d) return ''; return `<svg class="ic ${cls}" viewBox="${d[0]}" aria-hidden="true"><path d="${d[1]}"/></svg>`; };
const IMG = h => `img/${h}.jpg`;
const PNG = n => `img/${n}.png`;
const COIN = `<img class="coin" src="img/coin.png" alt="">`;
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

/* ---------- data ---------- */
const T = { // templates (video + photo)
  neon: { id: 'neon', name: 'Neon Run', kind: 'video', img: '3188779628', price: 100, cat: 'Cinematic', uses: '12.4K' },
  cosmic: { id: 'cosmic', name: 'Cosmic Night', kind: 'video', img: 'a0c009bf83', price: 100, cat: 'Fantasy', uses: '8.1K', v: '05' },
  billionaire: { id: 'billionaire', name: 'Billionaire Reveal', kind: 'video', img: '30b2d83d18', price: 100, cat: 'Cinematic' },
  street: { id: 'street', name: 'Street Icon', kind: 'video', img: 'cc8862499f', price: 100, cat: 'Action' },
  skyhero: { id: 'skyhero', name: 'Sky Hero', kind: 'video', img: '3b449190bc', price: 100, cat: 'Action' },
  dream: { id: 'dream', name: 'Dreamscape', kind: 'video', img: '3188779628', price: 100, cat: 'Action' },
  pinkhair: { id: 'pinkhair', name: 'Pastel Waves', kind: 'video', img: '89c24bbb5c', price: 100, cat: 'Trending' },
  lavender: { id: 'lavender', name: 'Lavender Birthday', kind: 'photo', img: '0e4cddc53b', price: 100, cat: 'Birthday' },
  cake: { id: 'cake', name: 'Cake Princess', kind: 'photo', img: 'd4bd65a314', price: 100, cat: 'Birthday' },
  thirty: { id: 'thirty', name: 'Thirty & Thriving', kind: 'photo', img: '4378f76bb3', price: 100, cat: 'Birthday' },
  candle: { id: 'candle', name: 'Candlelight Wish', kind: 'photo', img: '37b2464de8', price: 100, cat: 'Birthday' },
  papercut: { id: 'papercut', name: 'Paper Cut Portrait', kind: 'photo', img: '3bf90c3605', price: 100, cat: 'Art', people: 2 },
  felt: { id: 'felt', name: 'Felt Doll', kind: 'photo', img: '030c9d320f', price: 100, cat: 'Cute' },
  midnight: { id: 'midnight', name: 'Midnight Glow', kind: 'photo', img: '0fcda8a89f', price: 100, cat: 'Portrait' },
  chefs: { id: 'chefs', name: 'Tiny Chefs', kind: 'video', img: 'hero_03', v: '03', price: 100, cat: 'Trending' },
  granny: { id: 'granny', name: 'Granny Rush', kind: 'video', img: 'hero_12', v: '12', price: 100, cat: 'Action' },
  pool: { id: 'pool', name: 'Sky Pool Duo', kind: 'video', img: 'hero_06', v: '06', price: 100, cat: 'Couple', people: 2 },
  whale: { id: 'whale', name: 'Whale Wake-up', kind: 'video', img: 'hero_14', v: '14', price: 100, cat: 'Funny' },
  gameday: { id: 'gameday', name: 'Game Day Glow', kind: 'video', img: 'hero_08', v: '08', price: 100, cat: 'Trending' },
  wolf: { id: 'wolf', name: 'Wolf Cut', kind: 'photo', tool: 'hair', img: '61f1c491d9', res: '93deccbe6a', price: 100, cat: 'Hairstyle' },
  noir: { id: 'noir', name: 'Film Noir', kind: 'photo', img: 'fe31119c36', price: 100, cat: 'Portrait' },
};
const SELFIE = '93c32947a2';           // full-body selfie used in flows
const SELFIE2 = '9f43c6d6b2';          // second photo
const AVATAR = '2a4f3e6bef';

/* ---------- state ---------- */
const S = {
  tab: 'video', galleryTab: 'video', signedIn: false, pro: false, coins: 480,
  bookmarks: new Set(), collections: [
    { id: 'default', name: 'Default collection', items: ['neon', 'cosmic', 'lavender'], def: true },
    { id: 'bday', name: 'Birthday ideas', items: ['cake', 'thirty'] },
    { id: 'halloween', name: 'Halloween', items: [] },
  ],
  guideAgreed: false, profile: { name: 'Su Su', user: 'su.creates', birthday: 'Aug 14, 2000', gender: 'Female' },
};

/* ---------- router ---------- */
const $phone = () => document.getElementById('phone');
const stack = [];            // [{name, args, el}]
const SCREENS = {};          // name -> fn(args) => {html, mount?(el), tab?:bool}
let busy = false;

function build(name, args) {
  const def = SCREENS[name]; if (!def) { console.warn('no screen', name); return null; }
  const r = def(args || {});
  const el = document.createElement('div'); el.className = 'scr'; el.dataset.screen = name;
  el.innerHTML = r.html + statusBar();
  el._r = r; return el;
}
function mountEl(el) { try { el._r.mount && el._r.mount(el); } catch (e) { console.error(e); } }
function go(name, args, anim = 'push') {
  if (busy) return; const el = build(name, args); if (!el) return;
  const prev = stack[stack.length - 1];
  stack.push({ name, args, el });
  $phone().appendChild(el); mountEl(el);
  if (prev && anim !== 'none') { busy = true; el.classList.add('enter-' + anim); if (anim === 'push') prev.el.classList.add('leave-push');
    setTimeout(() => { el.classList.remove('enter-' + anim); prev.el.classList.remove('leave-push'); prev.el.style.display = 'none'; busy = false; }, anim === 'push' ? 420 : 450); }
  else if (prev) prev.el.style.display = 'none';
  pauseOthers(el); onRoute();
}
function back(n = 1) {
  if (busy || stack.length < 2) return; closeOverlays(true);
  const cur = stack.pop(); for (let i = 1; i < n && stack.length > 1; i++) { const s = stack.pop(); s.el.remove(); }
  const prev = stack[stack.length - 1]; prev.el.style.display = ''; busy = true;
  const up = cur.el.dataset.anim === 'up';
  cur.el.classList.add(up ? 'leave-down' : 'leave-pop'); if (!up) prev.el.classList.add('enter-pop');
  setTimeout(() => { cur.el.remove(); prev.el.classList.remove('enter-pop'); busy = false; }, 420);
  if (prev.el._r.resume) prev.el._r.resume(prev.el);
  pauseOthers(prev.el); onRoute();
}
function replace(name, args, anim = 'fade') {
  closeOverlays(true); const cur = stack.pop(); const el = build(name, args); if (!el) { stack.push(cur); return; }
  stack.push({ name, args, el }); $phone().appendChild(el); mountEl(el);
  el.classList.add('enter-' + anim); setTimeout(() => { el.classList.remove('enter-' + anim); cur.el.remove(); }, 380);
  pauseOthers(el); onRoute();
}
function reset(name, args) { closeOverlays(true); stack.splice(0).forEach(s => s.el.remove()); go(name, args, 'none'); }
function rerender() { const cur = stack[stack.length - 1]; if (!cur) return; const sc = cur.el.querySelector('.scroll'); const top = sc ? sc.scrollTop : 0;
  const el = build(cur.name, cur.args); cur.el.replaceWith(el); cur.el = el; mountEl(el); const sc2 = el.querySelector('.scroll'); if (sc2) sc2.scrollTop = top; }
function pauseOthers(active) { document.querySelectorAll('#phone video').forEach(v => { if (!active.contains(v)) v.pause(); else if (v.dataset.auto !== undefined) v.play().catch(() => { }); }); }
function onRoute() { const cur = stack[stack.length - 1]; document.querySelectorAll('#side .jump button').forEach(b => b.classList.toggle('cur', b.dataset.go === cur.name)); }

/* ---------- overlays ---------- */
function closeOverlays(instant) {
  $phone().querySelectorAll('.dim,.sheet,.alertdim').forEach(n => { if (instant) n.remove(); else { n.classList.add('out'); setTimeout(() => n.remove(), 340); } });
}
function sheet({ title = '', html, right = 'close', left = '', cls = '', dim = true, onMount }) {
  closeOverlays(true); const p = $phone();
  if (dim) { const d = document.createElement('div'); d.className = 'dim'; d.onclick = () => closeSheet(); p.appendChild(d); }
  const s = document.createElement('div'); s.className = 'sheet ' + cls;
  const r = right === 'close' ? `<button class="circ s glass" data-act="closeSheet">${ic('close')}</button>` : right;
  s.innerHTML = `<div class="grab"></div>${title !== null ? `<div class="stb">${left ? `<div class="l">${left}</div>` : ''}<div class="ttl">${title}</div><div class="r">${r}</div></div>` : ''}<div class="body">${html}</div>`;
  p.appendChild(s); onMount && onMount(s); return s;
}
function closeSheet() { const p = $phone(); p.querySelectorAll('.sheet,.dim').forEach(n => { n.classList.add('out'); setTimeout(() => n.remove(), 340); }); }
function alertBox({ icon = '', title, msg = '', acts, h = false }) {
  const p = $phone(); const d = document.createElement('div'); d.className = 'alertdim';
  d.innerHTML = `<div class="alert glass">${icon}<h3>${title}</h3>${msg ? `<p>${msg}</p>` : ''}<div class="acts ${h ? 'h' : ''}">${acts.map((a, i) => `<button class="ab ${a.cls || ''}" data-i="${i}">${a.t}</button>`).join('')}</div></div>`;
  d.querySelectorAll('.ab').forEach(b => b.onclick = () => { d.remove(); const a = acts[+b.dataset.i]; a.fn && a.fn(); });
  p.appendChild(d);
}
let toastT;
function toast(text, { act = '', fn = null, icon = 'check', ms = 3200, pos = 'top' } = {}) {
  const p = $phone(); p.querySelectorAll('.toast').forEach(n => n.remove()); clearTimeout(toastT);
  const t = document.createElement('div'); t.className = 'toast glass dark' + (pos === 'bottom' ? ' bottom' : '');
  const iconHtml = icon === 'check' ? `<img src="img/lg_check.png" alt="">` : icon === 'bell' ? `<span class="icbox bellring" style="width:20px;height:20px">${ic('bell')}</span>` : icon;
  t.innerHTML = `${iconHtml}<span>${text}</span>${act ? `<button class="act">${act} ${ic('chev')}</button>` : ''}`;
  if (fn) t.querySelector('.act').onclick = () => { t.remove(); fn(); };
  p.appendChild(t); toastT = setTimeout(() => { t.classList.add('out'); setTimeout(() => t.remove(), 350); }, ms);
}

/* ---------- shared chrome ---------- */
function statusBar() {
  return `<div class="island"></div><div class="status"><span>9:41</span><span class="r">
<svg viewBox="0 0 18 12" width="18"><rect x="0" y="8" width="3" height="4" rx="1"/><rect x="5" y="5.5" width="3" height="6.5" rx="1"/><rect x="10" y="3" width="3" height="9" rx="1"/><rect x="15" y="0" width="3" height="12" rx="1"/></svg>
<svg viewBox="0 0 16 12" width="16"><path d="M8 2.4c2.3 0 4.4.9 6 2.4l1.2-1.2A10 10 0 0 0 8 .7 10 10 0 0 0 .8 3.6L2 4.8a8.4 8.4 0 0 1 6-2.4Zm0 3.3c1.4 0 2.6.5 3.6 1.4l1.2-1.2A6.8 6.8 0 0 0 8 4a6.8 6.8 0 0 0-4.8 1.9l1.2 1.2c1-.9 2.2-1.4 3.6-1.4Zm0 3.3c.5 0 1 .2 1.3.5L8 11 6.7 9.5c.3-.3.8-.5 1.3-.5Z"/></svg>
<svg viewBox="0 0 27 12" width="27"><rect x=".5" y=".5" width="23" height="11" rx="3.5" fill="none" stroke="#fff" opacity=".4"/><rect x="2" y="2" width="20" height="8" rx="2"/><path d="M25 4v4c.8-.3 1.3-1.1 1.3-2S25.8 4.3 25 4Z" opacity=".4"/></svg></span></div>`;
}
const backBtn = (act = 'back') => `<button class="circ s glass" data-act="${act}" aria-label="Back">${ic('back')}</button>`;
const closeBtn = (act = 'back') => `<button class="circ s glass" data-act="${act}" aria-label="Close">${ic('close')}</button>`;
function joinNow() { return S.pro ? `<button class="badge glass dark" data-act="coins">${COIN.replace('class="coin"', '')}<span>${S.coins.toLocaleString()}</span></button>` : `<button class="badge glass pastel" data-act="paywall"><img src="img/crown.png" alt="">JOIN NOW</button>`; }
function tabBar(active) {
  const t = [['video', 'tvideo', 'Video'], ['photo', 'tphoto', 'Photo'], ['tools', 'ttools', 'Tools'], ['gallery', 'tgallery', 'Gallery']];
  return `<div class="tabbar"><div class="tabpill glass">${t.map(([k, i, l]) => `<button class="${k === active ? 'on' : ''}" data-act="tab" data-v="${k}"><span class="tabic">${ic(i)}</span><span>${l}</span></button>`).join('')}</div></div>`;
}
function largeTitle(title, extra = '') { return `<div class="tbL"><div class="lt">${title}</div>${joinNow()}${extra}</div>`; }
function card(t, w = 160, h = 252, act = 'openTpl', title = true) {
  const media = t.v ? `<video src="v/${t.v}.mp4" poster="${IMG(t.img)}" muted loop playsinline preload="none"></video>` : `<img src="${IMG(t.img)}" alt="" loading="lazy">`;
  return `<button class="mcard press" style="width:${w}px;height:${h}px" data-act="${act}" data-v="${t.id}">${media}${title ? `<div class="scrim">${t.name}</div>` : ''}</button>`;
}

/* ---------- actions ---------- */
const ACT = {
  back: () => back(), closeSheet: () => closeSheet(),
  tab: el => { S.tab = el.dataset.v; reset('tab_' + S.tab); },
  search: () => toast('Search is coming soon', { icon: '' }),
  paywall: () => go('paywall', {}, 'up'),
  coins: () => go('refill', {}),
};
document.addEventListener('click', e => {
  const el = e.target.closest('[data-act]'); if (!el || !document.getElementById('phone').contains(el)) return;
  const f = ACT[el.dataset.act]; if (f) { e.preventDefault(); f(el, e); }
});

/* ---------- motion helpers: smooth paging, mouse drag-to-swipe ---------- */
const easeOutQuint = t => 1 - Math.pow(1 - t, 5);
const easeInOutCubic = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
function smoothScroll(el, prop, to, dur = 520, fn, ease = easeInOutCubic) {
  cancelAnimationFrame(el._raf); const from = el[prop]; if (Math.abs(to - from) < 1) { fn && fn(); return; }
  if (el._snap === undefined) el._snap = el.style.scrollSnapType; el.style.scrollSnapType = 'none'; el._anim = true; const t0 = performance.now();
  const step = now => { const k = Math.min(1, (now - t0) / dur); el[prop] = from + (to - from) * ease(k); if (k < 1) el._raf = requestAnimationFrame(step); else { el.style.scrollSnapType = el._snap; el._snap = undefined; el._anim = false; fn && fn(); } };
  el._raf = requestAnimationFrame(step);
}
const phoneScale = el => { const r = el.getBoundingClientRect(); return el.offsetWidth ? r.width / el.offsetWidth : 1; };
/* Mouse drag on horizontal rows (hero banner, category chips, card rows) — touch keeps native scrolling */
document.addEventListener('pointerdown', e => {
  if (e.pointerType !== 'mouse' || e.button !== 0) return;
  const sc = e.target.closest('.hscroll'); if (!sc || !document.getElementById('phone').contains(sc)) return;
  const k = phoneScale(sc), x0 = e.clientX, s0 = sc.scrollLeft; let moved = false, lastX = x0, lastT = performance.now(), v = 0;
  const paged = sc.classList.contains('herotrack'); cancelAnimationFrame(sc._raf);
  const move = ev => {
    const dx = (ev.clientX - x0) / k; if (!moved && Math.abs(dx) < 5) return;
    if (!moved) { moved = true; sc._drag = true; sc._snap = sc.style.scrollSnapType; sc.style.scrollSnapType = 'none'; sc.style.cursor = 'grabbing'; }
    sc.scrollLeft = s0 - dx; const now = performance.now(); v = ((ev.clientX - lastX) / k) / Math.max(1, now - lastT); lastX = ev.clientX; lastT = now;
  };
  const up = () => {
    window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up); sc.style.cursor = '';
    if (!moved) return; sc._drag = false; sc._touched = Date.now(); const snap = sc._snap; sc._snap = undefined;
    window.addEventListener('click', ev => { ev.stopPropagation(); ev.preventDefault(); }, { capture: true, once: true });
    if (paged) { const w = sc.clientWidth, n = Math.round(sc.scrollWidth / w); let i = Math.round(sc.scrollLeft / w); if (Math.abs(v) > .25) i = Math.round((s0 - (v > 0 ? w * .51 : -w * .51)) / w); i = Math.max(0, Math.min(n - 1, i)); sc.style.scrollSnapType = snap; smoothScroll(sc, 'scrollLeft', i * w, 480, null, easeOutQuint); }
    else { const max = sc.scrollWidth - sc.clientWidth; const to = Math.max(0, Math.min(max, sc.scrollLeft - v * 260)); sc.style.scrollSnapType = snap; smoothScroll(sc, 'scrollLeft', to, 520, null, easeOutQuint); }
  };
  window.addEventListener('pointermove', move); window.addEventListener('pointerup', up);
});
/* Vertical pager for the full-screen feed: wheel / drag / keys → one page per gesture, eased, with parallax between scenes */
function attachPager(sc) {
  const H = () => sc.clientHeight, pages = () => sc.querySelectorAll(':scope > section');
  const goTo = i => { const n = pages().length; i = Math.max(0, Math.min(n - 1, i)); smoothScroll(sc, 'scrollTop', i * H(), 620, () => { sc._lock = Date.now(); }, easeOutQuint); };
  const cur = () => Math.round(sc.scrollTop / H());
  sc.addEventListener('wheel', e => {
    e.preventDefault(); if (sc._anim || Date.now() - (sc._lock || 0) < 380 || Math.abs(e.deltaY) < 6) { sc._lock = sc._anim ? sc._lock : Date.now() - 300; return; }
    goTo(cur() + (e.deltaY > 0 ? 1 : -1));
  }, { passive: false });
  sc.addEventListener('pointerdown', e => {
    if (e.pointerType !== 'mouse' || e.button !== 0 || e.target.closest('button')) return;
    const k = phoneScale(sc), y0 = e.clientY, s0 = sc.scrollTop, t0 = performance.now(); let moved = false; cancelAnimationFrame(sc._raf);
    const move = ev => { const dy = (ev.clientY - y0) / k; if (!moved && Math.abs(dy) < 5) return; if (!moved) { moved = true; sc._snap = sc.style.scrollSnapType; sc.style.scrollSnapType = 'none'; } sc.scrollTop = s0 - dy; };
    const up = ev => { window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up); if (!moved) return; sc.style.scrollSnapType = sc._snap; sc._snap = undefined;
      const dy = (ev.clientY - y0) / k, vel = dy / Math.max(1, performance.now() - t0), i0 = Math.round(s0 / H());
      goTo(Math.abs(dy) > H() * .18 || Math.abs(vel) > .45 ? i0 + (dy < 0 ? 1 : -1) : i0); };
    window.addEventListener('pointermove', move); window.addEventListener('pointerup', up);
  });
  const key = e => { if (!document.body.contains(sc)) return document.removeEventListener('keydown', key); if (e.key === 'ArrowDown' || e.key === 'PageDown') { e.preventDefault(); goTo(cur() + 1); } if (e.key === 'ArrowUp' || e.key === 'PageUp') { e.preventDefault(); goTo(cur() - 1); } };
  document.addEventListener('keydown', key);
  const fx = () => { const h = H(); pages().forEach((p, i) => { const r = (sc.scrollTop - i * h) / h; if (Math.abs(r) > 1.05) return; const m = p.firstElementChild; const a = Math.min(1, Math.abs(r));
    if (m) { m.style.transform = `translateY(${r * h * .3}px) scale(${1 + a * .08})`; m.style.filter = `brightness(${1 - a * .45})`; }
    p.querySelectorAll('.fmeta,.fside,.fuse').forEach(n => { n.style.transform = `translateY(${-r * 40}px)`; }); }); };
  sc.addEventListener('scroll', fx, { passive: true }); fx();
}
