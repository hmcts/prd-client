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
