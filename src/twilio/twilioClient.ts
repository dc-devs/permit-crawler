import twilio from 'twilio';
import config from './config';

const { authToken, accountSid } = config;

export default new (twilio as any)(accountSid, authToken);
