import { Page } from 'puppeteer';
import config from '../../crawlConfigs/recGovWildernessPermitConfig';

const { tripDetails } = config;
const { siteNames } = tripDetails;

interface PermitInfo {
	id: string;
	site: string;
	area: string;
	availability: boolean;
}

const getPermitInfo = async (page: Page): Promise<PermitInfo> => {
	// TODO: Need to find a better way to refactor these infaces / functions out
	// Since you can't pass functions into `page.evaluate`, just defining in
	// the function itself for now
	return await page.evaluate(
		(siteNames: string[]) => {
			const permitInfo = {} as PermitInfo;

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

			const getId = (
				tableRowColumns: NodeListOf<HTMLTableDataCellElement>
			): string => {
				const idColumn = tableRowColumns.item(0);
				const idColumnLink = idColumn?.querySelector('a');

				return idColumnLink?.innerText || '';
			};

			const getArea = (
				tableRowColumns: NodeListOf<HTMLTableDataCellElement>
			): string => {
				const areaColumn = tableRowColumns.item(2);

				return areaColumn?.innerText || '';
			};

			const getAvailability = (
				tableRowColumns: NodeListOf<HTMLTableDataCellElement>
			): boolean => {
				const availabilityColumn = tableRowColumns.item(3);
				return availabilityColumn?.classList.contains('available');
			};

			const tableRows = getTableRows();

			Object.keys(tableRows).some((tableRowKey: string) => {
				const tableRowColumns = getTableRowColumns(
					tableRows,
					tableRowKey
				);

				const site = getSite(tableRowColumns);
				const availability = getAvailability(tableRowColumns);
				if (siteNames.includes(site) && availability) {
					permitInfo.site = site;
					permitInfo.id = getId(tableRowColumns);
					permitInfo.area = getArea(tableRowColumns);
					permitInfo.availability = availability;
					return true;
				} else {
					return false;
				}
			});

			return permitInfo;
		},
		siteNames
	);
};

export default getPermitInfo;
