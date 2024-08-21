import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { ApuService } from './apu.service';
import { ResponseBase, SortRecords } from 'src/utils';
import { CreateApuDto, CreateApuWithResourcesDto, UpdateApuDto } from './apu.dto';

@ApiTags('APU')
@Controller('apus')
export class ApuController {
  constructor(private readonly apuService: ApuService) { }

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
    const response = await this.apuService.getAllApus(options);
    return response;
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<any> {
    const response = await this.apuService.getApu(id);
    return response;
  }

  @Post()
  async register(@Body() data: CreateApuDto): Promise<ResponseBase> {
    const response = await this.apuService.createApu(data);
    return response;
  }

  @Post(':id/resources')
  async registerWithResources(@Param('id') id: number, @Body() data: any) {
    const response = await this.apuService.createApuWithResources(id, data);
    return response;
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() data: UpdateApuDto,
  ): Promise<ResponseBase> {
    const response = await this.apuService.updateApu(id, data);
    return response;
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<ResponseBase> {
    const response = await this.apuService.deleteApu(id);
    return response;
  }
}
