import { ExtractResourceFromSWApiURLs } from './Entity'

describe(ExtractResourceFromSWApiURLs.name, () => {
  test('deve retornar o recurso da URL informada', () => {
    const extrator = new ExtractResourceFromSWApiURLs()
    const id = extrator.extract('https://swapi.dev/api/people/1/')
    expect(id).toBe('people')
  })
})
