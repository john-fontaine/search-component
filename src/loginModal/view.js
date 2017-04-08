import Modal from '../modal/index';
import Login from '../login/index';

const view = model =>

    Modal.createElement(model.modal,

        Login.createElement(model.login)
    );

export default view;
