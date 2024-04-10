export type HeadersType = Readonly<Record<string, string>>

export const jsonRequestHeaders: HeadersType = {
  Accept: 'application/json',
  'Content-Type': 'application/json; charset=utf-8',
  'X-Requested-With': 'XMLHttpRequest',
}