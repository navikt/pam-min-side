import {grant} from "@/app/(common)/utils/tokenUtils";

const aduserUrl = process.env.PAM_ADUSER_URL || 'http://localhost:9017';
const userUrl = aduserUrl + "/aduser/api/v1/user"
const csrfCookieName = "XSRF-TOKEN-ARBEIDSPLASSEN"

export async function GET(request) {
    const token = await exchangeToken(request);
    const res = await fetch(userUrl, {
        method: "GET",
        headers: createAuthorizationAndContentTypeHeaders(token)
    });

    if (!res.ok) {
        return new Response(res.body, {
            status: res.status
        })
    }

    const data = await res.json();
    return Response.json(data);
}

export async function POST(request) {
    const token = await exchangeToken(request);
    const res = await fetch(userUrl, {
        method: "POST",
        headers: createAuthorizationAndContentTypeHeaders(token, request.cookies.get(csrfCookieName)?.value),
        body: request.body,
        credentials: "same-origin",
        duplex: "half",
    });

    if (!res.ok) {
        return new Response(res.body, {
            status: res.status
        })
    }

    const data = await res.json();
    return Response.json(data);
}

export async function PUT(request) {
    const token = await exchangeToken(request);
    const res = await fetch(userUrl, {
        method: "PUT",
        headers: createAuthorizationAndContentTypeHeaders(token, request.cookies.get(csrfCookieName)?.value),
        body: request.body,
        credentials: "same-origin",
        duplex: "half",
    });

    if (!res.ok) {
        return new Response(res.body, {
            status: res.status
        })
    }

    const data = await res.json();
    return Response.json(data);
}

export async function DELETE(request) {
    const token = await exchangeToken(request);
    const res = await fetch(userUrl, {
        method: "DELETE",
        headers: createAuthorizationAndContentTypeHeaders(token, request.cookies.get(csrfCookieName)?.value),
    });

    if (!res.ok) {
        return new Response(res.body, {
            status: res.status
        })
    }

    return Response.json("{}")
}

async function exchangeToken(request) {
    const audience = process.env.PAM_ADUSER_AUDIENCE;
    const idportenToken = request.headers.get('authorization');

    const replacedToken = idportenToken.replace('Bearer ', '');
    const token = await grant(replacedToken, audience);

    if(token === "") {
        return new Response("Det har skjedd en feil ved utveksling av token", {
            status: 401
        })
    }
    return token;
}

function createAuthorizationAndContentTypeHeaders(token, csrf) {
    const requestHeaders= new Headers()
    requestHeaders.set('authorization', `Bearer ${token}`);
    requestHeaders.set('content-type', 'application/json');
    if (csrf) {
        requestHeaders.set('cookie', `${csrfCookieName}=${csrf}`)
        requestHeaders.set(`X-${csrfCookieName}`, csrf);
    }
    return requestHeaders;
}
