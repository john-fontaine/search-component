//import { state } from './state.js';
//import { model } from './model.js';
//import { actions } from './actions.js';
//import { view } from './view.js';
//
//export default () => {
//
//    state.init(view);
//
//    model.init(state);
//
//    actions.init(model.present);
//
//    state.render();
//
//    return actions;
//};

function Rx () {

    const subscribers = [];

    const observe = observer => {
        // create new object
        subscribers.push(observer);
        //console.log('adding observer: ', subscribers.length);
    };

    const update = data => {

        subscribers.forEach(observer => observer.call(null, data));
    };

    return ({ observe, update });
}

function ReduceStream (stream, reducingFn, initialReducedValue) {

    const newStream = new Rx();
    let reducedValued = initialReducedValue;

    stream.observe(streamSnapshotValue => {

        reducedValued = reducingFn(reducedValued, streamSnapshotValue);
        newStream.update(reducedValued);
    });

    return newStream;
}

class MergeStreams {

    constructor(streamA, streamB, mergeFn) {

        this.streamA = streamA;
        this.streamB = streamB;
        this.mergeFn = mergeFn;

        return this.init();
    }

    init() {

        const newStream = new Rx();
        let streamData = [null, null];

        this.streamA.observe(value => {

            streamData[0] = value;
            newStream.update(this.mergeFn.apply(null, streamData));
        });

        this.streamB.observe(value => {

            streamData[1] = value;
            newStream.update(this.mergeFn.apply(null, streamData));
        });

        return newStream;
    }
}

export { Rx, ReduceStream, MergeStreams };
