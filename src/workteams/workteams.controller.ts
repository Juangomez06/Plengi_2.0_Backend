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
import { WorkteamsService } from './workteams.service';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { ResponseBase, SortRecords } from 'src/utils';
import { CreateTeamDto, UpdateTeamDto } from './workteams.dto';

@ApiTags('Teams')
@Controller('teams')
export class WorkteamsController {
  constructor(private readonly workTeamsService: WorkteamsService) { }

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
    const response = await this.workTeamsService.getAllWorkTeams(options);
    return response;
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ResponseBase> {
    const response = await this.workTeamsService.getWorkTeam(id);
    return response;
  }

  @Post()
  async register(@Body() data: CreateTeamDto): Promise<ResponseBase> {
    const response = await this.workTeamsService.createWorkTeam(data);
    return response;
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() data: UpdateTeamDto,
  ): Promise<ResponseBase> {
    const response = await this.workTeamsService.updateWorkTeam(id, data);
    return response;
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<ResponseBase> {
    const response = await this.workTeamsService.deleteWorkTeams(id);
    return response;
  }

}
