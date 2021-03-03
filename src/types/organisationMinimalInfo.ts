import { ContactInformation } from "./contactInformation";

export interface OrganisationMinimalInfo {
  name: string,
  organisationIdentifier: string,
  contactInformation?: ContactInformation[]
}