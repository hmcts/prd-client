import fetch from 'node-fetch';
import { OrganisationMinimalInfo } from './types';

export class OrganisationClient {
  constructor(private readonly apiKey: string,
              private readonly serviceApiKey: string,
              private readonly apiUrl: string = 'http://rd-professional-api-aat.service.core-compute-aat.internal/refdata/external/v1/organisations/status') {}

  public getOrganisations(status: string, address: boolean = true): Promise<OrganisationMinimalInfo[]> {
    if (!status) {
      return Promise.reject(new Error('Missing required status'));
    }

    return this.getUri(`/${status}?address=${address}`).then(response => {
      switch(response.status) {
        case 401:
          throw new Error('The requested resource is restricted and requires authentication');
        case 403:
          throw new Error('Access denied for either invalid permissions or user is pending');
        case 500:
          throw new Error('Internal server error');
        case 404:
          throw new Error('No organisation found');
        case 200:
          return response.json();
        }
    });
  }

  public getOrganisationByName(status: string, name: string, address: boolean = true): Promise<OrganisationMinimalInfo[]> {
    if (!status) {
      return Promise.reject(new Error('Missing required status'));
    } else if (!name) {
      return Promise.reject(new Error('Missing organisation name'));
    }

    name = name.trim().toLowerCase();

    const alphabeticalOrder = () =>
        (organisationOne: { name: string; }, organisationsTwo: { name: string; }) =>
        organisationOne.name.localeCompare(organisationsTwo.name);

    return this.getOrganisations(status, address)
      .then(organisations => {
        return organisations.filter(organisation => {
          return organisation.name
            .trim()
            .toLowerCase()
            .includes(name);
        }).sort(alphabeticalOrder())
      })
      .catch(error => { throw error });
  }

  private getUri(path: string): Promise<any> {
    return fetch(`${this.apiUrl}${path}`, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'ServiceAuthorization': this.serviceApiKey,
        'accept': 'application/json'
      }
    })
  }
}