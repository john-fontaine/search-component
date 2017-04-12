import { Rx } from '../rx/index';
import Modal from '../modal/index';

const toggleStream = new Rx();

const actions = propose => {

    toggleStream.observe(propose);
};

const intents = {

    toggle: toggleStream.update,
};

export { actions, intents };
