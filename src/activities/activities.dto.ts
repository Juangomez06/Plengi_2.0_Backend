import { ApiProperty } from "@nestjs/swagger";
import { IsEmpty, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateActivityDto {
  @ApiProperty({
    required: true,
    type: String,
    example: 'actividad',
    description: 'nombre de la actividad',
    nullable: false
  })
  @IsNotEmpty()
  @IsString()
  name: string;
  
  @ApiProperty({
    required: true,
    type: Number,
    example: 1.5,
    description: 'cantidad de la actividad',
    nullable: false
  })
  @IsNotEmpty()
  @IsString()
  amount: number;
  
  @ApiProperty({
    required: true,
    type: Number,
    example: 1500,
    description: 'imprevisto de la actividad',
    nullable: false
  })
  @IsNotEmpty()
  @IsNumber()
  unexpected: number;
  
  @ApiProperty({
    required: false,
    type: Number,
    example: 1,
    description: 'orden de la actividad',
    nullable: false
  })
  @IsNotEmpty()
  @IsString()
  order: number;
}


export class UpdateActivityDto {
  @ApiProperty({
    required: false,
    type: String,
    example: 'actividad',
    description: 'nombre de la actividad',
    nullable: true
  })
  @IsEmpty()
  @IsString()
  name: string;
  
  @ApiProperty({
    required: false,
    type: Number,
    example: 1.5,
    description: 'cantidad de la actividad',
    nullable: true
  })
  @IsEmpty()
  @IsString()
  amount: number;
  
  @ApiProperty({
    required: false,
    type: Number,
    example: 1500,
    description: 'imprevisto de la actividad',
    nullable: true
  })
  @IsEmpty()
  @IsNumber()
  unexpected: number;
  
  @ApiProperty({
    required: false,
    type: Number,
    example: 1,
    description: 'orden de la actividad',
    nullable: true
  })
  @IsEmpty()
  @IsString()
  order: number;
}
