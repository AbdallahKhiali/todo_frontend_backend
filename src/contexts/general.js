import { useState, createContext } from "react";



export const GeneralContext = createContext({})



export const GeneralContextProvider = ({ children }) => {


    const [isLoading, setLoading] = useState(false);
    const [isModal, setModal] = useState(false);

    const token = localStorage.getItem('token');

    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
            "Authorization": "Bearer " + token
        }
    };

    const API_URI = "http://localhost:3001"

    const value = {
        // all states and functions 
        isLoading, setLoading,
        API_URI,
        axiosConfig, isModal, setModal
    }

    return (
        <GeneralContext.Provider value={value}>
            {children}
        </GeneralContext.Provider>
    )


}
