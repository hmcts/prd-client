# prd-client
Client library to access Professional Reference Data

## Quick start

```bash
$ yarn add @hmcts/prd-client
```

Typescript:
```ts
import { OrganisationClient } from '@hmcts/prd-client'

new OrganisationClient('<user token here>', '<service token here>').getOrganisationByName('Organisation name')

```

- Javascript -

```js
const OrganisationClient = require('@hmcts/prd-client').OrganisationClient

new OrganisationClient('<user token here>', '<service token here>').getOrganisationByName('Organisation name')
```

## Publishing to NPM

To publish this artefact to NPM, just create a release in GitHub. GitHub Actions will publish a version in NPM matching the version the packages.json file.
