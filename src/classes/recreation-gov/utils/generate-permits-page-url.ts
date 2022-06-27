import { IConfig } from '../../../interfaces';

interface IProps {
	config: IConfig;
}

const generatePermitsPageUrl = ({ config }: IProps) => {
	const { tripDetails } = config;
	const { date, permitId, permitType } = tripDetails;

	const url = `https://www.recreation.gov/permits/${permitId}/registration/detailed-availability?date=${date}&type=${permitType}`;

	return url;
};

export default generatePermitsPageUrl;
