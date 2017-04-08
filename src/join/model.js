const initialModel = {
    id: 'join',
    children: 'Join',

    baseUrl: 'auth.williamhill.com',
    pathname: '/register?',
    locale: 'en-gb',
    mobile: false,
    native: false,
    nui: '',
    layout: 'desktop',
    paymentSource: '',
    regSource: 'XX',
    protocol: 'https://',
    queryString: '',
    target: false,

    mobileProducts: ['NS', 'AS', 'SM', 'MG', 'ML', 'MC', 'MU', 'MV'],
    nativeProducts: ['NS', 'AS'],
};

// @TODO: Validate products from array

export default initialModel;
