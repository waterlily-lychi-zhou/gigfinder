import fetchMock from 'jest-fetch-mock';
import { TextDecoder as NodeTextDecoder, TextEncoder as NodeTextEncoder } from 'util';

fetchMock.enableMocks();

if (!global.TextDecoder) {
    global.TextDecoder = NodeTextDecoder as any;
}
  
if (!global.TextEncoder) {
    global.TextEncoder = NodeTextEncoder as any;
}

if (global.Buffer) {
    global.Buffer = require('buffer').Buffer;
}
