import * as nock from 'nock'
import * as fs from 'fs';
import * as path from 'path';
import { OrganisationClient } from '../src';

const mockUrl = 'http://localhost/status',
      mockApiToken = '112211',
      mockServiceToken = '221122',
      mockStatus = 'active',
      mockOrgName = 'mock org'

const organisationClient = new OrganisationClient(
  mockApiToken, mockServiceToken, mockUrl);

describe('organisationClient', () => {
  describe('get all organisations', () => {
    test('it should return a list of organisations if status is 200', () => {
      nock(mockUrl)
      .get(`/${mockStatus}?address=true`)
      .reply(200, fs.readFileSync(path.join(__dirname, 'mockResponseBody.json')))

      return organisationClient.getOrganisations(mockStatus)
        .then(response => {
          expect(response).toEqual([
            {
              "contactInformation": [
                {
                  "addressLine1": "1 Trasna way",
                  "addressLine2": "Lurgan",
                  "addressLine3": "",
                  "country": "United Kingdom",
                  "county": "Armagh",
                  "postCode": "BT25 545",
                  "townCity": "Craigavon"
                }
              ],
              "name": "Ernser Inc",
              "organisationIdentifier": "21-3701590"
            },
            {
              "contactInformation": [
                {
                  "addressLine1": "10 Lakeview",
                  "addressLine2": "Crumlin",
                  "addressLine3": "",
                  "country": "United Kingdom",
                  "county": "Down",
                  "postCode": "BT21 525",
                  "townCity": "Ballymena"
                }
              ],
              "name": "Zboncak and Sons",
              "organisationIdentifier": "25-3701590"
            },
            {
              "contactInformation": [
                {
                  "addressLine1": "24 Sandbank rd",
                  "addressLine2": "Sandbank",
                  "addressLine3": "",
                  "country": "United Kingdom",
                  "county": "Down",
                  "postCode": "BT21 525",
                  "townCity": "Galway"
                }
              ],
              "name": "Kassulke Inc",
              "organisationIdentifier": "24-3701590"
            },
            {
              "contactInformation": [
                {
                  "addressLine1": "1 Trasna way",
                  "addressLine2": "Lurgan",
                  "addressLine3": "",
                  "country": "United Kingdom",
                  "county": "Armagh",
                  "postCode": "BT25 545",
                  "townCity": "Craigavon"
                }
              ],
              "name": "B Org",
              "organisationIdentifier": "21-3701590"
            },
            {
              "contactInformation": [
                {
                  "addressLine1": "10 Lakeview",
                  "addressLine2": "Crumlin",
                  "addressLine3": "",
                  "country": "United Kingdom",
                  "county": "Down",
                  "postCode": "BT21 525",
                  "townCity": "Ballymena"
                }
              ],
              "name": "Z and Sons",
              "organisationIdentifier": "25-3701590"
            },
            {
              "contactInformation": [
                {
                  "addressLine1": "24 Sandbank rd",
                  "addressLine2": "Sandbank",
                  "addressLine3": "",
                  "country": "United Kingdom",
                  "county": "Down",
                  "postCode": "BT21 525",
                  "townCity": "Galway"
                }
              ],
              "name": "X Org",
              "organisationIdentifier": "24-3701590"
            },
            {
              "contactInformation": [
                {
                  "addressLine1": "24 Sandbank rd",
                  "addressLine2": "Sandbank",
                  "addressLine3": "",
                  "country": "United Kingdom",
                  "county": "Down",
                  "postCode": "BT21 525",
                  "townCity": "Galway"
                }
              ],
              "name": "1 Org",
              "organisationIdentifier": "24-3701590"
            },
            {
              "contactInformation": [
                {
                  "addressLine1": "24 Sandbank rd",
                  "addressLine2": "Sandbank",
                  "addressLine3": "",
                  "country": "United Kingdom",
                  "county": "Down",
                  "postCode": "BT21 525",
                  "townCity": "Galway"
                }
              ],
              "name": "2 Org",
              "organisationIdentifier": "24-3701590"
            },
            {
              "contactInformation": [
                {
                  "addressLine1": "24 Sandbank rd",
                  "addressLine2": "Sandbank",
                  "addressLine3": "",
                  "country": "United Kingdom",
                  "county": "Down",
                  "postCode": "BT21 525",
                  "townCity": "Galway"
                }
              ],
              "name": "9 Org",
              "organisationIdentifier": "24-3701590"
            },
            {
              "contactInformation": [
                {
                  "addressLine1": "24 Sandbank rd",
                  "addressLine2": "Sandbank",
                  "addressLine3": "",
                  "country": "United Kingdom",
                  "county": "Down",
                  "postCode": "BT21 525",
                  "townCity": "Galway"
                }
              ],
              "name": "0 Org",
              "organisationIdentifier": "24-3701590"
            },
            {
              "contactInformation": [
                {
                  "addressLine1": "24 Sandbank rd",
                  "addressLine2": "Sandbank",
                  "addressLine3": "",
                  "country": "United Kingdom",
                  "county": "Down",
                  "postCode": "BT21 525",
                  "townCity": "Galway"
                }
              ],
              "name": "* Org",
              "organisationIdentifier": "24-3701590"
            }
          ]);
        })
    });

    test('it should reject the promise when status is not provided', () => {
      expect(organisationClient.getOrganisations(''))
        .rejects.toEqual(new Error('Missing required status'));
    });

    test('it should reject the promise if status code is 500', () => {
      nock(mockUrl)
      .get(`/${mockStatus}?address=true`)
      .reply(500)

      expect(organisationClient.getOrganisations(mockStatus))
        .rejects.toEqual(new Error('Internal server error'));
    });

    test('it should reject the promise if status code is 401', () => {
      nock(mockUrl)
      .get(`/${mockStatus}?address=true`)
      .reply(401)

      expect(organisationClient.getOrganisations(mockStatus))
        .rejects.toEqual(new Error('The requested resource is restricted and requires authentication'));
    });

    test('it should reject the promise if status code is 403', () => {
      nock(mockUrl)
      .get(`/${mockStatus}?address=true`)
      .reply(403)

      expect(organisationClient.getOrganisations(mockStatus))
        .rejects.toEqual(new Error('Access denied for either invalid permissions or user is pending'));
    });

    test('it should reject the promise if status code is 404', () => {
      nock(mockUrl)
      .get(`/${mockStatus}?address=true`)
      .reply(404)

      expect(organisationClient.getOrganisations(mockStatus))
        .rejects.toEqual(new Error('No organisation found'));
    });
  });

  describe('get organisation by name', () => {
    test('it should return a list of organisations when matching organisations are found', () => {
      nock(mockUrl)
      .get(`/${mockStatus}?address=true`)
      .reply(200, fs.readFileSync(path.join(__dirname, 'mockResponseBody.json')))

      return organisationClient.getOrganisationByName(mockStatus, 'inc')
      .then(response => {
        expect(response).toEqual([
          {
            "contactInformation": [
              {
                "addressLine1": "1 Trasna way",
                "addressLine2": "Lurgan",
                "addressLine3": "",
                "country": "United Kingdom",
                "county": "Armagh",
                "postCode": "BT25 545",
                "townCity": "Craigavon"
              }
            ],
            "name": "Ernser Inc",
            "organisationIdentifier": "21-3701590"
          },
          {
            "contactInformation": [
              {
                "addressLine1": "24 Sandbank rd",
                "addressLine2": "Sandbank",
                "addressLine3": "",
                "country": "United Kingdom",
                "county": "Down",
                "postCode": "BT21 525",
                "townCity": "Galway"
              }
            ],
            "name": "Kassulke Inc",
            "organisationIdentifier": "24-3701590"
          }
        ]);
      })
    });

    test('it should return a list of organisations when matching organisations are found in Ascending alphabetical order', () => {
      nock(mockUrl)
          .get(`/${mockStatus}?address=true`)
          .reply(200, fs.readFileSync(path.join(__dirname, 'mockResponseBody.json')))

      return organisationClient.getOrganisationByName(mockStatus, 'org')
          .then(response => {
            expect(response).toEqual([
              {
                "contactInformation": [
                  {
                    "addressLine1": "24 Sandbank rd",
                    "addressLine2": "Sandbank",
                    "addressLine3": "",
                    "country": "United Kingdom",
                    "county": "Down",
                    "postCode": "BT21 525",
                    "townCity": "Galway"
                  }
                ],
                "name": "* Org",
                "organisationIdentifier": "24-3701590"
              },
              {
                "contactInformation": [
                  {
                    "addressLine1": "24 Sandbank rd",
                    "addressLine2": "Sandbank",
                    "addressLine3": "",
                    "country": "United Kingdom",
                    "county": "Down",
                    "postCode": "BT21 525",
                    "townCity": "Galway"
                  }
                ],
                "name": "0 Org",
                "organisationIdentifier": "24-3701590"
              },
              {
                "contactInformation": [
                  {
                    "addressLine1": "24 Sandbank rd",
                    "addressLine2": "Sandbank",
                    "addressLine3": "",
                    "country": "United Kingdom",
                    "county": "Down",
                    "postCode": "BT21 525",
                    "townCity": "Galway"
                  }
                ],
                "name": "1 Org",
                "organisationIdentifier": "24-3701590"
              },
              {
                "contactInformation": [
                  {
                    "addressLine1": "24 Sandbank rd",
                    "addressLine2": "Sandbank",
                    "addressLine3": "",
                    "country": "United Kingdom",
                    "county": "Down",
                    "postCode": "BT21 525",
                    "townCity": "Galway"
                  }
                ],
                "name": "2 Org",
                "organisationIdentifier": "24-3701590"
              },
              {
                "contactInformation": [
                  {
                    "addressLine1": "24 Sandbank rd",
                    "addressLine2": "Sandbank",
                    "addressLine3": "",
                    "country": "United Kingdom",
                    "county": "Down",
                    "postCode": "BT21 525",
                    "townCity": "Galway"
                  }
                ],
                "name": "9 Org",
                "organisationIdentifier": "24-3701590"
              },
              {
                "contactInformation": [
                  {
                    "addressLine1": "1 Trasna way",
                    "addressLine2": "Lurgan",
                    "addressLine3": "",
                    "country": "United Kingdom",
                    "county": "Armagh",
                    "postCode": "BT25 545",
                    "townCity": "Craigavon"
                  }
                ],
                "name": "B Org",
                "organisationIdentifier": "21-3701590"
              },
              {
                "contactInformation": [
                  {
                    "addressLine1": "24 Sandbank rd",
                    "addressLine2": "Sandbank",
                    "addressLine3": "",
                    "country": "United Kingdom",
                    "county": "Down",
                    "postCode": "BT21 525",
                    "townCity": "Galway"
                  }
                ],
                "name": "X Org",
                "organisationIdentifier": "24-3701590"
              }
            ]);
          })
    });

    test('it should return an empty list if no organisations include organiation name', () => {
      nock(mockUrl)
      .get(`/${mockStatus}?address=true`)
      .reply(200, fs.readFileSync(path.join(__dirname, 'mockResponseBody.json')))

      return organisationClient.getOrganisationByName(mockStatus, 'JL logistics')
        .then(response => {
          expect(response).toEqual([]);
        })
    });

    test('it should reject the promise when status is not provided', () => {
      expect(organisationClient.getOrganisationByName('', mockOrgName))
        .rejects.toEqual(new Error('Missing required status'));
    });

    test('it should reject the promise when organisation name is not provided', () => {
      expect(organisationClient.getOrganisationByName(mockStatus, ''))
        .rejects.toEqual(new Error('Missing organisation name'));
    });

    test('it should reject the promise if status code is 500', () => {
      nock(mockUrl)
      .get(`/${mockStatus}?address=true`)
      .reply(500)

      expect(organisationClient.getOrganisationByName(mockStatus, mockOrgName))
        .rejects.toEqual(new Error('Internal server error'));
    });

    test('it should reject the promise if status code is 401', () => {
      nock(mockUrl)
      .get(`/${mockStatus}?address=true`)
      .reply(401)

      expect(organisationClient.getOrganisationByName(mockStatus, mockOrgName))
        .rejects.toEqual(new Error('The requested resource is restricted and requires authentication'));
    });

    test('it should reject the promise if status code is 403', () => {
      nock(mockUrl)
      .get(`/${mockStatus}?address=true`)
      .reply(403)

      expect(organisationClient.getOrganisationByName(mockStatus, mockOrgName))
        .rejects.toEqual(new Error('Access denied for either invalid permissions or user is pending'));
    });

    test('it should reject the promise if status code is 404', () => {
      nock(mockUrl)
      .get(`/${mockStatus}?address=true`)
      .reply(404)

      expect(organisationClient.getOrganisationByName(mockStatus, mockOrgName))
        .rejects.toEqual(new Error('No organisation found'));
    });
  });
});