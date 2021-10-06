export const RECEIVE_USERS = 'RECEIVE_USERS'
export const ADD_USER_POLLS = 'ADD_USER_POLLS'

export function receiveUsers (users){
    return {
        type: RECEIVE_USERS,
        users,
    }
}
