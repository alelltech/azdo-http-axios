import { AxiosStatic } from 'axios';
import { readFileSync } from 'node:fs';
import { join as joinPath } from 'node:path';

export const mockInsomnia = (() => {
  try {
    return readFileSync(joinPath(__dirname, 'mocks', 'L0.source.insomnia.js')).toString('utf-8');
  } catch (error) {
    console.error(error);
  }
})()

export const mockPostman = (() => {
  try {
    return readFileSync(joinPath(__dirname, 'mocks', 'L0.source.postman.js')).toString('utf-8');
  } catch (error) {
    console.error(error);
  }
})()

export const mockAxios = {
  default: {
    request(config) {
      return Promise.resolve({
        config,
        data: '{"mockfield": "mock value"}',
        headers: {},
        status: 200,
        statusText: 'OK',
        request: {}
      } as any)
    }
  } as Pick<AxiosStatic, 'request'>
}
