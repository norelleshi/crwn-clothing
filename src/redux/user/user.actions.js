import { UserActionTypes } from './user.types';

//Action is a function that returns an object.
export const setCurrentUser = user => ({
    type: UserActionTypes.SET_CURRENT_USER,
    payload: user
})