import { UnknownObject } from '../_protocols'

export interface IndexerService {
  index(data: UnknownObject, index: string, type?: string): Promise<void>
}

export interface IndexExistenceCheckService {
  check(index: string): Promise<boolean>
}

export interface IndexCreationService {
  create(index: string): Promise<void>
}
