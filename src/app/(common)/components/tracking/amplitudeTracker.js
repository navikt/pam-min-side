import * as amplitude from "@amplitude/analytics-browser";
import { identify, init, track } from "@amplitude/analytics-browser";
import {AMPLITUDE_TOKEN} from "@/app/(common)/utils/constants";

let isAmplitudeEnabledForHostname = false;
if(typeof window !== 'undefined') {
    isAmplitudeEnabledForHostname = window.location.hostname.includes(".nav.no");
}
let initialized = false;
function getAmplitudeKey() {
    if(typeof window !== 'undefined') {
        if (window.location.href.includes("nav.no")) return AMPLITUDE_TOKEN;
        return ""; // other e.g. localhost
    } else {
        return ""; // server side
    }
}

function setAuthenticationStatusForOrganization() {
    const userProperties = new amplitude.Identify();
    userProperties.set("is_authenticated", true);
    identify(userProperties);
}

function setupAmplitude() {
    if (initialized) return true;

    if (!isAmplitudeEnabledForHostname) return false;

    setAuthenticationStatusForOrganization();

    try {
        init(getAmplitudeKey(), undefined, {
            serverUrl: `https://amplitude.nav.no/collect`,
            defaultTracking: {
                pageViews: true,
                sessions: true,
                formInteractions: true,
            },
            /** Need this for /collect-auto according to https://nav-it.slack.com/archives/CMK1SCBP1/p1669722646425599
             * but seems to work fine with /collect? Keeping it here just in case.
             IngestionMetadata: {
             sourceName: window.location.toString(),
             },
             */
        });

        initialized = true;

        track("auth status", { is_authenticated: true });
    } catch (e) {
        initialized = false;
    }
    return initialized;
}

function logAmplitudeEvent(event, data) {
    if (!setupAmplitude()) return;
    track(event, data);
}

export default logAmplitudeEvent;
