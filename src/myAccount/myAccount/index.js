import createElement from '../../utils/createElement';

import initialModel from './model.js';
import receive from './receive.js';
import state from './state.js';
import view from './view.js';

// @TODO: Consider changing this to { proposal, accept, learn, view: accept(initialModel) }
const MyAccount = createElement({
    propose: receive(initialModel),
    state: state(view),
    view: view
});

export default MyAccount;
