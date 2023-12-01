"use client";

import React, { useContext } from "react";
import { PersonaliaContext } from "@/app/(common)/components/context/PersonaliaContext";
import UngIkkeTilgang from "@/app/(common)/components/tilgang/UngIkkeTilgang";
import Kode6IkkeTilgang from "@/app/(common)/components/tilgang/Kode6IkkeTilgang";

export default function SkulInnholdHvisIkkeTilgang({children}) {

    const personalia = useContext(PersonaliaContext);
    if (personalia.data && personalia.data.erUnderFemten === true) {
        return <UngIkkeTilgang/>;
    }

    if (personalia.data && personalia.data.kanLoggePaa === false) {
        return <Kode6IkkeTilgang/>;
    }

    return <>{children}</>;
}
