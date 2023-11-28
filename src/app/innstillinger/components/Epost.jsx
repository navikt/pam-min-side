import {Alert, BodyLong, Box, Button, Heading, HStack, Link as DsLink, TextField, VStack} from "@navikt/ds-react";
import {PlusCircleIcon} from "@navikt/aksel-icons";
import NextLink from "next/link";
import {useState} from "react";
import ValidateEmail from "@/app/(common)/components/ValidateEmail";

export default function Epost({ response, harSamtykket, setHarSamtykket, epost, setEpost, navn, uuid, lagretEpost, setLagretEpost, harVerifisertEpost }) {

    const [isLagreEpostPanel, setIsLagreEpostPanel] = useState(false);
    const [isEpostError, setIsEpostError] = useState(false);
    const [epostFelt, setEpostfelt] = useState("");
    const [slettEpostModal, setSlettEpostModal] = useState(false);
    const [isEndreEpost, setIsEndreEpost] = useState(false);

    async function lagreEpost(){
        if (!epost || !ValidateEmail(epost)) {
            setIsEpostError(true);
        } else {
            //TODO: Lagre epost
//            setIsEndreEpost(false);
            setIsLagreEpostPanel(false);

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
                setLagretEpost(epost);
            } else {
                setRequestFeilet(`/PUT ${response.status}`)
            }

            setIsEpostError(false);
        }
    }

    function avbrytLagre() {
        setIsLagreEpostPanel(false)
        setEpost(lagretEpost);
    }

    const onEndreEpost = () => {
        setIsLagreEpostPanel(true);
        setIsEndreEpost(true);
    };

    async function slettEpost(epost, navn, uuid) {
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


        //TODO: Slett epost
        setLagretEpost("");
        setEpost("");
        setSlettEpostModal(false);
        setIsLagreEpostPanel(false);
    }

    return (
        <>
            { harSamtykket && (
            <>
                <Heading level="3" size="medium" align="left" className="mb-6">
                    E-postadresse for varsel om nye treff i lagrede søk
                </Heading>
                <BodyLong spacing>
                    E-postadressen blir kun brukt til varsel om nye treff for dine lagrede søk.
                </BodyLong>
                <BodyLong className="mb-6">
                    Dersom du ikke lenger ønsker å motta varsler for et søk så kan du enten fjerne varslingen eller
                    fjerne søket i{" "}
                    <NextLink href="http://localhost:3000/stillinger/lagrede-sok" passHref legacyBehavior>
                        <DsLink>dine lagrede søk.</DsLink>
                    </NextLink>
                </BodyLong>

                    {!epost && !isLagreEpostPanel && (
                        <HStack>
                            <Button
                                variant="tertiary"
                                id="legg-til-epost"
                                onClick={() => setIsLagreEpostPanel(true)}
                                icon={<PlusCircleIcon aria-hidden="true" />}
                            >
                                Legg til e-postadresse
                            </Button>
                        </HStack>
                    )}
                        <>
                            {(isLagreEpostPanel || epost) && (
                                <TextField
                                    className="mb-4"
                                    id="epost-adresse"
                                    label="E-postadresse for varsel"
                                    type="email"
                                    value={epost}
                                    onChange={(e) => setEpost(e.target.value)}
                                    error={isEpostError && "E-postadressen er ugyldig, kontroller at du ikke savner noen tegn"}
                                />
                            )}

                            {(isLagreEpostPanel) && (
                                <HStack gap="4" align="start">
                                    {(
                                        <>
                                            <Button
                                                variant="primary"
                                                id="lagre-epost"
                                                onClick={() => lagreEpost()}
                                            >
                                                Lagre e-postadresse
                                            </Button>
                                            <Button
                                                variant="secondary"
                                                id="avbryt-lagre-epost"
                                                onClick={() => avbrytLagre()}
                                            >
                                                Avbryt
                                            </Button>
                                        </>
                                    )}
                                </HStack>
                            )}
                            {( epost && !isLagreEpostPanel ) && (
                                <HStack className="mb-4">
                                    <Button
                                        variant="tertiary"
                                        id="endre-epost"
                                        onClick={() => onEndreEpost()}
                                        icon={<PlusCircleIcon aria-hidden="true" />}
                                    >
                                        Endre e-postadresse
                                    </Button>
                                    <Button
                                        disabled={slettEpostModal}
                                        variant="tertiary"
                                        id="slett-epost"
                                        onClick={() => setSlettEpostModal(true)}
                                        icon={<PlusCircleIcon aria-hidden="true" />}
                                    >
                                        Slett e-postadresse
                                    </Button>
                                </HStack>
                            )}

                            { slettEpostModal && (
                                <Box padding="6" background="surface-alt-2-subtle" borderRadius="large">
                                    <Heading level="4" size="small" align="left" className="mb-2">
                                        Bekreft at du ønsker å slette e-postadressen din
                                    </Heading>
                                    <BodyLong className="mb-3">
                                        Du vil ikke lenger kunne motta varsler om nye treff i dine lagrede søk.
                                    </BodyLong>
                                    <VStack align="end">
                                        <HStack gap="4">
                                            <Button
                                                variant="secondary"
                                                id="avbryt-slett-epost"
                                                onClick={() => setSlettEpostModal(false)}
                                            >
                                                Avbryt
                                            </Button>
                                            <Button
                                                variant="primary"
                                                id="slett-epost"
                                                onClick={() => slettEpost(null, navn, uuid) }
                                            >
                                                Ja, slett e-postadresse
                                            </Button>
                                        </HStack>
                                    </VStack>
                                </Box>
                            )}
                            {lagretEpost && harVerifisertEpost === false && (
                                <>
                                    <Alert variant="warning">
                                        <Heading level="5" size="xsmall" align="left" className="mb-2">
                                            E-postadressen din er ikke bekreftet
                                        </Heading>
                                        <BodyLong className="mb-3">
                                            Du vil ikke kunne motta noen varsler før du bekrefter e-postadressen din. Dersom du ikke finner
                                            bekreftelsen kan du sende en ny.
                                        </BodyLong>
                                    </Alert>
                                    <HStack align="start">
                                        <Button
                                            variant="tertiary"
                                            id="send-ny-bekreftelse-epost"
                                            onClick={() => sendNyBekreftelse() }
                                        >
                                            Send ny bekreftelse på e-post
                                        </Button>
                                    </HStack>
                                </>
                            )}

                        </>
            </>
            )}
        </>
    );
}
