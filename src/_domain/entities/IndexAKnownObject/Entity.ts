import { KnownObject } from '../_protocols'
import { ServiceToIndexData } from '../_services'

export class IndexAKnownObject {
  constructor(private indexer: ServiceToIndexData) {}

  async index(knownObject: KnownObject, index: string, type?: string) {
    await this.indexer.index(knownObject, index, type)
  }
}
