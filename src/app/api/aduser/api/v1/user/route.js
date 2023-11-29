import {
    createAuthorizationAndContentTypeHeaders, CSRF_COOKIE_NAME,
    exchangeToken,
    grant
} from "@/app/(common)/utils/tokenUtils";
import { ADUSER_URL } from "@/app/(common)/utils/constants";

export const userUrl = `${ADUSER_URL}/aduser/api/v1/user`

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
        headers: createAuthorizationAndContentTypeHeaders(token, request.cookies.get(CSRF_COOKIE_NAME)?.value),
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
        headers: createAuthorizationAndContentTypeHeaders(token, request.cookies.get(CSRF_COOKIE_NAME)?.value),
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
        headers: createAuthorizationAndContentTypeHeaders(token, request.cookies.get(CSRF_COOKIE_NAME)?.value),
    });

    if (!res.ok) {
        return new Response(res.body, {
            status: res.status
        })
    }

    return Response.json("{}")
}

