import styles from './styles.css';

export default model => {

    return `
        <section id="offcanvas" class="${[styles.offcanvas, model.isActive ? styles.isActive : ''].join(' ')}">
            <main style="height: 500px;"></main>
        </section>`;
};
