// TODO: Consider having acceptor array of functions acceptor = [ query, search ]

export let model = {};

model.getInitialState = () => ({ isActive: false });

model.init = state => {

    model.state = state;
};

model.acceptor = data => {

    if (data && typeof data.isActive !== 'undefined') {

        return { isActive: !data.isActive };
    }
};

model.present = data => {

    model.state.render(model.acceptor(data));
};
