import createElement from '../utils/createElement';

import initialModel from './model.js';
import receive from './receive.js';
import { actions, intents } from './actions.js';

const Translation = createElement({
    actions: actions,
    intents: intents,
    propose: receive(initialModel),
});

export default Translation;
