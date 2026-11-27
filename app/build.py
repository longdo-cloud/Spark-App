#!/usr/bin/env python3
"""Build dist/index.html from src/. Usage: python3 build.py"""
import json,os,re
os.chdir(os.path.dirname(os.path.abspath(__file__)))
icons=open('src/icons.json').read()
css=open('src/base.css').read()+''.join(open('src/'+f).read() for f in sorted(os.listdir('src')) if f.endswith('.css') and f!='base.css')
order=['core.js','tabs.js','flow.js','profile.js','bookmarks.js','main.js']
js='\n'.join(open('src/'+f).read() for f in order if os.path.exists('src/'+f)).replace('__ICONS__',icons).replace('__FIG__',open('src/figicons.json').read())
html=open('src/shell.html').read().replace('/*CSS*/',css).replace('/*JS*/',js)
open('../index.html','w').write(html)
print('index.html',len(html)//1024,'KB')
