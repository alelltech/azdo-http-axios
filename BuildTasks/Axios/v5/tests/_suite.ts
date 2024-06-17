import * as assert from "assert";
import * as path from "path";

import { MockTestRunner } from "azure-pipelines-task-lib/mock-test";
import { mkdirSync, rmSync } from "fs";
import { EXT, getRuntimePath } from "@alell/azure-pipelines-task-commons";



describe(`Axios Suite`, () => {
  const tempDir = path.join(__dirname, '_temp');
  beforeEach(() => {
    // Mock temp paths
    // process.env["MOCK_IGNORE_TEMP_PATH"] = "true"; // This will remove the temp path from any outputs
    process.env["MOCK_TEMP_PATH"] = tempDir;
    process.env["MOCK_NORMALIZE_SLASHES"] = "true";

    mkdirSync(tempDir, {recursive: true})
  });

  after(() => {
    rmSync(tempDir, {recursive: true})
  });

  it("L0 evaluate insomnia request", async function () {
    this.timeout(parseInt(process.env.TASK_TEST_TIMEOUT ?? '20000'));
    const testPath = path.join(__dirname, `L0.insomnia.${EXT}`)
    const runner: MockTestRunner = new MockTestRunner(testPath);
    runner.nodePath = getRuntimePath(runner.nodePath);
    runner.run();

    runner.stderr = runner.stderr.replace('Debugger attached.\nWaiting for the debugger to disconnect...\n', '');

    assert(runner.invokedToolCount == 0, "should have not invocation tools: " + runner.invokedToolCount);
    assert(runner.stderr.length == 0, "should not have written to stderr=" + runner.stderr);
    assert(runner.succeeded, "task should have succeeded");
    assert(runner.warningIssues.length == 0, "task should have no warnings.");
    assert(runner.stdout.match(/##vso\[task.setvariable variable=body[^\]]+\]{\"mockfield\": \"mock value\"}/), "should have setvariable expression of 'body' with '{\"mockfield\": \"mock value\"}'.")
    assert(runner.stdout.match(/##vso\[task.setvariable variable=status[^\]]+\]200/), "should have setvariable expression of 'status' with '200'.")
    assert(runner.stdout.match(/##vso\[task.setvariable variable=statusText[^\]]+\]OK/), "should have setvariable expression of 'statusText' with 'OK'.")
    assert(runner.stdout.match(/##vso\[task.setvariable variable=headers[^\]]+\]{}/), "should have setvariable expression of 'headers' with '{}'.")
    assert(runner.stdout.match(/##vso\[task.setvariable variable=INSOMNIA_RES_BODY[^\]]+\]{\"mockfield\": \"mock value\"}/), "should have setvariable expression of 'INSOMNIA_RES_BODY' with '{\"mockfield\": \"mock value\"}'.")
  });

  it("L0 evaluate postman request", async function () {
    this.timeout(parseInt(process.env.TASK_TEST_TIMEOUT ?? '20000'));
    const testPath = path.join(__dirname, `L0.postman.${EXT}`)
    const runner: MockTestRunner = new MockTestRunner(testPath);
    runner.nodePath = getRuntimePath(runner.nodePath);
    runner.run();

    runner.stderr = runner.stderr.replace('Debugger attached.\nWaiting for the debugger to disconnect...\n', '');

    assert(runner.invokedToolCount == 0, "should have not invocation tools: " + runner.invokedToolCount);
    assert(runner.stderr.length == 0, "should not have written to stderr=" + runner.stderr);
    assert(runner.succeeded, "task should have succeeded");
    assert(runner.warningIssues.length == 0, "task should have no warnings.");
    assert(runner.stdout.match(/##vso\[task.setvariable variable=body[^\]]+\]{\"mockfield\": \"mock value\"}/), "should have setvariable expression of 'body' with '{\"mockfield\": \"mock value\"}'.")
    assert(runner.stdout.match(/##vso\[task.setvariable variable=status[^\]]+\]200/), "should have setvariable expression of 'status' with '200'.")
    assert(runner.stdout.match(/##vso\[task.setvariable variable=statusText[^\]]+\]OK/), "should have setvariable expression of 'statusText' with 'OK'.")
    assert(runner.stdout.match(/##vso\[task.setvariable variable=headers[^\]]+\]{}/), "should have setvariable expression of 'headers' with '{}'.")
  });

  it("L1 retry 3 times from jq expresion", async function () {
    this.timeout(parseInt(process.env.TASK_TEST_TIMEOUT ?? '20000'));
    const testPath = path.join(__dirname, `L1.retry-jq.${EXT}`)
    const runner: MockTestRunner = new MockTestRunner(testPath);
    runner.nodePath = getRuntimePath(runner.nodePath);
    runner.run();

    runner.stderr = runner.stderr.replace('Debugger attached.\nWaiting for the debugger to disconnect...\n', '');

    assert(runner.invokedToolCount == 0, "should have not invocation tools: " + runner.invokedToolCount);
    assert(runner.stderr.length == 0, "should not have written to stderr=" + runner.stderr);
    assert(runner.succeeded, "task should have succeeded");
    assert(runner.warningIssues.length == 0, "task should have no warnings.");

    const expectedBodyResult = JSON.stringify({"data":[{"foo":{"bar":"bad_value"}}]});
    assert(runner.stdout.match(/##vso\[task.setvariable variable=body[^\]]+\]/), `should have setvariable expression of 'body' with '${expectedBodyResult}'.`)
    assert(runner.stdout.match(/##vso\[task.setvariable variable=status[^\]]+\]200/), "should have setvariable expression of 'status' with '200'.")
    assert(runner.stdout.match(/##vso\[task.setvariable variable=statusText[^\]]+\]OK/), "should have setvariable expression of 'statusText' with 'OK'.")
    assert(runner.stdout.match(/##vso\[task.setvariable variable=headers[^\]]+\]{}/), "should have setvariable expression of 'headers' with '{}'.")
    assert(runner.stdout.match(/##vso\[task.setvariable variable=INSOMNIA_RES_BODY[^\]]+\]/), `should have setvariable expression of 'INSOMNIA_RES_BODY' with '${expectedBodyResult}'.`)
  });
})
