import styles from './styles.css';

export default model => {

    return `<a href="${model.url}" class="${styles.logo}" title="${model.title}"></a>`;
};
