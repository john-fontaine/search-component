import style from './style.css';
import {
    span
} from '../utils/elements';

const view = model =>

    span({

        className: [style['icon-' + model.name], model.className].join(' '),

        style: model.style
    },

    model.children
);

export default view;
