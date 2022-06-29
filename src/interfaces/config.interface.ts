import INumbers from './numbers.interface';
import ITripDetails from './trip-details.interface';

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
	twilio: ITwilioCedentials;
	recreationGov: IRecreationGovCedentials;
}

interface IConfig {
	numbers: INumbers;
	credentials: ICedentials;
	tripDetails: ITripDetails;
}

export default IConfig;
