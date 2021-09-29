export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT = 'LOGOUT'

export function login(authedUser){
    return {
        type: LOGIN_USER,
        isloggin: true,
        payload: authedUser
    }
}

export function logout() {
    return {
        type: LOGOUT
    }
    
}
