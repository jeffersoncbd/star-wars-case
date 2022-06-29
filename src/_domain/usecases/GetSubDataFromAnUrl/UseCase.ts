import { ExtractIdFromSWApiURLs } from '../../entities/ExtractIdFromSWApiURLs'
import { ExtractResourceFromSWApiURLs } from '../../entities/ExtractResourceFromSWApiURLs'
import { GetDataIndexedById } from '../../entities/GetDataIndexedById'

export class UseCaseToGetSubdataFromAnUrl {
  constructor(
    private resourceExtractor: ExtractResourceFromSWApiURLs,
    private idExtractor: ExtractIdFromSWApiURLs,
    private indexedData: GetDataIndexedById
  ) {}

  async getByUrl(url: string) {
    const resource = this.resourceExtractor.extract(url)
    const id = this.idExtractor.extract(url)
    return await this.indexedData.getById(id, resource)
  }
}
