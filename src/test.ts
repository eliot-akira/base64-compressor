// https://nodejs.org/api/test.html
import test from 'node:test'
import assert from 'node:assert'
import { encode, decode, encodeBinary, decodeBinary } from './index.js'

const randomUnicodeString = (length: number): string =>
  Array.from({ length }, () =>
    String.fromCharCode(Math.floor(Math.random() * 65536)),
  ).join('')

test('encode/decode string', async () => {
  for (let i = 0; i < 100; i++) {
    const text = randomUnicodeString(100)
    assert.strictEqual(text, await decode(await encode(text)))
  }
})

test('encode/decode binary', async () => {
  for (let i = 0; i < 100; i++) {
    const buffer = new ArrayBuffer(100)
    const view = new DataView(buffer)
    for (let i = 0, len = buffer.byteLength - 1; i < len; i++) {
      view.setUint16(i, Math.floor(Math.random() * (1 << 29) - 1))
    }
    assert.deepEqual(buffer, await decodeBinary(await encodeBinary(buffer)))
  }
})
