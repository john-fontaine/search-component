import styles from './styles.css';

import {
    div,
    span
} from '../../utils/elements';

const balanceElement = balance =>

    div({ className: styles.balance },

        titleElement(balance.title, balance.subtitle),

        amountElement(balance.currency, balance.amount),

        balance.balances && balance.balances.length ? balance.balances.map(b => balanceElement(b)) : ''
    );

const titleElement = (title, subtitle) =>

    span({ className: styles.title },

        title,

        subtitle ? span({ className: styles.subtitle }, subtitle) : ''
    );

const amountElement = (currency, amount) => span({ className: styles.amount }, currency + amount);

const view = (model, intents) =>

    div({ id: model.id, className: styles.wrapper },

        model.balances.map(b => balanceElement(b))
    )

export default view;
