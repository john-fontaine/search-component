import styles from './styles.css';
import {
    nav,
    a
} from '../utils/elements';

const view = model =>

    nav({ id: model.id, className: [styles.navigation, model.isMobile ? styles.mobile : ''].join(' ') },

        Object.keys(model.items).map(key =>

            a({ href: key, className: model.items[key].isActive ? styles.active : '' }, model.items[key].title)
        )
    );

export default view;
