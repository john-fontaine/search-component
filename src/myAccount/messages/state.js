const nap = model => {

	if (model.url) {

		location.href = model.url;
	}
};

const state = view => ({

    render: model => {

        nap(model);
    }
});

export default state;
