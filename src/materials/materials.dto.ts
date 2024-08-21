import { ApiProperty } from "@nestjs/swagger";
import { IsEmpty, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateMaterialDto {
  @ApiProperty({
    required: true,
    type: String,
    name: 'name',
    example: 'example',
    description: 'nombre del material',
    nullable: false
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    required: true,
    type: String,
    example: 'cm',
    description: 'unidad de medida del material',
    nullable: false
  })
  @IsNotEmpty()
  @IsString()
  unitMeasurement: string;

  @ApiProperty({
    required: true,
    type: Number,
    example: 1500,
    description: 'valor unitario del material',
    nullable: false
  })
  @IsNotEmpty()
  @IsNumber()
  unitValue: number;

  @ApiProperty({
    required: true,
    type: String,
    example: 'provider',
    description: 'tipo de proveedor del material',
    nullable: false
  })
  @IsNotEmpty()
  @IsString()
  providerType: string;
}


export class UpdateMaterialDto {
  @ApiProperty({
    required: false,
    type: String,
    name: 'name',
    example: 'example',
    description: 'nombre del material',
    nullable: true
  })
  @IsEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    required: false,
    type: String,
    example: 'cm',
    description: 'unidad de medida del material',
    nullable: true
  })
  @IsEmpty()
  @IsString()
  unitMeasurement: string;

  @ApiProperty({
    required: false,
    type: Number,
    example: 1500,
    description: 'valor unitario del material',
    nullable: true
  })
  @IsEmpty()
  @IsNumber()
  unitValue: number;

  @ApiProperty({
    required: false,
    type: String,
    example: 'provider',
    description: 'tipo de proveedor del material',
    nullable: true
  })
  @IsEmpty()
  @IsString()
  providerType: string;
}
