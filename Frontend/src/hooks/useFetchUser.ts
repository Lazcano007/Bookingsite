import { useEffect, useState } from "react";
import { api } from "../api/axios";


export function useFetchUser() {
    const [user, setUser] = useState<{name?: string; email?: string } | null>(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {

        api.get("/auth/profile")
        .then((res) => setUser(res.data))
        .catch(() => { 
            localStorage.removeItem("token");
            setUser(null);
        })
        .finally(()=>setLoading(false));
    }, [])
        return { user, loading};

}