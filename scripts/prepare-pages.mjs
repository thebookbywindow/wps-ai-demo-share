import fs from 'node:fs';
import path from 'node:path';

const projectRoot = process.cwd();
const distRoot = path.join(projectRoot, 'dist');
const templateSourcePath = path.join(projectRoot, 'templates-inner.html');
const templateOutputPath = path.join(distRoot, 'templates-inner.html');

const templateSource = fs.readFileSync(templateSourcePath, 'utf8');
const templateWithoutVideo = templateSource
  .replace(/\s*<video class="hero-background-video"[\s\S]*?<\/video>/, '')
  .replace(
    /,\{"file":"wps-figma-assets\/hero-background-loop\.mp4"[^}]*\}/,
    ''
  );

if (templateWithoutVideo === templateSource) {
  throw new Error('Expected the template hero video block to be present.');
}

fs.writeFileSync(templateOutputPath, templateWithoutVideo);

const categoryUrls = {
  presentation: 'presentations',
  writer: 'documents',
  spreadsheet: 'spreadsheets',
  pdf: 'pdf'
};

function templateSlug(value) {
  return String(value || 'template')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'template';
}

const templates = [...templateSource.matchAll(/id:(\d+),n:'([^']+)',c:'([^']+)'/g)]
  .map(([, id, name, category]) => ({ id: Number(id), name, category }));

if (!templates.length) {
  throw new Error('No template records were found while generating static routes.');
}

const routeShell = `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>WPS Templates</title>
  <style>html,body{margin:0;min-height:100%;background:#fff}body{min-height:100vh}iframe{display:block;width:100%;min-height:100vh;border:0}</style>
</head>
<body>
  <iframe id="templatesFrame" title="WPS Templates" src="/wps-ai-demo-share/templates-inner.html?v=10a4e3a"></iframe>
</body>
</html>
`;

const routePaths = new Set([
  'en-us/resources/',
  'en-us/resources/templates/'
]);

const albumTypeBlocks = {
  presentation: 'presentations',
  documents: 'documents',
  spreadsheets: 'spreadsheets'
};
const albumDataMatch = templateSource.match(/var albumTemplateData = \[([\s\S]*?)\]\.map/);
const albumEntries = albumDataMatch
  ? [...albumDataMatch[1].matchAll(/\['([^']+)','(presentation|documents|spreadsheets)',\d+\]/g)]
      .map(([, title, type]) => ({ title, type }))
  : [];
const qualifierMatch = templateSource.match(/var demoAlbumQualifiers = \[([^\]]+)\]/);
const seedBlockMatch = templateSource.match(/var demoAlbumSeeds = \[([\s\S]*?)\];/);
const qualifiers = qualifierMatch
  ? [...qualifierMatch[1].matchAll(/'([^']+)'/g)].map(([, value]) => value)
  : [];
const seeds = seedBlockMatch
  ? [...seedBlockMatch[1].matchAll(/\['([^']+)','(presentation|documents|spreadsheets)',\d+\]/g)]
      .map(([, title, type]) => ({ title, type }))
  : [];

for (const entry of albumEntries) {
  routePaths.add(`en-us/resources/templates/${albumTypeBlocks[entry.type]}/${templateSlug(entry.title)}/`);
}
for (const qualifier of qualifiers) {
  for (const seed of seeds) {
    routePaths.add(
      `en-us/resources/templates/${albumTypeBlocks[seed.type]}/${templateSlug(`${qualifier} ${seed.title}`)}/`
    );
  }
}

for (const template of templates) {
  const categoryUrl = categoryUrls[template.category] || template.category;
  routePaths.add(`en-us/resources/templates/${categoryUrl}/`);
  routePaths.add(`en-us/resources/templates/${categoryUrl}/${templateSlug(template.name)}/`);
}

for (const routePath of routePaths) {
  const routeIndexPath = path.join(distRoot, routePath, 'index.html');
  fs.mkdirSync(path.dirname(routeIndexPath), { recursive: true });
  fs.writeFileSync(routeIndexPath, routeShell);
}

console.log(`Prepared ${templates.length} template records and ${routePaths.size} static routes.`);
console.log(`Removed hero video from deployed template iframe (${templateSource.length - templateWithoutVideo.length} bytes).`);
