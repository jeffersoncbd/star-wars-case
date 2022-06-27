import { ValidationError } from '../../entities/_errors/Validation'
import {
  IndexCreationService,
  IndexExistenceCheckService
} from '../../entities/_services'

export class IndiceCreatorUsecase {
  constructor(
    private checker: IndexExistenceCheckService,
    private creator: IndexCreationService
  ) {}

  async create(index: string) {
    const indexExists = await this.checker.check(index)
    if (indexExists) {
      throw new ValidationError(`O indice "${index}" já existe.`)
    }
    await this.creator.create(index)
  }
}
