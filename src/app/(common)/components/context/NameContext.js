"use client"
import { useEffect, useState } from "react";
import React from "react";

export const NameContext = React.createContext({});

const NameProvider = ({children}) => {
    const [name, setName] = useState("");

    useEffect(() => {
        async function fetchPersonalia() {
            const response = await fetch("/min-side/api/aduser/api/v1/personalia", {
                credentials: "same-origin"
            })
            if (response.status === 200) {
                const json = await response.json();
                setName(json?.navn);
            }
        }
        fetchPersonalia();
    }, []);

    return (
        <NameContext.Provider value={name}>
            {children}
        </NameContext.Provider>
    )
}

export default NameProvider;
