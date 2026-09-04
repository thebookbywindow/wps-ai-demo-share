const assert = require('node:assert/strict');
const fs = require('node:fs');

const source = fs.readFileSync('templates-inner.html', 'utf8');

assert.match(source, /const WPS_INSTALLER_URL = 'https:\/\/wdl1\.pcfg\.cache\.wpscdn\.com\/wpsdl\/wpsoffice\/onlinesetup\/distsrc\/600\.1002\/wpsinst\/wps_office_inst\.exe';/);
assert.match(source, /installer\.download = 'wps_office_inst\.exe';/);
assert.match(source, /function openTemplateInWps\(id\)/);
assert.match(source, /var deepLink = 'wps:\/\/open\?templateId='/);
assert.match(source, /'&format=' \+ encodeURIComponent\(format\)/);
assert.match(source, /setTimeout\(fallbackToWpsDownload,1800\)/);
assert.match(source, /onclick="openTemplateInWps\(' \+ item\.id \+ '\)"/);
assert.match(source, /PPTX:'application\/vnd\.openxmlformats-officedocument\.presentationml\.presentation'/);
assert.match(source, /DOCX:'application\/vnd\.openxmlformats-officedocument\.wordprocessingml\.document'/);
assert.match(source, /XLSX:'application\/vnd\.openxmlformats-officedocument\.spreadsheetml\.sheet'/);
assert.match(source, /'-demo-download\.' \+ extension/);
assert.match(source, /dimensionLabel:'Aspect ratio',ratio:'16:9 widescreen'/);
assert.match(source, /dimensionLabel:'Page size',ratio:'A4 portrait'/);
assert.match(source, /dimensionLabel:'Layout',ratio:'16:9 dashboard'/);
assert.match(source, /copy\.dimensionLabel \+ ':<\/span><strong>' \+ copy\.ratio/);
assert.match(source, /apps:\['WPS Office','Microsoft PowerPoint','Google Slides','Apple Keynote','Adobe Acrobat'\]/);
assert.match(source, /apps:\['WPS Office','Microsoft Word','Google Docs','Apple Pages','Notion','Adobe Acrobat'\]/);
assert.match(source, /apps:\['WPS Office','Microsoft Excel','Google Sheets','Apple Numbers','Notion','Adobe Acrobat'\]/);

console.log('WPS deeplink contract passed');
