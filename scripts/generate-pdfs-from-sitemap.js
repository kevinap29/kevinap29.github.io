// scripts/generate-single-pdf-from-sitemap.js
import puppeteer from 'puppeteer';
import fs from 'fs';
import { XMLParser } from 'fast-xml-parser';
import { PDFDocument } from 'pdf-lib';

const FILE_NAME = 'portofolio_kevin_agustiansyah.pdf';
const SITEMAP_PATH = './static/sitemap.xml';

const getRoutesFromSitemap = async () => {
	const xml = fs.readFileSync(SITEMAP_PATH, 'utf-8');
	const parser = new XMLParser();
	const parsed = parser.parse(xml);
	// Filter to only include the resume for a professional single-page PDF
	const urlArray = Array.isArray(parsed.urlset.url) ? parsed.urlset.url : [parsed.urlset.url];
	const routes = urlArray
		.map((u) => new URL(u.loc))
		.filter((url) => url.pathname.includes('resume'));

	// If running locally, point to localhost
	return routes.map((url) => {
		const localUrl = new URL(url.pathname, 'http://localhost:5173');
		return localUrl.toString();
	});
};

const generateCombinedPDF = async () => {
	const routes = await getRoutesFromSitemap();
	console.log('🧭 Routes from sitemap.xml:', routes);

	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	// Force light mode for consistent PDF rendering
	await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'light' }]);
	const pdfBuffers = [];

	for (const route of routes) {
		console.log(`⏳ Rendering: ${route}`);
		await page.goto(route, {
			waitUntil: 'load',
			timeout: 120000 // 2 minutes timeout
		});

		// Remove dark class if present to ensure white background
		await page.evaluate(() => {
			document.documentElement.classList.remove('dark');
		});

		const buffer = await page.pdf({
			format: 'A4',
			printBackground: true,
			margin: {
				top: '15mm',
				bottom: '15mm',
				left: '20mm',
				right: '20mm'
			}
		});

		pdfBuffers.push(buffer);
	}

	await browser.close();

	const finalPDF = await PDFDocument.create();

	for (const buffer of pdfBuffers) {
		const pdf = await PDFDocument.load(buffer);
		const copiedPages = await finalPDF.copyPages(pdf, pdf.getPageIndices());
		copiedPages.forEach((page) => finalPDF.addPage(page));
	}

	const mergedBytes = await finalPDF.save();
	fs.writeFileSync(`static/${FILE_NAME}`, mergedBytes);

	console.log(`✅ Combined PDF saved to: static/${FILE_NAME}`);
};

generateCombinedPDF();
