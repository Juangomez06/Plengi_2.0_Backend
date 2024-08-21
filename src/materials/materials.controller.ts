import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { MaterialsService } from './materials.service';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { ResponseBase, SortRecords } from 'src/utils';
import { CreateMaterialDto, UpdateMaterialDto } from './materials.dto';

@ApiTags('Materials')
@Controller('materials')
export class MaterialsController {
  constructor(private readonly materialService: MaterialsService) { }

  @Get()
  @ApiQuery({
    name: 'skip',
    type: Number,
    description: 'skip a certain number of results ',
    required: false
  })
  @ApiQuery({
    name: 'take',
    type: Number,
    description: 'take a certain number of results',
    required: false
  })
  @ApiQuery({
    name: 'sort',
    type: String,
    description: 'sort records by ascending or descending',
    required: false,
    enum: SortRecords
  })
  @ApiQuery({
    name: 'name',
    type: String,
    description: 'search for records contain the letters sent',
    required: false
  })
  @ApiQuery({
    name: 'delete',
    type: Boolean,
    description: 'show deleted results',
    required: false
  })
  async findAll(
    @Query('skip') skip?: number,
    @Query('take') take?: number,
    @Query('sort') sort?: string,
    @Query('name') name?: string,
    @Query('delete') showDelete?: string,
  ): Promise<ResponseBase> {
    const options = { skip, take, sort, name, showDelete };
    const response = await this.materialService.getAllMaterials(options);
    return response;
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ResponseBase> {
    const response = await this.materialService.getMaterial(id);
    return response;
  }

  @Post()
  async register(@Body() data: CreateMaterialDto): Promise<ResponseBase> {
    const response = await this.materialService.createMaterial(data);
    return response;
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() data: UpdateMaterialDto,
  ): Promise<ResponseBase> {
    const response = await this.materialService.updateMaterial(id, data);
    return response;
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<ResponseBase> {
    const response = this.materialService.deleteMaterial(id);
    return response;
  }
}
