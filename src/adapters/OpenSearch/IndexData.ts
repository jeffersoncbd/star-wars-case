import { openSearchClient } from '../../services/OpenSearch'
import { KnownObject } from '../../_domain/entities/_protocols'
import { ServiceToIndexData } from '../../_domain/entities/_services'

export class IndexDataInOpenSearch implements ServiceToIndexData {
  async index(
    object: KnownObject,
    index: string,
    type?: string
  ): Promise<void> {
    const document = {
      id: object.id as string,
      index,
      body: { ...object, type }
    }

    await openSearchClient.index(document)
  }
}
