export type HeadersType = Readonly<Record<string, string>>

export const jsonRequestHeaders: HeadersType = {
  'Accept': 'application/json',
  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  'X-Requested-With': 'XMLHttpRequest',
  "Access-Control-Allow-Origin": "*"
}