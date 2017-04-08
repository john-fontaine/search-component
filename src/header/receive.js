// @TODO: Convert to immutable data structure

const receive = model => proposal => {

    //const validateLoginModal = (m, p) => (p && typeof p.show !== 'undefined') ? p.show : !m.show;
    //
    //model.loginModal.show = validateLoginModal(model.loginModal, proposal.loginModal);
    if (proposal) {

        model.id = proposal.id;
    }

    return model;
};

export default receive;
