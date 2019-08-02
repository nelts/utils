import * as fs from 'fs';
import * as path from 'path';
import { Require } from './require';

export interface COLLECT_OPTIONS {
  env: string,
  name: string,
}

export interface DEFINE_PLUGIN_OPTIONS {
  enable: boolean,
  env?: string | Array<string>,
  runAt?: string | string[],
  path?: string
}

export interface PLUGIN_COLLECT_RESULT {
  name: string,
  dependenties: string[],
}

export interface NELTS_PACKAGE_JSON_INTERFACE {
  name: string,
  version: string,
  description: string,
  main: string,
  source: 'src' | 'dist',
  plugin?: {
    [PLUGIN_NAME: string]: DEFINE_PLUGIN_OPTIONS
  }
}

export default function Collect(cwd: string, node_module_path: string, options: COLLECT_OPTIONS): PLUGIN_COLLECT_RESULT {
  const packageFilename = path.resolve(cwd, 'package.json');
  if (!fs.existsSync(packageFilename)) throw new Error('cannot find package.json');
  const packageExports = Require<NELTS_PACKAGE_JSON_INTERFACE>(packageFilename);
  if (!packageExports.plugin) packageExports.plugin = {};
  const moduleName = packageExports.name;
  const result: string[] = [];

  for (const packageName in packageExports.plugin) {
    const config = packageExports.plugin[packageName];

    let item: string;

    // resolve enable
    if (config.enable === undefined) config.enable = true;
    if (!config.enable) continue;

    // resolve env
    if (config.env === undefined) config.env = [];
    if (!Array.isArray(config.env)) config.env = [config.env];
    if (config.env.length && config.env.indexOf(options.env) === -1) continue;

    if (!config.runAt) config.runAt = [];
    if (config.runAt && !Array.isArray(config.runAt)) config.runAt = [config.runAt];
    if (config.runAt.length > 0 && config.runAt.indexOf(options.name) === -1) continue;

    // resolve path
    if (config.path) {
      if (!path.isAbsolute(config.path)) config.path = path.resolve(cwd, config.path);
      item = config.path;
    } else {
      const packageModulePath = path.resolve(node_module_path, packageName);
      if (!fs.existsSync(packageModulePath)) throw new Error('cannot find the module of `' + packageName + '`');
      item = packageModulePath;
    }

    result.push(item);
  }

  return {
    name: moduleName,
    dependenties: result
  };
}