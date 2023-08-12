import { encodeBase64Url, decodeBase64Url } from './base64url.js'
import {
  compress,
  decompressAsString,
  decompressAsArrayBuffer,
} from './compress.js'

export async function encode(value: any): Promise<string> {
  return encodeBase64Url(await compress(JSON.stringify(value)))
}

export async function decode(text: string): Promise<any> {
  return JSON.parse(await decompressAsString(decodeBase64Url(text)))
}

export async function encodeBinary(value: ArrayBuffer): Promise<string> {
  return encodeBase64Url(await compress(value))
}

export async function decodeBinary(text: string): Promise<ArrayBuffer> {
  return await decompressAsArrayBuffer(decodeBase64Url(text))
}
