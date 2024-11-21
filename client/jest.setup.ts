import '@testing-library/jest-dom';
import fetchMock from 'jest-fetch-mock';
import { TextDecoder as NodeTextDecoder, TextEncoder as NodeTextEncoder } from 'util';

fetchMock.enableMocks();

if (typeof global.TextDecoder === 'undefined') {
    global.TextDecoder = NodeTextDecoder as any;
    console.log('jest.setup.js is working')
}
  
if (typeof global.TextEncoder === 'undefined') {
    global.TextEncoder = NodeTextEncoder as any;
}

if (typeof global.Buffer === 'undefined') {
    global.Buffer = require('buffer').Buffer;
}