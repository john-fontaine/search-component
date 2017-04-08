import createElement from '../utils/createElement';
import { actions, intents } from './actions.js';
import receive from './receive.js';
import view from './view.js';
import initialModel from './model.js';
import state from './state.js';

const LoginModal = createElement({
    actions: actions,
    intents: intents,
    propose: receive(initialModel),
    state: state(view),
    view: view
});

export default LoginModal;
