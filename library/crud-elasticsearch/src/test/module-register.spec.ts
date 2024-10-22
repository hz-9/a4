/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 */
import { GLOBAL_PROVIDE_TOKEN_A4_CRUD, MODULE_CONFIG_PATH_A4_CRUD, SCOPE_PROVIDE_TOKEN_A4_CRUD } from '@hz-9/a4-core'
import { Test } from '@nestjs/testing'
import 'reflect-metadata'

import {
  A4ElasticSearchCrudModule,
  A4ElasticSearchCrudModuleSchema,
  A4ElasticSearchCrudModuleSchemaA,
  ElasticSearchDataSourceGroup,
} from '../index'

describe('Module register.', () => {
  it('OK - BASE', async () => {
    expect(A4ElasticSearchCrudModule.GLOBAL_PROVIDE_TOKEN).toBe(GLOBAL_PROVIDE_TOKEN_A4_CRUD)
    expect(A4ElasticSearchCrudModule.SCOPE_PROVIDE_TOKEN).toBe(SCOPE_PROVIDE_TOKEN_A4_CRUD)
    expect(A4ElasticSearchCrudModule.CONFIG_PATH).toBe(MODULE_CONFIG_PATH_A4_CRUD('elasticSearch'))
    expect(A4ElasticSearchCrudModule.Schema).toBe(A4ElasticSearchCrudModuleSchemaA)
    expect(A4ElasticSearchCrudModule.CoreSchema).toBe(A4ElasticSearchCrudModuleSchema)
  })

  it.each([
    [
      'forRoot',
      async () => {
        const moduleRef = await Test.createTestingModule({
          imports: [A4ElasticSearchCrudModule.forRoot(A4ElasticSearchCrudModule.DEFAULT_OPTIONS)],
        }).compile()
        const dataSourceGroup: ElasticSearchDataSourceGroup = moduleRef.get(
          A4ElasticSearchCrudModule.GLOBAL_PROVIDE_TOKEN
        )
        return dataSourceGroup
      },
    ],
    [
      'forRootAsync',
      async () => {
        const moduleRef = await Test.createTestingModule({
          imports: [
            A4ElasticSearchCrudModule.forRootAsync({
              useFactory: () => A4ElasticSearchCrudModule.DEFAULT_OPTIONS,
            }),
          ],
        }).compile()
        const dataSourceGroup: ElasticSearchDataSourceGroup = moduleRef.get(
          A4ElasticSearchCrudModule.GLOBAL_PROVIDE_TOKEN
        )
        return dataSourceGroup
      },
    ],
    [
      'forRootAsync',
      async () => {
        const moduleRef = await Test.createTestingModule({
          imports: [
            A4ElasticSearchCrudModule.forRootAsync({
              useFactory: () => A4ElasticSearchCrudModule.DEFAULT_OPTIONS,
            }),
          ],
        }).compile()
        const dataSourceGroup: ElasticSearchDataSourceGroup = moduleRef.get(ElasticSearchDataSourceGroup)
        return dataSourceGroup
      },
    ],
  ])('OK - judge info - %s', async (funName: string, fun: () => Promise<ElasticSearchDataSourceGroup>) => {
    const dataSourceGroup: ElasticSearchDataSourceGroup = await fun()
    expect(dataSourceGroup).toBeInstanceOf(ElasticSearchDataSourceGroup)
  })

  // it('OK - getConfig', async () => {
  //   const options = CU.p2CwD(A4SafeModuleSchema, {})

  //   class MockA4Config extends A4ConfigBase {
  //     // @ts-ignore
  //     public getOrThrow(configPath: string): A4SafeModuleSchema {
  //       return get(CU.p2CwD(A4SafeModuleSchemaA, {}), configPath)
  //     }
  //   }

  //   const exceptConfig = A4ElasticSearchCrudModule
  //     .getConfig(new MockA4Config() as unknown as IA4Config<A4SafeModuleSchemaA>)
  //   expect(exceptConfig).toEqual(options)
  // })
})
