import { userUrl } from "@/app/api/aduser/api/v1/user/route";
import {
    createAuthorizationAndContentTypeHeaders,
    CSRF_COOKIE_NAME,
    exchangeToken
} from "@/app/(common)/utils/tokenUtils";

export async function PUT(request) {
    const token = await exchangeToken(request);
    const res = await fetch(userUrl + "/resend-verification-mail", {
        method: "PUT",
        headers: createAuthorizationAndContentTypeHeaders(token, request.cookies.get(CSRF_COOKIE_NAME)?.value),
        credentials: "same-origin",
        duplex: "half",
    });

    console.log("/PUT response ", res.status)
    if (!res.ok) {
        return new Response(res.body, {
            status: res.status
        })
    }

    return Response.json("{}");
}
