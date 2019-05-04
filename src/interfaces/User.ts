export interface User {
    name: string,
    email?: string,
    password?: string
}

export interface AuthState {
    loggedIn: boolean,
    user: {
        name: string,
        email?: string,
        password?: string
    }
}