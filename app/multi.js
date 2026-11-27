// node multi.js out.png  'label|js;;js' ...  -> montage
const { chromium } = require('playwright'); const fs=require('fs');
(async()=>{const [out,...cases]=process.argv.slice(2);const b=await chromium.launch();const files=[];
for(const [k,c] of cases.entries()){const p=await b.newPage({viewport:{width:402,height:874}});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load/.test(m.text()))errs.push(m.text())});
await p.goto('file://'+__dirname+'/../index.html');await p.waitForTimeout(400);
for(const s of c.split(';;')){if(s.startsWith('w')&&/^w\d+$/.test(s)){await p.waitForTimeout(+s.slice(1));continue;}await p.evaluate(s);await p.waitForTimeout(700);}
const f=`/tmp/m${k}.png`;await p.screenshot({path:f});files.push(f);if(errs.length)console.log(k,'ERR',errs.slice(0,3).join(' | '));await p.close();}
await b.close();const {execSync}=require('child_process');
execSync(`python3 -c "
from PIL import Image;import sys
fs=sys.argv[1:];ims=[Image.open(f) for f in fs];W=402;H=874;n=len(ims);cols=min(n,5);rows=(n+cols-1)//cols
S=Image.new('RGB',(cols*W+(cols-1)*8,rows*H+(rows-1)*8),'#444')
for i,im in enumerate(ims):S.paste(im,((i%cols)*(W+8),(i//cols)*(H+8)))
S=S.resize((S.width//2,S.height//2));S.save('${out}')" ${files.join(' ')}`);})();
