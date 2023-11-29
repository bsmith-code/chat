/**
 * @note The block below contains polyfills for Node.js globals
 * required for Jest to function when running JSDOM tests.
 * These HAVE to be require's and HAVE to be in this exact
 * order, since "undici" depends on the "TextEncoder" global API.
 *
 * Consider migrating to a more modern test runner if
 * you don't want to deal with this.
 */

const utils = require('node:util')

Object.defineProperties(globalThis, {
  TextDecoder: { value: utils.TextDecoder },
  TextEncoder: { value: utils.TextEncoder },
})

const buffer = require('node:buffer')
const undici = require('undici')

Object.defineProperties(globalThis, {
  fetch: { value: undici.fetch, writable: true },
  Blob: { value: buffer.Blob },
  Headers: { value: undici.Headers },
  FormData: { value: undici.FormData },
  Request: { value: undici.Request },
  Response: { value: undici.Response },
})