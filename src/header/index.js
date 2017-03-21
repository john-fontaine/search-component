import logo from '../logo/index.js';
import navigation from '../navigation/index.js';
import burger from '../burger/index.js';

import { state } from './state.js';
import { model } from './model.js';
import { actions } from './actions.js';
import { view } from './view.js';

export default () => {

    state.init(view);

    model.init(state);

    actions.init(model.present);

    window['headerActions'] = actions;
    state.render({ children: [navigation, logo, burger] });


};