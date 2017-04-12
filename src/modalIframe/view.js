import styles from './styles.css';
import {
    iframe
} from '../utils/elements';

import Modal from '../modal/index';

const view = model =>

    Modal.createElement(model.modal,

        iframe({
            id: model.iframe.id,
            src: model.iframe.url,
            className: styles.iframe
        })
    );

export default view;
