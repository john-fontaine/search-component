import createElement from '../utils/createElement';

import initialModel from './model';
import receive from './receive';
import state from './state';
import view from './view';
import { actions, intents } from './actions';

// @TODO: Change this to Authentication
const Authentication = createElement({
    actions: actions,
    intents: intents,
    propose: receive(initialModel),
    state: state(view, intents),
    view: view
});

export default Authentication;
