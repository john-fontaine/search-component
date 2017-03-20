export let actions = {};

actions.init = present => {

    actions.present = present;
};

actions.intents = {

    toggle: 'burgerActions.toggle'
};

actions.toggle = data => {

    actions.present(data);
};
