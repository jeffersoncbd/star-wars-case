import { IndexedData, StarWarsApiService } from '../../entities/_services'
import { UseCaseToGetSubdataFromAnUrl } from '../GetSubDataFromAnUrl'

export class UseCaseForSuggestions {
  private specificKeysForPeople: { [key: string]: string } = {
    planets: 'residents',
    films: 'characters',
    vehicles: 'pilots',
    starships: 'pilots',
    species: 'people'
  }

  constructor(
    private swApi: StarWarsApiService,
    private indexData: UseCaseToGetSubdataFromAnUrl
  ) {}

  private getRandomIndex(max: number) {
    return Math.floor(Math.random() * max)
  }

  async sugest(
    mainResourceId: string,
    mainResourceType: string,
    basesForSuggestions: [IndexedData | IndexedData[]]
  ) {
    const suggestions: any[] = []
    for (let base of basesForSuggestions) {
      if (Array.isArray(base)) {
        // escolhe randomicamente um dos elementos da lista como base
        base = base[this.getRandomIndex(base.length)]
      }
      // esses casos não fazem sentido sugestão
      if (
        (mainResourceType === 'planets' && base.type === 'people') ||
        (mainResourceType === 'species' && base.type === 'planets')
      ) {
        continue
      }
      // busca os dados completos da base de sugestão
      const resource: any = await this.swApi.get(`/${base.type}/${base.id}`)
      // define a lista de possíveis sugestões com o tipo do recurso principal
      let possibleSuggestions = resource[mainResourceType]
      // como o tipo "people" possui chaves especificas como "pilotos" ou "personagens"
      // faz essa verificação e define a lista de possíveis sugestões de acordo com essas chaves
      if (mainResourceType === 'people') {
        possibleSuggestions =
          resource[this.specificKeysForPeople[base.type as string]]
      }

      // remove o próprio ID como sugestão (para que não apareça o proprio recurso como sugerido)
      try {
        possibleSuggestions = possibleSuggestions.filter(
          (url: any) => !url.includes(`/${mainResourceId}/`)
        )
      } catch (error) {
        console.log('\n\n', resource, base, error, '\n\n')
      }

      // algumas sugestões acabam ficando sem itens após as diversas limpezas
      if (possibleSuggestions.length > 0) {
        const suggestionUrl =
          possibleSuggestions[this.getRandomIndex(possibleSuggestions.length)]
        // recupera os dados pela URL
        const newSuggestion = await this.indexData.getByUrl(suggestionUrl)
        // verifica se a sugestão já existe na lista já definida
        if (
          !suggestions.find((suggestion) => suggestion.id === newSuggestion.id)
        ) {
          const { id, name } = newSuggestion
          suggestions.push({ id, name, relationship: base })
        }
      }
    }
    return suggestions
  }
}
