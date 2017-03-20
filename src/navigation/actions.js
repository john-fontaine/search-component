export let actions = {};

actions.init = present => {

    actions.present = present;
};

actions.update = data => {

    actions.present(data);
};

window.addEventListener('popstate', actions.update);
