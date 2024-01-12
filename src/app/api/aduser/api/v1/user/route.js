import {
    createAuthorizationAndContentTypeHeaders, CSRF_COOKIE_NAME,
    exchangeToken,
} from "@/app/(common)/utils/tokenUtils";
import { ADUSER_URL } from "@/app/(common)/utils/constants";
import logger from "@/app/(common)/utils/logger";

export const userUrl = `${ADUSER_URL}/aduser/api/v1/user`

export async function GET(request) {
    logger.info("GET user");
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
    logger.info("POST user");
    const token = await exchangeToken(request);
    const res = await fetch(userUrl, {
        method: "POST",
        headers: createAuthorizationAndContentTypeHeaders(token, request.cookies.get(CSRF_COOKIE_NAME)?.value),
        body: request.body,
        credentials: "same-origin",
        duplex: "half",
    }).catch(err => {
        logger.error(`POST user fetch feilet '${err}'`);
        return new Response("Fetch feilet", {
            status: 500
        })
    });

    if (!res.ok) {
        logger.error(`POST user feilet ${res.status}`);
        const text = await res.text();
        logger.error(`POST user feilet text: ${text}`);
        return new Response(text, {
            status: res.status
        })
    }

    const data = await res.json();
    return Response.json(data);
}

export async function PUT(request) {
    logger.info("PUT user");
    const token = await exchangeToken(request);
    const res = await fetch(userUrl, {
        method: "PUT",
        headers: createAuthorizationAndContentTypeHeaders(token, request.cookies.get(CSRF_COOKIE_NAME)?.value),
        body: request.body,
        credentials: "same-origin",
        duplex: "half",
    }).catch(err => {
        logger.error(`PUT user fetch feilet '${err}'`);
        return new Response("Fetch feilet", {
            status: 500
        })
    });

    if (!res.ok) {
        logger.error(`PUT user feilet ${res.status}`);
        const text = await res.text();
        logger.error(`PUT user feilet text: ${text}`);
        return new Response(res.body, {
            status: res.status
        })
    }

    const data = await res.json();
    return Response.json(data);
}

export async function DELETE(request) {
    logger.info("DELETE user");
    const token = await exchangeToken(request);
    const res = await fetch(userUrl, {
        method: "DELETE",
        headers: createAuthorizationAndContentTypeHeaders(token, request.cookies.get(CSRF_COOKIE_NAME)?.value),
    }).catch(err => {
        logger.error(`DELETE user fetch feilet '${err}'`);
        return new Response("Fetch feilet", {
            status: 500
        })
    });

    if (!res.ok) {
        logger.error(`DELETE user feilet ${res.status}`);
        const text = await res.text();
        logger.error(`DELETE user feilet text: ${text}`);
        return new Response(res.body, {
            status: res.status
        })
    }

    return Response.json("{}")
}

