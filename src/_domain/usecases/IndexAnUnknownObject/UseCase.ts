import { MapTheObject } from '../../entities/MapTheObject'
import { IndexerService } from '../../entities/_services'
import { UnknownObject } from '../../entities/_protocols'

export interface IndexationSettings {
  index: string
  properties: string[]
}

export class IndexAnUnknownObjectUseCase {
  constructor(private mapper: MapTheObject, private indexer: IndexerService) {}

  async index(object: UnknownObject, settings: IndexationSettings) {
    const mappedObject = this.mapper.map(object, settings.properties)
    await this.indexer.index(settings.index, mappedObject)
  }
}
