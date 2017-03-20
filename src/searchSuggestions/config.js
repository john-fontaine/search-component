export let config = {};

config.init = () => {

    return {
        theme: {
            searchBox: {
                button: {
                    text: 'Busqueda'
                }
            },
            searchResults: {
                title: {
                    text: 'Search results based on {QUERY}'
                }
            }
        }
    };
};
