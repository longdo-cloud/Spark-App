/* Profile → Credits & Account — Figma 1222:114910 */
const BIGCOIN = 'img/bigcoin.png';
const PRO = { used: 3190, total: 4000, weekly: 9, reset: 'Dec 16, 2026' };
const fmt = n => n.toLocaleString('en-US');
const chevR = `<span class="r">${ic('chev')}</span>`;
const valR = v => `<span class="r">${v} ${ic('chev')}</span>`;

function creditsCard() {
  const bg = `background:radial-gradient(70% 60% at 90% 0%,rgba(190,180,230,.45),transparent 70%),radial-gradient(80% 70% at 10% 100%,rgba(120,80,200,.45),transparent 70%),linear-gradient(160deg,#2b2638,#1c1828 60%,#2a1f45)`;
  const stars = [[300, 30], [250, 70], [60, 110], [330, 120], [190, 20]].map(([x, y]) => `<i style="position:absolute;left:${x}px;top:${y}px;width:2px;height:2px;border-radius:1px;background:rgba(255,255,255,.7)"></i>`).join('');
  if (S.pro) {
    const pct = 76;
    return `<div style="position:relative;margin:20px 3px 0;border-radius:28px;padding:25px 21px 25px;${bg};box-shadow:inset 0 0 0 1px rgba(255,255,255,.12)">
      <div style="position:absolute;inset:0;border-radius:28px;overflow:hidden;pointer-events:none">${stars}<img src="img/prostar.png" alt="" style="position:absolute;right:0;top:0;width:108px;height:78px;-webkit-mask:radial-gradient(90% 90% at 70% 20%,#000 55%,transparent);mask:radial-gradient(90% 90% at 70% 20%,#000 55%,transparent)"></div>
      <div style="position:relative;font-size:20px;line-height:25px;font-weight:600">Credits</div><div style="position:relative;font-size:13px;line-height:18px;color:rgba(255,255,255,.6);margin-top:4px;white-space:nowrap">You’re on an active <b style="color:#fff;font-weight:600">Spark Pro</b> plan.<br>Credits renew monthly.</div>
      <div style="display:flex;justify-content:space-between;margin-top:12px;font-size:13px;line-height:18px"><span>Current session</span><b style="font-weight:600">${pct}% used</b></div>
      <div style="display:flex;align-items:center;gap:8px;margin-top:12px;height:41px"><img src="img/coin.png" style="width:36px;height:36px" alt=""><span style="font-size:34px;font-weight:700;letter-spacing:-.4px">${fmt(PRO.used)}</span><span style="margin-left:auto;font-size:17px;color:rgba(255,255,255,.6)">${fmt(PRO.total)}</span></div>
      <div style="height:8px;border-radius:4px;background:rgba(255,255,255,.12);margin-top:12px;overflow:hidden"><i style="display:block;height:100%;width:${pct}%;border-radius:4px;background:linear-gradient(90deg,#efcbea,#cecbf4,#cdefda,#f6f3cb)"></i></div>
      <div style="display:flex;justify-content:space-between;margin-top:12px;font-size:13px;line-height:18px;color:rgba(255,255,255,.6)"><span>Weekly limits</span><span>Resets</span></div>
      <div style="display:flex;justify-content:space-between;font-size:15px;line-height:20px;font-weight:600"><span>${PRO.weekly}% used</span><span>${PRO.reset}</span></div>
      <button class="btn glass pastel" style="height:46px;margin-top:24px;font-weight:600" data-act="coins">${ic('plus')} Get more coins</button>
      <div style="text-align:center;font-size:13px;line-height:18px;color:rgba(255,255,255,.6);margin-top:12px">8,000 credits for $49.99</div><button style="display:block;margin:4px auto 0;text-decoration:underline;font-size:13px;font-weight:600" data-act="coins">See all options</button></div>`;
  }
  const c = S.coins; const low = c > 0 && c < 120;
  const sub = c === 0 ? 'You\'re out of coins. Go Pro with 4,000 coins refill every month.' : low ? 'Running low. Go Pro with 4,000 coins refill every month.' : 'You\'re on the Free plan.<br>Go Pro for 4,000 credits/month';
  const hint = c === 0 ? 'Go Pro for 4,000 coins a month — about 8 videos or 50 photos.' : low ? 'Only enough for 2 photos. Videos need more coins.' : 'Enough for about 1 video or 6 photos';
  return `<div style="position:relative;margin:24px 1px 0;border-radius:28px;padding:21px 21px 21px;${bg};box-shadow:inset 0 0 0 1px rgba(255,255,255,.12)">
    <div style="position:absolute;inset:0;border-radius:28px;overflow:hidden;pointer-events:none">${stars}</div>
    <img src="${BIGCOIN}" alt="" style="position:absolute;left:217px;top:-24px;width:137px;height:137px">
    <div style="position:relative;font-size:20px;line-height:25px;font-weight:600">Credits</div><div style="position:relative;font-size:13px;line-height:18px;color:rgba(255,255,255,.6);margin-top:4px;width:194px">${sub}</div>
    <div style="margin-top:12px;display:flex;align-items:baseline;gap:4px;height:41px"><span style="font-size:34px;line-height:41px;font-weight:700">${fmt(c)}</span><span style="font-size:15px;color:rgba(255,255,255,.7)">coins</span></div>
    <div style="font-size:15px;line-height:20px;font-style:italic;color:rgba(255,255,255,.85);margin-top:8px">${hint}</div>
    <button class="btn glass pastel" style="height:46px;margin-top:36px;font-weight:600" data-act="paywall">${ic('sparkles')} Go Pro</button></div>`;
}
SCREENS.profile = () => {
  const head = S.signedIn
    ? `<button data-act="editProfile" style="display:flex;flex-direction:column;align-items:center;width:100%;height:172px"><img src="${IMG(S.avatar || AVATAR)}" style="width:88px;height:88px;border-radius:50%;object-fit:cover;background:#f5c518" alt="">
       <div style="display:flex;align-items:center;gap:8px;margin-top:12px;height:28px"><span style="font-size:22px;font-weight:700">${S.profile.name}</span><span class="pill" style="height:26px;padding:0 10px;font-size:15px;font-weight:600;${S.pro ? 'background:linear-gradient(90deg,#efcbea,#cdefda);color:#000' : 'background:rgba(255,255,255,.12);color:#fff;box-shadow:inset 0 0 0 .5px rgba(255,255,255,.3)'}">${S.pro ? 'Pro' : 'Free'}</span></div>
       <span style="display:flex;align-items:center;gap:4px;margin-top:8px;font-size:15px;color:rgba(255,255,255,.6)">@${S.profile.user} <span style="font-size:13px">${ic('pencil')}</span></span></button>`
    : `<button data-act="signIn" style="display:flex;flex-direction:column;align-items:center;width:100%;height:172px"><span style="width:88px;height:88px;border-radius:50%;background:#3a3a3c;display:flex;align-items:flex-end;justify-content:center;overflow:hidden"><svg width="88" height="88" viewBox="0 0 88 88"><circle cx="44" cy="35" r="16" fill="#8e8e93"/><path d="M12 88c2-20 16-30 32-30s30 10 32 30z" fill="#8e8e93"/></svg></span>
       <span style="font-size:20px;font-weight:700;margin-top:20px">Tap to sign in</span><span style="font-size:15px;color:rgba(255,255,255,.6);margin-top:4px">to save your creations and templates</span></button>`;
  const sec = (t, rows) => `<div style="display:flex;flex-direction:column;gap:12px"><div style="font-size:17px;line-height:22px;font-weight:600">${t}</div><div class="grp noic" style="border-radius:20px">${rows}</div></div>`;
  return {
    html: `<div class="scroll"><div style="padding:122px 16px 100px">${head}${creditsCard()}
      <div style="display:flex;flex-direction:column;gap:24px;margin-top:${S.pro ? 20 : 24}px">
      ${sec('Preferences', `<button class="row" data-act="lang">App language${valR('English')}</button><button class="row" data-act="notif">Notification${chevR}</button><button class="row" data-act="coinHistory">Coin history${chevR}</button><button class="row" data-act="shareApp">Share the app${chevR}</button><button class="row" data-act="deleteData">Delete my data${chevR}</button>`)}
      ${sec('Feedback & about', `<button class="row" data-act="soon">Help Center${chevR}</button><button class="row" data-act="soon">Trust Center${chevR}</button><button class="row" data-act="soon">Terms and Policies${chevR}</button><button class="row" data-act="clearCache">Clear cache<span class="r cache">2 MB</span></button><div class="row">Version<span class="r">1.0.0</span></div>`)}
    </div></div></div><div class="abs" style="left:0;top:0;width:100%;height:120px;background:linear-gradient(#000 60%,transparent);pointer-events:none;z-index:29"></div>
    <div class="tb">${backBtn()}<span class="sp"></span>${S.signedIn && S.pro ? `<button class="circ s glass" data-act="editProfile" aria-label="Settings">${ic('gearo')}</button>` : ''}</div>`
  };
};
ACT.lang = () => sheet({ title: 'App language', html: `<div class="grp noic">${['English', 'Tiếng Việt', '日本語', 'Español', 'Português'].map((l, i) => `<button class="row" data-act="closeSheet">${l}${i ? '' : `<span class="r" style="color:var(--lime)">${ic('check')}</span>`}</button>`).join('')}</div>` });
ACT.notif = () => sheet({ title: 'Notification', html: `<div class="grp noic"><div class="row">When a creation is ready<span class="r"><button class="tog on" onclick="this.classList.toggle('on')"></button></span></div><div class="row">New templates<span class="r"><button class="tog" onclick="this.classList.toggle('on')"></button></span></div><div class="row">Offers & gifts<span class="r"><button class="tog" onclick="this.classList.toggle('on')"></button></span></div></div>` });
ACT.shareApp = () => ACT.more();
ACT.clearCache = el => { el.querySelector('.cache').textContent = '0 KB'; toast('Cache cleared'); };
ACT.deleteData = () => alertBox({ title: 'Delete my data?', msg: 'This removes your creations, uploads and saved templates from Spark. It can’t be undone.', acts: [{ t: 'Delete', cls: 'des', fn: () => toast('Your data will be deleted within 24 hours', { icon: '' }) }, { t: 'Cancel' }] });

/* Sign in sheet (01c) */
ACT.signIn = () => sheet({
  title: 'Sign in', right: '', left: `<button class="circ s glass" data-act="closeSheet">${ic('close')}</button>`, html: `<div style="display:flex;flex-direction:column;gap:12px;padding-bottom:8px">
  <div class="sh ctr n5" style="padding:0 8px 4px">Save your creations, coins and Pro plan across devices.</div>
  <button class="btn" style="background:#fff;color:#000" data-act="doSignIn">${ic('apple')} Continue with Apple</button>
  <button class="btn glass" data-act="doSignIn">${ic('google')} Continue with Google</button>
  <div class="fns ctr n5" style="padding:4px 8px 0">By continuing you agree to Spark’s Terms and Privacy Policy. Coins on this device will move to your account.</div></div>`
});
ACT.doSignIn = () => { closeSheet(); S.signedIn = true; setTimeout(() => { rerender(); toast(`Signed in as ${S.profile.name}`); }, 300); };

/* Coin history (03 / 03a) */
const HIST = [['TODAY', [['Neon Corridor', 'Video', '11:42 AM', -120, '3188779628'], ['Coin pack · 2000', 'Purchase', '8:05 PM', 2000, 'cart'], ['Renew · Monthly Plan', 'Renew', '8:05 PM', 500, 'retry'], ['Lavender Birthday', 'Image', '10:15 AM', -40, '0e4cddc53b'], ['Color Change', 'Photo', '9:03 AM', -30, '8495a865f8']]],
['NOV 24, 2026', [['Neon Corridor', 'Video', '11:42 AM', -120, '3188779628'], ['Refund · Failed render', 'Photo', '8:05 PM', 40, 'refund']]]];
SCREENS.coinHistory = ({ filter = 'All' } = {}) => {
  const empty = !S.signedIn || (!S.pro && S.coins === 480 && !S.spent);
  const row = ([n, k, t, d, im]) => { const isImg = /^[0-9a-f]{10}$/.test(im);
    return `<div style="height:84px;display:flex;align-items:center;gap:12px;padding:0 16px 0 12px;position:relative">${isImg ? `<span style="width:44px;height:60px;border-radius:8px;overflow:hidden;flex:none"><img src="${IMG(im)}" style="width:100%;height:100%;object-fit:cover" alt=""></span>` : `<span style="width:44px;height:44px;border-radius:10px;background:rgba(255,255,255,.09);flex:none;display:flex;align-items:center;justify-content:center;color:var(--lime);font-size:19px">${ic(im)}</span>`}
    <span style="flex:1;min-width:0"><span style="display:block;font-size:17px;line-height:22px;font-weight:600">${n}</span><span style="font-size:13px;line-height:18px;color:rgba(255,255,255,.6)">${k} | ${t}</span></span><span style="display:flex;align-items:center;gap:4px;font-size:17px;font-weight:600;color:${d > 0 ? 'var(--green)' : '#fff'}">${d > 0 ? '+' + d : '−' + Math.abs(d)}<img src="img/coin.png" style="width:24px;height:24px" alt=""></span></div>`; };
  const list = HIST.map(([h, items]) => { const f = items.filter(i => filter === 'All' || (filter === 'Spent' ? i[3] < 0 : i[3] > 0)); return f.length ? `<div style="margin-top:20px;font-size:13px;line-height:18px;font-weight:600;color:rgba(255,255,255,.6)">${h}</div><div style="margin-top:12px;border-radius:20px;background:rgba(255,255,255,.09);overflow:hidden">${f.map(row).join('<div style="height:1px;margin:0 16px 0 12px;background:rgba(255,255,255,.08)"></div>')}</div>` : ''; }).join('');
  const body = empty ? `<div style="display:flex;flex-direction:column;align-items:center;text-align:center;gap:8px;padding:96px 24px 0"><img src="img/ee471ee025.jpg" style="width:120px;height:120px;mix-blend-mode:screen" alt=""><div class="t3" style="margin-top:8px">No activity yet</div><div class="sh n5">Coins you use or add will show up here. Start creating and they’ll appear in this list.</div><button class="btn glass prom m" style="width:auto;padding:0 24px;margin-top:16px" data-act="startCreating">Start creating</button></div>`
    : `${S.pro ? `<div style="border-radius:28px;padding:20px;background:radial-gradient(90% 80% at 85% 10%,rgba(120,90,200,.55),transparent 60%),linear-gradient(160deg,#2a2440,#191626 70%)">
        <div class="fns" style="display:flex;justify-content:space-between"><span style="color:rgba(255,255,255,.7)">Current session</span><b>76% used</b></div>
        <div style="display:flex;align-items:center;gap:8px;margin-top:8px"><img src="img/coin.png" style="width:32px;height:32px" alt=""><span style="font-size:34px;font-weight:800">3,190</span><span class="sh n5" style="margin-left:auto">4,000</span></div>
        <div style="height:6px;border-radius:3px;background:rgba(255,255,255,.12);margin-top:10px"><i style="display:block;height:100%;width:76%;border-radius:3px;background:linear-gradient(90deg,#efcbea,#cecbf4,#cdefda,#f6f3cb)"></i></div>
        <div class="fns" style="display:flex;justify-content:space-between;margin-top:12px;color:rgba(255,255,255,.7)"><span>Weekly limits</span><span>Resets</span></div><div class="shs" style="display:flex;justify-content:space-between"><span>9% used</span><span>Dec 16, 2026</span></div>
        <button class="btn glass pastel" style="height:50px;margin-top:16px" data-act="coins">${ic('plus')} Get more coins</button></div>` : ''}
      <div class="seg" style="margin-top:20px;height:40px;padding:2px;gap:4px">${['All', 'Spent', 'Added'].map(f => `<button style="flex:1;height:36px;${f === filter ? 'background:#fff;color:#000;font-size:15px' : 'font-size:13.3px;color:#fff;font-weight:500'}" class="${f === filter ? 'on' : ''}" data-act="histF" data-v="${f}">${f}</button>`).join('')}</div>${list}`;
  return { html: `<div class="scroll"><div style="padding:124px 16px 48px">${body}</div></div><div class="abs" style="left:0;top:0;width:100%;height:120px;background:linear-gradient(#000 60%,transparent);pointer-events:none;z-index:29"></div><div class="tb">${backBtn()}<div class="ttl">Coin history</div></div>` };
};
ACT.coinHistory = () => go('coinHistory', {});
ACT.histF = el => { stack[stack.length - 1].args.filter = el.dataset.v; rerender(); };
ACT.startCreating = () => reset('tab_video');

/* Edit profile (04 …) */
SCREENS.editProfile = () => {
  const p = S.profile;
  return {
    html: `<div class="scroll"><div style="padding:124px 16px 48px;display:flex;flex-direction:column;gap:24px">
    <div style="display:flex;flex-direction:column;align-items:center;gap:6px"><button data-act="setPic" style="position:relative;width:104px;height:104px;border-radius:50%;box-shadow:0 0 0 3px rgba(255,255,255,.85)"><img src="${IMG(S.avatar || AVATAR)}" style="width:100%;height:100%;border-radius:50%;object-fit:cover;background:#f5c518" alt=""><span class="circ xs" style="position:absolute;right:-6px;bottom:2px;background:#2c2c2e;box-shadow:0 0 0 3px #000">${ic('camera')}</span></button>
      <div style="display:flex;align-items:center;gap:8px;margin-top:10px"><span class="t2">${p.name}</span><span class="pill neu" style="color:#fff">${S.pro ? 'Pro' : 'Free'}</span></div><span class="sh n5">@${p.user}</span></div>
    <div class="grp noic">
      <button class="row" data-act="editField" data-k="name">Display name${valR(p.name)}</button>
      <button class="row" data-act="editField" data-k="user">Username${valR('@' + p.user)}</button>
      <button class="row" data-act="copyId">Spark ID<span class="r">7634100170 ${ic('doc')}</span></button>
      <button class="row" data-act="editField" data-k="bio">Bio${valR(p.bio || 'Add a bio')}</button>
      <button class="row" data-act="gender">Gender${valR(p.gender || "Don't display")}</button>
      <button class="row" data-act="birthday">Birthday${valR(p.bday || 'Add')}</button></div>
    <div style="display:flex;flex-direction:column;gap:12px"><button class="btn glass" data-act="switchAcc">Switch account</button><button class="btn glass" style="color:var(--red)" data-act="signOut">Sign out</button></div>
    </div></div><div class="tb">${backBtn()}<div class="ttl">Edit profile</div></div>`
  };
};
S.profile.gender = "Don't display"; S.profile.bday = '';
ACT.editProfile = () => { if (!S.signedIn) return ACT.signIn(); go('editProfile', {}); };
ACT.copyId = () => toast('Spark ID copied');
ACT.editField = el => {
  const k = el.dataset.k, p = S.profile; const lab = { name: 'Display name', user: 'Username', bio: 'Bio' }[k];
  const s = sheet({
    title: lab, right: `<button class="circ s glass prom" data-act="saveField" data-k="${k}">${ic('check')}</button>`, left: `<button class="circ s glass" data-act="closeSheet">${ic('close')}</button>`, html: `<div style="padding-bottom:8px">
    <div class="tf" style="display:flex;align-items:center;gap:4px">${k === 'user' ? '<span class="n5">@</span>' : ''}<input id="fld" value="${esc(p[k] || '')}" placeholder="${k === 'bio' ? 'Say something about you' : ''}" maxlength="${k === 'bio' ? 80 : 24}" style="flex:1;background:none;border:0;outline:0;color:#fff;font:inherit"></div>
    <div class="fns n5 fhint" style="padding:8px 4px 0">${k === 'user' ? 'Letters, numbers, dots and underscores. You can change it once every 30 days.' : k === 'name' ? 'This is how you appear in Spark.' : 'Up to 80 characters.'}</div></div>`
  });
  const i = s.querySelector('#fld'); setTimeout(() => i.focus(), 350);
  if (k === 'user') i.oninput = () => { const taken = ['spark', 'admin', 'susu'].includes(i.value.toLowerCase()); const bad = !/^[a-z0-9._]{3,24}$/i.test(i.value); s.querySelector('.tf').classList.toggle('err', taken || bad); s.querySelector('.fhint').innerHTML = taken ? `<span class="red">@${esc(i.value)} is taken. Try another.</span>` : bad ? '<span class="red">3–24 letters, numbers, dots or underscores.</span>' : `<span class="green">${ic('checkc')} @${esc(i.value)} is available</span>`; };
};
ACT.saveField = el => { const v = document.getElementById('fld').value.trim(); const k = el.dataset.k; if (el.closest('.sheet').querySelector('.tf.err') || (!v && k !== 'bio')) return; S.profile[k] = v; closeSheet(); setTimeout(() => { rerender(); toast('Profile updated'); }, 300); };
ACT.gender = () => sheet({ title: 'Gender', html: `<div class="grp noic">${['Female', 'Male', 'Non-binary', "Don't display"].map(g => `<button class="row" data-act="setGender" data-v="${g}">${g}${S.profile.gender === g ? `<span class="r" style="color:var(--lime)">${ic('check')}</span>` : ''}</button>`).join('')}</div>` });
ACT.setGender = el => { S.profile.gender = el.dataset.v; closeSheet(); setTimeout(rerender, 300); };
ACT.birthday = () => {
  const M = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const col = (arr, sel, k) => `<div class="wheel" data-k="${k}" style="flex:1;height:200px;overflow-y:auto;scroll-snap-type:y mandatory;scrollbar-width:none;padding:80px 0;text-align:center">${arr.map(v => `<div style="height:40px;line-height:40px;scroll-snap-align:center;font-size:20px" data-v="${v}">${v}</div>`).join('')}</div>`;
  const s = sheet({
    title: 'Birthday', left: `<button class="circ s glass" data-act="closeSheet">${ic('close')}</button>`, right: `<button class="circ s glass prom" data-act="saveBday">${ic('check')}</button>`, html: `<div style="position:relative;display:flex;gap:8px;padding:0 8px 16px;-webkit-mask:linear-gradient(transparent,#000 35%,#000 65%,transparent);mask:linear-gradient(transparent,#000 35%,#000 65%,transparent)">
    <div class="abs" style="left:0;right:0;top:80px;height:40px;border-radius:10px;background:var(--a100);pointer-events:none"></div>${col(M, 'August', 'm')}${col(Array.from({ length: 31 }, (_, i) => i + 1), 14, 'd')}${col(Array.from({ length: 60 }, (_, i) => 1960 + i), 2000, 'y')}</div>
    <div class="fns n5 ctr" style="padding-bottom:8px">Only you can see your birthday.</div>`
  });
  setTimeout(() => s.querySelectorAll('.wheel').forEach(w => { const k = w.dataset.k; const v = { m: 'August', d: '14', y: '2000' }[k]; const it = [...w.children].find(c => c.dataset.v == v); w.scrollTop = it.offsetTop - 80; }), 30);
};
ACT.saveBday = el => { const s = el.closest('.sheet'); const pick = k => { const w = s.querySelector(`.wheel[data-k=${k}]`); return w.children[Math.round(w.scrollTop / 40)].dataset.v; }; S.profile.bday = `${pick('m').slice(0, 3)} ${pick('d')}, ${pick('y')}`; closeSheet(); setTimeout(rerender, 300); };
ACT.setPic = () => sheet({
  title: 'Profile picture', html: `<div style="display:flex;flex-direction:column;gap:16px;padding-bottom:12px">
  <div style="display:flex;gap:12px">${[['camera', 'Take a photo'], ['library', 'Choose photo']].map(([i, l]) => `<button class="press" data-act="pickPic" data-v="${SELFIE2}" style="flex:1;height:56px;border-radius:20px;background:var(--a100);display:flex;align-items:center;gap:12px;padding:0 16px"><span class="icbox" style="width:24px;height:24px;font-size:20px">${ic(i)}</span><span class="shs">${l}</span></button>`).join('')}</div>
  <div class="hl">Recent</div><div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px">${['34e7b56b89', '31dbb12d8b', 'd74e5168ca', 'bd760bddc5', 'e05ffa8a60', 'c8e5d0019a', 'caa1d9aba8', 'fde6191389'].map(h => `<button data-act="pickPic" data-v="${h}" style="aspect-ratio:1;border-radius:50%;overflow:hidden"><img src="${IMG(h)}" style="width:100%;height:100%;object-fit:cover" alt=""></button>`).join('')}</div>
  <button class="btn glass" style="color:var(--red);height:50px" data-act="pickPic" data-v="">Remove current photo</button></div>`
});
ACT.pickPic = el => { S.avatar = el.dataset.v || ''; closeSheet(); setTimeout(() => { rerender(); toast('Profile picture updated'); }, 300); };
ACT.switchAcc = () => sheet({
  title: 'Switch account', html: `<div class="grp" style="margin-bottom:12px"><div class="row" style="min-height:64px"><img src="${IMG(AVATAR)}" style="width:40px;height:40px;border-radius:50%;background:#f5c518" alt=""><span style="flex:1"><span class="shs" style="display:block">${S.profile.name}</span><span class="fns n5">@${S.profile.user} · Apple</span></span><span class="r" style="color:var(--lime)">${ic('checkc')}</span></div>
  <button class="row" style="min-height:64px" data-act="otherAcc"><img src="${IMG('34e7b56b89')}" style="width:40px;height:40px;border-radius:50%;object-fit:cover" alt=""><span style="flex:1"><span class="shs" style="display:block">Linh Tran</span><span class="fns n5">@linh.tr · Google</span></span></button></div>
  <button class="btn glass" style="height:50px;margin-bottom:8px" data-act="signIn">${ic('plus')} Add account</button>`
});
ACT.otherAcc = () => { closeSheet(); toast('Switched to @linh.tr'); };
ACT.signOut = () => alertBox({ title: 'Sign out of Spark?', msg: 'Your creations stay safe in your account. Sign in again any time to see them.', acts: [{ t: 'Sign out', cls: 'des', fn: () => { S.signedIn = false; S.pro = false; back(); setTimeout(() => toast('Signed out', { icon: '' }), 450); } }, { t: 'Cancel' }] });

/* Refill credits (05) */
const PACKS = [[250, 25, '5.99', '≈ 10 images or 3 videos'], [500, 50, '11.99', '≈ 20 images or 6 videos'], [1000, 100, '23.99', '≈ 40 images or 12 videos', 1], [2500, 250, '59.99', '≈ 100 images or 31 videos'], [5000, 500, '119.99', '≈ 200 images or 62 videos']];
function raysBg() { return `<div class="abs" style="left:0;top:0;width:100%;height:560px;background:radial-gradient(60% 45% at 50% 34%,rgba(126,87,214,.75),transparent 70%),repeating-conic-gradient(from 0deg at 50% 30%,rgba(255,255,255,.05) 0 4deg,transparent 4deg 12deg),linear-gradient(180deg,#5b6b70 0%,#2b2440 40%,#000 100%);-webkit-mask:linear-gradient(#000 70%,transparent);mask:linear-gradient(#000 70%,transparent)"></div>`; }
SCREENS.refill = ({ sel = 2 } = {}) => ({
  html: `<div class="scroll">${raysBg()}<div style="position:relative;padding:92px 16px 40px;display:flex;flex-direction:column;align-items:center">
    <img src="${BIGCOIN}" class="coinspin" style="width:220px;height:220px" alt="">
    <div class="sh" style="color:rgba(255,255,255,.7);margin-top:24px">My current credits</div><div style="font-size:34px;font-weight:800;margin-top:4px">${fmt(S.coins)}</div>
    <div style="width:100%;display:flex;flex-direction:column;gap:12px;margin-top:24px">${PACKS.map(([c, b, p, d, pop], i) => `<button class="press" data-act="pack" data-i="${i}" style="height:64px;border-radius:20px;background:rgba(28,28,30,.9);display:flex;align-items:center;gap:12px;padding:0 16px;text-align:left;${i === sel ? 'box-shadow:inset 0 0 0 1.5px #e9f3c6,0 0 0 1px rgba(205,239,218,.35)' : ''}">
      <span class="cbx ${i === sel ? 'on' : ''}" style="${i === sel ? 'background:#fff' : ''}">${ic('check')}</span><span style="flex:1"><span style="font-size:17px;font-weight:600">${fmt(c)} <span style="color:var(--lime)">+${b}</span>${pop ? ' <span class="pill" style="height:18px;font-size:11px;background:linear-gradient(90deg,#efcbea,#cdefda);color:#000;vertical-align:2px">Popular</span>' : ''}</span><span class="fns n5" style="display:block">${d}</span></span><span style="font-size:17px;font-weight:700">$${p}</span></button>`).join('')}</div>
    <button class="btn glass pastel" style="margin-top:24px;height:50px" data-act="buyPack">Continue</button>
    <div class="fns n5" style="margin-top:12px">Credits valid for 1 year · <u>Privacy Policy</u></div></div></div>
    <div class="tb">${backBtn()}</div>`
});
ACT.pack = el => { stack[stack.length - 1].args.sel = +el.dataset.i; rerender(); };
ACT.buyPack = () => { const [c, b] = PACKS[stack[stack.length - 1].args.sel ?? 2]; const add = c + b; S.coins += add; S.spent = true; replace('topup', { add, c, b }, 'fade'); };

/* Top-up success (06b) */
SCREENS.topup = ({ add = 1100, c = 1000, b = 100 }) => ({
  html: `${raysBg()}<div class="tb">${backBtn()}</div>
  <div class="abs" style="left:0;right:0;top:100px;display:flex;flex-direction:column;align-items:center;text-align:center">
    <img src="${BIGCOIN}" class="coinpop" style="width:282px;height:282px" alt="">
    <div class="sh" style="color:rgba(255,255,255,.7);margin-top:24px">Purchase complete</div><div class="t1" style="margin-top:4px">+${fmt(add)} coins</div>
    <div class="fn" style="margin-top:24px">${fmt(c)} coins + ${b} bonus</div><div class="fn n5" style="margin-top:2px">New balance: ${fmt(S.coins)} coins · valid until Nov 27, 2027</div></div>
  <div class="abs" style="left:16px;right:16px;bottom:46px"><button class="btn glass pastel" style="height:54px" data-act="continueCreating">Continue creating</button>
  <div class="fns n5 ctr" style="margin-top:12px">View in · <button class="fns" style="color:#fff;text-decoration:underline;font-weight:700" data-act="histFromTopup">Coin history</button></div></div>`,
  mount() { burst(); }
});
function burst() { const p = $phone(); for (let i = 0; i < 26; i++) { const s = document.createElement('i'); s.className = 'confetti'; s.style.cssText = `left:${50 + (Math.random() - .5) * 20}%;top:30%;--dx:${(Math.random() - .5) * 360}px;--dy:${-80 - Math.random() * 260}px;background:${['#efcbea', '#cecbf4', '#cdefda', '#f6f3cb', '#f0fe65'][i % 5]};animation-delay:${Math.random() * .2}s`; p.appendChild(s); setTimeout(() => s.remove(), 1800); } }
ACT.continueCreating = () => { const i = stack.findIndex(s => s.name === 'create'); if (i >= 0) back(stack.length - 1 - i); else back(); };
ACT.histFromTopup = () => { S.signedIn = true; replace('coinHistory', {}); };

/* Paywall */
SCREENS.paywall = ({ sel = 1 } = {}) => ({
  html: `<div class="abs ba" style="left:0;top:0;width:402px;height:520px;overflow:hidden">
    <img src="${IMG('4acd41b598')}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:blur(1.4px) saturate(.7) contrast(.9)" alt="">
    <div class="baR" style="position:absolute;inset:0;clip-path:inset(0 0 0 50%)"><img src="${IMG('789eeedb44')}" style="width:100%;height:100%;object-fit:cover" alt=""></div>
    <div class="baL" style="position:absolute;top:0;bottom:0;left:50%;width:1px;background:rgba(255,255,255,.7)"><span class="circ xs glass" style="position:absolute;left:-18px;top:220px">${ic('lr')}</span></div>
    <span class="twk" style="left:300px;top:120px">✦</span><span class="twk" style="left:330px;top:170px;font-size:16px;animation-delay:.6s">✦</span><span class="twk" style="left:80px;top:300px;font-size:14px;animation-delay:1.1s">✦</span>
    <div class="abs" style="left:0;bottom:0;width:100%;height:220px;background:linear-gradient(transparent,#000)"></div></div>
  <div class="tb">${closeBtn()}</div>
  <div class="abs" style="left:16px;right:16px;top:430px"><div class="t2">Smart Enhance</div><div class="shs" style="margin-top:4px">Restore Any Photo Instantly!</div><div class="fn n5" style="margin-top:2px">Blur, noise, bad lighting — fixed to 4K</div>
    <div class="dots" style="margin-top:12px;gap:4px;display:flex"><i class="on" style="width:16px"></i><i></i><i></i><i></i><i></i></div></div>
  <div class="abs" style="left:16px;right:16px;top:556px;display:flex;flex-direction:column;gap:12px">${[['Weekly', '4,000 coins per week', '$39.99', '($0.77/week)', ''], ['Weekly', '4,000 coins per week', '$39.99', '($0.77/week)', 'First Week 80% OFF']].map(([a, b, p, q, tag], i) => `<button class="press" data-act="plan" data-i="${i}" style="position:relative;height:64px;border-radius:20px;background:rgba(28,28,30,.95);display:flex;align-items:center;gap:12px;padding:0 16px;text-align:left;${i === sel ? 'box-shadow:inset 0 0 0 1.5px #fff' : ''}">
    <span class="cbx ${i === sel ? 'on' : ''}" style="${i === sel ? 'background:#fff' : ''}">${ic('check')}</span><span style="flex:1"><span class="shs" style="display:block">${a}</span><span class="fns n5">${b}</span></span><span style="text-align:right"><span class="shs" style="display:block">${p}</span><span class="fns n5">${q}</span></span>
    ${tag ? `<span class="pill" style="position:absolute;right:12px;top:-10px;height:20px;font-size:11px;background:#fff;color:#000;font-weight:700">${tag}</span>` : ''}</button>`).join('')}</div>
  <div class="abs" style="left:16px;right:16px;top:716px"><button class="btn glass pastel" style="height:50px" data-act="claim">Claim offer</button>
    <div class="fns ctr" style="margin-top:10px;display:flex;align-items:center;justify-content:center;gap:4px"><img src="img/coin.png" style="width:16px;height:16px" alt="">Get 100 bonus Credits/month · Valid up to 31 days while VIP is active</div>
    <div class="ctr n6" style="font-size:10px;margin-top:6px">Contact Us · Privacy Policy · Restore Purchases</div></div>`,
  mount(el) { const R = el.querySelector('.baR'), L = el.querySelector('.baL'); let t = 0, drag = false; const set = x => { R.style.clipPath = `inset(0 0 0 ${x}%)`; L.style.left = x + '%'; };
    const box = el.querySelector('.ba'); const mv = e => { if (!drag) return; const r = box.getBoundingClientRect(); set(Math.max(5, Math.min(95, ((e.touches ? e.touches[0].clientX : e.clientX) - r.left) / r.width * 100))); };
    box.addEventListener('pointerdown', e => { drag = true; mv(e); }); addEventListener('pointermove', mv); addEventListener('pointerup', () => drag = false);
    el._iv = setInterval(() => { if (drag || !el.isConnected) return; t += .03; set(50 + Math.sin(t) * 22); }, 30); }
});
ACT.plan = el => { stack[stack.length - 1].args.sel = +el.dataset.i; rerender(); };
ACT.claim = () => { S.pro = true; S.signedIn = S.signedIn; S.coins += 4000; back(); setTimeout(() => toast('Welcome to Spark Pro', { icon: `<img src="img/crown.png" alt="" style="width:20px;height:20px">` }), 450); };
