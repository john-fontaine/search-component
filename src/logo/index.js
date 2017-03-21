import { state } from './state.js';
import { model } from './model.js';
import { view } from './view.js';

export default () => {

    state.init(view);

    model.init(state);

    state.render(model.data);
};
