import { MapAnUnknownObject } from '../../entities/MapAnUnknownObject'
import { UnknownObject } from '../../entities/_protocols'
import { IndexAKnownObject } from '../../entities/IndexAKnownObject'

export class UseCaseToIndexAnUnknownObject {
  constructor(
    private mapper: MapAnUnknownObject,
    private indexer: IndexAKnownObject
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
