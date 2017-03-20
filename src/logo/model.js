export let model = {};

model.data = { url: '#', title: 'williamhill.com' };

model.init = state => {

    model.state = state;
};

model.acceptor = data => {

};

model.present = data => {

    model.state.render(model.acceptor(data));
};
