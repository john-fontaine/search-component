import { outerHTML } from 'diffhtml';

const state = (view, actions) => ({

    render: model => {

        outerHTML(document.getElementById(model.id), view(model, actions));
    }
});

export default state;
