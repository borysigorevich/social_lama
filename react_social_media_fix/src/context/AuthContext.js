import {createContext, useReducer} from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
    user: {
        _id: '613694068ada5df6d35b509a',
        username: 'boris',
        email: 'boris@gmail.com',
        profilePicture: 'person/10.jpeg',
        coverPicture: '',
        followers: [],
        followings: ['613693fd8ada5df6d35b5098', '6136940d8ada5df6d35b509c', '6138ebdfcb43c6245999ee88'],
        city: 'Kiev',
        from: 'Schors'
    },
    isFetching: false,
    error: false
}

export const AuthContext = createContext(INITIAL_STATE)

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE)

    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                isFetching: state.isFetching,
                error: state.error,
                dispatch
            }}>
            {children}
        </AuthContext.Provider>
    )
}