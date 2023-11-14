import { Inter } from "next/font/google";
import "@navikt/ds-css/dist/global/tokens.css";
import "@navikt/ds-css/dist/global/reset.css";
import "@navikt/ds-css/dist/global/baseline.css";
import "@navikt/ds-css/dist/global/print.css";
import "@navikt/ds-css/dist/components.css";
import "@navikt/arbeidsplassen-css";
import "@navikt/arbeidsplassen-theme";
import "./globals.css";
import App from "./App";
import {ensureUserLoggedIn} from "@/app/(common)/utils/ensureUserLoggedIn";

const inter = Inter({
    subsets: ["latin"],
});

export const metadata = {
    title: "Min side - arbeidsplassen.no",
    description: "",
    icons: {
        icon: "https://arbeidsplassen.nav.no/favicon.png",
    },
};

export default async function RootLayout({ children }) {
    await ensureUserLoggedIn();

    return (
        <html lang="nb">
            <body data-theme="arbeidsplassen" className={inter.className}>
                <App>{children}</App>
            </body>
        </html>
    );
}
