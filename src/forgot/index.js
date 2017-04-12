import createElement from '../utils/createElement';

import initialModel from './model';
import receive from './receive';
import state from './state';
import view from './view';

// @TODO: Consider changing this to { proposal, accept, learn, view: accept(initialModel) }
const Forgot = createElement({
    propose: receive(initialModel),
    state: state(view),
    view: view
});

export default Forgot;
