import {
    BodyLong,
    Box,
    Button,
    ConfirmationPanel,
    ExpansionCard,
    Heading,
    HStack,
    Modal,
    Tag,
    VStack
} from "@navikt/ds-react";
import {FileTextIcon, CheckmarkCircleIcon} from "@navikt/aksel-icons";
import Samtykketekst from "@/app/innstillinger/components/Samtykketekst";
import {useState} from "react";

export default function LagredeSokOgFavoritter({ harSamtykket, epost, setEpost, navn, setHarSamtykket, setUuid, setVerifisertEpost, setRequestFeilet, setLagretEpost}) {

    const [samtykkeModal, setSamtykkeModal] = useState(false);
    const [visSamtykketekst, setVisSamtykketekst] = useState(false);
    const [samtykkeError, setSamtykkeError] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [bekreftSamtykke, setBekreftSamtykke] = useState(false);
    const [slettSamtykkeModal, setSlettSamtykkeModal] = useState(false);

    const onCloseSamtykkeModal = () => {
        setSamtykkeModal(false);
        setSamtykkeError(false);
        setBekreftSamtykke(false);
    };

    async function onSamtykke(epost, navn){
        if (bekreftSamtykke) {
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
                setSamtykkeModal(false);
                setSamtykkeError(false);
            } else {
                setRequestFeilet(`/POST ${response.status}`)
            }
        } else {
            setSamtykkeError(true);
        }
    }

    async function onSlettSamtykke(){
        const response = await fetch("/min-side/api/aduser/api/v1/user", {
            method: "DELETE",
        })
        if (response.status === 200) {
            setHarSamtykket(false);
            setUuid(null);
            setVerifisertEpost(null);
            setEpost(null);
            setLagretEpost(null);
            setSlettSamtykkeModal(false);
            setBekreftSamtykke(false);
        } else {
            setRequestFeilet(`/DELETE ${response.status}`)
        }
    }

    const onExpandedChange = (newExpanded) => {
        setExpanded(newExpanded);
    };

    return (
        <>
            <Heading level="2" size="large" align="left" className="mb-8">
                Lagrede søk og favoritter
            </Heading>
            <BodyLong>
                Samtykke gjelder behandling av:
            </BodyLong>
            <ul className="mb-4">
                <li>
                    <BodyLong className="mb-2">
                        annonser du har merket som favoritter
                    </BodyLong>
                </li>
                <li>
                    <BodyLong className="mb-2">
                        søk du har lagret
                    </BodyLong>
                </li>
                <li>
                    <BodyLong className="mb-4">
                        e-postadresse som brukes for varsel om nye treff i lagrede søk
                    </BodyLong>
                </li>
            </ul>
            <HStack gap="4" align="center" className="mb-4">
                { harSamtykket ? (
                    <Tag variant="success-moderate">Du har samtykket</Tag>
                ) : (
                    <Tag variant="warning-moderate">Du har ikke samtykket</Tag>
                )}
                {harSamtykket ? (
                    <Button
                        size="small"
                        variant="tertiary"
                        onClick={() => setSlettSamtykkeModal(true)}
                        id="slett-samtykke"
                    >
                        Slett samtykke
                    </Button>
                ) : (
                    <Button
                        size="small"
                        variant="tertiary"
                        onClick={() => setSamtykkeModal(true)}
                        id="gi-samtykke"
                        icon={<CheckmarkCircleIcon aria-hidden="true" fontSize="1.25rem" />}
                    >
                        Gi samtykke
                    </Button>
                )}
                <Button
                    size="small"
                    variant="tertiary"
                    onClick={() => setVisSamtykketekst(true)}
                    id="vis-samtykke"
                    icon={<FileTextIcon aria-hidden="true" fontSize="1.25rem" />}
                >
                    Vis samtykketekst
                </Button>
                <Modal
                    open={visSamtykketekst}
                    aria-label="Tilbakemelding"
                    onClose={() => setVisSamtykketekst(false)}
                    width="medium"
                >
                    <Modal.Header closeButton={true}>
                        <Heading level="2" size="large">
                            Samtykketekst for lagrede søk og favoritter
                        </Heading>
                    </Modal.Header>
                    <Modal.Body>
                        <Samtykketekst />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            size="small"
                            variant="secondary"
                            onClick={() => setVisSamtykketekst(false)}
                            id="confirmationPopup--avbryt"
                        >
                            Lukk
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal
                    open={samtykkeModal}
                    aria-label="Tilbakemelding"
                    onClose={onCloseSamtykkeModal}
                    width="medium"
                >
                    <Modal.Header closeButton={true}>
                        <Heading level="2" size="large">
                            Ta i bruk lagrede søk og favoritter
                        </Heading>
                    </Modal.Header>
                    <Modal.Body>
                        <BodyLong className="mb-6">
                            For å kunne ta i bruk lagrede søk og favoritter trenger vi først ditt samtykke. Du kan når
                            som helst trekke tilbake ditt samtykke i dine innstillinger.
                        </BodyLong>

                        <ExpansionCard
                            size="small"
                            aria-label="Small-variant"
                            className="mb-8"
                            onToggle={onExpandedChange}
                            open={expanded}
                        >
                            <ExpansionCard.Header>
                                <ExpansionCard.Title as="h4" size="small">
                                    Vis samtykketekst for lagrede søk og favoritter
                                </ExpansionCard.Title>
                            </ExpansionCard.Header>
                            <ExpansionCard.Content>
                                <Samtykketekst />
                            </ExpansionCard.Content>
                        </ExpansionCard>
                        <ConfirmationPanel
                            checked={bekreftSamtykke}
                            label="Jeg har lest og forstått samtykketeksten, og ønsker ta i bruk lagrede søk og favoritter."
                            onChange={() => setBekreftSamtykke((x) => !x)}
                            error={samtykkeError && "Du må samtykke før du kan fortsette."}
                        >
                        </ConfirmationPanel>
                    </Modal.Body>
                    <Modal.Footer>
                        <HStack gap="4">
                            <Button
                                size="small"
                                variant="secondary"
                                onClick={onCloseSamtykkeModal}
                                id="avbryt-lagrede-søk-og-favoritter"
                            >
                                Avbryt
                            </Button>
                            <Button
                                size="small"
                                variant="primary"
                                onClick={() => onSamtykke(epost, navn)}
                                id="lagrede-søk-og-favoritter"
                            >
                                Ta i bruk lagrede søk og favoritter
                            </Button>
                        </HStack>
                    </Modal.Footer>
                </Modal>
            </HStack>
            { harSamtykket && slettSamtykkeModal && (
                <Box padding="6" background="surface-alt-2-subtle" borderRadius="large" className="mb-4">
                    <Heading level="4" size="small" align="left" className="mb-2">
                        Bekreft at du ønsker å slette samtykket for lagrede søk og favoritter
                    </Heading>
                    <BodyLong className="mb-3">
                        Alle dine lagrede søk og favoritter vil slettes, i tillegg til e-postadressen for varsel
                        dersom du har oppgitt det. Informasjonen vil ikke kunne gjenopprettes.
                    </BodyLong>
                    <VStack align="end">
                        <HStack gap="4">
                            <Button
                                size="small"
                                variant="secondary"
                                id="avbryt-slett-samtykke"
                                onClick={() => setSlettSamtykkeModal(false)}
                            >
                                Avbryt
                            </Button>
                            <Button
                                size="small"
                                variant="primary"
                                id="slett-samtykke"
                                onClick={() => onSlettSamtykke()}
                            >
                                Ja, slett samtykke
                            </Button>
                        </HStack>
                    </VStack>
                </Box>
            )}
        </>
    );
}
