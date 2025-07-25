import { ErrorResponse } from './http/ErrorResponse'

export const ParseStringToArray = (
  inputString: string | null | undefined
): any[] | null => {
  if (typeof inputString !== 'string' || inputString.trim() === '') {
    console.error("Invalid input: string can't be empty")
    throw new ErrorResponse.BadRequest('Invalid input, string can, t be empty')
  }

  const trimmedInput = inputString.trim()

  const arrayRegex = /^\[.*\]$/s
  if (!arrayRegex.test(trimmedInput)) {
    console.error("Validation fail: incorrect format(example: '[...]')")
    throw new ErrorResponse.BadRequest(
      "Validation fail, incorrect format(example: '[...]')"
    )
  }

  try {
    const parsedData = JSON.parse(trimmedInput)
    if (Array.isArray(parsedData)) {
      return parsedData
    } else {
      console.error(
        "Invalid format: string must be an array (example: '[...]')"
      )
      throw new ErrorResponse.BadRequest(
        "Invalid format, string must be an array (example: '[...]')"
      )
    }
  } catch (initialError) {
    console.warn('String parsed error')

    try {
      const sanitizedString = trimmedInput
        .replace(/'/g, '"')
        .replace(
          /(\s*?{\s*?|\s*?,\s*?)(['"])?([a-zA-Z0-9_]+)(['"])?:/g,
          '$1"$3":'
        )

      const reparsedData = JSON.parse(sanitizedString)
      if (Array.isArray(reparsedData)) {
        console.log('String parsed successfully')
        return reparsedData
      } else {
        console.error("Validation fail, incorrect format(example: '[...]')")
        throw new ErrorResponse.BadRequest(
          "Validation fail, incorrect format(example: '[...]')"
        )
      }
    } catch (finalError) {
      console.error('String parsed fail', {
        initialError: (initialError as Error).message,
        finalError: (finalError as Error).message,
      })
      throw new ErrorResponse.BadRequest('Validation fail')
    }
  }
}
