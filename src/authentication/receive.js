const removeEmpty = (obj) => {

  const recurse = (o, k) => (o[k] && typeof o[k] === 'object') && removeEmpty(o[k]);

  const remove = (o, k) => (o[k] == null) && delete o[k];

  return [Object.keys(obj).forEach(k => recurse(obj, k) || remove(obj, k)), obj][1];
};

const receive = model => proposal => {

    if (proposal && proposal.hasOwnProperty('loggedin')) {

        delete model.user;
        model.user = proposal;
    }

    return model;
};

export default receive;
