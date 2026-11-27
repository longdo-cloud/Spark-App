/* Flow · Tools tab → Hairstyle — Figma 1030:42222 (02 Hairstyle detail; 03–09 reuse the shared create flow with T.wolf) */
const HAIR_PRESETS = ['Pixie Cut', 'Bob', 'Wolf Cut', 'Beach Waves', 'Curtain Bangs', 'Space Buns'];
S.hairPreset = 'Wolf Cut';
SCREENS.hairDetail = () => {
  const cur = S.hairPreset;
  return {
    html: `<div id="hba" class="abs" style="left:0;top:0;width:402px;height:660px;overflow:hidden;touch-action:pan-y">
      <img src="${IMG('3e95598550')}" alt="" style="position:absolute;left:3px;top:0;width:402px;height:660px;object-fit:cover">
      <div class="hb-clip abs" style="left:0;top:0;width:178px;height:664px;overflow:hidden"><img src="${IMG('347b928c97')}" alt="" style="position:absolute;left:0;top:0;width:402px;height:672px;object-fit:cover"></div>
      <div class="abs" style="left:0;top:0;width:100%;height:140px;background:linear-gradient(rgba(0,0,0,.6),transparent)"></div>
      <div class="abs" style="left:0;top:487px;width:100%;height:173px;background:linear-gradient(rgba(10,10,13,0),#0a0a0d)"></div>
      <span class="abs shs" style="left:16px;top:484px;height:26px;padding:0 12px;border-radius:1000px;background:rgba(0,0,0,.09);display:flex;align-items:center;font-size:13px">Before</span>
      <span class="abs shs" style="left:330px;top:484px;height:26px;padding:0 12px;border-radius:1000px;background:rgba(0,0,0,.09);display:flex;align-items:center;font-size:13px">After</span>
      <i class="hb-line abs" style="left:177px;top:-6px;width:2px;height:672px;background:rgba(255,255,255,.36)"></i>
      <span class="hb-handle abs circ glass" style="left:157px;top:301px;width:44px;height:44px;font-size:18px">${ic('lr')}</span></div>
    <div class="abs" style="left:0;top:746px;width:100%;height:128px;background:linear-gradient(rgba(10,10,12,0),#0a0a0c 40%)"></div>
    <div class="tb">${backBtn()}</div>
    <div class="abs" style="left:16px;top:544px;width:370px;height:202px;border-radius:24px;background:rgba(255,255,255,.08);-webkit-backdrop-filter:blur(24px);backdrop-filter:blur(24px);overflow:hidden">
      <div style="display:flex;align-items:center;padding:16px 16px 0 18px"><div style="flex:1"><div style="font-size:22px;line-height:28px;font-weight:700">Hairstyle</div><div style="font-size:13px;line-height:18px;color:rgba(255,255,255,.7)">Preview a new cut before the salon</div></div>
        <button class="circ s glass" data-act="hairSave" aria-label="Save" style="width:44px;height:44px">${ic(S.bookmarks.has('wolf') ? 'bookmarkf' : 'bookmark')}</button></div>
      <div class="hscroll" style="gap:12px;padding:16px 16px 0;margin-top:0">${HAIR_PRESETS.map(p => `<button class="press" data-act="hairPick" data-v="${p}" style="width:72px;flex:none;display:flex;flex-direction:column;gap:6px;align-items:center">
        <span style="width:72px;height:88px;border-radius:16px;overflow:hidden;display:block;position:relative"><img src="${IMG('2b00d32991')}" alt="" style="width:100%;height:100%;object-fit:cover">${p === cur ? '<i style="position:absolute;inset:0;border-radius:16px;box-shadow:inset 0 0 0 2.5px var(--lime)"></i>' : ''}</span>
        <span style="font-size:12px;line-height:16px;font-weight:700;color:${p === cur ? '#fff' : '#a3a3a3'};white-space:nowrap">${p}</span></button>`).join('')}</div></div>
    <button class="btn glass prom abs" style="left:16px;top:762px;width:370px;height:50px;font-weight:500;gap:8px" data-act="hairUse"><span style="font-size:18px;display:flex">${ic('sparkles')}</span>Use This Style</button>`,
    mount(el) {
      const ba = el.querySelector('#hba'), clip = el.querySelector('.hb-clip'), ln = el.querySelector('.hb-line'), hd = el.querySelector('.hb-handle');
      const set = x => { x = Math.max(24, Math.min(378, x)); clip.style.width = x + 'px'; ln.style.left = (x - 1) + 'px'; hd.style.left = (x - 22) + 'px'; };
      const scale = () => ba.getBoundingClientRect().width / 402; let drag = false;
      hd.addEventListener('pointerdown', e => { drag = true; hd.setPointerCapture(e.pointerId); });
      hd.addEventListener('pointermove', e => { if (drag) set((e.clientX - ba.getBoundingClientRect().left) / scale()); });
      hd.addEventListener('pointerup', () => drag = false);
    }
  };
};
ACT.hairstyle = () => go('hairDetail');
ACT.hairPick = el => { S.hairPreset = el.dataset.v; const sc = stack[stack.length - 1].el.querySelector('.hscroll').scrollLeft; rerender(); stack[stack.length - 1].el.querySelector('.hscroll').scrollLeft = sc; };
ACT.hairSave = el => { if (S.bookmarks.has('wolf')) { S.bookmarks.delete('wolf'); toast('Removed from Saved', { icon: BMO, pos: 'bottom' }); } else { S.bookmarks.add('wolf'); toast('Saved', { icon: BMI, pos: 'bottom' }); } el.innerHTML = ic(S.bookmarks.has('wolf') ? 'bookmarkf' : 'bookmark'); };
ACT.hairUse = () => { T.wolf.name = S.hairPreset; go('create', { id: 'wolf' }); };
