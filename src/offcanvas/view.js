import { outerHTML } from 'diffhtml';
import theme from './theme.js';

export let view = {};

view.init = (model) => view.ready(model);

view.props = {};

view.ready = (model) => {

    view.props.children = model.children;

    return { offcanvas: theme(model) };
};

view.display = representation => {

    const getMountPoint = (el) => el.querySelector('main') || el;

    Object.keys(representation).forEach(function (el) {

        const component = document.getElementsByTagName(el)[0] || document.getElementById(el);

        if (component) {

            const children = getMountPoint(component).innerHTML;

            outerHTML(component, representation[el].replace('</main>', children + '</main>'));

            if (view.props && view.props.children) {

                view.props.children.forEach(c => c());
            }
        }
    });
};
