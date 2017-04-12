import { Rx } from '../rx/index';

const stream = new Rx();

const actions = propose => {

    stream.observe(propose);
};

const intents = {

    toggle: data => () => stream.update(data)
};

export { actions, intents };
