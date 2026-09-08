const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const dist = path.join(process.cwd(), 'dist');
const iframe = fs.readFileSync(path.join(dist, 'templates-inner.html'), 'utf8');
const detail = path.join(
  dist,
  'en-us',
  'resources',
  'templates',
  'documents',
  'annual-business-report-template',
  'index.html'
);

assert.doesNotMatch(iframe, /<video class="hero-background-video"/);
assert.doesNotMatch(iframe, /hero-background-loop\.mp4/);
assert.ok(fs.existsSync(detail), 'detail route must have a real static index.html');

console.log('static pages contract passed');
