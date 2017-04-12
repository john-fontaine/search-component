const receive = model => proposal => {

    // @TODO: Convert to immutable data structure
    model = Object.assign({}, model, proposal);

    if (proposal && typeof proposal.balances !== 'undefined' && typeof proposal.currency !== 'undefined') {

        const newBalances = model.balances.map(b => Object.assign({}, b, { amount: proposal.balance, currency: proposal.currency }));

        delete model.balances;

        model.balacnes = newBalances;
    }

    return model;
};

export default receive;
