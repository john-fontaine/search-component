import { Rx } from '../rx/index.js';
import request from '../utils/request';

const stream = new Rx();

const actions = propose => {

    stream.observe(propose);
};

const intents = {

    toggle: stream.update,

    getOptions: () => {

        const onSuccess = data => {

            console.log(data);
        };

        const onFailure = data => {

            console.log(data);
        };

        const options = {
            async: true,
            method: 'GET',
            url: 'https://gaming.williamhill-pp1.com/session/account/options?clientId=liveCasinoSA&returnUrl=' + encodeURIComponent('https://gaming.williamhill-pp1.com/session/user/sessioncheck'),
            withCredentials: false,
            responseType: 'json',
            requestHeader: { 'Accept': 'application/json' }
        };

        return request(options, onSuccess, onFailure);
    }
};

window['MyAccount'] = intents;

export { actions, intents };
