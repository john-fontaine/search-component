import styles from './styles.css';

import {
    button
} from '../../utils/elements';

import Icon from '../../icon/index';

const view = model =>

    button({
            id: model.id,
            className: [styles.button, model.isActive ? styles.isActive : ''].join(' '),
            onclick: model.onclick
        },

        Icon.createElement({ className: styles.icon, name: model.icon }),

        model.title
    );

export default view;
