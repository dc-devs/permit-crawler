interface PageElements {
	[key: string]: string;
}

const pageElements: PageElements = {
	groupSizeInputSelector: '.sarsa-text-field-input',
	passwordInputSelector: '#rec-acct-sign-in-password',
	signInSumbitButtonSelector: '.rec-acct-sign-in-btn',
	availabilityButtonSelector: 'button',
	commericalTripNoButtonSelector: '#prompt-answer-no1',
	logInButtonSelector: 'button#ga-global-nav-log-in-link',
	addGroupMemberButtonSelector: '*[aria-label^="Add guests"]',
	emailAddressInputSelector: 'input#email',
	bookNowContentSelector: '.per-availability-book-now-content',
	dateInputSelector: '#SingleDatePicker1'
};

export default pageElements;
