const postProcessing = m =>

    m.protocol + m.baseUrl + m.pathname + [
        'regSource=' + m.regSource,
        '&paymentSource=' + m.paymentSource,
        '&locale=' + m.locale,
        '&layout=' + m.layout,
        m.target ? '&target=' + m.target : '',
        m.queryString ? '&' + m.queryString : ''
    ].join('');

const receive = model => proposal => {

    // @TODO: Convert to immutable data structure
    model = Object.assign({}, model, proposal);
    model.url = postProcessing(model);

    return model;
};

export default receive;
