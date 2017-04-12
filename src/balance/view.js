import styles from './styles.css';

import {
    button
} from '../utils/elements';

import MyAccount from '../myAccount/index';
import Icon from '../icon/index';

const view = model =>

    button({
            id: model.id,
            className: styles.button,
            onclick: MyAccount.intents.toggle
        },

        `${model.balance} ${model.currency}`,

        Icon.createElement({ style: { lineHeight: 1 }, className: styles.icon, name: model.icon })
    );

export default view;
