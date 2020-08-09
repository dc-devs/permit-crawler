const twilio = require('twilio');

(async () => {
	const accountSid = 'ACa15e235e82e5417d9d102c1992d4ac73';
	const authToken = '87954282ec5f13818d9c019dbb614fe1';

	const client = new twilio(accountSid, authToken);

	const message = await client.messages.create({
		body:
			'Permit Crawler: Permits are now available, time to book! https://www.recreation.gov/permits/233262/registration/detailed-availability?type=overnight-permit&date=2020-08-23',
		to: '+19256399635',
		from: '+19254337600',
	});

	console.log(message);
})();
