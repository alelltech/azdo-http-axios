import axios, {AxiosStatic} from 'axios';
import { readFileSync } from 'node:fs';
import { join as joinPath } from 'node:path';

export const mockInsomnia = (() => {
  try {
    return readFileSync(joinPath(__dirname, 'mocks', 'L0.source.insomnia')).toString('utf-8');
  } catch (error) {
    console.error(error);
  }
})()

export const mockPostman = (() => {
  try {
    return readFileSync(joinPath(__dirname, 'mocks', 'L0.source.postman')).toString('utf-8');
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

export const mockAxiosRetryAways = {
  default: {
    request(config) {
      return Promise.resolve({
        config,
        data: '{"mockfield": "mock value"}',
        headers: {},
        status: 500,
        statusText: 'OK',
        request: {}
      } as any)
    }
  } as Pick<AxiosStatic, 'request'>
}

export const mockAxiosRetryCustomJq = {
  default: {
    ...axios,

    // interceptors: {
    //   request: {
    //     use: () => {}
    //   }
    // },

    request(config) {
      return Promise.resolve({
        config,
        data: JSON.stringify({data: [{ foo: {bar: 'bad_value'}}]}),
        headers: {},
        status: 200,
        statusText: 'OK',
        request: {}
      } as any)
    }
  } as Pick<AxiosStatic, 'request'>
}
