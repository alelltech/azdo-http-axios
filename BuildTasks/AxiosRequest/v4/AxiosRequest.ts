import {
  TaskResult,
  getInput,
  // getInput,
  setResult,
  setVariable,
} from 'azure-pipelines-task-lib/task';
import axios from 'axios';
import { isCommon } from '../../Common/v4/Common'
import { SourceType, getContent } from '../../Common/v4/SourceContent'
async function run() {
  try {
    console.log(isCommon);
    const outPrefix = getInput('variablePrefix', false) || 'RESPONSE_'
    const source: SourceType = getInput('source', true) as any
    const sourceType = getInput('sourceType', true) ?? ''

    const content = await getContent(sourceType as SourceType, source);

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

    const result = await axios.request({
      ...config,
      transformResponse: x => x
    });

    setVariable('body', result.data, false, true);
    setVariable('status', result.status.toString(), false, true);
    setVariable('statusText', result.statusText, false, true);
    setVariable('headers', JSON.stringify(result.headers), false, true);

    setVariable(`${outPrefix}BODY`, result.data);
    setVariable(`${outPrefix}STATUS`, result.status.toString());
    setVariable(`${outPrefix}STATUSTEXT`, result.statusText);
    setVariable(`${outPrefix}HEADERS`, JSON.stringify(result.headers));

  }
  catch (err: any) {
    setResult(TaskResult.Failed, err.message);
  }
}

run();
