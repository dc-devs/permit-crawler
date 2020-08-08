import { Page } from 'puppeteer';
import config from '../../crawlConfigs/recGovWildernessPermitConfig';

const { tripDetails } = config;
const { siteName } = tripDetails;

const getSiteData = async (page: Page) => {
	return await page.evaluate(
		({ siteName }) => {
			interface SiteRowData {
				id: string;
				site: string;
				area: string;
				availabilty: string;
			}

			const tableRows = document.querySelectorAll('tr');
			const siteData = {} as SiteRowData;

			Object.keys(tableRows).some((tableRowKey: string) => {
				const tableRowKeyNum = parseInt(tableRowKey, 10);
				const tableRow = tableRows[tableRowKeyNum];
				const tableColumns = tableRow.querySelectorAll('td');

				const idColumn = tableColumns.item(0);
				const idColumnLink = idColumn?.querySelector('a');
				const id = idColumnLink?.innerText || '';

				const siteColumn = tableColumns.item(1);
				const site = siteColumn?.innerText || '';

				const areaColumn = tableColumns.item(2);
				const area = areaColumn?.innerText || '';

				const availabilityColumn = tableColumns.item(3);
				const availability =
					availabilityColumn?.classList?.item(0) || '';

				siteData.id = id;
				siteData.site = site;
				siteData.area = area;
				siteData.availabilty = availability;

				return site === siteName;
			});

			return siteData;
		},
		{ siteName }
	);
};

export default getSiteData;
