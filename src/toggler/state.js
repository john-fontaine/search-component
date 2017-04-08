export let state =  {};

state.ready = model => typeof model !== 'undefined';

state.nextAction = model => {

    if (state.ready(model)) {

        return model;
    }
};

state.render = model => {

    return state.nextAction(model);
};
