export let actions = {};

actions.init = present => {

    actions.present = present;
};

actions.intents = {

    onSearch: 'searchBoxActions.onSearch'
};

actions.onSearch = data => {

    actions.present(data);
};
