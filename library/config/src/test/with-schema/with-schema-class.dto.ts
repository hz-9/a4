import { Type } from 'class-transformer'
import { IsBoolean, IsObject, ValidateNested } from 'class-validator'

import { ClassValidatorUtil, IsOptionalNotNull } from '@hz-9/a4-core'

class CustomConfig {
  @IsBoolean()
  public isOpen: boolean = true
}

export class AppSchema1 {
  @IsObject()
  @ValidateNested()
  @Type(() => CustomConfig)
  public readonly A4: CustomConfig
}

export class AppSchema2 {
  @IsObject()
  @ValidateNested()
  @Type(() => CustomConfig)
  public readonly A4: CustomConfig = ClassValidatorUtil.p2CwD(CustomConfig, {})
}

export class AppSchema3 {
  @IsOptionalNotNull()
  @IsObject()
  @ValidateNested()
  @Type(() => CustomConfig)
  public readonly A4?: CustomConfig
}
