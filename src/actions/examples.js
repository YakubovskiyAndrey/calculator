const getExamples = (count) => {
    let url = `http://localhost:8080/math/examples?count=${count}`;

    let result = fetch(url)
        .then(
            successResponse => {
                if (successResponse.status !== 200) {
                    return null;
                } else {
                    return successResponse.json();
                }
            });
    return result;
}

const receiveExamples = examples => ({
    examples, type: 'RECEIVE_EXAMPLES'
});

const requestExamples = () => ({
    type: 'REQUEST_EXAMPLES'
});

const errorReceiveExamples = () => ({
    type: 'ERROR_RECEIVE_EXAMPLES'
});

const fetchExamples = ({ count }) => async (dispatch) => {
    dispatch(requestExamples());

    try {
        const examples = await getExamples(count);
        return dispatch(receiveExamples(examples));
    } catch {
        return dispatch(errorReceiveExamples());
    }
};

export default {
    fetchExamples,
};