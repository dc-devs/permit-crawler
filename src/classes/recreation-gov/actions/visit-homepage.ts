import { Url } from '../enums';
import { Page } from 'puppeteer';

interface IProps {
	page: Page;
}

const visitHomePage = async ({ page }: IProps) => {
	await page.goto(Url.HOMEPAGE);
};

export default visitHomePage;
