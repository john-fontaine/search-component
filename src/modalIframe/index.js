import createElement from '../utils/createElement';

import initialModel from './model.js';
import receive from './receive.js';
import state from './state.js';
import view from './view.js';
import { actions, intents } from './actions.js';

const ModalIframe = createElement({
    actions: actions,
    intents: intents,
    propose: receive(initialModel),
    state: state(view),
    view: view
});

export default ModalIframe;
