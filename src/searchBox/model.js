// TODO: Consider having acceptor array of functions acceptor = [ query, search ]

export let model = {};

model.getInitialState = (props = { query: '', mountComponent: true }) => ({
    query: props.query,
    mountComponent: props.mountComponent
});

model.init = state => {

    model.state = state;
};

model.acceptor = data => {

    if (data.query) {

        return { query: data.query };
    }
};

model.present = data => {

    model.state.render(model.acceptor(data));
};
