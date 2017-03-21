// @TODO: Add a mounting point

import { outerHTML } from 'diffhtml';
import theme from './theme.js';

export let view = {};

view.init = (model, intents) => view.ready(model, intents);

view.ready = (model, intents) => {

    return { burger: theme(model, intents) };
};

view.display = representation => {

    Object.keys(representation).forEach(function (el) {

        const component = document.getElementsByTagName(el)[0] || document.getElementById(el);

        if (component) {

            outerHTML(component, representation[el]);
        }
    });
};
