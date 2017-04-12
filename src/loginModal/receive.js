const filter = (p) => {

    if (p && typeof p.loggedin !== 'undefined' && p.loggedin) {

        return { show: false };
    }

    if (p && p.type === 'click') {

        return { show: true };
    }
};

const receive = model => proposal => {

    // @TODO: Convert to immutable data structure
    model.modal = Object.assign({}, model.modal, proposal.modal, filter(proposal));
    model.login = Object.assign({}, model.login, proposal.login);

    return model;
};

export default receive;
