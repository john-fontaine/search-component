// TODO: Consider having acceptor array of functions acceptor = [ query, search ]

export let model = {};

model.getInitialState = (props) => ({

    children: props.children,
    isActive: false
});

model.init = state => {

    model.state = state;
};

model.acceptor = data => {

    if (data && typeof data.isActive !== 'undefined') {

        return data;
    }
};

model.present = data => {

    model.state.render(model.acceptor(data));
};
