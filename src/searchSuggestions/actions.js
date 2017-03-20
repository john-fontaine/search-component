export let actions = {};

actions.init = present => {

    actions.present = present;
};

actions.intents = {

    search: 'searchSuggestionsActions.append'
};

actions.append = data => {

    if (data.origin === location.origin) {

        actions.present({ results: data.data });
    }
};

actions.makeRequest = data => {

    const xhr = new XMLHttpRequest();

    xhr.open('GET', data.url, true);

    xhr.onload = function () {

        actions.present(JSON.parse(xhr.responseText));
    };

    xhr.send();
};

window.addEventListener('message', actions.append, false);
