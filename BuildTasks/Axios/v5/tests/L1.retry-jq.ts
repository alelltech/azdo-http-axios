import { EXT, setIn } from '@alell/azure-pipelines-task-commons';
import { _loadData } from 'azure-pipelines-task-lib/internal';
import { TaskMockRunner } from 'azure-pipelines-task-lib/mock-run';
import { join as joinPath } from 'node:path';
import { mockAxiosRetryCustomJq, mockInsomnia } from './L0.mock';

setIn({
  variablePrefix: 'INSOMNIA_RES_',
  source: mockInsomnia,
  sourceType: 'text',
  pollingRetries: 3,
  pollingCondition: [
    `jq('.body.data..foo.bar')[0] === 'bad_value' `
  ].join('\n')
})

_loadData();

let taskPath = joinPath(__dirname, '..', `Axios.${EXT}`);
let runner: TaskMockRunner = new TaskMockRunner(taskPath);

runner.registerMock('axios', mockAxiosRetryCustomJq);

runner.run();
