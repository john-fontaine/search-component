import styles from './styles.css';
import { a } from '../utils/elements';

const view = model => a({ id: model.id, className: styles.logo, title: model.title });

export default view;
