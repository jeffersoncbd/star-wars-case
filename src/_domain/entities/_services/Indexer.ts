import { UnknownObject } from '../_protocols'

export interface IndexerService {
  index(data: UnknownObject, index: string, type?: string): Promise<void>
}

export interface IndexedData {
  id: string
  name: string
  type: string
}

export interface IndexedDataSearchService {
  search(index: string, query: string): Promise<IndexedData>
}
