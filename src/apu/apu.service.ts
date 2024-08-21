import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { APU } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { DefaultPaginationValues, ResponseBase } from 'src/utils';
import { CreateApuDto, CreateApuWithResourcesDto, UpdateApuDto } from './apu.dto';

@Injectable()
export class ApuService {
  constructor(private prisma: PrismaService) { }

  async getAllApus(options: any): Promise<ResponseBase> {
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

    const allApus = await this.prisma.aPU.findMany({
      skip: parseInt(options?.skip) | skipDefault,
      take: parseInt(options?.take) | takeDefault,
      where: { ...condition },
      orderBy: { ...sort }
    });

    return new ResponseBase(
      allApus,
      HttpStatus.OK,
      'Get data successfully'
    );
  }

  async getApu(id: number): Promise<ResponseBase> {
    const apu = await this.prisma.aPU.findUnique({
      where: { id: Number(id) },
    });

    if (!apu) {
      throw new HttpException(
        new ResponseBase(
          null,
          HttpStatus.NOT_FOUND,
          'APU not found'
        ),
        HttpStatus.NOT_FOUND,
      );
    }

    return new ResponseBase(
      apu,
      HttpStatus.OK,
      'Get data successfully'
    );
  }

  async createApu(data: CreateApuDto): Promise<ResponseBase> {
    let apu = null;

    try {
      apu = await this.prisma.aPU.create({
        data: {
          ...data
        }
      });
    } catch (error) {
      throw new HttpException(
        new ResponseBase(
          null,
          HttpStatus.BAD_REQUEST,
          'APU not created'
        ),
        HttpStatus.BAD_REQUEST,
      );
    }

    return new ResponseBase(
      apu,
      HttpStatus.CREATED,
      'APU created'
    );
  }

  async createApuWithResources(id: number, data: any): Promise<ResponseBase> {
    let apu = null;
    let materialsApu = [];
    let teamsApu = [];
    let laboursApu = [];

    if (data.materials) {
      materialsApu = data.materials.map((m: any) => ({
        amount: m.amount,
        waste: m.waste,
        material: {
          connect: {
            id: m.id
          }
        }
      }))
    };

    if (data.teams) {
      teamsApu = data.teams.map((m: any) => ({
        amount: m.amount,
        performance: m.performance,
        workteam: {
          connect: {
            id: m.id
          }
        }
      }))
    };

    if (data.labours) {
      laboursApu = data.labours.map((m: any) => ({
        amount: m.amount,
        performance: m.performance,
        labour: {
          connect: {
            id: m.id
          }
        }
      }))
    };

    try {
      apu = await this.prisma.aPU.update({
        where: { id: Number(id) },
        data: {
          materials: {
            create: materialsApu
          },
          workteams: {
            create: teamsApu
          },
          labours: {
            create: laboursApu
          }
        }
      })
    } catch (error) {
      throw new HttpException(
        new ResponseBase(
          apu,
          HttpStatus.BAD_REQUEST,
          error.message
        ),
        HttpStatus.BAD_REQUEST
      );
    }

    return new ResponseBase(
      apu,
      HttpStatus.CREATED,
      'Resources created'
    );
  }

  async updateApu(id: number, data: UpdateApuDto): Promise<ResponseBase> {
    let apu = null;
    try {
      apu = await this.prisma.aPU.update({
        where: { id: Number(id), deletedAt: null },
        data: {
          ...data
        }
      });
    } catch (error) {
      throw new HttpException(
        new ResponseBase(
          null,
          HttpStatus.NOT_FOUND,
          'APU not updated'
        ),
        HttpStatus.NOT_FOUND,
      );
    }

    return new ResponseBase(
      apu,
      HttpStatus.OK,
      'APU updated'
    );
  }

  async deleteApu(id: number): Promise<ResponseBase> {
    let apu = null;
    try {
      apu = await this.prisma.aPU.update({
        where: { id: Number(id), deletedAt: null },
        data: { deletedAt: new Date() },
      });
    } catch (error) {
      throw new HttpException(
        new ResponseBase(
          null,
          HttpStatus.NOT_FOUND,
          'APU not deleted'
        ),
        HttpStatus.NOT_FOUND,
      );
    }

    return new ResponseBase(
      apu,
      HttpStatus.OK,
      'APU deleted'
    );
  }
}
