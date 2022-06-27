import { UnknownObject } from '../_protocols'

export interface IndexerService {
  index(indice: string, data: UnknownObject): Promise<void>
}
