// @TODO: Add a mounting point

import { outerHTML } from 'diffhtml';
import { default as desktop, mobile } from './theme.js';

export let view = {};

view.init = model => view.ready(model);

view.ready = model=> ({

    desktopnavigation: desktop(model),
    mobilenavigation: mobile(model)
});

view.display = representation => {

    Object.keys(representation).forEach(function (el) {

        const component = document.getElementsByTagName(el)[0] || document.getElementById(el);

        if (component) {

            outerHTML(component, representation[el]);
        }
    });
};
