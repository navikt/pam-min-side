"use client";

import React, { useContext } from "react";
import { PersonaliaContext } from "@/app/(common)/components/context/PersonaliaContext";
import UngIkkeTilgang from "@/app/(common)/components/tilgang/UngIkkeTilgang";

export default function SkulInnholdHvisIkkeTilgang({children}) {

    const personalia = useContext(PersonaliaContext);

    if (personalia.erUnderFemten === true) {
        return <UngIkkeTilgang/>;
    }

    return <>{children}</>;
}
