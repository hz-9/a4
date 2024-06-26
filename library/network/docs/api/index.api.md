## API Report File for "@hz-9/a4-network"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

/// <reference types="node" />

import { A4ModuleBase } from '@hz-9/a4-core';
import { DynamicModule } from '@nestjs/common';
import { FactoryProvider } from '@nestjs/common';
import { IA4AddressInfo } from '@hz-9/a4-core';
import { IA4Config } from '@hz-9/a4-core';
import { IA4HostAndPort } from '@hz-9/a4-core';
import { IA4Network } from '@hz-9/a4-core';
import { IA4NetworkModule } from '@hz-9/a4-core';
import { Logger } from '@nestjs/common';
import os from 'node:os';

// @public
export class A4Network implements IA4Network {
    constructor(options: INetworkInfo);
    get currentPort(): number | undefined;
    set currentPort(newPort: number | undefined);
    // (undocumented)
    getAddressInfo(): IA4AddressInfo;
    getAvailablePort(): Promise<number>;
    // (undocumented)
    getHostAndPort(): IA4HostAndPort;
    // (undocumented)
    protected readonly options: INetworkInfo;
    tryPortTimes: number;
}

// @public
export class A4NetworkModule implements A4ModuleBase, IA4NetworkModule {
    // (undocumented)
    static CONFIG_MIDDLE_PATH: "A4.network";
    // (undocumented)
    static forRootAsync(options: Omit<FactoryProvider<A4NetworkModuleSchema>, 'provide'>): DynamicModule;
    // (undocumented)
    static getConfig(a4Config: IA4Config): A4NetworkModuleSchema;
    // (undocumented)
    static logger: Logger;
    // (undocumented)
    static Schema: typeof A4NetworkModuleSchemaA;
}

// @public
export class A4NetworkModuleSchema {
    readonly bindIPv4: boolean;
    readonly bindIPv6: boolean;
    readonly forcePort?: number;
    readonly portBaseline: number;
}

// @public
export class A4NetworkModuleSchemaA {
    // (undocumented)
    readonly A4: A4NetworkModuleSchemaB;
}

// @public
export class A4NetworkModuleSchemaB {
    // (undocumented)
    readonly network: A4NetworkModuleSchema;
}

// @public
export interface IA4NetworkOptions extends A4NetworkModuleSchema {
}

// @public
export interface IInterfaceInfoIPv4 extends os.NetworkInterfaceInfoIPv4 {
    name: string;
}

// @public
export interface IInterfaceInfoIPv6 extends os.NetworkInterfaceInfoIPv6 {
    name: string;
}

// @public
export interface INetworkInfo extends IA4NetworkOptions {
    defaultIPv4?: InterfaceInfo;
    defaultIPv6?: InterfaceInfo;
    ipv4: InterfaceInfo[];
    ipv6: InterfaceInfo[];
    mac?: string;
    port?: number;
}

// @public
export type InterfaceInfo = IInterfaceInfoIPv4 | IInterfaceInfoIPv6;

// @public
export const NETWORK_MODULE_DEFAULT: {
    readonly BIND_IPV4: true;
    readonly BIND_IPV6: false;
    readonly PORT_BASELINE: 16100;
};

// @public
export enum NetworkFamily {
    // (undocumented)
    IPv4 = "IPv4",
    // (undocumented)
    IPv6 = "IPv6"
}

// (No @packageDocumentation comment for this package)

```
