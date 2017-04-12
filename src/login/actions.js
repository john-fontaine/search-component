import { Rx } from '../rx/index.js';
import Authentication from '../authentication/index';

const actions = propose => {

};

const intents = {

    login: event => {

        event.preventDefault()

        const formData = { username: event.target.elements['username'].value, password: event.target.elements['password'].value };

        Authentication.intents.login(formData);
    }
};

export { actions, intents };
