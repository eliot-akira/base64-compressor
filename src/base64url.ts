/**
 * Base64 URL: Base64 encoding with URL-safe character set
 *
 * - Replace `+` with `-`
 * - Replace `/` with `_`
 * - Remove `=` padding
 */

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'

export function encodeBase64Url(arraybuffer: ArrayBuffer): string {
  const bytes = new Uint8Array(arraybuffer)

  let i
  const len = bytes.length
  let base64 = ''

  for (i = 0; i < len; i += 3) {
    base64 += chars[bytes[i] >> 2]
    base64 += chars[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)]
    base64 += chars[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)]
    base64 += chars[bytes[i + 2] & 63]
  }

  if (len % 3 === 2) {
    base64 = base64.substring(0, base64.length - 1)
  } else if (len % 3 === 1) {
    base64 = base64.substring(0, base64.length - 2)
  }

  return base64
}

let lookup: Uint8Array | undefined

export function decodeBase64Url(base64: string): ArrayBuffer {
  // Create lookup table to find the index
  if (!lookup) {
    lookup = new Uint8Array(256)
    for (let i = 0; i < chars.length; i++) {
      lookup[chars.charCodeAt(i)] = i
    }
  }

  const len: number = base64.length
  let bufferLength: number = (len * 3) / 4

  if (base64[base64.length - 1] === '=') {
    bufferLength--
    if (base64[base64.length - 2] === '=') {
      bufferLength--
    }
  }

  const arraybuffer = new ArrayBuffer(bufferLength)
  const bytes = new Uint8Array(arraybuffer)

  let encoded1: number
  let encoded2: number
  let encoded3: number
  let encoded4: number
  let p = 0

  for (let i = 0; i < len; i += 4) {
    encoded1 = lookup[base64.charCodeAt(i)]
    encoded2 = lookup[base64.charCodeAt(i + 1)]
    encoded3 = lookup[base64.charCodeAt(i + 2)]
    encoded4 = lookup[base64.charCodeAt(i + 3)]

    bytes[p++] = (encoded1 << 2) | (encoded2 >> 4)
    bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2)
    bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63)
  }

  return arraybuffer
}
