This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).


## Avhengigheter

- [pam-aduser](https://github.com/navikt/pam-aduser) 

### Hvordan få tilgang til @navikt/arbeidsplassen-react og @navikt/arbeidsplassen-css

Opprett fila `.npmrc` i hjemkatalogen din. F.eks. `~/.npmrc` Mer info: https://docs.npmjs.com/cli/v9/configuring-npm/npmrc

Legg til følgende i fila

```
@navikt:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=$TOKEN
```

Opprett et token med "read:packages" rettigheter. [https://github.com/settings/tokens](https://github.com/settings/tokens) Bytt ut \$TOKEN med tokenet du akkurat opprettet. Velg Authorize token under "Configure SSO" for å gi tokenet tilgang til @navikt.

Ikke sjekk inn `.npmrc` til GitHub.

Mer informasjon om autentisering: https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry#authenticating-with-a-personal-access-token



## Kjøre lokalt 

Wonderwall tar seg av innlogging og legger på authorization-token på alle requester inn til appen. 

```bash
npm install
npm run dev
```

Appen er avhengig av wonderwall og aduser som kan startes ved hjelp av docker-compose

Frontenden kjører på port 3000: http://localhost:3000/min-side

#### Docker Compose

For å kjøre backend og wonderwall så trenger du å installere [Docker](https://docs.docker.com/engine/install/),
og for å få tilgang til images må du ha [gcloud cli](https://cloud.google.com/sdk/docs/install) installert.

For å kjøre Docker Compose lokalt, trenger du repot med fellestjenester.
Hvis du ikke har det, klone det og legg i samma mappe som `pam-min-side`:

```shell
git clone git@github.com:navikt/pam-docker-compose-shared.git ../pam-docker-compose-shared
```

##### Autentiser Docker repo

Autentiser `gcloud`

```shell
gcloud auth login
```

Legg in Docker repo i credentials helper

```shell
gcloud auth configure-docker europe-north1-docker.pkg.dev
```

Hent token og logg inn i Docker

```shell
gcloud auth print-access-token \
  | docker login \
  -u oauth2accesstoken \
  --password-stdin https://europe-north1-docker.pkg.dev
```

