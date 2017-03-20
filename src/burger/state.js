import { actions } from './actions.js';

export let state =  {};

state.init = view => {

    state.view = view;
};

state.representation = model => {

    let representation = 'oops... something went wrong, the system is in an invalid state';

    if (state.ready(model)) {

        representation = state.view.ready(model, actions.intents);

        state.view.display(representation);
    }
};

state.ready = model => typeof model !== 'undefined'

state.render = model => {

    state.representation(model);

    state.nextAction(model);
};

state.nextAction = model => {

    if (model && typeof model.isActive !== 'undefined') {

        //window.postMessage({ component: 'burger', model: model }, location.origin);
        //headerActions.toggle(model);
    }
}
