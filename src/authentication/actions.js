import { Rx } from '../rx/index';
import request from '../utils/request';

const simulateSessionResponse = {
    "loggedin":true,
    "accountNo":"58760NC",
    "username":"13db5f41191e8e7ea5141b16cd58c75af5e27071",
    "firstName":"Patrick",
    "lastName":"Langley",
    "usernamePlain":"johntest1",
    "balance":"10000.00",
    "currency":"GBP",
    "casino": {
        "balance":"",
        "currentBalance":"",
        "bonusBalance":"",
        "declinableBonus":"",
        "declinableWinnings":"",
        "leftToWager":""
    },
    "returning":true
};

const stream = new Rx();

const actions = propose => {

    stream.observe(propose);
};

const casURL = 'https://auth.williamhill-pp1.com/cas/login?cust_login=true&joinin_link=$registrationUrl&service=';

const serviceURL = 'https://gaming.williamhill-pp1.com/session/auth/return?returnUrl=' + encodeURIComponent( 'https://gaming.williamhill-pp1.com/session/user/sessioncheck' ) + '&clientId=Casino';

const firebaseClient = {

    request: isLoggedin => {

        if (isLoggedin) {

            const options = {
                async: true,
                method: 'GET',
                url: 'https://gaming.williamhill-pp1.com/session/user/fbauth?applicationId=casino',
                withCredentials: false,
                responseType: 'json',
                requestHeader: { 'Accept': 'application/json' }
            };

            return request(options, firebaseClient.onSuccess, firebaseClient.onFailure);
        }
    },

    onSuccess: data => data && data.fbToken,

    onFailure: data => console.log('Failed to get firebase token: ', data)
};

const casClient = {

    logout: () => {

        const options = {
            async: true,
            method: 'GET',
            url: 'https://gaming.williamhill-pp1.com/session/auth/logout?returnUrl=$returnUrl&clientId=mobileCasino',
            withCredentials: true,
            responseType: 'json',
            requestHeader: { 'Accept': 'application/json' }
        };

        //request(options, casClient.onSuccessLogout, casClient.onFailure)
        request(options, casClient.onSuccessLogout, casClient.onSuccessLogout)
    },

    onSuccessLogout: data => {

        //casClient.sessionCheck(data);
        stream.update({"loggedin":false,"gatecheck":true,"balance":0,"currency":"GBP","returning":true});
    },

    sessionCheck: data => {

        const options = {
            async: true,
            method: 'GET',
            url: 'https://gaming.williamhill-pp1.com/session/user/sessioncheck',
            withCredentials: true,
            responseType: 'json',
            requestHeader: { 'Accept': 'application/json' }
        };

        //request(options, stream.update, casClient.onFailure);
        stream.update(simulateSessionResponse);
    },

    firstTrip: formData => {

        const options = {
            async: true,
            method: 'GET',
            url: casURL + serviceURL,
            withCredentials: true,
            responseType: 'json',
            requestHeader: { 'Accept': 'application/json' }
        };

        request(options, casClient.secondTrip(formData), casClient.onFailure)
    },

    secondTrip: formData => data => {

        const options = {
            async: true,
            method: 'POST',
            url: casURL + serviceURL,
            withCredentials: true,
            responseType: 'json',
            requestHeader: {
                'Accept': 'application/json',
                'Content-type': 'application/x-www-form-urlencoded',
                'Accept-Language': 'en-gb'
            },
            data: formData
        };

        if (data && data.form_defaults) {

            options.data.lt = data.form_defaults.lt;
            options.data.executionKey = data.form_defaults.executionKey;
            options.data._eventId = data.form_defaults._eventId;
            options.data._rememberUsername = 'on';
            options.data._rememberMe = 'off';

            request(options, casClient.sessionCheck, casClient.onFailure)
        }

        if (data && data.success) {

            casClient.sessionCheck(data);
        }
    },

    onFailure: data => console.log('REQUEST FAILED: ', data)
};

const intents = {

    sessionCheck: casClient.sessionCheck,

    // @TODO: Composable functions for casClient
    login: formData => casClient.firstTrip(formData),

    logout: casClient.logout,

    observe: stream.observe
};

window.Authentication = { intents: intents };

export { actions, intents };
