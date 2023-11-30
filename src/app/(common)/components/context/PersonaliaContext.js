import { useEffect, useState } from "react";
import React from "react";

export const PersonaliaContext = React.createContext({});

const PersonaliaProvider = ({children}) => {
    const [personalia, setPersonalia] = useState({});

    useEffect(() => {
        async function fetchPersonalia() {
            const response = await fetch("/min-side/api/aduser/api/v1/personalia", {
                credentials: "same-origin"
            })
            if (response.status === 200) {
                const json = await response.json();
                setPersonalia(json);
            }
        }
        fetchPersonalia();
    }, []);

    return (
        <PersonaliaContext.Provider value={personalia}>
            {children}
        </PersonaliaContext.Provider>
    )
}

export default PersonaliaProvider;
