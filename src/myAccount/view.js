import styles from './styles.css';

import {
    button,
    div,
    footer,
    header,
    span
} from '../utils/elements';

import Balance from './balance/index';
import BalanceTransfer from './balanceTransfer/index';
import Deposit from './deposit/index';
import FreeBets from './freeBets/index';
import GamblingControls from './gamblingControls/index';
import LogOut from './logOut/index';
import Messages from './messages/index';
import MyAccount from './myAccount/index';
import Preferences from './preferences/index';
import ReverseWithdraw from './reverseWithdraw/index';
//import Rewards from './rewards/index';
import Withdraw from './withdraw/index';

const view = (model, intents) =>

    div({ id: model.id, className: [styles.myAccount, model.show ? styles.show : ''].join(' ') },

        button({ className: styles.close, onclick: intents.toggle }, `×`),

        header({ className: styles.title },

            `Hi ${model.user.firstName},`,

            span({ className: styles.subtitle }, ` happy betting today`)
        ),

        Balance.createElement({ balance: model.user.balance, currency: model.user.currency }),

        Deposit.createElement({ version: 'withIcon' }),

        BalanceTransfer.createElement(),

        Withdraw.createElement(),

        ReverseWithdraw.createElement(),

        MyAccount.createElement(),

        Preferences.createElement(),

        //Rewards.createElement(),

        FreeBets.createElement(),

        Messages.createElement(),

        GamblingControls.createElement(),

        LogOut.createElement({ onclick: model.intents.logout }),

        footer({ className: styles.footer },

            span({}, `Account ID: ${model.user.accountNo}`)
        )
    );

export default view;
