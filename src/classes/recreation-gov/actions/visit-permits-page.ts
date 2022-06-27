import { Page } from 'puppeteer';
import { IConfig } from '../../../interfaces';
import { generatePermitsPageUrl } from '../utils';

interface IProps {
	page: Page;
	config: IConfig;
}

const visitPermitsPage = async ({ page, config }: IProps) => {
	const url = generatePermitsPageUrl({ config });
	await page.goto(url);
};

export default visitPermitsPage;
