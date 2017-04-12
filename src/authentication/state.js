import { innerHTML } from 'diffhtml';

const state = (view, actions) => ({

    render: model => {

        /*document.getElementById(model.id).innerHTML = '';
        document.getElementById(model.id).appendChild(view(model, actions).children);*/
        const parent = document.getElementById(model.id).parentNode;
        parent.removeChild(document.getElementById(model.id));
        parent.appendChild(view(model, actions));
        /*innerHTML(, view(model, actions));*/
    }
});

export default state;
