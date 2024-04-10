export const EMAIL_PATTERN = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i

export const PASSWORD_VALIDATION_PATTERNS = {
  upperLetter: new RegExp('^[A-Z]+$'),
  number: new RegExp('^[0-9]*$')
}