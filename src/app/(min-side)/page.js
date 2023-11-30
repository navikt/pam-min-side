import MinSidePage from "@/app/(min-side)/components/MinSidePage";
import {ensureUserLoggedIn} from "@/app/(common)/utils/ensureUserLoggedIn";

export default async function Page() {
    await ensureUserLoggedIn();
    return <MinSidePage />;
}
