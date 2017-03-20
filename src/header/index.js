import { state } from './state.js';
import { model } from './model.js';
import { actions } from './actions.js';
import { view } from './view.js';

state.init(view);

model.init(state);

actions.init(model.present);

state.render();

window['headerActions'] = actions;

import logo from '../logo/index.js';
import navigation from '../navigation/index.js';
import burger from '../burger/index.js';

logo.init();
navigation.init();
burger.init();
