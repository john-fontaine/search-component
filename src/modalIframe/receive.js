const receive = model => proposal => {

    if (proposal) {

        const iframeProposal = { url: proposal.url };
        const modalProposal = { show: proposal.show, showCloseButton: proposal.showCloseButton, showHeader: proposal.showHeader, title: proposal.title };

        model.modal = Object.assign({}, model.modal, modalProposal);
        model.iframe = Object.assign({}, model.iframe, iframeProposal);
    }

    return model;
};

export default receive;
