import { _loadData } from "azure-pipelines-task-lib/internal";

const initial_env = Object.keys(process.env).reduce((p, k) => {
  p[k] = process.env[k]
  return p;
}, {})


describe(`Build Suite`, () => {
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
  })
})
