import { MapAnUnknownObject } from '../../entities/MapAnUnknownObject'
import { ServiceToIndexData } from '../../entities/_services'
import { UnknownObject } from '../../entities/_protocols'

export class IndexAnUnknownObjectUseCase {
  constructor(
    private mapper: MapAnUnknownObject,
    private indexer: ServiceToIndexData
  ) {}

  async index(
    unknownObject: UnknownObject,
    propertiesToMap: string[],
    index: string,
    type?: string
  ) {
    const knownObject = this.mapper.map(unknownObject, propertiesToMap)
    await this.indexer.index(knownObject, index, type)
  }
}
