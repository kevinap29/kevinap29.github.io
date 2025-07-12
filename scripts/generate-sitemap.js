import fs from 'fs';
import path from 'path';

const baseUrl = 'https://kevinap29.github.io';
const routesDir = './src/routes';

function getRoutes(dir, current = '') {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let urls = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    const cleanSegment =
      entry.name.startsWith('(') && entry.name.endsWith(')')
        ? '' // skip route groups
        : entry.name;

    const nextPath = path.join(current, cleanSegment);

    if (entry.isDirectory()) {
      urls = urls.concat(getRoutes(fullPath, nextPath));
    } else if (entry.name === '+page.svelte') {
      let route = current.replace(/\\/g, '/');

      if (route.endsWith('/index')) route = route.replace(/\/index$/, '');
      if (!route.startsWith('/')) route = '/' + route;
      if (route === '') route = '/';

      urls.push(route);
    }
  }

  return urls;
}

const routes = getRoutes(routesDir);

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) => `
  <url>
    <loc>${baseUrl}${r}</loc>
    <priority>${r === '/' ? '1.0' : '0.7'}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

fs.writeFileSync('static/sitemap.xml', xml);
console.log(`✅ sitemap.xml generated with ${routes.length} URLs`);
