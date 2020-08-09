import { Page } from 'puppeteer';
import bookNow from './bookNow';
import setGroupSize from './setGroupSize';
import getPermitInfo from './getPermitInfo';
import setIsCommercialTrip from './setIsCommercialTrip';
import { sendText } from '../../twilio';
import generatePageUrl from '../utils/generatePageUrl';
import config from '../../crawlConfigs/recGovWildernessPermitConfig';

const pageUrl = generatePageUrl();

const { tripDetails, numbers } = config;
const { date, siteName, groupSize } = tripDetails;
const { davidC } = numbers;

const findMyPermit = async (page: Page): Promise<boolean> => {
	await setGroupSize(page);
	await setIsCommercialTrip(page);

	const permitInfo = await getPermitInfo(page);

	const { availability } = permitInfo;
	const isPermitAvailable = availability === 'available';

	if (isPermitAvailable) {
		await sendText({
			body: `${groupSize} permits found at ${siteName} for ${date}... time to book!! \n ${pageUrl}`,
			numbers: [davidC],
		});
		await bookNow(page);

		return true;
	} else {
		await page.reload({ waitUntil: 'domcontentloaded' });
		await page.waitFor(3000);

		return findMyPermit(page);
	}
};

export default findMyPermit;
