import { useAuthContext } from "./useAuthContext";

const { useState, useEffect } = require("react")

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuthContext();

    useEffect(() => {
        fetch(url, {
            headers: { "Authorization": `Bearer ${user.token}`}
        })
        .then(result => {
            if (!result.ok) {
                throw Error('Colud not fetch the data for that resource');
            }
            return result.json();
        })
        .then(data => {
            setData(data);
            setIsPending(false);
            setError(null);
        })
        .catch(err => {
            setIsPending(false);
            setError(err.message);
        })
    }, [url]);
    return {data, isPending, error};
}

export default useFetch;