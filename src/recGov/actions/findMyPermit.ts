import { Page } from 'puppeteer';
import bookNow from './bookNow';
import setGroupSize from './setGroupSize';
import getPermitInfo from './getPermitInfo';
import setIsCommercialTrip from './setIsCommercialTrip';
import { sendText } from '../../twilio';
import { forestNameIdMap } from '../constants';
import config from '../../crawlConfigs/recGovWildernessPermitConfig';
import setDate from './setDate';

// const pageUrl = generatePageUrl();

const { tripDetails, number } = config;
const { month, day, forestName, groupSize } = tripDetails;

const findMyPermit = async (page: Page): Promise<boolean> => {
    const isCommericial = forestNameIdMap[forestName].commercial;
    if (isCommericial) {
        await setIsCommercialTrip(page);
    }
    await setDate(page);
    await setGroupSize(page);
    await page.waitForTimeout(1000);

    const permitInfo = await getPermitInfo(page);
    console.log(permitInfo);

    if (permitInfo.availability) {
        await bookNow(page, permitInfo.site);
        await sendText({
            body: `${groupSize} permits at ${permitInfo.site} for ${month}/${day} are booked and sitting in your cart... time to purchase!! \n https://www.recreation.gov/cart`,
            numbers: [number],
        });

        return true;
    } else {
        return false;
    }
};

export default findMyPermit;
