import { Page } from 'puppeteer';
import config from '../../crawlConfigs/recGovWildernessPermitConfig';

const { tripDetails } = config;
const { siteName } = tripDetails;

interface PermitInfo {
	id: string;
	site: string;
	area: string;
	availability: string;
}

const getPermitInfo = async (page: Page): Promise<PermitInfo> => {
	// TODO: Need to find a better way to refactor these infaces / functions out
	// Since you can't pass functions into `page.evaluate`, just defining in
	// the function itself for now
	return await page.evaluate(
		({ siteName }) => {
			const permitInfo = {} as PermitInfo;

			const getTableRows = (): NodeListOf<HTMLTableRowElement> => {
				return document.querySelectorAll('tr');
			};

			const getTableRowColumns = (
				tableRows: NodeListOf<HTMLTableRowElement>,
				tableRowKey: string
			): NodeListOf<HTMLTableDataCellElement> => {
				const tableRowKeyNum = parseInt(tableRowKey, 10);
				const tableRow = tableRows[tableRowKeyNum];

				return tableRow.querySelectorAll('td');
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
			): string => {
				const availabilityColumn = tableRowColumns.item(3);

				return availabilityColumn?.classList?.item(0) || '';
			};

			const tableRows = getTableRows();

			Object.keys(tableRows).some((tableRowKey: string) => {
				const tableRowColumns = getTableRowColumns(
					tableRows,
					tableRowKey
				);

				const site = getSite(tableRowColumns);

				if (site === siteName) {
					permitInfo.site = site;
					permitInfo.id = getId(tableRowColumns);
					permitInfo.area = getArea(tableRowColumns);
					permitInfo.availability = getAvailability(tableRowColumns);
				}
			});

			return permitInfo;
		},
		{ siteName }
	);
};

export default getPermitInfo;
