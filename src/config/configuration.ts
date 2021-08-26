import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

const YAML_CONFIG_FILENAME = 'config.yaml';

export default () => {
  console.log('__dirname')
  console.log(__dirname)
  return yaml.load(
    readFileSync(join('src/config/', YAML_CONFIG_FILENAME), 'utf8'),
  ) as Record<string, any>;
};