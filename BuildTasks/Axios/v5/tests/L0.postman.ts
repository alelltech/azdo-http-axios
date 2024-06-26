import { AxiosStatic } from 'axios';
import { _loadData } from 'azure-pipelines-task-lib/internal';
import { TaskMockRunner } from 'azure-pipelines-task-lib/mock-run';
import { join as joinPath } from 'node:path';
import { setIn, EXT } from '@alell/azure-pipelines-task-commons';
import { mockAxios, mockPostman } from './L0.mock';

setIn({
  source: mockPostman,
  sourceType: 'text'
})

_loadData();

let taskPath = joinPath(__dirname, '..', `Axios.${EXT}`);
let runner: TaskMockRunner = new TaskMockRunner(taskPath);

runner.registerMock('axios', mockAxios);

runner.run();
