import { getVariable } from "azure-pipelines-task-lib";
import { _warning } from "azure-pipelines-task-lib/internal";
import { readFileSync } from "fs";

export type SourceType = 'file' | 'text' | 'variable';
export const contentHandleMap: Record<SourceType, (source: string) => Promise<string>> = {
  'file': (file) => Promise.resolve(readFileSync(file).toString('utf-8')),
  'variable': (varname) => Promise.resolve(getVariable(varname) ?? ''),
  'text': (content) => Promise.resolve(content)
}

export const getContent = (sourceType: SourceType, source: string) => {
  const handle = contentHandleMap[sourceType] ?? contentHandleMap.text
  if(getContent == contentHandleMap.text && sourceType != 'text') {
    _warning(`Source Type '${sourceType}' is not implemented, using default 'text'.`);
  }
  return handle(source);
}
