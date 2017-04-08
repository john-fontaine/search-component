import { outerHTML } from 'diffhtml';

const state = (view, actions) => ({

    render: model => {

        let component = document.getElementById(model.id);

        if (component === null) {

            document.body.appendChild(view(model, actions)); // @TODO: Pass the root and fallback to body
        } else {

            outerHTML(component, view(model, actions));
        }
    }
});

export default state;
