// usage: node shot.js out.png "js to run before" [w h]
const { chromium } = require('playwright');
(async () => {
  const [out, pre = '', wait = '900'] = process.argv.slice(2);
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 402, height: 874 }, deviceScaleFactor: 1 });
  const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  await p.goto('file://' + __dirname + '/../index.html'); await p.waitForTimeout(600);
  if (pre) { for (const step of pre.split(';;')) { await p.evaluate(step); await p.waitForTimeout(+wait); } }
  await p.screenshot({ path: out }); if (errs.length) console.log('ERR', errs.slice(0, 5).join('\n')); await b.close();
})();
