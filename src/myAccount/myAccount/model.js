const initialModel = {
    icon: 'accountLI',
    id: 'accountLI',
    isActive: false,
    title: 'My Account',
    modal: {
    	url: 'https://myaccount.williamhill-pp1.com/statements?closeButton=true&layout=desktop&statementType=casino&locale=en-gb',
        //url: 'https://gaming.williamhill.com/session/account/view-payment-history?clientId=gamesSA&amp;returnUrl=https%3A%2F%2Fgames.williamhill.com',
        show: true,
        showHeader: false
    }
};

// @TODO: Validate products from array

export default initialModel;
