import { MapTheObject } from '../../entities/MapTheObject'
import { IndexerService } from '../../entities/_services'
import { UnknownObject } from '../../entities/_protocols'

export interface IndexationSettings {
  index: string
  type?: string
}

export class IndexAnUnknownObjectUseCase {
  constructor(private mapper: MapTheObject, private indexer: IndexerService) {}

  async index(
    object: UnknownObject,
    properties: string[],
    settings: IndexationSettings
  ) {
    const mappedObject = this.mapper.map(object, properties)
    await this.indexer.index(mappedObject, settings.index, settings.type)
  }
}
