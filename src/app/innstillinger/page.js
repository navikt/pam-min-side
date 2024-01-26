import InnstillingerPage from "@/app/innstillinger/components/InnstillingerPage";
import {ensureUserLoggedIn} from "@/app/(common)/utils/ensureUserLoggedIn";

export const metadata = {
    title: "Samtykker og innstillinger - arbeidsplassen.no"
};

export default async function Page() {
    await ensureUserLoggedIn();
    return <InnstillingerPage />;
}
