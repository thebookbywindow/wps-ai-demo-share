const assert = require('node:assert/strict');
const fs = require('node:fs');

const source = fs.readFileSync('templates-inner.html', 'utf8');

assert.match(source, /\.gallery-fixed-five \.template-detail-thumbs\{display:grid;/);
assert.match(source, /function ensureGalleryPlaceholders\(\)/);
assert.match(source, /\.template-detail-thumbs\{display:grid;grid-template-columns:repeat\(auto-fit,minmax\(120px,160px\)\);gap:13px;width:fit-content;max-width:100%;/);
assert.match(source, /\.template-detail-thumbs\.gallery-count-4\{grid-template-columns:repeat\(4,minmax\(0,1fr\)\);width:100%\}/);
assert.match(source, /\.template-detail-thumbs\.gallery-count-5\{grid-template-columns:repeat\(5,minmax\(0,1fr\)\);width:100%\}/);
assert.match(source, /realCount = thumbs\.querySelectorAll\('\.template-detail-thumb'\)\.length/);
assert.doesNotMatch(source, /for \(var index = realCount; index < 5; index\+\+\)/);
assert.doesNotMatch(source, /is-placeholder/);
assert.match(source, /\.gallery-size-1 \.template-detail-main-preview\{height:auto;/);
assert.match(source, /\.gallery-size-1 \.template-detail-slide\{width:100%;height:auto;aspect-ratio:4 \/ 3;/);
assert.match(source, /\.template-preview-lightbox \.template-detail-slide\{width:min\(92vw,1100px\);height:auto;aspect-ratio:4 \/ 3;/);
assert.match(source, /\.template-detail-gallery \.template-detail-slide\{cursor:zoom-in\}/);
assert.match(source, /\.gallery-size-1 \.template-detail-caption\{position:absolute;/);
assert.match(source, /\.gallery-size-1 \.template-detail-caption strong\{display:block\}/);
assert.match(source, /\.gallery-size-1 #templateDetailCounter\{display:block\}/);
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
