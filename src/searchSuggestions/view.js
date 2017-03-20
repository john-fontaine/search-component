import theme from './theme.js';

export let view = {};

view.init = (model, intents) => view.ready(model, intents);

view.ready = (model, intents) => ({ searchSuggestions: theme(model, intents) });

view.display = (representation) => {

    Object.keys(representation).forEach(function (el) {

        const component = document.getElementsByTagName(el)[0];

        component.innerHTML = representation[el];
    });
};
