import { innerHTML } from 'diffhtml';
import { desktop, mobile } from './theme.js';

export let view = {};

view.props = {};

view.init = model => view.ready(model);

view.ready = model => {

    view.props = model;

    return {

        desktop: desktop(model),
        mobile: mobile(model)
    };
};

view.display = representation => {

    Object.keys(representation).forEach(function (el) {

        const component = document.getElementById(el);

        if (component) {

            innerHTML(component, representation[el]);

            view.props.component({ children: view.props.children });
        }
    });
};
