"use client";

import {
    Box,
    Heading,
    VStack,
    LinkPanel, Alert, BodyLong
} from "@navikt/ds-react";
import { useContext, useEffect, useState } from "react";
import LagredeSokOgFavoritter from "@/app/innstillinger/components/LagredeSokOgFavoritter";
import Epost from "@/app/innstillinger/components/Epost";
import { PersonaliaContext } from "@/app/(common)/components/context/PersonaliaContext";

export default function InnstillingerPage() {

    const [response, setResponse] = useState({});
    const [harSamtykket, setHarSamtykket] = useState(null);
    const [epost, setEpost] = useState("");
    const [uuid, setUuid] = useState(null);
    const [harVerifisertEpost, setVerifisertEpost] = useState(null);
    const [lagretEpost, setLagretEpost] = useState("");
    const [requestFeilet, setRequestFeilet] = useState(false);

    const personalia = useContext(PersonaliaContext);

    useEffect(() => {
        fetchSamtykke();
    }, []);

    async function fetchSamtykke() {
        const response = await fetch("/min-side/api/aduser/api/v1/user")
        if (response.status === 200) {
            const json = await response.json();
            setResponse((prevState) => ({
                ...prevState,
                data: json
            }));
            setHarSamtykket(true);
            setEpost(json.email || "")
            setLagretEpost(json.email || "")
            setVerifisertEpost(json.verifiedEmail)
            setUuid(json.uuid)
        } else if (response.status === 404) {
            setHarSamtykket(false);
        } else {
            setRequestFeilet(true)
        }
    }

    return (
        <Box paddingBlock={{ xs: "8 8", md: "16 16" }} className="container-small">
            {requestFeilet && (
                <Alert variant="error" className="mb-4">
                    <Heading level="5" size="xsmall" align="left" className="mb-2">
                        Kunne ikke hente samtykke
                    </Heading>
                    <BodyLong className="mb-3">
                        Venligst prøv igjen senere.
                    </BodyLong>
                </Alert>
            )}
            <Heading level="1" size="xlarge" align="center" className="mb-12">
                Samtykker og innstillinger
            </Heading>

            <VStack align="left" className="mb-8">
                <LagredeSokOgFavoritter
                    harSamtykket={harSamtykket}
                    setHarSamtykket={setHarSamtykket}
                    epost={epost}
                    setEpost={setEpost}
                    navn={personalia.navn}
                    setUuid={setUuid}
                    setVerifisertEpost={setVerifisertEpost}
                    setLagretEpost={setLagretEpost}
                />
                <Epost
                    response={response}
                    harSamtykket={harSamtykket}
                    setHarSamtykket={setHarSamtykket}
                    epost={epost}
                    setEpost={setEpost}
                    navn={personalia.navn}
                    uuid={uuid}
                    lagretEpost={lagretEpost}
                    setLagretEpost={setLagretEpost}
                    harVerifisertEpost={harVerifisertEpost}
                />
            </VStack>
            <Heading level="2" size="large" className="mb-5">
                CV og jobbønsker
            </Heading>
            <LinkPanel href="/personinnstillinger" className="arb-link-panel-secondary">
                <LinkPanel.Title>Gå til samtykke for CV og jobbønsker</LinkPanel.Title>
            </LinkPanel>
        </Box>
    );
}
