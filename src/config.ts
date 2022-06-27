import { IConfig } from './interfaces';
import { PermitId, PermitType } from './enums';

require('dotenv').config();

const config: IConfig = {
	numbers: {
		davidC: process.env.DAVID_C_PHONE as string,
	},
	credentials: {
		twilio: {
			number: process.env.TWILIO_NUMBER as string,
			authToken: process.env.TWILIO_AUTH_TOKEN as string,
			accountSid: process.env.TWILIO_ACCOUNT_SID as string,
		},
		recreationGov: {
			email: process.env.REC_GOV_EMAIL as string,
			password: process.env.REC_GOV_PASSWORD as string,
		},
	},
	tripDetails: {
		permitId: PermitId.YOSEMITE_WILDERNESS,
		permitType: PermitType.OVERNIGHT,
		date: '2022-07-08',
		groupSize: '2',
		siteName: 'Shadow Creek',
		forestName: 'Inyo National Forest',
	},
};

export default config;
