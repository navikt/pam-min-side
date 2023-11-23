import MinSidePage from "@/app/(min-side)/components/MinSidePage";
import NameContext from "@/app/(common)/components/context/NameContext";

export default function Page() {
    return (
        <NameContext>
            <MinSidePage />
        </NameContext>
    );
}
