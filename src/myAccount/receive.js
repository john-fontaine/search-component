const postProcessing = (m, p) => p && typeof p.show === 'undefined' ? !m.show : p.show;

const receive = model => proposal => {

    model = Object.assign({}, model, proposal);

    model.show = postProcessing(model, proposal);

    return model;
};

export default receive;
