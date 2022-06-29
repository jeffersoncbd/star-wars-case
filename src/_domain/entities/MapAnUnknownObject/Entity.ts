import { ValidationError } from '../_errors/Validation'
import { KnownObject, UnknownObject } from '../_protocols'

export class MapAnUnknownObject {
  map(unknownObject: UnknownObject, propertiesToMap: string[]): KnownObject {
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
