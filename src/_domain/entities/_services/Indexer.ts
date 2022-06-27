import { UnknownObject } from '../_protocols'

export interface IndexerService {
  index(indice: string, data: UnknownObject): Promise<void>
}

export interface IndexExistenceCheckService {
  check(indice: string): Promise<boolean>
}

export interface IndexCreationService {
  create(indice: string): Promise<void>
}
