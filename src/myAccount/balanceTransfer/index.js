import createElement from '../../utils/createElement';

import initialModel from './model';
import receive from './receive';
import state from './state';
import view from './view';
import { actions, intents } from './actions';

// @TODO: Consider changing this to { proposal, accept, learn, view: accept(initialModel) }
const BalanceTransfer = createElement({
    actions: actions,
    intents: intents,
    propose: receive(initialModel),
    state: state(view),
    view: view
});

export default BalanceTransfer;
