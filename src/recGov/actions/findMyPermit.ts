import { Page } from 'puppeteer';
import getPermitInfo from './getPermitInfo';
import setGroupSize from './setGroupSize';
import setIsCommercialTrip from './setIsCommercialTrip';

const findMyPermit = async (page: Page): Promise<boolean> => {
	await setGroupSize(page);
	await setIsCommercialTrip(page);

	const permitInfo = await getPermitInfo(page);

	const { availability } = permitInfo;
	const isPermitAvailable = availability === 'available';

	if (isPermitAvailable) {
		console.log('-- PERMIT FOUND!!');
		return true;
	} else {
		await page.reload({ waitUntil: 'domcontentloaded' });
		await page.waitFor(2000);

		return findMyPermit(page);
	}
};

export default findMyPermit;
