interface INumbers {
	[key: string]: string;
}

interface IRecreationGovCedentials {
	email: string;
	password: string;
}

interface ITwilioCedentials {
	number: string;
	authToken: string;
	accountSid: string;
}

interface ICedentials {
	twilio?: ITwilioCedentials;
	recreationGov: IRecreationGovCedentials;
}

interface ITripDetails {
	date: string;
	permitId: string;
	siteName?: string;
	groupSize: string;
	permitType: string;
	forestName?: string;
	entryPointId: string;
}

interface IConfig {
	numbers: INumbers;
	credentials: ICedentials;
	tripDetails: ITripDetails;
}

export default IConfig;
