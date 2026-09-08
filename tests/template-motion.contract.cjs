const assert = require('node:assert/strict');
const fs = require('node:fs');

const source = fs.readFileSync('templates-inner.html', 'utf8');

assert.match(source, /<video class="hero-background-video" muted loop playsinline preload="none"/);
assert.doesNotMatch(source, /<video class="hero-background-video" autoplay/);
assert.ok(source.includes('.hero-background-video{display:none!important;'));

console.log('template motion contract passed');
