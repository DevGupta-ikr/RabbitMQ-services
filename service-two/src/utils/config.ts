import fs from 'node:fs';
import path from 'node:path';

import yaml from 'js-yaml';

import Config from 'config';

const configPath = path.join(__dirname, '../../configs/config.yaml');

const config = yaml.load(fs.readFileSync(configPath, 'utf8')) as Config;

export default config;
