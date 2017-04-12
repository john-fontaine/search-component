import { outerHTML } from 'diffhtml';

const state = (view, intents) => ({

    render: model => {

        let component = document.getElementById(model.id);

        if (component === null) {

            document.body.appendChild(view(model, intents));
        } else {

            outerHTML(component, view(model, intents));
        }
    }
});

export default state;
