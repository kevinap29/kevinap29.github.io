import fs from 'fs';
import path from 'path';

const baseUrl = 'https://kevinap29.github.io';
const routesDir = './src/routes';
const projectsDir = './src/lib/data/projects';

function normalizeRoute(routePath) {
	let route = routePath.replace(/\\/g, '/');
	if (route === '.' || route === './') return '/';
	if (route.endsWith('/index')) route = route.replace(/\/index$/, '');
	if (!route.startsWith('/')) route = '/' + route;
	if (route !== '/' && !route.endsWith('/')) route += '/';
	return route;
}

function getRoutes(dir, current = '') {
	const entries = fs.readdirSync(dir, { withFileTypes: true });
	let urls = [];

	for (const entry of entries) {
		const fullPath = path.join(dir, entry.name);

		// Skip dynamic route segments (e.g. [slug]); they are expanded separately
		if (entry.isDirectory() && entry.name.includes('[') && entry.name.includes(']')) {
			continue;
		}

		const cleanSegment =
			entry.name.startsWith('(') && entry.name.endsWith(')')
				? '' // skip route groups
				: entry.name;

		const nextPath = path.join(current, cleanSegment);

		if (entry.isDirectory()) {
			urls = urls.concat(getRoutes(fullPath, nextPath));
		} else if (entry.name === '+page.svelte') {
			urls.push(normalizeRoute(current));
		}
	}

	return urls;
}

function getProjectRoutes() {
	if (!fs.existsSync(projectsDir)) return [];

	return fs
		.readdirSync(projectsDir)
		.filter((file) => file.endsWith('.en.md'))
		.map((file) => file.replace(/\.en\.md$/, ''))
		.sort()
		.map((slug) => `/project/${slug}/`);
}

const staticRoutes = getRoutes(routesDir);
const projectRoutes = getProjectRoutes();
const allRoutes = [...new Set([...staticRoutes, ...projectRoutes])];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
	.map(
		(r) => `  <url>
    <loc>${baseUrl}${r}</loc>
    <changefreq>monthly</changefreq>
    <priority>${r === '/' ? '1.0' : r.startsWith('/project/') && r !== '/project/' ? '0.6' : '0.8'}</priority>
  </url>`
	)
	.join('\n')}
</urlset>
`;

fs.writeFileSync('static/sitemap.xml', xml);
console.log(`✅ sitemap.xml generated with ${allRoutes.length} URLs`);
