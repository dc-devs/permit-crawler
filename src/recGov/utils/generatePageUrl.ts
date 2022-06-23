import config from '../../crawlConfigs/recGovWildernessPermitConfig';
import { forestNameIdMap } from '../constants';

const { tripDetails } = config;
const { type, forestName } = tripDetails;

const generatePageUrl = (): string => {
	const permitId: string = forestNameIdMap[forestName].id;

	const pageUrl: string = `https://www.recreation.gov/permits/${permitId}/registration/detailed-availability?type=${type}`;

	return pageUrl;
};

export default generatePageUrl;
