// https://nodejs.org/api/test.html
import test from 'node:test'
import assert from 'node:assert'
import { encode, decode, encodeBinary, decodeBinary } from './index.js'

const randomUnicodeString = (length: number): string =>
  Array.from({ length }, () =>
    String.fromCharCode(Math.floor(Math.random() * 65536)),
  ).join('')

test('Encode and decode string', async () => {
  for (let i = 0; i < 1000; i++) {
    const length = i + 1 // Math.floor(Math.random() * 100)
    const text = randomUnicodeString(100)
    const result = await decode(await encode(text))
    assert.strictEqual(text, result)
    assert.strictEqual(text.length, result.length)
  }
})

test('Encode and decode binary', async () => {
  for (let i = 0; i < 1000; i++) {
    const length = i + 1
    const buffer = new ArrayBuffer(length)
    const view = new DataView(buffer)
    for (let i = 0, len = buffer.byteLength - 1; i < len; i++) {
      view.setUint16(i, Math.floor(Math.random() * (1 << 29) - 1))
    }
    const result = await decodeBinary(await encodeBinary(buffer))
    assert.deepEqual(buffer, result)
    assert.strictEqual(buffer.byteLength, result.byteLength)
  }
})
