import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useFetchPut = () => {
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { user } = useAuthContext();

    const fetchPut = async (url, body) => {
        setIsLoading(true);
        setError(null);

        await fetch(url, {
            method: "PUT",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.token}`
            },
            body: JSON.stringify(body)
        })
        .then(result => result.json())
        .then(data => {
            if (data.err)
                throw Error(data.err);
            
            setResult(data);
            setIsLoading(false);
        })
        .catch(err => {
            setIsLoading(false);
            setError(err.message)
        })
    }

    return { fetchPut, result, isLoading, error };
}