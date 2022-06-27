import { ValidationError } from '../../entities/_errors/Validation'
import {
  IndexCreationService,
  IndexExistenceCheckService
} from '../../entities/_services'

interface IndexCreationData {
  index: string
  context: string
}

export class IndiceCreatorUsecase {
  constructor(
    private checker: IndexExistenceCheckService,
    private creator: IndexCreationService
  ) {}

  async create(data: IndexCreationData) {
    const { context, index } = data
    const indexExists = await this.checker.check(`${context}-${index}`)
    if (indexExists) {
      throw new ValidationError(
        `O indice ${index} já existe no contexto ${context}.`
      )
    }
    await this.creator.create(`${context}-${index}`)
  }
}
