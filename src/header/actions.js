export let actions = {};

actions.init = present => {

    actions.present = present;
};

actions.toggle = data => {

    actions.present(data);
}

//window.addEventListener('message', actions.toggle, false);
