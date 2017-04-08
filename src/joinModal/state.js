// @TODO: Need to destroy and remove from DOM once modal is not active
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
