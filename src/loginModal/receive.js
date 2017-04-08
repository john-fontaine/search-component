const receive = model => proposal => {

    // @TODO: Convert to immutable data structure
    model.modal = Object.assign({}, model.modal, proposal.modal);
    model.login = Object.assign({}, model.login, proposal.login);

    return model;
};

export default receive;
