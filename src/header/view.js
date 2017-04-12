import styles from './styles.css';
import {
    button,
    header
} from '../utils/elements';

import Logo from '../logo/index';
import Navigation from '../navigation/index';
import Authentication from '../authentication/index';


const view = (model, intents) => {

    return header({ id: model.id, className: styles.header },

        Logo.createElement(),

        Navigation.createElement(),

        Authentication.createElement()
    );
};

export default view;
