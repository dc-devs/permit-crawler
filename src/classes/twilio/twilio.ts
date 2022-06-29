import twilio from 'twilio';
import { sendText } from './actions';
import { IConfig } from '../../interfaces';
import TwilioClient from 'twilio/lib/rest/Twilio';

interface IProps {
	config: IConfig;
}

class Twilio {
	twilioNumber: string;
	config: IConfig;
	twilio: TwilioClient;

	constructor({ config }: IProps) {
		const { credentials } = config;
		const { twilio: twilioCredentials } = credentials;
		const { authToken, accountSid, number } = twilioCredentials;
		const twilioClient = twilio(accountSid, authToken);

		this.config = config;
		this.twilio = twilioClient;
		this.twilioNumber = number;
	}

	sendText = async (body: string) => {
		const { numbers } = this.config;

		await sendText({
			body,
			numbers,
			twilio: this.twilio,
			twilioNumber: this.twilioNumber,
		});
	};
}

export default Twilio;
