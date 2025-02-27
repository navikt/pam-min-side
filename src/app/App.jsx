"use client";

import { useState } from "react";
import { CookieBanner, Footer, SkipLink } from "@navikt/arbeidsplassen-react";
import AuthenticationProvider from "@/app/(common)/contexts/AuthenticationProvider";
import MinSideHeader from "@/app/(common)/components/MinSideHeader";
import PersonaliaProvider from "@/app/(common)/components/context/PersonaliaContext";
import SkulInnholdHvisIkkeTilgang from "@/app/(common)/components/tilgang/SkjulInnholdHvisIkkeTilgang";
import Umami from "@/app/(common)/components/tracking/Umami";

function App({ userCookieActionTaken, children }) {
    const [localUserCookieActionTaken, setLocalUserCookieActionTaken] = useState(userCookieActionTaken);
    return (
        <AuthenticationProvider>
            <PersonaliaProvider>
                <div id="app">
                    {!localUserCookieActionTaken && (
                        <CookieBanner
                            onClose={() => {
                                setLocalHasUserTakenCookieAction(true);
                            }}
                        />
                    )}
                    <SkipLink href="#main-content" />
                    <div className="arb-push-footer-down">
                        <MinSideHeader />
                        <main id="main-content">
                            <SkulInnholdHvisIkkeTilgang>{children}</SkulInnholdHvisIkkeTilgang>
                        </main>
                    </div>
                    <Footer />
                    {localUserCookieActionTaken && <Umami />}
                </div>
            </PersonaliaProvider>
        </AuthenticationProvider>
    );
}

export default App;
