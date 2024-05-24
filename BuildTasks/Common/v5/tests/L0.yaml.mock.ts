import { readFileSync } from 'node:fs';
import { join as joinPath } from 'node:path';

export const mockYamlContent = (() => {
  try {
    return readFileSync(joinPath(__dirname, 'mocks', 'L0.sourceContent.json')).toString('utf-8');
  } catch (error) {
    console.error(error);
  }
}
)()

export const mockYamlQueries = [
  `var NAME    =      .metadata.name | downcase`,
  `var KIND    =    .kind`,
  `echo      .kind | uppercase`,
  `file  ./bar/annotations.json  = .metadata.annotations`,
  `echo      .emptyResultTest | uppercase`,
  `var DOC_TWO_NAME    =      $[1].metadata.name | downcase`,

].join('\n')
