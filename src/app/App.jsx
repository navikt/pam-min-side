"use client";

import { Footer, SkipLink } from "@navikt/arbeidsplassen-react";
import AuthenticationProvider from "@/app/(common)/contexts/AuthenticationProvider";
import MinSideHeader from "@/app/(common)/components/MinSideHeader";

function App({ children }) {
    return (
        <AuthenticationProvider>
            <div id="app">
                <SkipLink href="#main-content"/>
                <div className="arb-push-footer-down">
                    <MinSideHeader/>
                    <main id="main-content">{children}</main>
                </div>
                <Footer/>
            </div>
        </AuthenticationProvider>
    );
}


export default App;
