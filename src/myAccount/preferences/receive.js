const receive = model => proposal => {

    // @TODO: Convert to immutable data structure
    model = Object.assign({}, model, proposal);

    return model;
};

export default receive;
