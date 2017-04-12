import { outerHTML } from 'diffhtml';

const nap = model => {

    if (!model.show) {

        destroy(model);
    }
};

const destroy = model => {

    const component = document.getElementById(model.id);

    if (component !== null) {

        component.parentElement.removeChild(component);
    }
};

const state = (view, actions) => ({

    render: model => {

        if (!model.show) {

            destroy(model);
        } else {

            let component = document.getElementById(model.id);

            if (component === null) {

                document.body.appendChild(view(model, actions));
            } else {

                outerHTML(component, view(model, actions));
            }
        }
    }
});

export default state;
