# Load from File

## Description

The `A4 Config Module` uses a default local file loading scheme, so there is no need to explicitly set `type: 'file'`.

``` ts
@Module({
  imports: [
    A4ConfigModule.forRoot({
      ignoreSchema: true,
      // type: 'file', // default is 'file'
    }),
  ],
})
export class AnimalModule { /* ... */ }

```

When retrieving the configuration file, the `A4 Config Module` will search for it based on the file name in the `process.cwd()` path. The first file found will be parsed into an object using different schemes.

- `a4.yml` is parsed using [yml](https://eemeli.org/yaml/);
- `a4.yaml` is parsed using [yml](https://eemeli.org/yaml/);
- `a4.json` is parsed using [jsonc-parser](https://www.npmjs.com/package/jsonc-parser);
- `a4.jsonc` is parsed using [jsonc-parser](https://www.npmjs.com/package/jsonc-parser);

## Custom Paths

When retrieving the configuration file, the `rootDir` and `configFile` properties affect the selection of the file path.

``` ts
{
  rootDir?: string | string[]
  configFile?: string | string[]
}
```

The data types of `rootDir` and `configFile` are `undefined | string | string[]`, and the file path is `[path.resolve(process.cwd(), rootDirItem, configFileItem)]`.

Here are a few usage examples:

- __Different configuration files with different contents in different environments, stored on non-development environments, configured by operations personnel, and stored in fixed paths on the server.__

    It can be set as:

    ``` ts
    A4ConfigModule.forRoot({
      ignoreSchema: true,
      // type: 'file', // default is 'file'

      rootDir: [
        './',
        '/usr/project/service/service-a',
        '/app'
      ],

      configFile: 'a4.yml',
    }),

    ```

    In this case, `A4ConfigModule` will try the following paths in order to retrieve the configuration options when the service starts:

    `${process.cwd()}/a4.yml`

    `/usr/project/service/service-a/a4.yml`

    `/app/a4.yml`

    Path 1 is used to ensure the correct operation of the development environment, path 2 can be set to the fixed path on the server, and path 3 represents the configuration file path in the Docker Image.

- __Different configuration files with different contents in different environments, but all stored together with the code.__

    It can be set as:

    ``` ts
    A4ConfigModule.forRoot({
      ignoreSchema: true,
      // type: 'file', // default is 'file'

      configFile: ({
        'dev': 'a4.dev.yml',
        'test': 'a4.test.yml',
        'prod': 'a4.prod.yml',
      }[process.env.CUSTOM_NODE_ENV] ?? 'a4.dev.yml')
    }),
    ```

    In this case, the file to be loaded is controlled by setting a custom environment variable `CUSTOM_NODE_ENV` in different environments.

    ::: tip
    For a solution on how to load environment variables in a Node.js application service, please refer to [Cross-platform Environment Variable Loading](TODO).
    :::

## Configuration Merging

Is it possible to only focus on the different configuration contents for different environments?

The `A4 Config` provides the `mergeConfig` configuration option. When `mergeConfig: true`, `A4ConfigModule` will read all available configuration files and merge the successfully parsed configurations.

``` ts
A4ConfigModule.forRoot({
  ignoreSchema: true,
  // type: 'file', // default is 'file'

  mergeConfig: true,

  configFile: [
    'a4.yml',

    ({
      'dev': 'a4.dev.yml',
      'test': 'a4.test.yml',
      'prod': 'a4.prod.yml',
    }[process.env.CUSTOM_NODE_ENV] ?? 'a4.dev.yml')
  ],
}),
```

In this case, the configuration information in `a4.dev.yml` will override the configuration in `a4.yml`.

It should be noted that the configuration items cannot use arrays in the middle layer, otherwise the override operation will not work properly. At the same time, the `open` attribute for providing business to each module.

Here is an example:

``` js
const obj1 = {
  a: {
    b: [
      { c: 0, d: 11 },
      { c: 1, d: 12 },
      { c: 2, d: 13 },
    ]
  }
}

const obj2 = {
  a:
    b: [
      { c: 1, d: 22 },
    ]
}
```

`obj1` and `obj2` represent the configurations of two configuration files. After merging, `obj.a.b[1].d !== 22`. However, when `d` is used as a database or some links, we may need to modify only a certain configuration item in certain environments. Therefore, it is recommended to use an object-based approach as much as possible.

Here is the modified example:

``` js
const obj1 = {
  a: {
    b: {
      0: { d: 11 },
      1: { d: 12 },
      2: { d: 13 },
    }
  }
}

const obj2 = {
  a: {
    b: {
      0: { open: false },
      1: { d: 22 },
      2: { open: false },
    }
  }
}
```

With this approach, we can disable `obj.a.b[0]` and `obj.a.b[2]`, and make `obj.a.b[1].d === 22` true.

## Empty Files

If an incorrect configuration file is specified, `jsonc-parser` or `yml` will parse it as an empty value (`undefined` or `null`). In this case, `A4ConfigModule` will not throw an error and will treat it as an empty object `{}`. This is because during the development initialization phase, developers usually provide a correct blank `json` file, even if it is parsed as an empty value, `A4ConfigModule` still maintains the same logic for handling it.
