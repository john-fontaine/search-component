// @TODO: Convert to immutable data structure

const receive = model => proposal => {

    if (proposal && typeof proposal.url !== 'undefined') {

        model.url = proposal.url;
    }

    if (proposal && typeof proposal.title !== 'undefined') {

        model.title = proposal.title;
    }

    return model;
};

export default receive;
