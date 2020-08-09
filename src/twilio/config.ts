const twilioNumber = process.env.TWILIO_NUMBER as string;
const authToken = process.env.TWILIO_AUTH_TOKEN as string;
const accountSid = process.env.TWILIO_ACCOUNT_SID as string;

export default { authToken, twilioNumber, accountSid };
