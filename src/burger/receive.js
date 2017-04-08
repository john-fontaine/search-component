const receive = model => proposal => {

    // @TODO: Convert to immutable data structure
    if (proposal && typeof proposal.id !== 'undefined') {

        model.id = proposal.id;
    }

    model.isActive = (proposal && typeof proposal.isActive !== 'undefined') ? proposal.isActive : !model.isActive;

    return model;
};

export default receive;
