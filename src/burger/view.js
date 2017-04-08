import styles from './styles.css';
import {
    button,
    span
} from '../utils/elements';

const view = (model, intents) =>

    button({
        id: model.id,
        className: [styles.burger, styles.spin, model.isActive ? styles.isActive : ''].join(' '),
        onclick: intents.toggle
    },

        span({ className: styles.box },

            span({ className: styles.inner })
        )
    );

export default view;
