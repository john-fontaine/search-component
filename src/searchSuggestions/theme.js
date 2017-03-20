export default (model, intents) => {

    return `
        <ul style="display: ${model.length ? 'block' : 'none'}">
            ${model.map(m => '<li>' + m.name + ': ' + m.value + '</li>').join('')}
        </ul>`;
};
