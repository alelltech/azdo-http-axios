import { AxiosStatic } from 'axios';
import { _loadData } from 'azure-pipelines-task-lib/internal';
import { TaskMockRunner } from 'azure-pipelines-task-lib/mock-run';
import { join as joinPath } from 'node:path';
import { setIn } from '../../../Common/v4/ParamsUtil';
import { EXT } from '../../../Common/v4/RuntimeUtil';
import { mockAxios, mockInsomnia } from './L0.mock';

setIn({
  source: mockInsomnia,
  sourceType: 'text'
})

_loadData();

let taskPath = joinPath(__dirname, '..', `AxiosRequest.${EXT}`);
let runner: TaskMockRunner = new TaskMockRunner(taskPath);

runner.registerMock('axios', mockAxios);

runner.run();
