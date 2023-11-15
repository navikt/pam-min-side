import {headers} from "next/headers";
import logger from "@/app/(common)/utils/logger";
import {redirect} from "next/navigation";
import {isTokenValid} from "@/app/(common)/utils/tokenUtils";
export async function ensureUserLoggedIn() {
    const requestHeaders = headers();
    const bearerToken = requestHeaders.get('authorization');

    if(!bearerToken) {
        redirect(`/oauth2/login?redirect=${encodeURIComponent('/min-side')}`)
    }
    const token = bearerToken.replace('Bearer ', '');

    const validToken = await isTokenValid(token);

    if(!validToken) {
        logger.error("Ugyldig token")
        redirect(`/oauth2/login?redirect=${encodeURIComponent('/min-side')}`)
    }
}
