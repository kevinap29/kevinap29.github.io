// scripts/generate-pdfs-from-sitemap.js
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import puppeteer from 'puppeteer';
import { XMLParser } from 'fast-xml-parser';
import { PDFDocument } from 'pdf-lib';

const FILE_NAME = 'portofolio_kevin_agustiansyah.pdf';
const SITEMAP_PATH = './static/sitemap.xml';
const PORT = Number(process.env.PDF_PORT || 4173);
const BASE_URL = `http://localhost:${PORT}`;

const isServerListening = async (url) => {
	try {
		const res = await fetch(url);
		return res.ok || res.status < 500;
	} catch {
		return false;
	}
};

const waitForServer = async (url, timeoutMs = 30000) => {
	const start = Date.now();
	while (Date.now() - start < timeoutMs) {
		if (await isServerListening(url)) return;
		await new Promise((resolve) => setTimeout(resolve, 500));
	}
	throw new Error(`Timed out waiting for preview server at ${url}`);
};

const getRoutesFromSitemap = async () => {
	const xml = fs.readFileSync(SITEMAP_PATH, 'utf-8');
	const parser = new XMLParser();
	const parsed = parser.parse(xml);
	// Filter to only include the resume for a professional single-page PDF
	const urlArray = Array.isArray(parsed.urlset.url) ? parsed.urlset.url : [parsed.urlset.url];
	const routes = urlArray
		.map((u) => new URL(u.loc))
		.filter((url) => url.pathname.includes('resume'));

	return routes.map((url) => new URL(url.pathname, BASE_URL).toString());
};

const generateCombinedPDF = async () => {
	let previewProcess = null;
	const alreadyRunning = await isServerListening(BASE_URL);

	if (!alreadyRunning) {
		console.log(`🚀 Starting vite preview on ${BASE_URL}...`);
		previewProcess = spawn('npx', ['vite', 'preview', '--port', String(PORT), '--strictPort'], {
			stdio: 'ignore',
			shell: process.platform === 'win32'
		});
		await waitForServer(BASE_URL);
	}

	let browser = null;
	try {
		const routes = await getRoutesFromSitemap();
		console.log('🧭 Routes from sitemap.xml:', routes);

		browser = await puppeteer.launch();
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

		const finalPDF = await PDFDocument.create();

		for (const buffer of pdfBuffers) {
			const pdf = await PDFDocument.load(buffer);
			const copiedPages = await finalPDF.copyPages(pdf, pdf.getPageIndices());
			copiedPages.forEach((copiedPage) => finalPDF.addPage(copiedPage));
		}

		const mergedBytes = await finalPDF.save();
		fs.writeFileSync(`static/${FILE_NAME}`, mergedBytes);

		console.log(`✅ Combined PDF saved to: static/${FILE_NAME}`);
	} finally {
		if (browser) {
			await browser.close();
		}
		if (previewProcess && !previewProcess.killed) {
			previewProcess.kill();
		}
	}
};

generateCombinedPDF();
