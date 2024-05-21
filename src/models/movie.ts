import { IsInt, IsString, IsBoolean, IsDefined, Min, MaxLength } from 'class-validator'

export class Movie {
  @IsDefined()
  @IsInt()
  @Min(1900)
    year!: number

  @IsDefined()
  @IsString()
  @MaxLength(255)
    title!: string

  @IsDefined()
  @IsString()
  @MaxLength(255)
    studios!: string

  @IsDefined()
  @IsString()
  @MaxLength(255)
    producers!: string

  @IsDefined()
  @IsBoolean()
    winner!: boolean
}
