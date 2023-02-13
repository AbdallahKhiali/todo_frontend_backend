import axios from "axios";
import { useState, createContext, useContext } from "react";
import { GeneralContext } from "./general";



export const AuthContext = createContext({})



export const AuthContextProvider = ({ children }) => {

    const { API_URI, setLoading, axiosConfig } = useContext(GeneralContext)

    const isAuth = localStorage.getItem('auth')

    const userId = localStorage.getItem('uuid')



    const [loginForm, setLoginForm] = useState({
        email: "",
    })
    const [signupForm, setSignupForm] = useState({
        email: "",
    })






    const login = () => {
        axios.post(`${API_URI}/users/login`, loginForm, axiosConfig)
            .then((res) => {
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('auth', true)
                localStorage.setItem('uuid', res.data.user._id)
                setLoading(false)
                window.location.replace('/')

                // console.log(res.data.token)
            }).catch((err) => {
                setLoading(false);
                window.location.replace('/login')
            })
    }

    const signup = () => {
        axios.post(`${API_URI}/users/signup`, signupForm).then((response) => {
            window.location.replace('/login')
        }).catch(err => console.log(err));
    }

    const logout = () => {
        localStorage.clear()
    }

    //Here you declare states and functions 




    const value = {
        // all states and functions 
        logout, signup, login, isAuth
        , signupForm, setSignupForm,
        loginForm, setLoginForm, userId

    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )


}
