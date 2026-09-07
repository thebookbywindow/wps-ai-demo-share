const assert = require('node:assert/strict');
const fs = require('node:fs');

const source = fs.readFileSync('templates-inner.html', 'utf8');

assert.match(source, /\.gallery-fixed-five \.template-detail-thumbs\{display:grid;/);
assert.match(source, /function ensureGalleryPlaceholders\(\)/);
assert.match(source, /template-detail-thumb is-placeholder/);
assert.match(source, /\.gallery-fixed-five \.template-detail-thumb\.is-placeholder\{border:1px solid #e8ecf2;background:#f7f8fb;/);
assert.doesNotMatch(source, /\.gallery-fixed-five \.template-detail-thumb\.is-placeholder::before/);
assert.doesNotMatch(source, /\.gallery-fixed-five \.template-detail-thumb\.is-placeholder::after/);
assert.match(source, /\.gallery-size-1 \.template-detail-main-preview\{height:auto;/);
assert.match(source, /\.gallery-size-1 \.template-detail-caption\{position:absolute;/);
assert.match(source, /\.gallery-size-1 \.template-detail-caption strong\{display:block\}/);
assert.match(source, /\.gallery-size-1 #templateDetailCounter\{display:block\}/);
assert.match(source, /querySelectorAll\('\.template-detail-thumb:not\(\.is-placeholder\)'\)\.length/);
assert.match(source, /function openTemplatePreviewLightbox\(\)/);
assert.match(source, /if \(!source\) return;/);
assert.doesNotMatch(source, /!document\.querySelector\('\.gallery-size-1'\)/);
assert.match(source, /event\.target\.closest\('\.template-detail-gallery #templateDetailSlide'\)/);
assert.match(source, /document\.addEventListener\('keydown'/);
assert.match(source, /template-detail-back-icon/);
assert.match(source, /Back to Templates/);
assert.match(source, /template-detail-back-icon.*<svg/);
assert.match(source, /viewBox="0 0 16 16"/);
assert.doesNotMatch(source, /template-detail-back-icon.*&#8592;/);

console.log('template gallery contract passed');
