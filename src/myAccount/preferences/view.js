import MyAccountButton from '../myAccountButton/index';

const view = (model, intents) => MyAccountButton.createElement({
	...model,
	onclick: intents.open
});

export default view;
