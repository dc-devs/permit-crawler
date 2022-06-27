import { Page } from 'puppeteer';
import { IConfig } from '../../interfaces';
import {
	signIn,
	setDate,
	setGroupSize,
	visitHomePage,
	visitPermitsPage,
} from './actions';

// import { findMyPermit } from './classes/recreation-gov/actions';

interface IProps {
	page: Page;
	config: IConfig;
}

class RecreationGov {
	page: Page;
	config: IConfig;

	constructor({ page, config }: IProps) {
		this.page = page;
		this.config = config;
	}

	visitHomePage = async () => {
		await visitHomePage({
			page: this.page,
		});
	};

	signIn = async () => {
		await signIn({
			page: this.page,
			config: this.config,
		});
	};

	visitPermitsPage = async () => {
		await visitPermitsPage({
			page: this.page,
			config: this.config,
		});
	};

	setGroupSize = async () => {
		await setGroupSize({
			page: this.page,
			config: this.config,
		});
	};
	
	setDate = async () => {
		await setDate({
			page: this.page,
			config: this.config,
		});
	};
}

export default RecreationGov;
