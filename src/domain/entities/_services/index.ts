export interface UnknownObject {
  [key: string]: string | number
}

export interface ApiService {
  get(endpoint: string): Promise<UnknownObject[]>
}

export interface IndexerService {
  index(indice: string, data: UnknownObject): Promise<void>
}
