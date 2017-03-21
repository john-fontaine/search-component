import { state } from './state.js';
import { model } from './model.js';
import { actions } from './actions.js';
import { view } from './view.js';

export default (props) => {

    state.init(view);

    model.init(state);

    actions.init(model.present);

    //window.offCanvasActions = actions;

    state.render(model.getInitialState(props));
};