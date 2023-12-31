"use client";

import { Box, Button, Heading, HStack, LinkPanel, VStack } from "@navikt/ds-react";
import { CogIcon } from "@navikt/aksel-icons";
import Link from "next/link";
import { useContext } from "react";
import { PersonaliaContext } from "@/app/(common)/components/context/PersonaliaContext";
import LoadingPage from "@/app/(common)/components/LoadingPage";
import ErrorPage from "@/app/(common)/components/ErrorPage";
import Feedback from "@/app/(min-side)/components/Feedback";

export default function MinSidePage() {
    const personalia = useContext(PersonaliaContext);

    if (personalia.status === "error") {
        return <ErrorPage />;
    }

    return (
        <>
            {personalia.status === "not-fetched" || personalia.status === "pending" ? (
                <div className="text-center">
                    <LoadingPage />
                </div>
            ) : (
                <Box paddingBlock={{ xs: "8 8", md: "16 16" }} className="container-medium">
                    <Heading level="1" size="xlarge" align="center" className="mb-1">
                        {personalia.data && personalia.data.navn}
                    </Heading>

                    <VStack align="center" className="mb-8">
                        <Button
                            variant="tertiary"
                            as={Link}
                            href="/innstillinger"
                            icon={<CogIcon aria-hidden="true" fontSize="1.5rem" />}
                        >
                            Samtykker og innstillinger
                        </Button>
                    </VStack>

                    <VStack gap="4" className="mb-14">
                        <HStack gap="4" align="start">
                            <LinkPanel href={`/stillinger/lagrede-sok`} className="arb-link-panel-primary flex-1">
                                <LinkPanel.Title>Mine lagrede søk</LinkPanel.Title>
                                <LinkPanel.Description>
                                    Bruk et lagret søk for å finne stillinger, eller slett varsel på søk du ikke bruker.
                                </LinkPanel.Description>
                            </LinkPanel>
                            <LinkPanel href={`/stillinger/favoritter`} className="arb-link-panel-primary flex-1">
                                <LinkPanel.Title>Mine favoritter</LinkPanel.Title>
                                <LinkPanel.Description>Vis alle annonser du har lagret som favoritter.</LinkPanel.Description>
                            </LinkPanel>
                        </HStack>
                        <LinkPanel href={`/cv?v1`} className="arb-link-panel-secondary">
                            <LinkPanel.Title>Min CV</LinkPanel.Title>
                            <LinkPanel.Description>
                                Fyll ut og hold din CV oppdatert for å bruke den ved jobbsøking.
                            </LinkPanel.Description>
                        </LinkPanel>
                    </VStack>
                    <Feedback />
                </Box>
            )}
        </>
    );
}


