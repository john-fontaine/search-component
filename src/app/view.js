import styles from './styles.css';
import {
    div
} from '../utils/elements';

import Header from '../header/index';

// @TOOD: Make the view render() instead of the state??

const view = model =>

    div({ id: model.id, className: styles.app },

        Header.createElement(model.header)
    );

export default view;
