import styles from './styles.css';

import {
    a
} from '../utils/elements';

import ModalIframe from '../modalIframe/index';

const view = model =>

    a({
        className: styles.forgot,
        onclick: ModalIframe.intents.toggle(model.modal)
    }, `Forgot your username/password?`)

export default view;
