# 从文件加载

## 说明

`A4 Config Module` 默认采用本地文件加载方案，因此无需显式设置 `type: 'file'`。

``` ts
@Module({
  imports: [
    A4ConfigModule.forRoot({
      ignoreSchema: true,
      // type: 'file', // 默认为 'file'
    }),
  ],
})
export class AnimalModule { /* ... */ }

```

`A4 Config Module` 在获取配置文件时会根据文件名在 `process.cwd()` 路径下依次查找，找到的第一个文件将通过不同方案解析为对象。

- `a4.yml` 通过 [yml](https://eemeli.org/yaml/) 解析；
- `a4.yaml` 通过 [yml](https://eemeli.org/yaml/) 解析；
- `a4.json` 通过 [jsonc-parser](https://www.npmjs.com/package/jsonc-parser) 解析；
- `a4.jsonc` 通过 [jsonc-parser](https://www.npmjs.com/package/jsonc-parser) 解析；

## 自定义路径

在获取配置文件时，`rootDir` 和 `configFile` 属性会影响配置文件的路径选择。

``` ts
{
  rootDir?: string | string[]
  configFile?: string | string[]
}
```

`rootDir` 和 `configFile` 的数据类型均为 `undefined | string | string[]`，配置文件的路径为 `[path.resolve(process.cwd(), rootDirItem, configFileItem)]`。

以下是几个使用示例：

- __不同环境下配置文件内容不同，且配置文件存储在非开发环境上，由运维人员配置，存于服务器固定路径下。__

    可以设置为：

    ``` ts
    A4ConfigModule.forRoot({
      ignoreSchema: true,
      // type: 'file', // 默认为 'file'

      rootDir: [
        './',
        '/usr/project/service/service-a',
        '/app'
      ],

      configFile: 'a4.yml',
    }),

    ```

    此时，`A4ConfigModule` 在服务启动时会依次尝试以下路径获取配置项：

    `${process.cwd()}/a4.yml`

    `/usr/project/service/service-a/a4.yml`

    `/app/a4.yml`

    路径1 用以保证开发环境正确运行，路径2 可以设置为服务器的固定路径，路径3 代表在 Docker Image 中的配置文件路径。

- __不同环境下配置文件内容不同，但均与代码存储在一起。__

    可以设置为：

    ``` ts
    A4ConfigModule.forRoot({
      ignoreSchema: true,
      // type: 'file', // 默认为 'file'

      configFile: ({
        'dev': 'a4.dev.yml',
        'test': 'a4.test.yml',
        'prod': 'a4.prod.yml',
      }[process.env.CUSTOM_NODE_ENV] ?? 'a4.dev.yml')
    }),
    ```

    此时，通过设定自定义环境变量 `CUSTOM_NODE_ENV` 来控制在不同环境下加载哪个文件。

    ::: tip
    关于 Node.js 应用服务加载环境变量的方案，请参阅 [跨平台加载环境变量](TODO)。
    :::

## 配置合并

不同环境的配置项大同小异，是否可以只关注不同的配置内容？

`A4 Config` 提供了 `mergeConfig` 配置项。当 `mergeConfig: true` 时，`A4ConfigModule` 将会读取所有能找到的配置文件，并将解析成功的配置进行合并。

``` ts
A4ConfigModule.forRoot({
  ignoreSchema: true,
  // type: 'file', // 默认为 'file'

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

此时，`a4.dev.yml` 将覆盖 `a4.yml` 的配置信息。

需要注意的是，配置项在中间层架不能使用数组，否则无法正常进行覆盖操作。同时，对于各模块提供业务的 `open` 属性。

以下是一个示例：

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

`obj1` 和 `obj2` 代表两个配置文件的配置内容，合并后 `obj.a.b[1].d !== 22`，但是当 `d` 作为数据库或某些链接时，我们可能需要在某些环境下仅修改配置的某项。因此，应尽可能使用对象的方案进行。

以下是修改后的示例：

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

这种写法下，我们可以关闭 `obj.a.b[0]` 和 `obj.a.b[2]`，使 `obj.a.b[1].d === 22` 成为真。

## 空文件

如果指定了一个错误的配置文件，`jsonc-parser` 或 `yml` 会将其解析为空值（`undefined` 或 `null`），此时 `A4ConfigModule` 不会报错，仅会将其视为一个空对象 `{}`。这样是因为在开发初始化阶段，开发者通常也会提供一个正确的空白 `json` 文件，即使被解析为空值，`A4ConfigModule` 仍然保持了相同的判断逻辑。
