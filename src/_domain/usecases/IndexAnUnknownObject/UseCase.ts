import { MapTheObject } from '../../entities/MapTheObject'
import { IndexerService, UnknownObject } from '../../entities/_services'

export interface IndexationSettings {
  index: string
  context: string
  properties: string[]
}

export class IndexAnUnknownObject {
  constructor(private mapper: MapTheObject, private indexer: IndexerService) {}

  async index(object: UnknownObject, settings: IndexationSettings) {
    const mappedObject = this.mapper.map(object, settings.properties)
    await this.indexer.index(
      `${settings.context}-${settings.index}`,
      mappedObject
    )
  }
}
