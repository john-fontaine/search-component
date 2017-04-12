import MyAccountButton from '../myAccountButton/index';

const view = (model, intents) => MyAccountButton.createElement({
	...model,
	onclick: model.onclick
});

export default view;
