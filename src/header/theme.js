import styles from './styles.css';

function mobileHeader () {

    return `
        <header class="${styles.header}">
            <burger></burger>
            <logo></logo>
        </header>`;
}

function desktopHeader () {

    return `
        <header class="${styles.header}">
            <logo></logo>
            <desktopnavigation></desktopnavigation>
        </header>`;
}

export { desktopHeader, mobileHeader };
