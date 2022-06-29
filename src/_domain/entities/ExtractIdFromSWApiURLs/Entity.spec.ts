import { ExtractIdFromSWApiURLs } from './Entity'

describe(ExtractIdFromSWApiURLs.name, () => {
  test('deve retornar o ID da URL informada', () => {
    const extrator = new ExtractIdFromSWApiURLs()
    const id = extrator.extract('https://swapi.dev/api/people/1/')
    expect(id).toBe('1')
  })
})
