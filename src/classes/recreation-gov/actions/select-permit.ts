import { Page } from 'puppeteer';
import { PageElement } from '../enums';
import { IConfig } from '../../../interfaces';

interface IProps {
	page: Page;
	config: IConfig;
}

const selectPermit = async ({ page, config }: IProps) => {
	const { tripDetails } = config;
	const { entryPointId } = tripDetails;

	await page.evaluate(
		({ entryPointId, PERMIT_ROW, BUTTON_PERMIT }) => {
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

			const getPermitButton = (permitCell: HTMLElement) => {
				return permitCell.querySelector(BUTTON_PERMIT) as HTMLElement;
			};

			const permitRow = getPermitRow() as HTMLElement;
			const permitCell = getPermitCell(permitRow) as HTMLElement;
			const permitButton = getPermitButton(permitCell);

			permitButton.click();

			return true;
		},
		{
			entryPointId,
			PERMIT_ROW: PageElement.PERMIT_ROW,
			BUTTON_PERMIT: PageElement.BUTTON_PERMIT,
		}
	);

	await page.waitForSelector(PageElement.ICON_CHECK);
};

export default selectPermit;
