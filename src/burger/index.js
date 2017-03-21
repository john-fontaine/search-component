import { state } from './state.js';
import { model } from './model.js';
import { actions } from './actions.js';
import { view } from './view.js';

export default () => {

    state.init(view);

    model.init(state);

    actions.init(model.present);

    state.render(model.getInitialState());

    window['burgerActions'] = actions;
};
