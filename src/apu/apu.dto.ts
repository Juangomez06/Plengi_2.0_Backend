import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";

enum Measurement {
  CM = 'cm',
}

enum TypeConstruction {
  CK = 'ck',
}

export class CreateApuDto {
  @ApiProperty({
    required: true,
    type: String,
    example: 'nuevo apu',
    description: 'nombre del analisis de precio unitario',
    nullable: false
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    required: true,
    type: 'enum',
    enum: Measurement,
    example: Measurement.CM,
    description: 'medición del analisis de precio unitario',
    nullable: false
  })
  @IsNotEmpty()
  @IsEnum(Measurement)
  measurement: Measurement;

  @ApiProperty({
    required: true,
    type: 'enum',
    enum: TypeConstruction,
    example: TypeConstruction.CK,
    description: 'tipo de construcción del analisis de precio unitario',
    nullable: false
  })
  @IsNotEmpty()
  @IsEnum(TypeConstruction)
  typeConstruction: TypeConstruction;

  @ApiProperty({
    required: true,
    type: Number,
    example: 1.5,
    description: 'transporte del analisis de precio unitario',
    nullable: false
  })
  transport: number;
}


export class UpdateApuDto {
  @ApiProperty({
    required: false,
    type: String,
    example: 'editar apu',
    description: 'nombre del analisis de precio unitario',
    nullable: true
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    required: false,
    type: 'enum',
    enum: Measurement,
    example: Measurement.CM,
    description: 'medición del analisis de precio unitario',
    nullable: true
  })
  @IsNotEmpty()
  @IsEnum(Measurement)
  measurement: Measurement;

  @ApiProperty({
    required: false,
    type: 'enum',
    enum: TypeConstruction,
    example: TypeConstruction.CK,
    description: 'tipo de construcción del analisis de precio unitario',
    nullable: true
  })
  @IsNotEmpty()
  @IsEnum(TypeConstruction)
  typeConstruction: TypeConstruction;

  @ApiProperty({
    required: false,
    type: Number,
    example: 2.5,
    description: 'transporte del analisis de precio unitario',
    nullable: true
  })
  transport: number;
}


export class CreateApuWithResourcesDto {
  @ApiProperty({
    required: true,
    type: String,
    example: 'nuevo apu',
    description: 'nombre del analisis de precio unitario',
    nullable: false
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    required: true,
    type: 'enum',
    enum: Measurement,
    example: Measurement.CM,
    description: 'medición del analisis de precio unitario',
    nullable: false
  })
  @IsNotEmpty()
  @IsEnum(Measurement)
  measurement: Measurement;

  @ApiProperty({
    required: true,
    type: 'enum',
    enum: TypeConstruction,
    example: TypeConstruction.CK,
    description: 'tipo de construcción del analisis de precio unitario',
    nullable: false
  })
  @IsNotEmpty()
  @IsEnum(TypeConstruction)
  typeConstruction: TypeConstruction;

  @ApiProperty({
    required: true,
    type: Number,
    example: 1.5,
    description: 'transporte del analisis de precio unitario',
    nullable: false
  })
  transport: number;

  @ApiProperty({
    required: true,
    type: Array,
    example: [1, 2, 3],
    description: 'lista de ids de materiales',
    nullable: false
  })
  materials: [number];

  @ApiProperty({
    required: true,
    type: Array,
    example: [1, 2, 3],
    description: 'lista de ids de equipos',
    nullable: false
  })
  workteams: [number];

  @ApiProperty({
    required: true,
    type: Array,
    example: [1, 2, 3],
    description: 'lista de ids de mano de obra',
    nullable: false
  })
  labours: [number];
}
