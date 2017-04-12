import MyAccountButton from '../myAccountButton/index';
import ModalIframe from '../../modalIframe/index';

const view = (model, intents) => MyAccountButton.createElement({
	...model,
	onclick: intents.open
});

export default view;
