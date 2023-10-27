"use client";

import React from "react";
import PropTypes from "prop-types";
import { Footer, Header, SkipLink } from "@navikt/arbeidsplassen-react";

function App({ children }) {
    return (
        <div id="app">
            <SkipLink href="#main-content" />
            <div className="arb-push-footer-down">
                <Header
                    variant="person"
                    authenticationStatus="is-authenticated"
                    onLogin={() => {}}
                    onLogout={() => {}}
                />
                <main id="main-content">{children}</main>
            </div>
            <Footer />
        </div>
    );
}

App.propTypes = {
    children: PropTypes.oneOf([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default App;
