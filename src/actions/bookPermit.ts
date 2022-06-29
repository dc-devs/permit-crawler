import { Page, Browser } from 'puppeteer';
import { ITripDetails } from '../interfaces';
import { PermitAvailability } from '../enums';
import { Twilio, RecreationGov } from '../classes';
import { PageElement } from '../classes/recreation-gov/enums';

interface IProps {
	page: Page;
	twilio: Twilio;
	browser: Browser;
	tripDetails: ITripDetails;
	recreationGov: RecreationGov;
}

const bookPermit = async ({
	page,
	twilio,
	browser,
	tripDetails,
	recreationGov,
}: IProps) => {
	const { date, groupSize, entryPointName } = tripDetails;
	const groupSizeNum = Number(groupSize);

	await recreationGov.setDate();
	await recreationGov.setGroupSize();

	await page.waitForTimeout(1000);

	const { availability, permitCount } =
		await recreationGov.getPermitAvailability();
	const permitIsAvailable = availability === PermitAvailability.AVAILABLE;
	const permitCountNum = Number(permitCount);
	const numberOfDesiredPermitsAvailable = groupSizeNum <= permitCountNum;

	console.log({ availability, permitCount });
	console.log('permitCountNum', permitCountNum);
	console.log('groupSizeNum', groupSizeNum);
	console.log(
		'numberOfDesiredPermitsAvailable',
		numberOfDesiredPermitsAvailable
	);

	if (!numberOfDesiredPermitsAvailable) {
		await recreationGov.setGroupSize(permitCount);
	}

	if (permitIsAvailable) {
		await recreationGov.selectPermit();
		await recreationGov.clickBookNow();

		twilio.sendText(
			`${groupSize} permits at ${entryPointName} for ${date} are booked and sitting in your cart.. time to purchase!`
		);

		const twentyMinutes = 1200000;
		await page.waitForTimeout(twentyMinutes);
		await browser.close();
	} else {
		await page.reload({ waitUntil: 'domcontentloaded' });
		await page.waitForSelector(PageElement.INFORMATION_REQUIRED_CONTAINER);

		await bookPermit({ page, browser, twilio, recreationGov, tripDetails });
	}
};

export default bookPermit;
