import createElement from '../utils/createElement';
import receive from './receive.js';
import view from './view.js';
import initialModel from './model.js';

const Logo = createElement({
    propose: receive(initialModel),
    view: view
});

export default Logo;
