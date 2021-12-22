import * as actionType from '../constants/actionTypes';
// ! why state = { authData: null } -->  we set state.authData initial data null (nothing)
const authReducer = (state = { authData: null }, action) => {
    switch (action.type) {
        case actionType.AUTH:
            // saving login data in localstorage 
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }));

            return { ...state, authData: action.data, loading: false, errors: null };
        case actionType.LOGOUT:
            localStorage.clear();

            return { ...state, authData: null, loading: false, errors: null };
        default:
            return state;
    }
};

export default authReducer;