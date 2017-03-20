// @TODO: Convert this into one configurable navigation

import styles from './styles.css';

const navItem = (title, url, isActive) => {

    return `<a href="${url}" class="${isActive ? styles.active : ''}">${title}</a>`;
}

function desktop (model) {

    return `
        <nav id="desktopNavigation" class="${styles.navigation}">
            ${model.map(m => navItem(m.title, m.url, m.isActive)).join('')}    
        </nav>`;
}

function mobile (model) {

    return `
        <nav id="mobileNavigation" class="${styles.mobile}">
            ${model.map(m => navItem(m.title, m.url, m.isActive)).join('')}
        </nav>`;
}

export { desktop as default, mobile };
