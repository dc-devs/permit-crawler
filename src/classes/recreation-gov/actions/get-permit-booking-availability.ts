import { Page } from 'puppeteer';
import { PageElement } from '../enums';
import { IConfig } from '../../../interfaces';
import { PermitBookingAvailability } from '../../../enums';

interface IProps {
	page: Page;
	config: IConfig;
}

const getPermitBookingAvailability = async ({ page, config }: IProps) => {
	const { tripDetails } = config;
	const { entryPointId } = tripDetails;

	return await page.evaluate(
		({
			WALK_UP,
			AVAILABLE,
			UNAVAILABLE,
			entryPointId,
			PERMIT_ROW,
			PERMIT_CONTENT,
		}) => {
			const getPermitRow = () => {
				const allPermitRows = document.querySelectorAll(PERMIT_ROW);
				const permitRows = Array.from(allPermitRows);

				const permitRow = permitRows.find((permitRow) => {
					return (
						permitRow.firstChild?.firstChild?.textContent ===
						entryPointId
					);
				});

				return permitRow;
			};

			const getPermitCell = (permitRow: HTMLElement) => {
				return permitRow.children[3];
			};

			const getPermitBookingAvailability = (permitCell: HTMLElement) => {
				let availability = 'N/A';
				const isWalkUp = permitCell.className.includes(WALK_UP);
				const isUnavailable =
					permitCell.className.includes(UNAVAILABLE);
				const isAvailable = permitCell.className.includes(
					` ${AVAILABLE}`
				);

				if (isWalkUp) {
					availability = WALK_UP;
				} else if (isAvailable) {
					availability = AVAILABLE;
				} else if (isUnavailable) {
					availability = UNAVAILABLE;
				}

				return availability;
			};

			const getPermitCount = (permitCell: HTMLElement) => {
				const permitButtonContent = permitCell.querySelector(
					PERMIT_CONTENT
				) as HTMLElement;

				return permitButtonContent.textContent;
			};

			const permitRow = getPermitRow() as HTMLElement;
			const permitCell = getPermitCell(permitRow) as HTMLElement;
			const permitBookingAvailability = getPermitBookingAvailability(permitCell);
			const permitCount = getPermitCount(permitCell);

			return { permitBookingAvailability, permitCount };
		},
		{
			entryPointId,
			PERMIT_ROW: PageElement.PERMIT_ROW,
			WALK_UP: PermitBookingAvailability.WALK_UP,
			PERMIT_CONTENT: PageElement.PERMIT_CONTENT,
			AVAILABLE: PermitBookingAvailability.AVAILABLE,
			UNAVAILABLE: PermitBookingAvailability.UNAVAILABLE,
		}
	);
};

export default getPermitBookingAvailability;
