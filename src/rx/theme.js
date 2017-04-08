import styles from './styles.css';

export default model => {

    return `
        <div class="${styles.rx}">
            <dl>
                <dt class="${styles.action}">${model.action}</dt>
                <dd class="${styles.message}">${model.message}</dd>
            </dl>
        </div>`;
};
