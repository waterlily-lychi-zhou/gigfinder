import '@testing-library/jest-dom';
import { TextDecoder, TextEncoder } from 'util';

global.fetch = jest.fn();
global.TextDecoder = TextDecoder;
global.TextEncoder = TextEncoder;