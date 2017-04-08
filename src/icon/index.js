import createElement from '../utils/createElement';

import initialModel from './model.js';
import receive from './receive.js';
import view from './view.js';

// @TODO: Consider changing this to { proposal, accept, learn, view: accept(initialModel) }
const Icon = createElement({
    propose: receive(initialModel),
    view: view
});

export default Icon;
