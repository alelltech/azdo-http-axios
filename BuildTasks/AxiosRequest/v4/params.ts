import { BuildVariables, variablesMap } from "../../Common/v4/BuiltInVariables"
import { getInput, getVariable } from "azure-pipelines-task-lib";
import { _getVariableKey, _loadData, _warning } from "azure-pipelines-task-lib/internal";
import { readFileSync } from "fs";
import { loadAll } from "js-yaml";

export type SourceType = 'file' | 'text' | 'variable';
export interface Inputs {
  sourceType: SourceType
  source: string // catalog-info.y*ml
  queries: string // 'VAR_NAME=$..field\nVAR_SEC=$..field2'
}

export type QueryKind = 'var' | 'file' | 'echo';

export type InputsParsed = {
  sourceType: SourceType
  sourceContent: string // catalog-info.y*ml
  parsedContent: Array<any>
  queries: Array<{ kind: QueryKind, dest: string, jpath: string, pipes: string[] }>
}

export const defaultsParams: Partial<Inputs> = {
  sourceType: 'file',
  source: 'catalog-info.y*ml',
  queries: 'VAR_NAME=$[0].field1'
  // extractTemplate: string // '{{basename}}[documentIndex].{{parent}}.{{name}}'
  // customExtractions: string
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

  const parsedContent = JSON.parse(getContent(sourceContent));
  const result: InputsParsed = {queries: [], sourceContent, parsedContent, sourceType: sourceType as any }

  const queries = getInput('queries', true) ?? '';

  const regex = /(((var|file) {1,}([^=]+)=([^\|\n]+))|((echo) {1,}([^\|\n]+)))( {0,}\| {0,}([^\n]+))?/gm

  let m;

  while ((m = regex.exec(queries)) !== null) {
    const kind = (m[3] ?? m[7]).trim()
    const dest: string = (m[4] ?? '').trim()
    const jpath: string = (m[5] ?? m[8]).trim()
    const pipes: string = (m[9] ?? m[10] ?? '').trim()

    result.queries.push({
      kind,
      dest,
      pipes: pipes.split('|').map((p) => p.trim()),
      jpath
    })
  }

  return result;
}

