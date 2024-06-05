import { AxiosStatic } from 'axios';
import { _loadData } from 'azure-pipelines-task-lib/internal';
import { TaskMockRunner } from 'azure-pipelines-task-lib/mock-run';
import { join as joinPath } from 'node:path';
import { setIn } from '../../../Common/v5/ParamsUtil';
import { EXT } from '../../../Common/v5/RuntimeUtil';
import { mockAxios, mockInsomnia } from './L0.mock';

setIn({
  variablePrefix: 'INSOMNIA_RES_',
  source: mockInsomnia,
  sourceType: 'text'
})

_loadData();

let taskPath = joinPath(__dirname, '..', `Axios.${EXT}`);
let runner: TaskMockRunner = new TaskMockRunner(taskPath);

runner.registerMock('axios', mockAxios);

runner.run();
