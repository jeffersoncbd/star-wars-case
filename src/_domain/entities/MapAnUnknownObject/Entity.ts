import { ValidationError } from '../_errors/Validation'
import { UnknownObject } from '../_protocols'

interface KnownObject extends UnknownObject {}

export class MapAnUnknownObject {
  map(unknownObject: UnknownObject, propertiesToMap: string[]) {
    const mappedObject: KnownObject = {}

    propertiesToMap.forEach((property) => {
      const value = unknownObject[property]
      if (value === undefined) {
        throw new ValidationError(`Propriedade "${property}" não encontrada`)
      }
      mappedObject[property] = value
    })

    return mappedObject
  }
}
