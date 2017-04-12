import MyAccountButton from '../myAccountButton/index';
import ModalIframe from '../../modalIframe/index';

const view = model => MyAccountButton.createElement({
	...model,
	onclick: ModalIframe.intents.toggle(model.modal)
});

export default view;
