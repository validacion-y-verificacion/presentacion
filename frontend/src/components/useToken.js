import { useState } from "react";


export default function useToken(){
    const getToken = () => {
        const tokenString = localStorage.getItem('token');
        const tokenObject = {token : tokenString }
        return tokenObject.token
    };
    const [token, setToken] = useState(getToken());

    const saveToken = userToken => {
        localStorage.setItem('token', JSON.stringify(userToken));
        setToken(userToken.token)
    };

    return {
        token,
        setToken: saveToken
    }
}