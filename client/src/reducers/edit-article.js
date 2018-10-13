const reduers = (
    state = {
        title: null,
        html: null,
        url: null,
        type: 0
    },
    action = {
        title: "default text",
        html: "default html"
    }
) => {
    //console.log(state, action);
    switch (action.type) {
        case "ADD_TITLE":
            return {
                ...state,
                title: action.title
            };
        case "ADD_HTML":
            return {
                ...state,
                html: action.html
            };
        case "ADD_TYPE":
            return {
                ...state,
                type: action.type
            };
        default:
            return {
                ...state
            };
    }
};

export default reduers;