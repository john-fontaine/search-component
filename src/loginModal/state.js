import { outerHTML } from 'diffhtml';

const state = view => ({

    render: model => {

        let component = document.getElementById(model.modal.id);

        if (component === null) {

            document.body.appendChild(view(model));
        } else {

            outerHTML(component, view(model));
        }
    }
});

export default state;
