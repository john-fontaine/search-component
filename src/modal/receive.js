const postProcessing = (m, p) => p && typeof p.show === 'undefined' ? !m.show : p.show;

const receive = model => proposal => {

    // @TODO: Convert to immutable data structure
    //const id = model.id;
    model = Object.assign({}, model, proposal);
    model.show = postProcessing(model, proposal);
    //model.id = id;

    return model;
};

export default receive;
