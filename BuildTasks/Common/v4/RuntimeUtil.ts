/**
 * Enable to debug typescript with ts-node alternating between "js" and "ts" extensions
 *
 */


import * as path from 'path';

export const { EXT } = {
  ...{EXT: 'js'},
  ...process.env,
} ;
export const getExt = () => {
  return process.env.EXT ?? 'js';
}
export const getRuntimePath = (old: string) => {
  if( getExt() === 'ts'){
    return path.resolve(process.cwd(), 'node_modules/.bin/ts-node');
  }
  return old;
}
