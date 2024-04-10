import { PASSWORD_VALIDATION_PATTERNS } from '../consts/consts.ts'

export const validatePassword = (value: string) => {
  if (value.length > 36) {
    return 'Пароль может содержать не более 36 символов'
  }

  if (value.length < 8) {
    return 'Пароль должен содержать не менее 8 символов'
  }

  let hasNumber = false
  let hasUpperLetter = false
  for (const element of value) {
    if (hasNumber && hasUpperLetter) {
      return true
    }

    if (PASSWORD_VALIDATION_PATTERNS.upperLetter.test(element)) {
      hasUpperLetter = true
    }

    if (PASSWORD_VALIDATION_PATTERNS.number.test(element)) {
      hasNumber = true
    }
  }

  if (!hasUpperLetter) {
    return 'Пароль должен содержать заглавную букву'
  }

  if (!hasNumber) {
    return 'Пароль должен содержать цифру'
  }
}