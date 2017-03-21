import { state } from './state.js';
import { model } from './model.js';
import { actions } from './actions.js';
import { view } from './view.js';

import offcanvas from '../offcanvas/index.js';
import navigation from '../navigation/index.js';
import header from '../header/index.js';

state.init(view);

model.init(state);

actions.init(model.present);

state.render({ component: offcanvas, children: [navigation, header] });

window['appActions'] = actions;
