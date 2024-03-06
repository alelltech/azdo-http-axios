import { readFileSync } from 'node:fs';
import { join as joinPath } from 'node:path';

export const mockComplexJsonContent = (() => {
  try {
    return readFileSync(joinPath(__dirname, 'mocks', 'L0Complex.sourceContent.json')).toString('utf-8');
  } catch (error) {
    console.error(error);
  }
}
)()

export const mockComplexJsonQueries = [
  `var APP_SYSTEM             = .spec.system`,
  `var APP_NAME               = .metadata.name`,
  `var SONAR_PROJECT_KEY      = .metadata.annotations["sonarqube.org/project-key"]`,
  `var HELM_RELEASE           = .metadata.annotations["backstage.io/kubernetes-id"]`,

  `echo .`,

].join('\n')
