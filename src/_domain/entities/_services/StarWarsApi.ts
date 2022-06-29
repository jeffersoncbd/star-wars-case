import { UnknownObject } from '../_protocols'

export interface StarWarsApiService {
  get(endpoint: string): Promise<UnknownObject[] | UnknownObject>
}
