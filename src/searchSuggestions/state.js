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

state.ready = model => model && model.length;

state.nextAction = model => {

    if (model && model.url) {

        actions.makeRequest(model);
    }
};

state.render = model => {

    state.representation(model);

    state.nextAction(model);
};
