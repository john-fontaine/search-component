import styles from './styles.css';

import {
    button
} from '../../utils/elements';

import MyAccountButton from '../myAccountButton/index';
import ModalIframe from '../../modalIframe/index';

const typesOfDepositButtons = {

    simple: model => button({
        id: model.id,
        className: styles.button,
        onclick: ModalIframe.intents.toggle(model.modal)
    }, model.title),

    withIcon: model => MyAccountButton.createElement({
        ...model,
        onclick: ModalIframe.intents.toggle(model.modal)
    })
};

const view = model =>

    typesOfDepositButtons[model.version] ?

        typesOfDepositButtons[model.version](model) :

        typesOfDepositButtons.simple(model);

export default view;
