import "@navikt/ds-css/dist/global/tokens.css";
import "@navikt/ds-css/dist/global/reset.css";
import "@navikt/ds-css/dist/global/baseline.css";
import "@navikt/ds-css/dist/global/print.css";
import "@navikt/ds-css/dist/components.css";
import "@navikt/arbeidsplassen-css";
import "@navikt/arbeidsplassen-theme";
import "./globals.css";
import App from "./App";
import { ensureUserLoggedIn } from "@/app/(common)/utils/ensureUserLoggedIn";
import interLocalFont from "next/font/local";

const myFont = interLocalFont({
    variable: "--font-inter",
    src: "../../public/fonts/InterVariable.ttf",
    weight: "100 900",
    display: "swap",
    preload: true,
    adjustFontFallback: false,
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
            <body data-theme="arbeidsplassen" className={myFont.className}>
                <App>{children}</App>
            </body>
        </html>
    );
}
