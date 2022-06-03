/**
 * Splits `str` into chunks with a maximum length of `len`.
 */
export function chunkString(str: string, len: number): string[] {
  return str.match(new RegExp('.{1,' + len + '}', 'g')) || [];
}
