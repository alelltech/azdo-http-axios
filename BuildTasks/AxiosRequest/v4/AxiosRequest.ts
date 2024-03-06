import {
  TaskResult,
  getInput,
  setResult,
  setVariable,
} from 'azure-pipelines-task-lib/task';
import axios from 'axios';
import { isCommon } from '../../Common/v4/Common'

async function run() {
  try {
    console.log(isCommon);
    const source = getInput('source', true);
    const options = /[var|let] [options|config] = (\{[^;]+\});/gm.exec(source);

    let requestOptions = {};

    if(options && options[1]){
      requestOptions = eval(`(() => {

        return ${options[1]};

      })`)()
    }
    if(!requestOptions){
      throw new Error(`AxiosRequest options was not found on 'source' parameter.`)
    }

    const result = await axios.request({
      ...requestOptions,
      transformResponse: x => x
    });

    setVariable('body', result.data, false, true);
    setVariable('status', result.status.toString(), false, true);
    setVariable('statusText', result.statusText, false, true);
    setVariable('headers', JSON.stringify(result.headers), false, true);

  }
  catch (err: any) {
    setResult(TaskResult.Failed, err.message);
  }
}

run();
