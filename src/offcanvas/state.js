export let state =  {};

state.init = view => {

    state.view = view;
};

state.representation = model => {

    let representation = 'oops... something went wrong, the system is in an invalid state';

    if (state.ready(model)) {

        representation = state.view.ready(model);

        state.view.display(representation);
    }
};

state.ready = model => true; //typeof model !== 'undefined';

state.nextAction = () => {

};

state.render = model => {

    state.representation(model);

    state.nextAction();
};
