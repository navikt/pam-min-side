import { validateIdportenToken } from "@navikt/next-auth-wonderwall";
import logger from "@/app/(common)/utils/logger";
import { headers } from 'next/headers'

export async function GET(request) {
    const bearerToken = headers().get('authorization')
    if (bearerToken) {
        try {
            const validToken = await validateIdportenToken(bearerToken);
            if (validToken) {
                return new Response("OK", {
                    status: 200
                })
            } else {
                return new Response("Unauthorized", {
                    status: 401
                })
            }
        } catch (e) {
            logger.error(`Idporten-token kunne ikke valideres: ${e.message}`);
            return new Response(e.message, {
                status: 500
            })
        }
    } else {
        return new Response("No token found", {
            status: 401
        })
    }
}
