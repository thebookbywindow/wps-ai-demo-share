const assert = require('node:assert/strict');
const fs = require('node:fs');

const source = fs.readFileSync('dist/templates-inner.html', 'utf8');

assert.doesNotMatch(source, /<video class="hero-background-video"/);
assert.doesNotMatch(source, /hero-background-loop\.mp4/);

console.log('template motion removal contract passed');
