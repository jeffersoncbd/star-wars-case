import { openSearchClient } from '../../services/OpenSearch'
import { KnownObject } from '../../_domain/entities/_protocols'
import { ServiceToIndexData } from '../../_domain/entities/_services'

export class IndexDataInOpenSearch implements ServiceToIndexData {
  async index(
    object: KnownObject,
    index: string,
    type?: string
  ): Promise<void> {
    const { id, ...body } = object
    await openSearchClient.index({
      id: id as string,
      index,
      body: { ...body, type }
    })
  }
}
