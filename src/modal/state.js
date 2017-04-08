import { outerHTML } from 'diffhtml';

const nap = model => {

    if (!model.show) {

        destroy(model);
    }
};

const destroy = model => {

    const component = document.getElementById(model.id);
    component.parentElement.removeChild(component);
};

const state = (view, actions) => ({

    render: model => {

        let component = document.getElementById(model.id);

        if (component === null) {

            document.body.appendChild(view(model, actions));
        } else {

            outerHTML(component, view(model, actions));
        }

        nap(model);
    }
});

export default state;
