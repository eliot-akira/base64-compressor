import { encodeBase64Url, decodeBase64Url } from './base64url.js'
import {
  compress,
  decompressAsString,
  decompressAsArrayBuffer,
  CompressionFormat,
} from './compress.js'

export type { CompressionFormat }

export async function encode(value: any, compressionFormat?: CompressionFormat): Promise<string> {
  return encodeBase64Url(await compress(JSON.stringify(value), compressionFormat))
}

export async function decode(text: string, compressionFormat?: CompressionFormat): Promise<any> {
  return JSON.parse(await decompressAsString(decodeBase64Url(text), compressionFormat))
}

export async function encodeBinary(value: ArrayBuffer, compressionFormat?: CompressionFormat): Promise<string> {
  return encodeBase64Url(await compress(value, compressionFormat))
}

export async function decodeBinary(text: string, compressionFormat?: CompressionFormat): Promise<ArrayBuffer> {
  return await decompressAsArrayBuffer(decodeBase64Url(text), compressionFormat)
}
