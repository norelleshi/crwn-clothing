import { UserActionTypes } from './user.types';

const INITIAL_STATE = {
    currentUser: null
}

//Reducer is a function that gets a state object and an action.
const userReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case UserActionTypes.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload
            }
        default:
            return state;
    }
}

export default userReducer;