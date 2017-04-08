import createElement from '../utils/createElement';
import { actions } from './actions.js';
import receive from './receive.js';
import view from './view.js';
import initialModel from './model.js';
import state from './state.js';

const Navigation = createElement({
    actions: actions,
    propose: receive(initialModel),
    state: state(view),
    view: view
});

export default Navigation;
