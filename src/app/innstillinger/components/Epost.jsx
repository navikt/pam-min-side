import {Alert, BodyLong, Box, Button, Heading, HStack, Link as DsLink, TextField, VStack} from "@navikt/ds-react";
import {PlusCircleIcon, PencilIcon, TrashIcon, FloppydiskIcon, EnvelopeClosedIcon} from "@navikt/aksel-icons";
import NextLink from "next/link";
import {useState} from "react";
import ValidateEmail from "@/app/(common)/components/ValidateEmail";

export default function Epost({ harSamtykket, setHarSamtykket, epost, setEpost, navn, uuid, lagretEpost, setLagretEpost, harVerifisertEpost }) {

    const [isLagreEpostPanel, setIsLagreEpostPanel] = useState(false);
    const [isEpostError, setIsEpostError] = useState(false);
    const [slettEpostModal, setSlettEpostModal] = useState(false);

    async function lagreEpost(){
        if (!epost || !ValidateEmail(epost)) {
            setIsEpostError(true);
        } else {
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
                setIsLagreEpostPanel(false);
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
        setIsEpostError(false);
    }

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
            setIsEpostError(false);
            setEpost(null);
            setLagretEpost(null);
            setSlettEpostModal(false);
            setIsLagreEpostPanel(false);
        } else {
            setRequestFeilet(`/PUT ${response.status}`)
        }
    }

    function sendNyBekreftelse() {
        //TODO: Send ny bekreftelse på e-post
    }

    return (
        <>
            { harSamtykket && (
                <>
                    <Heading level="3" size="medium" align="left" className="mb-4">
                        E-postadresse for varsel om nye treff i lagrede søk
                    </Heading>
                    <BodyLong className="mb-4">
                        E-postadressen blir kun brukt til varsel om nye treff for dine lagrede søk.
                    </BodyLong>
                    <BodyLong className="mb-4">
                        Dersom du ikke lenger ønsker å motta varsler for et søk så kan du enten fjerne varslingen eller
                        fjerne søket i{" "}
                        <NextLink href="http://localhost:3000/stillinger/lagrede-sok" passHref legacyBehavior>
                            <DsLink>dine lagrede søk.</DsLink>
                        </NextLink>
                    </BodyLong>
                    {!epost && !isLagreEpostPanel && (
                        <HStack>
                            <Button
                                size="small"
                                variant="tertiary"
                                id="legg-til-epost"
                                onClick={() => setIsLagreEpostPanel(true)}
                                icon={<PlusCircleIcon aria-hidden="true" fontSize="1.25rem" />}
                            >
                                Legg til e-postadresse
                            </Button>
                        </HStack>
                    )}
                    {(isLagreEpostPanel || epost) && (
                        <>
                            <HStack gap="2">
                                {!isLagreEpostPanel &&(
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="23" viewBox="0 0 18 18" fill="none">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M9 1.6875C7.03249 1.6875 5.4375 3.28249 5.4375 5.25V6.9375H5.25C4.52513 6.9375 3.9375 7.52513 3.9375 8.25V15C3.9375 15.3107 4.18934 15.5625 4.5 15.5625H13.5C13.8107 15.5625 14.0625 15.3107 14.0625 15V8.25C14.0625 7.52513 13.4749 6.9375 12.75 6.9375H12.5625V5.25C12.5625 3.28249 10.9675 1.6875 9 1.6875ZM11.4375 6.9375V5.25C11.4375 3.90381 10.3462 2.8125 9 2.8125C7.65381 2.8125 6.5625 3.90381 6.5625 5.25V6.9375H11.4375ZM9 9.75C8.37868 9.75 7.875 10.2537 7.875 10.875C7.875 11.2914 8.10124 11.655 8.4375 11.8495V12.75C8.4375 13.0607 8.68934 13.3125 9 13.3125C9.31066 13.3125 9.5625 13.0607 9.5625 12.75V11.8495C9.89876 11.655 10.125 11.2914 10.125 10.875C10.125 10.2537 9.62132 9.75 9 9.75Z" fill="#003141"/>
                                    </svg>
                                )}
                                <Heading level="5" size="xsmall" align="left">
                                    E-postadresse for varsel
                                </Heading>
                            </HStack>
                            <TextField
                                disabled={!isLagreEpostPanel}
                                className="mb-4"
                                id="epost-adresse"
                                label=""
                                type="email"
                                value={epost}
                                onChange={(e) => setEpost(e.target.value)}
                                error={isEpostError && "E-postadressen er ugyldig, kontroller at du ikke savner noen tegn"}
                            />
                        </>
                    )}
                    <HStack gap="2" align="start" className="mb-4">
                        {(isLagreEpostPanel) && (
                            <>
                                <Button
                                    size="small"
                                    variant="primary"
                                    id="lagre-epost"
                                    onClick={() => lagreEpost()}
                                    icon={<FloppydiskIcon aria-hidden="true" fontSize="1.25rem" />}
                                >
                                    Lagre e-postadresse
                                </Button>
                                <Button
                                    size="small"
                                    variant="secondary"
                                    id="avbryt-lagre-epost"
                                    onClick={() => avbrytLagre()}
                                >
                                    Avbryt
                                </Button>
                            </>
                        )}
                        {epost && lagretEpost && !isLagreEpostPanel &&(
                            <Button
                                size="small"
                                variant="tertiary"
                                id="endre-epost"
                                onClick={() => setIsLagreEpostPanel(true)}
                                icon={<PencilIcon aria-hidden="true" fontSize="1.25rem" />}
                            >
                                Endre e-postadresse
                            </Button>
                        )}
                        {epost && lagretEpost && (
                            <Button
                                disabled={slettEpostModal}
                                size="small"
                                variant="tertiary"
                                id="slett-epost"
                                onClick={() => setSlettEpostModal(true)}
                                icon={<TrashIcon aria-hidden="true" fontSize="1.25rem" />}
                            >
                                Slett e-postadresse
                            </Button>
                        )}
                    </HStack>
                    { slettEpostModal && (
                        <Box padding="6" background="surface-alt-2-subtle" borderRadius="medium" className="mb-4">
                            <Heading level="4" size="small" align="left" className="mb-2">
                                Bekreft at du ønsker å slette e-postadressen din
                            </Heading>
                            <BodyLong className="mb-3">
                                Du vil ikke lenger kunne motta varsler om nye treff i dine lagrede søk.
                            </BodyLong>
                            <VStack align="end">
                                <HStack gap="2">
                                    <Button
                                        size="small"
                                        variant="secondary"
                                        id="avbryt-slett-epost"
                                        onClick={() => setSlettEpostModal(false)}
                                    >
                                        Avbryt
                                    </Button>
                                    <Button
                                        size="small"
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
                    {lagretEpost && !harVerifisertEpost && (
                        <>
                            <Alert variant="warning" className="mb-4">
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
                                    size="small"
                                    variant="tertiary"
                                    id="send-ny-bekreftelse-epost"
                                    onClick={() => sendNyBekreftelse() }
                                    icon={<EnvelopeClosedIcon aria-hidden="true" fontSize="1.25rem" />}
                                >
                                    Send ny bekreftelse på e-post
                                </Button>
                            </HStack>
                        </>
                    )}
                </>
            )}
        </>
    )
}
