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
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { ResponseBase, SortRecords } from 'src/utils';
import { CreateActivityDto, UpdateActivityDto } from './activities.dto';
import { ActivitiesService } from './activities.service';

@ApiTags('Activities')
@Controller('activities')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) { }

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
    name: 'order',
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
    @Query('order') order?: string,
    @Query('name') name?: string,
    @Query('delete') showDelete?: string,
  ): Promise<ResponseBase> {
    const options = { skip, take, sort, order, name, showDelete };
    const response = await this.activitiesService.getAllActivities(options);
    return response;
  }

  @Get(':id')
  async findActivity(@Param('id') id: number): Promise<ResponseBase> {
    const response = await this.activitiesService.getActivity(id);
    return response;
  }

  @Post()
  async postActivity(@Body() data: CreateActivityDto): Promise<ResponseBase> {
    const response = await this.activitiesService.createActivity(data);
    return response;
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() data: UpdateActivityDto,
  ): Promise<ResponseBase> {
    const response = await this.activitiesService.updateActivity(id, data);
    return response;
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<ResponseBase> {
    const response = this.activitiesService.deleteActivity(id);
    return response;
  }
}
