import styles from './styles.css';

export default (model, intents) => {

    return `
        <button id="burger" class="${[styles.burger, styles.spin, model.isActive ? styles.isActive : ''].join(' ')}" onclick="${intents['toggle']}({ isActive: ${model.isActive} })">
            <span class="${styles.box}">
                <span class="${styles.inner}"></span>
            </span>
        </button>`;
};
