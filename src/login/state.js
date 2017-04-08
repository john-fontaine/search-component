import { outerHTML } from 'diffhtml';

const state = (view, actions) => ({

    render: model => {

        let component = document.getElementById(model.id);

        if (component === null) {

            document.body.appendChild(view(model, actions));
        } else {

            outerHTML(component, view(model, actions));
        }
    }
});

export default state;
