/* Flow · Gallery tab → Queue & Library — Figma 1030:48420 */
const GAL_VIDEO = [
  ['Today', [['street', '0:08', 'Neon Corridor'], ['909cb307c4', '0:10', 'Snow Angel'], ['588cb40b6d', '0:08', 'AI Video 06']]],
  ['Nov 16, 2026', [['blackcat1', '0:10', 'Black Cat 01'], ['aivid16', '0:06', 'AI Video 16'], ['aivid02', '0:12', 'AI Video 02'], ['blackcat4', '0:08', 'Black Cat 04'], ['cosmic', '0:10', 'AI Video 08']]],
];
let GAL_IMAGE = ['beauty_1', '1b0f2344af', 'beauty_3', '06ccfcec0c', '412b08d966', '6bf99536b9', '84470c5150', 'beauty_2'];
let QUEUE = {
  waiting: [{ img: 'aivid02', name: 'Mountain Ride' }],
  making: [{ img: 'witchcat', name: 'Moonlight Witch Cat', p: 62, eta: '~1 min' }, { img: '588cb40b6d', name: 'Neon Corridor', p: 20, eta: '~2 min' }],
  failed: [{ img: 'aivid02', name: 'Mountain Ride' }],
};
S.galEmpty = false; S.galSelect = null;
function galleryChips(cur) {
  const dim = S.galSelect ? 'opacity:.35;pointer-events:none;' : '';
  return `<div class="hscroll" style="gap:8px;padding:0 16px;${dim}">${[['queue', 'Queue'], ['video', 'Video'], ['image', 'Image'], ['uploads', 'Uploads'], ['bookmarks', 'Bookmarks']].map(([k, l]) => `<button class="chip ${k === cur ? 'on' : 'a1'}" style="font-weight:${k === cur ? 600 : 400}" data-act="galTab" data-v="${k}">${l}</button>`).join('')}</div>`;
}
const galHead = t => `<div style="font-size:20px;line-height:25px;font-weight:600;letter-spacing:-.45px;padding:0 16px">${t}</div>`;
function galEmpty(title, msg, cta, act) {
  return `<div style="display:flex;flex-direction:column;align-items:center;gap:24px;padding:114px 48px 0">
    <div style="display:flex;flex-direction:column;align-items:center;gap:0"><img src="${IMG('778a081517')}" alt="" style="width:172px;height:172px;object-fit:cover">
    <div style="font-size:22px;line-height:28px;font-weight:700;margin-top:-16px">${title}</div><div style="font-size:15px;line-height:20px;color:rgba(255,255,255,.7);margin-top:4px;text-align:center">${msg}</div></div>
    <button class="btn glass prom" style="height:46px;width:auto;padding:0 28px;font-weight:600" data-act="${act}">${cta}</button></div>`;
}
function galVideoBody() {
  if (S.galEmpty) return galEmpty('No videos yet', 'Videos you create will show up here.', 'Create a video', 'galCreateVideo');
  return GAL_VIDEO.map(([h, items], gi) => `<section style="display:flex;flex-direction:column;gap:16px">${galHead(`${h} <span class="n5" style="font-size:17px">${ic('chev')}</span>`)}
  <div class="hscroll" style="gap:12px;padding:0 16px">${items.map(([img, d], i) => `<button class="mcard press" style="width:148px;height:264px;border-radius:12px" data-act="galPlay" data-g="${gi}" data-i="${i}"><img src="${IMG(img)}" alt="" loading="lazy"><span class="abs" style="left:8px;bottom:8px;height:21px;padding:0 8px;border-radius:8px;background:rgba(0,0,0,.48);font-size:11px;font-weight:600;display:flex;align-items:center">${d}</span></button>`).join('')}</div></section>`).join('');
}
function galImageBody() {
  const sel = S.galSelect;
  return `<div style="display:grid;grid-template-columns:121px 120px 121px;gap:4px;padding:0 16px;margin-top:1px">${GAL_IMAGE.map((h, i) => {
    const on = sel && sel.has(i);
    return `<button class="press gimg" data-act="galImg" data-i="${i}" style="position:relative;height:180px;border-radius:10px;overflow:hidden">
      <img src="${IMG(h)}" alt="" loading="lazy" style="position:absolute;${h === '84470c5150' ? 'left:-14px;width:144px' : 'left:0;width:100%'};top:0;height:100%;object-fit:cover">
      ${sel ? (on ? `<i class="abs" style="inset:0;border-radius:8px;box-shadow:inset 0 0 0 3px var(--lime)"></i><span class="abs" style="right:8px;top:8px;width:24px;height:24px;border-radius:12px;background:var(--lime);color:#000;font-size:14px;font-weight:700;display:flex;align-items:center;justify-content:center">✓</span>`
        : `<span class="abs" style="right:8px;top:8px;width:24px;height:24px;border-radius:12px;background:rgba(0,0,0,.25);box-shadow:inset 0 0 0 2px #fff"></span>`) : ''}</button>`;
  }).join('')}</div>`;
}
function qCard(it, inner, info) {
  return `<div class="mcard" style="width:148px;height:264px;border-radius:12px"><img src="${IMG(it.img)}" alt=""><span class="abs" style="inset:0;background:rgba(0,0,0,.6)"></span>${inner}<div class="abs" style="left:8px;right:8px;bottom:8px">${info}</div></div>`;
}
const qInfo = (n, sub, col = '#a3a3a3') => `<div class="shs" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${n}</div><div style="font-size:13px;line-height:18px;color:${col};white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${sub}</div>`;
function ring(p) { const r = 22, c = 2 * Math.PI * r; return `<svg width="48" height="48" viewBox="0 0 48 48" style="position:absolute;inset:0"><circle cx="24" cy="24" r="${r}" fill="none" stroke="#fff" stroke-width="4"/><circle cx="24" cy="24" r="${r}" fill="none" stroke="#30d158" stroke-width="4" stroke-linecap="round" stroke-dasharray="${c}" stroke-dashoffset="${c * (1 - p / 100)}" transform="rotate(-90 24 24)"/></svg>`; }
const qBtn = (t, act, i, w) => `<button class="btn glass abs" style="left:${(148 - w) / 2}px;top:106px;width:${w}px;height:28px;font-size:15px;font-weight:500;padding:0" data-act="${act}" data-i="${i}">${t}</button>`;
function queueBody() {
  const q = QUEUE; if (!q.waiting.length && !q.making.length && !q.failed.length) return galEmpty('Your queue is empty', 'Start creating and track your progress here.', 'Start creating', 'galCreateVideo');
  const grp = (h, cards) => cards ? `<section style="display:flex;flex-direction:column;gap:16px">${galHead(h)}<div class="hscroll" style="gap:12px;padding:0 16px">${cards}</div></section>` : '';
  return grp('Waiting', q.waiting.map((it, i) => qCard(it, qBtn('Cancel', 'qCancel', i, 70), qInfo(it.name, 'Waiting to start'))).join(''))
    + grp('Making now', q.making.map((it, i) => `<button class="press" data-act="qOpen" data-i="${i}" style="flex:none">${qCard(it, `<span class="abs" style="left:50px;top:96px;width:48px;height:48px">${ring(it.p)}<span class="abs" style="inset:0;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:600">${it.p}%</span></span>`, qInfo(it.name, 'Making · ' + it.eta))}</button>`).join(''))
    + grp('Didn’t work', q.failed.map((it, i) => qCard(it, qBtn('Try again', 'qRetry', i, 87), qInfo(it.name, 'Didn’t work · refunded', '#ff453a'))).join(''));
}
SCREENS.tab_gallery = () => {
  const g = S.galleryTab; let body = '';
  if (g === 'video') body = galVideoBody();
  else if (g === 'queue') body = queueBody();
  else if (g === 'image') body = galImageBody();
  else if (g === 'uploads') body = `<div style="display:grid;grid-template-columns:121px 120px 121px;gap:4px;padding:0 16px">${[SELFIE, SELFIE2, '726146ff99', '2a841c84a2'].map(h => `<span style="height:180px;border-radius:10px;overflow:hidden"><img src="${IMG(h)}" alt="" style="width:100%;height:100%;object-fit:cover"></span>`).join('')}</div>`;
  else if (g === 'bookmarks') body = bookmarksBody();
  const sel = S.galSelect;
  const right = sel ? `<button data-act="galSelCancel" style="font-size:17px;font-weight:600;color:var(--lime);margin-left:auto">Cancel</button>`
    : `<button class="circ s glass" data-act="profile" aria-label="Profile" style="overflow:hidden"><img src="${IMG(AVATAR)}" alt="" style="width:36px;height:36px;border-radius:50%;object-fit:cover;background:#fff"></button>`;
  const head = sel ? `<div class="tbL"><div class="lt">${sel.size} selected</div>${right}</div>` : largeTitle('Gallery', right);
  const bar = sel ? `<div class="abs" style="left:16px;right:16px;top:790px;display:flex;gap:12px;z-index:40"><button class="btn" style="flex:1;height:50px;background:#333338;color:#fff;font-weight:600" data-act="galSelSave">Save to Photos</button><button class="btn" style="flex:1;height:50px;background:#333338;color:#ff453b;font-weight:600" data-act="galSelDelete">Delete (${sel.size})</button></div>` : tabBar('gallery');
  return { html: `<div class="scroll"><div style="padding:124px 0 140px;display:flex;flex-direction:column;gap:23px">${galleryChips(g)}<div style="display:flex;flex-direction:column;gap:28px">${body}</div></div></div>
  <div class="abs" style="left:0;top:0;width:100%;height:124px;background:linear-gradient(#000 70%,transparent);z-index:25;pointer-events:none"></div>${head}${bar}`,
    mount(el) {
      if (g === 'image') el.querySelectorAll('.gimg').forEach(b => { let t; b.addEventListener('pointerdown', () => { t = setTimeout(() => { b.dataset.lp = 1; if (!S.galSelect) { S.galSelect = new Set([+b.dataset.i]); rerender(); } }, 450); }); ['pointerup', 'pointerleave', 'pointercancel'].forEach(ev => b.addEventListener(ev, () => clearTimeout(t))); });
      if (g === 'queue' && QUEUE.making.some(m => m.name === 'Neon Corridor')) el._to = setTimeout(() => { if (stack[stack.length - 1].el !== el) return; const k = QUEUE.making.findIndex(m => m.name === 'Neon Corridor'); if (k < 0) return; QUEUE.making.splice(k, 1); rerender(); toast('Neon Corridor is ready', { icon: '', pos: 'bottom', act: 'View', fn: () => go('galView', { img: '93deccbe6a', title: 'Wolf Cut', kind: 'photo' }) }); }, 4000);
    }
  };
};
ACT.galTab = el => { S.galleryTab = el.dataset.v; S.galSelect = null; rerender(); };
ACT.profile = () => go('profile', {});
ACT.galCreateVideo = () => { S.tab = 'video'; reset('tab_video'); };
ACT.galPlay = el => { const it = GAL_VIDEO[+el.dataset.g][1][+el.dataset.i]; go('galView', { img: it[0], title: it[2], dur: it[1], kind: 'video' }); };
ACT.galImg = el => {
  if (el.dataset.lp) { delete el.dataset.lp; return; }
  const i = +el.dataset.i;
  if (S.galSelect) { S.galSelect.has(i) ? S.galSelect.delete(i) : S.galSelect.add(i); if (!S.galSelect.size) S.galSelect = null; rerender(); return; }
  go('galView', { img: GAL_IMAGE[i], title: 'Wolf Cut', kind: 'photo' });
};
ACT.galSelCancel = () => { S.galSelect = null; rerender(); };
ACT.galSelSave = () => { const n = S.galSelect.size; S.galSelect = null; rerender(); toast(`Saved ${n} item${n > 1 ? 's' : ''} to Photos`); };
function galAlert(title, msg, danger, keep, onDanger) {
  const p = $phone(); const d = document.createElement('div'); d.className = 'alertdim';
  d.innerHTML = `<div class="glass dark" style="width:300px;border-radius:34px;padding:14px;animation:pop .3s var(--ease) both">
   <div style="padding:8px 8px 24px;text-align:center"><div style="font-size:20px;line-height:25px;font-weight:600">${title}</div><div style="font-size:17px;line-height:22px;color:rgba(255,255,255,.8);margin-top:10px">${msg}</div></div>
   <div style="display:flex;flex-direction:column;gap:8px"><button class="btn" style="height:48px;background:rgba(255,69,58,.2);color:#ff383c;font-weight:600" data-x="d">${danger}</button><button class="btn" style="height:48px;background:rgba(255,255,255,.09);color:#fff;font-weight:600" data-x="k">${keep}</button></div></div>`;
  d.querySelector('[data-x=k]').onclick = () => d.remove(); d.querySelector('[data-x=d]').onclick = () => { d.remove(); onDanger(); };
  p.appendChild(d);
}
ACT.galSelDelete = () => { const n = S.galSelect.size; galAlert(`Delete ${n} item${n > 1 ? 's' : ''}?`, 'They\'ll be removed from your Gallery on all your devices. This can\'t be undone.', 'Delete', 'Cancel', () => { const s = S.galSelect; GAL_IMAGE = GAL_IMAGE.filter((_, i) => !s.has(i)); S.galSelect = null; rerender(); toast(`Deleted ${n} item${n > 1 ? 's' : ''}`); }); };
ACT.qCancel = el => galAlert('Cancel this creation?', 'It hasn\'t started yet. The coins on hold go back to your balance and you are not charged.', 'Cancel creation', 'Keep it', () => { QUEUE.waiting.splice(+el.dataset.i, 1); rerender(); toast('Cancelled · coins returned'); });
ACT.qRetry = el => { const it = QUEUE.failed.splice(+el.dataset.i, 1)[0]; QUEUE.waiting.push(it); rerender(); };
ACT.qOpen = () => go('making', { id: 'wolf' });
ACT.openResult = el => go('galView', { img: el.dataset.v, title: 'Wolf Cut', kind: 'photo' });

/* 02c · Photo result / 06 · Video viewer (opened from Gallery) */
SCREENS.galView = ({ img, title = 'Wolf Cut', kind = 'photo', dur = '0:08' }) => {
  const vid = kind === 'video';
  return {
    html: `<div class="tb">${backBtn()}<div class="ttl" style="font-size:20px;font-weight:600">${title}</div>${vid ? `<span class="sp"></span><button class="circ s glass" data-act="galMore" aria-label="More">${ic('ellipsis')}</button>` : ''}</div>
    <button class="abs" style="left:31px;top:134px;width:340px;height:604px;border-radius:24px;overflow:hidden" data-act="${vid ? 'galPP' : ''}"><img src="${IMG(img)}" alt="" style="width:100%;height:100%;object-fit:cover">
      ${vid ? `<span class="abs gpp" style="left:138px;top:270px;width:64px;height:64px;border-radius:1000px;background:rgba(0,0,0,.28);-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);display:flex;align-items:center;justify-content:center;font-size:22px">${ic('play')}</span>
      <span class="abs" style="left:20px;top:570px;width:300px;height:4px;border-radius:2px;background:rgba(255,255,255,.3)"><i class="gprog" style="display:block;width:110px;height:4px;border-radius:2px;background:#fff"></i></span>
      <span class="abs" style="left:20px;top:576px;font-size:12px;line-height:14px;font-weight:600;color:rgba(255,255,255,.85)">0:03 / ${dur}</span>` : ''}</button>
    <div class="abs" style="left:16px;right:16px;top:762px;display:flex;gap:12px"><button class="btn" style="flex:1;height:50px;background:#2c2c2e;color:#fff;font-weight:600" data-act="shareTo">Share</button>
      <button class="btn glass prom" style="flex:1;height:50px;font-weight:500" data-act="galSave">${vid ? 'Save to Photos' : 'Save'}</button></div>`
  };
};
ACT.galPP = el => { const b = el.querySelector('.gpp'); b.style.opacity = b.style.opacity === '0' ? 1 : 0; };
ACT.galSave = () => toast('Saved to Photos');
ACT.galMore = () => sheet({ title: '', html: `<div class="grp noic">${[['Remake', 'retry'], ['Report', 'flag'], ['Delete', 'trash']].map(([l, i]) => `<button class="row" data-act="galMoreDo" data-v="${l}" style="${l === 'Delete' ? 'color:var(--red)' : ''}">${l}<span class="r">${ic(i)}</span></button>`).join('')}</div>` });
ACT.galMoreDo = el => { closeSheet(); const v = el.dataset.v; if (v === 'Delete') setTimeout(() => galAlert('Delete this video?', 'It\'ll be removed from your Gallery on all your devices. This can\'t be undone.', 'Delete', 'Cancel', () => { back(); toast('Deleted 1 item'); }), 250); else toast(v === 'Report' ? 'Thanks — we’ll review it' : 'Opening template…', { icon: '' }); };
