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

state.ready = model => typeof model !== 'undefined';

state.render = model => {

    state.representation(model);

    state.nextAction(model);
};

state.nextAction = model => {

    if (model && model.notify === 'offcanvas') {

        //window.postMessage({ component: 'offcanvas', action: 'toggle', model: model }, location.origin);
        //window['offCanvasActions'].toggle(model);
    }
};