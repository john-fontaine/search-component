// @TOOD: Maybe change the API to { propose, accept, learn, view } ????
import { compose } from '../utils/utils';

const display = (state, propose, actions) => {

    const stateRepresentation = state && state.render && propose ? compose(state.render, propose) : null;

    if (actions && stateRepresentation) {

        actions(stateRepresentation);
    }
};

const createElement = component => {

    display(component.state, component.propose, component.actions);

    return {

        intents: component.intents, // @TODO: Don't add when undefined

        createElement: (model, ...children) => {

            const newModel = children && children.length ? Object.assign({}, model, { children: children }) : Object.assign({}, model);

            const args = [
                component.propose ? component.propose(newModel) : null,
                component.intents ? component.intents : null
            ].filter(x => x !== null);

            return component.view(...args);
        }
    };
};

export default createElement;