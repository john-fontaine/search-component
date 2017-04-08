export let actions = {};

actions.init = present => {

    actions.present = present;
};

actions.make = obj => {

    actions.present({ make: obj });
};

actions.notify = data => {

    actions.present({ notify: data });
};

actions.subscribe = fn => {

    actions.present({ subscribe: fn });
};

actions.unsubscribe = fn => {

    actions.present({ unsubscribe: fn });
};
