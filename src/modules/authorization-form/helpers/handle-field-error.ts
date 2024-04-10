// import { Error } from '../types/Error.ts'
// import { Inputs } from '../types/Inputs.ts'
// import { UseFormSetError } from 'react-hook-form'
//
// export const handleFieldError = (error: any, setError: UseFormSetError<Inputs>) => {
//   if (error.status !== 400) {
//     return alert(error)
//   }
//   const fieldError = error as Error
//   const { code, message } = fieldError.data
//   let fieldName: keyof Inputs = 'email'
//   if (code === 'passwErr') {
//     fieldName = 'password'
//   } else if (code === 'regKeyErr') {
//     fieldName = 'registrationKey'
//   }
//   return setError(fieldName, { type: 'manual', message })
// }