import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { LaboursService } from './labours.service';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { ResponseBase, SortRecords } from 'src/utils';
import { CreateLabourDto, UpdateLabourDto } from './labours.dto';

@ApiTags('Labours')
@Controller('labours')
export class LaboursController {
  constructor(private readonly laboursService: LaboursService) { }

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
    const response = await this.laboursService.getAllLabours(options);
    return response;
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ResponseBase> {
    const response = await this.laboursService.getLabour(id);
    return response;
  }

  @Post()
  async register(@Body() data: CreateLabourDto): Promise<ResponseBase> {
    const response = await this.laboursService.createLabour(data);
    return response;
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() data: UpdateLabourDto,
  ): Promise<ResponseBase> {
    const response = await this.laboursService.updateLabour(id, data);
    return response;
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<ResponseBase> {
    const response = await this.laboursService.deleteLabour(id);
    return response;
  }

}
