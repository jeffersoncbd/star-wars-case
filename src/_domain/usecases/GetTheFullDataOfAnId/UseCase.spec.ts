import { makeGetSubdataFromAnUrlStub } from '../GetSubDataFromAnUrl/stubs'
import { StarWarsApiStub } from '../IndexAnApiEndpoint/UseCase.spec'
import { UseCaseForSuggestions } from '../Suggestions'
import { UseCaseToGetTheFullDataOfAnId } from './UseCase'

function makeSut() {
  const swApiStub = new StarWarsApiStub()
  const subDataStub = makeGetSubdataFromAnUrlStub()
  const suggestions = new UseCaseForSuggestions(swApiStub, subDataStub)
  jest.spyOn(suggestions, 'sugest').mockImplementation(async () => [])
  const sut = new UseCaseToGetTheFullDataOfAnId(
    swApiStub,
    subDataStub,
    suggestions
  )
  return { sut, swApiStub, subDataStub }
}
const fakeResource = 'anyResource'
const fakeId = '999'

describe(UseCaseToGetTheFullDataOfAnId.name, () => {
  test('deve buscar na API os dados completos do recurso com ID informado', async () => {
    const { sut, swApiStub } = makeSut()
    const getSpy = jest.spyOn(swApiStub, 'get')
    await sut.get(fakeResource, fakeId)
    expect(getSpy).toHaveBeenCalledWith(`/${fakeResource}/${fakeId}`)
  })
})
