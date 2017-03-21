import { outerHTML } from 'diffhtml';
import { desktopHeader, mobileHeader } from './theme.js';

export let view = {};

view.props = {};

view.init = model => view.ready(model);

view.ready = model => {

    view.props.children = model.children;

    return {
        mobileheader: mobileHeader(),
        desktopheader: desktopHeader()
    };
};

view.display = representation => {

    Object.keys(representation).forEach(function (el) {

        const component = document.getElementsByTagName(el)[0] || document.getElementById(el);

        if (component) {

            outerHTML(component, representation[el]);

            view.props.children.forEach(c => c());
        }
    });
};
