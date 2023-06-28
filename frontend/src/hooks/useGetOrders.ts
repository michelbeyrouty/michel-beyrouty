import { useEffect, useState } from "react";
import fetchOrders from "../apis/fetchOrders"
import wrapPromise from "../lib/wrapPromise"

const useGetOrders = () => {
    const [resource, setResource] = useState(null);
    useEffect(() => {
        const _resource = wrapPromise(fetchOrders());
        setResource(_resource);
    }, []);

    return resource?.read();
};

export default useGetOrders;
