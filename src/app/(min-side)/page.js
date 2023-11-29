import MinSidePage from "@/app/(min-side)/components/MinSidePage";
import NameContext from "@/app/(common)/components/context/NameContext";
import {ensureUserLoggedIn} from "@/app/(common)/utils/ensureUserLoggedIn";

export default async function Page() {
    await ensureUserLoggedIn();
    return (
        <NameContext>
            <MinSidePage />
        </NameContext>
    );
}
