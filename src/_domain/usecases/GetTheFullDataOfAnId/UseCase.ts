import { StarWarsApiService } from '../../entities/_services'
import { UseCaseToGetSubdataFromAnUrl } from '../GetSubDataFromAnUrl'

export class UseCaseToGetTheFullDataOfAnId {
  private resourcesList = [
    'people',
    'planets',
    'films',
    'species',
    'vehicles',
    'starships',
    'residents',
    'characters',
    'pilots'
  ]

  constructor(
    private swApi: StarWarsApiService,
    private subData: UseCaseToGetSubdataFromAnUrl
  ) {}

  private async getSubDataFromAnUrlList(urlList: string[]) {
    const dataList = []
    for (const url of urlList) {
      const data = await this.subData.getByUrl(url)
      dataList.push(data)
    }
    return dataList
  }

  async get(resource: string, id: string) {
    const response = await this.swApi.get(`/${resource}/${id}`)
    const body: any = { ...response }
    if (body.homeworld) {
      body.homeworld = await this.subData.getByUrl(body.homeworld)
    }

    for (const resource of this.resourcesList) {
      const urlList = body[resource]
      if (Array.isArray(urlList)) {
        body[resource] = await this.getSubDataFromAnUrlList(urlList)
      }
    }

    delete body.created
    delete body.edited
    delete body.url

    return body
  }
}
