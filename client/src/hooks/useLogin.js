import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();

    const login = async (User_Name, Password) => {
        setIsLoading(true);
        setError(null);

        await fetch('http://localhost:5000/users/login', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ User_Name, Password })
        })
        .then(result => result.json())
        .then(data => {
            localStorage.setItem("user", JSON.stringify(data));
            dispatch({ type: "LOGIN", payload: data })
            setIsLoading(false);
        })
        .catch(err => {
            setIsLoading(false);
            setError(err.error)
        })
    }

    return { login, isLoading, error };
}