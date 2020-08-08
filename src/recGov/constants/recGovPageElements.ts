interface PageElements {
	logInButton: string;
	emailAddressInput: string;
	passwordInput: string;
	signInSumbitButton: string;
	groupSizeInput: string;
	commericalTripNoButton: string;
	addGroupMemberButton: string;
	[key: string]: string;
}

const pageElements: PageElements = {
	logInButton: '.nav-header-button:nth-child(2)',
	emailAddressInput: '#rec-acct-sign-in-email-address',
	passwordInput: '#rec-acct-sign-in-password',
	signInSumbitButton: '.rec-acct-sign-in-btn',
	groupSizeInput: '.sarsa-text-field-input',
	commericalTripNoButton: '#prompt-answer-no1',
	addGroupMemberButton: '*[aria-label^="Add guests"]',
};

export default pageElements;
