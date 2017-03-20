export let model = {};

model.getInitialState = () => model.acceptor({ type: 'default', location: window.location });

model.data = [
    { title: 'Betting', url: 'http://localhost:8080/#betting' },
    { title: 'Vegas', url: 'http://localhost:8080/#vegas' },
    { title: 'Macau', url: 'http://localhost:8080/#macau' },
    { title: 'Casino', url: 'http://localhost:8080/#casino' },
    { title: 'Live Casino', url: 'http://localhost:8080/#live-casino' },
    { title: 'Games', url: 'http://localhost:8080/#games' },
    { title: 'Scratchcards', url: 'http://localhost:8080/#scratchcards' },
    { title: 'Bingo', url: 'http://localhost:8080/#bingo' },
    { title: 'Poker', url: 'http://localhost:8080/#poker' }
];

model.init = state => {

    model.state = state;
};

model.acceptor = data => {

    const events = {

        'popstate': (m, data) => m.url === data.srcElement.location.href,

        'default': (m, data) => m.url === data.location.href
    };

    if (data && events[data.type]) {

        return model.data.map(m => ({ title: m.title, url: m.url, isActive: events[data.type](m, data) }));
    }
};

model.present = data => {

    model.state.render(model.acceptor(data));
};
