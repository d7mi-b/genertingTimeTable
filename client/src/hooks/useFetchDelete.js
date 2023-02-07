import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useFetchDelete = () => {
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { user } = useAuthContext();

    const fetchDelete = async (url, body) => {
        setIsLoading(true);
        setError(null);

        await fetch(url, {
            method: "DELETE",
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

    return { fetchDelete, result, isLoading, error };
}