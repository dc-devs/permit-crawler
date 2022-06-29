import config from './config';
import { bookPermit } from './actions';
import puppeteer from 'puppeteer-extra';
import { Twilio, RecreationGov } from './classes';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

puppeteer.use(StealthPlugin());

(async () => {
	const browser = await puppeteer.launch({ headless: false });
	const page = await browser.newPage();
	const { tripDetails } = config;

	const twilio = new Twilio({ config });
	const recreationGov = new RecreationGov({ page, config });

	await recreationGov.visitHomePage();
	await recreationGov.signIn();
	await recreationGov.visitPermitsPage();

	await bookPermit({
		page,
		twilio,
		browser,
		tripDetails,
		recreationGov,
	});
})();
