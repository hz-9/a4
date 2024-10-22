/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 */
import { GLOBAL_PROVIDE_TOKEN_A4_CRUD, MODULE_CONFIG_PATH_A4_CRUD, SCOPE_PROVIDE_TOKEN_A4_CRUD } from '@hz-9/a4-core'
import { Test } from '@nestjs/testing'
import 'reflect-metadata'

import {
  A4TypeORMCrudModule,
  A4TypeORMCrudModuleSchema,
  A4TypeORMCrudModuleSchemaA,
  TyprORMDataSourceGroup,
} from '../index'

describe('Module register.', () => {
  it('OK - BASE', async () => {
    expect(A4TypeORMCrudModule.GLOBAL_PROVIDE_TOKEN).toBe(GLOBAL_PROVIDE_TOKEN_A4_CRUD)
    expect(A4TypeORMCrudModule.SCOPE_PROVIDE_TOKEN).toBe(SCOPE_PROVIDE_TOKEN_A4_CRUD)
    expect(A4TypeORMCrudModule.CONFIG_PATH).toBe(MODULE_CONFIG_PATH_A4_CRUD('typeORM'))
    expect(A4TypeORMCrudModule.Schema).toBe(A4TypeORMCrudModuleSchemaA)
    expect(A4TypeORMCrudModule.CoreSchema).toBe(A4TypeORMCrudModuleSchema)
  })

  it.each([
    [
      'forRoot',
      async () => {
        const moduleRef = await Test.createTestingModule({
          imports: [A4TypeORMCrudModule.forRoot(A4TypeORMCrudModule.DEFAULT_OPTIONS)],
        }).compile()
        const dataSourceGroup: TyprORMDataSourceGroup = moduleRef.get(A4TypeORMCrudModule.GLOBAL_PROVIDE_TOKEN)
        return dataSourceGroup
      },
    ],
    [
      'forRootAsync',
      async () => {
        const moduleRef = await Test.createTestingModule({
          imports: [
            A4TypeORMCrudModule.forRootAsync({
              useFactory: () => A4TypeORMCrudModule.DEFAULT_OPTIONS,
            }),
          ],
        }).compile()
        const dataSourceGroup: TyprORMDataSourceGroup = moduleRef.get(A4TypeORMCrudModule.GLOBAL_PROVIDE_TOKEN)
        return dataSourceGroup
      },
    ],
    [
      'forRootAsync',
      async () => {
        const moduleRef = await Test.createTestingModule({
          imports: [
            A4TypeORMCrudModule.forRootAsync({
              useFactory: () => A4TypeORMCrudModule.DEFAULT_OPTIONS,
            }),
          ],
        }).compile()
        const dataSourceGroup: TyprORMDataSourceGroup = moduleRef.get(TyprORMDataSourceGroup)
        return dataSourceGroup
      },
    ],
  ])('OK - judge info - %s', async (funName: string, fun: () => Promise<TyprORMDataSourceGroup>) => {
    const dataSourceGroup: TyprORMDataSourceGroup = await fun()
    expect(dataSourceGroup).toBeInstanceOf(TyprORMDataSourceGroup)
  })

  // it('OK - getConfig', async () => {
  //   const options = CU.p2CwD(A4SafeModuleSchema, {})

  //   class MockA4Config extends A4ConfigBase {
  //     // @ts-ignore
  //     public getOrThrow(configPath: string): A4SafeModuleSchema {
  //       return get(CU.p2CwD(A4SafeModuleSchemaA, {}), configPath)
  //     }
  //   }

  //   const exceptConfig = A4TypeORMCrudModule
  //     .getConfig(new MockA4Config() as unknown as IA4Config<A4SafeModuleSchemaA>)
  //   expect(exceptConfig).toEqual(options)
  // })
})
