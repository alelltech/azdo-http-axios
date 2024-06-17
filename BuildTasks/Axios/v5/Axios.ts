import { SourceType, getContent } from '@alell/azure-pipelines-task-commons';
import { fixQuery } from '@alell/jsonpath-plus-q';
import axios, { AxiosResponse } from 'axios';
import { _debug } from 'azure-pipelines-task-lib/internal';
import {
  TaskResult,
  getInput,
  // getInput,
  setResult,
  setVariable,
} from 'azure-pipelines-task-lib/task';
import * as yaml from 'js-yaml';
import { JSONPath } from 'jsonpath-plus';
import * as safeEval from 'safe-eval';
import { xml2js } from 'xml-js';
import { isCommon as _isCommon } from '../../Common/v5/Common'

function safePath(path: string ) {

}

function sleep(millis: any) {
    return new Promise<void>(function (resolve, _reject) {
        setTimeout(function () { resolve(); }, millis);
    });
}

function validateResponse(res: AxiosResponse, pollingUntil: string) {

  const {
    data: dataRaw,
    headers,
    status,
    statusText,
    request,
    config
  } = res;

  const values = {
    dataRaw,
    bodyRaw: dataRaw,
    headers,
    status,
    statusText,
    request,
    config,
  };

  const fn = {
    jq: (path: string, json?: string) => {
      const bodyParsed = JSON.parse(json || dataRaw);

      const results = JSONPath({
        flatten: true,
        autostart: true,
        json: {...values, body: bodyParsed, data: bodyParsed},
        path: fixQuery(path)
      });
      return results;
    },
    yq: (path: string, yml?: string) => {
      const bodyParsed = yaml.loadAll(yml || dataRaw);
      return JSONPath({
        flatten: true,
        autostart: true,
        json: {...values, body: bodyParsed, data: bodyParsed},
        path: fixQuery(path)
      })
    },
    xq: (path: string, xml?: string) => {
      const bodyParsed = xml2js(xml || dataRaw, { compact: true });
      return JSONPath({
        flatten: true,
        autostart: true,
        json: {...values, body: bodyParsed, data: bodyParsed},
        path: fixQuery(path)
      })
    },
  }
  const result = safeEval(pollingUntil, {
    ...values,
    ...fn
  });
  return result;
}

async function run() {
  try {

    const outPrefix = getInput('variablePrefix', false) || 'RESPONSE_';
    const source: SourceType = getInput('source', true) as any
    const sourceType = getInput('sourceType', true) ?? '';
    const content = await getContent(sourceType as SourceType, source);

    const pollingRetries = Number(getInput('pollingRetries', false) ?? '3');
    const pollingUntil = (getInput('pollingUntil', false) as string || '');
    const pollingDelay = Number(getInput('pollingDelay', false) as string || '100');

    const configRaw = /[var|let]+ [options|config]+ = (\{[^;]+\});/gm.exec(content);
    let config = {};
    if(configRaw && configRaw[1]){
      _debug(configRaw[1]);
      config = safeEval(`(() => {
        return ${configRaw[1]};
      })`)()
    }
    if(!config){
      throw new Error(`Axios options was not found on 'source' parameter.`)
    }

    console.log(config);
    let lastError = null;
    const fetch = async () => {
      const result = await axios.request({
        ...config,
        transformResponse: x => x
      });

      if(pollingUntil && !validateResponse(result, pollingUntil)) return false;

      setVariable('body', result.data, false, true);
      setVariable('status', result.status.toString(), false, true);
      setVariable('statusText', result.statusText, false, true);
      setVariable('headers', JSON.stringify(result.headers), false, true);

      setVariable(`${outPrefix}BODY`, result.data);
      setVariable(`${outPrefix}STATUS`, result.status.toString());
      setVariable(`${outPrefix}STATUSTEXT`, result.statusText);
      setVariable(`${outPrefix}HEADERS`, JSON.stringify(result.headers));

      return true;
    }

    if(pollingRetries && pollingUntil){
      for (let r = 0; r < pollingRetries; r++) {
        try {
          await sleep(pollingDelay);
          if(await fetch()) {
            lastError = null;
            break;
          }
        } catch (error) {
          lastError = {...error};
        }
      }
      if(lastError) throw lastError;
    } else {
      await fetch();
    }


  } catch (err: any) {
    setResult(TaskResult.Failed, err.message);
    // _debug(err);
    console.debug(err?.response?.data);
  }
}

run();
