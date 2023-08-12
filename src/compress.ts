// Browser and server
const { CompressionStream, DecompressionStream, Response } = globalThis

type CompressionFormat = 'gzip' | 'deflate' | 'deflate-raw'

export async function compress(
  data: string | ArrayBuffer,
  compressionFormat: CompressionFormat = 'gzip',
): Promise<ArrayBuffer> {
  const compressor = new CompressionStream(compressionFormat)
  const stream = new Response(data).body?.pipeThrough(compressor)
  return await new Response(stream).arrayBuffer()
}

async function decompressAsResponse(
  bytes: ArrayBuffer,
  compressionFormat: CompressionFormat = 'gzip',
): Promise<Response> {
  const decompressor = new DecompressionStream(compressionFormat)
  const stream = new Response(bytes).body?.pipeThrough(decompressor)
  return await new Response(stream)
}

export async function decompressAsArrayBuffer(
  bytes: ArrayBuffer,
  compressionFormat: CompressionFormat = 'gzip',
): Promise<ArrayBuffer> {
  return (await decompressAsResponse(bytes, compressionFormat)).arrayBuffer()
}

export async function decompressAsString(
  bytes: ArrayBuffer,
  compressionFormat: CompressionFormat = 'gzip',
): Promise<string> {
  return (await decompressAsResponse(bytes, compressionFormat)).text()
}

export { decompressAsArrayBuffer as decompress }
