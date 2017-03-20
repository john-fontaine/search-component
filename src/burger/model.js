export let model = {};

model.getInitialState = () => ({ isActive: false });

model.init = state => {

    model.state = state;
};

model.acceptor = data => {

    if (data) {

        return { isActive: !data.isActive };
    }
};

model.present = data => {

    model.state.render(model.acceptor(data));
};
