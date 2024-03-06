import * as assert from "assert";
import { join as joinPath } from "node:path";
import { getInput } from "azure-pipelines-task-lib";
import { _loadData } from "azure-pipelines-task-lib/internal";
import { getParam, parseInput, setIn, setVar } from '../ParamsUtil';
import { getRuntimePath } from '../RuntimeUtil';
import { mockJsonContent, mockJsonQueries } from "./L0.json.mock";

const initial_env = Object.keys(process.env).reduce((p, k) => {
  p[k] = process.env[k]
  return p;
}, {})

const resetEnv = () => {
  for (const k of Object.keys(process.env)) {
    delete process.env[k];
  }

  for (const k of Object.keys(initial_env)) {
    process.env[k] = initial_env[k];
  }

  _loadData();
};
describe(`Build Suite`, () => {
  describe("runtime-utils", ()=>{
    after(() =>{
      delete process.env.EXT
    })

    it('getRuntimePath', async () => {
      process.env.EXT = 'ts';
      const runtime = getRuntimePath('');
      assert(runtime, 'runtime must be defined');
      assert(runtime.endsWith('node_modules/.bin/ts-node'), 'runtime must be "ts-node".')
    })
  })

  describe("ParamsUtil getParam", ()=>{
    afterEach(() =>{
      for (const k of Object.keys(process.env)) {
        delete process.env[k];
      }

      for (const k of Object.keys(initial_env)) {
        process.env[k] = initial_env[k]
      }

      _loadData()
    })


    it('Input values has priority', async () => {

      setIn({'fromInput': 'input value'})
      setVar({'fromVariable': 'variable value'})
      _loadData()

      const value = getParam({inName: 'fromInput', varName: 'fromVariable'}, getInput) as string;
      assert(value, 'value must be defined');
      assert(value.startsWith('input '), 'value must starts with "input ".')
    })

    it('Get value from variables if not have input', async () => {

      setVar({'fromVariable': 'variable value'})
      _loadData()

      const value = getParam({inName: 'fromInput', varName: 'fromVariable'}, getInput) as string;
      assert(value, 'value must be defined');
      assert(value.startsWith('variable '), 'value must starts with "variable ".')
    })

    it('Get value from defaut value if not have input and variable', async () => {

      // setIn({'fromInput': 'input value'})
      // setVar({'fromVariable': 'variable value'})
      // _loadData()

      const value = getParam({
        inName: 'fromInput',
        varName: 'fromVariable',
        required: undefined,
        defaultValue: 'default value'
      },
      getInput) as string;
      assert(value, 'value must be defined');
      assert(value.startsWith('default '), 'value must starts with "default ".')
    })
  })

  describe("ParamsUtil setIn", ()=>{
    afterEach(resetEnv)


    it('parseInput', async () => {
      setIn({
        builderImageName: 'teste/teste'
      })
      _loadData()

      const { builderImageName } = parseInput({builderImageName: 'BUILDER_IMAGE_NAME'}, getInput)

      const v = getInput('builderImageName');
      const v1 = getInput('INPUT_BUILDER_IMAGE_NAME');
      const v3 = getInput('INPUT_BUILDERIMAGENAME');

      assert(builderImageName == 'teste/teste', '"builderImageName" should be parsed from "INPUT_BUILDER_IMAGE_NAME".')
    })

  })

})
