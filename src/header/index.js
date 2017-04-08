import createElement from '../utils/createElement';
import { actions, intents } from './actions';
import receive from './receive';
import view from './view';
import initialModel from './model';
import state from './state';

const Header = createElement({
    actions: actions,
    intents: intents,
    propose: receive(initialModel),
    state: state(view, intents),
    view: view
});

export default Header;
