function desktop () {

    return `
        <h2>Desktop Header</h2>
        <desktopheader></desktopheader>`;
}

function mobile (model) {

    return `
        <h2>Mobile Header</h2>
        <offcanvas>
            <mobilenavigation></mobilenavigation>
            <mobileheader></mobileheader>
        </offcanvas>`;
}

export { desktop, mobile };
