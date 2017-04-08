import styles from './styles.css';
import {
    button,
    header,
    div
} from '../utils/elements';

const modalCloseButton = (m, i) => {

    if (m.showCloseButton) {

        return button({ className: styles.close, onclick: i.toggle }, `×`);
    }
};

const modalHeader = (m, i) => {

    if (m.showHeader) {

        return header({ className: styles.header },

            m.title,

            modalCloseButton(m, i)
        );
    }
};

const view = (model, intents) =>

    div({ id: model.id, className: [styles.modal, model.show ? styles.show : ''].join(' ') },

        div({ className: styles.inner },

            modalHeader(model, intents),

            div({ className: styles.main },

                model.children
            )
        )
    );

export default view;
