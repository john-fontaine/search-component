export default (model, intents) => {

    return `
        <form id="search">
            <input autocomplete="off" 
                name="query"
                oninput="return ${intents['onSearch']}({ query: document.getElementById('search').elements['query'].value })"
                placeholder="Search Games..."
                type="text"
                value="${model.query || ''}">
        </form>`;
};
