import { ErrorRequestHandler } from 'express'

const errorTypes = ['ValidationError'] as const
type ErrorTypes = typeof errorTypes[number]
// eslint-disable-next-line no-unused-vars
type Errors = { [key in ErrorTypes]: number }

const expectedErrors: Errors = {
  ValidationError: 400
}

export const errorsHandler: ErrorRequestHandler = (
  error,
  _request,
  response,
  _next
) => {
  if (errorTypes.includes(error.name)) {
    return response
      .status(expectedErrors[error.name as ErrorTypes])
      .json({ feedback: error.message })
  }

  console.error(new Date(), `\n${error.stack}\n`)
  return response.status(500).json({ feedback: 'Ocorreu um erro inesperado' })
}
