const assert = require('node:assert/strict');
const fs = require('node:fs');

const source = fs.readFileSync('templates-inner.html', 'utf8');

assert.match(source, /\.gallery-fixed-five \.template-detail-thumbs\{display:grid;/);
assert.match(source, /function ensureGalleryPlaceholders\(\)/);
assert.match(source, /if \(realCount === 1\) return;/);
assert.match(source, /template-detail-thumb is-placeholder/);
assert.match(source, /\.gallery-fixed-five \.template-detail-thumb\.is-placeholder\{border:1px solid #e8ecf2;background:#f7f8fb;/);
assert.doesNotMatch(source, /\.gallery-fixed-five \.template-detail-thumb\.is-placeholder::before/);
assert.doesNotMatch(source, /\.gallery-fixed-five \.template-detail-thumb\.is-placeholder::after/);
assert.match(source, /\.gallery-size-1 \.template-detail-main-preview\{height:auto;/);
assert.match(source, /\.gallery-size-1 \.template-detail-slide\{width:100%;height:auto;aspect-ratio:4 \/ 3;/);
assert.match(source, /\.template-preview-lightbox \.template-detail-slide\{width:min\(92vw,1100px\);height:auto;aspect-ratio:4 \/ 3;/);
assert.match(source, /\.template-detail-gallery \.template-detail-slide\{cursor:zoom-in\}/);
assert.match(source, /\.gallery-size-1 \.template-detail-caption\{position:absolute;/);
assert.match(source, /\.gallery-size-1 \.template-detail-caption strong\{display:block\}/);
assert.match(source, /\.gallery-size-1 #templateDetailCounter\{display:block\}/);
assert.match(source, /querySelectorAll\('\.template-detail-thumb:not\(\.is-placeholder\)'\)\.length/);
assert.match(source, /function openTemplatePreviewLightbox\(\)/);
assert.match(source, /if \(!source\) return;/);
assert.doesNotMatch(source, /!document\.querySelector\('\.gallery-size-1'\)/);
assert.match(source, /event\.target\.closest\('\.template-detail-gallery #templateDetailSlide'\)/);
assert.match(source, /document\.addEventListener\('keydown'/);
assert.match(source, /template-detail-breadcrumb/);
assert.match(source, /aria-current.*page/);
assert.match(source, /breadcrumbItems/);
assert.match(source, /var breadcrumbItems = \['Home','Templates'\]/);
assert.match(source, /type:'shell-navigate',target:'home'/);

console.log('template gallery contract passed');
