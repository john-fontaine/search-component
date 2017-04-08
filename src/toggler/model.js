import { Rx, ReduceStream, MergeStreams } from '../rx/index.js';

const initialModel = () => {

    const toggleReducer = (reducedValue, streamSnapshot) => !reducedValue;

    const toggleStream = new Rx();

    const toggleStateStream = new ReduceStream(toggleStream, toggleReducer, false);

    console.log('new ReduceStream(toggleStream, toggleReducer, false);');

    return { toggle: toggleStream.update, onToggle: toggleStateStream.observe };
};

export default initialModel;
