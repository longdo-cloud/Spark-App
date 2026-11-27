#!/usr/bin/env bash
# Rebuilds index.html from the source parts in src/
set -e
cd "$(dirname "$0")"
{
  printf '<!doctype html>\n<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="theme-color" content="#0b0b0f">\n'
  cat src/spark.html src/p2.css.html src/p3.html src/p4a.js.html src/p4b.js.html src/p4c.js.html src/p4e.js.html src/p4d.js.html
  printf '\n</body></html>\n'
} > index.tmp
python3 - <<'P'
s=open('index.tmp').read();i=s.find('</style>')+len('</style>')
open('index.html','w').write(s[:i]+'\n</head><body>\n'+s[i:])
P
rm index.tmp
echo "index.html rebuilt"
