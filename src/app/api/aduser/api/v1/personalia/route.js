import {exchangeToken} from "@/app/(common)/utils/tokenUtils";
import { ADUSER_URL } from "@/app/(common)/utils/constants";
import logger from "@/app/(common)/utils/logger";

export async function GET(request) {
    logger.info("GET personalia");

    const token = await exchangeToken(request);

    if(token === "") {
        return new Response("Det har skjedd en feil ved utveksling av token", {
            status: 401
        })
    }

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('authorization', `Bearer ${token}`);
    requestHeaders.set('content-type', 'application/json');

    let aduserUrl = `${ADUSER_URL}/aduser/api/v1/personalia`

    const res = await fetch(aduserUrl, {
        credentials: "same-origin",
        method: "GET",
        headers: requestHeaders
    });

    if (res.ok) {
        const data = await res.json();
        return Response.json(data, {
            headers: res.headers
        });
    }

    return new Response(res.body, {
        status: res.status
    })
}
