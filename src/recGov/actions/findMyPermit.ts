import { Page } from 'puppeteer';
import bookNow from './bookNow';
import setGroupSize from './setGroupSize';
import getPermitInfo from './getPermitInfo';
import setIsCommercialTrip from './setIsCommercialTrip';
import { sendText } from '../../twilio';

const findMyPermit = async (page: Page): Promise<boolean> => {
	await setGroupSize(page);
	await setIsCommercialTrip(page);

	const permitInfo = await getPermitInfo(page);

	const { availability } = permitInfo;
	const isPermitAvailable = availability === 'available';

	if (isPermitAvailable) {
		await sendText({
			body: 'Permits found, time to book!! ',
			numbers: ['19256399635'],
		});
		await bookNow(page);

		return true;
	} else {
		await page.reload({ waitUntil: 'domcontentloaded' });
		await page.waitFor(2000);

		return findMyPermit(page);
	}
};

export default findMyPermit;
