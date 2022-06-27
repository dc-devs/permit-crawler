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
	siteName: string;
	permitId: string;
	groupSize: string;
	permitType: string;
	forestName: string;
}

interface IConfig {
	numbers: INumbers;
	credentials: ICedentials;
	tripDetails: ITripDetails;
}

export default IConfig;
