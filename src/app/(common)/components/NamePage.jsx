import { useEffect, useState } from "react";
import {Heading} from "@navikt/ds-react";

function Name() {
    const [name, setName] = useState("");

    useEffect(() => {
        async function fetchPersonalia() {
            const response = await fetch("/min-side/api/aduser/api/v1/personalia")
            if (response.status === 200) {
                const json = await response.json();
                setName(json?.navn);
            }
        }
        fetchPersonalia();
    }, []);

    return (
        <Heading level="1" size="xlarge" align="center" className="mb-1">
            {name}
        </Heading>
    )
}

export default Name;
