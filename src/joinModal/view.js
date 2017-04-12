import styles from './styles.css';
import Modal from '../modal/index';
import {
    iframe
} from '../utils/elements';

const view = model =>

    Modal.createElement(model.modal,

        iframe({
            id: model.iframe.id,
            src: model.iframe.url,
            className: styles.iframe
        })
    );

export default view;
