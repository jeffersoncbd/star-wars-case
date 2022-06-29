import { ValidationError } from '../_errors/Validation'
import { MapAnUnknownObject } from './Entity'

const anyObject = {
  id: 1,
  name: 'any name',
  lastName: 'last name',
  age: 999,
  anyField: 'any',
  anotherField: 'another'
}

describe(MapAnUnknownObject.name, () => {
  test('deve mapear os dados de acordo com a lista de propriedades', () => {
    const sut = new MapAnUnknownObject()

    const data1 = sut.map(anyObject, ['age'])
    expect(data1).toEqual({ age: 999 })

    const data2 = sut.map(anyObject, ['id', 'name', 'lastName'])
    expect(data2).toEqual({ id: 1, name: 'any name', lastName: 'last name' })

    const data3 = sut.map(anyObject, ['name', 'anyField'])
    expect(data3).toEqual({ name: 'any name', anyField: 'any' })
  })

  test('deve lançar erro de validação caso não exista a propriedade informada no objeto', () => {
    const sut = new MapAnUnknownObject()
    const callSut = () => sut.map(anyObject, ['non-existentProperty'])
    expect(callSut).toThrow(ValidationError)
    expect(callSut).toThrowError(
      'Propriedade "non-existentProperty" não encontrada'
    )
  })
})
