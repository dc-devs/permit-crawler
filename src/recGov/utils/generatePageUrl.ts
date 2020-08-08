import config from '../../crawlConfigs/recGovWildernessPermitConfig';
import { forestNamePermitIdMap } from '../constants';

const { tripDetails } = config;
const { type, date, forestName } = tripDetails;

const generatePageUrl = (): string => {
	const permitId: string = forestNamePermitIdMap[forestName];
	const pageUrl: string = `https://www.recreation.gov/permits/${permitId}/registration/detailed-availability?type=${type}&date=${date}`;

	return pageUrl;
};

export default generatePageUrl;
