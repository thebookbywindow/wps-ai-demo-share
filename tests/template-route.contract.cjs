const assert = require('node:assert/strict');
const fs = require('node:fs');

const shell = fs.readFileSync('index.html', 'utf8');
const templates = fs.readFileSync('templates-inner.html', 'utf8');

assert.match(shell, /location\.pathname\.replace\(\/\^\\\/wps-ai-demo-share/);
assert.match(shell, /path\.match\(\/\^\\\/\(\[a-z\]\{2\}/);
assert.match(shell, /templatesLink\.setAttribute\('href',publicTemplatePath\('\/en-us\/resources\/'\)\)/);
assert.match(shell, /event\.data\?\.type==='shell-navigate'/);
assert.match(shell, /function showLanding\(target='top'\)/);
assert.match(shell, /publicTemplatePath\('\/'\)\+`#\$\{target\}`/);
assert.match(shell, /function showTemplates\(route='\/en-us\/resources\/'/);
assert.match(shell, /showTemplates\('\/en-us\/resources\/'/);
assert.match(shell, /id="templatesLink" href="\/en-us\/resources\/"/);
assert.match(templates, /function templateResourceBase\(\)/);
assert.match(templates, /return templateResourceBase\(\) \+ '\/'/);
assert.ok(templates.includes("templateResourceBase() + '/templates/'"));
assert.match(templates, /var marker = '\/resources';/);
assert.match(templates, /if \(parts\[0\] === 'templates'\) parts\.shift\(\);/);
assert.match(templates, /return templateResourceBase\(\) \+ '\/';/);
assert.doesNotMatch(templates, /return '\/en-us\/templates\/'/);

console.log('template route contract passed');
