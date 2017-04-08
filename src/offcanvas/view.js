import styles from './styles.css';
import {
    section,
    main
} from '../utils/elements';

const view = model =>

    section({ id: model.id, className: [styles.offcanvas, model.isActive ? styles.isActive : ''].join(' ') },

        main({ className: styles.wrapper },

            model.children
        )
    );

export default view;
