import { state } from './state.js';
import { initialModel } from './model.js';

const Toggler () => state.render(initialModel());

export default Toggler;
