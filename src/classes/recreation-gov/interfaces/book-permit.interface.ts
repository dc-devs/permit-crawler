import { Page, Browser } from 'puppeteer';
import { ITripDetails } from '../../../interfaces';
import { Twilio, RecreationGov } from '../../index';

interface IBookPermitProps {
	page: Page;
	twilio: Twilio;
	browser: Browser;
	tripDetails: ITripDetails;
	recreationGov: RecreationGov;
}

export default IBookPermitProps;
