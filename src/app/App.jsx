"use client";

import { Footer, SkipLink } from "@navikt/arbeidsplassen-react";
import AuthenticationProvider from "@/app/(common)/contexts/AuthenticationProvider";
import MinSideHeader from "@/app/(common)/components/MinSideHeader";
import PersonaliaProvider from "@/app/(common)/components/context/PersonaliaContext";
import SkulInnholdHvisIkkeTilgang from "@/app/(common)/components/tilgang/SkjulInnholdHvisIkkeTilgang";

function App({ children }) {
    return (
        <AuthenticationProvider>
            <PersonaliaProvider>
                <div id="app">
                    <SkipLink href="#main-content" />
                    <div className="arb-push-footer-down">
                        <MinSideHeader />
                        <main id="main-content">
                            <SkulInnholdHvisIkkeTilgang>{children}</SkulInnholdHvisIkkeTilgang>
                        </main>
                    </div>
                    <Footer />
                </div>
            </PersonaliaProvider>
        </AuthenticationProvider>
    );
}

export default App;
