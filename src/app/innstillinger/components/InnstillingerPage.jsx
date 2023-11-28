"use client";

import {
    Alert,
    ConfirmationPanel,
    ExpansionCard,
    Modal,
    TextField,
    Tag,
    BodyLong,
    Box,
    Button,
    Heading,
    HStack,
    VStack,
    LinkPanel,
    Link as DsLink
} from "@navikt/ds-react";
import {PlusCircleIcon} from "@navikt/aksel-icons";
import {useEffect, useState} from "react";
import ValidateEmail from "@/app/(common)/components/ValidateEmail";
import NextLink from "next/link";
import Samtykketekst from "@/app/innstillinger/components/Samtykketekst";
import LagredeSokOgFavoritter from "@/app/innstillinger/components/LagredeSokOgFavoritter";
import Epost from "@/app/innstillinger/components/Epost";

export default function InnstillingerPage() {

    const [response, setResponse] = useState({});
    const [harSamtykket, setHarSamtykket] = useState(null);
    const [navn, setNavn] = useState("Test");
    const [epost, setEpost] = useState("");
    const [uuid, setUuid] = useState(null);
    const [harVerifisertEpost, setVerifisertEpost] = useState(null);
    const [requestFeilet, setRequestFeilet] = useState(null);
    const [isLagreEpostPanel, setIsLagreEpostPanel] = useState(false);
    const [isEpostVerified, setIsEpostVerified] = useState(false);
    const [isEndreEpost, setIsEndreEpost] = useState(false);
    const [lagretEpost, setLagretEpost] = useState("");
    const [slettEpostModal, setSlettEpostModal] = useState(false);
    const [endreEpost, setEndreEpost] = useState(false);
    const [name, setName] = useState("");

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
            setNavn(json.name)
            setUuid(json.uuid)
        } else if (response.status === 404) {
            setHarSamtykket(false);
        } else {
            setRequestFeilet(`/GET ${response.status}`)
        }
    }

    const onEpostChange = (e) => {
        setEpost(e.target.value);
    }

    const onAvbrytEpost = () => {
        setEpost(lagretEpost);

        if (lagretEpost !== "") {
            setIsEndreEpost(false);
        } else {
            setIsLagreEpostPanel(false);
        }
    };

    const sendNyBekreftelse = () => {
        //TODO: Send ny bekreftelse på e-post
    };

    return (
        <Box paddingBlock={{ xs: "8 8", md: "16 16" }} className="container-small">
            <Heading level="1" size="xlarge" align="center" className="mb-16">
                Samtykker og innstillinger
            </Heading>

            <VStack align="left" className="mb-8">
                <LagredeSokOgFavoritter
                    harSamtykket={harSamtykket}
                    setHarSamtykket={setHarSamtykket}
                    epost={epost}
                    navn={navn}
                    setUuid={setUuid}
                    setVerifisertEpost={setVerifisertEpost}
                    setRequestFeilet={setRequestFeilet}
                />

                <Epost
                    response={response}
                    harSamtykket={harSamtykket}
                    setHarSamtykket={setHarSamtykket}
                    epost={epost}
                    setEpost={setEpost}
                    navn={navn}
                    uuid={uuid}
                    lagretEpost={lagretEpost}
                    setLagretEpost={setLagretEpost}
                    harVerifisertEpost={harVerifisertEpost}
                />
            </VStack>
            <Heading level="2" size="large" className="mb-2">
                CV og jobbønsker
            </Heading>
            <LinkPanel href="/personinnstillinger" className="arb-link-panel-secondary">
                <LinkPanel.Title>Gå til samtykke for CV og jobbønsker</LinkPanel.Title>
            </LinkPanel>
        </Box>
    );
}
