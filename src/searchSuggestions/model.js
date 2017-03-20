export let model = {};

model.getInitialState = (props = { query: '', url: 'https://reqres.in/api/products' }) => ({
    query: props.query,
    url: props.url
});

model.init = (state) => {

    model.state = state;
};

model.acceptor = data => {

    if (data.results) {

        return data.results.map(r => r.representation);
    }
};

model.present = (data) => {

    model.state.render(model.acceptor(data));
};
