export interface COLLECT_OPTIONS {
    env: string;
    name: string;
}
export interface DEFINE_PLUGIN_OPTIONS {
    enable: boolean;
    env?: string | Array<string>;
    runAt?: string | string[];
    path?: string;
}
export interface PLUGIN_COLLECT_RESULT {
    name: string;
    dependenties: string[];
}
export interface NELTS_PACKAGE_JSON_INTERFACE {
    name: string;
    version: string;
    description: string;
    main: string;
    source: 'src' | 'dist';
    plugin?: {
        [PLUGIN_NAME: string]: DEFINE_PLUGIN_OPTIONS;
    };
}
export default function Collect(cwd: string, node_module_path: string, options: COLLECT_OPTIONS): PLUGIN_COLLECT_RESULT;
