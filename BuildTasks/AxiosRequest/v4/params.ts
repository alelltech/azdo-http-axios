import { AxiosRequestConfig } from "axios";
import { getInput, getVariable } from "azure-pipelines-task-lib";
import { _getVariableKey, _loadData, _warning } from "azure-pipelines-task-lib/internal";
import { readFileSync } from "fs";

export type SourceType = 'file' | 'text' | 'variable';
export interface Inputs {
  sourceType: SourceType
  source: string
}

export type QueryKind = 'var' | 'file' | 'echo';

export type InputsParsed = {
  config: AxiosRequestConfig
}

export const defaultsParams: Partial<Inputs> = {
  sourceType: 'file',
  source: 'var options = { };',
}

export const contentHandleMap: Record<SourceType, (source: string) => string> = {
  'file': (file) => readFileSync(file).toString('utf-8'),
  'variable': (varname) => getVariable(varname) ?? '',
  'text': (content) => content
}

export function parseInput(): InputsParsed {
  const source: SourceType = getInput('source', true) as any
  const sourceType = getInput('sourceType', true) ?? ''
  let sourceContent = source;
  const getContent = contentHandleMap[sourceType] ?? contentHandleMap.text

  if(getContent == contentHandleMap.text && sourceType != 'text') {
    _warning(`Source Type '${sourceType}' is not implemented, using default 'text'.`);
  }

  const content = getContent(sourceContent);

  const configRaw = /[var|let] [options|config] = (\{[^;]+\});/gm.exec(content);

  let config = {};

  if(configRaw && configRaw[1]){
    config = eval(`(() => {

      return ${configRaw[1]};

    })`)()
  }
  if(!config){
    throw new Error(`AxiosRequest options was not found on 'source' parameter.`)
  }

  const result: InputsParsed = { config }

  return result;
}

