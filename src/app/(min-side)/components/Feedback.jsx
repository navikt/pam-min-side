import React, { useState } from "react";
import { BodyLong, Heading, HStack, Link, Panel, VStack } from "@navikt/ds-react";
import { FeedbackButton } from "@navikt/arbeidsplassen-react";
import { FaceFrownIcon, FaceIcon, FaceSmileIcon } from "@navikt/aksel-icons";
import logAmplitudeEvent from "@/app/(common)/components/tracking/amplitudeTracker";

function Feedback() {
    const [hasAnswered, setHasAnswered] = useState(false);

    const trackAnswer = (answer) => {
        logAmplitudeEvent("Answered survey", {
            i_hvilken_grad_opplever_du_at_vare_tjenester_hjelper_deg_som_jobbsoker: answer,
            surveyId: "sporreundersokelse-min-side",
        });
        setHasAnswered(true);
    };

    return (
        <Panel className="mb-9">
            <VStack gap="2" justify="center">
                <Heading size="small" level="2" className="text-center" id="survey-title">
                    I hvilken grad opplever du at våre tjenester hjelper deg som jobbsøker?
                </Heading>

                {hasAnswered ? (
                    <BodyLong className="text-center bold">Takk for tilbakemeldingen!</BodyLong>
                ) : (
                    <HStack gap="2" justify="center">
                        <FeedbackButton
                            aria-describedby="survey-title"
                            onClick={() => {
                                trackAnswer("Mye");
                            }}
                            icon={<FaceSmileIcon aria-hidden="true" width="1.5em" height="1.5em" />}
                        >
                            Mye
                        </FeedbackButton>
                        <FeedbackButton
                            aria-describedby="survey-title"
                            onClick={() => {
                                trackAnswer("Lite");
                            }}
                            icon={<FaceFrownIcon aria-hidden="true" width="1.5em" height="1.5em" />}
                        >
                            Lite
                        </FeedbackButton>
                        <FeedbackButton
                            aria-describedby="survey-title"
                            onClick={() => {
                                trackAnswer("Vet ikke");
                            }}
                            icon={<FaceIcon aria-hidden="true" width="1.5em" height="1.5em" />}
                        >
                            Vet ikke
                        </FeedbackButton>
                    </HStack>
                )}

                <BodyLong className="text-center">
                    Er det noe du savner eller synes kunne vært bedre setter vi stor pris på å høre mer om det.
                </BodyLong>
                <BodyLong className="text-center">
                    <Link href="https://surveys.hotjar.com/92827cde-3f22-47b0-b9a6-aa12f06aa1c5">
                        Skriv en kort tilbakemelding
                    </Link>
                </BodyLong>
            </VStack>
        </Panel>
    );
}

export default Feedback;
