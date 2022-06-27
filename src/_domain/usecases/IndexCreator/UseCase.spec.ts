import { ValidationError } from '../../entities/_errors/Validation'
import {
  IndexCreationService,
  IndexExistenceCheckService
} from '../../entities/_services'
import { IndiceCreatorUsecase } from './UseCase'

class IndexExistenceCheckStub implements IndexExistenceCheckService {
  async check(): Promise<boolean> {
    return false
  }
}
class IndexCreationStub implements IndexCreationService {
  async create(): Promise<void> {
    return undefined
  }
}

function makeSut() {
  const checkerStub = new IndexExistenceCheckStub()
  const creatorStub = new IndexCreationStub()
  const sut = new IndiceCreatorUsecase(checkerStub, creatorStub)
  return { sut, checkerStub, creatorStub }
}
const fakeData = { context: 'any', index: 'anyIndex' }

describe(IndiceCreatorUsecase.name, () => {
  test('deve validar o indice recebido', async () => {
    const { sut, checkerStub } = makeSut()
    const checkSpy = jest.spyOn(checkerStub, 'check')
    await sut.create(fakeData)
    expect(checkSpy).toHaveBeenCalledWith('any-anyIndex')
  })

  test('deve lançar erro de validação caso o indice exista', async () => {
    const { sut, checkerStub } = makeSut()
    jest.spyOn(checkerStub, 'check').mockImplementation(async () => true)
    await expect(sut.create(fakeData)).rejects.toThrow(ValidationError)
    await expect(sut.create(fakeData)).rejects.toThrow(
      'O indice anyIndex já existe no contexto any'
    )
  })

  test('deve criar o o indice caso não exista no contexto', async () => {
    const { sut, creatorStub } = makeSut()
    const createSpy = jest.spyOn(creatorStub, 'create')
    await sut.create(fakeData)
    expect(createSpy).toHaveBeenCalledWith('any-anyIndex')
  })
})