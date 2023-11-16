import logger from "@/app/(common)/utils/logger";
import {grant} from "@/app/(common)/utils/tokenUtils";

export async function GET(request) {
    const aduser_url = process.env.PAM_ADUSER_URL || 'http://localhost:9017';
    const audience = process.env.PAM_ADUSER_AUDIENCE;
    const idportenToken = request.headers.get('authorization');

    const replacedToken = idportenToken.replace('Bearer ', '');
    let token;

    try {
        token = await grant(replacedToken, audience);
    } catch (e) {
        logger.error(`feil ved veksling til tokenx: ${e.message}`)
    }

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('authorization', `Bearer ${token}`);
    requestHeaders.set('content-type', 'application/json');

    let aduserUrl = aduser_url + "/aduser/api/v1/personalia"

    const res = await fetch(aduserUrl, {
        method: "GET",
        headers: requestHeaders
    });

    //logger.info(`Respons fra aduser: ${res.status}`)
    //logger.info(`Respons fra aduser er : ${res}`)

    if(res.ok) {
        if(!res.body) {
            logger.info("Personalia er tom")
            return new Response(res.body, {
                status: res.status
            })
        }
        const data = await res.json();
        return Response.json(data);
    }

    return new Response(res.body, {
        status: res.status
    })
}
