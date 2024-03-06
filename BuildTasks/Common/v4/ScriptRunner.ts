import {
  writeFile
} from 'azure-pipelines-task-lib/task';
import { _debug, _warning } from "azure-pipelines-task-lib/internal";
import { JSONPath } from "jsonpath-plus";
import * as path from 'node:path';

export type QueryKind = 'var' | 'file' | 'echo';

export const execQueryMap: Record<'var' | 'file' | 'echo', (destination: string, value: string, query: string) => void> = {
  'var': (varname, value, query) => {
    console.debug(`var ${varname} = ${query}`);
    console.log(`echo ##vso[task.setvariable variable=${varname};]${value}`)
  },
  'file': (file, value, query) => {
    console.debug(`file ${file} = ${query}`);
    writeFile(path.resolve(file), value)
  },
  'echo': (_, value, query) => {
    console.debug(`echo ${query}`);
    console.log(JSON.stringify(value, undefined, 2))
  }
}

export const pipesMap: Record<string, (value: any) => any> = {
  'downcase': (value) => (value ?? '').toLowerCase(),
  'uppercase': (value) => (value ?? '').toUpperCase(),
}

export const runScript = (queries: { kind: QueryKind; dest: string; jpath: string; pipes: string[]; }[], parsedContent: any[]) =>{
  for (const { kind, dest, jpath, pipes } of queries) {
    const execQuery = execQueryMap[kind] ?? execQueryMap.echo;
    let p = jpath;
    if (p.startsWith('.')) p = `$${p}`;
    if (!p.startsWith('$.')) p = `$.${p}`;

    p = `$..${p.replace(/^\$\.+/g, '')}`;

    const result = JSONPath({ flatten: true, autostart: true, json: parsedContent, path: p });
    if (!result || result.length == 0) {
      _warning(`JSONPath '${jpath}' has not results!`);
      continue;
    }
    let value = result[0];
    for (const pipe of pipes) {
      const fnPipe = pipesMap[pipe];
      if (!fnPipe) continue;
      value = fnPipe(value);
    }
    execQuery(dest, value, p);
  }
}

