import { UnknownObject } from '../_protocols'

export interface IndexerService {
  index(data: UnknownObject, index: string, type?: string): Promise<void>
}
