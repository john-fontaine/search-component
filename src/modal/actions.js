import { Rx } from '../rx/index.js';

const toggleStream = new Rx();

const actions = propose => {

    toggleStream.observe(propose);
};

const intents = {

    toggle: toggleStream.update
};

export { actions, intents };
