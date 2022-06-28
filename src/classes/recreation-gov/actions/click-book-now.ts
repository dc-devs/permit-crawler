import { Page } from 'puppeteer';
import { PageElement } from '../enums';

interface IProps {
	page: Page;
}

const clickBookNow = async ({ page }: IProps) => {
	await page.click(PageElement.BUTTON_BOOK_NOW);
};

export default clickBookNow;
