import { outerHTML } from 'diffhtml';
import { desktopHeader, mobileHeader } from './theme.js';

export let view = {};

view.init = model => view.ready(model);

view.ready = model => ({

    mobileHeader: mobileHeader(),
    desktopHeader: desktopHeader()
});

view.display = representation => {

    Object.keys(representation).forEach(function (el) {

        const component = document.getElementsByTagName(el)[0] || document.getElementById(el);

        if (component) {

            outerHTML(component, representation[el].replace('</header>', component.innerHTML + '</header>'));
        }
    });
};
