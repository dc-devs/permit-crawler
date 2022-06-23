import utils from '../utils';
import actions from '../actions';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

const { generatePageUrl } = utils;
const { signIn, findMyPermit } = actions;

puppeteer.use(StealthPlugin());

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    const pageUrl = generatePageUrl();
    await page.goto(pageUrl, { waitUntil: 'domcontentloaded' });

    await page.waitForTimeout(1000);
    await signIn(page);
    await page.waitForTimeout(1000);

    while (true) {
        let permitFound = await findMyPermit(page);

        if (permitFound) {
            const twentyMinutes = 1200000;
            await page.waitForTimeout(twentyMinutes);
            break;
        } else {
            await page.reload({ waitUntil: 'domcontentloaded' });
            await page.waitForTimeout(3000);
        }
    }

    await browser.close();
})();
