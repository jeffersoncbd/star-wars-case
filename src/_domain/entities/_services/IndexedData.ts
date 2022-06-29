import { KnownObject } from '../_protocols'

export interface IndexedData {
  id: string
  name: string
  type: string
}

export interface ServiceToIndexData {
  index(object: KnownObject, index: string, type?: string): Promise<void>
}

export interface ServiceToGetDataIndexedById {
  get(id: string, index: string): Promise<IndexedData>
}

export interface ServiceToIndexedDataSearch {
  search(query: string, index: string): Promise<IndexedData[]>
}
