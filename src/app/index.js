import createElement from '../utils/createElement';
import receive from './receive.js';
import view from './view.js';
import initialModel from './model.js';
import state from './state.js';

const App = createElement({
    propose: receive(initialModel),
    state: state(view),
    view: view
});

export default App;