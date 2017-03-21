export let actions = {};

actions.init = present => {

    actions.present = present;
};

actions.intents = {

    toggle: 'offcanvasActions.toggle'
};

actions.toggle = data => {

    actions.present(data);
};

window['offcanvasActions'] = actions;