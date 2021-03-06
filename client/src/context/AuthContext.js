import {createContext, useReducer} from 'react'
import AuthReducer from "./AuthReducer"

const INITIAL_STATE = {
    user:  {
        "_id": "61c4db7ef30bdbbfc1326c10",
        "username": "alikhan",
        "email": "alikhan@myapp.com",
        "profilePicture": "",
        "coverPicture": "",
        "followers": [],
        "followings": [],
        "isAdmin": false
    },
    // user: null,
    isFetching: false,
    error: false
}

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    return (
        <AuthContext.Provider 
            value={{user:state.user, 
                isFetching:state.isFetching, 
                error:state.error,
                dispatch
        }}>
            {children}
        </AuthContext.Provider>
    )
}