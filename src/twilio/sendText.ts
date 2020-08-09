import twilioClient from './twilioClient';
import config from './config';

const { twilioNumber } = config;

interface Arguments {
	body: string;
	numbers: string[];
}

const sendText = async ({ body, numbers }: Arguments): Promise<object> => {
	const messages = [];

	for (let i = 0; i < numbers.length; i++) {
		const number = numbers[i];

		const message = await twilioClient.messages.create({
			body: `Permit Crawler: ${body}`,
			to: `+${number}`,
			from: `+${twilioNumber}`,
		});

		messages.push(message);
	}

	return { messages };
};

export default sendText;
