import Twilio from '../twilio';
import { Page, Browser } from 'puppeteer';
import { IConfig } from '../../interfaces';
import { ITripDetails } from '../../interfaces';
import {
	signIn,
	setDate,
	bookPermit,
	clickBookNow,
	setGroupSize,
	selectPermit,
	visitHomePage,
	visitPermitsPage,
	getPermitAvailability,
} from './actions';

interface IProps {
	page: Page;
	twilio: Twilio;
	browser: Browser;
	config: IConfig;
	tripDetails: ITripDetails;
}

class RecreationGov {
	page: Page;
	twilio: Twilio;
	config: IConfig;
	browser: Browser;
	tripDetails: ITripDetails;

	constructor({ page, browser, twilio, config, tripDetails }: IProps) {
		this.page = page;
		this.twilio = twilio;
		this.config = config;
		this.browser = browser;
		this.tripDetails = tripDetails;
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

	setGroupSize = async (customGroupSize?: string | null | undefined) => {
		await setGroupSize({
			customGroupSize,
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

	getPermitAvailability = async () => {
		return await getPermitAvailability({
			page: this.page,
			config: this.config,
		});
	};

	selectPermit = async () => {
		return await selectPermit({
			page: this.page,
			config: this.config,
		});
	};

	clickBookNow = async () => {
		return await clickBookNow({
			page: this.page,
		});
	};

	bookPermit = async () => {
		return await bookPermit({
			page: this.page,
			twilio: this.twilio,
			browser: this.browser,
			recreationGov: this,
			tripDetails: this.tripDetails,
		});
	};
}

export default RecreationGov;
