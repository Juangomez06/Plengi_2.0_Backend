import { ApiProperty } from "@nestjs/swagger";
import { IsEmpty, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateLabourDto {
  @ApiProperty({
    required: true,
    type: String,
    name: 'name',
    example: 'ejemplo',
    description: 'nombre de la mano de obra',
    nullable: false
  })
  @IsNotEmpty()
  @IsString()
  name: string;
  
  @ApiProperty({
    required: true,
    type: String,
    example: 'cm',
    description: 'unidad de medida de la mano de obra',
    nullable: false
  })
  @IsNotEmpty()
  @IsString()
  unitMeasurement: string;
  
  @ApiProperty({
    required: true,
    type: Number,
    example: 1500,
    description: 'valor unitario de la mano de obra',
    nullable: false
  })
  @IsNotEmpty()
  @IsNumber()
  unitValue: number;
  
  @ApiProperty({
    required: true,
    type: String,
    example: 'pesado',
    description: 'tipo de trabajo de la mano de obra',
    nullable: false
  })
  @IsNotEmpty()
  @IsString()
  workType: string;
}


export class UpdateLabourDto {
  @ApiProperty({
    required: false,
    type: String,
    name: 'name',
    example: 'ejemplo',
    description: 'nombre de la mano de obra',
    nullable: true
  })
  @IsEmpty()
  @IsString()
  name: string;
  
  @ApiProperty({
    required: false,
    type: String,
    example: 'cm',
    description: 'unidad de medida de la mano de obra',
    nullable: true
  })
  @IsEmpty()
  @IsString()
  unitMeasurement: string;
  
  @ApiProperty({
    required: false,
    type: Number,
    example: 1500,
    description: 'valor unitario de la mano de obra',
    nullable: true
  })
  @IsEmpty()
  @IsNumber()
  unitValue: number;
  
  @ApiProperty({
    required: false,
    type: String,
    example: 'pesado',
    description: 'tipo de trabajo de la mano de obra',
    nullable: true
  })
  @IsEmpty()
  @IsString()
  workType: string;
}
