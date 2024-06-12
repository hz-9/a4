## API Report File for "@hz-9/a4-config"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

import { A4ModuleBase } from '@hz-9/a4-core';
import type { ClassConstructor } from 'class-transformer';
import { DynamicModule } from '@nestjs/common';
import { FactoryProvider } from '@nestjs/common';
import { IA4Config } from '@hz-9/a4-core';
import { IA4ConfigModule } from '@hz-9/a4-core';
import { IA4EnvInfo } from '@hz-9/a4-core';
import { IA4Info } from '@hz-9/a4-core';
import { IA4LibrariesInfo } from '@hz-9/a4-core';
import { IA4PathInfo } from '@hz-9/a4-core';
import { IA4StatsInfo } from '@hz-9/a4-core';
import { Logger } from '@nestjs/common';

// @public
export class A4Config implements IA4Config {
    constructor(config: object);
    // (undocumented)
    allConfig(): object;
    // (undocumented)
    readonly config: object;
    get cwd(): string;
    // (undocumented)
    get<CT = unknown>(propertyPath: string, defaultValueOrOptions?: CT): CT | undefined;
    // (undocumented)
    getA4EnvInfo(): IA4EnvInfo;
    // (undocumented)
    getA4Info(): IA4Info;
    // (undocumented)
    getA4LibrariesInfo(): IA4LibrariesInfo;
    // (undocumented)
    getA4PathInfo(): IA4PathInfo;
    // (undocumented)
    getA4StatsInfo(librariesInfo?: IA4LibrariesInfo): IA4StatsInfo;
    // (undocumented)
    getOrThrow<CT = unknown>(propertyPath: string): CT;
    get mainFilepath(): string;
    get mainNormalRoot(): string;
    get mainRoot(): string;
}

// @public
export class A4ConfigModule implements A4ModuleBase, IA4ConfigModule {
    // (undocumented)
    static CONFIG_MIDDLE_PATH: "A4.config";
    // (undocumented)
    static forRootAsync(options: Omit<FactoryProvider<IA4ConfigModuleOptions>, 'provide'>): DynamicModule;
    protected static loadConfigAndValidate(options: IA4ConfigModuleOptions): Promise<object>;
    // (undocumented)
    static logger: Logger;
}

// @public
export type AllConfigLoader = FileConfigLoader;

// @public
export type AllConfigPreOptions = IFileConfigPreOptions;

// Warning: (ae-forgotten-export) The symbol "BaseConfigLoader" needs to be exported by the entry point index.d.ts
//
// @public
export class FileConfigLoader extends BaseConfigLoader<IFileConfigPreOptions, IFileConfigOptions> {
    // (undocumented)
    asyncLoad(): Promise<object>;
    // (undocumented)
    getSuccessLoggerMsg(): string;
    // (undocumented)
    protected withDefaultOptions(options: IFileConfigPreOptions): IFileConfigOptions;
}

// @public
export interface IA4ConfigModuleOptions extends AllConfigPreOptions {
    // (undocumented)
    Schema: ClassConstructor<object> | ClassConstructor<object>[];
}

// @public
export interface IFileConfigOptions extends Required<IFileConfigPreOptions> {
    // (undocumented)
    rootDir: string[];
}

// Warning: (ae-forgotten-export) The symbol "IBaseConfigOptions" needs to be exported by the entry point index.d.ts
//
// @public
export interface IFileConfigPreOptions extends IBaseConfigOptions {
    configFile?: string;
    rootDir?: string | string[];
    // (undocumented)
    type: 'file';
}

// (No @packageDocumentation comment for this package)

```