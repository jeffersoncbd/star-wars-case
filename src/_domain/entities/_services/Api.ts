import { UnknownObject } from '../_protocols'

export interface ApiService {
  get(endpoint: string): Promise<UnknownObject[] | UnknownObject>
}
