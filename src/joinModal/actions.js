import { Rx } from '../rx/index';

const stream = new Rx();

const actions = propose => {

    stream.observe(propose);
};

const intents = {

    toggle: url => () => stream.update({ iframe: { url: url } })
};

export { actions, intents };
