import { ApiProperty } from "@nestjs/swagger";
import { IsEmpty, IsNotEmpty, IsNumber, IsString } from "class-validator";


export class CreateTeamDto {
  @ApiProperty({
    required: true,
    type: String,
    example: 'ejemplo',
    description: 'nombre del equipo',
    nullable: false
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    required: true,
    type: Number,
    example: 1500,
    description: 'valor unitario del equipo',
    nullable: false
  })
  @IsNotEmpty()
  @IsNumber()
  unitValue: number;

  @ApiProperty({
    required: true,
    type: String,
    example: 'kg',
    description: 'unidad de medida del equipo',
    nullable: false
  })
  @IsNotEmpty()
  @IsString()
  unitMeasurement: string;

  @ApiProperty({
    required: true,
    type: String,
    example: 'pesado',
    description: 'tipo de equipo',
    nullable: false
  })
  @IsNotEmpty()
  @IsString()
  teamType: string;
}


export class UpdateTeamDto {
  @ApiProperty({
    required: false,
    type: String,
    example: 'ejemplo',
    description: 'nombre del equipo',
    nullable: true
  })
  @IsEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    required: false,
    type: Number,
    example: 1500,
    description: 'valor unitario del equipo',
    nullable: true
  })
  @IsEmpty()
  @IsNumber()
  unitValue: number;

  @ApiProperty({
    required: false,
    type: String,
    example: 'kg',
    description: 'unidad de medida del equipo',
    nullable: true
  })
  @IsEmpty()
  @IsString()
  unitMeasurement: string;

  @ApiProperty({
    required: false,
    type: String,
    example: 'pesado',
    description: 'tipo de equipo',
    nullable: true
  })
  @IsEmpty()
  @IsString()
  teamType: string;
}
