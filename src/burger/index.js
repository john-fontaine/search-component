import createElement from '../utils/createElement';
import { actions, intents } from './actions.js';
import receive from './receive.js';
import view from './view.js';
import initialModel from './model.js';
import state from './state.js';

const Burger = createElement({
    actions: actions,
    intents: intents,
    propose: receive(initialModel),
    state: state(view, intents),
    view: view
});

export default Burger;
