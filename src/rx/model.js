export let model = {};

model.init = state => {

    model.state = state;
};

model.acceptor = data => {

    const subject = {

        subscribe: fn => {

            this.observers.push(fn);

            console.log({ action: 'subscribe', message: this.observers.toString() });
        },

        unsubscribe: fn => {

            this.observers = this.observers.filter(item => {

                if (item !== fn) {

                    return item;
                }
            });

            console.log({ action: 'unsubscribe', message: this.observers.toString() });
        },

        notify: data => {

            this.observers.forEach(observer => observer.call(null, data));

            console.log({ action: 'notify', message: data.toString() });
        },

        make: o => {

            return Object.keys(subject).map(i => {
                o[i] = i;
                o.observers = [];
                return o;
            });
        }
    };

    Object.keys(data).forEach(key => {

        if (subject[key]) {

            return subject[key].call(null, data[key]);
        }
    });
};

model.present = data => {

    model.state.render(model.acceptor(data));
};
