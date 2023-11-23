import { useEffect, useState } from "react";
import { Button, Heading, HStack, TextField } from "@navikt/ds-react";

export default function Samtykke() {
    const [harSamtykket, setHarSamtykket] = useState(null);
    const [epost, setEpost] = useState("");
    const [navn, setNavn] = useState("Test");
    const [uuid, setUuid] = useState(null);
    const [harVerifisertEpost, setVerifisertEpost] = useState(null);
    const [requestFeilet, setRequestFeilet] = useState(null);

    useEffect(() => {
        fetchSamtykke();
    }, []);

    async function fetchSamtykke() {
        const response = await fetch("/min-side/api/aduser/api/v1/user")
        if (response.status === 200) {
            const json = await response.json();
            setHarSamtykket(true);
            setEpost(json.email || "")
            setVerifisertEpost(json.verifiedEmail)
            setNavn(json.name)
            setUuid(json.uuid)
        } else if (response.status === 404) {
            setHarSamtykket(false);
        } else {
            setRequestFeilet(`/GET ${response.status}`)
        }
    }

    async function postSamtykke(epost, navn) {
        const response = await fetch("/min-side/api/aduser/api/v1/user", {
            credentials: "same-origin",
            method: "POST",
            body: JSON.stringify({
                "email": epost,
                "name": navn,
                "acceptedTerms": "true"
            })
        })
        if (response.status === 200) {
            const json = await response.json();
            setHarSamtykket(true);
            setUuid(json.uuid);
        } else {
            setRequestFeilet(`/POST ${response.status}`)
        }
    }

    async function deleteSamtykke() {
        const response = await fetch("/min-side/api/aduser/api/v1/user", {
            method: "DELETE",
        })
        if (response.status === 200) {
            setHarSamtykket(false);
            setUuid(null);
            setVerifisertEpost(null);
        } else {
            setRequestFeilet(`/DELETE ${response.status}`)
        }
    }

    async function putSamtykke(epost, navn, uuid) {
        const response = await fetch("/min-side/api/aduser/api/v1/user", {
            method: "PUT",
            body: JSON.stringify({
                "email": epost,
                "name": navn,
                "acceptedTerms": "true",
                "uuid": uuid
            })
        })
        if (response.status === 200) {
            setHarSamtykket(true);
        } else {
            setRequestFeilet(`/PUT ${response.status}`)
        }
    }

    return (
        <div>
            {harSamtykket ? (
                <div>
                    <h4>Har samtykket for {navn}</h4>
                    <div className="mb-4">
                        <HStack gap="4">
                            <TextField size="small" label="E-post" type="email" value={epost} onChange={(e) => setEpost(e.target.value)} />

                            <Button size="small" variant="secondary" onClick={() => putSamtykke(epost, navn, uuid)}>Oppdater epost</Button>
                        </HStack>
                    </div>
                    <div className="mb-4">Har verifisert epost: {harVerifisertEpost ? "Ja" : "Nei"}</div>
                    <div><Button size="small"  onClick={deleteSamtykke}>Slett samtykke</Button></div>

                </div>
            ) : ""}
            {harSamtykket === false ? (
                <div>
                    <h4>Har IKKE samtykket</h4>
                    <TextField size="small" label="E-post" type="email" onChange={(e) => setEpost(e.target.value)} />
                    <Button size="small" className="mt-4" onClick={() => postSamtykke(epost, navn)}>Jeg samtykker</Button>
                </div>
            ) : ""}
            {requestFeilet ? (
                <div className="mt-4 navds-alert--error">Noe feilet! {requestFeilet}</div>
                ) : ""
            }
        </div>
    )
}
