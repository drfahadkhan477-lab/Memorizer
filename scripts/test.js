#!/usr/bin/env node
/* Runs Memorizer's suites: every tests/verify-memorizer*-pure.js, then (unless
   --pure) the browser suites. A suite passes only by exiting 0; a run that
   leaves suites out names them and never says "all passed". */
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const pureOnly = process.argv.includes('--pure');
const all = fs.readdirSync(path.join(ROOT, 'tests')).filter(f => /^verify-memorizer.*\.js$/.test(f)).sort();
const pure = all.filter(f => /-pure\.js$/.test(f));
const browser = all.filter(f => !/-pure\.js$/.test(f));
if (!pure.length) { console.error('no pure suites found — refusing to report a run of nothing'); process.exit(1); }

const failed = [];
for (const f of pureOnly ? pure : pure.concat(browser)) {
  const t = Date.now();
  const r = spawnSync(process.execPath, [path.join('tests', f)], { cwd: ROOT, encoding: 'utf8', maxBuffer: 64 << 20 });
  const ok = r.status === 0;
  if (!ok) failed.push(f);
  const s = ((Date.now() - t) / 1000).toFixed(1);
  console.log(`  ${ok ? 'PASS' : 'FAIL'}  ${f.padEnd(44)} ${s}s`);
  if (!ok) console.log(((r.stdout || '') + (r.stderr || '')).split('\n').filter(l => /FAIL|Error/.test(l)).slice(0, 5).map(l => '        ' + l).join('\n'));
}
const ran = pureOnly ? pure.length : all.length;
if (failed.length) console.log(`\n  ${failed.length} of ${ran} suites failed: ${failed.join(', ')}`);
else if (pureOnly) console.log(`\n  ${ran} pure suites passed. ${browser.length} browser suites NOT run: ${browser.join(', ')}`);
else console.log(`\n  all ${ran} suites passed.`);
process.exit(failed.length ? 1 : 0);
