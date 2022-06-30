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

	await recreationGov.setDate();
	await recreationGov.setGroupSize();

	const { availability, permitCount } =
		await recreationGov.getPermitAvailability();

	const permitCountNum = Number(permitCount);
	const hasPermitsAvailable = permitCountNum > 0;

	const permitBookingIsUnAvailable =
		availability === PermitAvailability.UNAVAILABLE;
	let permitBookingIsAvailable =
		availability === PermitAvailability.AVAILABLE;
	let updatedGroupSize;

	if (permitBookingIsUnAvailable && hasPermitsAvailable) {
		await recreationGov.setGroupSize(permitCount);
		permitBookingIsAvailable = true;
		updatedGroupSize = permitCount;
	}

	if (permitBookingIsAvailable) {
		await recreationGov.selectPermit();
		await recreationGov.clickBookNow();

		twilio.sendText(
			`${
				updatedGroupSize || groupSize
			} permits at ${entryPointName} for ${date} are booked and sitting in your cart.. time to purchase!`
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
