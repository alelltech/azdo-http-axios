/**
 * Enable to debug typescript with ts-node alternating between "js" and "ts" extensions
 *
 */
import {
  debug
} from 'azure-pipelines-task-lib/task';
import { IExecOptions, IExecSyncOptions, IExecSyncResult, ToolRunner } from 'azure-pipelines-task-lib/toolrunner';
import events = require('events');

export interface TypeOfX extends events.EventEmitter {
  /**
   * Add argument
   * Append an argument or an array of arguments
   * returns ToolRunner for chaining
   *
   * @param     val        string cmdline or array of strings
   * @returns   ToolRunner
   */
  arg(val: string | string[]): ToolRunner;
  /**
   * Parses an argument line into one or more arguments
   * e.g. .line('"arg one" two -z') is equivalent to .arg(['arg one', 'two', '-z'])
   * returns ToolRunner for chaining
   *
   * @param     val        string argument line
   * @returns   ToolRunner
   */
  line(val: string): ToolRunner;
  /**
   * Add argument(s) if a condition is met
   * Wraps arg().  See arg for details
   * returns ToolRunner for chaining
   *
   * @param     condition     boolean condition
   * @param     val     string cmdline or array of strings
   * @returns   ToolRunner
   */
  argIf(condition: unknown, val: string | string[]): ToolRunner;
  /**
   * Pipe output of exec() to another tool
   * @param tool
   * @param file  optional filename to additionally stream the output to.
   * @returns {ToolRunner}
   */
  pipeExecOutputToTool(tool: ToolRunner, file?: string): ToolRunner;
  /**
   * Exec a tool.
   * Output will be streamed to the live console.
   * Returns promise with return code
   *
   * @param     tool     path to tool to exec
   * @param     options  optional exec options.  See IExecOptions
   * @returns   number
   */
  execAsync(options?: IExecOptions): Promise<number>;
  /**
   * Exec a tool.
   * Output will be streamed to the live console.
   * Returns promise with return code
   *
   * @deprecated Use the `execAsync` method that returns a native Javascript promise instead
   * @param     tool     path to tool to exec
   * @param     options  optional exec options.  See IExecOptions
   * @returns   number
   */
  exec(options?: IExecOptions): Q.Promise<number>;
  /**
   * Exec a tool synchronously.
   * Output will be *not* be streamed to the live console.  It will be returned after execution is complete.
   * Appropriate for short running tools
   * Returns IExecSyncResult with output and return code
   *
   * @param     tool     path to tool to exec
   * @param     options  optional exec options.  See IExecSyncOptions
   * @returns   IExecSyncResult
   */
  execSync(options?: IExecSyncOptions): IExecSyncResult;
  /**
   * Used to close child process by sending SIGNINT signal.
   * It allows executed script to have some additional logic on SIGINT, before exiting.
   */
  killChildProcess(): void;
}


/**
 * Overload of ToolRunner for inject commons behaviors
 */
export const execSyncW = (toolRunner: any, options?: IExecSyncOptions): IExecSyncResult => {
  const opts = (options ?? {});

  debug(`Overloading ToolRunner#execSync .`);

  return toolRunner.execSync({
    errStream: process.stderr,
    outStream: process.stdout,
    cwd: process.cwd(),
    shell: true,
    env: {
      ...process.env,
      ...opts.env
    },
    ...opts
  })
}


