export let actions = {};

actions.init = present => {

    actions.present = present;
};

actions.intents = {

    toggle: 'offCanvasActions.toggle'
};

actions.toggle = data => {

    actions.present(data);
};

actions.dispatch = data => {

    if (data.origin === location.origin && data.data.component === 'offcanvas') {

        actions[data.data.action](data.data.model);
    }
};

//window.addEventListener('message', actions.dispatch, false);