import { Rx } from '../rx/index.js';

const toggleStream = new Rx();

const actions = propose => {

    toggleStream.observe(propose);

    window.addEventListener('message', intents.listener);
};

const intents = {

    listener: event => {

        if (event && event.data === 'modal_close_without_reload' || event.data === 'modal_close') {

            intents.toggle({ show: false });
        }
    },

    toggle: toggleStream.update
};

export { actions, intents };
