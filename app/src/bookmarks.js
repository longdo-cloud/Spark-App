const BMO = '<span style="color:#fff;font-size:18px;display:flex">' + ic('bookmark') + '</span>';
const BMI = '<span style="color:var(--lime);font-size:18px;display:flex">' + ic('bookmarkf') + '</span>';
/* Save to collection → Gallery › Bookmarks — Figma 1074:10037 */
S.collections = [
  { id: 'default', name: 'Default collection', items: ['billionaire', 'neon', 'cosmic', 'lavender', 'street', 'skyhero', 'cake'], def: true, extra: 40 },
  { id: 'bday', name: 'Birthday ideas', items: ['skyhero', 'neon', 'cosmic', 'street'] },
  { id: 'couple', name: 'Couple pics', items: ['thirty', 'pinkhair', 'midnight', 'noir', 'felt'] },
  { id: 'later', name: 'Try later', items: ['cosmic', 'skyhero', 'thirty', 'candle', 'street', 'neon', 'midnight', 'felt'] },
  { id: 'pets', name: 'Pets & me', items: ['cake'] },
  { id: 'halloween', name: 'Halloween', items: [] },
];
S.bookmarks = new Set(); // default: nothing bookmarked
const plural = n => n === 1 ? '1 template' : n + ' templates';
const colById = id => S.collections.find(c => c.id === id);

function colCover(c, w, h) {
  if (!c.items.length) return `<div style="width:${w}px;height:${h}px;border-radius:24px;box-shadow:inset 0 0 0 1.5px rgba(255,255,255,.18);background:rgba(255,255,255,.04);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;padding:0 16px;text-align:center"><span class="icbox" style="width:28px;height:28px;font-size:22px">${ic('bookmark')}</span><span class="shs">No templates yet</span><span class="fns n5">Tap ${ic('bookmark')} on a template to add it here</span></div>`;
  const back = c.items[1] ? `<img src="${IMG(T[c.items[1]].img)}" alt="" style="position:absolute;left:12px;right:12px;top:-6px;height:20px;width:calc(100% - 24px);object-fit:cover;border-radius:16px 16px 0 0;filter:brightness(.5)">` : '';
  return `<div style="position:relative;width:${w}px;height:${h}px">${back}<img src="${IMG(T[c.items[0]].img)}" alt="" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;border-radius:24px">${c.def ? '<span class="pill" style="position:absolute;left:8px;top:8px;background:rgba(0,0,0,.45);color:#fff;-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px)">Default</span>' : ''}</div>`;
}
function bookmarksBody() {
  return `<div style="display:grid;grid-template-columns:179px 179px;gap:24px 12px;padding:16px 16px 140px">${S.collections.map(c => `<button class="press" data-act="openCol" data-v="${c.id}" style="text-align:left;display:flex;flex-direction:column;gap:8px">${colCover(c, 179, 196)}<span><span class="shs" style="display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(c.name)}</span><span class="fns n5">${c.items.length ? plural(c.items.length + (c.extra || 0)) : `Empty · <span style="color:#fff;text-decoration:underline">Add templates</span>`}</span></span></button>`).join('')}
  <button class="press" data-act="newCol" style="text-align:left;display:flex;flex-direction:column;gap:8px"><span style="width:179px;height:196px;border-radius:24px;background:var(--a100);display:flex;align-items:center;justify-content:center"><span class="circ" style="background:var(--a100);font-size:20px">${ic('plus')}</span></span><span class="shs">New collection</span></button></div>`;
}
ACT.openCol = el => { const c = colById(el.dataset.v); go('collection', { id: c.id }); };

/* 05 · Collection detail */
SCREENS.collection = ({ id }) => {
  const c = colById(id); if (!c) return { html: '' };
  const body = c.items.length ? `<div class="fns n5" style="padding:0 0 12px">${plural(c.items.length)}</div><div style="display:grid;grid-template-columns:179px 179px;gap:12px">${c.items.map(i => colCard(T[i], c)).join('')}</div>`
    : `<div style="display:flex;flex-direction:column;align-items:center;text-align:center;gap:8px;padding:178px 32px 0"><img src="img/635d00c78a.jpg" style="width:160px;height:160px;mix-blend-mode:screen" alt=""><div style="margin-top:16px;font-size:22px;line-height:28px;font-weight:700">No templates yet</div><div class="sh n5">Tap ${ic('bookmark')} Save on any template and choose ${esc(c.name)} to keep it here.</div><button class="btn glass prom" style="width:auto;height:50px;padding:0 20px;margin-top:20px;font-weight:500" data-act="browseTpl">Browse templates</button></div>`;
  return {
    html: `<div class="scroll"><div style="padding:124px 16px 48px">${body}</div></div><div class="abs" style="left:0;top:0;width:100%;height:120px;background:linear-gradient(#000 60%,transparent);pointer-events:none;z-index:29"></div>
    <div class="tb">${backBtn()}<div class="ttl">${esc(c.name)}</div><span class="sp"></span>${c.def ? '' : `<button class="circ s glass" data-act="colMenu" aria-label="More">${ic('ellipsis')}</button>`}</div>`
  };
};
function colCard(t, c) {
  return `<div class="mcard press" style="width:179px;height:262px;border-radius:20px" data-act="colFeed" data-v="${t.id}"><img src="${IMG(t.img)}" alt="" loading="lazy">
  <div class="scrim" style="padding:40px 12px 12px;display:flex;flex-direction:column;gap:2px"><span class="shs">${t.name}</span><span class="fns" style="display:flex;align-items:center;gap:4px"><img src="img/coin.png" style="width:16px;height:16px" alt="">${t.price}</span></div>
  <button class="abs circ xs glass" style="right:8px;top:8px;color:var(--lime)" data-act="unsave" data-v="${t.id}" data-c="${c.id}" aria-label="Remove">${ic('bookmarkf')}</button></div>`;
}
ACT.colFeed = el => go('feed', { id: el.dataset.v });
ACT.browseTpl = () => reset('tab_video');
ACT.unsave = (el, e) => { e.stopPropagation(); const c = colById(el.dataset.c), id = el.dataset.v; const idx = c.items.indexOf(id); c.items.splice(idx, 1); if (c.def) S.bookmarks.delete(id); rerender();
  toast(`Removed from ${c.name}`, { icon: '', act: 'Undo', fn: () => { c.items.splice(idx, 0, id); if (c.def) S.bookmarks.add(id); rerender(); } }); };

/* 06 · ··· menu → rename / delete */
ACT.colMenu = el => {
  const p = $phone(); p.querySelectorAll('.popmenu,.popdim').forEach(n => n.remove());
  const d = document.createElement('div'); d.className = 'popdim'; d.style.cssText = 'position:absolute;inset:0;z-index:84'; d.onclick = () => { d.remove(); m.remove(); };
  const m = document.createElement('div'); m.className = 'popmenu glass dark'; m.style.cssText = 'position:absolute;right:16px;top:118px;width:230px;border-radius:24px;padding:8px 0;z-index:85;transform-origin:top right;animation:pop .25s var(--ease) both';
  m.innerHTML = `<button class="row" style="min-height:44px" data-x="rename">Rename<span class="r">${ic('pencil')}</span></button><button class="row" style="min-height:44px;color:var(--red)" data-x="delete">Delete collection<span class="r" style="color:var(--red)">${ic('trash')}</span></button>`;
  m.querySelector('[data-x=rename]').onclick = () => { d.click(); nameSheet({ mode: 'rename', id: stack[stack.length - 1].args.id }); };
  m.querySelector('[data-x=delete]').onclick = () => { d.click(); deleteCol(stack[stack.length - 1].args.id); };
  p.append(d, m);
};
function deleteCol(id) {
  const c = colById(id);
  alertBox({ title: `Delete “${esc(c.name)}”?`, msg: `${plural(c.items.length)} will be removed from this collection. They stay in Default collection.`, acts: [{ t: 'Delete', cls: 'des', fn: () => {
    const idx = S.collections.indexOf(c); S.collections.splice(idx, 1); S.galleryTab = 'bookmarks'; back();
    setTimeout(() => { rerender(); toast(`Deleted “${c.name}”`, { icon: '', act: 'Undo', fn: () => { S.collections.splice(idx, 0, c); rerender(); } }); }, 450);
  } }, { t: 'Cancel' }] });
}

/* 02 · Save to collection sheet */
function saveToCollection(tplId) {
  const others = S.collections.filter(c => !c.def);
  const rows = others.length ? others.map(c => { const has = c.items.includes(tplId);
    return `<button class="row" style="min-height:72px;padding:0;gap:12px" data-act="toggleCol" data-c="${c.id}" data-t="${tplId}">
    <span style="width:56px;height:56px;border-radius:12px;overflow:hidden;flex:none;background:var(--a100);display:flex;align-items:center;justify-content:center">${c.items[0] ? `<img src="${IMG(T[c.items[0]].img)}" style="width:100%;height:100%;object-fit:cover" alt="">` : ic('bookmark')}</span>
    <span style="flex:1"><span class="shs" style="display:block">${esc(c.name)}</span><span class="fns n5">${plural(c.items.length + (c.extra || 0))}</span></span><span class="r" style="color:${has ? 'var(--lime)' : '#fff'};font-size:17px">${ic(has ? 'check' : 'plus')}</span></button>`; }).join('')
    : `<div class="fn n5 ctr" style="padding:8px 16px 16px">No collections yet. Make one to group templates you want to come back to.</div>`;
  sheet({
    title: 'Save to collection', html: `<div style="display:flex;flex-direction:column;padding-bottom:4px">${rows}
    <div style="height:1px;background:rgba(255,255,255,.08);margin:4px 0"></div>
    <button class="row" style="min-height:64px;padding:0" data-act="newCol" data-t="${tplId}"><span style="width:56px;height:56px;border-radius:12px;flex:none;border:1.5px dashed rgba(255,255,255,.3);display:flex;align-items:center;justify-content:center;color:var(--lime);font-size:20px">${ic('plus')}</span>
    <span style="flex:1"><span class="shs" style="display:block">Create new collection</span><span class="fns n5">Group templates for quick revisits</span></span></button></div>`
  });
}
ACT.toggleCol = el => { const c = colById(el.dataset.c), t = el.dataset.t; closeSheet();
  if (c.items.includes(t)) { c.items.splice(c.items.indexOf(t), 1); setTimeout(() => toast(`Removed from ${c.name}`, { icon: '' }), 300); }
  else { c.items.unshift(t); setTimeout(() => toast(`Saved to ${c.name}`, { icon: BMI, pos: 'bottom', act: 'View', fn: () => go('collection', { id: c.id }) }), 300); } };

/* 02b / 08 · New collection & rename (02c duplicate) */
ACT.newCol = el => nameSheet({ mode: 'new', tpl: el.dataset.t || '' });
function nameSheet({ mode, id, tpl }) {
  const c = id && colById(id); const init = c ? c.name : '';
  const s = sheet({
    title: mode === 'new' ? 'New collection' : 'Rename collection', html: `<div style="display:flex;flex-direction:column;gap:8px;padding-bottom:8px">
    <div class="tf" style="display:flex;align-items:center;gap:8px;height:52px;border-radius:16px;box-shadow:inset 0 0 0 1.5px var(--lime)"><input id="cname" value="${esc(init)}" placeholder="e.g. Summer trip" maxlength="30" style="flex:1;min-width:0;background:none;border:0;outline:0;color:#fff;font:inherit;font-size:17px"><span class="cnt" style="font-size:13px;color:rgba(255,255,255,.5)">${init.length}/30</span><button class="clr" style="width:18px;height:18px;border-radius:50%;background:rgba(255,255,255,.5);color:#000;display:flex;align-items:center;justify-content:center;font-size:8px">${ic('close')}</button></div>
    <div class="chint" style="display:flex;align-items:center;gap:8px;padding:0 0 0 0;font-size:13px;color:rgba(255,255,255,.5)">${tpl && T[tpl] ? `<img src="${IMG(T[tpl].img)}" style="width:28px;height:28px;border-radius:6px;object-fit:cover" alt=""><span>${T[tpl].name} will be added to this collection</span>` : ''}<span class="msg"></span></div>
    <button class="btn glass ${init ? 'prom' : 'dis'} cgo" style="height:50px;margin-top:8px">${mode === 'new' ? (tpl ? 'Create & save' : 'Create') : 'Save'}</button></div>`
  });
  const i = s.querySelector('#cname'), b = s.querySelector('.cgo'), tf = s.querySelector('.tf'), msg = s.querySelector('.msg'); s.querySelector('.clr').onclick = () => { i.value = ''; i.oninput(); i.focus(); };
  const dup = v => S.collections.some(x => x !== c && x.name.toLowerCase() === v.toLowerCase());
  const check = () => { const v = i.value.trim(); const d = v && dup(v); s.querySelector('.cnt').textContent = i.value.length + '/30'; tf.classList.toggle('err', !!d); tf.style.boxShadow = d ? 'inset 0 0 0 1.5px var(--red)' : 'inset 0 0 0 1.5px var(--lime)'; msg.innerHTML = d ? `<span class="red">You already have a collection named “${esc(v)}”.</span>` : ''; const ok = v && !d && v !== init; b.classList.toggle('dis', !ok); b.classList.toggle('prom', !!ok); return ok; };
  i.oninput = check; setTimeout(() => { i.focus(); i.select(); }, 350);
  i.onkeydown = e => { if (e.key === 'Enter') b.click(); };
  b.onclick = () => { if (!check()) return; const v = i.value.trim(); closeSheet();
    if (mode === 'rename') { c.name = v; setTimeout(() => { rerender(); toast(`Renamed to “${v}”`); }, 300); return; }
    const nc = { id: 'c' + Date.now(), name: v, items: tpl ? [tpl] : [] }; S.collections.push(nc);
    setTimeout(() => { if (tpl) toast(`Saved to ${v}`, { icon: BMI, pos: 'bottom', act: 'View', fn: () => go('collection', { id: nc.id }) }); else { rerender(); toast(`Created “${v}”`); } }, 300); };
}
