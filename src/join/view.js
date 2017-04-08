import styles from './styles.css';
import {
    button
} from '../utils/elements';

import JoinModal from '../joinModal/index';

const view = model => button({

        id: model.id,

        className: model.className ? model.className : styles.join,

        onclick: JoinModal.intents.toggle(model.url)
    },

    ...model.children
);

export default view;
