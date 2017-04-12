import { Rx } from '../../rx/index.js';

const stream = new Rx();

const actions = propose => {

    stream.observe(propose);
};

const intents = {

    open: stream.update
};

export { actions, intents };
