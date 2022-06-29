import { swApi } from '../services/SWapi'
import { ExtractIdFromSWApiURLs } from '../_domain/entities/ExtractIdFromSWApiURLs'
import { UnknownObject } from '../_domain/entities/_protocols'
import { StarWarsApiService } from '../_domain/entities/_services'

export class StarWarsApiAdapter implements StarWarsApiService {
  private objects: UnknownObject[] = []
  private idExtractor = new ExtractIdFromSWApiURLs()

  private async callNextPage(endpoint: string, next: string): Promise<void> {
    const response = await swApi.get(`${endpoint}?${next.split('?')[1]}`)
    this.objects = this.objects.concat(response.data.results)
    if (response.data.next) {
      await this.callNextPage(endpoint, response.data.next)
    }
  }

  async get(endpoint: string): Promise<UnknownObject | UnknownObject[]> {
    const response = await swApi.get(endpoint)
    if (response.data.results === undefined) {
      if (response.data.title) {
        response.data.name = response.data.title
      }
      response.data.id = this.idExtractor.extract(response.data.url)
      return response.data
    }
    this.objects = this.objects.concat(response.data.results)
    if (response.data.next) {
      await this.callNextPage(endpoint, response.data.next)
    }
    return this.objects.map((object) => {
      if (object.title) {
        object.name = object.title
      }
      object.id = this.idExtractor.extract(object.url as string)
      return object
    })
  }
}
