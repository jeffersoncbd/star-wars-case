import { IndexedData, StarWarsApiService } from '../../entities/_services'
import { UseCaseToGetSubdataFromAnUrl } from '../GetSubDataFromAnUrl'
import { UseCaseForSuggestions } from '../Suggestions/UseCase'

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
    private subData: UseCaseToGetSubdataFromAnUrl,
    private suggestions: UseCaseForSuggestions
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

    const basesForSuggestions = []

    if (body.homeworld) {
      const homeworld = await this.subData.getByUrl(body.homeworld)
      body.homeworld = homeworld
      basesForSuggestions.push(homeworld)
    }

    for (const resource of this.resourcesList) {
      const urlList = body[resource]
      if (Array.isArray(urlList)) {
        const resourcesList = await this.getSubDataFromAnUrlList(urlList)
        body[resource] = resourcesList
        if (resourcesList.length > 0) {
          basesForSuggestions.push(resourcesList)
        }
      }
    }

    body.suggestions = await this.suggestions.sugest(
      body.id,
      resource,
      basesForSuggestions as [IndexedData | IndexedData[]]
    )

    delete body.created
    delete body.edited
    delete body.url

    return body
  }
}
