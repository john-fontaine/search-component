// @TODO: Add a mounting point

import { outerHTML } from 'diffhtml';
import theme from './theme.js';

export let view = {};

view.init = model => view.ready(model);

view.ready = model => {

    return { rx: theme(model) };
};

view.display = representation => {

    Object.keys(representation).forEach(function (el) {

        const component = document.getElementsByTagName(el)[0] || document.getElementById(el);

        if (component) {

            outerHTML(component, representation[el]);
        }
    });
};
