import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { DefaultPaginationValues, ResponseBase } from 'src/utils';

@Injectable()
export class WorkteamsService {
  constructor(private prisma: PrismaService) { }

  async getAllWorkTeams(options: any): Promise<ResponseBase> {
    let condition = {};
    let sort = {};
    const skipDefault = DefaultPaginationValues.SKIP_DEFAULT;
    const takeDefault = DefaultPaginationValues.TAKE_DEFAULT;

    if (options?.showDelete === 'true') {
      condition = {
        NOT: {
          deletedAt: null,
        }
      };
    } else {
      condition = {
        deletedAt: null
      };
    }

    if (options?.name) {
      condition = {
        ...condition,
        name: {
          contains: options.name,
          mode: 'insensitive'
        }
      }
    }

    if (options?.sort) {
      sort = {
        id: options.sort
      }
    }

    const allWorkTeams = await this.prisma.workTeams.findMany({
      skip: parseInt(options?.skip) | skipDefault,
      take: parseInt(options?.take) | takeDefault,
      where: { ...condition },
      orderBy: { ...sort }
    });

    return new ResponseBase(
      allWorkTeams,
      HttpStatus.OK,
      'Get data successfully'
    );
  }

  async getWorkTeam(id: number): Promise<ResponseBase> {
    const team = await this.prisma.workTeams.findUnique({
      where: { id: Number(id) },
    });

    if (!team) {
      throw new HttpException(
        new ResponseBase(
          null,
          HttpStatus.NOT_FOUND,
          'Team not found'
        ),
        HttpStatus.NOT_FOUND,
      );
    }


    return new ResponseBase(
      team,
      HttpStatus.OK,
      'Get data successfully'
    )
  }

  async createWorkTeam(data: any): Promise<ResponseBase> {
    let team = null;

    try {
      team = await this.prisma.workTeams.create({
        data: {
          ...data
        },
      });
    } catch (error) {
      throw new HttpException(
        new ResponseBase(
          team,
          HttpStatus.BAD_REQUEST,
          'Team not created'
        ),
        HttpStatus.BAD_REQUEST
      );
    }

    return new ResponseBase(
      team,
      HttpStatus.CREATED,
      'Team created'
    );
  }

  async createWorkTeamWithApu(data: any): Promise<ResponseBase> {
    let team = null;

    try {
      team = await this.prisma.workTeams.create({
        data: {
          name: data.name,
          unitValue: data.unit_value,
          unitMeasurement: data.unit_measurement,
          teamType: data.team_type,
          apus: {
            create: [
              {
                amount: data.amount,
                performance: data.performance,
                apu: {
                  connect: {
                    id: data.apu_id,
                  },
                },
              },
            ],
          },
        },
      });
    } catch (error) {
      throw new HttpException(
        new ResponseBase(
          team,
          HttpStatus.NOT_FOUND,
          'Team not created'
        ),
        HttpStatus.NOT_FOUND
      );
    }

    return new ResponseBase(
      team,
      HttpStatus.CREATED,
      'Team created'
    );
  }

  async updateWorkTeam(id: number, data: any): Promise<ResponseBase> {
    let team = null;

    try {
      team = await this.prisma.workTeams.update({
        where: { id: Number(id) },
        data: {
          ...data
        },
      });
    } catch (error) {
      throw new HttpException(
        new ResponseBase(
          team,
          HttpStatus.BAD_REQUEST,
          'Team not updated'
        ),
        HttpStatus.BAD_REQUEST
      );
    }

    return new ResponseBase(
      team,
      HttpStatus.OK,
      'Team updated'
    );
  }

  async updateWorkTeamWithApu(id: number, data: any): Promise<ResponseBase> {
    let team = null;
    const apu_id = data.apu_id;
    const workteam_id = data.team_id;

    try {
      team = await this.prisma.workTeams.update({
        where: { id: Number(id) },
        data: {
          name: data.name,
          unitValue: data.unit_value,
          unitMeasurement: data.unit_measurement,
          teamType: data.team_type,
          apus: {
            update: [
              {
                where: {
                  apu_id_workteam_id: { apu_id, workteam_id },
                  apu_id: data.apu_id,
                  workteam_id: data.workteam_id,
                },
                data: {
                  amount: data.amount,
                  performance: data.performance,
                },
              },
            ],
          },
        },
      });
    } catch (error) {
      throw new HttpException(
        new ResponseBase(
          team,
          HttpStatus.NOT_FOUND,
          'Team not updated'
        ),
        HttpStatus.NOT_FOUND
      );
    }

    return new ResponseBase(
      team,
      HttpStatus.OK,
      'Team updated'
    );
  }

  async deleteWorkTeams(id: number): Promise<ResponseBase> {
    try {
      await this.prisma.workTeams.update({
        where: { id: Number(id) },
        data: { deletedAt: new Date() },
      });
    } catch (error) {
      throw new HttpException(
        new ResponseBase(
          null,
          HttpStatus.NOT_FOUND,
          'Team not deleted'
        ),
        HttpStatus.NOT_FOUND,
      );
    }

    return new ResponseBase(
      null,
      HttpStatus.OK,
      'Team deleted'
    );
  }
}
