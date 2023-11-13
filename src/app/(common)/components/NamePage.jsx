import {Heading} from "@navikt/ds-react";

async function Name() {
    const personalia = await getPersonalia();

    return (
        <Heading level="1" size="xlarge" align="center" className="mb-1">
            {personalia.navn}
        </Heading>
    )
}
async function getPersonalia() {
    const res = await fetch('/min-side/api/aduser/api/v1/personalia', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if(res.status === 401) {
        //login eller feilside
    } else if(res.status === 404) {
        // feilside?
    } else if(!res.ok) {

    }
    // returnere suksess og json?
    return res.json();
}

export default Name;
