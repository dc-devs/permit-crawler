import TwilioClient from 'twilio/lib/rest/Twilio';
import INumbers from '../../../interfaces/numbers.interface';

interface IProps {
	body: string;
	numbers: INumbers;
	twilio: TwilioClient;
	twilioNumber: string;
}

const sendText = async ({ body, twilio, numbers, twilioNumber }: IProps) => {
	const numberKeys = Object.keys(numbers);

	numberKeys.forEach(async (numberKey) => {
		const number = numbers[numberKey];

		await twilio.messages.create({
			body: `[Permit Crawler]: ${body}`,
			to: `+${number}`,
			from: `+${twilioNumber}`,
		});
	});
};

export default sendText;
