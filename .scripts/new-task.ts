import inq from 'inquirer';
import {green, yellow, red } from 'colors';
import globSync from "glob/sync";
import { sep, join as joinPath } from 'node:path';
import { cpSync, readFileSync, writeFileSync, renameSync } from 'node:fs';
import { toKebabCase, toPascalCase, toTitleCase } from "./string-case";
import { randomUUID } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { log } from 'node:console';

async function run(){

  const tasks = (globSync('*/*/task.json', { cwd: 'BuildTasks'}) as string[])
    .map((t) => {
      return t.substring(0, t.indexOf(sep))
    })


  const prompt = inq.createPromptModule();

  const { taskName, from} = await prompt([{
    name: 'taskName',
    message: `Task name (must be Humanized):`
  },{
    name: 'from',
    message: `Based on (chose previous task to copy):`,
    type: 'list',
    choices: tasks
  }]);

  const fromTaskDir = joinPath('BuildTasks', from);
  const pascalName = toPascalCase(taskName);
  const kebabName = toKebabCase(taskName);
  const titleCase = toTitleCase(taskName);


  console.log(`pascalName: ${pascalName}`)
  console.log(`kebabName: ${kebabName}`)
  console.log(`titleCase: ${titleCase}`)

  log(`Coping ${from} -> ${pascalName}...`);

  const newTaskDir = joinPath('BuildTasks', pascalName);

  spawnSync(`git clean -fdX -- ${fromTaskDir}`, {cwd: process.cwd(), stdio: 'pipe', env: process.env, shell: true});

  cpSync(fromTaskDir, newTaskDir,{ recursive: true })

  const rootPackageJson = JSON.parse(readFileSync('package.json').toString('utf-8'));
  const rootVssExtensionJson = JSON.parse(readFileSync('vss-extension.json').toString('utf-8'));

  let file = joinPath(newTaskDir, 'v4', 'package.json');
  log(`Updating '${file}'...`);
  let content = readFileSync(file).toString('utf-8');
  writeFileSync(file, content.replace(/("name"[ ]{0,}:[ ]{0,}")[^"]+"/, `$1${rootPackageJson.name}-${kebabName}"`))

  // file = joinPath(newTaskDir, 'v4', 'package-lock.json');
  // content = readFileSync(file).toString('utf-8');
  // writeFileSync(
  //   file,
  //   content
  //   .replace(/("name"[ ]{0,}:[ ]{0,}")[^"]+"/, `$1${rootPackageJson.name}-${kebabName}"`)
  //   .replace(/(\n[ ]{0,}"packages"[ ]{0,}:[ ]{0,}\{\n[ ]{0,}""[ ]{0,}:[ ]{0,}\{\n[ ]{0,}"name"[ ]{0,}:[ ]{0,}")[^"]+"/, `$1${rootPackageJson.name}-${kebabName}"`)
  // )

  file = joinPath(newTaskDir, 'v4', 'task.json');
  log(`Updating '${file}'...`);
  content = readFileSync(file).toString('utf-8');
  writeFileSync(
    file,
    content
    .replace(/("id"[ ]{0,}:[ ]{0,}")[^"]+"/, `$1${randomUUID()}"`)
    .replace(/("name"[ ]{0,}:[ ]{0,}")[^"]+"/, `$1${toPascalCase(rootVssExtensionJson.id)}${pascalName}"`)
    .replace(/("friendlyName"[ ]{0,}:[ ]{0,}")[^"]+"/, `$1${titleCase}"`)
    .replace(/("description"[ ]{0,}:[ ]{0,}")[^"]+"/, `$1${titleCase}"`)
    .replace(/("target"[ ]{0,}:[ ]{0,}")[^"]+"/, `$1${pascalName}/v4/${pascalName}.js"`)
    .replace(/("instanceNameFormat"[ ]{0,}:[ ]{0,}")[^"]+"/, `$1${titleCase}"`)
  )

  file = 'vss-extension.json';
  log(`Updating '${file}'...`);
  content = readFileSync(file).toString('utf-8');
  writeFileSync(
    file,
    content
    .replace(
      /([\t ]+)(\"contributions\"[ ]{0,}:[ ]{0,}\[)/gm,
      [
        `$1$2`,
        `$1  {`,
        `$1    "id": "${toPascalCase(rootVssExtensionJson.id)}${pascalName}",`,
        `$1    "type": "ms.vss-distributed-task.task",`,
        `$1    "targets": [`,
        `$1      "ms.vss-distributed-task.tasks"`,
        `$1    ],`,
        `$1    "properties": {`,
        `$1      "name": "BuildTasks/${pascalName}"`,
        `$1    }`,
        `$1  },`,
      ].join('\n')
    )
  )

  file = 'vss-extension.json';
  log(`Updating '${file}'...`);
  content = readFileSync(file).toString('utf-8');
  writeFileSync(
    file,
    content
    .replace(
      /([\t ]+)(\"files\"[ ]{0,}:[ ]{0,}\[)/gm,
      [
        `$1$2`,
        `$1  {`,
        `$1    "path": "BuildTasks/${pascalName}"`,
        `$1  },`,
      ].join('\n')
    )
  )

  file = '.versionrc.js';
  log(`Updating '${file}'...`);
  content = readFileSync(file).toString('utf-8');
  writeFileSync(
    file,
    content

    .replace(
      /(([ \t]{1,})[^\}]+\},[ ]{0,}\n)([ ]{0,}\n[ ]{0,}\][ ]{0,}\n[ ]{0,}\})$/gm,
      [
        `$1`,
        `$2{ "filename": "BuildTasks/${pascalName}/v4/package.json", "type": "json" },`,
        `$2{ "filename": "BuildTasks/${pascalName}/v4/task.json", "updater": "task-version.js" },`,
        `$3`
      ].join('\n')
    )
  )

  file = joinPath(newTaskDir, 'v4', 'tsconfig.json');
  log(`Updating '${file}'...`);
  content = readFileSync(file).toString('utf-8');
  writeFileSync( file, content.replace(from, pascalName) )

  file = joinPath(newTaskDir, 'v4', '.gitignore');
  log(`Updating '${file}'...`);
  content = readFileSync(file).toString('utf-8');
  writeFileSync(file, content.replace(from, pascalName))


  log(`Renaming ${joinPath(newTaskDir, 'v4', `${from}.ts`)} -> ${joinPath(newTaskDir, 'v4', `${pascalName}.ts`)} ...`);
  renameSync(joinPath(newTaskDir, 'v4', `${from}.ts`), joinPath(newTaskDir, 'v4', `${pascalName}.ts`))
  spawnSync(`git clean -fdX -- ${newTaskDir}`, {cwd: process.cwd(), stdio: 'pipe', env: process.env, shell: true});
  spawnSync(`npm i`, {cwd: joinPath(newTaskDir, 'v4'), stdio: 'pipe', env: process.env, shell: true});
  spawnSync(`npm run compile`, { stdio: 'pipe', env: process.env, shell: true});
  spawnSync(`git add .`, {cwd: process.cwd(), stdio: 'pipe', env: process.env, shell: true});

}

run().then(() => console.log('Finished!')).catch(console.error)
