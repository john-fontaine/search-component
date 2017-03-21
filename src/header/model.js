// TODO: Consider having acceptor array of functions acceptor = [ query, search ]

export let model = {};

model.init = state => {

    model.state = state;
};

model.acceptor = data => {

    if (data.component === 'burger' && data.action === 'toggle') {

        return data;
    }
};

model.present = data => {

    model.state.render(model.acceptor(data));
};
