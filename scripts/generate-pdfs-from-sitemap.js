// scripts/generate-single-pdf-from-sitemap.js
import puppeteer from 'puppeteer';
import fs from 'fs';
import { parseStringPromise } from 'xml2js';
import { PDFDocument } from 'pdf-lib';

const FILE_NAME = 'portofolio_kevin_agustiansyah.pdf';
const SITEMAP_PATH = './static/sitemap.xml';

const getRoutesFromSitemap = async () => {
	const xml = fs.readFileSync(SITEMAP_PATH, 'utf-8');
	const parsed = await parseStringPromise(xml);
	const urls = parsed.urlset.url.map((u) => new URL(u.loc[0]));
	return urls;
};

const generateCombinedPDF = async () => {
	const routes = await getRoutesFromSitemap();
	console.log('🧭 Routes from sitemap.xml:', routes);

	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	const pdfBuffers = [];

	for (const route of routes) {
		console.log(`⏳ Rendering: ${route}`);
		await page.goto(route, { 
            waitUntil: 'load',
            timeout: 120000 // 2 minutes timeout 
        });

		const buffer = await page.pdf({
			format: 'A4',
			printBackground: true
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
