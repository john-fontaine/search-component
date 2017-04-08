const receive = model => proposal => {

    // @TODO: Not performant, should not fire when there is no change
    if (proposal && proposal.srcElement) {

        Object.keys(model.items).map(key => {

            model.items[key].isActive = key === proposal.srcElement.location.href;
        });
    }

    return model;
};

export default receive;
