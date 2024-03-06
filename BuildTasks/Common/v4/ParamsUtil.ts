import { getInput, getVariable, setVariable } from "azure-pipelines-task-lib";
import { _getVariableKey, _loadData } from "azure-pipelines-task-lib/internal";

/**
 * After your sets must call @{link azure-pipelines-task-lib/internal#_loadData}
 * @param input
 */
export const setIn = <I> (input: Partial<I>) => {
  for (const key of Object.keys(input)) {
    process.env[`INPUT_${key}`] = input[key]
  }
}

/**
 * After your sets must call @{link azure-pipelines-task-lib/internal#_loadData}
 * @param variables
 */
export const setVar = <V> (variables: Partial<V>) => {
  for (const key of Object.keys(variables)) {
    setVariable(key.toString(), variables[key] ?? '');
  }
}


export const getParam = <I, V>({
  inName,
  varName,
  required,
  defaultValue,
}: {inName?: keyof I, varName?: keyof V, required?: boolean, defaultValue?: any},
_getInput: typeof getInput) => {
  let valu;
  if(inName) valu = _getInput(inName as string, required);
  if(!valu && varName) valu = getVariable(varName as string);
  return valu ?? defaultValue;
}

/**
 * **Merge** and **Parse** all necessary params across input and variables,
 * > **Inputs overrites Variables**
 * @returns
 */
export function parseParams <I, V> (paramsMap: Record<keyof I, keyof V>, defaults: Partial<Record<keyof I, any>>, _getInput: typeof getInput): Partial<I> {
  return Object.keys(paramsMap).reduce((p, paramKey)=>{
    p[paramKey] = getParam<I, V>({
      inName: paramKey as keyof I,
      varName: paramsMap[paramKey],
      required: undefined,
      defaultValue: (defaults ?? {})[paramKey]
    }, _getInput);
    return p
  }, {})
}

export function parseInput<I>(paramsMap: Record<keyof I, any>, _getInput: typeof getInput): Partial<I> {
  return Object.keys(paramsMap)
  .reduce((p, inputKey)=>{
    p[inputKey] = _getInput(inputKey);
    return p
  },
  {});
}

export function parseVariables<I, V>(paramsMap: Record<keyof I, keyof V>): Partial<V> {
  let varName;
  return Object.keys(paramsMap)
  .reduce((p, inputKey)=>{
    varName = paramsMap[inputKey];
    p[varName] = getVariable(varName);
    return p
  },
  {});
}


/**
 * Interface representing Agent Variables in DevOps Services.
 */
export interface AgentVariables {
  /**
   * The local path on the agent where all folders for a given build pipeline are created.
   * This variable has the same value as `Pipeline.Workspace`.
   * Example: `/home/vsts/work/1`.
   */
  AGENT_BUILDDIRECTORY: string;

  /**
   * A mapping from container resource names in YAML to their Docker IDs at runtime.
   * Example follows the table.
   */
  AGENT_CONTAINERMAPPING: string;

  /**
   * The directory the agent is installed into. This contains the agent software.
   * Example: `c:\agent`.
   */
  AGENT_HOMEDIRECTORY: string;

  /**
   * The ID of the agent.
   */
  AGENT_ID: string;

  /**
   * The name of the running job. This will usually be "Job" or "__default", but in
   * multi-config scenarios, will be the configuration.
   */
  AGENT_JOBNAME: string;

  /**
   * The status of the build.
   * Possible values:
   * - 'Canceled'
   * - 'Failed'
   * - 'Succeeded'
   * - 'SucceededWithIssues' (partially successful)
   * The environment variable should be referenced as `AGENT_JOBSTATUS`.
   * The older `agent.jobstatus` is available for backward compatibility.
   */
  AGENT_JOBSTATUS: string;

  /**
   * The name of the machine on which the agent is installed.
   */
  AGENT_MACHINENAME: string;

  /**
   * The name of the agent that is registered with the pool.
   * If you're using a self-hosted agent, then this name is specified by you.
   * See [agents](https://learn.microsoft.com/en-us/azure/devops/pipelines/agents/agents?view=azure-devops).
   */
  AGENT_NAME: string;

  /**
   * The operating system of the agent host.
   * Valid values are:
   * - 'Windows_NT'
   * - 'Darwin'
   * - 'Linux'
   * If you're running in a container, the agent host and container may be running different operating systems.
   */
  AGENT_OS: string;

  /**
   * The operating system processor architecture of the agent host.
   * Valid values are:
   * - 'X86'
   * - 'X64'
   * - 'ARM'
   */
  AGENT_OSARCHITECTURE: string;

  /**
   * A temporary folder that is cleaned after each pipeline job.
   * This directory is used by tasks such as .NET Core CLI task to hold temporary items like test results before they're published.
   * Example: `/home/vsts/work/_temp` for Ubuntu.
   */
  AGENT_TEMPDIRECTORY: string;

  /**
   * The directory used by tasks such as Node Tool Installer and Use Python Version
   * to switch between multiple versions of a tool.
   * These tasks add tools from this directory to `PATH` so that subsequent build steps can use them.
   * Learn about [managing this directory on a self-hosted agent](https://go.microsoft.com/fwlink/?linkid=2008884).
   */
  AGENT_TOOLSDIRECTORY: string;

  /**
   * The working directory for this agent.
   * Example: `c:\agent_work`.
   * Note: This directory isn't guaranteed to be writable by pipeline tasks (for example, when mapped into a container).
   */
  AGENT_WORKFOLDER: string;
}

/**
 * Note: You can use agent variables as environment variables in your scripts
 * and as parameters in your build tasks.
 * You cannot use them to customize the build number or to apply a version control label or tag.
 */
interface AgentVariablesNote {
  INFO: string;
}
