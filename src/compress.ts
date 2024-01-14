// Browser and server
const { CompressionStream, DecompressionStream, Response } = globalThis

export type CompressionFormat = 'gzip' | 'deflate' | 'deflate-raw'

export const defaultCompressionFormat = 'gzip'

export async function compress(
  data: string | ArrayBuffer,
  compressionFormat: CompressionFormat = defaultCompressionFormat,
): Promise<ArrayBuffer> {
  const compressor = new CompressionStream(compressionFormat)
  const stream = new Response(data).body?.pipeThrough(compressor)
  return await new Response(stream).arrayBuffer()
}

async function decompressAsResponse(
  bytes: ArrayBuffer,
  compressionFormat: CompressionFormat = defaultCompressionFormat,
): Promise<Response> {
  const decompressor = new DecompressionStream(compressionFormat)
  const stream = new Response(bytes).body?.pipeThrough(decompressor)
  return new Response(stream)
}

export async function decompressAsArrayBuffer(
  bytes: ArrayBuffer,
  compressionFormat: CompressionFormat = defaultCompressionFormat,
): Promise<ArrayBuffer> {
  return (await decompressAsResponse(bytes, compressionFormat)).arrayBuffer()
}

export async function decompressAsString(
  bytes: ArrayBuffer,
  compressionFormat: CompressionFormat = defaultCompressionFormat,
): Promise<string> {
  return (await decompressAsResponse(bytes, compressionFormat)).text()
}

export { decompressAsArrayBuffer as decompress }
