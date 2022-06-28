import { swApi } from '../services/SWapi'
import { UnknownObject } from '../_domain/entities/_protocols'
import { ApiService } from '../_domain/entities/_services'

export class ApiAdapter implements ApiService {
  private objects: UnknownObject[] = []

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
      response.data.id = response.data.url
      return response.data
    }
    this.objects = this.objects.concat(response.data.results)
    if (response.data.next) {
      await this.callNextPage(endpoint, response.data.next)
    }
    return this.objects.map((object) => {
      object.id = object.url
      return object
    })
  }
}
