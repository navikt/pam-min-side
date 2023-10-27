"use client";

import { Box, Heading } from "@navikt/ds-react";

export default function InnstillingerPage() {
    return (
        <Box paddingBlock={{ xs: "8 8", md: "16 16" }} className="container-medium">
            <Heading level="1" size="xlarge" align="center" className="mb-16">
                Samtykker og innstillinger
            </Heading>
        </Box>
    );
}
