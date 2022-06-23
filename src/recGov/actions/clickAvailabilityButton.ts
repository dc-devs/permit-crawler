import { Page } from 'puppeteer';
import { pageElements } from '../constants';

const { availabilityButtonSelector } = pageElements;

const clickAvailabilityButton = async (page: Page, siteName: string): Promise<boolean> => {
	// TODO: Need to find a better way to refactor these infaces / functions out
	// Since you can't pass functions into `page.evaluate`, just defining in
	// the function itself for now
	return await page.evaluate(
		(availabilityButtonSelector, siteName) => {
			const getTableRows = (): NodeListOf<HTMLTableRowElement> => {
				return document.querySelectorAll('.rec-grid-row');
			};

			const getTableRowColumns = (
				tableRows: NodeListOf<HTMLTableRowElement>,
				tableRowKey: string
			): NodeListOf<HTMLTableDataCellElement> => {
				const tableRowKeyNum = parseInt(tableRowKey, 10);
				const tableRow = tableRows[tableRowKeyNum];

				return tableRow.querySelectorAll('.rec-grid-grid-cell');
			};

			const getSite = (
				tableRowColumns: NodeListOf<HTMLTableDataCellElement>
			): string => {
				const siteColumn = tableRowColumns.item(1);

				return siteColumn?.innerText || '';
			};

			const tableRows = getTableRows();

			Object.keys(tableRows).some((tableRowKey: string) => {
				const tableRowColumns = getTableRowColumns(
					tableRows,
					tableRowKey
				);

				const site = getSite(tableRowColumns);

				if (site === siteName) {
					const availabilityColumn: HTMLTableDataCellElement = tableRowColumns.item(
						3
					);

					const availabilityButton = availabilityColumn?.querySelector(
						availabilityButtonSelector
					) as HTMLButtonElement;

					availabilityButton?.click();

					return true;
				} else {
					return false;
				}
			});

			return true;
		},
		availabilityButtonSelector, siteName 
	);
};

export default clickAvailabilityButton;
