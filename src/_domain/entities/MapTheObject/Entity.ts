import { ValidationError } from '../_errors/Validation'
import { UnknownObject } from '../_protocols'

export class MapTheObject {
  map(object: UnknownObject, properties: string[]) {
    const mappedData: UnknownObject = {}
    properties.forEach((property) => {
      const value = object[property]
      if (value === undefined) {
        throw new ValidationError(`A propriedade "${property}" não existe`)
      }
      mappedData[property] = object[property]
    })
    return mappedData
  }
}
