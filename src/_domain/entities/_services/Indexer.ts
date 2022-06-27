import { UnknownObject } from '../_protocols'

export interface IndexerService {
  index(index: string, data: UnknownObject): Promise<void>
}

export interface IndexExistenceCheckService {
  check(index: string): Promise<boolean>
}

export interface IndexCreationService {
  create(index: string): Promise<void>
}
