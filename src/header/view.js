import styles from './styles.css';
import {
    button,
    header
} from '../utils/elements';

import Logo from '../logo/index';
import LoginModal from '../loginModal/index';
import Navigation from '../navigation/index';
import Join from '../join/index';

const view = (model, intents) => {

    return header({ id: model.id, className: styles.header },

        Logo.createElement(),

        Navigation.createElement(),

        Join.createElement(),

        button({ className: styles.login, onclick: LoginModal.intents.toggle }, `Login`)
    );
};

export default view;
