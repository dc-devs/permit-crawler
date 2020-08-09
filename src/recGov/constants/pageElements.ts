interface PageElements {
	[key: string]: string;
}

const pageElements: PageElements = {
	groupSizeInputSelector: '.sarsa-text-field-input',
	passwordInputSelector: '#rec-acct-sign-in-password',
	signInSumbitButtonSelector: '.rec-acct-sign-in-btn',
	availabilityButtonSelector: '.rec-availability-date',
	commericalTripNoButtonSelector: '#prompt-answer-no1',
	logInButtonSelector: '.nav-header-button:nth-child(2)',
	addGroupMemberButtonSelector: '*[aria-label^="Add guests"]',
	emailAddressInputSelector: '#rec-acct-sign-in-email-address',
	bookNowContentSelector: '.per-availability-book-now-content',
};

export default pageElements;
