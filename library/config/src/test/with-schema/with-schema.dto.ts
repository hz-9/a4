import { Type } from 'class-transformer'
import { IsBoolean, IsObject, ValidateNested } from 'class-validator'

import { ClassValidatorUtil } from '@hz-9/a4-core'

class AppCustomConfigSchema {
  @IsBoolean()
  public isOpen: boolean = true
}

class A4Config {
  @IsObject()
  @ValidateNested()
  @Type(() => AppCustomConfigSchema)
  public readonly app: AppCustomConfigSchema = ClassValidatorUtil.p2CwD(AppCustomConfigSchema, {})
}

export class AppConfigSchema1 {
  @IsObject()
  @ValidateNested()
  @Type(() => A4Config)
  public readonly A4: A4Config = ClassValidatorUtil.p2CwD(A4Config, {})
}

export class AppConfigSchema2 {
  @IsObject()
  @ValidateNested()
  @Type(() => A4Config)
  public readonly A4: A4Config = ClassValidatorUtil.p2CwD(A4Config, {})

  @IsObject()
  @ValidateNested()
  @Type(() => A4Config)
  public readonly A5: A4Config = ClassValidatorUtil.p2CwD(A4Config, {})
}

export class AppConfigSchema3 {
  @IsObject()
  @ValidateNested()
  @Type(() => A4Config)
  public readonly A5: A4Config = ClassValidatorUtil.p2CwD(A4Config, {})
}
