import styles from './styles.css';

import {
    button,
    div
} from '../utils/elements';

import Balance from '../balance/index';
import Join from '../join/index';
import LoginModal from '../loginModal/index';
import MyAccount from '../myAccount/index';
import Deposit from '../myAccount/deposit/index';

const logInComponents = (user, intents) => [

    Deposit.createElement({ className: styles.button, version: 'simple' }),

    Balance.createElement({ balance: user.balance, currency: user.currency }),

    MyAccount.createElement({ user, show: false, intents })
];

const logOutComponents = intents => {

    intents.observe(LoginModal.intents.toggle); // observe only on logged out stream

    return [

        Join.createElement({ className: null }, `Join`),

        button({
            className: styles.button,
            onclick: LoginModal.intents.toggle
        }, `Login`)
    ];
};

const view = (model, intents) =>

    div({ id: model.id, className: styles.controls },

        model.user && model.user.loggedin ?

            logInComponents(model.user, intents) :

            logOutComponents(intents)
    );

export default view;
