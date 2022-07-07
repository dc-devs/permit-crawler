import { PageElement } from '../enums';
import { IBookPermitProps } from '../interfaces';
import { PermitBookingAvailability } from '../../../enums';

const bookPermit = async ({
	page,
	twilio,
	browser,
	tripDetails,
	recreationGov,
}: IBookPermitProps) => {
	const { date, groupSize, entryPointName } = tripDetails;

	await recreationGov.setDate();
	await recreationGov.setGroupSize();

	const { permitBookingAvailability, permitCount } =
		await recreationGov.getPermitBookingAvailability();

	const permitCountNum = Number(permitCount);
	const hasPermitsAvailable = permitCountNum > 0;

	const permitBookingIsUnAvailable =
		permitBookingAvailability === PermitBookingAvailability.UNAVAILABLE;

	let permitBookingIsAvailable =
		permitBookingAvailability === PermitBookingAvailability.AVAILABLE;
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
